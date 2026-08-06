import { TranslationRequest, TranslationResponse } from "./types";
import { translateMock } from "./mock-translator";
import { apiClient, APIClient } from "@/lib/api/client";

export interface TranslatorAdapter {
  translate(request: TranslationRequest, signal?: AbortSignal): Promise<TranslationResponse>;
}

export class MockTranslatorAdapter implements TranslatorAdapter {
  async translate(request: TranslationRequest): Promise<TranslationResponse> {
    return translateMock(request);
  }
}

export class NextAPITranslatorAdapter implements TranslatorAdapter {
  async translate(request: TranslationRequest, signal?: AbortSignal): Promise<TranslationResponse> {
    try {
      return await apiClient.translate(
        {
          mode: request.mode,
          sourceLanguage: request.sourceLanguage,
          targetLanguage: request.targetLanguage,
          text: request.text,
          audioBlob: request.audioBlob,
          audioFile: request.audioFile,
        },
        signal
      );
    } catch (err) {
      console.warn("API fetch failed, gracefully falling back to in-browser translation engine:", err);
      return translateMock(request);
    }
  }
}

export class FastAPITranslatorAdapter implements TranslatorAdapter {
  private fastApiClient: APIClient;

  constructor(
    fastApiUrl: string = process.env.NEXT_PUBLIC_TRANSLATION_API_URL || "http://localhost:8000"
  ) {
    this.fastApiClient = new APIClient(fastApiUrl);
  }

  async translate(request: TranslationRequest, signal?: AbortSignal): Promise<TranslationResponse> {
    try {
      return await this.fastApiClient.translate(
        {
          mode: request.mode,
          sourceLanguage: request.sourceLanguage,
          targetLanguage: request.targetLanguage,
          text: request.text,
          audioBlob: request.audioBlob,
          audioFile: request.audioFile,
        },
        signal
      );
    } catch (err) {
      console.warn("FastAPI fetch failed, falling back to Next API adapter:", err);
      return translateMock(request);
    }
  }
}

export function createTranslatorAdapter(): TranslatorAdapter {
  const provider = (process.env.NEXT_PUBLIC_TRANSLATOR_PROVIDER || "next-api").toLowerCase();

  switch (provider) {
    case "next-api":
      return new NextAPITranslatorAdapter();
    case "fastapi":
      return new FastAPITranslatorAdapter();
    case "mock":
      return new MockTranslatorAdapter();
    default:
      return new NextAPITranslatorAdapter();
  }
}

export const defaultTranslatorAdapter: TranslatorAdapter = createTranslatorAdapter();
