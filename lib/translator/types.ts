export type TranslatorMode = "text" | "voice" | "upload";

export type SourceLanguage =
  | "AUTO DETECT"
  | "HINGLISH"
  | "ENGLISH"
  | "TAMIL"
  | "TELUGU"
  | "MARATHI"
  | "BENGALI"
  | "PUNJABI";

export type TargetLanguage =
  | "HINGLISH"
  | "ENGLISH"
  | "TAMIL"
  | "TELUGU"
  | "MARATHI"
  | "BENGALI"
  | "PUNJABI";

export type TranslatorStatus =
  | "idle"
  | "recording"
  | "recorded"
  | "processing"
  | "success"
  | "error";

export type AudioRecordingState =
  | "idle"
  | "requesting_permission"
  | "recording"
  | "paused"
  | "recorded"
  | "processing"
  | "error";

export interface TranslationRequest {
  mode: TranslatorMode;
  sourceLanguage: SourceLanguage;
  targetLanguage: TargetLanguage;
  text?: string;
  audioFile?: File;
  audioBlob?: Blob;
}

export interface TranslationResponse {
  detectedLanguage: string;
  transcript?: string;
  translation: string;
  sourceText?: string;
  processingTimeMs: number;
  requestId: string;
}

export interface TranslatorError {
  code: string;
  message: string;
  actionHint: string;
}
