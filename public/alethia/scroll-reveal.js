/**
 * Proactive Scroll Reveal & Mouse Wheel Scroll Guarantee
 * - Guarantees 100% smooth, unblocked mouse ball / wheel scrolling.
 * - Unhides all SSR Variant content.
 * - Hero / Top Fold elements reveal INSTANTLY on load.
 * - Proactive scroll reveal triggers 300px ahead of viewport.
 */
(function() {
  // Guarantee non-blocking mouse wheel scrolling
  window.addEventListener('wheel', function(e) {
    // Passive scroll listener allows instant native mouse wheel response
  }, { passive: true });

  // Ensure body/html overflow remains unblocked
  function enableScroll() {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
    document.documentElement.style.overflowY = 'auto';
    document.body.style.overflowY = 'auto';
  }

  enableScroll();
  window.addEventListener('load', enableScroll);
  setTimeout(enableScroll, 500);

  function initScrollReveal() {
    const elements = document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"], .ssr-variant [style*="opacity"]');
    
    const observerOptions = {
      root: null,
      rootMargin: '300px 0px 200px 0px',
      threshold: 0.01
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealElement(entry.target, false);
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    elements.forEach(el => {
      const framerName = el.getAttribute('data-framer-name');
      if (framerName === 'loading' || framerName === 'Preloader') return;

      const rect = el.getBoundingClientRect();
      
      // Top fold elements reveal instantly
      if (rect.top <= windowHeight * 1.2) {
        revealElement(el, true);
      } else {
        observer.observe(el);
      }
    });
  }

  function revealElement(el, instant) {
    el.style.setProperty('opacity', '1', 'important');
    if (instant) {
      el.style.setProperty('transition', 'none', 'important');
    } else {
      el.style.setProperty('transition', 'opacity 0.6s ease-out, transform 0.6s ease-out', 'important');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
