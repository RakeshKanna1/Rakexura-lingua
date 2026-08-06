import { gsap, ScrollTrigger } from "../gsap";

export function fadeReveal(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars
): gsap.core.Tween {
  return gsap.from(target, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: scrollTriggerVars
      ? { trigger: target as string | Element, start: "top 85%", ...scrollTriggerVars }
      : undefined,
    ...vars,
  });
}

export function clipReveal(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { clipPath: "inset(100% 0% 0% 0%)" },
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1,
      ease: "power4.out",
      scrollTrigger: scrollTriggerVars
        ? { trigger: target as string | Element, start: "top 85%", ...scrollTriggerVars }
        : undefined,
      ...vars,
    }
  );
}

export function staggerLines(
  targets: gsap.TweenTarget,
  vars?: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars
): gsap.core.Tween {
  return gsap.from(targets, {
    opacity: 0,
    y: 40,
    stagger: 0.1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: scrollTriggerVars
      ? { trigger: targets as string | Element, start: "top 85%", ...scrollTriggerVars }
      : undefined,
    ...vars,
  });
}

export function maskReveal(
  target: gsap.TweenTarget,
  vars?: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars
): gsap.core.Tween {
  return gsap.fromTo(
    target,
    { y: "100%" },
    {
      y: "0%",
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: scrollTriggerVars
        ? { trigger: target as string | Element, start: "top 85%", ...scrollTriggerVars }
        : undefined,
      ...vars,
    }
  );
}

export function parallax(
  target: gsap.TweenTarget,
  speed: number = 0.2,
  trigger?: gsap.DOMTarget
): gsap.core.Tween {
  const el = (trigger || target) as Element;
  return gsap.to(target, {
    y: () => -100 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function horizontalScroll(
  container: gsap.DOMTarget,
  wrapper: gsap.DOMTarget
): gsap.core.Tween {
  const wrapperEl = (typeof wrapper === "string" ? document.querySelector(wrapper) : wrapper) as HTMLElement;
  return gsap.to(wrapper, {
    x: () => -(wrapperEl.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container as Element,
      pin: true,
      scrub: 1,
      end: () => "+=" + wrapperEl.scrollWidth,
    },
  });
}
