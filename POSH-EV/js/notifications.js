// Notification System for Automated Email/SMS
class NotificationManager {
    constructor() {
        this.emailService = new EmailService();
        this.smsService = new SMSService();
        this.adminContacts = {
            email: 'admin@elitechauffeur.com',
            phone: '+1234567890' // Replace with your admin phone
        };
        this.init();
    }

    init() {
        console.log('Notification system initialized');
    }

    // Send all booking notifications
    async sendBookingNotifications(booking) {
        try {
            console.log('Sending notifications for booking:', booking.id);

            // Send client confirmation email
            await this.sendClientConfirmationEmail(booking);
            
            // Send client confirmation SMS (if phone provided)
            if (booking.clientPhone) {
                await this.sendClientConfirmationSMS(booking);
            }

            // Send admin notification email
            await this.sendAdminNotificationEmail(booking);
            
            // Send admin notification SMS
            await this.sendAdminNotificationSMS(booking);

            console.log('All notifications sent successfully');
            
        } catch (error) {
            console.error('Error sending notifications:', error);
            // Don't throw error to prevent blocking the booking flow
        }
    }

    // Send client confirmation email
    async sendClientConfirmationEmail(booking) {
        const emailData = {
            to: booking.clientEmail,
            subject: `Booking Confirmation - Elite Chauffeur Services (${booking.id})`,
            html: this.generateClientEmailTemplate(booking),
            text: this.generateClientEmailText(booking)
        };

        return await this.emailService.sendEmail(emailData);
    }

    // Send client confirmation SMS
    async sendClientConfirmationSMS(booking) {
        const message = `Elite Chauffeur: Your booking ${booking.id} is confirmed for ${this.formatDate(booking.date)} at ${this.formatTime(booking.time)}. Thank you for choosing our premium service!`;
        
        return await this.smsService.sendSMS(booking.clientPhone, message);
    }

    // Send admin notification email
    async sendAdminNotificationEmail(booking) {
        const emailData = {
            to: this.adminContacts.email,
            subject: `🚗 NEW BOOKING ALERT - ${booking.id}`,
            html: this.generateAdminEmailTemplate(booking),
            text: this.generateAdminEmailText(booking)
        };

        return await this.emailService.sendEmail(emailData);
    }

    // Send admin notification SMS
    async sendAdminNotificationSMS(booking) {
        const message = `NEW BOOKING: ${booking.serviceName} on ${this.formatDate(booking.date)} at ${this.formatTime(booking.time)}. Client: ${booking.clientName} (${booking.clientPhone}). Booking ID: ${booking.id}`;
        
        return await this.smsService.sendSMS(this.adminContacts.phone, message);
    }

