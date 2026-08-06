"use client";

import { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

interface TranslatorActionsProps {
  translationText: string;
  transcriptText?: string;
  onReset: () => void;
  className?: string;
}

export function TranslatorActions({
  translationText,
  transcriptText,
  onReset,
  className = "",
}: TranslatorActionsProps) {
  const [copiedType, setCopiedType] = useState<"translation" | "transcript" | null>(null);

  const copyToClipboard = (text: string, type: "translation" | "transcript") => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 font-sans text-xs select-none ${className}`}>
      <button
        type="button"
        onClick={() => copyToClipboard(translationText, "translation")}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e6fb2d] text-[#29303d] font-extrabold uppercase tracking-wider hover:bg-[#d9ee1c] transition-all cursor-pointer shadow-md"
      >
        {copiedType === "translation" ? (
          <>
            <Check size={14} className="text-[#29303d]" />
            <span>COPIED TRANSLATION!</span>
          </>
        ) : (
          <>
            <Copy size={14} />
            <span>COPY TRANSLATION</span>
          </>
        )}
      </button>

      {transcriptText && (
        <button
          type="button"
          onClick={() => copyToClipboard(transcriptText, "transcript")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer"
        >
          {copiedType === "transcript" ? (
            <>
              <Check size={14} className="text-emerald-400" />
              <span className="text-emerald-400">COPIED</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>COPY TRANSCRIPT</span>
            </>
          )}
        </button>
      )}

      <button
        type="button"
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#9e9e9e] font-bold uppercase tracking-wider hover:text-white hover:border-white/20 transition-all cursor-pointer ml-auto"
      >
        <RotateCcw size={14} />
        <span>START AGAIN</span>
      </button>
    </div>
  );
}
