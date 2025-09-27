// Stripe Payment Integration
class PaymentManager {
    constructor() {
        this.stripe = null;
        this.elements = null;
        this.card = null;
        this.currentBooking = null;
        this.clientSecret = null;
        
        // Initialize Stripe (you'll need to replace with your actual publishable key)
        this.stripePublicKey = 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz'; // Replace with your actual key
        this.init();
    }

    async init() {
        try {
            // Initialize Stripe
            this.stripe = Stripe(this.stripePublicKey);
            
            // Create elements
            this.elements = this.stripe.elements({
                appearance: {
                    theme: 'night',
                    variables: {
                        colorPrimary: '#D4AF37',
                        colorBackground: '#2a2a2a',
                        colorText: '#ffffff',
                        colorDanger: '#df1b41',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '8px'
                    }
                }
            });

        } catch (error) {
            console.error('Error initializing Stripe:', error);
            this.showPaymentError('Payment system initialization failed. Please refresh the page.');
        }
    }

    // Initialize payment for a booking
    async initializePayment(booking) {
        this.currentBooking = booking;
        
        try {
            // Create payment intent on your server (simulated here)
            const paymentIntent = await this.createPaymentIntent(booking);
            this.clientSecret = paymentIntent.client_secret;

            // Mount the card element
            this.mountCardElement();

            // Setup payment form handlers
            this.setupPaymentHandlers();

        } catch (error) {
            console.error('Error initializing payment:', error);
            this.showPaymentError('Failed to initialize payment. Please try again.');
        }
    }

    // Create payment intent (this would typically be done on your server)
    async createPaymentIntent(booking) {
        // In a real application, you would call your server to create the payment intent
        // For demo purposes, we'll simulate this
        
        console.log('Creating payment intent for booking:', booking);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate server response
        return {
            id: 'pi_' + Math.random().toString(36).substr(2, 24),
            client_secret: 'pi_' + Math.random().toString(36).substr(2, 24) + '_secret_' + Math.random().toString(36).substr(2, 10),
            amount: Math.round(booking.totalPrice * 100), // Amount in cents
            currency: 'usd',
            status: 'requires_payment_method'
        };
    }

    // Mount Stripe card element
    mountCardElement() {
        const cardContainer = document.getElementById('card-element');
        if (!cardContainer || !this.elements) return;

        // Create card element
        this.card = this.elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#ffffff',
                    '::placeholder': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            },
            hidePostalCode: true
        });

        // Mount card element
        this.card.mount('#card-element');

        // Handle real-time validation errors from the card Element
        this.card.on('change', ({error}) => {
            const displayError = document.getElementById('card-errors');
            if (error) {
                displayError.textContent = error.message;
                displayError.classList.add('text-red-500');
            } else {
                displayError.textContent = '';
                displayError.classList.remove('text-red-500');
            }
        });
    }

    // Setup payment form event handlers
    setupPaymentHandlers() {
        const submitButton = document.getElementById('submit-payment');
        
        if (submitButton) {
            submitButton.addEventListener('click', (e) => this.handlePaymentSubmit(e));
        }
    }

    // Handle payment form submission
    async handlePaymentSubmit(e) {
        e.preventDefault();

        if (!this.stripe || !this.card) {
            this.showPaymentError('Payment system not initialized. Please refresh the page.');
            return;
        }

        const submitButton = document.getElementById('submit-payment');
        const cardErrors = document.getElementById('card-errors');

        // Disable submit button and show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.classList.add('btn-loading');
            submitButton.textContent = 'Processing...';
        }

        // Clear any existing errors
        if (cardErrors) {
            cardErrors.textContent = '';
        }

        try {
            // Create payment method
            const {error: methodError, paymentMethod} = await this.stripe.createPaymentMethod({
                type: 'card',
                card: this.card,
                billing_details: {
                    name: this.currentBooking.clientName,
                    email: this.currentBooking.clientEmail,
                    phone: this.currentBooking.clientPhone
                }
            });

            if (methodError) {
                throw new Error(methodError.message);
            }

            // Confirm payment
            const {error: confirmError, paymentIntent} = await this.stripe.confirmCardPayment(
                this.clientSecret,
                {
                    payment_method: paymentMethod.id
                }
            );

            if (confirmError) {
                throw new Error(confirmError.message);
            }

            if (paymentIntent.status === 'succeeded') {
                // Payment successful
                console.log('Payment succeeded:', paymentIntent);
                this.handlePaymentSuccess(paymentIntent);
            } else {
                throw new Error('Payment was not completed successfully');
            }

        } catch (error) {
            console.error('Payment error:', error);
            this.showPaymentError(error.message);
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.classList.remove('btn-loading');
                submitButton.textContent = 'Pay Now';
            }
        }
    }

    // Handle successful payment
    handlePaymentSuccess(paymentIntent) {
        // Update booking with payment information
        if (this.currentBooking) {
            this.currentBooking.paymentId = paymentIntent.id;
            this.currentBooking.paymentStatus = 'paid';
            this.currentBooking.paidAt = new Date().toISOString();
        }

        // Notify booking manager of successful payment
        if (window.bookingManager) {
            window.bookingManager.handlePaymentSuccess(paymentIntent);
        }

        console.log('Payment completed successfully');
    }

    // Show payment error
    showPaymentError(message) {
        const cardErrors = document.getElementById('card-errors');
        if (cardErrors) {
            cardErrors.textContent = message;
            cardErrors.classList.add('text-red-500');
        }

        // Also show as alert for critical errors
        if (message.includes('initialization') || message.includes('refresh')) {
            alert(message);
        }
    }

    // Process refund (for admin use)
    async processRefund(paymentIntentId, amount = null) {
        try {
            // This would typically call your server to process the refund
            console.log('Processing refund for payment:', paymentIntentId, 'Amount:', amount);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate server response
            const refund = {
                id: 're_' + Math.random().toString(36).substr(2, 24),
                payment_intent: paymentIntentId,
                amount: amount || this.currentBooking?.totalPrice * 100,
                currency: 'usd',
                status: 'succeeded',
                created: Math.floor(Date.now() / 1000)
            };
            
            console.log('Refund processed:', refund);
            return refund;
            
        } catch (error) {
            console.error('Refund error:', error);
            throw error;
        }
    }

    // Validate card before submission (optional)
    async validateCard() {
        if (!this.card) return false;

        const {error, paymentMethod} = await this.stripe.createPaymentMethod({
            type: 'card',
            card: this.card,
        });

        return !error;
    }

    // Format currency for display
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    }

    // Get payment method types supported
    getSupportedPaymentMethods() {
        return ['card', 'apple_pay', 'google_pay'];
    }

    // Setup Apple Pay / Google Pay (future enhancement)
    setupDigitalWallets() {
        // Implementation for Apple Pay and Google Pay would go here
        // This requires additional setup and merchant verification
        console.log('Digital wallet setup not implemented in this demo');
    }

    // Cleanup payment elements
    cleanup() {
        if (this.card) {
            this.card.unmount();
            this.card.destroy();
            this.card = null;
        }
        
        this.elements = null;
        this.currentBooking = null;
        this.clientSecret = null;
    }
}

