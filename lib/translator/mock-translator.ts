import { TranslationRequest, TranslationResponse } from "./types";

export async function translateMock(request: TranslationRequest): Promise<TranslationResponse> {
  const startTime = Date.now();

  // Artificial short delay (~300ms)
  await new Promise((resolve) => setTimeout(resolve, 300));

  const processingTimeMs = Date.now() - startTime;

  if (request.mode === "text" && request.text) {
    const isHindi = /[\u0900-\u097f]/.test(request.text);
    const isHinglish = /\b(bhai|karo|bhejo|chahiye|kya|hai|kab|rha|hu)\b/i.test(request.text);
    const detected = isHindi ? "HINDI" : isHinglish ? "HINGLISH" : "ENGLISH";

    const mockTranslation = request.targetLanguage === "ENGLISH"
      ? `Bro, when will the order be delivered? I have already made the payment.`
      : `Bro, order kab tak deliver hoga? Payment ho gayi hai.`;

    return {
      detectedLanguage: `${detected} DETECTED`,
      sourceText: request.text,
      transcript: request.text,
      translation: mockTranslation,
      processingTimeMs,
      requestId: `req_${Date.now()}`,
    };
  }

  if (request.mode === "voice" || request.mode === "upload") {
    const mockTranscript = "Bhai order kab tak delivery hoga? Maine payment kar diya hai.";

    return {
      detectedLanguage: "HINGLISH AUDIO DETECTED",
      transcript: mockTranscript,
      sourceText: mockTranscript,
      translation: "Bro, when will the order be delivered? I have already made the payment.",
      processingTimeMs,
      requestId: `req_${Date.now()}`,
    };
  }

  return {
    detectedLanguage: "AUTO DETECTED",
    sourceText: "",
    translation: "No input provided.",
    processingTimeMs,
    requestId: `req_${Date.now()}`,
  };
}

