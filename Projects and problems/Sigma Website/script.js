// DOM Elements
const authOverlay = document.getElementById('authOverlay');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Show/Hide Auth Forms
function showLogin() {
    authOverlay.classList.add('active');
    switchToLogin();
}

function showSignup() {
    authOverlay.classList.add('active');
    switchToSignup();
}

function closeAuth() {
    authOverlay.classList.remove('active');
    // Reset forms
    loginForm.reset();
    signupForm.reset();
    // Clear any error messages
    clearErrors();
}

function switchToLogin() {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
    clearErrors();
}

function switchToSignup() {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
    clearErrors();
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.textContent = message;
    
    // Remove existing error if any
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    element.parentNode.appendChild(errorDiv);
    element.style.borderColor = '#ff6b6b';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.borderColor = 'rgba(0, 212, 255, 0.2)';
    });
}

// Login Form Handler
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearErrors();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validation
    let hasErrors = false;
    
    if (!email) {
        showError('loginEmail', 'Email is required');
        hasErrors = true;
    } else if (!validateEmail(email)) {
        showError('loginEmail', 'Please enter a valid email');
        hasErrors = true;
    }
    
    if (!password) {
        showError('loginPassword', 'Password is required');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Show loading state
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token
            localStorage.setItem('sigmaToken', data.token);
            localStorage.setItem('sigmaUser', JSON.stringify(data.user));
            
            // Show success message
            showNotification('Login successful!', 'success');
            
            // Close auth overlay
            setTimeout(() => {
                closeAuth();
                // Redirect or update UI
                updateUIAfterAuth();
            }, 1000);
        } else {
            showError('loginPassword', data.message || 'Login failed');
        }
    } catch (error) {
        showError('loginPassword', 'Network error. Please try again.');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Signup Form Handler
signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearErrors();
    
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    let hasErrors = false;
    
    if (!name) {
        showError('signupName', 'Full name is required');
        hasErrors = true;
    }
    
    if (!email) {
        showError('signupEmail', 'Email is required');
        hasErrors = true;
    } else if (!validateEmail(email)) {
        showError('signupEmail', 'Please enter a valid email');
        hasErrors = true;
    }
    
    if (!password) {
        showError('signupPassword', 'Password is required');
        hasErrors = true;
    } else if (!validatePassword(password)) {
        showError('signupPassword', 'Password must be at least 6 characters');
        hasErrors = true;
    }
    
    if (password !== confirmPassword) {
        showError('signupConfirmPassword', 'Passwords do not match');
        hasErrors = true;
    }
    
    if (!agreeTerms) {
        showError('agreeTerms', 'You must agree to the terms and conditions');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Show loading state
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Show success message
            showNotification('Account created successfully!', 'success');
            
            // Switch to login form
            setTimeout(() => {
                switchToLogin();
                // Pre-fill email
                document.getElementById('loginEmail').value = email;
            }, 1000);
        } else {
            showError('signupEmail', data.message || 'Signup failed');
        }
    } catch (error) {
        showError('signupEmail', 'Network error. Please try again.');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #00d4ff, #0099cc)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
    } else {
        notification.style.background = 'linear-gradient(45deg, #feca57, #ff9ff3)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Update UI after authentication
function updateUIAfterAuth() {
    const user = JSON.parse(localStorage.getItem('sigmaUser') || '{}');
    
    if (user.name) {
        // Update hero buttons
        const heroButtons = document.querySelector('.hero-buttons');
        heroButtons.innerHTML = `
            <div class="welcome-message">
                <p>Welcome back, ${user.name}!</p>
                <button class="btn btn-secondary" onclick="logout()">Logout</button>
            </div>
        `;
        
        // Update navigation
        const navLinks = document.querySelector('.nav-links');
        navLinks.innerHTML += '<a href="#dashboard">Dashboard</a>';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('sigmaToken');
    localStorage.removeItem('sigmaUser');
    location.reload();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Close auth overlay when clicking outside
authOverlay.addEventListener('click', function(e) {
    if (e.target === authOverlay) {
        closeAuth();
    }
});

// Escape key to close auth overlay
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && authOverlay.classList.contains('active')) {
        closeAuth();
    }
});

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('sigmaToken');
    if (token) {
        updateUIAfterAuth();
    }
    
    // Add some interactive animations
    addScrollAnimations();
});

// Scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .service-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add some particle effects to the hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles
setTimeout(createParticles, 1000);

// Add CSS for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);
