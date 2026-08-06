export interface TranslationRequest {
  mode: "text" | "voice" | "upload";
  sourceLanguage: string;
  targetLanguage: string;
  text?: string;
  audioFile?: File;
  audioBlob?: Blob;
}
