export const MotionPresets = {
  durations: {
    micro: 0.15,
    fast: 0.3,
    medium: 0.6,
    slow: 0.9,
    cinematic: 1.2,
  },
  easings: {
    expoOut: "expo.out",
    power3Out: "power3.out",
    power4Out: "power4.out",
    circOut: "circ.out",
    studioSmooth: "cubic-bezier(0.25, 1, 0.5, 1)",
  },
  stagger: {
    fast: 0.04,
    normal: 0.08,
    slow: 0.15,
  },
  fadeUp: {
    opacity: 0,
    y: 35,
    duration: 0.8,
    ease: "power3.out",
  },
  clipRevealUp: {
    clipPath: "inset(100% 0% 0% 0%)",
    duration: 1.0,
    ease: "power4.out",
  },
  maskRevealUp: {
    y: "100%",
    duration: 0.9,
    ease: "power3.out",
  },
} as const;
