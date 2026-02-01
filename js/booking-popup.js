// Booking Popup Manager
class BookingPopup {
    constructor() {
        this.popupShown = false;
        this.init();
    }

    init() {
        // Check if popup was already shown in this session
        if (sessionStorage.getItem('bookingPopupShown')) {
            return;
        }

        // Show popup after 5 seconds
        setTimeout(() => this.showPopup(), 5000);
    }

    showPopup() {
        if (this.popupShown) return;

        const popup = document.getElementById('bookingPopup');
        const overlay = document.getElementById('popupOverlay');

        if (popup && overlay) {
            overlay.classList.add('active');
            popup.classList.add('active');
            this.popupShown = true;

            // Mark as shown in session storage
            sessionStorage.setItem('bookingPopupShown', 'true');
        }
    }

    closePopup() {
        const popup = document.getElementById('bookingPopup');
        const overlay = document.getElementById('popupOverlay');

        if (popup && overlay) {
            overlay.classList.remove('active');
            popup.classList.remove('active');
        }
    }

    setupEventListeners() {
        // Close button
        const closeBtn = document.getElementById('closePopup');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePopup());
        }

        // Overlay click
        const overlay = document.getElementById('popupOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.closePopup();
                }
            });
        }

        // Form submission
        const form = document.getElementById('bookingPopupForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // WhatsApp button
        const whatsappBtn = document.getElementById('whatsappQuickBooking');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => this.openWhatsApp());
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const fullName = document.getElementById('popupName').value;
        const phone = document.getElementById('popupPhone').value;
        const email = document.getElementById('popupEmail').value;
        const eventType = document.getElementById('popupEventType').value;
        const eventDate = document.getElementById('popupEventDate').value;
        const message = document.getElementById('popupMessage').value;

        // Validate required fields
        if (!fullName || !phone || !eventType || !eventDate) {
            alert('Please fill in all required fields (Name, Phone, Event Type, and Date)');
            return;
        }

        // Validate phone number (basic validation)
        if (!/^\d{10}$/.test(phone.replace(/[^\d]/g, ''))) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }

        // Validate email if provided
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Submit form to Formspree
        this.submitToFormspree({
            fullName,
            phone,
            email,
            eventType,
            eventDate,
            message,
            source: 'Popup Booking'
        });
    }

    submitToFormspree(data) {
        // Create a temporary form and submit it to Formspree
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://formspree.io/f/xaqjrwaw';
        form.style.display = 'none';

        // Add fields to form
        const fields = {
            'Full Name': data.fullName,
            'Phone': data.phone,
            'Email': data.email || 'Not provided',
            'Event Type': data.eventType,
            'Event Date': data.eventDate,
            'Message': data.message || 'No message',
            'Source': data.source,
            '_subject': `New Booking Request from ${data.fullName}`,
            '_replyto': data.email || data.phone
        };

        for (const [key, value] of Object.entries(fields)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }

        // Append form to body and submit
        document.body.appendChild(form);
        
        // Show success message before submitting
        this.showSuccessMessage();

        // Submit form after a short delay to ensure message is visible
        setTimeout(() => {
            form.submit();
            // Remove form after submission
            setTimeout(() => {
                document.body.removeChild(form);
            }, 1000);
        }, 500);
    }

    showSuccessMessage() {
        const form = document.getElementById('bookingPopupForm');
        const successMessage = document.getElementById('popupSuccessMessage');

        if (form && successMessage) {
            form.style.display = 'none';
            successMessage.style.display = 'block';

            // Auto-close popup after 3 seconds
            setTimeout(() => {
                this.closePopup();
                form.style.display = 'block';
                successMessage.style.display = 'none';
                form.reset();
            }, 3000);
        }
    }

    openWhatsApp() {
        const phone = document.getElementById('popupPhone').value;
        const name = document.getElementById('popupName').value;

        if (!phone) {
            alert('Please enter your phone number first');
            return;
        }

        const phoneNumber = '918120757225'; // Mini Scientist WhatsApp number
        const message = encodeURIComponent(`Hi! I'm ${name || 'interested in booking'} and would like to know more about Mini Scientist events.`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

        // Close popup after opening WhatsApp
        this.closePopup();
    }
}

// Initialize popup when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const popup = new BookingPopup();
    popup.setupEventListeners();
});
