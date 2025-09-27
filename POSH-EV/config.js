// Configuration file for Elite Chauffeur Services
// Update these values with your actual service credentials

window.ELITE_CHAUFFEUR_CONFIG = {
    // ============================================================================
    // PAYMENT CONFIGURATION
    // ============================================================================
    
    // Stripe Configuration
    // Replace with your actual Stripe publishable key for production
    STRIPE_PUBLISHABLE_KEY: 'pk_test_your_stripe_publishable_key_here',
    
    // For testing, you can use Stripe's test key:
    // STRIPE_PUBLISHABLE_KEY: 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz',
    
    // ============================================================================
    // NOTIFICATION CONFIGURATION  
    // ============================================================================
    
    // Email Service Configuration
    email: {
        // Replace with your actual email service API endpoint
        apiEndpoint: '/api/send-email',
        
        // Your business email addresses
        adminEmail: 'SMurdock@poshev.com',
        bookingEmail: 'bookings@poshev.com',
        supportEmail: 'support@poshev.com',
        
        // Email service provider (sendgrid, mailgun, ses, nodemailer)
        provider: 'sendgrid',
        
        // API Key (store securely on server, not in frontend)
        // This is just for documentation - actual key goes on your backend
        // apiKey: 'SG.your_sendgrid_api_key_here',
    },
    
    // SMS Service Configuration  
    sms: {
        // Replace with your actual SMS service API endpoint
        apiEndpoint: '/api/send-sms',
        
        // Your business phone numbers
        adminPhone: '‭+1 (404) 482-0071‬', // Your admin phone for notifications
        supportPhone: '‭+1 (404) 482-0071‬', // Customer support line
        
        // SMS service provider (twilio, nexmo, aws-sns)
        provider: 'twilio',
        
        // API credentials (store securely on server, not in frontend)
        // These are just for documentation - actual credentials go on your backend
        // accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        // authToken: 'your_twilio_auth_token_here',
        // fromNumber: '+15551234567',
    },
    
    // ============================================================================
    // BUSINESS CONFIGURATION
    // ============================================================================
    
    business: {
        name: 'POSH EV',
        tagline: 'Luxury Electric Chauffeur & Concierge Services',
        
        // Contact Information
        phone: '‭+1 (404) 482-0071‬',
        email: 'bookings@poshev.com',
        website: 'https://poshev.com',
        
        // Business Address
        address: {
            street: '125 Main Street',
            city: 'Atlanta',
            state: 'GA', 
            zip: '30309',
            country: 'USA'
        },
        
        // Operating Hours
        hours: {
            available: '24/7',
            support: 'Monday - Sunday, 6 AM - 11 PM',
            emergency: '24/7 Emergency Line'
        },
        
        // Social Media Links
        social: {
            facebook: 'https://www.facebook.com/share/17EGFU1Y2J/',
            twitter: 'https://twitter.com/poshev', 
            instagram: 'https://instagram.com/poshevllc',
            linkedin: 'https://linkedin.com/company/poshev'
        }
    },
    
    // ============================================================================
    // BOOKING CONFIGURATION
    // ============================================================================
    
    booking: {
        // How many days in advance can customers book
        advanceBookingDays: 90,
        
        // Minimum hours before service for cancellation
        cancellationHours: 2,
        
        // Operating hours (24-hour format)
        operatingHours: {
            start: 6,  // 6 AM
            end: 22,   // 10 PM
            interval: 30 // 30-minute intervals
        },
        
        // Default service area (for future use)
        serviceArea: {
            radius: 50, // miles
            cities: ['Beverly Hills', 'Los Angeles', 'Santa Monica', 'Malibu']
        },
        
        // Pricing configuration
        pricing: {
            currency: 'USD',
            taxRate: 0.08, // 8% tax rate
            gratuityOptions: [15, 18, 20, 25], // Suggested tip percentages
            surgePricing: {
                enabled: true,
                peakHours: ['17:00-19:00', '22:00-02:00'], // Rush hours
                holidayMultiplier: 1.5,
                weatherMultiplier: 1.25
            }
        }
    },
    
    // ============================================================================
    // TECHNICAL CONFIGURATION
    // ============================================================================
    
    // Google Services (for future features)
    google: {
        // Google Maps API key (for location services)
        mapsApiKey: 'AIza_your_google_maps_api_key_here',
        
        // Google Analytics tracking ID
        analyticsId: 'GA_MEASUREMENT_ID',
        
        // Google Tag Manager ID
        tagManagerId: 'GTM-XXXXXXX'
    },
    
    // API Configuration
    api: {
        // Your backend API base URL
        baseUrl: 'https://api.elitechauffeur.com',
        
        // API version
        version: 'v1',
        
        // Request timeout (milliseconds)
        timeout: 30000,
        
        // Retry configuration
        retries: 3,
        
        // Endpoints
        endpoints: {
            bookings: '/bookings',
            payments: '/payments', 
            notifications: '/notifications',
            availability: '/availability',
            pricing: '/pricing'
        }
    },
    
    // Security Configuration
    security: {
        // Content Security Policy settings
        csp: {
            enabled: true,
            reportUri: '/api/csp-report'
        },
        
        // HTTPS enforcement
        httpsOnly: true,
        
        // Session configuration
        session: {
            timeout: 3600000, // 1 hour in milliseconds
            sameSite: 'strict',
            secure: true
        }
    },
    
    // ============================================================================
    // FEATURE FLAGS
    // ============================================================================
    
    features: {
        // Enable/disable specific features
        membershipProgram: true,
        corporateBooking: false, // Enable in Phase 2
        recurringBookings: false, // Enable in Phase 2
        loyaltyPoints: false, // Enable in Phase 2
        referralProgram: false, // Enable in Phase 2
        
        // Payment features
        applePay: false, // Requires additional setup
        googlePay: false, // Requires additional setup
        paypal: false, // Requires additional integration
        
        // Communication features
        smsReminders: true,
        emailReminders: true,
        pushNotifications: false, // Mobile app feature
        
        // Advanced features for later phases
        realTimeTracking: false,
        chatSupport: false,
        videoConference: false,
        conciergeServices: false
    },
    
    // ============================================================================
    // ENVIRONMENT SETTINGS
    // ============================================================================
    
    environment: {
        // Environment type: 'development', 'staging', 'production'
        type: 'development',
        
        // Debug mode
        debug: true,
        
        // Analytics enabled
        analytics: false,
        
        // Error reporting
        errorReporting: {
            enabled: true,
            service: 'sentry', // or 'rollbar', 'bugsnag'
            // dsn: 'https://your-sentry-dsn@sentry.io/project-id'
        }
    },
    
    // ============================================================================
    // LOCALIZATION
    // ============================================================================
    
    localization: {
        // Default language
        defaultLanguage: 'en-US',
        
        // Supported languages (for future expansion)
        supportedLanguages: ['en-US', 'es-ES', 'fr-FR'],
        
        // Currency and formatting
        currency: {
            code: 'USD',
            symbol: '$',
            position: 'before' // 'before' or 'after'
        },
        
        // Date and time formatting
        dateTime: {
            timezone: 'America/Los_Angeles',
            dateFormat: 'MM/DD/YYYY',
            timeFormat: '12', // '12' or '24' hour format
            firstDayOfWeek: 0 // 0 = Sunday, 1 = Monday
        }
    },
    
    // ============================================================================
    // PERFORMANCE SETTINGS
    // ============================================================================
    
    performance: {
        // Image optimization
        images: {
            lazy: true,
            webpEnabled: true,
            compressionQuality: 85
        },
        
        // Caching
        cache: {
            staticAssets: 604800, // 1 week in seconds
            apiResponses: 300, // 5 minutes in seconds
            images: 2592000 // 30 days in seconds
        },
        
        // Loading optimization
        preload: {
            criticalResources: [
                '/css/style.css',
                '/js/main.js'
            ],
            fonts: [
                'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap'
            ]
        }
    }
};

