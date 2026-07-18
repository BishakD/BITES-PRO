/* ============================================================
   BITES — Header Controller
   Navbar shrink on scroll, mobile menu, staggered links
   ============================================================ */

(function() {
  'use strict';

  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.header__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (!header) return;

  // ── Scroll Shrink ────────────────────────────────────────
  let lastScroll = 0;
  const SHRINK_THRESHOLD = 60;

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    if (scrollY > SHRINK_THRESHOLD) {
      header.classList.add('is-shrunk');
    } else {
      header.classList.remove('is-shrunk');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile Menu ──────────────────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // Close on link click
    const menuLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    mobileMenu.classList.add('is-open');
    hamburger.classList.add('is-active');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');

    // Focus trap — first link
    const firstLink = mobileMenu.querySelector('.mobile-menu__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 400);
    }
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }
})();
