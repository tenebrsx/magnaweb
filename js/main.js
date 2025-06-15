// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Debug GSAP and ScrollTrigger availability
console.log('GSAP loaded:', typeof gsap !== 'undefined');
console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');

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
        
        if (statNumbers.length === 0) {
            console.log('No stat numbers found, retrying in 500ms...');
            setTimeout(initStatsAnimation, 500);
            return;
        }
        
        statNumbers.forEach(stat => {
            const targetValue = parseFloat(stat.getAttribute('data-value'));
            console.log('Setting up animation for stat:', targetValue);
            
            // Create ScrollTrigger animation
            ScrollTrigger.create({
                trigger: stat,
                start: "top 85%",
                once: true,
                onEnter: () => {
                    console.log('🎯 Animating stat:', targetValue);
                    animateStat(stat, targetValue);
                }
            });
        });

        console.log('✅ Stats animation system initialized');
    }

    // Animation function
    function animateStat(stat, targetValue) {
        gsap.fromTo({ value: 0 }, {
            value: targetValue,
            duration: 2.5,
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
            },
            onComplete: () => {
                console.log('✅ Animation completed for stat:', targetValue);
                // Ensure final value is set correctly
                if (targetValue === 24) {
                    stat.textContent = '24/7';
                } else if (targetValue === 78.3) {
                    stat.textContent = '78.3%';
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
    const fadeUpElements = document.querySelectorAll('.large-text, .stat-text, .service-card, .work-item');
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
            
            // Simulate form submission (replace with actual EmailJS implementation)
            setTimeout(() => {
                console.log('Form submitted:', {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message')
                });
                
                showFormMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
                contactForm.reset();
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
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
    // CUSTOM CURSOR (OPTIONAL)
    // ========================================
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

    // Add hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .work-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2, duration: 0.3 });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
    });

    console.log('🎉 Magna Web app fully initialized!');
}); 