// Mini Scientist - Main Application JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    setupNavigationMenu();
    loadHomePageContent();
    console.log('✓ App initialized');
}

// Setup mobile navigation menu
function setupNavigationMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            console.log('Menu toggled');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Load content on home page
function loadHomePageContent() {
    loadActivitiesPreview();
    loadTestimonials();
}

// Load activities preview on home page
function loadActivitiesPreview() {
    const container = document.getElementById('activitiesPreview');
    if (!container || !window.activitiesData) return;

    // Show only first 4 activities
    const previewActivities = window.activitiesData.activities.slice(0, 4);
    
    const html = previewActivities.map(activity => `
        <div class="activity-card">
            <div class="card-image">
                ${activity.icon.endsWith('.JPG') || activity.icon.endsWith('.jpg') || activity.icon.endsWith('.PNG') || activity.icon.endsWith('.png') ? 
                    `<img src="assets/images/${activity.icon}" alt="${activity.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` : 
                    activity.icon
                }
            </div>
            <div class="card-content">
                <h3>${activity.name}</h3>
                <p class="card-description">${activity.description}</p>
                <div class="card-meta">
                    <span class="meta-badge">🎂 ${activity.ageGroup}</span>
                    <span class="meta-badge">⏱️ ${activity.duration}</span>
                </div>
                <a href="science-events.html" class="btn btn-primary" style="margin-top: auto;">Learn More</a>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Load testimonials
function loadTestimonials() {
    const container = document.getElementById('testimonials');
    if (!container || !window.testimonialData) return;

    const html = window.testimonialData.testimonials.map(testimonial => `
        <div class="testimonial-card">
            <div class="star-rating">⭐⭐⭐⭐⭐</div>
            <p>"${testimonial.content}"</p>
            <p class="testimonial-author">- ${testimonial.name}, ${testimonial.relation}</p>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add animation on scroll
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .feature-item, .activity-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Call observer when DOM is ready
setTimeout(observeElements, 100);

// Track form submissions
function trackFormSubmission(formName, data) {
    console.log(`Form Submitted: ${formName}`, data);
    // In production, send to analytics service
}

// Contact form handling for contact page
function handleContactForm(e) {
    if (e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Collect form data
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Track submission
        trackFormSubmission('Contact Form', data);
        
        // Show success message
        alert(`Thank you for reaching out! We'll respond within 24 hours.`);
        form.reset();
        
        // In production, send to server
        // sendToServer('/api/contact', data);
    }
}

// Newsletter signup handling
function handleNewsletterSignup(e) {
    if (e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Track subscription
        trackFormSubmission('Newsletter Signup', { email });
        
        // Show success message
        alert('Thank you for subscribing! Check your email for exclusive offers.');
        e.target.reset();
        
        // In production, send to server
        // sendToServer('/api/newsletter', { email });
    }
}

// Utility function to send data to server
function sendToServer(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Generate unique ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Validate email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/[^0-9]/g, ''));
}

// Add scroll event listener for navbar background change
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            header.style.boxShadow = 'var(--shadow-md)';
        }
    }
});

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('science-events')) return 'science-events';
    if (path.includes('theme-decorations')) return 'themes';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    return 'home';
}

// Highlight current navigation link
function highlightCurrentNav() {
    const currentPage = getCurrentPage();
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Initialize navigation highlighting
setTimeout(highlightCurrentNav, 100);

// Add styles for active nav link
const style = document.createElement('style');
style.innerHTML = `
    .nav-links a.active {
        border-bottom: 3px solid var(--accent-yellow);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Prefetch navigation pages for faster loading
function prefetchPages() {
    const pages = [
        'science-events.html',
        'theme-decorations.html',
        'about.html',
        'contact.html'
    ];
    
    pages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// Call prefetch on idle
if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetchPages);
} else {
    setTimeout(prefetchPages, 2000);
}

// Log app version
console.log('%cMini Scientist Web App v1.0', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cWhere Fun Meets Science & Imagination', 'color: #c084fc; font-style: italic;');
