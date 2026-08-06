export type OperationalEvent =
  | "translation_started"
  | "translation_completed"
  | "translation_failed"
  | "voice_permission_denied"
  | "upload_validation_failed";

export interface TelemetryPayload {
  event: OperationalEvent;
  requestId?: string;
  mode?: "text" | "voice" | "upload";
  processingTimeMs?: number;
  errorCode?: string;
}

export function logOperationalEvent(payload: TelemetryPayload) {
  if (typeof window === "undefined") return;

  // Anonymous operational log (strictly NO user text or audio metadata!)
  if (process.env.NODE_ENV === "development") {
    console.log(`[TELEMETRY] ${payload.event}`, {
      requestId: payload.requestId,
      mode: payload.mode,
      duration: payload.processingTimeMs,
      errorCode: payload.errorCode,
    });
  }
}
