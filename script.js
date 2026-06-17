// Main JavaScript for Sunny Park Langebaan Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle - FIXED
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList) {
                navList.classList.remove('active');
            }
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    
    // Create dots for slider
    if (slides.length > 0 && sliderDotsContainer) {
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDotsContainer.appendChild(dot);
        });
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0) dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    if (sliderNext) {
        sliderNext.addEventListener('click', nextSlide);
    }
    
    if (sliderPrev) {
        sliderPrev.addEventListener('click', prevSlide);
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Service Sliders
    const serviceSliders = document.querySelectorAll('.service-slider');
    
    serviceSliders.forEach(slider => {
        const slides = slider.querySelectorAll('.service-slide');
        const prevBtn = slider.querySelector('.slide-prev');
        const nextBtn = slider.querySelector('.slide-next');
        
        let currentServiceSlide = 0;
        
        if (slides.length > 1) {
            slides[0].classList.add('active');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    slides[currentServiceSlide].classList.remove('active');
                    currentServiceSlide = (currentServiceSlide - 1 + slides.length) % slides.length;
                    slides[currentServiceSlide].classList.add('active');
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    slides[currentServiceSlide].classList.remove('active');
                    currentServiceSlide = (currentServiceSlide + 1) % slides.length;
                    slides[currentServiceSlide].classList.add('active');
                });
            }
        }
    });
    
    // Services Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            serviceCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    
    // Gallery Filter
    const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryFilterButtons.length > 0) {
        galleryFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Gallery Lightbox
    const galleryItemsAll = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxImage = lightbox?.querySelector('img');
    const lightboxCaption = lightbox?.querySelector('.lightbox-caption h3');
    const lightboxDescription = lightbox?.querySelector('.lightbox-caption p');
    
    let currentImageIndex = 0;
    const galleryImages = [];
    
    if (galleryItemsAll.length > 0 && lightbox) {
        // Collect all gallery images
        galleryItemsAll.forEach((item, index) => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            
            if (img) {
                galleryImages.push({
                    src: img.getAttribute('src'),
                    alt: img.getAttribute('alt'),
                    title: overlay ? overlay.querySelector('h3').textContent : '',
                    description: overlay ? overlay.querySelector('p').textContent : ''
                });
                
                item.addEventListener('click', () => {
                    currentImageIndex = index;
                    openLightbox();
                });
            }
        });
        
        function openLightbox() {
            if (galleryImages[currentImageIndex]) {
                lightboxImage.src = galleryImages[currentImageIndex].src;
                lightboxImage.alt = galleryImages[currentImageIndex].alt;
                lightboxCaption.textContent = galleryImages[currentImageIndex].title;
                lightboxDescription.textContent = galleryImages[currentImageIndex].description;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            openLightbox();
        }
        
        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            openLightbox();
        }
        
        // Lightbox controls
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', nextImage);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', prevImage);
        }
        
        // Close lightbox on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Package Tabs
    const packageTabs = document.querySelectorAll('.package-tab');
    const packageContents = document.querySelectorAll('.package-content');
    
    if (packageTabs.length > 0) {
        packageTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs
                packageTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all package contents
                packageContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the selected package content
                const targetContent = document.getElementById(tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // WhatsApp Form
    const whatsappForm = document.getElementById('whatsapp-form');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Format the message for WhatsApp
            const whatsappMessage = `*New Inquiry from Sunny Park Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Email:* ${email || 'Not provided'}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
            
            // Open WhatsApp with the pre-filled message
            window.open(`https://wa.me/27823790450?text=${whatsappMessage}`, '_blank');
            
            // Reset the form
            this.reset();
        });
    }
    
    // Welcome Popup
    const welcomePopup = document.getElementById('welcome-popup');
    const popupClose = document.querySelector('.popup-close');
    const popupActionBtn = document.querySelector('.popup-action-btn');
    
    // Show popup after 2 seconds
    setTimeout(() => {
        if (welcomePopup && !sessionStorage.getItem('popupClosed')) {
            welcomePopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }, 2000);
    
    // Close popup
    if (popupClose) {
        popupClose.addEventListener('click', () => {
            welcomePopup.classList.remove('active');
            document.body.style.overflow = 'auto';
            sessionStorage.setItem('popupClosed', 'true');
        });
    }
    
    // Popup action button
    if (popupActionBtn) {
        popupActionBtn.addEventListener('click', () => {
            welcomePopup.classList.remove('active');
            document.body.style.overflow = 'auto';
            sessionStorage.setItem('popupClosed', 'true');
            // Scroll to activities section
            const activitiesSection = document.querySelector('.featured-activities');
            if (activitiesSection) {
                activitiesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Close popup when clicking outside
    if (welcomePopup) {
        welcomePopup.addEventListener('click', (e) => {
            if (e.target === welcomePopup) {
                welcomePopup.classList.remove('active');
                document.body.style.overflow = 'auto';
                sessionStorage.setItem('popupClosed', 'true');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.activity-card, .value-card, .service-card, .pricing-card, .review-card, .team-member, .service-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.activity-card, .value-card, .service-card, .pricing-card, .review-card, .team-member, .service-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on load
    animateOnScroll();
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(element => {
        if (element.textContent.includes('2023')) {
            element.textContent = element.textContent.replace('2023', currentYear);
        }
    });
});