/* ============================================================
   BITES — Product Page Dynamic Controller
   Populates details on product.html standalone views
   ============================================================ */

(function() {
  'use strict';

  // Elements
  const image = document.getElementById('product-page-image');
  const category = document.getElementById('product-page-category');
  const title = document.getElementById('product-page-title');
  const price = document.getElementById('product-page-price');
  const desc = document.getElementById('product-page-desc');
  const made = document.getElementById('product-page-made');

  function init() {
    // Check product ID in URL query parameters
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');

    if (!productId) {
      // Redirect to index if no product specified
      window.location.href = 'index.html';
      return;
    }

    // Match product in array
    if (typeof BITES_PRODUCTS === 'undefined') {
      console.error('BITES_PRODUCTS is not loaded.');
      return;
    }

    const product = BITES_PRODUCTS.find(p => p.id === productId);

    if (!product) {
      // Redirect if invalid product ID
      window.location.href = 'index.html';
      return;
    }

    // Store current product ID in sessionStorage for browser back button scroll/highlight restoration
    sessionStorage.setItem('lastViewedProduct', product.id);

    // Populate data
    document.title = `${product.name} — Bites`;
    
    // Set meta description dynamically
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${product.name}: ${product.desc}. Crafting method: ${product.made}`);
    }

    if (image) {
      image.src = product.image;
      image.alt = product.alt || product.name;
    }

    if (category) {
      category.textContent = product.category || 'Fresh Special';
    }

    if (title) {
      title.textContent = product.name;
    }

    if (price) {
      price.textContent = product.price || '';
    }

    if (desc) {
      desc.textContent = product.desc || '';
    }

    if (made) {
      made.textContent = product.made || 'Handcrafted daily using traditional baking recipes and premium local ingredients.';
    }

    const backBtn = document.querySelector('.product-page__back-btn');
    if (backBtn) {
      backBtn.href = `index.html?backFrom=${product.id}#menu-section`;
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
