export interface SplitTextResult {
  words: string[];
  chars: string[][];
}

/**
 * Utility function to split text string into lines/words/chars
 * for GSAP typography animations.
 */
export function splitText(text: string): SplitTextResult {
  const words = text.split(" ").filter((w) => w.length > 0);
  const chars = words.map((w) => w.split(""));
  return { words, chars };
}

export function splitWords(text: string): string[] {
  return text.split(" ").filter((w) => w.length > 0);
}

export function splitChars(text: string): string[] {
  return text.split("");
}
