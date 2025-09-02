// Variables globales
let currentSlide = 1;
const totalSlides = 34;

// Elementos del DOM
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');
const progressBar = document.getElementById('progressBar');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    updateSlideDisplay();
    updateProgressBar();
    addSlideAnimations();
});

// Navegación con botones
prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) {
        navigateToSlide(currentSlide - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides) {
        navigateToSlide(currentSlide + 1);
    }
});

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            if (currentSlide > 1) {
                navigateToSlide(currentSlide - 1);
            }
            break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ': // Espacio
            if (currentSlide < totalSlides) {
                navigateToSlide(currentSlide + 1);
            }
            break;
        case 'Home':
            navigateToSlide(1);
            break;
        case 'End':
            navigateToSlide(totalSlides);
            break;
        case 'Escape':
            // Modo pantalla completa
            toggleFullscreen();
            break;
    }
});

// Navegación con gestos táctiles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentSlide < totalSlides) {
            // Swipe izquierda - siguiente slide
            navigateToSlide(currentSlide + 1);
        } else if (diff < 0 && currentSlide > 1) {
            // Swipe derecha - slide anterior
            navigateToSlide(currentSlide - 1);
        }
    }
}

// Función principal de navegación
function navigateToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides) return;
    
    // Remover clase active del slide actual
    slides[currentSlide - 1].classList.remove('active');
    
    // Actualizar slide actual
    currentSlide = slideNumber;
    
    // Agregar clase active al nuevo slide
    slides[currentSlide - 1].classList.add('active');
    
    // Actualizar UI
    updateSlideDisplay();
    updateProgressBar();
    
    // Reiniciar animaciones del slide
    restartSlideAnimations(currentSlide);
    
    // Efectos especiales por slide
    addSlideSpecificEffects(currentSlide);
}

// Actualizar display de navegación
function updateSlideDisplay() {
    slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    
    // Actualizar estado de botones
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
}

// Actualizar barra de progreso
function updateProgressBar() {
    const progress = (currentSlide / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
}

// Reiniciar animaciones del slide
function restartSlideAnimations(slideNum) {
    const slide = slides[slideNum - 1];
    const animatedElements = slide.querySelectorAll('[class*="animate"], .quote-box, .model-card, .principle-card, .practice-item, .conclusion-item');
    
    animatedElements.forEach((element, index) => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = null;
    });
}

// Efectos especiales por slide
function addSlideSpecificEffects(slideNum) {
    switch(slideNum) {
        case 1:
            // Slide de título - efecto de partículas
            createParticleEffect();
            break;
        case 4:
            // Principios fundamentales - animación escalonada
            animatePrincipleCards();
            break;
        case 6:
            // Calidad - efecto de pulso
            animateQualityCircle();
            break;
        case 7:
            animateAdaptation();
            break;
        case 8:
            animateTeam();
            break;
        case 9:
            animateCoordination();
            break;
        case 10:
            animateChange();
            break;
        case 11:
            animateRisk();
            break;
        case 12:
            animateValue();
            break;
        case 13:
            // Principios de práctica - animación de lista
            animatePracticeList();
            break;
        case 14:
            // Divide y Vencerás + Abstracción
            animateDivideConquer();
            break;
        case 15:
            // Uso de Abstracción
            animateAbstractionUsage();
            break;
        case 16:
            // Coherencia
            animateCoherence();
            break;
        case 17:
            // Transferencia de Información
            animateInformationTransfer();
            break;
        case 18:
            // Modularidad
            animateModularity();
            break;
        case 19:
            // Patrones
            animatePatterns();
            break;
        case 20:
            // Mantenimiento
            animateMaintenance();
            break;
        case 21:
            // Mantenimiento - animación de mantenimiento
            animateMaintenance();
            break;
        case 22:
            // Título de principios estructurales - sin animación especial
            break;
        case 23:
            // Principios estructurales - animación escalonada
            animateStructuralPrinciples();
            break;
        case 24:
            // Principios de comunicación - animación escalonada
            animateCommunicationPrinciples();
            break;
        case 25:
            // Conclusiones - efecto final
            animateConclusions();
            break;
    }
}

