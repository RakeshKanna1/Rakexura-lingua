export const DEFAULT_SCROLL = {
  scrub: 1,
  start: "top bottom",
  end: "bottom top",
} as const;

export const REVEAL_SCROLL = {
  trigger: undefined,
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play none none reverse",
  scrub: false,
} as const;
