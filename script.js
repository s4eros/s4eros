/* ============================================
   PROFESSIONAL PORTFOLIO JAVASCRIPT
   ============================================ */

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupSmoothScrolling();
    setupFormValidation();
    setupScrollAnimations();
    setupMobileMenu();
    setupActiveNavLink();
}

/* ============================================
   SMOOTH SCROLLING FOR NAVIGATION LINKS
   ============================================ */

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .cta-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll with offset for navbar
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/* ============================================
   FORM VALIDATION & SUBMISSION
   ============================================ */

function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nameInput = form.querySelector('input[placeholder="El teu nom"]');
        const emailInput = form.querySelector('input[placeholder="El teu email"]');
        const messageInput = form.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage += '- El nom és obligatori\n';
            addErrorClass(nameInput);
        } else {
            removeErrorClass(nameInput);
        }
        
        if (!email) {
            isValid = false;
            errorMessage += '- L\'email és obligatori\n';
            addErrorClass(emailInput);
        } else if (!isValidEmail(email)) {
            isValid = false;
            errorMessage += '- L\'email no és vàlid\n';
            addErrorClass(emailInput);
        } else {
            removeErrorClass(emailInput);
        }
        
        if (!message) {
            isValid = false;
            errorMessage += '- El missatge és obligatori\n';
            addErrorClass(messageInput);
        } else if (message.length < 10) {
            isValid = false;
            errorMessage += '- El missatge ha de tenir almenys 10 caràcters\n';
            addErrorClass(messageInput);
        } else {
            removeErrorClass(messageInput);
        }
        
        // Handle validation result
        if (isValid) {
            showSuccessMessage(form);
            form.reset();
        } else {
            alert('Per favor, corregeix els següents errors:\n\n' + errorMessage);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function addErrorClass(element) {
    element.style.borderColor = '#ff6b35';
    element.style.boxShadow = '0 0 15px rgba(255, 107, 53, 0.3)';
}

function removeErrorClass(element) {
    element.style.borderColor = '';
    element.style.boxShadow = '';
}

function showSuccessMessage(form) {
    const button = form.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = '✓ Missatge Enviat!';
    button.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6f 100%)';
    button.style.color = '#0f1419';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 3000);
}

/* ============================================
   SCROLL ANIMATIONS - FADE IN EFFECT
   ============================================ */

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all competency groups, focus items, and timeline items
    const animatedElements = document.querySelectorAll(
        '.competency-group, .focus-item, .timeline-item, .contact-item'
    );
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

function setupMobileMenu() {
    // Create hamburger button
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if we need mobile menu (for smaller screens)
    if (window.innerWidth <= 768) {
        createMobileMenuButton();
    }
    
    // Listen for window resize
    window.addEventListener('resize', function() {
        const mobileButton = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth <= 768 && !mobileButton) {
            createMobileMenuButton();
        } else if (window.innerWidth > 768 && mobileButton) {
            mobileButton.remove();
            navLinks.style.display = '';
        }
    });
}

function createMobileMenuButton() {
    const navbar = document.querySelector('.navbar .container');
    const navLinks = document.querySelector('.nav-links');
    
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        background: none;
        border: none;
        color: #00d4ff;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
    `;
    
    // Show button on mobile
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
    }
    
    navbar.appendChild(menuButton);
    
    menuButton.addEventListener('click', function() {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'rgba(15, 20, 25, 0.98)';
            navLinks.style.zIndex = '999';
            navLinks.style.gap = '0';
            navLinks.style.padding = '1rem 0';
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.display = 'none';
        });
    });
}

/* ============================================
   ACTIVE NAV LINK HIGHLIGHTING
   ============================================ */

function setupActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.borderBottom = '2px solid transparent';
            
            if (link.getAttribute('href').substring(1) === current) {
                link.style.borderBottom = '2px solid #00d4ff';
                link.style.color = '#00d4ff';
                link.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.3)';
            } else {
                link.style.color = '';
                link.style.textShadow = '';
            }
        });
    });
}

/* ============================================
   COUNTER ANIMATION FOR STATISTICS
   ============================================ */

function animateCounter(element, target, duration = 1000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ============================================
   UTILITY: Add scroll effect to navbar
   ============================================ */

function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
        }
    });
}

// Initialize navbar scroll effect
setupNavbarScrollEffect();

/* ============================================
   UTILITY: Print function for CV
   ============================================ */

function printCV() {
    window.print();
}

// Make printCV available globally
window.printCV = printCV;

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */

console.log('%c🔐 CYBERSECURITY PORTFOLIO 🔐', 'color: #00d4ff; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to Arnau Saez\'s Professional Portfolio', 'color: #00ff88; font-size: 14px;');
console.log('%cSpecialist in Cybersecurity | ASIX Student', 'color: #ff6b35; font-size: 12px;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00d4ff;');
