// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Debug GSAP and ScrollTrigger availability
console.log('GSAP loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const body = document.body;

if (mobileMenu && navLinks) {
    // Add both click and touchstart for better mobile compatibility
    const toggleMenu = () => {
        console.log('Mobile menu clicked'); // Debug log
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        navbar.classList.toggle('menu-open');
        body.classList.toggle('menu-open');
    };
    
    mobileMenu.addEventListener('click', toggleMenu);
    mobileMenu.addEventListener('touchstart', toggleMenu);

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            navbar.classList.remove('menu-open');
            body.classList.remove('menu-open');
        }
    });
}

// Hero Text Animation
const splitText = document.querySelector('.split-text');
const lines = splitText.querySelectorAll('.line');

gsap.from(lines, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Statistics Counter Animation - Universal version
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-value]');
    
    console.log('Found stat numbers:', statNumbers.length); // Debug log
    
    if (statNumbers.length === 0) {
        console.log('No stat numbers found, retrying in 100ms...');
        setTimeout(initStatsAnimation, 100);
        return;
    }
    
    statNumbers.forEach(stat => {
        const targetValue = parseFloat(stat.getAttribute('data-value'));
        console.log('Setting up animation for stat:', targetValue); // Debug log
        
        // Reset to 0 initially
        if (targetValue === 24) {
            stat.textContent = '0/7';
        } else {
            stat.textContent = '0%';
        }
        
        ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            once: true,
            onEnter: () => {
                console.log('🎯 Triggering animation for:', targetValue); // Debug log
                
                gsap.fromTo({value: 0}, 
                    {
                        value: targetValue,
                        duration: 2.5,
                        ease: "power2.out",
                        onUpdate: function() {
                            const currentValue = this.targets()[0].value;
                            
                            // Handle different stat types
                            if (targetValue === 24) {
                                // Special case for 24/7
                                stat.textContent = Math.round(currentValue) + '/7';
                            } else if (targetValue === 78.3) {
                                // 78.3% case
                                stat.textContent = currentValue.toFixed(1) + '%';
                            } else {
                                // Regular percentage case
                                stat.textContent = Math.round(currentValue) + '%';
                            }
                        }
                    }
                );
            }
        });
    });
}

// Initialize after a short delay to ensure DOM is ready
setTimeout(initStatsAnimation, 500);

// Fallback: Simple animation without ScrollTrigger for testing
function testStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number[data-value]');
    console.log('🧪 Testing basic animation for', statNumbers.length, 'stats');
    
    statNumbers.forEach(stat => {
        const targetValue = parseFloat(stat.getAttribute('data-value'));
        
        // Reset to 0 initially
        if (targetValue === 24) {
            stat.textContent = '0/7';
        } else {
            stat.textContent = '0%';
        }
        
        // Simple GSAP animation without ScrollTrigger
        gsap.fromTo({value: 0}, 
            {
                value: targetValue,
                duration: 3,
                delay: 1,
                ease: "power2.out",
                onUpdate: function() {
                    const currentValue = this.targets()[0].value;
                    
                    if (targetValue === 24) {
                        stat.textContent = Math.round(currentValue) + '/7';
                    } else if (targetValue === 78.3) {
                        stat.textContent = currentValue.toFixed(1) + '%';
                    } else {
                        stat.textContent = Math.round(currentValue) + '%';
                    }
                }
            }
        );
    });
}

// Uncomment this line to test basic animation (remove after testing)
// setTimeout(testStatsAnimation, 2000);

// Scroll Animations
const fadeUpElements = document.querySelectorAll('.large-text, .stat-text, .service-card, .work-item');

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

// Navbar Background Change on Scroll
const navbar = document.querySelector('.navbar');
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

// Smooth Scrolling
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
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                navbar.classList.remove('menu-open');
                body.classList.remove('menu-open');
            }
        }
    });
});

// EmailJS Configuration
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact Form Handler with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
            to_name: 'Magna Web Team'
        };
        
        // Send email via EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                showFormMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                showFormMessage('Error al enviar el mensaje. Por favor intenta de nuevo o contáctanos por WhatsApp.', 'error');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Form Message Display
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert after form
    const form = document.getElementById('contactForm');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form.nextSibling);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Enhanced Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add input event listeners for real-time validation
document.addEventListener('DOMContentLoaded', function() {
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
});

// Cursor Animation (Optional)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .work-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            duration: 0.3
        });
    });
    
    element.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            duration: 0.3
        });
    });
});

// Testimonial Slider
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');
const dotsContainer = document.querySelector('.testimonial-dots');

let currentIndex = 0;
let autoplayInterval;

// Create dots
if (testimonialItems.length > 0 && dotsContainer) {
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

// Update slider
function updateSlider() {
    if (testimonialsTrack) {
        const newTransform = -currentIndex * 100;
        testimonialsTrack.style.transform = `translateX(${newTransform}%)`;
        
        // Update active states
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
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Touch events for swipe
let touchStartX = 0;
let touchEndX = 0;

testimonialsTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
});

testimonialsTrack.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Autoplay
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
testimonialsTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
testimonialsTrack.addEventListener('mouseleave', startAutoplay); 