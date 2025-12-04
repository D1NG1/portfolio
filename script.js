// Portfolio Interactivity

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAnimations();
    initInteractions();
    initSmoothScroll();
});

// ============ NAVIGATION ============
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });

    // Initialize on page load
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    // Check which section is in view
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============ ANIMATIONS ============
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.skill-card, .project-card, .stat-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ============ INTERACTIONS ============
function initInteractions() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });

    // Project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
    });

    // Tag interactions
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            copyToClipboard(this.textContent);
        });
    });

    // Social links ripple effect
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href.includes('mailto')) {
                e.preventDefault();
                copyToClipboard(link.href.replace('mailto:', ''));
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn, .project-link').forEach(element => {
        element.addEventListener('click', createRipple);
    });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
    // Add smooth scroll to hero buttons
    document.querySelectorAll('.hero-buttons a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// ============ UTILITY FUNCTIONS ============
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(`Copied: ${text}`);
    }).catch(() => {
        console.log('Copy failed:', text);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2563eb, #1e40af);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        z-index: 9999;
        animation: slideUp 0.3s ease-out, slideDown 0.3s ease-out 2.7s forwards;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function createRipple(e) {
    if (e.button !== 0) return; // Only left click

    const element = this;
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent);
        border-radius: 50%;
        transform: translate(${x}px, ${y}px);
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;

    if (element.style.position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// ============ ADD ANIMATIONS TO DOCUMENT HEAD ============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }

    @keyframes ripple {
        from {
            transform: translate(var(--tx, 0), var(--ty, 0)) scale(1);
            opacity: 1;
        }
        to {
            transform: translate(var(--tx, 0), var(--ty, 0)) scale(2);
            opacity: 0;
        }
    }

    .btn, .project-link {
        position: relative;
    }

    /* Mobile menu adjustments */
    @media (max-width: 768px) {
        .nav-links {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);

// ============ SCROLL PERFORMANCE OPTIMIZATION ============
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        document.documentElement.style.scrollBehavior = 'auto';
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 150);
}, { passive: true });

// ============ HANDLE EXTERNAL LINKS ============
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[target="_blank"]');
    if (link && link.href.includes('github.com')) {
        // Add analytics or custom handling here if needed
    }
});

// ============ CONSOLE EASTER EGG ============
console.log(
    '%c🚀 Welcome to Dennys Ding\'s Portfolio!',
    'font-size: 16px; font-weight: bold; color: #2563eb;'
);
console.log(
    '%cLet\'s build something amazing together! 💻',
    'font-size: 14px; color: #60a5fa;'
);
