import { TranslationRequest } from "./request";
import { TranslationResponse } from "./response";
import { APIError, TranslationErrorCode } from "./errors";
import { withTimeout } from "./timeouts";
import { withRetry } from "./retry";
import { isOnline } from "./network";

const HTTP_ERROR_MAP: Record<number, { code: TranslationErrorCode; message: string }> = {
  400: { code: "UNSUPPORTED_AUDIO", message: "Unsupported input or empty parameters." },
  413: { code: "UNSUPPORTED_AUDIO", message: "Audio file exceeds maximum allowed size limit of 25 MB." },
  415: { code: "UNSUPPORTED_AUDIO", message: "Unsupported audio format. Use MP3, WAV, M4A, WEBM, or OGG." },
  422: { code: "SERVER_ERROR", message: "Unable to interpret speech clearly. Please speak clearly and try again." },
  429: { code: "RATE_LIMIT", message: "Too many requests. Please wait a moment before trying again." },
  500: { code: "SERVER_ERROR", message: "Translation service unavailable. Please try again shortly." },
};

export class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  async translate(
    request: TranslationRequest,
    signal?: AbortSignal
  ): Promise<TranslationResponse> {
    if (!isOnline()) {
      throw new APIError("NETWORK", "You're offline. Please check your internet connection.");
    }

    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const fetchOperation = async (): Promise<TranslationResponse> => {
      let response: Response;

      // Real FastAPI endpoint routes if baseUrl provided, otherwise fallback Next.js route
      const isFastAPI = Boolean(this.baseUrl);
      const endpoint = isFastAPI
        ? request.mode === "text"
          ? `${this.baseUrl}/v1/translate/text`
          : `${this.baseUrl}/v1/translate/audio`
        : `${this.baseUrl}/api/translate`;

      if (request.mode === "text") {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-request-id": requestId,
          },
          body: JSON.stringify({
            requestId,
            mode: request.mode,
            sourceLanguage: request.sourceLanguage,
            targetLanguage: request.targetLanguage,
            text: request.text,
          }),
          signal,
        });
      } else {
        const formData = new FormData();
        formData.append("mode", request.mode);
        formData.append("sourceLanguage", request.sourceLanguage);
        formData.append("targetLanguage", request.targetLanguage);

        if (request.audioBlob) {
          formData.append("file", request.audioBlob, "recording.webm");
        } else if (request.audioFile) {
          formData.append("file", request.audioFile, request.audioFile.name);
        }

        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "x-request-id": requestId,
          },
          body: formData,
          signal,
        });
      }

      if (!response.ok) {
        const mapped = HTTP_ERROR_MAP[response.status] || {
          code: (response.status >= 500 ? "SERVER_ERROR" : "UNSUPPORTED_AUDIO") as TranslationErrorCode,
          message: "Translation service unavailable.",
        };
        throw new APIError(mapped.code, mapped.message);
      }

      const json = await response.json();
      if (!json.success || !json.data) {
        throw new APIError(
          (json.error?.code as TranslationErrorCode) || "SERVER_ERROR",
          json.error?.message || "Translation failed."
        );
      }

      return json.data as TranslationResponse;
    };

    // Selective retry logic: Only retry NETWORK, TIMEOUT, or 502/503/504
    const shouldRetry = (err: unknown): boolean => {
      if (err instanceof APIError) {
        return err.code === "NETWORK" || err.code === "TIMEOUT";
      }
      return false;
    };

    try {
      return await withRetry(
        () => withTimeout(fetchOperation(), 15000, "Connection timed out."),
        1,
        500,
        shouldRetry
      );
    } catch (err: unknown) {
      if (err instanceof APIError) throw err;
      const error = err as Error;
      if (error.name === "AbortError") {
        throw new APIError("TIMEOUT", "Translation request was cancelled.");
      }
      throw new APIError("SERVER_ERROR", error.message || "Translation service error.");
    }
  }
}

export const apiClient = new APIClient();
