// Adaptive Memory & Fluency Correction Engine for LINGUA

export interface MemoryPair {
  sourceText: string;
  userPreferredOutput: string;
  targetLang: string;
  timestamp: number;
}

const MEMORY_STORAGE_KEY = "lingua_learned_translation_memory";

// Typo & Fluency Auto-Corrector for English, Hinglish, Tanglish, Tenglish
export function correctFluencyAndGrammar(text: string): { corrected: string; correctionsApplied: boolean } {
  if (!text || !text.trim()) return { corrected: text, correctionsApplied: false };

  let s = text.trim();
  const original = s;

  const typoMap: [RegExp, string][] = [
    // Common English Typos & Fluency
    [/\b(donld|dwnload|downlod|donload)\b/gi, "download"],
    [/\b(opn|opning|opennig)\b/gi, "open"],
    [/\b(prblem|probem|problm)\b/gi, "problem"],
    [/\b(isnt|isnt|isnt|isnot)\b/gi, "is not"],
    [/\b(dont|dont)\b/gi, "don't"],
    [/\b(wont|wont)\b/gi, "won't"],
    [/\b(cant|cant)\b/gi, "can't"],
    [/\b(pls|plz|pleese)\b/gi, "please"],
    [/\b(thx|thanku|thnk|thanks)\b/gi, "thanks"],
    [/\b(scenshot|scratshot|sreen shot|screnshot)\b/gi, "screenshot"],
    [/\b(paymnt|pemnt|payemnt)\b/gi, "payment"],
    [/\b(accnt|acount|acounts)\b/gi, "account"],
    [/\b(passwrd|passwrd|passowrd)\b/gi, "password"],
    [/\b(delivry|delvery|delivary)\b/gi, "delivery"],

    // Common Hinglish / Tanglish Typos
    [/\b(nhi|ni|nh)\b/gi, "nahi"],
    [/\b(chye|chaiye|chaye)\b/gi, "chahiye"],
    [/\b(bhaiya|bhaii|bhia)\b/gi, "bhai"],
    [/\b(galat|glat)\b/gi, "galat"],
    [/\b(aagla|aagala|aaglla)\b/gi, "aagala"],
    [/\b(irukiga|irukinga|irukenga)\b/gi, "irukinga"],
    [/\b(epdi|epadi)\b/gi, "epdi"],
    [/\b(vanakam|vanakam)\b/gi, "vanakkam"],
  ];

  typoMap.forEach(([regex, replacement]) => {
    s = s.replace(regex, replacement);
  });

  // Basic Grammar Touch-Up (Capitalize sentence start, fix double spaces)
  s = s.replace(/\s+/g, " ");
  s = s.charAt(0).toUpperCase() + s.slice(1);

  return {
    corrected: s,
    correctionsApplied: s.toLowerCase() !== original.toLowerCase(),
  };
}

// Memory Store Management
export function getLearnedMemory(): MemoryPair[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MEMORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveLearnedMemory(sourceText: string, userPreferredOutput: string, targetLang: string) {
  if (typeof window === "undefined" || !sourceText.trim() || !userPreferredOutput.trim()) return;
  try {
    const memory = getLearnedMemory();
    const newEntry: MemoryPair = {
      sourceText: sourceText.trim().toLowerCase(),
      userPreferredOutput: userPreferredOutput.trim(),
      targetLang: targetLang.toUpperCase(),
      timestamp: Date.now(),
    };
    const filtered = memory.filter((m) => m.sourceText !== newEntry.sourceText || m.targetLang !== newEntry.targetLang);
    const updated = [newEntry, ...filtered.slice(0, 49)];
    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save learned memory:", e);
  }
}

export function findLearnedMemory(sourceText: string, targetLang: string): string | null {
  const memory = getLearnedMemory();
  const lowerSource = sourceText.trim().toLowerCase();
  const targetUpper = targetLang.toUpperCase();

  const match = memory.find(
    (m) => m.sourceText === lowerSource && (m.targetLang === targetUpper || m.targetLang.includes(targetUpper))
  );

  return match ? match.userPreferredOutput : null;
}
