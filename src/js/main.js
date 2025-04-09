// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    initPreloader();
    
    // Initialize custom cursor
    initCursor();
    
    // Initialize navbar effects
    initNavbar();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize crypto ticker
    initCryptoTicker();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize particles
    initParticles();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (!preloader) return;
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hide');
            // Enable scroll after preloader is hidden
            document.body.style.overflow = 'auto';
        }, 1000);
    });
    
    // Disable scroll while preloader is visible
    document.body.style.overflow = 'hidden';
}

// Custom cursor
function initCursor() {
    const cursor = document.querySelector('.cursor-follow');
    
    if (!cursor) return;
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.classList.remove('active');
    });
    
    // Add hover effect to all buttons, links, and interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .service-card, .network-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
}

// Navbar effects
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (!navbar) return;
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Disable scroll when menu is open
            if (navbarMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navbarMenu.classList.contains('active') && 
                !navbarMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (!target) return;
            
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
}

// Project filters
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
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
}

// Back to top button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Crypto ticker
function initCryptoTicker() {
    const cryptoPrices = document.querySelector('.crypto-prices');
    
    if (!cryptoPrices) return;
    
    // Sample data for crypto prices (in a real-world scenario, this would come from an API)
    const cryptos = [
        { name: 'Bitcoin', symbol: 'BTC', price: 68245.12, change: '+2.4%' },
        { name: 'Ethereum', symbol: 'ETH', price: 3478.91, change: '+1.7%' },
        { name: 'Solana', symbol: 'SOL', price: 124.51, change: '+5.2%' },
        { name: 'Cardano', symbol: 'ADA', price: 0.45, change: '-0.8%' },
        { name: 'Polkadot', symbol: 'DOT', price: 6.78, change: '+3.1%' },
        { name: 'Avalanche', symbol: 'AVAX', price: 36.29, change: '+4.2%' },
        { name: 'Ripple', symbol: 'XRP', price: 0.62, change: '+0.5%' },
        { name: 'Binance Coin', symbol: 'BNB', price: 589.23, change: '+1.3%' }
    ];
    
    // Generate HTML for each crypto
    let tickerHTML = '';
    
    cryptos.forEach(crypto => {
        const isPositive = crypto.change.startsWith('+');
        tickerHTML += `
            <div class="crypto-item">
                <div class="crypto-name">${crypto.name} <span>${crypto.symbol}</span></div>
                <div class="crypto-price">$${crypto.price.toLocaleString()}</div>
                <div class="crypto-change ${isPositive ? 'positive' : 'negative'}">${crypto.change}</div>
            </div>
        `;
    });
    
    // Add duplicates for infinite scrolling effect
    cryptoPrices.innerHTML = tickerHTML + tickerHTML;
}

// Contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form (simple validation)
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // In a real-world scenario, you would send the form data to a server
        // For this example, we'll just show a success message
        alert('Your message has been sent successfully!');
        contactForm.reset();
    });
}

// Initialize particles.js
function initParticles() {
    if (typeof particlesJS === 'undefined' || !document.getElementById('particles-js')) return;
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ff3333'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ab2121',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
} 