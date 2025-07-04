// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Debug GSAP and ScrollTrigger availability
console.log('GSAP loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');

// Test GSAP immediately
if (typeof gsap !== 'undefined') {
    console.log('✅ GSAP is available');
    // Simple test animation
    gsap.set('body', { opacity: 1 });
} else {
    console.error('❌ GSAP is not loaded!');
}

// Wrap everything in DOMContentLoaded to ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, initializing Magna Web app...');

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
const body = document.body;

    console.log('Mobile menu elements found:', { mobileMenu: !!mobileMenu, navLinks: !!navLinks, navbar: !!navbar });

    if (mobileMenu && navLinks) {
        const toggleMenu = () => {
            console.log('🍔 Hamburger menu clicked!');
            
            const isActive = navLinks.classList.contains('active');
            console.log('Menu currently active:', isActive);
            
            if (!isActive) {
                navLinks.classList.add('active');
                mobileMenu.classList.add('active');
                navbar.classList.add('menu-open');
                body.classList.add('menu-open');
                console.log('✅ Menu opened');
            } else {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
                body.classList.remove('menu-open');
                console.log('❌ Menu closed');
            }
        };
        
        // Add click event to hamburger menu
        mobileMenu.addEventListener('click', toggleMenu);

        // Close menu when clicking on navigation links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Nav link clicked, closing menu');
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
                body.classList.remove('menu-open');
            });
});

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                console.log('Clicked outside menu, closing...');
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
                body.classList.remove('menu-open');
            }
        });

        console.log('✅ Mobile menu initialized successfully');
    } else {
        console.error('❌ Mobile menu elements not found');
    }

    // ========================================
    // HERO TEXT ANIMATION
    // ========================================
const splitText = document.querySelector('.split-text');
    if (splitText) {
const lines = splitText.querySelectorAll('.line');
        console.log('🎭 Hero animation - found lines:', lines.length);
        
        if (lines.length > 0) {
            // Set initial state
            gsap.set(lines, { y: 100, opacity: 0 });
            
            // Animate lines in
            gsap.to(lines, {
                y: 0,
                opacity: 1,
                duration: 1.2,
    stagger: 0.2,
                ease: "power3.out",
                delay: 0.3,
                onComplete: () => console.log('✅ Hero animation completed successfully')
            });
        }
    } else {
        console.error('❌ Split text element not found for hero animation');
    }

    // ========================================
    // STATISTICS COUNTER ANIMATION
    // ========================================
    function initStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number[data-value]');
        console.log('📊 Found stat numbers:', statNumbers.length);
        console.log('📊 Stat elements details:', Array.from(statNumbers).map(el => ({
            element: el,
            dataValue: el.getAttribute('data-value'),
            currentText: el.textContent,
            parentElement: el.parentElement
        })));
        
        if (statNumbers.length === 0) {
            console.log('No stat numbers found, retrying in 500ms...');
            setTimeout(initStatsAnimation, 500);
            return;
        }
        

        
        statNumbers.forEach((stat, index) => {
            const targetValue = parseFloat(stat.getAttribute('data-value'));
            console.log(`Setting up animation for stat ${index + 1}:`, targetValue, 'Element:', stat);
            

            
            // Also create ScrollTrigger as backup
            ScrollTrigger.create({
                trigger: stat.parentElement,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    console.log('🎯 ScrollTrigger fired for stat:', targetValue);
                    animateStat(stat, targetValue);
                }
            });
        });

        console.log('✅ Stats animation system initialized');
    }

    // Animation function
    function animateStat(stat, targetValue) {
        console.log('🎬 Starting animation for:', targetValue, 'Current text:', stat.textContent);
        
        // Create a counter object to animate
        const counter = { value: 0 };
        
        gsap.to(counter, {
            value: targetValue,
            duration: 2.5,
            ease: "power2.out",
            onStart: () => {
                console.log('🎭 Animation started for:', targetValue);
            },
            onUpdate: function() {
                const currentValue = counter.value;
                console.log('🔄 Updating value:', currentValue, ' for target:', targetValue);
                
                if (targetValue === 24) {
                    stat.textContent = Math.round(currentValue) + '/7';
                } else if (targetValue === 78.3) {
                    stat.textContent = currentValue.toFixed(1) + '%';
                } else if (targetValue === 72) {
                    stat.textContent = Math.round(currentValue) + 'H';
                } else {
                    stat.textContent = Math.round(currentValue) + '%';
                }
            },
            onComplete: () => {
                console.log('✅ Animation completed for stat:', targetValue);
                // Ensure final value is set correctly
                if (targetValue === 24) {
                    stat.textContent = '24/7';
                } else if (targetValue === 78.3) {
                    stat.textContent = '78.3%';
                } else if (targetValue === 72) {
                    stat.textContent = '72H';
                } else {
                    stat.textContent = Math.round(targetValue) + '%';
                }
            }
        });
    }

    // Initialize stats animation
    initStatsAnimation();

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const fadeUpElements = document.querySelectorAll('.large-text, .stat-text, .service-card, .work-item, .stat');
    console.log('📏 Found fade-up elements:', fadeUpElements.length);

fadeUpElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

    // ========================================
    // NAVBAR SCROLL BEHAVIOR
    // ========================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

    // ========================================
    // SMOOTH SCROLLING
    // ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 100
                },
                ease: "power3.inOut"
            });
            
            // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                    navbar.classList.remove('menu-open');
                body.classList.remove('menu-open');
            }
        }
    });
});

    // ========================================
    // TESTIMONIAL SLIDER
    // ========================================
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');
const dotsContainer = document.querySelector('.testimonial-dots');

let currentIndex = 0;
let autoplayInterval;

    if (testimonialItems.length > 0 && dotsContainer) {
// Create dots
testimonialItems.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

        // Update slider function
function updateSlider() {
            if (testimonialsTrack) {
    const newTransform = -currentIndex * 100;
    testimonialsTrack.style.transform = `translateX(${newTransform}%)`;
    
    testimonialItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
            }
}

// Navigation functions
function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoplay();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    updateSlider();
    resetAutoplay();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    updateSlider();
    resetAutoplay();
}

// Event listeners
        if (prevButton) prevButton.addEventListener('click', prevSlide);
        if (nextButton) nextButton.addEventListener('click', nextSlide);

// Touch events for swipe
let touchStartX = 0;
let touchEndX = 0;

        if (testimonialsTrack) {
testimonialsTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

testimonialsTrack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
            });
}

        // Autoplay functions
function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Initialize slider
updateSlider();
startAutoplay();

// Pause autoplay on hover
        if (testimonialsTrack) {
testimonialsTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
testimonialsTrack.addEventListener('mouseleave', startAutoplay); 
        }

        console.log('✅ Testimonial slider initialized');
    }

    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    // Initialize EmailJS 
    emailjs.init("6LVL8JCu6dGzprKMP"); // EmailJS public key
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Prepare email parameters
            const templateParams = {
                client_name: formData.get('name') || 'No especificado',
                client_email: formData.get('email') || 'No especificado',
                message: formData.get('message') || 'Sin mensaje',
                to_name: 'Angel Scott',
                to_email: 'angelscott2004@gmail.com',
                form_type: 'Contacto General'
            };
            
            // Send email via EmailJS
            emailjs.send('service_mqv1r38', 'template_magna_contact', templateParams)
                .then(function(response) {
                    console.log('Contact form SUCCESS!', response.status, response.text);
                    
                    showFormMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                    contactForm.reset();
                    
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                }, function(error) {
                    console.log('Contact form FAILED...', error);
                    
                    showFormMessage('Error al enviar el mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp al (809) 358-8113.', 'error');
                    
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }

    // Form message display function
    function showFormMessage(message, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        const form = document.getElementById('contactForm');
        if (form) {
            form.parentNode.insertBefore(messageDiv, form.nextSibling);
            
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => messageDiv.remove(), 300);
            }, 5000);
        }
    }

    // ========================================
    // FORM VALIDATION
    // ========================================
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
            } else {
                this.classList.remove('error');
            }
        });
        
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

    // ========================================
    // CUSTOM CURSOR (DISABLED - WAS CAUSING SCROLL ISSUES)
    // ========================================
    // Custom cursor disabled to fix auto-scroll issue on mouse movement

    console.log('🎉 Magna Web app fully initialized!');
}); 