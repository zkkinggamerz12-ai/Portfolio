const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// In-memory user storage (replace with database in production)
const users = [];
const JWT_SECRET = process.env.JWT_SECRET || 'sigma-secret-key-2024';

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Sigma API is running',
        timestamp: new Date().toISOString()
    });
});

// User registration
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'All fields are required' 
            });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                message: 'Password must be at least 6 characters long' 
            });
        }

        // Check if user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User with this email already exists' 
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            role: 'user'
        };

        users.push(newUser);

        // Remove password from response
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            message: 'User created successfully',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// User login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required' 
            });
        }

        // Find user
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Invalid email or password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email, 
                role: user.role 
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// Get user profile (protected route)
app.get('/api/user/profile', authenticateToken, (req, res) => {
    try {
        const user = users.find(user => user.id === req.user.userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// Update user profile (protected route)
app.put('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const { name, email } = req.body;
        const userIndex = users.findIndex(user => user.id === req.user.userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Check if email is already taken by another user
        if (email && email !== users[userIndex].email) {
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                return res.status(400).json({ 
                    message: 'Email is already taken' 
                });
            }
        }

        // Update user
        if (name) users[userIndex].name = name;
        if (email) users[userIndex].email = email;
        users[userIndex].updatedAt = new Date().toISOString();

        // Remove password from response
        const { password: _, ...userWithoutPassword } = users[userIndex];

        res.json({
            message: 'Profile updated successfully',
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// Change password (protected route)
app.put('/api/user/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ 
                message: 'Current password and new password are required' 
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ 
                message: 'New password must be at least 6 characters long' 
            });
        }

        const userIndex = users.findIndex(user => user.id === req.user.userId);
        if (userIndex === -1) {
            return res.status(404).json({ 
                message: 'User not found' 
            });
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, users[userIndex].password);
        if (!isValidPassword) {
            return res.status(401).json({ 
                message: 'Current password is incorrect' 
            });
        }

        // Hash new password
        const saltRounds = 12;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        users[userIndex].password = hashedNewPassword;
        users[userIndex].updatedAt = new Date().toISOString();

        res.json({
            message: 'Password changed successfully'
        });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// Logout (client-side token removal, but we can track it)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
    // In a real application, you might want to blacklist the token
    res.json({
        message: 'Logout successful'
    });
});

// Get all users (admin only - protected route)
app.get('/api/admin/users', authenticateToken, (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                message: 'Access denied. Admin role required.' 
            });
        }

        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.json({
            users: usersWithoutPasswords,
            total: usersWithoutPasswords.length
        });

    } catch (error) {
        console.error('Admin users error:', error);
        res.status(500).json({ 
            message: 'Internal server error' 
        });
    }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ 
        message: 'API endpoint not found' 
    });
});

// Serve static files for all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        message: 'Internal server error' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Sigma server running on port ${PORT}`);
    console.log(`📱 Open http://localhost:${PORT} in your browser`);
    console.log(`🔒 API available at http://localhost:${PORT}/api`);
    
    // Create a demo admin user if no users exist
    if (users.length === 0) {
        const createDemoUser = async () => {
            const hashedPassword = await bcrypt.hash('admin123', 12);
            const adminUser = {
                id: 'admin-001',
                name: 'Admin User',
                email: 'admin@sigma.com',
                password: hashedPassword,
                createdAt: new Date().toISOString(),
                role: 'admin'
            };
            users.push(adminUser);
            console.log('👑 Demo admin user created: admin@sigma.com / admin123');
        };
        createDemoUser();
    }
});

module.exports = app;
