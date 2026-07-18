/* ============================================================
   BITES — App Initializer
   Lenis smooth scroll, global resize, loading transition
   ============================================================ */

(function() {
  'use strict';

  // ── Loading Transition ───────────────────────────────────
  function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // Check if we should skip loader (repeat visit within session)
    if (sessionStorage.getItem('bites-loaded') === 'true') {
      loader.style.display = 'none';
      return;
    }

    const logo = loader.querySelector('.loader__logo');
    const progress = loader.querySelector('.loader__progress-fill');

    // Animate loader
    setTimeout(() => {
      if (logo) logo.style.transform = 'scale(1)';
      if (progress) progress.style.width = '100%';
    }, 100);

    // Exit loader
    setTimeout(() => {
      loader.classList.add('is-exiting');
      sessionStorage.setItem('bites-loaded', 'true');
      
      setTimeout(() => {
        loader.style.display = 'none';
      }, 800);
    }, 1400);
  }

  // ── Native Scroll Fallback ───────────────────────────────
  function initSmoothScroll() {
    // Lenis removed for stability
  }

  // ── Newsletter Form ──────────────────────────────────────
  function initNewsletterForm() {
    const form = document.querySelector('.order-cta__form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.order-cta__input');
      const feedback = document.querySelector('.order-cta__feedback');
      
      if (!input || !input.value.trim()) {
        if (feedback) {
          feedback.textContent = 'Please enter your email address.';
          feedback.className = 'order-cta__feedback is-error';
        }
        return;
      }

      // Simulate submission
      if (feedback) {
        feedback.textContent = 'Thanks! We\'ll be in touch with fresh updates.';
        feedback.className = 'order-cta__feedback is-success';
      }
      input.value = '';
    });
  }

  // ── Video Fallback ───────────────────────────────────────
  function initVideoFallback() {
    const video = document.querySelector('.hero__video');
    const media = document.querySelector('.hero__media');
    
    if (!video || !media) return;

    // Show poster if video fails to load
    video.addEventListener('error', () => {
      media.classList.add('hero__media--poster-only');
    });

    // Respect data saver
    if (navigator.connection && navigator.connection.saveData) {
      media.classList.add('hero__media--poster-only');
    }

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      media.classList.add('hero__media--poster-only');
    }
  }

  // ── Init Everything ──────────────────────────────────────
  function init() {
    initLoader();
    initSmoothScroll();
    initVideoFallback();
    initNewsletterForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
