/* ============================================================
   BAES — interacciones de la landing
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = Math.min(i * 60, 240);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Contador de visores LCD ---------- */
  // Anima cada .lcd-num desde 0 hasta su data-weight-target cuando entra en pantalla.
  const lcdNums = document.querySelectorAll('.lcd-num');

  function animateLcd(el) {
    const target = parseFloat(el.dataset.weightTarget || '0');
    const decimals = el.dataset.decimals !== undefined ? parseInt(el.dataset.decimals, 10) : 1;

    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = target * eased;
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (lcdNums.length) {
    const lcdObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateLcd(entry.target);
          lcdObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    lcdNums.forEach(el => lcdObserver.observe(el));
  }

  /* ---------- Header: sombra sutil al hacer scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 8px 24px -18px rgba(0,0,0,.35)'
        : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

});

// CARROUSEL
const slides = document.querySelectorAll(".carousel-img");

let actual = 0;

setInterval(() => {

    slides[actual].classList.remove("active");

    actual = (actual + 1) % slides.length;

    slides[actual].classList.add("active");

}, 3500);