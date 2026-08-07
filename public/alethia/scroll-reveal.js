/**
 * Scroll Fade-In & Fade-Out Animation Engine
 * - Text, headings, and cards fade in as they enter the viewport.
 * - Text and section headings smoothly fade out as they scroll past the top of the viewport.
 */
(function() {
  function initScrollFadeEngine() {
    const selector = [
      '[data-framer-name="Title"]',
      '[data-framer-name="Bottom"]',
      '[data-framer-component-type="RichTextContainer"]',
      'p.framer-text',
      'h1', 'h2', 'h3', 'h4', 'h5',
      '.framer-1ogqu74',
      '.framer-m2q0bb',
      '.framer-1tsm48c'
    ].join(',');

    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    function updateFadeOutOnScroll() {
      const sy = window.scrollY || window.pageYOffset || 0;

      elements.forEach(el => {
        const framerName = el.getAttribute('data-framer-name');
        if (framerName === 'loading' || framerName === 'Preloader') return;

        const rect = el.getBoundingClientRect();
        
        // Element is near top of viewport scrolling out -> Fade Out smoothly
        if (rect.top < windowHeight * 0.25) {
          const fadeOutFactor = Math.max(0, Math.min(1, rect.bottom / (windowHeight * 0.35)));
          el.style.opacity = fadeOutFactor.toFixed(3);
          el.style.transition = 'opacity 0.25s ease-out';
        } else if (rect.top <= windowHeight * 0.85) {
          // Element is fully in view -> Opacity 1
          el.style.opacity = '1';
          el.style.transition = 'opacity 0.4s ease-out';
        } else {
          // Below viewport -> Fade out
          el.style.opacity = '0';
          el.style.transition = 'opacity 0.4s ease-out';
        }
      });
    }

    window.addEventListener('scroll', updateFadeOutOnScroll, { passive: true });
    updateFadeOutOnScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollFadeEngine);
  } else {
    initScrollFadeEngine();
  }
})();
