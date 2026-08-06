"use client";

import { Sparkles } from "lucide-react";

interface DetectedLanguageLabelProps {
  label: string;
  className?: string;
}

export function DetectedLanguageLabel({ label, className = "" }: DetectedLanguageLabelProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 rounded-[2px] font-mono text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-[0.2em] select-none ${className}`}>
      <Sparkles size={12} className="text-white shrink-0" />
      <span>{label}</span>
    </div>
  );
}
