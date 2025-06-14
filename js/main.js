// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
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

// Statistics Counter Animation
const animateCounter = (element, target) => {
    const originalText = element.textContent;
    const isPercentage = originalText.includes('%');
    const isSlash = originalText.includes('/');
    
    let suffix = '';
    if (isPercentage) suffix = '%';
    else if (isSlash) suffix = '/7';
    
    gsap.fromTo(element, 
        { 
            textContent: 0 
        }, 
        {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: target % 1 === 0 ? 1 : 0.1 },
            stagger: 0.2,
            scrollTrigger: {
                trigger: element,
                start: "top bottom-=100",
                toggleActions: "play none none none"
            },
            onUpdate: function() {
                const currentValue = Math.round(this.targets()[0].textContent * 10) / 10;
                element.textContent = currentValue + suffix;
            }
        }
    );
};

// Initialize stat counters
const statNumbers = document.querySelectorAll('.stat-number[data-value]');
statNumbers.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-value'));
    animateCounter(stat, target);
});

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