// ============================================================================
// DEVELOPMENT HELPERS
// ============================================================================

// Make config available globally for debugging
if (window.ELITE_CHAUFFEUR_CONFIG.environment.debug) {
    window.config = window.ELITE_CHAUFFEUR_CONFIG;
    console.log('Elite Chauffeur Services Config Loaded:', window.ELITE_CHAUFFEUR_CONFIG);
}

// Validation function to check if required configs are set
window.validateConfig = function() {
    const config = window.ELITE_CHAUFFEUR_CONFIG;
    const warnings = [];
    
    // Check Stripe key
    if (config.STRIPE_PUBLISHABLE_KEY.includes('your_stripe_publishable_key_here')) {
        warnings.push('⚠️  Stripe publishable key not configured - using demo mode');
    }
    
    // Check email configuration
    if (config.email.adminEmail.includes('elitechauffeur.com')) {
        warnings.push('⚠️  Email addresses not configured - update with your domain');
    }
    
    // Check phone numbers
    if (config.sms.adminPhone.includes('1234567890')) {
        warnings.push('⚠️  Phone numbers not configured - update with your numbers');
    }
    
    // Check Google Maps
    if (config.google.mapsApiKey.includes('your_google_maps_api_key_here')) {
        warnings.push('⚠️  Google Maps API key not configured - location features disabled');
    }
    
    // Display warnings
    if (warnings.length > 0) {
        console.warn('Configuration Warnings:');
        warnings.forEach(warning => console.warn(warning));
        console.warn('Update config.js with your actual service credentials for production');
    }
    
    return warnings;
};

// Auto-validate on load in development
if (window.ELITE_CHAUFFEUR_CONFIG.environment.debug) {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(window.validateConfig, 1000);
    });
}