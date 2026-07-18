/* ============================================================
   BITES — Animations Controller
   GSAP ScrollTrigger reveals, hero parallax, pattern drift,
   section-specific animations
   ============================================================ */

(function() {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Wait for GSAP
  function waitForGSAP(callback) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      callback();
    } else {
      // Fallback: make everything visible
      document.querySelectorAll('.hero__eyebrow, .hero__subtitle, .hero__cta-group, .hero__scroll-cue, .hero__line-inner, .story__content, .manifesto__line-inner').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }
  }

  function init() {
    if (reducedMotion) {
      makeEverythingVisible();
      return;
    }

    waitForGSAP(() => {
      initHeroAnimation();
      initManifestoAnimation();
      initStoryAnimation();
      initFeaturedAnimation();
      initPatternAnimation();
      initLocationAnimation();
      initRecruitmentAnimation();
      initHeroParallax();
    });
  }

  // ── Make Everything Visible (reduced motion / no GSAP) ───
  function makeEverythingVisible() {
    const selectors = [
      '.hero__eyebrow', '.hero__subtitle', '.hero__cta-group',
      '.hero__scroll-cue', '.hero__line-inner', '.story__content',
      '.manifesto__line-inner'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  }

  // ── Hero Entry Animation ─────────────────────────────────
  function initHeroAnimation() {
    const tl = gsap.timeline({ delay: 0.3 });

    // Eyebrow
    tl.to('.hero__eyebrow', {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: 'power3.out'
    });

    // Headline lines (staggered clip reveal)
    tl.to('.hero__line-inner', {
      y: '0%',
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.3');

    // Subtitle
    tl.to('.hero__subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');

    // CTA group
    tl.to('.hero__cta-group', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');

    // Scroll cue
    tl.to('.hero__scroll-cue', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2');

    // Video slow scale
    const heroVideo = document.querySelector('.hero__video');
    const heroPoster = document.querySelector('.hero__poster');
    const videoEl = heroVideo || heroPoster;
    if (videoEl) {
      gsap.fromTo(videoEl, 
        { scale: 1.04 }, 
        { scale: 1, duration: 2.5, ease: 'power2.out' }
      );
    }
  }

  // ── Hero Parallax ────────────────────────────────────────
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.hero__content');
    const media = document.querySelector('.hero__media');
    const overlay = document.querySelector('.hero__overlay');

    if (!hero || !content) return;

    gsap.to(content, {
      y: () => hero.offsetHeight * -0.18,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    if (media) {
      gsap.to(media, {
        y: () => hero.offsetHeight * 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Fade out hero content and overlay in last 30%
    if (overlay) {
      gsap.to([content, overlay], {
        opacity: 0,
        scrollTrigger: {
          trigger: hero,
          start: '70% top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // ── Manifesto Animation ──────────────────────────────────
  function initManifestoAnimation() {
    const lines = document.querySelectorAll('.manifesto__line-inner');
    if (!lines.length) return;

    gsap.to(lines, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.manifesto',
        start: '25% bottom',
        toggleActions: 'play none none none'
      }
    });
  }

  // ── Story Animation ──────────────────────────────────────
  function initStoryAnimation() {
    const mask = document.querySelector('.story__image-mask');
    const image = document.querySelector('.story__image');
    const content = document.querySelector('.story__content');

    if (mask) {
      gsap.to(mask, {
        scaleX: 0,
        duration: 1.1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.story',
          start: '20% bottom',
          toggleActions: 'play none none none'
        }
      });
    }

    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 1.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.story',
          start: '20% bottom',
          toggleActions: 'play none none none'
        }
      });
    }

    if (content) {
      gsap.to(content, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.story',
          start: '30% bottom',
          toggleActions: 'play none none none'
        }
      });
    }

    // Desktop parallax between image and copy
    if (window.innerWidth > 768 && content && image) {
      gsap.to(content, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // ── Featured Product Animation ───────────────────────────
  function initFeaturedAnimation() {
    const bgWord = document.querySelector('.featured__bg-word');
    const productImg = document.querySelector('.featured__image');

    if (bgWord) {
      gsap.to(bgWord, {
        x: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.featured',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    if (productImg) {
      gsap.from(productImg, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured',
          start: '20% bottom',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  // ── Pattern Field Animation ──────────────────────────────
  function initPatternAnimation() {
    const rows = document.querySelectorAll('.pattern-field__row');
    if (!rows.length) return;

    rows.forEach((row, i) => {
      const direction = row.classList.contains('pattern-field__row--solid') ? -1 : 1;
      const speed = 10 + (i % 3) * 4; // Varying speeds

      gsap.to(row, {
        x: `${direction * speed}vw`,
        ease: 'none',
        scrollTrigger: {
          trigger: '.pattern-field',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }

  // ── Location Preview Crossfade ───────────────────────────
  function initLocationAnimation() {
    const items = document.querySelectorAll('.locations__item');
    const preview = document.querySelector('.locations__preview-img');

    if (!items.length || !preview) return;

    // Set first as active
    items[0].classList.add('is-active');

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        const loc = BITES_LOCATIONS.find(l => l.id === item.dataset.locationId);
        if (!loc) return;

        // Remove active from all
        items.forEach(i => i.classList.remove('is-active'));
        item.classList.add('is-active');

        // Crossfade
        preview.classList.add('is-fading');
        setTimeout(() => {
          preview.src = loc.image;
          preview.classList.remove('is-fading');
        }, 280);
      });
    });
  }

  // ── Recruitment Character Animation ──────────────────────
  function initRecruitmentAnimation() {
    const character = document.querySelector('.recruitment__character');
    if (!character) return;

    gsap.from(character, {
      y: 80,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.recruitment',
        start: '20% bottom',
        toggleActions: 'play none none none'
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
