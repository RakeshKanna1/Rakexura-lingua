"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  TranslatorMode,
  SourceLanguage,
  TargetLanguage,
  TranslatorStatus,
  TranslatorError,
  TranslationResponse,
} from "@/lib/translator/types";
import { defaultTranslatorAdapter } from "@/lib/translator/translator-adapter";
import { logOperationalEvent } from "@/lib/telemetry/analytics";

function detectLanguage(text: string): string {
  const lower = text.toLowerCase();
  if (/[\u0900-\u097f]/.test(lower)) return "Hindi";
  if (/\b(bhai|karo|bhejo|chahiye|kya|hai|kab|rha|hu|hai)\b/i.test(lower)) return "Hinglish";
  return "English";
}

export function useTranslatorState() {
  const [mode, setMode] = useState<TranslatorMode>("text");
  const [sourceLanguage, setSourceLanguage] = useState<SourceLanguage>("AUTO DETECT");
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage>("HINGLISH");

  const [sourceText, setSourceText] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const [transcript, setTranscript] = useState<string | undefined>(undefined);
  const [translation, setTranslation] = useState<string | undefined>(undefined);
  const [detectedLanguage, setDetectedLanguage] = useState<string | undefined>(undefined);

  const [status, setStatus] = useState<TranslatorStatus>("idle");
  const [error, setError] = useState<TranslatorError | null>(null);
  const [history, setHistory] = useState<TranslationResponse[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSetMode = useCallback((newMode: TranslatorMode) => {
    setMode(newMode);
    setError(null);
  }, []);

  const handleSetSourceLanguage = useCallback((lang: SourceLanguage) => {
    setSourceLanguage(lang);
  }, []);

  const handleSetTargetLanguage = useCallback((lang: TargetLanguage) => {
    setTargetLanguage(lang);
  }, []);

  const swapLanguages = useCallback(() => {
    const effectiveSource =
      sourceLanguage === "AUTO DETECT" && detectedLanguage
        ? (detectedLanguage.replace(" DETECTED", "").trim() as SourceLanguage)
        : sourceLanguage;

    if (effectiveSource === "AUTO DETECT") return;

    const prevSource = effectiveSource;
    const prevTarget = targetLanguage;

    setSourceLanguage(prevTarget as SourceLanguage);
    setTargetLanguage(prevSource as TargetLanguage);

    // Swap Text & Translation Content
    if (translation && translation.trim()) {
      const prevInputText = sourceText;
      const prevTranslationText = translation;

      setSourceText(prevTranslationText);
      setTranslation(prevInputText);
    }
  }, [sourceLanguage, targetLanguage, detectedLanguage, translation, sourceText]);

  const handleSetSourceText = useCallback((text: string) => {
    setSourceText(text);
    if (error && text.trim()) setError(null);

    if (sourceLanguage === "AUTO DETECT") {
      if (text.trim().length >= 2) {
        const liveDetected = detectLanguage(text);
        setDetectedLanguage(liveDetected);
      } else {
        setDetectedLanguage(undefined);
      }
    }
  }, [error, sourceLanguage]);

  const handleSetAudioBlob = useCallback((blob: Blob | null) => {
    setAudioBlob(blob);
    if (blob) setStatus("recorded");
  }, []);

  const handleSetAudioFile = useCallback((file: File | null) => {
    setAudioFile(file);
    if (file) setStatus("recorded");
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setStatus("idle");
  }, []);

  const submit = useCallback(async () => {
    if (mode === "text" && !sourceText.trim()) {
      setError({
        code: "EMPTY_INPUT",
        message: "INPUT TEXT IS EMPTY",
        actionHint: "Please type or paste text before translating.",
      });
      setStatus("error");
      return;
    }

    if (mode === "voice" && !audioBlob) {
      setError({
        code: "NO_AUDIO",
        message: "NO AUDIO RECORDED",
        actionHint: "Please record your voice note before translating.",
      });
      setStatus("error");
      return;
    }

    if (mode === "upload" && !audioFile) {
      setError({
        code: "NO_FILE",
        message: "NO FILE SELECTED",
        actionHint: "Please select or drop an audio file before translating.",
      });
      setStatus("error");
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setStatus("processing");
    setError(null);

    logOperationalEvent({
      event: "translation_started",
      mode,
    });

    try {
      const response: TranslationResponse = await defaultTranslatorAdapter.translate(
        {
          mode,
          sourceLanguage,
          targetLanguage,
          text: sourceText,
          audioBlob: audioBlob || undefined,
          audioFile: audioFile || undefined,
        },
        abortControllerRef.current.signal
      );

      setDetectedLanguage(response.detectedLanguage);
      setTranscript(response.transcript);
      setTranslation(response.translation);
      setHistory((prev) => [response, ...prev.slice(0, 4)]);
      setStatus("success");

      logOperationalEvent({
        event: "translation_completed",
        mode,
        requestId: response.requestId,
        processingTimeMs: response.processingTimeMs,
      });
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };

      logOperationalEvent({
        event: "translation_failed",
        mode,
        errorCode: errorObj.code || "UNKNOWN",
      });

      setError({
        code: errorObj.code || "PROCESSING_FAILED",
        message: errorObj.message || "TRANSLATION FAILED",
        actionHint: "An unexpected error occurred during translation. Please try again.",
      });
      setStatus("error");
    } finally {
      abortControllerRef.current = null;
    }
  }, [mode, sourceText, audioBlob, audioFile, sourceLanguage, targetLanguage]);

  const reset = useCallback(() => {
    cancel();
    setStatus("idle");
    setError(null);
    setSourceText("");
    setTranscript(undefined);
    setTranslation(undefined);
    setDetectedLanguage(undefined);
    setAudioBlob(null);
    setAudioFile(null);
  }, [cancel]);

  const clearError = useCallback(() => {
    setError(null);
    if (status === "error") setStatus("idle");
  }, [status]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    mode,
    sourceLanguage,
    targetLanguage,
    sourceText,
    audioBlob,
    audioFile,
    transcript,
    translation,
    detectedLanguage,
    status,
    error,
    history,
    setMode: handleSetMode,
    setSourceLanguage: handleSetSourceLanguage,
    setTargetLanguage: handleSetTargetLanguage,
    swapLanguages,
    setSourceText: handleSetSourceText,
    setAudioBlob: handleSetAudioBlob,
    setAudioFile: handleSetAudioFile,
    submit,
    cancel,
    reset,
    clearError,
  };
}
