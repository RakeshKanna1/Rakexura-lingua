export const AnimationTokens = {
  durations: {
    micro: 0.15,
    quick: 0.3,
    standard: 0.6,
    dramatic: 1.2,
  },
  easing: {
    expoOut: "expo.out",
    circOut: "circ.out",
    backOut: "back.out(1.7)",
    studioSmooth: "cubic-bezier(0.25, 1, 0.5, 1)",
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
  clipPath: {
    insetHidden: "inset(100% 0% 0% 0%)",
    insetVisible: "inset(0% 0% 0% 0%)",
    circleHidden: "circle(0% at 50% 50%)",
    circleVisible: "circle(100% at 50% 50%)",
  },
  parallax: {
    subtle: 0.1,
    medium: 0.25,
    strong: 0.5,
  },
} as const;
