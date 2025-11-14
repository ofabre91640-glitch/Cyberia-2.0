// ====== CYBERIA - JavaScript Interactif ======

let isLoading = true;

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', initializeWebsite);

function initializeWebsite() {
    setTimeout(() => {
        hideLoader();
        initializeComponents();
    }, 2000);
}

function hideLoader() {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.classList.add('hidden');
        isLoading = false;
    }
}

function initializeComponents() {
    initNavigation();
    initScrollEffects();
    initCounters();
    initCarFilters();
    initContactForm();
    initScrollReveal();
    initParticles();
    initTypingEffect();
}

// === NAVIGATION ===
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Menu hamburger
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fermer menu mobile
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Scroll navbar
    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 100);
        }
    });

    // Navigation fluide
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// === EFFETS DE SCROLL ===
function initScrollEffects() {
    // Parallax effect pour le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Active link navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// === COMPTEURS ANIMÉS ===
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const observerOptions = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function startCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// === FILTRES DE VOITURES ===
function initCarFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            carCards.forEach((card, index) => {
                // Animation de sortie améliorée
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'translateY(20px)';
                card.style.opacity = '0';

                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        card.style.flexDirection = 'column';
                        
                        // Animation d'entrée décalée pour un effet cascade
                        setTimeout(() => {
                            card.style.transform = 'translateY(0)';
                            card.style.opacity = '1';
                        }, 100 + (index * 50));
                    } else {
                        card.style.display = 'none';
                    }
                }, 200);
            });
        });
    });

    // Les boutons de détails sont maintenant des liens directs vers les pages HTML
    // Plus besoin de JavaScript pour les modales des voitures
}

// Les modales des voitures ont été remplacées par des pages HTML dédiées

// === FORMULAIRE DE CONTACT ===
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    // Gestion des labels flottants
    inputs.forEach(input => {
        // Vérifier si l'input a une valeur au chargement
        if (input.value !== '') {
            input.classList.add('has-value');
        }

        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentNode.classList.remove('focused');
            if (input.value !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });

        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });

    // Soumission du formulaire
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission(form);
        });
    }
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;

    // Animation de chargement
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;

    // Simulation d'envoi
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        submitButton.style.background = 'linear-gradient(135deg, #00ff00, #008000)';
        
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
            form.reset();
            
            // Retirer les classes has-value des inputs
            const inputs = form.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
            inputs.forEach(input => {
                input.classList.remove('has-value');
            });
        }, 2000);
    }, 2000);
}

// === SCROLL REVEAL ===
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.car-card, .service-card, .stat-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, 100);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// === PARTICULES CYBERPUNK ===
function initParticles() {
    createCyberParticles();
}

