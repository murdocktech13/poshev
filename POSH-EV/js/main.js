// Main Application Controller
class EliteChauffeurApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupFormValidation();
        this.setupAnalytics();
        this.initializeModules();
        
        console.log('Elite Chauffeur Services app initialized');
    }

    // Setup smooth navigation
    setupNavigation() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Setup scroll effects
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrollY = window.scrollY;
            const nav = document.querySelector('nav');
            
            // Update navigation background opacity
            if (nav) {
                if (scrollY > 100) {
                    nav.classList.add('bg-black');
                    nav.classList.remove('bg-black/90');
                } else {
                    nav.classList.add('bg-black/90');
                    nav.classList.remove('bg-black');
                }
            }
            
            // Parallax effect for hero section (subtle)
            const hero = document.querySelector('section');
            if (hero && scrollY < window.innerHeight) {
                hero.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
            
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
    }

    // Setup mobile menu
    setupMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Update button icon
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    if (mobileMenu.classList.contains('hidden')) {
                        icon.className = 'fas fa-bars text-xl';
                    } else {
                        icon.className = 'fas fa-times text-xl';
                    }
                }
            });
            
            // Close menu when clicking on links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = menuBtn.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars text-xl';
                    }
                });
            });
        }
    }

    // Setup form validation
    setupFormValidation() {
        // Real-time email validation
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', this.validateEmail);
            input.addEventListener('input', () => this.clearValidationError(input));
        });

        // Real-time phone validation
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('blur', this.validatePhone);
            input.addEventListener('input', () => this.clearValidationError(input));
        });

        // Format phone numbers as user types
        phoneInputs.forEach(input => {
            input.addEventListener('input', this.formatPhoneNumber);
        });
    }

    // Email validation
    validateEmail(event) {
        const input = event.target;
        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            input.classList.add('form-error');
            this.showValidationError(input, 'Please enter a valid email address');
        } else {
            input.classList.remove('form-error');
            this.clearValidationError(input);
        }
    }

    // Phone validation
    validatePhone(event) {
        const input = event.target;
        const phone = input.value.replace(/\D/g, '');
        
        if (phone && phone.length < 10) {
            input.classList.add('form-error');
            this.showValidationError(input, 'Please enter a valid phone number');
        } else {
            input.classList.remove('form-error');
            this.clearValidationError(input);
        }
    }

    // Format phone number
    formatPhoneNumber(event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        
        input.value = value;
    }

    // Show validation error
    showValidationError(input, message) {
        this.clearValidationError(input);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message text-red-500 text-sm mt-1';
        errorElement.textContent = message;
        errorElement.id = `${input.id}-error`;
        
        input.parentNode.appendChild(errorElement);
    }

    // Clear validation error
    clearValidationError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.remove();
        }
        input.classList.remove('form-error');
    }

    // Setup analytics (placeholder for Google Analytics, etc.)
    setupAnalytics() {
        // Track page views
        this.trackPageView();
        
        // Track button clicks
        this.trackButtonClicks();
        
        // Track form interactions
        this.trackFormInteractions();
    }

    trackPageView() {
        // Implement your analytics tracking here
        console.log('Page view tracked');
    }

    trackButtonClicks() {
        // Track important button clicks
        const importantButtons = document.querySelectorAll('[href="#booking"], .service-card button, .membership-card button');
        importantButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                console.log('Button clicked:', buttonText);
                // Send to your analytics service
            });
        });
    }

    trackFormInteractions() {
        const form = document.getElementById('booking-form');
        if (form) {
            form.addEventListener('submit', () => {
                console.log('Booking form submitted');
                // Track form submission
            });
        }
    }

    // Initialize application modules
    initializeModules() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadModules();
            });
        } else {
            this.loadModules();
        }
    }

    loadModules() {
        try {
            // Initialize services module
            if (window.servicesModule) {
                console.log('Services module loaded');
            }

            // Initialize booking module
            if (window.bookingModule) {
                console.log('Booking module loaded');
            }

            // Initialize payments module
            if (window.paymentsModule) {
                console.log('Payments module loaded');
            }

            // Initialize notifications module
            if (window.notificationsModule) {
                console.log('Notifications module loaded');
            }

        } catch (error) {
            console.error('Error loading modules:', error);
        }
    }

    // Utility function to show loading state
    showLoading(element, text = 'Loading...') {
        if (element) {
            element.innerHTML = `<div class="flex items-center justify-center"><div class="loading mr-2"></div>${text}</div>`;
            element.disabled = true;
        }
    }

    // Utility function to hide loading state
    hideLoading(element, originalText) {
        if (element) {
            element.innerHTML = originalText;
            element.disabled = false;
        }
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm transform translate-x-full transition-transform duration-300`;
        
        // Set color based on type
        switch (type) {
            case 'success':
                toast.classList.add('bg-green-600');
                break;
            case 'error':
                toast.classList.add('bg-red-600');
                break;
            case 'warning':
                toast.classList.add('bg-yellow-600');
                break;
            default:
                toast.classList.add('bg-luxury-gold', 'text-black');
        }
        
        toast.innerHTML = `
            <div class="flex items-center">
                <span class="flex-1">${message}</span>
                <button class="ml-2 text-white hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Slide in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 5000);
    }

    // Handle errors gracefully
    handleError(error, userMessage = 'An error occurred. Please try again.') {
        console.error('Application error:', error);
        this.showToast(userMessage, 'error');
    }

    // Check if user prefers reduced motion
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Accessibility improvements
    setupAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-luxury-gold text-black p-2 z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Announce page changes to screen readers
        const announcePageChange = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };

        // Focus management for modals
        this.setupModalFocus();
    }

    setupModalFocus() {
        const modals = ['payment-modal', 'success-modal'];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('show', () => {
                    // Store currently focused element
                    this.lastFocusedElement = document.activeElement;
                    
                    // Focus first focusable element in modal
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                });
                
                modal.addEventListener('hide', () => {
                    // Return focus to previously focused element
                    if (this.lastFocusedElement) {
                        this.lastFocusedElement.focus();
                        this.lastFocusedElement = null;
                    }
                });
            }
        });
    }
}

// Application Configuration
const appConfig = {
    // Replace with your actual API endpoints
    apiEndpoints: {
        bookings: '/api/bookings',
        payments: '/api/payments',
        notifications: '/api/notifications'
    },
    
    // Replace with your actual service keys
    services: {
        stripe: {
            publishableKey: 'pk_test_your_stripe_key_here' // Replace with actual key
        },
        maps: {
            apiKey: 'your_google_maps_key_here' // For future location features
        }
    },
    
    // App settings
    settings: {
        currency: 'USD',
        timezone: 'America/New_York',
        bookingAdvanceDays: 90,
        cancelationHours: 2
    }
};

// Make config available globally
window.appConfig = appConfig;

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.eliteChauffeurApp = new EliteChauffeurApp();
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    if (window.eliteChauffeurApp) {
        window.eliteChauffeurApp.handleError(event.reason, 'Something went wrong. Please refresh the page.');
    }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}