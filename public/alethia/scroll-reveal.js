/**
 * High-End Scroll Reveal Animation Engine
 * - Smoothly fades in and slides up headings, paragraphs, and cards as you scroll down.
 */
(function() {
  function initScrollFadeAnimations() {
    // Select all text containers, headings, paragraphs, and section cards
    const selector = [
      '[data-framer-component-type="RichTextContainer"]',
      'p.framer-text',
      'h1', 'h2', 'h3', 'h4', 'h5',
      '[data-framer-name*="Section"]',
      '[data-framer-name*="Card"]',
      '[data-framer-name*="Block"]',
      '.framer-1ogqu74',
      '.framer-m2q0bb',
      '.framer-1tsm48c'
    ].join(',');

    const elements = document.querySelectorAll(selector);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('transform', 'translate3d(0, 0, 0)', 'important');
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    elements.forEach(el => {
      const framerName = el.getAttribute('data-framer-name');
      if (framerName === 'Title' || framerName === 'Light Home' || framerName === 'loading') return;

      const rect = el.getBoundingClientRect();

      // Top fold elements stay visible; below-the-fold elements prepare for smooth fade-in
      if (rect.top > windowHeight * 0.75) {
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('transform', 'translate3d(0, 40px, 0)', 'important');
        el.style.setProperty('transition', 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)', 'important');
        el.style.setProperty('will-change', 'opacity, transform', 'important');
        observer.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollFadeAnimations);
  } else {
    initScrollFadeAnimations();
  }
})();
