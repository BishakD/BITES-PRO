/* ============================================================
   BITES — Product Rail Controller
   Pointer-based drag, inertia, rubber-band edges,
   keyboard nav, magnetic snap, mobile swipe
   ============================================================ */

(function() {
  'use strict';

  const viewport = document.querySelector('.product-rail__viewport');
  const track = document.querySelector('.product-rail__track');
  const prompt = document.querySelector('.product-rail__prompt');
  const prevBtn = document.querySelector('.product-rail__nav--prev');
  const nextBtn = document.querySelector('.product-rail__nav--next');
  
  if (!viewport || !track) return;

  // ── State ────────────────────────────────────────────────
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let trackX = 0;
  let targetX = 0;
  let velocity = 0;
  let lastPointerX = 0;
  let lastTime = 0;
  let dragStartX = 0;
  let hasDragged = false;
  let promptDismissed = sessionStorage.getItem('bites-rail-dragged') === 'true';
  let animId = null;
  let isDecelerating = false;

  // ── Config ───────────────────────────────────────────────
  const FRICTION = 0.92;
  const RUBBER_BAND = 55;
  const RUBBER_RESISTANCE = 0.35;
  const DRAG_THRESHOLD = 8;
  const MAX_LEAN = 1.8;
  const SNAP_THRESHOLD = 3;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Init ─────────────────────────────────────────────────
  function init() {
    if (promptDismissed && prompt) {
      prompt.classList.add('is-hidden');
    }

    // Populate products from data
    renderProducts();

    // Bind events
    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('pointerleave', onPointerUp);

    // Prevent native image drag
    viewport.addEventListener('dragstart', e => e.preventDefault());

    // Mouse wheel horizontal scroll
    viewport.addEventListener('wheel', onWheel, { passive: false });

    // Keyboard navigation
    viewport.setAttribute('tabindex', '0');
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Product showcase — use arrow keys to browse');
    viewport.addEventListener('keydown', onKeyDown);

    // Nav arrows
    if (prevBtn) prevBtn.addEventListener('click', () => moveByItem(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveByItem(1));

    // Resize handler
    window.addEventListener('resize', recalcBounds);

    // Start animation loop
    animate();
  }

  // ── Render Products ──────────────────────────────────────
  function renderProducts() {
    if (typeof BITES_PRODUCTS === 'undefined') return;
    
    track.innerHTML = BITES_PRODUCTS.map(product => `
      <button class="product-rail__item" type="button" data-id="${product.id}" data-category="${product.category}" aria-label="View details for ${product.name}">
        <div class="product-rail__item-image-wrap">
          <img 
            class="product-rail__item-image" 
            src="${product.image}" 
            alt="${product.alt}"
            loading="lazy"
            width="300"
            height="300"
            draggable="false"
            onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22 viewBox=%220 0 300 300%22><rect fill=%22%23F3F0E3%22 width=%22300%22 height=%22300%22 rx=%2220%22/><text x=%22150%22 y=%22160%22 text-anchor=%22middle%22 fill=%22%23064D3B%22 font-size=%2240%22 font-family=%22serif%22>🥐</text></svg>'"
          >
          <div class="product-rail__item-shadow"></div>
        </div>
        <h3 class="product-rail__item-name">${product.name}</h3>
        <p class="product-rail__item-desc">${product.desc}</p>
      </button>
    `).join('');
  }

  // ── Bounds ───────────────────────────────────────────────
  function getMinX() {
    const trackWidth = track.scrollWidth;
    const viewWidth = viewport.offsetWidth;
    return -(trackWidth - viewWidth);
  }

  function recalcBounds() {
    // Clamp current position
    const min = getMinX();
    if (trackX < min) trackX = min;
    if (trackX > 0) trackX = 0;
    targetX = trackX;
  }

  // ── Pointer Handlers ─────────────────────────────────────
  function onPointerDown(e) {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    
    isDragging = true;
    isDecelerating = false;
    hasDragged = false;
    startX = e.clientX;
    dragStartX = trackX;
    lastPointerX = e.clientX;
    lastTime = performance.now();
    velocity = 0;

    viewport.setPointerCapture(e.pointerId);
    viewport.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    
    const dx = e.clientX - startX;
    const now = performance.now();
    const dt = now - lastTime;

    // Calculate velocity
    if (dt > 0) {
      velocity = (e.clientX - lastPointerX) / dt;
    }

    lastPointerX = e.clientX;
    lastTime = now;

    if (Math.abs(dx) > DRAG_THRESHOLD) {
      hasDragged = true;
      if (!promptDismissed && prompt) {
        prompt.classList.add('is-hidden');
        promptDismissed = true;
        sessionStorage.setItem('bites-rail-dragged', 'true');
      }
    }

    let newX = dragStartX + dx;
    const min = getMinX();

    // Rubber band at edges
    if (newX > 0) {
      newX = newX * RUBBER_RESISTANCE;
    } else if (newX < min) {
      const overscroll = min - newX;
      newX = min - overscroll * RUBBER_RESISTANCE;
    }

    trackX = newX;
    targetX = newX;

    // Image lean during drag (only for fine pointer, not reduced motion)
    if (!reducedMotion && e.pointerType !== 'touch') {
      const lean = Math.max(-MAX_LEAN, Math.min(MAX_LEAN, velocity * 30));
      applyLean(lean);
    }
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    viewport.style.cursor = 'grab';

    // Click vs drag
    if (!hasDragged) {
      // Allow normal click behavior
      return;
    }

    // Apply inertia
    if (Math.abs(velocity) > 0.15) {
      isDecelerating = true;
    } else {
      snapToNearest();
    }

    // Reset lean
    if (!reducedMotion) {
      applyLean(0);
    }
  }

  // ── Wheel Handler ────────────────────────────────────────
  function onWheel(e) {
    // Only intercept horizontal wheel or shift+wheel
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
      e.preventDefault();
      const delta = e.deltaX || e.deltaY;
      targetX -= delta;
      
      const min = getMinX();
      targetX = Math.max(min, Math.min(0, targetX));
      isDecelerating = false;
    }
    // Otherwise let vertical scroll pass through
  }

  // ── Keyboard Handler ─────────────────────────────────────
  function onKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveByItem(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveByItem(1);
    }
  }

  // ── Move by Item ─────────────────────────────────────────
  function moveByItem(direction) {
    const items = track.querySelectorAll('.product-rail__item');
    if (!items.length) return;

    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(track).gap) || 32;
    targetX -= direction * itemWidth;

    const min = getMinX();
    targetX = Math.max(min, Math.min(0, targetX));
    isDecelerating = false;
  }

  // ── Snap to Nearest ──────────────────────────────────────
  function snapToNearest() {
    const items = track.querySelectorAll('.product-rail__item');
    if (!items.length) return;

    const gap = parseInt(getComputedStyle(track).gap) || 32;
    let closest = 0;
    let closestDist = Infinity;

    items.forEach((item, i) => {
      const itemX = -(item.offsetLeft - parseInt(getComputedStyle(track).paddingLeft));
      const dist = Math.abs(trackX - itemX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = itemX;
      }
    });

    const min = getMinX();
    targetX = Math.max(min, Math.min(0, closest));
  }

  // ── Lean ─────────────────────────────────────────────────
  function applyLean(deg) {
    const items = track.querySelectorAll('.product-rail__item-image');
    items.forEach(img => {
      if (deg === 0) {
        img.style.transform = '';
      } else {
        img.style.transform = `rotate(${deg}deg)`;
      }
    });
  }

  // ── Animation Loop ───────────────────────────────────────
  function animate() {
    if (isDecelerating && !isDragging) {
      velocity *= FRICTION;
      trackX += velocity * 16; // approximate frame time

      const min = getMinX();

      // Rubber-band bounce at edges
      if (trackX > RUBBER_BAND) {
        trackX = RUBBER_BAND;
        velocity = 0;
        isDecelerating = false;
        targetX = 0;
      } else if (trackX < min - RUBBER_BAND) {
        trackX = min - RUBBER_BAND;
        velocity = 0;
        isDecelerating = false;
        targetX = min;
      }

      if (Math.abs(velocity) < 0.003) {
        isDecelerating = false;
        velocity = 0;
        snapToNearest();
      }

      targetX = trackX;
    }

    // Smooth interpolation toward target
    if (!isDragging && !isDecelerating) {
      const diff = targetX - trackX;
      if (Math.abs(diff) > 0.5) {
        trackX += diff * 0.12;
      } else {
        trackX = targetX;
      }
    }

    track.style.transform = `translate3d(${trackX}px, 0, 0)`;

    animId = requestAnimationFrame(animate);
  }

  // ── Init on DOM ready ────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