    // Generate client email template
    generateClientEmailTemplate(booking) {
        const service = window.servicesModule?.getServiceById(booking.serviceId);
        const membership = booking.membershipId ? window.servicesModule?.getMembershipById(booking.membershipId) : null;

        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
    <style>
        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #000; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1a1a1a; }
        .header { background: linear-gradient(135deg, #ffffff, #f0f0f0); padding: 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; color: #000; margin-bottom: 10px; }
        .content { padding: 30px; }
        .booking-card { background-color: #2a2a2a; border: 1px solid #ffffff; border-radius: 10px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #444; }
        .detail-label { color: #ffffff; font-weight: bold; }
        .detail-value { color: #fff; }
        .price-highlight { font-size: 24px; font-weight: bold; color: #ffffff; text-align: center; margin: 20px 0; }
        .footer { background-color: #000; padding: 20px; text-align: center; color: #999; }
        .contact-info { margin: 20px 0; }
        .btn { background-color: #ffffff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 10px 0; }
        .special-requests { background-color: #333; padding: 15px; border-radius: 5px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">👑 Elite Chauffeur Services</div>
            <p style="margin: 0; color: #000; font-size: 16px;">Premium Transportation Excellence</p>
        </div>
        
        <div class="content">
            <h2 style="color: #D4AF37; margin-bottom: 10px;">Booking Confirmation</h2>
            <p>Dear ${booking.clientName},</p>
            <p>Thank you for choosing Elite Chauffeur Services. Your reservation has been confirmed and payment has been processed successfully.</p>
            
            <div class="booking-card">
                <h3 style="color: #D4AF37; margin-top: 0;">Booking Details</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Booking Reference:</span>
                    <span class="detail-value">${booking.id}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Service:</span>
                    <span class="detail-value">${booking.serviceName}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${this.formatDate(booking.date)}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">${this.formatTime(booking.time)}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Pickup Location:</span>
                    <span class="detail-value">${booking.pickupLocation}</span>
                </div>
                
                ${booking.destination ? `
                <div class="detail-row">
                    <span class="detail-label">Destination:</span>
                    <span class="detail-value">${booking.destination}</span>
                </div>
                ` : ''}
                
                ${membership ? `
                <div class="detail-row">
                    <span class="detail-label">Membership:</span>
                    <span class="detail-value">${membership.name} (${membership.discount}% discount applied)</span>
                </div>
                ` : ''}
                
                <div class="price-highlight">
                    Total Paid: $${booking.totalPrice}
                </div>
            </div>
            
            ${booking.specialRequests ? `
            <div class="special-requests">
                <h4 style="color: #D4AF37; margin-top: 0;">Special Requests:</h4>
                <p>${booking.specialRequests}</p>
            </div>
            ` : ''}
            
            <div class="contact-info">
                <h3 style="color: #D4AF37;">Important Information</h3>
                <ul style="color: #ccc; line-height: 1.6;">
                    <li>Our professional chauffeur will arrive 10 minutes before your scheduled time</li>
                    <li>You will receive an SMS notification when your chauffeur is en route</li>
                    <li>For any changes or special requests, please contact us at least 2 hours in advance</li>
                    <li>Our vehicles are sanitized and maintained to the highest standards</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="tel:+15551234567" class="btn">Call Us: +1 (555) 123-4567</a>
            </div>
            
            <p style="color: #999;">We look forward to providing you with an exceptional transportation experience.</p>
        </div>
        
        <div class="footer">
            <p><strong>Elite Chauffeur Services</strong></p>
            <p>Phone: +1 (555) 123-4567 | Email: reservations@elitechauffeur.com</p>
            <p>Available 24/7 for your convenience</p>
            <p style="font-size: 12px; margin-top: 20px;">This is an automated confirmation email. Please do not reply to this address.</p>
        </div>
    </div>
</body>
</html>`;
    }

    // Generate client email text version
    generateClientEmailText(booking) {
        return `
ELITE CHAUFFEUR SERVICES - BOOKING CONFIRMATION

Dear ${booking.clientName},

Your reservation has been confirmed!

BOOKING DETAILS:
- Reference: ${booking.id}
- Service: ${booking.serviceName}
- Date: ${this.formatDate(booking.date)}
- Time: ${this.formatTime(booking.time)}
- Pickup: ${booking.pickupLocation}
${booking.destination ? `- Destination: ${booking.destination}` : ''}
- Total Paid: $${booking.totalPrice}

${booking.specialRequests ? `Special Requests: ${booking.specialRequests}` : ''}

IMPORTANT INFORMATION:
- Chauffeur arrives 10 minutes early
- SMS notification when en route
- Contact us 2+ hours for changes
- Call: +1 (555) 123-4567

Thank you for choosing Elite Chauffeur Services.

Elite Chauffeur Services
Phone: +1 (555) 123-4567
Email: reservations@elitechauffeur.com
        `;
    }

    // Generate admin notification email
    generateAdminEmailTemplate(booking) {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { background-color: #D4AF37; padding: 20px; color: #000; }
        .content { padding: 20px; }
        .alert { background-color: #ff6b6b; color: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
        .booking-details { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .detail-row { margin: 8px 0; }
        .label { font-weight: bold; color: #333; }
        .value { color: #666; }
        .urgent { color: #ff6b6b; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">🚗 NEW BOOKING ALERT</h2>
            <p style="margin: 5px 0 0 0;">Elite Chauffeur Services Admin</p>
        </div>
        
        <div class="content">
            <div class="alert">
                <strong>ACTION REQUIRED:</strong> New booking received and payment confirmed
            </div>
            
            <div class="booking-details">
                <h3 style="margin-top: 0; color: #D4AF37;">Booking Information</h3>
                
                <div class="detail-row">
                    <span class="label">Booking ID:</span>
                    <span class="value urgent">${booking.id}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Service:</span>
                    <span class="value">${booking.serviceName}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Date & Time:</span>
                    <span class="value urgent">${this.formatDate(booking.date)} at ${this.formatTime(booking.time)}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Pickup Location:</span>
                    <span class="value">${booking.pickupLocation}</span>
                </div>
                
                ${booking.destination ? `
                <div class="detail-row">
                    <span class="label">Destination:</span>
                    <span class="value">${booking.destination}</span>
                </div>
                ` : ''}
                
                <div class="detail-row">
                    <span class="label">Total Amount:</span>
                    <span class="value urgent">$${booking.totalPrice}</span>
                </div>
            </div>
            
            <div class="booking-details">
                <h3 style="margin-top: 0; color: #333;">Client Information</h3>
                
                <div class="detail-row">
                    <span class="label">Name:</span>
                    <span class="value">${booking.clientName}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Phone:</span>
                    <span class="value">${booking.clientPhone}</span>
                </div>
                
                <div class="detail-row">
                    <span class="label">Email:</span>
                    <span class="value">${booking.clientEmail}</span>
                </div>
                
                ${booking.specialRequests ? `
                <div class="detail-row">
                    <span class="label">Special Requests:</span>
                    <span class="value">${booking.specialRequests}</span>
                </div>
                ` : ''}
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h4 style="margin-top: 0; color: #2d5a2d;">Next Steps:</h4>
                <ul style="color: #2d5a2d;">
                    <li>Assign appropriate chauffeur</li>
                    <li>Confirm vehicle availability</li>
                    <li>Send chauffeur details to client</li>
                    <li>Add to dispatch schedule</li>
                </ul>
            </div>
            
            <p style="color: #666; font-size: 12px;">
                Booking received: ${new Date().toLocaleString()}<br>
                Payment Status: Confirmed<br>
                Client notification: Sent
            </p>
        </div>
    </div>
</body>
</html>`;
    }

    // Generate admin email text version
    generateAdminEmailText(booking) {
        return `
NEW BOOKING ALERT - ELITE CHAUFFEUR SERVICES

🚨 ACTION REQUIRED: New booking received and payment confirmed

BOOKING DETAILS:
- ID: ${booking.id}
- Service: ${booking.serviceName}
- Date/Time: ${this.formatDate(booking.date)} at ${this.formatTime(booking.time)}
- Pickup: ${booking.pickupLocation}
${booking.destination ? `- Destination: ${booking.destination}` : ''}
- Amount: $${booking.totalPrice}

CLIENT INFO:
- Name: ${booking.clientName}
- Phone: ${booking.clientPhone}
- Email: ${booking.clientEmail}

${booking.specialRequests ? `SPECIAL REQUESTS: ${booking.specialRequests}` : ''}

NEXT STEPS:
1. Assign chauffeur
2. Confirm vehicle
3. Update dispatch
4. Send chauffeur details to client

Booking time: ${new Date().toLocaleString()}
        `;
    }

    // Utility functions
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    // Send payment confirmation
    async sendPaymentConfirmation(booking) {
        const emailData = {
            to: booking.clientEmail,
            subject: `Payment Received - Elite Chauffeur Services (${booking.id})`,
            html: `
                <h2>Payment Confirmation</h2>
                <p>Dear ${booking.clientName},</p>
                <p>We have successfully processed your payment of $${booking.totalPrice} for booking ${booking.id}.</p>
                <p>Payment ID: ${booking.paymentId}</p>
                <p>Thank you for your business!</p>
            `,
            text: `Payment Confirmation: $${booking.totalPrice} processed for booking ${booking.id}. Payment ID: ${booking.paymentId}`
        };

        return await this.emailService.sendEmail(emailData);
    }
}

// Email Service Implementation
class EmailService {
    constructor() {
        this.apiEndpoint = '/api/send-email'; // Your email API endpoint
    }

    async sendEmail(emailData) {
        try {
            // In a real application, this would call your email service API
            // For demo purposes, we'll simulate the email send
            console.log('📧 Sending email:', emailData);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulate successful send
            console.log('✅ Email sent successfully to:', emailData.to);
            
            return {
                success: true,
                messageId: 'email_' + Math.random().toString(36).substr(2, 10)
            };
            
        } catch (error) {
            console.error('❌ Email send failed:', error);
            throw error;
        }
    }

    // Real implementation would use services like:
    // - SendGrid
    // - Mailgun
    // - Amazon SES
    // - Nodemailer with SMTP
}

// SMS Service Implementation
class SMSService {
    constructor() {
        this.apiEndpoint = '/api/send-sms'; // Your SMS API endpoint
    }

    async sendSMS(phoneNumber, message) {
        try {
            // In a real application, this would call your SMS service API
            // For demo purposes, we'll simulate the SMS send
            console.log('📱 Sending SMS to:', phoneNumber);
            console.log('Message:', message);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Simulate successful send
            console.log('✅ SMS sent successfully to:', phoneNumber);
            
            return {
                success: true,
                messageId: 'sms_' + Math.random().toString(36).substr(2, 10)
            };
            
        } catch (error) {
            console.error('❌ SMS send failed:', error);
            throw error;
        }
    }

    // Real implementation would use services like:
    // - Twilio
    // - AWS SNS
    // - Nexmo/Vonage
    // - MessageBird
}

// Initialize notification manager
const notificationManager = new NotificationManager();

// Export for use in other modules
window.notificationsModule = {
    manager: notificationManager,
    sendBookingNotifications: (booking) => notificationManager.sendBookingNotifications(booking),
    sendPaymentConfirmation: (booking) => notificationManager.sendPaymentConfirmation(booking)
};