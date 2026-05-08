document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // --- Navbar Active State & Smooth Scroll ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Smooth scroll and set active on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active from all
                navLinks.forEach(nav => nav.classList.remove('active'));
                // Add active to clicked
                this.classList.add('active');
                
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active state on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
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

    // --- Typing Effect for Hero Section ---
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const textArray = ['Web Developer', 'Frontend Developer', 'Tech Enthusiast'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }
        
        // Setup initial text content then start typing
        typingText.textContent = '';
        setTimeout(type, 1000);
    }


    // --- Intersection Observer for Animations (Reveal & Progress Bars) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle section reveal
                if (entry.target.classList.contains('reveal')) {
                    entry.target.classList.add('active');
                }

                // Handle progress bars animation
                const progressBars = entry.target.querySelectorAll('.animate-bar');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });

                // Unobserve if it's a one-time animation
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe all reveal sections and skill cards
    const revealElements = document.querySelectorAll('.reveal, #skills');
    revealElements.forEach(el => observer.observe(el));


    // --- Bootstrap Form Validation ---
    const forms = document.querySelectorAll('.needs-validation');
  
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                // Button loading state simulation
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
                    btn.classList.add('btn-success');
                    btn.classList.remove('btn-gradient');
                    
                    setTimeout(() => {
                        form.reset();
                        form.classList.remove('was-validated');
                        btn.innerHTML = originalText;
                        btn.classList.remove('btn-success');
                        btn.classList.add('btn-gradient');
                    }, 3000);
                }, 1500);
            }
            form.classList.add('was-validated');
        }, false);
    });
});
