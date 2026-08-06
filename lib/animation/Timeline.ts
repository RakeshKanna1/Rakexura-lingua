import { gsap } from "../gsap";

export function createTimeline(config?: gsap.TimelineVars): gsap.core.Timeline {
  return gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
    ...config,
  });
}
