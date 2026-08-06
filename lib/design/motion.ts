export const MOTION = {
  durations: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.8,
    cinematic: 1.2,
  },
  easings: {
    powerOut: "power2.out",
    powerInOut: "power3.inOut",
    customSmooth: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
} as const;
