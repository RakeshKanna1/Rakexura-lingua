"use client";

import React, { useEffect, useState } from "react";

export default function AlethiaClient({ htmlContent }: { htmlContent: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Reveal elements exported with inline opacity: 0
    const hiddenElements = document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]');
    hiddenElements.forEach((el) => {
      if (el instanceof HTMLElement && !el.getAttribute('data-framer-name')?.includes('Preloader')) {
        el.style.opacity = '1';
      }
    });

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animatableElements = document.querySelectorAll('[data-framer-appear-id], [data-framer-name]');
    animatableElements.forEach((el: Element) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#060b07] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#c6f19d]/30 border-t-[#c6f19d] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
