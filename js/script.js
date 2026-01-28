/**
 * Blog Gaming - JavaScript Principal
 * Autor: Thomas Miranda
 * 
 * Funcionalidades:
 * - Inicialización de AOS (Animate On Scroll)
 * - Efecto scroll en navbar
 * - Validación de formularios
 * - Mejoras de accesibilidad
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // INICIALIZACIÓN DE AOS (Animate On Scroll)
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,          // Duración de la animación en ms
            once: true,             // Animar solo una vez
            offset: 100,            // Offset desde el elemento original (en px)
            easing: 'ease-out-cubic', // Función de easing
            delay: 0,               // Delay global
            anchorPlacement: 'top-bottom' // Define qué posición del elemento respecto a la ventana debe activar la animación
        });
    }

    // ==========================================
    // EFECTO SCROLL EN NAVBAR
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Función para manejar el scroll
        function handleNavbarScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Agregar listener con throttle para mejor performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleNavbarScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Ejecutar al cargar por si la página está scrolleada
        handleNavbarScroll();
    }

    // ==========================================
    // VALIDACIÓN DE FORMULARIOS
    // ==========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            // Prevenir envío si el formulario no es válido
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                
                // Mostrar mensajes de validación
                const invalidInputs = form.querySelectorAll(':invalid');
                invalidInputs.forEach(function(input) {
                    input.classList.add('is-invalid');
                    
                    // Crear mensaje de error si no existe
                    let feedback = input.nextElementSibling;
                    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                        feedback = document.createElement('div');
                        feedback.className = 'invalid-feedback';
                        feedback.textContent = input.validationMessage || 'Este campo es requerido';
                        input.parentNode.appendChild(feedback);
                    }
                });
                
                // Focus en el primer campo inválido
                if (invalidInputs.length > 0) {
                    invalidInputs[0].focus();
                }
            } else {
                // Si el formulario es válido, mostrar mensaje de éxito
                event.preventDefault(); // Prevenir para demo (quitar en producción si hay backend)
                
                // Mostrar alerta de éxito
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.setAttribute('role', 'alert');
                successMessage.innerHTML = '<strong>¡Mensaje enviado!</strong> Gracias por contactarnos. Te responderemos pronto.';
                
                form.appendChild(successMessage);
                form.reset();
                
                // Remover mensaje después de 5 segundos
                setTimeout(function() {
                    successMessage.remove();
                }, 5000);
            }
            
            form.classList.add('was-validated');
        });
        
        // Limpiar estado de validación cuando el usuario escribe
        form.querySelectorAll('input, textarea, select').forEach(function(input) {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
                const feedback = this.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.remove();
                }
            });
        });
    });

    // ==========================================
    // MEJORAS DE ACCESIBILIDAD
    // ==========================================
    
    // Skip to main content functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    }
    
    // Mejorar accesibilidad de enlaces externos
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(function(link) {
        // Agregar indicador visual para lectores de pantalla
        if (!link.querySelector('.visually-hidden')) {
            const srText = document.createElement('span');
            srText.className = 'visually-hidden';
            srText.textContent = ' (abre en nueva ventana)';
            link.appendChild(srText);
        }
    });

    // ==========================================
    // LAZY LOADING FALLBACK
    // ==========================================
    // Para navegadores que no soportan loading="lazy" nativo
    if ('loading' in HTMLImageElement.prototype === false) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const lazyLoad = function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        };
        
        const observer = new IntersectionObserver(lazyLoad, {
            rootMargin: '100px'
        });
        
        lazyImages.forEach(function(img) {
            observer.observe(img);
        });
    }

    // ==========================================
    // BOTÓN "VOLVER ARRIBA"
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // ANIMACIÓN DE CARDS AL HOVER
    // ==========================================
    const cards = document.querySelectorAll('.card, .product-card, figure');
    
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==========================================
    // CONSOLE LOG PARA DESARROLLO
    // ==========================================
    console.log('🎮 Blog Gaming - Scripts cargados correctamente');
    console.log('📧 Contacto: contacto@blogdegaming.com');
});

// ==========================================
// HELPER: Detectar si el usuario prefiere reducir movimiento
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desactivar AOS si el usuario prefiere reducir movimiento
    if (typeof AOS !== 'undefined') {
        AOS.init({
            disable: true
        });
    }
}