function createCyberParticles() {
    const particlesContainer = document.querySelector('.cyber-particles');
    if (!particlesContainer) return;

    // Créer des particules dynamiques
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createParticle(particlesContainer);
        }, i * 200);
    }

    // Continuer à créer des particules
    setInterval(() => {
        if (Math.random() > 0.7) {
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'cyber-particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--primary-color);
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        box-shadow: 0 0 10px var(--primary-color);
        animation: particleMove ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
    `;

    container.appendChild(particle);

    // Supprimer la particule après un certain temps
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

// CSS pour l'animation des particules
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleMove {
        0% {
            transform: translateY(0) translateX(0) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
            transform: translateY(-10px) translateX(5px) scale(1);
        }
        90% {
            opacity: 1;
            transform: translateY(-100px) translateX(-10px) scale(0.8);
        }
        100% {
            opacity: 0;
            transform: translateY(-120px) translateX(-15px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// === EFFET DE FRAPPE ===
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title .glitch');
    if (!heroTitle) return;

    const text = 'CYBERIA';
    const subtitle = document.querySelector('.subtitle');
    
    // Effet de frappe pour le titre
    let i = 0;
    heroTitle.textContent = '';
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // Ajouter l'attribut data-text pour l'effet glitch
            heroTitle.setAttribute('data-text', text);
            
            // Animer le sous-titre
            if (subtitle) {
                subtitle.style.opacity = '0';
                subtitle.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    subtitle.style.transition = 'all 0.8s ease';
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateY(0)';
                }, 500);
            }
        }
    }
    
    setTimeout(typeWriter, 1000);
}

// === UTILITAIRES ===

// Fonction de débounce pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction pour détecter si l'utilisateur préfère moins d'animations
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Optimisation des animations pour les utilisateurs qui préfèrent moins d'animations
if (prefersReducedMotion()) {
    document.body.classList.add('reduced-motion');
    
    const reducedMotionStyle = document.createElement('style');
    reducedMotionStyle.textContent = `
        .reduced-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(reducedMotionStyle);
}

// Optimisation du scroll avec débounce
const optimizedScrollHandler = debounce(() => {
    // Ici vous pouvez ajouter des fonctions qui doivent s'exécuter pendant le scroll
    // mais de manière optimisée
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

// === EASTER EGGS ===

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Effet spécial quand le code Konami est entré
    document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
    
    // Créer une notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--gradient-primary);
        padding: 2rem;
        border-radius: 1rem;
        color: var(--bg-dark);
        font-family: var(--font-primary);
        font-weight: bold;
        z-index: 10000;
        box-shadow: var(--glow-primary);
        animation: easterEggPulse 2s ease-in-out;
    `;
    notification.textContent = '🚀 CYBERIA MODE ACTIVATED! 🚀';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.style.filter = '';
        notification.remove();
    }, 3000);
}

// Animation pour l'easter egg
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes easterEggPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
`;
document.head.appendChild(easterEggStyle);

// === PERFORMANCE ===

// Lazy loading des images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Préchargement des images importantes
function preloadImages() {
    const imagesToPreload = [
        'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ];
    
    imagesToPreload.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Animation de chargement CYBERIA - Version Optimisée
function initLoadingAnimation() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Simuler un temps de chargement optimisé de 1.5 secondes
    setTimeout(() => {
        // Masquer l'écran de chargement
        loadingScreen.classList.add('hidden');
        
        // Afficher le contenu principal après un délai
        setTimeout(() => {
            mainContent.classList.add('visible');
            // Démarrer les animations des particules et autres effets
            initParticleAnimations();
        }, 200);
    }, 1500);
}

// Initialiser les animations de particules après le chargement
function initParticleAnimations() {
    // Réactiver toutes les animations CSS qui étaient en pause
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.style.animationPlayState = 'running';
    });
}

// Initialiser le lazy loading et le préchargement
document.addEventListener('DOMContentLoaded', () => {
    initLoadingAnimation();
    initLazyLoading();
    preloadImages();
    initLegalModal();
});

// Fonction pour gérer la modal des mentions légales
function initLegalModal() {
    const modal = document.getElementById('mentions-modal');
    const mentionsLink = document.querySelector('a[href="#mentions"]');
    const closeModal = document.querySelector('.close-modal');

    if (mentionsLink && modal) {
        mentionsLink.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Fermer la modal en cliquant à l'extérieur
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// === ANALYTICS (SIMULATION) ===
function trackEvent(category, action, label = '') {
    // Simulation de tracking d'événements
    console.log(`📊 Event tracked: ${category} - ${action} - ${label}`);
    
    // Ici vous pourriez intégrer Google Analytics, Matomo, etc.
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
}

// Tracker les clics sur les boutons importants
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary')) {
        trackEvent('CTA', 'Click', 'Primary Button');
    }
    if (e.target.matches('.view-details-btn')) {
        trackEvent('Cars', 'View Details', 'Car Card');
    }
    if (e.target.matches('.filter-btn')) {
        trackEvent('Filter', 'Change', e.target.textContent);
    }
});

console.log('🚀 CYBERIA - Site initialisé avec succès!');