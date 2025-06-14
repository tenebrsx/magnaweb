// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
const heroLines = document.querySelectorAll('.work-hero .line');

gsap.from(heroLines, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Work Items Animation
const workItems = document.querySelectorAll('.work-item');

workItems.forEach((item, index) => {
    // Image Animation
    gsap.from(item.querySelector('.work-image'), {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });

    // Info Animation
    gsap.from(item.querySelector('.work-info'), {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });
});

// Service Cards Animation
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });

    // Features Animation
    const features = card.querySelectorAll('.service-features li');
    features.forEach((feature, i) => {
        gsap.from(feature, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            delay: (index * 0.2) + (i * 0.1),
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });
});

// Process Steps Animation
const processSteps = document.querySelectorAll('.process-step');

processSteps.forEach((step, index) => {
    gsap.from(step, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
            trigger: step,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });
});

// CTA Section Animation
const ctaContent = document.querySelector('.cta-content');

gsap.from(ctaContent, {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
        trigger: ctaContent,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

// Hover Animations
workItems.forEach(item => {
    const image = item.querySelector('.work-image');
    const arrow = item.querySelector('.arrow');

    item.addEventListener('mouseenter', () => {
        gsap.to(image, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
        });
        if (arrow) {
            gsap.to(arrow, {
                x: 5,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        });
        if (arrow) {
            gsap.to(arrow, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}); 