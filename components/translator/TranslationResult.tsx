"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DetectedLanguageLabel } from "@/components/translator/DetectedLanguageLabel";
import { TranslatorActions } from "@/components/translator/TranslatorActions";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Sparkles } from "lucide-react";

interface TranslationResultProps {
  translation: string;
  transcript?: string;
  detectedLanguage?: string;
  onReset: () => void;
  className?: string;
}

export function TranslationResult({
  translation,
  transcript,
  detectedLanguage = "HINGLISH DETECTED",
  onReset,
  className = "",
}: TranslationResultProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power4.inOut" }
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
      }

      if (transcriptRef.current) {
        tl.fromTo(
          transcriptRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [translation, prefersReduced]);

  return (
    <div className={`w-full h-full flex flex-col space-y-3 font-sans ${className}`}>
      {/* Micro-label Header */}
      <div className="flex items-center justify-between text-xs text-[#575757] font-semibold tracking-wider uppercase select-none px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#16a34a] animate-pulse" />
          <span>DECODED TRANSLATED MEANING</span>
        </div>
        <DetectedLanguageLabel label={detectedLanguage} />
      </div>

      {/* Result Card Surface */}
      <div
        ref={containerRef}
        className="relative w-full flex-1 bg-[#ffffff] border border-[#e5e5e5] rounded-[1.75rem] p-6 sm:p-7 flex flex-col justify-between min-h-[340px] shadow-sm select-none"
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5e5e5]">
          <span className="text-xs font-bold text-[#000000] uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} className="text-[#2d2d2d]" />
            TRANSLATED OUTPUT
          </span>
        </div>

        {/* Dynamic Expanding Rule */}
        <div
          ref={lineRef}
          className="h-[2px] w-full bg-[#e6fb2d] origin-left transform-gpu my-3"
        />

        {/* Translation Quote Body */}
        <div className="my-auto py-4">
          <p
            ref={textRef}
            className="font-serif italic text-xl sm:text-2xl text-[#000000] leading-relaxed tracking-wide transform-gpu"
          >
            &ldquo;{translation}&rdquo;
          </p>
        </div>

        {/* Audio Transcript Box (If present) */}
        {transcript && (
          <div
            ref={transcriptRef}
            className="mb-4 p-4 bg-[#f7f7f7] border border-[#e5e5e5] rounded-2xl transform-gpu"
          >
            <div className="text-[10px] text-[#2d2d2d] font-bold uppercase tracking-widest mb-1 font-mono">
              SPEECH-TO-TEXT TRANSCRIPT
            </div>
            <p className="font-sans text-sm text-[#575757] leading-relaxed">
              &ldquo;{transcript}&rdquo;
            </p>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="pt-4 border-t border-[#e5e5e5]">
          <TranslatorActions
            translationText={translation}
            transcriptText={transcript}
            onReset={onReset}
          />
        </div>
      </div>
    </div>
  );
}

