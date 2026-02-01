// Boy-Coy Style Enhanced Scroll Animations and Interactions
class BoyCoyAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupScrollProgress();
        this.setupStaggeredAnimations();
        this.setupDynamicTextEffects();
        this.setupLayeredAnimations();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElementBoyCoyStyle(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.service-card, .review-card, .team-member, .section-title, .about-description');
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        });
    }

    animateElementBoyCoyStyle(element) {
        // Boy-Coy style animations with rotation and scale effects
        if (element.classList.contains('service-card')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotate(0deg)';
            element.classList.add('animate');
            
            // Add staggered animation effect
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.15}s`;
        } else if (element.classList.contains('review-card')) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) rotate(0deg)';
            element.classList.add('animate');
            
            // Add staggered animation effect
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.12}s`;
        } else if (element.classList.contains('team-member')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            element.classList.add('animate');
            
            // Add staggered animation effect
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.style.animationDelay = `${index * 0.2}s`;
        } else if (element.classList.contains('section-title')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animate');
        } else if (element.classList.contains('about-description')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animate');
        }
    }

    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-elements, .hero-content');
            
            // Boy-Coy style parallax with rotation
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * -0.3;
                const rotation = scrolled * 0.02;
                element.style.transform = `translateY(${rate}px) rotate(${rotation}deg)`;
            });

            // Parallax for background patterns with different speeds
            const sections = document.querySelectorAll('section');
            sections.forEach((section, index) => {
                const rate = scrolled * (0.05 + index * 0.02);
                if (section.style.backgroundPosition) {
                    section.style.backgroundPosition = `center ${rate}px`;
                }
            });

            // Dynamic floating elements movement
            const floatingElements = document.querySelectorAll('.element');
            floatingElements.forEach((element, index) => {
                const moveX = Math.sin(scrolled * 0.001 + index) * 20;
                const moveY = Math.cos(scrolled * 0.001 + index) * 15;
                element.style.transform += ` translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    setupScrollProgress() {
        // Create scroll progress bar with Boy-Coy style
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            z-index: 10000;
            transition: width 0.1s ease;
            box-shadow: 0 2px 15px rgba(102, 126, 234, 0.4);
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrolled / height) * 100;
            progressBar.style.width = progress + '%';
            
            // Add glow effect based on scroll position
            if (progress > 50) {
                progressBar.style.boxShadow = '0 2px 20px rgba(102, 126, 234, 0.6)';
            } else {
                progressBar.style.boxShadow = '0 2px 15px rgba(102, 126, 234, 0.4)';
            }
        });
    }

    setupStaggeredAnimations() {
        // Boy-Coy style staggered animations with rotation
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.15}s`;
            card.style.transform = `translateY(100px) rotate(${5 + index * 2}deg)`;
        });

        const reviewCards = document.querySelectorAll('.review-card');
        reviewCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.12}s`;
            card.style.transform = `translateX(-100px) rotate(${-3 - index * 1}deg)`;
        });

        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            member.style.transitionDelay = `${index * 0.2}s`;
            member.style.transform = `translateY(100px) scale(${0.8 - index * 0.05})`;
        });
    }

    setupDynamicTextEffects() {
        // Boy-Coy style text animations
        const titles = document.querySelectorAll('.section-title, .hero-title');
        titles.forEach(title => {
            title.addEventListener('mouseenter', () => {
                title.style.transform = 'scale(1.05) rotate(1deg)';
                title.style.textShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
            });
            
            title.addEventListener('mouseleave', () => {
                title.style.transform = 'scale(1) rotate(0deg)';
                title.style.textShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            });
        });
    }

    setupLayeredAnimations() {
        // Create layered background effects
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index % 2 === 0) {
                const layer = document.createElement('div');
                layer.className = 'boy-coy-layer';
                layer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, transparent, rgba(102, 126, 234, 0.03));
                    pointer-events: none;
                    z-index: 1;
                    animation: boyCoyLayerFloat ${8 + index * 2}s ease-in-out infinite;
                `;
                section.appendChild(layer);
            }
        });
    }
}

// Mobile Navigation Toggle with Boy-Coy Style Animations
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Enhanced hamburger animation with Boy-Coy style
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.classList.toggle('active');
        if (bar.classList.contains('active')) {
            bar.style.animationDelay = `${index * 0.1}s`;
            bar.style.animation = 'boyCoyBarAnimation 0.4s ease forwards';
        } else {
            bar.style.animation = 'none';
            bar.style.animationDelay = '0s';
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.classList.remove('active');
            bar.style.animation = 'none';
            bar.style.animationDelay = '0s';
        });
    });
});

// Boy-Coy Style Enhanced Smooth Scrolling with Easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1200;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = boyCoyEase(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            // Boy-Coy style easing function
            function boyCoyEase(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// Enhanced Navbar Background Change on Scroll with Boy-Coy Style
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.transform = 'translateY(0)';
    }
});

