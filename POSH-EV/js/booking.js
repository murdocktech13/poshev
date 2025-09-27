// Booking Management System
class BookingManager {
    constructor() {
        this.currentBooking = null;
        this.calendar = null;
        this.unavailableDates = new Set(); // Simulated unavailable dates
        this.timeSlots = this.generateTimeSlots();
        this.init();
    }

    init() {
        this.initializeCalendar();
        this.setupEventListeners();
        this.populateUnavailableDates();
    }

    // Generate time slots (every 30 minutes from 6 AM to 10 PM)
    generateTimeSlots() {
        const slots = [];
        for (let hour = 6; hour <= 22; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(timeString);
            }
        }
        return slots;
    }

    // Populate some unavailable dates (for demo purposes)
    populateUnavailableDates() {
        const today = new Date();
        const unavailableDates = [
            // Next Sunday
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay())),
            // Day after tomorrow
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
            // Random future dates
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 15),
        ];

        unavailableDates.forEach(date => {
            this.unavailableDates.add(date.toDateString());
        });
    }

    // Initialize Flatpickr calendar
    initializeCalendar() {
        const dateInput = document.getElementById('booking-date');
        if (!dateInput) return;

        this.calendar = flatpickr(dateInput, {
            minDate: 'today',
            maxDate: new Date().fp_incr(90), // 90 days from today
            dateFormat: 'Y-m-d',
            theme: 'dark',
            disable: [
                // Disable unavailable dates
                (date) => {
                    return this.unavailableDates.has(date.toDateString());
                }
            ],
            onChange: (selectedDates, dateStr) => {
                this.onDateChange(selectedDates[0], dateStr);
            },
            onReady: () => {
                // Add custom styling after initialization
                const calendarContainer = document.querySelector('.flatpickr-calendar');
                if (calendarContainer) {
                    calendarContainer.style.backgroundColor = '#2a2a2a';
                    calendarContainer.style.border = '1px solid #D4AF37';
                }
            }
        });
    }

    // Handle date change
    onDateChange(selectedDate, dateStr) {
        if (selectedDate) {
            this.updateAvailableTimeSlots(selectedDate);
            this.validateBookingForm();
        }
    }

    // Update available time slots based on selected date
    updateAvailableTimeSlots(selectedDate) {
        const timeInput = document.getElementById('booking-time');
        if (!timeInput) return;

        // Clear existing options
        timeInput.innerHTML = '';

        // Get booked time slots for this date (simulated)
        const bookedSlots = this.getBookedTimeSlots(selectedDate);

        // Add available time slots
        this.timeSlots.forEach(timeSlot => {
            if (!bookedSlots.includes(timeSlot)) {
                const option = document.createElement('option');
                option.value = timeSlot;
                option.textContent = this.formatTime(timeSlot);
                timeInput.appendChild(option);
            }
        });

        // Add placeholder option
        if (timeInput.children.length > 0) {
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = 'Select time...';
            timeInput.insertBefore(placeholderOption, timeInput.firstChild);
            timeInput.value = '';
        } else {
            const noSlotsOption = document.createElement('option');
            noSlotsOption.value = '';
            noSlotsOption.textContent = 'No available times';
            timeInput.appendChild(noSlotsOption);
        }
    }

    // Get booked time slots for a date (simulated)
    getBookedTimeSlots(date) {
        // This would typically fetch from your backend
        // For demo purposes, return some random booked slots
        const bookedSlots = [];
        const dayOfWeek = date.getDay();
        
        // Simulate more bookings on weekends
        if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
            bookedSlots.push('09:00', '10:00', '15:00', '18:00', '19:00');
        } else {
            bookedSlots.push('08:00', '17:00', '18:00');
        }

        return bookedSlots;
    }

    // Format time for display
    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    // Setup event listeners
    setupEventListeners() {
        const form = document.getElementById('booking-form');
        const serviceSelect = document.getElementById('service-select');
        const membershipSelect = document.getElementById('membership-select');
        const timeInput = document.getElementById('booking-time');

        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        if (serviceSelect) {
            serviceSelect.addEventListener('change', () => this.updatePricing());
        }

        if (membershipSelect) {
            membershipSelect.addEventListener('change', () => this.updatePricing());
        }

        if (timeInput) {
            timeInput.addEventListener('change', () => this.validateBookingForm());
        }

        // Real-time validation for required fields
        const requiredFields = ['client-name', 'client-phone', 'client-email', 'pickup-location'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
            }
        });
    }

    // Update pricing display
    updatePricing() {
        const serviceSelect = document.getElementById('service-select');
        const membershipSelect = document.getElementById('membership-select');
        const priceDisplay = document.getElementById('price-display');
        const totalPrice = document.getElementById('total-price');
        const membershipDiscount = document.getElementById('membership-discount');

        if (!serviceSelect || !priceDisplay || !totalPrice) return;

        const serviceId = serviceSelect.value;
        const membershipId = membershipSelect ? membershipSelect.value : null;

        if (!serviceId) {
            priceDisplay.classList.add('hidden');
            return;
        }

        // Calculate price using services module
        const originalPrice = window.servicesModule.getServiceById(serviceId)?.price || 0;
        const finalPrice = window.servicesModule.calculatePrice(serviceId, membershipId);

        totalPrice.textContent = `$${finalPrice}`;
        
        if (membershipId && originalPrice > finalPrice) {
            const savings = originalPrice - finalPrice;
            membershipDiscount.textContent = `You save $${savings} with your membership!`;
            membershipDiscount.classList.remove('hidden');
        } else {
            membershipDiscount.classList.add('hidden');
        }

        priceDisplay.classList.remove('hidden');
        priceDisplay.classList.add('price-slide-in');
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        field.classList.remove('form-error');
        this.removeErrorMessage(field);

        switch (field.id) {
            case 'client-name':
                if (!value || value.length < 2) {
                    isValid = false;
                    errorMessage = 'Please enter a valid full name';
                }
                break;
            
            case 'client-phone':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!value || !phoneRegex.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            
            case 'client-email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'pickup-location':
                if (!value || value.length < 5) {
                    isValid = false;
                    errorMessage = 'Please enter a valid pickup location';
                }
                break;
        }

        if (!isValid) {
            field.classList.add('form-error');
            this.showErrorMessage(field, errorMessage);
        }

        return isValid;
    }

    // Show error message
    showErrorMessage(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.id = `${field.id}-error`;
        
        field.parentNode.appendChild(errorElement);
    }

    // Remove error message
    removeErrorMessage(field) {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Clear field error styling
    clearFieldError(field) {
        field.classList.remove('form-error');
        this.removeErrorMessage(field);
    }

    // Validate entire booking form
    validateBookingForm() {
        const serviceSelect = document.getElementById('service-select');
        const dateInput = document.getElementById('booking-date');
        const timeInput = document.getElementById('booking-time');
        const submitButton = document.getElementById('submit-booking');

        if (!serviceSelect || !dateInput || !timeInput || !submitButton) return false;

        const isValid = serviceSelect.value && 
                       dateInput.value && 
                       timeInput.value &&
                       timeInput.value !== '';

        submitButton.disabled = !isValid;
        
        if (isValid) {
            submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            submitButton.classList.add('opacity-50', 'cursor-not-allowed');
        }

        return isValid;
    }

    // Handle form submission
    async handleFormSubmit(e) {
        e.preventDefault();

        const submitButton = document.getElementById('submit-booking');
        if (submitButton) {
            submitButton.classList.add('btn-loading');
            submitButton.disabled = true;
        }

        try {
            // Validate all required fields
            const requiredFields = ['service-select', 'booking-date', 'booking-time', 'pickup-location', 'client-name', 'client-phone', 'client-email'];
            let isFormValid = true;

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field && !this.validateField(field)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                throw new Error('Please correct the errors and try again');
            }

            // Collect form data
            const formData = this.collectFormData();
            
            // Create booking object
            this.currentBooking = {
                id: this.generateBookingId(),
                ...formData,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            // Show payment modal
            this.showPaymentModal();

        } catch (error) {
            console.error('Booking submission error:', error);
            alert(error.message || 'There was an error processing your booking. Please try again.');
        } finally {
            if (submitButton) {
                submitButton.classList.remove('btn-loading');
                submitButton.disabled = false;
            }
        }
    }

    // Collect form data
    collectFormData() {
        return {
            serviceId: document.getElementById('service-select')?.value,
            serviceName: document.getElementById('service-select')?.selectedOptions[0]?.text,
            date: document.getElementById('booking-date')?.value,
            time: document.getElementById('booking-time')?.value,
            pickupLocation: document.getElementById('pickup-location')?.value,
            destination: document.getElementById('destination')?.value,
            clientName: document.getElementById('client-name')?.value,
            clientPhone: document.getElementById('client-phone')?.value,
            clientEmail: document.getElementById('client-email')?.value,
            specialRequests: document.getElementById('special-requests')?.value,
            membershipId: document.getElementById('membership-select')?.value,
            totalPrice: window.servicesModule.calculatePrice(
                document.getElementById('service-select')?.value,
                document.getElementById('membership-select')?.value
            )
        };
    }

    // Generate unique booking ID
    generateBookingId() {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substr(2, 5);
        return `EC-${timestamp}-${randomStr}`.toUpperCase();
    }

    // Show payment modal
    showPaymentModal() {
        const modal = document.getElementById('payment-modal');
        const paymentService = document.getElementById('payment-service');
        const paymentDatetime = document.getElementById('payment-datetime');
        const paymentTotal = document.getElementById('payment-total');

        if (!modal || !this.currentBooking) return;

        // Populate payment details
        if (paymentService) paymentService.textContent = this.currentBooking.serviceName;
        if (paymentDatetime) paymentDatetime.textContent = `${this.currentBooking.date} at ${this.formatTime(this.currentBooking.time)}`;
        if (paymentTotal) paymentTotal.textContent = `$${this.currentBooking.totalPrice}`;

        // Show modal with animation
        modal.classList.remove('hidden');
        modal.querySelector('div > div').classList.add('modal-enter');

        // Initialize Stripe payment (handled in payments.js)
        if (window.paymentsModule) {
            window.paymentsModule.initializePayment(this.currentBooking);
        }

        // Setup modal close handlers
        this.setupPaymentModalHandlers();
    }

    // Setup payment modal event handlers
    setupPaymentModalHandlers() {
        const modal = document.getElementById('payment-modal');
        const cancelButton = document.getElementById('cancel-payment');

        if (cancelButton) {
            cancelButton.onclick = () => this.hidePaymentModal();
        }

        // Close on backdrop click
        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.hidePaymentModal();
                }
            };
        }
    }

    // Hide payment modal
    hidePaymentModal() {
        const modal = document.getElementById('payment-modal');
        if (modal) {
            const content = modal.querySelector('div > div');
            if (content) {
                content.classList.add('modal-exit');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    content.classList.remove('modal-enter', 'modal-exit');
                }, 300);
            }
        }
    }

    // Show success modal
    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        const bookingRef = document.getElementById('booking-reference');

        if (!modal || !this.currentBooking) return;

        if (bookingRef) {
            bookingRef.textContent = this.currentBooking.id;
        }

        // Hide payment modal first
        this.hidePaymentModal();

        // Show success modal after a delay
        setTimeout(() => {
            modal.classList.remove('hidden');
            modal.querySelector('div > div').classList.add('modal-enter');

            // Send notifications
            if (window.notificationsModule) {
                window.notificationsModule.sendBookingNotifications(this.currentBooking);
            }

            // Setup close handler
            const closeButton = document.getElementById('close-success');
            if (closeButton) {
                closeButton.onclick = () => {
                    modal.classList.add('hidden');
                    this.resetForm();
                };
            }
        }, 500);
    }

    // Reset form after successful booking
    resetForm() {
        const form = document.getElementById('booking-form');
        if (form) {
            form.reset();
            
            // Reset calendar
            if (this.calendar) {
                this.calendar.clear();
            }

            // Hide price display
            const priceDisplay = document.getElementById('price-display');
            if (priceDisplay) {
                priceDisplay.classList.add('hidden');
            }

            // Clear time options
            const timeInput = document.getElementById('booking-time');
            if (timeInput) {
                timeInput.innerHTML = '<option value="">Select time...</option>';
            }
        }

        // Clear current booking
        this.currentBooking = null;
    }

    // Handle successful payment
    handlePaymentSuccess(paymentIntent) {
        if (this.currentBooking) {
            this.currentBooking.paymentId = paymentIntent.id;
            this.currentBooking.status = 'confirmed';
            
            // Save booking (in a real app, this would go to your backend)
            this.saveBooking(this.currentBooking);
            
            // Show success modal
            this.showSuccessModal();
        }
    }

    // Save booking (simulate API call)
    async saveBooking(booking) {
        try {
            // In a real application, you would send this to your backend API
            console.log('Saving booking:', booking);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Store in localStorage for demo purposes
            const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            existingBookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(existingBookings));
            
            console.log('Booking saved successfully');
            return booking;
        } catch (error) {
            console.error('Error saving booking:', error);
            throw error;
        }
    }
}

// Initialize booking manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.bookingManager = new BookingManager();
});

// Export for use in other modules
window.bookingModule = {
    manager: null,
    init() {
        this.manager = new BookingManager();
        return this.manager;
    }
};