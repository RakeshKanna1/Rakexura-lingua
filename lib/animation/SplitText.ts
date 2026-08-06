export function splitTextIntoWords(text: string): string[] {
  return text.split(" ").filter((word) => word.length > 0);
}

export function splitTextIntoChars(text: string): string[] {
  return text.split("");
}
