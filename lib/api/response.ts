export interface TranslationResponse {
  detectedLanguage: string;
  transcript?: string;
  translation: string;
  sourceText?: string;
  processingTimeMs: number;
  requestId: string;
}

export interface APIResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  success: boolean;
}
