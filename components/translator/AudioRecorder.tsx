"use client";

import { useEffect } from "react";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { RecordingTimer } from "@/components/translator/RecordingTimer";
import { RecordingWaveform } from "@/components/translator/RecordingWaveform";
import { Mic, Pause, Play, Square, Trash2, ArrowRight } from "lucide-react";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  onReset: () => void;
  onSubmitTranslation: () => void;
  isLoading?: boolean;
  className?: string;
}

export function AudioRecorder({
  onRecordingComplete,
  onReset,
  onSubmitTranslation,
  isLoading = false,
  className = "",
}: AudioRecorderProps) {
  const {
    recordingState,
    duration,
    audioBlob,
    analyserNode,
    errorMessage,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const { isPlaying, togglePlay, loadAudio, unload } = useAudioPlayback();

  useEffect(() => {
    if (recordingState === "recorded" && audioBlob) {
      onRecordingComplete(audioBlob);
      loadAudio(audioBlob);
    }
  }, [recordingState, audioBlob, onRecordingComplete, loadAudio]);

  const handleReset = () => {
    unload();
    resetRecording();
    onReset();
  };

  return (
    <div className={`w-full flex flex-col space-y-4 font-mono ${className}`}>
      {/* Waveform Display */}
      <RecordingWaveform
        analyserNode={analyserNode}
        isRecording={recordingState === "recording"}
      />

      {/* Timer & State Bar */}
      <div className="flex items-center justify-between text-xs text-[#575757] border-b border-[#e5e5e5] pb-3">
        <RecordingTimer
          duration={duration}
          isRecording={recordingState === "recording"}
        />

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#000000]">
          STATE: {recordingState.replace("_", " ")}
        </span>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 font-sans">
          {errorMessage}
        </div>
      )}

      {/* Typographic Control Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {recordingState === "idle" && (
          <button
            type="button"
            onClick={startRecording}
            disabled={isLoading}
            className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#2d2d2d] text-white hover:bg-[#e6fb2d] hover:text-[#2d2d2d] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <Mic size={15} />
            <span>START RECORDING</span>
          </button>
        )}

        {recordingState === "recording" && (
          <>
            <button
              type="button"
              onClick={pauseRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f0f0f0] border border-[#dbdbdb] text-[#2d2d2d] font-bold text-xs uppercase tracking-wider hover:bg-[#e6fb2d] transition-all cursor-pointer"
            >
              <Pause size={14} />
              <span>PAUSE</span>
            </button>

            <button
              type="button"
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2d2d2d] text-white hover:bg-[#e6fb2d] hover:text-[#2d2d2d] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <Square size={14} className="fill-current" />
              <span>STOP RECORDING</span>
            </button>
          </>
        )}

        {recordingState === "paused" && (
          <>
            <button
              type="button"
              onClick={resumeRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f0f0f0] border border-[#dbdbdb] text-[#2d2d2d] font-bold text-xs uppercase tracking-wider hover:bg-[#e6fb2d] transition-all cursor-pointer"
            >
              <Play size={14} />
              <span>RESUME</span>
            </button>

            <button
              type="button"
              onClick={stopRecording}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2d2d2d] text-white hover:bg-[#e6fb2d] hover:text-[#2d2d2d] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <Square size={14} className="fill-current" />
              <span>STOP</span>
            </button>
          </>
        )}

        {recordingState === "recorded" && (
          <div className="w-full flex items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f0f0f0] border border-[#dbdbdb] text-[#2d2d2d] font-bold text-xs uppercase tracking-wider hover:bg-[#e6fb2d] transition-all cursor-pointer"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? "PAUSE PREVIEW" : "PLAY RECORDING"}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-red-50 border border-red-200 text-red-600 hover:bg-red-500 hover:text-white transition-all cursor-pointer text-xs font-bold uppercase tracking-wider"
              >
                <Trash2 size={13} />
                <span>DISCARD</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onSubmitTranslation}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2d2d2d] text-white hover:bg-[#e6fb2d] hover:text-[#2d2d2d] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              <span>TRANSLATE RECORDING</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
