"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { TranslatorError } from "@/lib/translator/types";

interface TranslatorErrorStateProps {
  error: TranslatorError;
  onRetry: () => void;
  className?: string;
}

export function TranslatorErrorState({
  error,
  onRetry,
  className = "",
}: TranslatorErrorStateProps) {
  return (
    <div className={`w-full h-full flex flex-col space-y-3 font-sans ${className}`}>
      <div className="flex items-center justify-between text-xs text-[#575757] font-semibold tracking-wider uppercase select-none px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span>TRANSLATION ERROR</span>
        </div>
        <span className="font-mono text-[11px] text-red-600 font-bold">{error.code || "ERR"}</span>
      </div>

      <div
        role="alert"
        className="w-full flex-1 bg-[#ffffff] border border-red-200 rounded-[1.75rem] p-7 flex flex-col justify-between min-h-[340px] shadow-sm select-none"
      >
        <div className="flex items-center gap-3 text-red-600 border-b border-red-100 pb-3">
          <AlertTriangle size={20} className="shrink-0" />
          <span className="font-extrabold tracking-wider uppercase text-sm">{error.message}</span>
        </div>

        <div className="my-auto py-4 space-y-2">
          <div className="text-xs text-[#575757] font-semibold uppercase tracking-wider">RECOMMENDED ACTION:</div>
          <p className="font-sans text-sm text-[#000000] leading-relaxed font-medium">
            {error.actionHint}
          </p>
        </div>

        <div className="pt-4 border-t border-[#e5e5e5]">
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw size={14} />
            <span>TRY AGAIN</span>
          </button>
        </div>
      </div>
    </div>
  );
}

