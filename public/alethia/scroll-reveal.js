/**
 * Smooth Scroll Reveal Script for Alethia Static Export
 * Automatically detects elements with initial opacity: 0 and smoothly fades them in
 * as they enter the viewport during mouse wheel or touch scrolling.
 */
(function() {
  function initScrollReveal() {
    // Select all elements with opacity 0 (except loading/preloader)
    const elements = document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]');
    
    const observerOptions = {
      root: null,
      rootMargin: '50px 0px -50px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Skip preloader
          const framerName = el.getAttribute('data-framer-name');
          if (framerName === 'loading' || framerName === 'Preloader') return;

          // Apply smooth fade-in
          el.style.setProperty('opacity', '1', 'important');
          el.style.setProperty('transition', 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)', 'important');
          
          // Remove transform scale / offsets if present
          if (el.style.transform && el.style.transform.includes('scale')) {
            el.style.transform = 'none';
          }
          
          // Stop observing once revealed
          obs.unobserve(el);
        }
      });
    }, observerOptions);

    elements.forEach(el => {
      const framerName = el.getAttribute('data-framer-name');
      if (framerName !== 'loading' && framerName !== 'Preloader') {
        observer.observe(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
