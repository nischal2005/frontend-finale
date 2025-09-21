// Carousel functionality
class Carousel {
    constructor() {
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.isTransitioning = false;
        
        // Get DOM elements
        this.carousel = document.getElementById('carousel');
        this.cards = document.querySelectorAll('.card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        
        // Check if elements exist
        if (!this.carousel || this.cards.length === 0) {
            console.warn('Carousel elements not found');
            return;
        }
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize display
        this.updateDisplay();
        
        // Start auto-slide
        this.startAutoSlide();
    }
    
    setupEventListeners() {
        // Previous button
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToPrevious();
                this.resetAutoSlide();
            });
        }
        
        // Next button  
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToNext();
                this.resetAutoSlide();
            });
        }
        
        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.goToPrevious();
                this.resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.goToNext();
                this.resetAutoSlide();
            }
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
        
        // Pause auto-slide on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - go to next
                this.goToNext();
            } else {
                // Swiped right - go to previous
                this.goToPrevious();
            }
            this.resetAutoSlide();
        }
    }
    
    goToNext() {
        if (this.isTransitioning) return;
        const nextIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(nextIndex);
    }
    
    goToPrevious() {
        if (this.isTransitioning) return;
        const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goToSlide(prevIndex);
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentIndex || index < 0 || index >= this.cards.length) {
            return;
        }
        
        this.isTransitioning = true;
        this.currentIndex = index;
        this.updateDisplay();
        
        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }
    
    updateDisplay() {
        // Update cards
        this.cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === this.currentIndex) {
                card.classList.add('active');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            }
        });
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.goToNext();
        }, 4000); // Change slide every 4 seconds
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        // Restart after 6 seconds of inactivity
        setTimeout(() => {
            this.startAutoSlide();
        }, 6000);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('bg', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    
    // Initialize carousel
    new Carousel();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.carousel) {
        window.carousel.stopAutoSlide();
    }
});