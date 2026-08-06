"use client";

import { AudioRecorder } from "@/components/translator/AudioRecorder";

interface VoiceTranslationInputProps {
  onRecordingComplete: (blob: Blob) => void;
  onReset: () => void;
  onSubmitTranslation: () => void;
  isLoading?: boolean;
  className?: string;
}

export function VoiceTranslationInput({
  onRecordingComplete,
  onReset,
  onSubmitTranslation,
  isLoading = false,
  className = "",
}: VoiceTranslationInputProps) {
  return (
    <div className={`w-full flex flex-col space-y-3 font-sans ${className}`}>
      <div className="flex items-center justify-between text-xs text-[#575757] font-semibold tracking-wider uppercase select-none px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#e6fb2d] border border-[#2d2d2d] animate-pulse" />
          <span>VOICE INGESTION</span>
        </div>
        <span className="font-mono text-[11px] text-[#575757]">BROWSER MEDIARECORDER</span>
      </div>

      <div className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-[1.75rem] p-6 shadow-sm">
        <AudioRecorder
          onRecordingComplete={onRecordingComplete}
          onReset={onReset}
          onSubmitTranslation={onSubmitTranslation}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

