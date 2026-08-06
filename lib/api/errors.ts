export type TranslationErrorCode =
  | "NETWORK"
  | "TIMEOUT"
  | "RATE_LIMIT"
  | "UNSUPPORTED_AUDIO"
  | "SERVER_ERROR";

export interface TranslationError {
  code: TranslationErrorCode;
  message: string;
  details?: unknown;
}

export class APIError extends Error {
  code: TranslationErrorCode;
  details?: unknown;

  constructor(code: TranslationErrorCode, message: string, details?: unknown) {
    super(message);
    this.name = "APIError";
    this.code = code;
    this.details = details;
  }
}
