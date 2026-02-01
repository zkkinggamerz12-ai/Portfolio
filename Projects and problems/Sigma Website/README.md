# 🚀 Sigma Website

A modern, responsive website with Sigma-themed design, featuring user authentication, beautiful animations, and a full-stack Node.js backend.

## ✨ Features

- **Modern UI/UX**: Sleek Sigma-themed design with smooth animations
- **User Authentication**: Complete login/signup system with JWT tokens
- **Responsive Design**: Mobile-first approach that works on all devices
- **Interactive Elements**: Floating particles, scroll animations, and hover effects
- **Secure Backend**: Express.js server with bcrypt password hashing and rate limiting
- **Real-time Validation**: Client-side form validation with error handling
- **Professional Sections**: About, Services, and Contact sections

## 🎨 Design Highlights

- **Color Scheme**: Deep blues and cyan accents (#00d4ff)
- **Typography**: Modern Inter font family
- **Animations**: Smooth transitions, floating elements, and particle effects
- **Glass Morphism**: Subtle transparency and backdrop blur effects
- **Responsive Grid**: CSS Grid and Flexbox for perfect layouts

## 🛠️ Tech Stack

### Frontend
- HTML5 with semantic markup
- CSS3 with modern features (Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- Google Fonts (Inter)

### Backend
- Node.js with Express.js
- JWT for authentication
- bcryptjs for password hashing
- CORS and Helmet for security
- Rate limiting for API protection

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sigma-website.git
   cd sigma-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm start
```

## 📱 Usage

### Demo Account
A demo admin account is automatically created:
- **Email**: `admin@sigma.com`
- **Password**: `admin123`

### User Features
- **Sign Up**: Create a new account with email and password
- **Login**: Access your account with secure authentication
- **Profile Management**: Update your information and change passwords
- **Responsive Navigation**: Smooth scrolling between sections

### Admin Features
- **User Management**: View all registered users (admin role required)
- **System Overview**: Monitor user activity and system health

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Secure authentication with 24-hour expiration
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Server-side and client-side validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet Security**: HTTP headers for security

## 📁 Project Structure

```
sigma-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # Frontend JavaScript
├── server.js           # Node.js backend server
├── package.json        # Dependencies and scripts
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)
- `PUT /api/user/change-password` - Change password (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)

### System
- `GET /api/health` - Health check endpoint

## 🎯 Customization

### Colors
Update the CSS variables in `styles.css`:
```css
:root {
  --primary-color: #00d4ff;
  --secondary-color: #0099cc;
  --background-dark: #0f0f23;
  --text-light: #ffffff;
}
```

### Content
- Modify the HTML content in `index.html`
- Update service descriptions and contact information
- Customize the hero section messaging

### Styling
- Adjust animations in `styles.css`
- Modify particle effects in `script.js`
- Update responsive breakpoints

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Environment Variables
```bash
PORT=3000                    # Server port
JWT_SECRET=your-secret-key  # JWT signing secret
NODE_ENV=production         # Environment mode
```

### Production Considerations
- Use a proper database (MongoDB, PostgreSQL) instead of in-memory storage
- Set up HTTPS with SSL certificates
- Configure environment variables securely
- Use PM2 or similar process manager
- Set up logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- The open-source community for inspiration

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Made with ❤️ by the Sigma Team**

*Excellence in every line of code*
