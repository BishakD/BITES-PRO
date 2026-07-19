/* ============================================================
   BITES — Product Details routing, animation & accessibility
   ═══════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // Elements
  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  const modalBg = modal.querySelector('.product-detail__bg');
  const closeBtn = modal.querySelector('.product-detail__close');
  const detailImg = document.getElementById('detail-image');
  const detailCategory = document.getElementById('detail-category');
  const detailTitle = document.getElementById('detail-title');
  const detailPrice = document.getElementById('detail-price');
  const detailDesc = document.getElementById('detail-desc');
  const detailMade = document.getElementById('detail-made');
  const detailOrderBtn = document.getElementById('detail-order-btn');
  const infoPanel = modal.querySelector('.product-detail__info-panel');

  // State
  let lastActiveElement = null;
  let hasNavigated = false;
  let isTransitioning = false;

  // ── Init ───────────────────────────────────────────────────
  function init() {
    // Bind click events on track
    const track = document.querySelector('.product-rail__track');
    if (track) {
      track.addEventListener('click', onTrackClick);
    }

    // Bind click events on menu grid
    const menuGrid = document.querySelector('.menu-overview__grid');
    if (menuGrid) {
      menuGrid.addEventListener('click', onMenuClick);
    }

    // Close button click
    if (closeBtn) {
      closeBtn.addEventListener('click', handleCloseClick);
    }

    // Modal background click
    if (modalBg) {
      modalBg.addEventListener('click', handleCloseClick);
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        handleCloseClick();
      }
    });

    // Handle History Popstate (browser back/forward)
    window.addEventListener('popstate', handlePopState);

    // Check direct URL on load
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    if (productId) {
      showProductDetail(productId, { animate: false });
    }
  }

  // ── Event Handlers ────────────────────────────────────────
  function onMenuClick(e) {
    const btn = e.target.closest('.menu-overview__row');
    if (!btn) return;

    e.preventDefault();
    if (isTransitioning) return;

    const productId = btn.getAttribute('data-id');
    if (!productId) return;

    lastActiveElement = btn;
    hasNavigated = true;

    // Push history state
    history.pushState({ product: productId }, '', `?product=${productId}`);
    showProductDetail(productId, { animate: true, clickedEl: btn, fromMenu: true });
  }

  function onTrackClick(e) {
    // Find closest item button
    const btn = e.target.closest('.product-rail__item');
    if (!btn) return;

    e.preventDefault();
    if (isTransitioning) return;

    const productId = btn.getAttribute('data-id');
    if (!productId) return;

    lastActiveElement = btn;
    hasNavigated = true;

    // Push history state
    history.pushState({ product: productId }, '', `?product=${productId}`);
    showProductDetail(productId, { animate: true, clickedEl: btn });
  }

  function handleCloseClick() {
    if (isTransitioning) return;

    if (hasNavigated) {
      // If we pushed state, go back via history
      history.back();
    } else {
      // If direct entry, replace query parameter and close
      const cleanUrl = window.location.pathname + window.location.hash;
      history.pushState(null, '', cleanUrl);
      closeProductDetail({ animate: true });
    }
  }

  function handlePopState(e) {
    if (isTransitioning) return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');

    if (productId) {
      showProductDetail(productId, { animate: true, isPopState: true });
    } else {
      closeProductDetail({ animate: true, isPopState: true });
    }
  }

  // ── Show Product Details ──────────────────────────────────
  function showProductDetail(id, options = {}) {
    const animate = options.animate !== false;
    const clickedEl = options.clickedEl || null;
    const fromMenu = options.fromMenu || false;

    // Fetch product data
    if (typeof BITES_PRODUCTS === 'undefined') return;
    const product = BITES_PRODUCTS.find(p => p.id === id);
    if (!product) return;

    // Fill content
    detailCategory.textContent = product.category || 'Fresh Special';
    detailTitle.textContent = product.name;
    detailPrice.textContent = product.price || '';
    detailDesc.textContent = product.desc || '';
    detailMade.textContent = product.made || 'Handcrafted daily using traditional baking recipes.';
    detailImg.src = product.image;
    detailImg.alt = product.alt || product.name;

    // Configure Order action
    if (detailOrderBtn) {
      // Set target to home section anchor
      detailOrderBtn.href = 'index.html#contact-section';
      detailOrderBtn.addEventListener('click', () => {
        closeProductDetail({ animate: false });
      });
    }

    // Scroll Lock
    document.body.style.overflow = 'hidden';
    modal.setAttribute('aria-hidden', 'false');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!animate || reducedMotion) {
      // Open immediately without complex transition
      modal.classList.add('is-open');
      modal.classList.add('is-active');
      modal.focus();
      return;
    }

    // Shared Image Transition logic
    isTransitioning = true;
    
    // Get starting card image bounds
    let srcRect = null;
    let cardImg = null;

    if (clickedEl) {
      cardImg = clickedEl.querySelector('.product-rail__item-image') || clickedEl.querySelector('.menu-overview__thumb');
    } else {
      // Fallback: look up card image in DOM
      const card = document.querySelector(`.product-rail__item[data-id="${id}"]`) || document.querySelector(`.menu-overview__row[data-id="${id}"]`);
      if (card) {
        cardImg = card.querySelector('.product-rail__item-image') || card.querySelector('.menu-overview__thumb');
      }
    }

    if (cardImg) {
      srcRect = cardImg.getBoundingClientRect();
    }

    // Open modal invisibly first to capture destination bounds
    modal.style.visibility = 'hidden';
    modal.classList.add('is-open');
    detailImg.style.opacity = '0'; // Hide real image during fly

    const destRect = detailImg.getBoundingClientRect();
    modal.classList.remove('is-open');
    modal.style.visibility = '';

    // Calculate card's screen position to determine slide direction
    let slideStartX = '100%';
    let slideStartY = '30px';

    if (srcRect) {
      const cardCenter = srcRect.left + srcRect.width / 2;
      const screenCenter = window.innerWidth / 2;
      
      if (window.innerWidth <= 768) {
        // Mobile: slide up
        slideStartY = '50px';
      } else if (fromMenu) {
        // Menu products always slide in from right on PC
        slideStartX = '100%';
      } else {
        // Left side cards slide in from left, right side slide in from right
        slideStartX = cardCenter < screenCenter ? '-100%' : '100%';
      }
    }

    // Set panel transition start positions
    infoPanel.style.setProperty('--slide-start-x', slideStartX);
    infoPanel.style.setProperty('--slide-start-y', slideStartY);

    // Create temporary floating element
    if (srcRect && cardImg) {
      const floatImg = document.createElement('img');
      floatImg.src = cardImg.src;
      floatImg.className = 'product-detail__floating-img';
      floatImg.style.top = `${srcRect.top}px`;
      floatImg.style.left = `${srcRect.left}px`;
      floatImg.style.width = `${srcRect.width}px`;
      floatImg.style.height = `${srcRect.height}px`;
      document.body.appendChild(floatImg);

      // Trigger animation
      modal.classList.add('is-open');

      requestAnimationFrame(() => {
        // Slide text in
        modal.classList.add('is-active');

        // Move floating image to destination
        floatImg.style.transition = 'all 500ms cubic-bezier(.16, 1, .3, 1)';
        floatImg.style.top = `${destRect.top}px`;
        floatImg.style.left = `${destRect.left}px`;
        floatImg.style.width = `${destRect.width}px`;
        floatImg.style.height = `${destRect.height}px`;
      });

      // Cleanup on transition completion
      setTimeout(() => {
        detailImg.style.opacity = '1';
        floatImg.remove();
        isTransitioning = false;
        
        // Focus trap close button
        if (closeBtn) closeBtn.focus();
      }, 500);
    } else {
      // Direct opening fallback
      modal.classList.add('is-open');
      modal.classList.add('is-active');
      detailImg.style.opacity = '1';
      isTransitioning = false;
      if (closeBtn) closeBtn.focus();
    }
  }

  // ── Close Product Details ──────────────────────────────────
  function closeProductDetail(options = {}) {
    const animate = options.animate !== false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Unlock scroll
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');

    if (!animate || reducedMotion) {
      modal.classList.remove('is-active');
      modal.classList.remove('is-open');
      restoreFocus();
      return;
    }

    isTransitioning = true;
    
    // Close panel
    modal.classList.remove('is-active');

    // Fade out main modal overlay
    setTimeout(() => {
      modal.classList.remove('is-open');
      isTransitioning = false;
      restoreFocus();
    }, 450);
  }

  // ── Helper: Restore Focus ──────────────────────────────────
  function restoreFocus() {
    if (lastActiveElement) {
      lastActiveElement.focus();
    } else {
      // If direct visit, scroll to Fresh Bites section to keep context
      const rail = document.querySelector('.product-rail');
      if (rail) {
        rail.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // DOM Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
