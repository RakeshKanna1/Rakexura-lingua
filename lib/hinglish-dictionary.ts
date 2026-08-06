// Hinglish word mappings for normalization and spelling correction

export const HINGLISH_DICTIONARY: Record<string, string> = {
  // Common informal request variations
  chaiye: "chahiye",
  chye: "chahiye",
  chahie: "chahiye",
  mangta: "chahiye",

  // Action verbs
  krna: "karna",
  kro: "karo",
  kardo: "kar do",
  krdo: "kar do",
  kr: "kar",
  krdia: "kar diya",
  kardiya: "kar diya",
  bhej: "bhejo",
  bhejdia: "bhej diya",
  bhejdo: "bhej do",
  bhejo: "bhejo",
  bhejoge: "bhejoge",

  // Negations
  nhi: "nahi",
  nh: "nahi",
  ni: "nahi",

  // Auxiliaries
  h: "hai",
  hy: "hai",
  hina: "hai na",
  hogya: "ho gaya",
  hogaya: "ho gaya",
  hoga: "ho gaya",
  rha: "raha",
  raha: "raha",
  rhi: "rahi",

  // Pronouns
  mereko: "mujhe",
  merko: "mujhe",
  mjhe: "mujhe",
  terko: "tujhe",
  trko: "tujhe",
  ap: "aap",

  // Salutations / Address
  bhai: "bhai",
  bro: "bhai",
  bhaya: "bhai",
  veere: "bhai",

  // Gaming / Account specifics
  pass: "password",
  id: "credentials / ID",
  acc: "account",
  ss: "screenshot",
  screnshot: "screenshot",
  otpp: "OTP",
  login: "login",
  downlod: "download",
  opn: "open",

  // Quantifiers / Price
  kitna: "kitne",
  kitne: "kitne",
  kam: "kam",
  dikhado: "dikha do",
};

/**
 * Clean Hinglish text into standard Hinglish format
 */
export function normalizeHinglishText(text: string): string {
  if (!text) return "";
  
  let cleaned = text.trim();
  
  // Replace multiple spaces
  cleaned = cleaned.replace(/\s+/g, " ");

  // Word token replacement
  const words = cleaned.split(" ");
  const normalizedWords = words.map((w) => {
    const lower = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (HINGLISH_DICTIONARY[lower]) {
      // Retain capitalization pattern if possible
      return HINGLISH_DICTIONARY[lower];
    }
    return w;
  });

  return normalizedWords.join(" ");
}
