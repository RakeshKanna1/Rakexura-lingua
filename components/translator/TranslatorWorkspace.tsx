"use client";

import {
  SourceLanguage,
  TargetLanguage,
} from "@/lib/translator/types";
import { useTranslatorState } from "@/hooks/useTranslatorState";
import { TranslatorModeTabs } from "@/components/translator/TranslatorModeTabs";
import { LanguageSelector } from "@/components/translator/LanguageSelector";
import { TextTranslationInput } from "@/components/translator/TextTranslationInput";
import { VoiceTranslationInput } from "@/components/translator/VoiceTranslationInput";
import { AudioUpload } from "@/components/translator/AudioUpload";
import { TranslationProcessingSequence } from "@/components/translator/TranslationProcessingSequence";
import { TranslationResult } from "@/components/translator/TranslationResult";
import { TranslatorErrorState } from "@/components/translator/TranslatorErrorState";
import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from "@/lib/translator/language-options";

export function TranslatorWorkspace() {
  const {
    mode,
    sourceLanguage,
    targetLanguage,
    sourceText,
    translation,
    transcript,
    detectedLanguage,
    status,
    error,
    history,
    setMode,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguages,
    setSourceText,
    setAudioBlob,
    setAudioFile,
    submit,
    cancel,
    reset,
    clearError,
  } = useTranslatorState();

  const isProcessing = status === "processing";
  const canSwap =
    sourceLanguage !== "AUTO DETECT" ||
    (sourceLanguage === "AUTO DETECT" && Boolean(detectedLanguage));

  const displaySourceLanguage =
    sourceLanguage === "AUTO DETECT" && detectedLanguage
      ? detectedLanguage.replace(" DETECTED", "")
      : sourceLanguage;

  return (
    <div>
      {/* Mode Controls */}
      <div>
        <TranslatorModeTabs activeMode={mode} onModeChange={setMode} />

        <div>
          <LanguageSelector
            label="SOURCE"
            value={displaySourceLanguage}
            options={SOURCE_LANGUAGES}
            onChange={(val) => {
              const cleanVal = val.split(" (")[0];
              setSourceLanguage(cleanVal as SourceLanguage);
            }}
            disabled={isProcessing}
          />

          <button
            type="button"
            onClick={swapLanguages}
            disabled={!canSwap || isProcessing}
          >
            Swap
          </button>

          <LanguageSelector
            label="TARGET"
            value={targetLanguage}
            options={TARGET_LANGUAGES}
            onChange={(val) => setTargetLanguage(val as TargetLanguage)}
            disabled={isProcessing}
          />
        </div>
      </div>

      {/* Main Workspace Area */}
      <div>
        <div>
          {mode === "text" && (
            <TextTranslationInput
              value={sourceText}
              onChange={setSourceText}
              onSubmit={submit}
              isLoading={isProcessing}
              detectedLanguage={detectedLanguage}
            />
          )}

          {mode === "voice" && (
            <VoiceTranslationInput
              onRecordingComplete={setAudioBlob}
              onReset={reset}
              onSubmitTranslation={submit}
              isLoading={isProcessing}
            />
          )}

          {mode === "upload" && (
            <AudioUpload
              onFileSelect={setAudioFile}
              onFileRemove={reset}
              onSubmitTranslation={submit}
              isLoading={isProcessing}
            />
          )}
        </div>

        <div>
          {error && (
            <TranslatorErrorState error={error} onRetry={clearError} />
          )}

          {isProcessing && (
            <TranslationProcessingSequence
              mode={mode}
              onCancel={cancel}
            />
          )}

          {status === "success" && translation && (
            <TranslationResult
              translation={translation}
              transcript={transcript}
              detectedLanguage={detectedLanguage}
              onReset={reset}
            />
          )}

          {status !== "processing" && status !== "success" && !error && (
            <div>
              <p>Decoded Meaning &amp; Seller Reply Output Standby</p>
            </div>
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <h3>Recent Sessions</h3>
          <div>
            {history.slice(0, 2).map((item) => (
              <div key={item.requestId}>
                <strong>{item.detectedLanguage}</strong>
                <p>&ldquo;{item.translation}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