// Boy-Coy Style Enhanced Contact Form with Better Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Enhanced validation
        if (!name || !email || !message) {
            showBoyCoyNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (name.length < 2) {
            showBoyCoyNotification('Name must be at least 2 characters long', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showBoyCoyNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (message.length < 10) {
            showBoyCoyNotification('Message must be at least 10 characters long', 'error');
            return;
        }
        
        // Simulate form submission with loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        showBoyCoyNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showBoyCoyNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Enhanced Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Boy-Coy Style Enhanced Notification System
function showBoyCoyNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 20px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px) scale(0.8) rotate(-5deg);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        backdrop-filter: blur(15px);
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Boy-Coy style animation in
    setTimeout(() => {
        notification.style.transform = 'translateX(0) scale(1) rotate(0deg)';
    }, 100);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px) scale(0.8) rotate(5deg)';
        setTimeout(() => notification.remove(), 500);
    });
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px) scale(0.8) rotate(5deg)';
            setTimeout(() => notification.remove(), 500);
        }
    }, 7000);
}

// Boy-Coy Style Enhanced Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements with Boy-Coy style staggered timing
    const heroElements = document.querySelectorAll('.greeting, .main-title, .hero-subtitle, .hero-buttons');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateX(0) rotate(0deg)';
        }, index * 700);
    });

    // Initialize Boy-Coy animations
    new BoyCoyAnimations();
});

// Boy-Coy Style Enhanced Hover Effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.05) rotate(-2deg)';
            this.style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.2)';
            
            // Add floating effect
            this.style.animation = 'boyCoyCardFloat 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            this.style.animation = 'none';
        });
    });

    // Enhanced hover effects for review cards
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03) rotate(2deg)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.08)';
        });
    });

    // Enhanced hover effects for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Boy-Coy Style Enhanced Scroll-triggered Animations
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.service-card, .review-card, .team-member');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            // Add different animation classes based on index with Boy-Coy style
            if (index % 3 === 0) {
                element.classList.add('fade-in-up', 'animate');
            } else if (index % 3 === 1) {
                element.classList.add('fade-in-left', 'animate');
            } else {
                element.classList.add('fade-in-right', 'animate');
            }
        }
    });
};

window.addEventListener('scroll', scrollAnimations);

// Boy-Coy Style Enhanced CSS for Advanced Animations
const boyCoyStyles = document.createElement('style');
boyCoyStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 0.8;
        transform: scale(1.2) rotate(15deg);
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
    }
    
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
        animation: boyCoyBarAnimation 0.4s ease forwards;
    }
    
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
        animation: boyCoyBarAnimation 0.4s ease forwards;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
        animation: boyCoyBarAnimation 0.4s ease forwards;
    }
    
    @keyframes boyCoyBarAnimation {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    body:not(.loaded) .hero-content > * {
        opacity: 0;
        transform: translateX(-100px) rotate(-5deg);
        transition: all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    /* Boy-Coy style scroll animations */
    .fade-in-up, .fade-in-left, .fade-in-right, .scale-in {
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .fade-in-up.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .fade-in-left.animate {
        opacity: 1;
        transform: translateX(0);
    }
    
    .fade-in-right.animate {
        opacity: 1;
        transform: translateX(0);
    }
    
    .scale-in.animate {
        opacity: 1;
        transform: scale(1);
    }
    
    /* Boy-Coy style hover effects */
    .service-card:hover .service-icon {
        transform: scale(1.2) rotate(15deg);
        animation: boyCoyIconBounce 0.6s ease;
    }
    
    .service-card:hover .service-icon::after {
        animation: boyCoyPulse 1.5s infinite;
    }
    
    .review-card:hover::before {
        animation: boyCoyQuoteFloat 2s ease-in-out infinite;
    }
    
    .team-member:hover .member-photo {
        animation: boyCoyPhotoSpin 0.8s ease;
    }
    
    /* Boy-Coy style card floating animation */
    @keyframes boyCoyCardFloat {
        0%, 100% { transform: translateY(-20px) scale(1.05) rotate(-2deg); }
        50% { transform: translateY(-25px) scale(1.08) rotate(-3deg); }
    }
    
    /* Boy-Coy style layer floating animation */
    @keyframes boyCoyLayerFloat {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Enhanced focus states with Boy-Coy style */
    .form-group input:focus,
    .form-group textarea:focus {
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.25);
    }
    
    /* Enhanced button animations with Boy-Coy style */
    .btn:hover {
        transform: translateY(-3px) scale(1.05) rotate(1deg);
    }
    
    .btn:active {
        transform: translateY(-1px) scale(1.02) rotate(0deg);
    }
    
    /* Boy-Coy style text hover effects */
    .section-title:hover,
    .hero-title:hover {
        animation: boyCoyTextGlow 2s ease-in-out infinite;
    }
    
    @keyframes boyCoyTextGlow {
        0%, 100% { text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); }
        50% { text-shadow: 0 15px 40px rgba(102, 126, 234, 0.4); }
    }
`;
document.head.appendChild(boyCoyStyles);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add Boy-Coy style loading animation for elements
    const animatedElements = document.querySelectorAll('.service-card, .review-card, .team-member');
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Add Boy-Coy style scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 15px rgba(102, 126, 234, 0.4);
    `;
    document.body.appendChild(progressBar);
    
    // Update scroll progress with Boy-Coy style
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / height) * 100;
        progressBar.style.width = progress + '%';
        
        // Add dynamic glow effect
        if (progress > 50) {
            progressBar.style.boxShadow = '0 2px 20px rgba(102, 126, 234, 0.6)';
        } else {
            progressBar.style.boxShadow = '0 2px 15px rgba(102, 126, 234, 0.4)';
        }
    });
});
