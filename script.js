/* ============================================================
   Pius Victor — Portfolio Scripts
   Pairs with: index.html + style.css
   ============================================================ */

/* ── STICKY NAV: add .scrolled class on scroll ── */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });


/* ── SMOOTH SCROLL: for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});


/* ── FADE-IN ON SCROLL: staggered reveal for .fade-in elements ── */
const fadeEls = document.querySelectorAll('.fade-in');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Stagger siblings inside the same parent
    const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in')];
    const index    = siblings.indexOf(entry.target);

    entry.target.style.transitionDelay = `${index * 80}ms`;
    entry.target.classList.add('show');

    revealObserver.unobserve(entry.target); // fire once only
  });
}, {
  threshold: 0.12,
});

fadeEls.forEach(el => revealObserver.observe(el));
