"use client";

import { TranslatorMode } from "@/lib/translator/types";

interface TranslatorModeTabsProps {
  activeMode: TranslatorMode;
  onModeChange: (mode: TranslatorMode) => void;
  className?: string;
}

const MODES: { id: TranslatorMode; label: string }[] = [
  { id: "text", label: "01 / TEXT" },
  { id: "voice", label: "02 / VOICE" },
  { id: "upload", label: "03 / UPLOAD" },
];

export function TranslatorModeTabs({
  activeMode,
  onModeChange,
  className = "",
}: TranslatorModeTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Translator Input Modes"
      className={`flex items-center gap-6 border-b border-[#e5e5e5] font-mono text-xs select-none ${className}`}
    >
      {MODES.map((mode) => {
        const isActive = activeMode === mode.id;
        return (
          <button
            key={mode.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onModeChange(mode.id)}
            className={`relative py-3.5 tracking-[0.2em] uppercase transition-colors duration-200 cursor-pointer ${
              isActive ? "text-[#000000] font-extrabold" : "text-[#575757] hover:text-[#000000] font-medium"
            }`}
          >
            <span>{mode.label}</span>
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2d2d2d] transform-gpu" />
            )}
          </button>
        );
      })}
    </div>
  );
}
