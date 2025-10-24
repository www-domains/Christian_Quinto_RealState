// Christian Quinto Real Estate - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroSearch();
    initPropertyFilters();
    initContactForm();
    initInquiryForm();
    initSmoothScrolling();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
}

// Hero search functionality
function initHeroSearch() {
    const heroSearchForm = document.getElementById('hero-search-form');
    
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const searchParams = {
                type: formData.get('property_type'),
                location: formData.get('location'),
                minPrice: formData.get('min_price'),
                maxPrice: formData.get('max_price')
            };
            
            // Store search parameters and redirect to properties page
            localStorage.setItem('searchParams', JSON.stringify(searchParams));
            window.location.href = 'properties.html';
        });
    }
}

// Property filters functionality
function initPropertyFilters() {
    const filterType = document.getElementById('filter-type');
    const filterPrice = document.getElementById('filter-price');
    const filterBedrooms = document.getElementById('filter-bedrooms');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const propertiesGrid = document.getElementById('properties-grid');
    
    if (!propertiesGrid) return;
    
    // Load properties on page load
    loadProperties();
    
    // Filter event listeners
    if (filterType) {
        filterType.addEventListener('change', filterProperties);
    }
    
    if (filterPrice) {
        filterPrice.addEventListener('change', filterProperties);
    }
    
    if (filterBedrooms) {
        filterBedrooms.addEventListener('change', filterProperties);
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    function loadProperties() {
        // Sample property data - replace with actual data source
        const properties = [
            {
                id: 1,
                title: "Luxury Modern House",
                type: "house",
                price: 8500000,
                location: "Makati City",
                bedrooms: 4,
                bathrooms: 3,
                area: "250 sqm",
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                featured: true
            },
            {
                id: 2,
                title: "Premium Condominium",
                type: "condominium",
                price: 12000000,
                location: "BGC, Taguig",
                bedrooms: 3,
                bathrooms: 2,
                area: "120 sqm",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                featured: true
            },
            {
                id: 3,
                title: "Subdivision Lot",
                type: "subdivision",
                price: 3500000,
                location: "Cavite",
                bedrooms: 0,
                bathrooms: 0,
                area: "200 sqm",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
                featured: false
            },
            {
                id: 4,
                title: "Commercial Space",
                type: "commercial",
                price: 25000000,
                location: "Ortigas Center",
                bedrooms: 0,
                bathrooms: 2,
                area: "500 sqm",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
                featured: true
            },
            {
                id: 5,
                title: "Vacant Land",
                type: "land",
                price: 1800000,
                location: "Laguna",
                bedrooms: 0,
                bathrooms: 0,
                area: "300 sqm",
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2059&q=80",
                featured: false
            },
            {
                id: 6,
                title: "Family House",
                type: "house",
                price: 6500000,
                location: "Quezon City",
                bedrooms: 3,
                bathrooms: 2,
                area: "180 sqm",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
                featured: true
            }
        ];
        
        displayProperties(properties);
    }
    
    function displayProperties(properties) {
        propertiesGrid.innerHTML = '';
        
        properties.forEach(property => {
            const propertyCard = createPropertyCard(property);
            propertiesGrid.appendChild(propertyCard);
        });
    }
    
    function createPropertyCard(property) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        
        col.innerHTML = `
            <div class="card property-card h-100">
                <div class="property-image" style="background-image: url('${property.image}')">
                    ${property.featured ? '<span class="property-badge">Featured</span>' : ''}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${property.title}</h5>
                    <p class="property-location">
                        <i class="fas fa-map-marker-alt me-1"></i>
                        ${property.location}
                    </p>
                    <div class="property-price">₱${property.price.toLocaleString()}</div>
                    <div class="property-features">
                        ${property.bedrooms > 0 ? `<div class="property-feature">
                            <i class="fas fa-bed"></i>
                            <span>${property.bedrooms} Bed</span>
                        </div>` : ''}
                        ${property.bathrooms > 0 ? `<div class="property-feature">
                            <i class="fas fa-bath"></i>
                            <span>${property.bathrooms} Bath</span>
                        </div>` : ''}
                        <div class="property-feature">
                            <i class="fas fa-expand-arrows-alt"></i>
                            <span>${property.area}</span>
                        </div>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="viewProperty(${property.id})">
                            <i class="fas fa-eye me-1"></i>
                            View Details
                        </button>
                        <button class="btn btn-primary btn-sm" onclick="makeInquiry(${property.id})">
                            <i class="fas fa-envelope me-1"></i>
                            Inquire
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return col;
    }
    
    function filterProperties() {
        const typeFilter = filterType ? filterType.value : '';
        const priceFilter = filterPrice ? filterPrice.value : '';
        const bedroomsFilter = filterBedrooms ? filterBedrooms.value : '';
        
        // This would typically make an API call to filter properties
        // For now, we'll just reload all properties
        loadProperties();
    }
    
    function clearFilters() {
        if (filterType) filterType.value = '';
        if (filterPrice) filterPrice.value = '';
        if (filterBedrooms) filterBedrooms.value = '';
        loadProperties();
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner me-2"></span>Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                
                // Show success message
                showNotification('Message sent successfully! We will get back to you soon.', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Inquiry form functionality
function initInquiryForm() {
    const inquiryForm = document.getElementById('inquiryForm');
    const submitInquiryBtn = document.getElementById('submitInquiryBtn');
    
    if (inquiryForm && submitInquiryBtn) {
        submitInquiryBtn.addEventListener('click', function() {
            const formData = new FormData(inquiryForm);
            const originalText = this.innerHTML;
            
            // Show loading state
            this.innerHTML = '<span class="spinner me-2"></span>Submitting...';
            this.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                inquiryForm.reset();
                
                // Show success message
                showNotification('Inquiry submitted successfully! We will contact you soon.', 'success');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('inquiryModal'));
                if (modal) modal.hide();
                
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .service-card, .feature-icon');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function viewProperty(propertyId) {
    // This would typically open a property details modal or page
    showNotification(`Viewing property ${propertyId} details`, 'info');
}

function makeInquiry(propertyId) {
    // Set property ID in inquiry form
    const propertyIdInput = document.getElementById('inquiry-property-id');
    if (propertyIdInput) {
        propertyIdInput.value = propertyId;
    }
    
    // Show inquiry modal
    const inquiryModal = new bootstrap.Modal(document.getElementById('inquiryModal'));
    inquiryModal.show();
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format number with commas
function formatNumber(number) {
    return number.toLocaleString();
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
