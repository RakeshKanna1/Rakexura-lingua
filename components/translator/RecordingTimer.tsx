"use client";

import { formatDuration } from "@/lib/translator/audio-utils";

interface RecordingTimerProps {
  duration: number; // in seconds
  isRecording?: boolean;
  className?: string;
}

export function RecordingTimer({
  duration,
  isRecording = false,
  className = "",
}: RecordingTimerProps) {
  return (
    <div className={`flex items-center gap-2 font-mono text-xs select-none ${className}`}>
      {isRecording && (
        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
      )}
      <span className="text-white font-bold tracking-widest text-sm">
        {formatDuration(duration)}
      </span>
      <span className="text-[#94A3B8]/60 text-[10px] uppercase tracking-wider">/ 02:00</span>
    </div>
  );
}
