// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
const heroLines = document.querySelectorAll('.about-hero .line');

gsap.from(heroLines, {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// Mission Section Animation
const missionContent = document.querySelector('.mission-content');

gsap.from(missionContent, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: missionContent,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

// Stats animations are now handled exclusively in main.js to avoid conflicts

// Values Animation
const valueCards = document.querySelectorAll('.value-card');

valueCards.forEach((card, index) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });
});

// Team Cards Animation
const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach((card, index) => {
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
});

// Culture Section Animation
const cultureContent = document.querySelector('.culture-content');
const cultureImage = document.querySelector('.culture-image');

gsap.from(cultureContent, {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: cultureContent,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

gsap.from(cultureImage, {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
        trigger: cultureImage,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

// Contact CTA Animation
const contactCta = document.querySelector('.contact-cta');

gsap.from(contactCta, {
    opacity: 0,
    y: 30,
    duration: 1,
    scrollTrigger: {
        trigger: contactCta,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
    }
});

// Stats animations are now handled in main.js universally 