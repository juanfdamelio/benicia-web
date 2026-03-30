/* ─────────────────────────────────────────
   BENICIA AMBIENTACIONES — Main Script
   ───────────────────────────────────────── */

// ── REFS ──
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');

// ── SCROLL: navbar + scroll-to-top ──
window.addEventListener('scroll', () => {
    const y = window.scrollY;

    if (y > 70) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (y > 450) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}, { passive: true });

// ── SCROLL TO TOP ──
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── HAMBURGER MENU ──
hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu on overlay click (outside panel)
document.addEventListener('click', e => {
    if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ── REVEAL ANIMATIONS ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children')
    .forEach(el => revealObserver.observe(el));

// ── GALLERY: staggered fade-in ──
const galleryItems = document.querySelectorAll('.grid-item');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.index || 0) * 55;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
            galleryObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.04 });

galleryItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(22px)';
    item.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    item.dataset.index = index;
    galleryObserver.observe(item);
});