// Demo payment simulation for testing without real Stripe keys
class MockPaymentManager {
    constructor() {
        this.currentBooking = null;
        this.init();
    }

    init() {
        console.log('Using mock payment system for demo');
    }

    async initializePayment(booking) {
        this.currentBooking = booking;
        this.setupMockPaymentForm();
    }

    setupMockPaymentForm() {
        const cardContainer = document.getElementById('card-element');
        if (!cardContainer) return;

        // Create mock card form
        cardContainer.innerHTML = `
            <div class="bg-luxury-gray p-4 rounded-lg border border-gray-600">
                <div class="text-white text-sm mb-2">Demo Mode - Test Card Information</div>
                <div class="grid grid-cols-1 gap-3">
                    <input type="text" placeholder="4242 4242 4242 4242" class="w-full bg-black border border-gray-500 rounded p-2 text-white" readonly>
                    <div class="grid grid-cols-2 gap-2">
                        <input type="text" placeholder="MM/YY" class="bg-black border border-gray-500 rounded p-2 text-white" readonly>
                        <input type="text" placeholder="123" class="bg-black border border-gray-500 rounded p-2 text-white" readonly>
                    </div>
                </div>
                <div class="text-xs text-gray-400 mt-2">This is a demo. No real payment will be processed.</div>
            </div>
        `;

        // Setup mock payment handler
        const submitButton = document.getElementById('submit-payment');
        if (submitButton) {
            submitButton.addEventListener('click', (e) => this.handleMockPayment(e));
        }
    }

    async handleMockPayment(e) {
        e.preventDefault();

        const submitButton = document.getElementById('submit-payment');
        
        // Show loading state
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Processing...';
        }

        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate successful payment
            const mockPaymentIntent = {
                id: 'pi_mock_' + Math.random().toString(36).substr(2, 24),
                status: 'succeeded',
                amount: Math.round(this.currentBooking.totalPrice * 100),
                currency: 'usd',
                created: Math.floor(Date.now() / 1000)
            };

            this.handlePaymentSuccess(mockPaymentIntent);

        } catch (error) {
            console.error('Mock payment error:', error);
            this.showPaymentError('Demo payment failed. Please try again.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Pay Now';
            }
        }
    }

    handlePaymentSuccess(paymentIntent) {
        if (this.currentBooking) {
            this.currentBooking.paymentId = paymentIntent.id;
            this.currentBooking.paymentStatus = 'paid';
            this.currentBooking.paidAt = new Date().toISOString();
        }

        if (window.bookingManager) {
            window.bookingManager.handlePaymentSuccess(paymentIntent);
        }
    }

    showPaymentError(message) {
        const cardErrors = document.getElementById('card-errors');
        if (cardErrors) {
            cardErrors.textContent = message;
            cardErrors.classList.add('text-red-500');
        }
    }
}

// Initialize payment manager based on environment
let paymentManager;

// Check if we have a real Stripe key or use mock
const hasRealStripeKey = window.STRIPE_PUBLISHABLE_KEY && 
                        window.STRIPE_PUBLISHABLE_KEY !== 'your_stripe_publishable_key_here' &&
                        window.STRIPE_PUBLISHABLE_KEY.startsWith('pk_');

if (hasRealStripeKey && typeof Stripe !== 'undefined') {
    paymentManager = new PaymentManager();
    paymentManager.stripePublicKey = window.STRIPE_PUBLISHABLE_KEY;
} else {
    console.log('Using mock payment system - replace with real Stripe keys for production');
    paymentManager = new MockPaymentManager();
}

// Export for use in other modules
window.paymentsModule = {
    manager: paymentManager,
    initializePayment: (booking) => paymentManager.initializePayment(booking),
    processRefund: (paymentId, amount) => paymentManager.processRefund(paymentId, amount),
    formatCurrency: (amount, currency) => paymentManager.formatCurrency(amount, currency)
};