// Efecto de partículas para slide de título
function createParticleEffect() {
    const titleSlide = document.getElementById('slide1');
    
    // Remover partículas existentes
    const existingParticles = titleSlide.querySelectorAll('.particle');
    existingParticles.forEach(p => p.remove());
    
    // Crear nuevas partículas
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat 3s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                pointer-events: none;
            `;
            titleSlide.appendChild(particle);
            
            // Remover partícula después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 3000);
        }, i * 100);
    }
}

// Animación escalonada para tarjetas de principios
function animatePrincipleCards() {
    const cards = document.querySelectorAll('#slide4 .principle-card');
    cards.forEach((card, index) => {
        card.style.transform = 'translateY(50px) scale(0.8)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
        }, index * 150);
    });
}

// Animación del círculo de calidad
function animateQualityCircle() {
    const circle = document.querySelector('#slide6 .quality-circle');
    if (circle) {
        circle.style.transform = 'scale(0) rotate(0deg)';
        circle.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            circle.style.transform = 'scale(1) rotate(360deg)';
        }, 300);
    }
}

// Animación de lista de práctica
function animatePracticeList() {
    const items = document.querySelectorAll('#slide8 .practice-item');
    items.forEach((item, index) => {
        item.style.transform = 'translateX(-100px)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Animación de principios estructurales
function animateStructuralPrinciples() {
    const elements = [
        '.principle-subtitle',
        '.info-section',
        '.client-block',
        '.user-block'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 300);
        }
    });
    
    // Animar elementos de las listas
    setTimeout(() => {
        const listItems = document.querySelectorAll('.info-list li, .block-list li');
        listItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'all 0.4s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 50);
            }, index * 150);
        });
    }, 1200);
}

// Animación de principios de comunicación
function animateCommunicationPrinciples() {
    const items = document.querySelectorAll('#slide22 .communication-item');
    items.forEach((item, index) => {
        item.style.transform = 'translateX(-100px) rotateY(-15deg)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            item.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.transform = 'translateX(0) rotateY(0deg)';
            item.style.opacity = '1';
        }, index * 120);
    });
}

// Animación de principios de comunicación continuación
function animateCommunicationContinuation() {
    const items = document.querySelectorAll('#slide23 .communication-item');
    items.forEach((item, index) => {
        item.style.transform = 'translateY(50px) scale(0.8)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.transform = 'translateY(0) scale(1)';
            item.style.opacity = '1';
            
            // Efecto especial para items especiales (8.1, 8.2, 8.3)
            if (item.classList.contains('special')) {
                setTimeout(() => {
                    item.style.transform = 'translateY(0) scale(1.05)';
                    setTimeout(() => {
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 200);
                }, 300);
            }
        }, index * 100);
    });
}

// Animaciones para las nuevas secciones
function animateAdaptation() {
    const slide = document.getElementById('slide7');
    if (!slide) return;
    
    const items = slide.querySelectorAll('.adaptation-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

function animateTeam() {
    const slide = document.getElementById('slide8');
    if (!slide) return;
    
    const foundation = slide.querySelector('.foundation-item');
    const principles = slide.querySelectorAll('.team-principle');
    
    if (foundation) {
        foundation.style.opacity = '0';
        foundation.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            foundation.style.transition = 'all 0.6s ease';
            foundation.style.opacity = '1';
            foundation.style.transform = 'scale(1)';
        }, 200);
    }
    
    principles.forEach((principle, index) => {
        principle.style.opacity = '0';
        principle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            principle.style.transition = 'all 0.5s ease';
            principle.style.opacity = '1';
            principle.style.transform = 'translateY(0)';
        }, 800 + (index * 150));
    });
}

function animateCoordination() {
    const slide = document.getElementById('slide9');
    if (!slide) return;
    
    const items = slide.querySelectorAll('.coord-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.7s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 250);
    });
}

function animateChange() {
    const slide = document.getElementById('slide10');
    if (!slide) return;
    
    const items = slide.querySelectorAll('.change-item');
    const process = slide.querySelector('.change-process');
    const goal = slide.querySelector('.change-goal');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    if (process) {
        process.style.opacity = '0';
        process.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            process.style.transition = 'all 0.8s ease';
            process.style.opacity = '1';
            process.style.transform = 'scale(1)';
        }, 600);
    }
    
    if (goal) {
        goal.style.opacity = '0';
        goal.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            goal.style.transition = 'all 0.6s ease';
            goal.style.opacity = '1';
            goal.style.transform = 'translateY(0)';
        }, 1000);
    }
}

function animateRisk() {
    const slide = document.getElementById('slide11');
    if (!slide) return;
    
    const items = slide.querySelectorAll('.risk-item');
    const timeline = slide.querySelector('.risk-timeline');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.7s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    if (timeline) {
        timeline.style.opacity = '0';
        timeline.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            timeline.style.transition = 'all 0.8s ease';
            timeline.style.opacity = '1';
            timeline.style.transform = 'scale(1)';
        }, 600);
    }
}

function animateValue() {
    const slide = document.getElementById('slide12');
    if (!slide) return;
    
    const items = slide.querySelectorAll('.value-item');
    const badges = slide.querySelectorAll('.quality-badge');
    
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 200);
    });
    
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.5s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
}

// Animaciones para las nuevas secciones
function animateDivideConquer() {
    const elements = document.querySelectorAll('#slide14 .definition-section, #slide14 .abstraction-section');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

function animateAbstractionUsage() {
    const elements = document.querySelectorAll('#slide15 .usage-item');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

function animateCoherence() {
    const elements = document.querySelectorAll('#slide16 .coherence-principle, #slide16 .coherence-examples, #slide16 .coherence-benefit');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, index * 250);
    });
}

function animateInformationTransfer() {
    const elements = document.querySelectorAll('#slide17 .transfer-flows, #slide17 .interface-focus, #slide17 .transfer-goal');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

function animateModularity() {
    const elements = document.querySelectorAll('#slide18 .modularity-concept, #slide18 .modularity-benefit, #slide18 .modularity-practice');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 250);
    });
}

function animatePatterns() {
    const elements = document.querySelectorAll('#slide19 .patterns-objective, #slide19 .patterns-benefits, #slide19 .patterns-perspective');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'rotateY(20deg)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'rotateY(0deg)';
        }, index * 300);
    });
}

function animateMaintenance() {
    const elements = document.querySelectorAll('#slide20 .maintenance-need, #slide20 .maintenance-approach, #slide20 .maintenance-goal');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 250);
    });
}

// Animación de conclusiones
function animateConclusions() {
    const items = document.querySelectorAll('#slide24 .conclusion-item');
    items.forEach((item, index) => {
        item.style.transform = 'translateX(-50px) scale(0.9)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.transform = 'translateX(0) scale(1)';
            item.style.opacity = '1';
        }, index * 200);
    });
}

// Agregar animaciones CSS dinámicas
function addSlideAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0;
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 1;
            }
        }
        
        @keyframes slideInFromLeft {
            from {
                transform: translateX(-100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideInFromRight {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes bounceIn {
            0% {
                transform: scale(0.3);
                opacity: 0;
            }
            50% {
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes fadeInUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        .slide.active .quote-box {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .slide.active .model-card {
            animation: bounceIn 0.6s ease-out forwards;
        }
        
        .slide.active .principle-card {
            animation: slideInFromLeft 0.6s ease-out forwards;
        }
        
        .slide.active .practice-item {
            animation: slideInFromRight 0.6s ease-out forwards;
        }
        
        .slide.active .communication-item {
            animation: slideInFromLeft 0.7s ease-out forwards;
        }
        
        .slide.active .conclusion-item {
            animation: fadeInUp 0.8s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

// Modo pantalla completa
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error al entrar en pantalla completa:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Efectos de hover mejorados
document.addEventListener('DOMContentLoaded', function() {
    // Efecto hover para tarjetas
    const cards = document.querySelectorAll('.model-card, .principle-card, .practice-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efecto parallax sutil para elementos decorativos
    document.addEventListener('mousemove', function(e) {
        const circles = document.querySelectorAll('.decorative-circle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            circle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// Auto-play opcional (descomentarear para activar)
/*
let autoPlayInterval;
const autoPlayDelay = 5000; // 5 segundos

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides) {
            navigateToSlide(currentSlide + 1);
        } else {
            navigateToSlide(1); // Volver al inicio
        }
    }, autoPlayDelay);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

// Pausar auto-play en hover
document.addEventListener('mouseenter', stopAutoPlay);
document.addEventListener('mouseleave', startAutoPlay);

// Iniciar auto-play
startAutoPlay();
*/

// Indicadores de slide (opcional)
function createSlideIndicators() {
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'slide-indicators';
    indicatorContainer.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
    `;
    
    for (let i = 1; i <= totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'slide-indicator';
        indicator.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        if (i === currentSlide) {
            indicator.style.background = '#3498db';
            indicator.style.transform = 'scale(1.2)';
        }
        
        indicator.addEventListener('click', () => navigateToSlide(i));
        indicatorContainer.appendChild(indicator);
    }
    
    document.body.appendChild(indicatorContainer);
    
    // Actualizar indicadores cuando cambie el slide
    const originalNavigate = navigateToSlide;
    navigateToSlide = function(slideNumber) {
        originalNavigate(slideNumber);
        updateIndicators();
    };
    
    function updateIndicators() {
        const indicators = document.querySelectorAll('.slide-indicator');
        indicators.forEach((indicator, index) => {
            if (index + 1 === currentSlide) {
                indicator.style.background = '#3498db';
                indicator.style.transform = 'scale(1.2)';
            } else {
                indicator.style.background = 'rgba(255, 255, 255, 0.5)';
                indicator.style.transform = 'scale(1)';
            }
        });
    }
}

// Activar indicadores (descomentarear para usar)
// createSlideIndicators();

// Información de ayuda
function showHelp() {
    const helpModal = document.createElement('div');
    helpModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        backdrop-filter: blur(5px);
    `;
    
    helpModal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        ">
            <h2 style="margin-bottom: 1rem; color: #2c3e50;">Controles de Navegación</h2>
            <div style="text-align: left; margin-bottom: 1.5rem; color: #34495e;">
                <p><strong>← →</strong> Navegar entre slides</p>
                <p><strong>Espacio</strong> Siguiente slide</p>
                <p><strong>Home/End</strong> Primer/Último slide</p>
                <p><strong>Escape</strong> Pantalla completa</p>
                <p><strong>Swipe</strong> En dispositivos táctiles</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 0.5rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-size: 1rem;
            ">Cerrar</button>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // Cerrar con click fuera del modal
    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            helpModal.remove();
        }
    });
}

// Mostrar ayuda con F1
document.addEventListener('keydown', function(e) {
    if (e.key === 'F1') {
        e.preventDefault();
        showHelp();
    }
});

console.log('🎯 Presentación cargada exitosamente!');
console.log('💡 Presiona F1 para ver los controles de navegación');
console.log('🚀 ¡Disfruta de la presentación!');