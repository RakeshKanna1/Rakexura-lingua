import { SourceLanguage, TargetLanguage } from "./types";

export const SOURCE_LANGUAGES: SourceLanguage[] = [
  "AUTO DETECT",
  "HINGLISH",
  "ENGLISH",
  "TAMIL",
  "TELUGU",
  "MARATHI",
  "BENGALI",
  "PUNJABI",
];

export const TARGET_LANGUAGES: TargetLanguage[] = [
  "HINGLISH",
  "ENGLISH",
  "TAMIL",
  "TELUGU",
  "MARATHI",
  "BENGALI",
  "PUNJABI",
];

export const LANGUAGE_CODES: Record<string, string> = {
  "AUTO DETECT": "AUTO",
  HINGLISH: "HI-EN",
  ENGLISH: "EN",
  TAMIL: "TA",
  TELUGU: "TE",
  MARATHI: "MR",
  BENGALI: "BN",
  PUNJABI: "PA",
};
