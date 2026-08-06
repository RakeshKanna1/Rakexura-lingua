"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, CornerDownLeft, Wand2, RefreshCw, ArrowRight } from "lucide-react";

interface TextTranslationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  detectedLanguage?: string;
  className?: string;
}

const MAX_CHARS = 2000;

const PLACEHOLDER_EXAMPLES = [
  "Bhai game download ho gaya but open nahi ho raha.",
  "Kal meeting kitne baje hai? Mujhe thoda late ho sakta hai.",
  "Bhai abhi aa raha hoon, 5 minutes mein pahuchega.",
  "Aaj office jaana hai ya wfh hai?",
  "Bhai Steam account ka id pass abhi tak nahi aaya, jaldi dedo.",
  "Bhai QR pe payment kardo 499 rs aur screenshot bhej diya hai.",
];

export function TextTranslationInput({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  detectedLanguage,
  className = "",
}: TextTranslationInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Auto-rotate placeholder examples every 6 seconds when input is empty
  useEffect(() => {
    if (value.trim()) return;

    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_EXAMPLES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  const applyExample = () => {
    onChange(PLACEHOLDER_EXAMPLES[placeholderIndex]);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const cycleExample = () => {
    const nextIdx = (placeholderIndex + 1) % PLACEHOLDER_EXAMPLES.length;
    setPlaceholderIndex(nextIdx);
    if (!value) {
      // If empty, just change placeholder
    } else {
      onChange(PLACEHOLDER_EXAMPLES[nextIdx]);
    }
    if (textareaRef.current) textareaRef.current.focus();
  };

  return (
    <div className={`w-full h-full flex flex-col space-y-3 font-sans ${className}`}>
      {/* Micro-label Header */}
      <div className="flex items-center justify-between text-xs text-[#575757] font-semibold tracking-wider uppercase select-none px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#e6fb2d] border border-[#2d2d2d] animate-pulse" />
          <span>SOURCE TEXT INPUT</span>
          {detectedLanguage && (
            <span className="ml-1 px-2 py-0.5 rounded-md bg-[#e6fb2d] border border-[#d6d6d6] text-[#000000] text-[10px] font-extrabold tracking-widest uppercase">
              {detectedLanguage}
            </span>
          )}
        </div>
        <span className="font-mono text-[11px] text-[#575757]">
          {value.length} / {MAX_CHARS} CHARS
        </span>
      </div>

      {/* Workstation Input Surface Card */}
      <div className="relative w-full flex-1 bg-[#ffffff] border border-[#e5e5e5] rounded-[1.75rem] p-6 sm:p-7 flex flex-col justify-between min-h-[340px] focus-within:border-[#2d2d2d] focus-within:ring-2 focus-within:ring-[#e6fb2d]/50 transition-all duration-300 shadow-sm">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={PLACEHOLDER_EXAMPLES[placeholderIndex]}
          rows={5}
          className="w-full flex-1 bg-transparent text-base sm:text-lg text-[#000000] placeholder:text-[#9e9e9e] resize-none focus:outline-none font-sans font-medium leading-relaxed custom-scrollbar disabled:opacity-50 mb-3"
        />

        {/* Quick Hinglish Sample Trigger Pill (When Empty) */}
        {!value && (
          <div className="mb-4 flex items-center select-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f7f7f7] border border-[#d6d6d6] text-[#000000] text-xs font-bold tracking-wider transition-all duration-200 hover:bg-[#e6fb2d]">
              <button
                type="button"
                onClick={applyExample}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Wand2 size={13} className="shrink-0 text-[#2d2d2d]" />
                <span>TRY HINGLISH SAMPLE</span>
              </button>
              <button
                type="button"
                onClick={cycleExample}
                title="Cycle next sample message"
                className="p-1 hover:text-[#000000] transition-colors cursor-pointer border-l border-[#d6d6d6] pl-2 ml-1"
              >
                <RefreshCw size={12} />
              </button>
            </div>
          </div>
        )}

        {/* Integrated Bottom Action Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#e5e5e5] select-none">
          {/* Left Side: Shortcut Hint or Clear Button */}
          <div className="flex items-center gap-3">
            {value ? (
              <button
                type="button"
                onClick={() => onChange("")}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 text-xs font-bold tracking-wider cursor-pointer"
              >
                <X size={13} />
                <span>CLEAR</span>
              </button>
            ) : null}

            <span className="flex items-center gap-1.5 text-[11px] text-[#575757] font-medium">
              <CornerDownLeft size={12} className="text-[#2d2d2d]" />
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-[#f0f0f0] border border-[#dbdbdb] text-[#000000] font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-[#f0f0f0] border border-[#dbdbdb] text-[#000000] font-mono text-[10px]">Enter</kbd>
              </span>
            </span>
          </div>

          {/* Right Side: Primary Submit CTA */}
          <button
            type="button"
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className="flex items-center justify-center gap-2.5 px-7 py-3 rounded-full bg-[#2d2d2d] text-white border border-[#2d2d2d] font-extrabold text-xs uppercase tracking-wider hover:bg-[#e6fb2d] hover:text-[#2d2d2d] hover:border-[#e6fb2d] transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <span>DECODE INTENDED MEANING</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}


