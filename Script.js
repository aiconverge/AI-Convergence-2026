const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
        hamburger?.setAttribute('aria-expanded', 'false');
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    anchor.addEventListener('click', function (event) {
        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const headerOffset = 80;
        const offsetPosition =
            target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    });
});

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScroll = window.pageYOffset;

    navbar.style.background =
        currentScroll > 100
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow =
        currentScroll > 100
            ? '0 2px 20px rgba(0, 0, 0, 0.1)'
            : '0 2px 10px rgba(0, 0, 0, 0.1)';

    navbar.style.transform =
        currentScroll > lastScroll && currentScroll > 500
            ? 'translateY(-100%)'
            : 'translateY(0)';

    lastScroll = currentScroll;
});

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.section').forEach((section) => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

function showNotification(message, type = 'info') {
    document.querySelector('.notification')?.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'status');

    const content = document.createElement('div');
    content.className = 'notification-content';

    const messageNode = document.createElement('span');
    messageNode.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close notification');
    closeButton.textContent = '×';

    content.append(messageNode, closeButton);
    notification.appendChild(content);
    document.body.appendChild(notification);

    const remove = () => notification.remove();
    closeButton.addEventListener('click', remove);
    window.setTimeout(() => {
        if (notification.isConnected) remove();
    }, 5000);
}

document.querySelectorAll('.registration-coming-soon').forEach((button) => {
    button.addEventListener('click', () => {
        const category = button.closest('.reg-card')?.querySelector('h3')?.textContent;
        showNotification(
            `${category || 'Conference'} registration details are not yet published.`,
            'info'
        );
    });
});

document.querySelectorAll('.action-coming-soon').forEach((button) => {
    button.addEventListener('click', () => {
        showNotification(
            `${button.dataset.action || 'This action'} details are not yet published.`,
            'info'
        );
    });
});

function highlightActiveSection() {
    let current = '';
    document.querySelectorAll('section[id]').forEach((section) => {
        if (window.pageYOffset >= section.offsetTop - 120) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

window.addEventListener('scroll', highlightActiveSection);
highlightActiveSection();

function createParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = document.querySelector('.hero-particles');
    if (!container) return;

    for (let i = 0; i < 30; i += 1) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.width = `${Math.random() * 5 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        container.appendChild(particle);
    }
}

window.addEventListener('load', createParticles);
