// Enhanced interactive elements for the website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add fixed header class on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    
    function checkSections() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkSections);
    checkSections(); // Check on initial load
    
    // Back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                bar.style.width = targetWidth + '%';
            }
        });
    }
    
    // Create and animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStatNumbers() {
        statNumbers.forEach(stat => {
            const targetNumber = parseInt(stat.getAttribute('data-target'));
            if (!isNaN(targetNumber)) {
                let currentNumber = 0;
                const increment = targetNumber / 50; // Divide by steps
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        clearInterval(timer);
                        currentNumber = targetNumber;
                    }
                    stat.textContent = Math.floor(currentNumber).toLocaleString();
                }, 30);
            }
        });
    }
    
    // Create intersection observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress-container')) {
                    animateProgressBars();
                }
                if (entry.target.classList.contains('stats-container')) {
                    animateStatNumbers();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.progress-container, .stats-container').forEach(el => {
        observer.observe(el);
    });
    
    // Add drone animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const droneAnimation = document.createElement('div');
        droneAnimation.classList.add('drone-animation');
        droneAnimation.innerHTML = `
            <div class="drone-body"></div>
            <div class="drone-rotor drone-rotor-1"></div>
            <div class="drone-rotor drone-rotor-2"></div>
            <div class="drone-rotor drone-rotor-3"></div>
            <div class="drone-rotor drone-rotor-4"></div>
            <div class="drone-camera"></div>
        `;
        heroContent.prepend(droneAnimation);
    }
    
    // Add tooltips to technical terms
    const techTerms = document.querySelectorAll('.tech-term');
    techTerms.forEach(term => {
        const tooltip = term.getAttribute('data-tooltip');
        if (tooltip) {
            term.classList.add('tooltip');
            const tooltipSpan = document.createElement('span');
            tooltipSpan.classList.add('tooltip-text');
            tooltipSpan.textContent = tooltip;
            term.appendChild(tooltipSpan);
        }
    });
});
