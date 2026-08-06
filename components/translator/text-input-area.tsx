"use client";

import { SAMPLE_MESSAGES } from "@/lib/constants";
import { Clipboard, Trash2, Sparkles, Send } from "lucide-react";

interface TextInputAreaProps {
  text: string;
  setText: (text: string) => void;
  onTranslate: () => void;
  isLoading: boolean;
}

export function TextInputArea({ text, setText, onTranslate, isLoading }: TextInputAreaProps) {
  const charCount = text.length;
  const maxChars = 1000;

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) setText(clipboardText);
    } catch (err) {
      console.error("Failed to read clipboard", err);
    }
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="lamalama-card p-5 border border-[#1a1c1c] relative">
      {/* Sample Customer Message Quick Chips */}
      <div className="mb-3.5 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#000000] font-heading flex items-center gap-1.5">
          <Sparkles size={13} className="text-[#ff0000]" /> Quick Samples:
        </span>
        {SAMPLE_MESSAGES.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => setText(sample.original)}
            className="rounded-md border border-[#1a1c1c] bg-[#f9f4eb] px-2.5 py-1 text-[11px] font-bold text-[#000000] font-heading transition hover:border-[#ff0000] hover:bg-[#ff0000] hover:text-[#ffffff]"
          >
            {sample.label}
          </button>
        ))}
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, maxChars))}
          placeholder="Paste a Hindi or Hinglish customer message here... (e.g. Bhai game download ho gaya lekin open nahi ho raha)"
          rows={5}
          className="w-full resize-y rounded-md border border-[#1a1c1c] bg-[#ffffff] p-4 text-sm font-medium text-[#000000] placeholder:text-[#9ca3af] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-all custom-scrollbar"
        />

        {/* Action Controls & Character Counter */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 font-heading">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePaste}
              className="lamalama-btn-secondary flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold"
            >
              <Clipboard size={14} />
              <span>Paste Clipboard</span>
            </button>

            {text && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-md border border-[#e75d60] bg-[#e75d60]/10 px-3.5 py-1.5 text-xs font-bold text-[#e75d60] transition hover:bg-[#e75d60] hover:text-[#ffffff]"
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-[#6b7280]">
              {charCount} / {maxChars} characters
            </span>

            <button
              type="button"
              onClick={onTranslate}
              disabled={!text.trim() || isLoading}
              className="lamalama-btn-primary flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Decoding...</span>
                </>
              ) : (
                <>
                  <Send size={15} />
                  <span>Decode & Translate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
