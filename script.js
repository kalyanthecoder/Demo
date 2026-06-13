document.addEventListener('DOMContentLoaded', () => {

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close nav on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 10
            ? '0 4px 16px rgba(0,0,0,0.12)'
            : '0 2px 8px rgba(0,0,0,0.08)';
    });

    // Animate skill progress bars when they scroll into view
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                bar.style.width = bar.style.width; // trigger reflow
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => observer.observe(bar), 100);
        bar.dataset.target = target;
    });

    // Re-trigger width after observed
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.target;
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => skillObserver.observe(bar));

    // Fade-in sections on scroll
    const sections = document.querySelectorAll('.section, .bg-light');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(sec => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(20px)';
        sec.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(sec);
    });

    // Contact form submit
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        formMsg.textContent = 'Message sent! I will get back to you soon.';
        form.reset();
        setTimeout(() => formMsg.textContent = '', 4000);
    });

});
