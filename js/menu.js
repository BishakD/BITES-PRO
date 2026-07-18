/* ============================================================
   BITES — Menu Controller
   Category filtering with crossfade, scroll reveals
   ============================================================ */

(function() {
  'use strict';

  const menuSection = document.querySelector('.menu-overview');
  if (!menuSection) return;

  const grid = menuSection.querySelector('.menu-overview__grid');
  const tabsContainer = menuSection.querySelector('.menu-overview__tabs');

  // ── Render Menu ──────────────────────────────────────────
  function renderMenu() {
    if (typeof BITES_MENU === 'undefined' || typeof BITES_CATEGORIES === 'undefined') return;

    // Render category tabs
    if (tabsContainer) {
      tabsContainer.innerHTML = BITES_CATEGORIES.map(cat => `
        <button 
          class="menu-overview__tab${cat.id === 'all' ? ' is-active' : ''}" 
          data-category="${cat.id}"
          aria-pressed="${cat.id === 'all'}"
        >
          ${cat.label}
        </button>
      `).join('');

      // Bind tab clicks
      tabsContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.menu-overview__tab');
        if (!tab) return;

        // Update active state
        tabsContainer.querySelectorAll('.menu-overview__tab').forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-pressed', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-pressed', 'true');

        filterMenu(tab.dataset.category);
      });
    }

    // Render menu rows
    if (grid) {
      grid.innerHTML = BITES_MENU.map(item => {
        const dietaryTags = (item.dietary || []).map(d => {
          if (d === 'veg') return '<span class="menu-overview__dietary-tag menu-overview__dietary-tag--veg">Veg</span>';
          if (d === 'spicy') return '<span class="menu-overview__dietary-tag menu-overview__dietary-tag--spicy">Spicy</span>';
          return '';
        }).join('');

        return `
          <div class="menu-overview__row" data-category="${item.category}">
            <img 
              class="menu-overview__thumb" 
              src="${item.image}" 
              alt="${item.alt}"
              width="64" 
              height="64"
              loading="lazy"
              onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22><rect fill=%22%23F3F0E3%22 width=%2264%22 height=%2264%22 rx=%228%22/><text x=%2232%22 y=%2238%22 text-anchor=%22middle%22 fill=%22%23064D3B%22 font-size=%2222%22>🍞</text></svg>'"
            >
            <div class="menu-overview__info">
              <h3 class="menu-overview__name">${item.name}</h3>
              <p class="menu-overview__desc">${item.desc}</p>
              ${dietaryTags ? '<div class="menu-overview__dietary">' + dietaryTags + '</div>' : ''}
            </div>
            <span class="menu-overview__price">${item.price}</span>
          </div>
        `;
      }).join('');
    }
  }

  // ── Filter ───────────────────────────────────────────────
  function filterMenu(category) {
    const rows = grid.querySelectorAll('.menu-overview__row');

    rows.forEach((row, i) => {
      const cat = row.dataset.category;
      const show = category === 'all' || cat === category;

      if (show) {
        row.classList.remove('is-hidden');
        row.style.transitionDelay = `${i * 30}ms`;
        // Re-trigger reveal
        requestAnimationFrame(() => {
          row.classList.add('is-visible');
        });
      } else {
        row.classList.add('is-hidden');
        row.classList.remove('is-visible');
      }
    });
  }

  // ── Scroll Reveal ────────────────────────────────────────
  function revealMenuRows() {
    const rows = grid.querySelectorAll('.menu-overview__row:not(.is-hidden)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      rows.forEach(row => row.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const row = entry.target;
          const index = Array.from(rows).indexOf(row);
          row.style.transitionDelay = `${index * 40}ms`;
          row.classList.add('is-visible');
          observer.unobserve(row);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-10% 0px'
    });

    rows.forEach(row => observer.observe(row));
  }

  // ── Init ─────────────────────────────────────────────────
  function init() {
    renderMenu();
    
    // Observe the section to trigger row reveals
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealMenuRows();
          sectionObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });

    sectionObserver.observe(menuSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
