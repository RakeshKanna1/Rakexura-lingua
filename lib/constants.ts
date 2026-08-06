import { CustomerIntent, OutputLanguage, ReplyLanguage, ReplyTone, SentimentCategory } from "./types";

export const SUPPORTED_OUTPUT_LANGUAGES: { name: OutputLanguage; code: string; flag: string }[] = [
  { name: "English", code: "en", flag: "🇬🇧" },
  { name: "Tamil", code: "ta", flag: "🇮🇳" },
  { name: "Telugu", code: "te", flag: "🇮🇳" },
  { name: "Malayalam", code: "ml", flag: "🇮🇳" },
  { name: "Kannada", code: "kn", flag: "🇮🇳" },
  { name: "Bengali", code: "bn", flag: "🇮🇳" },
  { name: "Marathi", code: "mr", flag: "🇮🇳" },
  { name: "Gujarati", code: "gu", flag: "🇮🇳" },
  { name: "Punjabi", code: "pa", flag: "🇮🇳" },
];

export const REPLY_LANGUAGES: ReplyLanguage[] = [
  "Hinglish",
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Bengali",
  "Marathi",
  "Gujarati",
  "Punjabi",
];

export const REPLY_TONES: { tone: ReplyTone; description: string }[] = [
  { tone: "Friendly", description: "Warm, polite, and reassuring tone" },
  { tone: "Professional", description: "Clear, formal business response" },
  { tone: "Slightly strict", description: "Firm on rules, screenshots, and payment proof" },
  { tone: "Short", description: "Concise 1-2 sentence response" },
  { tone: "Detailed", description: "Comprehensive step-by-step instructions" },
  { tone: "Polite", description: "Ultra respectful customer care style" },
  { tone: "Casual seller style", description: "Natural gaming seller WhatsApp style (Bhai/Bro)" },
];

export const INTENT_CATEGORIES: CustomerIntent[] = [
  "Asking for OTP",
  "Asking for login credentials",
  "Password issue",
  "Game not opening",
  "Download issue",
  "Installation issue",
  "Payment question",
  "Price negotiation",
  "Refund request",
  "Asking for availability",
  "Asking for setup help",
  "Account logged out",
  "Requesting a new code",
  "Reporting an error",
  "General question",
  "Unknown intent",
];

export const SENTIMENT_CATEGORIES: SentimentCategory[] = [
  "Calm",
  "Confused",
  "Urgent",
  "Angry",
  "Suspicious",
  "Happy",
  "Polite",
  "Frustrated",
  "Neutral",
];

export interface SampleMessage {
  label: string;
  original: string;
  category: CustomerIntent;
}

export const SAMPLE_MESSAGES: SampleMessage[] = [
  {
    label: "Game Downloaded / Won't Open",
    original: "Bhai game download ho gaya lekin open nahi ho raha",
    category: "Game not opening",
  },
  {
    label: "OTP Required / Logged Out",
    original: "Bhai otp chaiye galti se logout ho gaya",
    category: "Asking for OTP",
  },
  {
    label: "Code Error / Rockstar",
    original: "Bhai code accept nhi kr raha rockstar pe error de rha h",
    category: "Reporting an error",
  },
  {
    label: "Payment Done / Waiting",
    original: "Bhai QR pe payment kardo 499 rs aur screenshot bhej diya hai, login credentials bhej do",
    category: "Payment question",
  },
  {
    label: "Discount / Price Negotiation",
    original: "Bhai GTA 5 kitne me mil jayega? Thoda kam kardo 300 me dedo",
    category: "Price negotiation",
  },
  {
    label: "Account Credentials Request",
    original: "Bhai Steam account ka id pass abhi tak nahi aaya, jaldi dedo match khelna h",
    category: "Asking for login credentials",
  },
];
