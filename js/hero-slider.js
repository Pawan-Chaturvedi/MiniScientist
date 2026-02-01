// Hero Slider Manager
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.dots = document.querySelectorAll('.slider-dot');
        this.prevBtn = document.querySelector('.slider-arrow.prev');
        this.nextBtn = document.querySelector('.slider-arrow.next');
        this.currentIndex = 0;
        this.autoSlideInterval = null;
        this.autoSlideDuration = 4000; // 4 seconds

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        // Setup event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Setup dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Start auto-slide
        this.startAutoSlide();

        // Pause auto-slide on hover
        const sliderContainer = document.querySelector('.hero-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.pauseAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
        }

        // Show first slide
        this.updateSlider();
    }

    showSlide(index) {
        // Wrap around if index is out of bounds
        if (index >= this.slides.length) {
            this.currentIndex = 0;
        } else if (index < 0) {
            this.currentIndex = this.slides.length - 1;
        } else {
            this.currentIndex = index;
        }

        this.updateSlider();
    }

    updateSlider() {
        // Hide all slides
        this.slides.forEach((slide, index) => {
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
        this.resetAutoSlide();
    }

    previousSlide() {
        this.showSlide(this.currentIndex - 1);
        this.resetAutoSlide();
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoSlide();
    }

    startAutoSlide() {
        if (this.autoSlideInterval) return;

        this.autoSlideInterval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateSlider();
        }, this.autoSlideDuration);
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resetAutoSlide() {
        this.pauseAutoSlide();
        this.startAutoSlide();
    }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
