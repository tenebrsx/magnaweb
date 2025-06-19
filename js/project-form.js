// Form Animations
const formSections = document.querySelectorAll('.form-section');
const formIntro = document.querySelector('.form-intro');

// Animate form sections on scroll
formSections.forEach((section, index) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate form intro
gsap.from(formIntro, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    delay: 0.5
});

// Project Form Handler with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS 
    emailjs.init("6LVL8JCu6dGzprKMP"); // EmailJS public key
    
const projectForm = document.getElementById('projectForm');

    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
    e.preventDefault();
            
            // Validate form
            if (!validateProjectForm(projectForm)) {
                showFormMessage('Por favor completa todos los campos requeridos.', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(projectForm);
            const submitButton = projectForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;

    // Show loading state
            submitButton.textContent = 'Enviando solicitud...';
    submitButton.disabled = true;

    // Get selected project types
    const projectTypes = [];
            projectForm.querySelectorAll('input[name="projectType"]:checked').forEach(checkbox => {
        projectTypes.push(checkbox.value);
    });
            
            // Prepare comprehensive email parameters
            const templateParams = {
                // Business Info
                business_name: formData.get('businessName') || 'No especificado',
                industry: formData.get('industry') || 'No especificado',
                
                // Project Details
                project_types: projectTypes.join(', ') || 'No especificado',
                budget: formData.get('budget') || 'No especificado',
                timeline: formData.get('timeline') || 'No especificado',
                
                // Contact Info
                client_name: formData.get('name') || 'No especificado',
                client_email: formData.get('email') || 'No especificado',
                client_phone: formData.get('phone') || 'No especificado',
                project_details: formData.get('message') || 'Sin detalles adicionales',
                
                // Meta
                to_name: 'Angel Scott',
                to_email: 'angelscott2004@gmail.com',
                form_type: 'Solicitud de Proyecto Detallada'
            };

            // Send email via EmailJS
            emailjs.send('service_mqv1r38', 'template_magna_project', templateParams)
                .then(function(response) {
                    console.log('Project form SUCCESS!', response.status, response.text);
                    
                    // Redirect to thank you page
                    window.location.href = 'gracias.html';
                    
                }, function(error) {
                    console.log('Project form FAILED...', error);
                    
                    // Show error message
                    showFormMessage('Error al enviar la solicitud. Por favor intenta de nuevo o contáctanos directamente por WhatsApp al (809) 358-8113.', 'error');
                    
                    // Reset button
                    submitButton.textContent = originalText;
        submitButton.disabled = false;
                });
});
    }

    // Project Form Validation
    function validateProjectForm(form) {
        const requiredInputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
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
            
            // Phone validation (basic)
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                }
            }
        });

        // Check if at least one project type is selected
        const projectTypeChecked = form.querySelector('input[name="projectType"]:checked');
        const projectTypeGroup = form.querySelector('.checkbox-group');
        if (!projectTypeChecked) {
            projectTypeGroup.classList.add('error');
            isValid = false;
        } else {
            projectTypeGroup.classList.remove('error');
        }
        
        return isValid;
    }
    
    // Form Message Display (same as main.js but for project form)
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Insert after form
        const form = document.getElementById('projectForm');
        if (form) {
            form.parentNode.insertBefore(messageDiv, form.nextSibling);
            
            // Auto-hide success messages after 8 seconds (longer for project form)
            if (type === 'success') {
    setTimeout(() => {
                    messageDiv.style.opacity = '0';
                    setTimeout(() => messageDiv.remove(), 300);
                }, 8000);
            }
        }
    }
    
    // Real-time validation for project form
    const formInputs = document.querySelectorAll('#projectForm input, #projectForm textarea, #projectForm select');
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
        
        input.addEventListener('change', function() {
            this.classList.remove('error');
        });
    });
    
    // Special handling for checkbox group
    const checkboxes = document.querySelectorAll('input[name="projectType"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const anyChecked = document.querySelector('input[name="projectType"]:checked');
            const checkboxGroup = document.querySelector('.checkbox-group');
            if (anyChecked) {
                checkboxGroup.classList.remove('error');
            }
        });
    });
    
});

// Form Field Animations
const formInputs = document.querySelectorAll('input, select, textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}); 