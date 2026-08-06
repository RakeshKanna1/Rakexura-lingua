"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { TranslatorMode } from "@/lib/translator/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Sparkles } from "lucide-react";

interface TranslationProcessingSequenceProps {
  mode: TranslatorMode;
  onCancel?: () => void;
  className?: string;
}

const CINEMATIC_STEPS = ["LISTEN", "UNDERSTAND", "INTERPRET", "EXPRESSION", "READY"];

export function TranslationProcessingSequence({
  onCancel,
  className = "",
}: TranslationProcessingSequenceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      if (progressBarRef.current) {
        tl.fromTo(
          progressBarRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 2.4, ease: "power2.inOut" }
        );
      }

      CINEMATIC_STEPS.forEach((_, idx) => {
        tl.add(() => {
          setActiveStepIndex(idx);
        }, (idx * 2.4) / CINEMATIC_STEPS.length);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <div className={`w-full h-full flex flex-col space-y-3 font-sans ${className}`}>
      {/* Micro-label Header */}
      <div className="flex items-center justify-between text-xs text-[#575757] font-semibold tracking-wider uppercase select-none px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#e6fb2d] border border-[#2d2d2d] animate-ping" />
          <span>AI INTENT PROCESSING</span>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-[#575757] hover:text-[#000000] uppercase font-bold tracking-wider cursor-pointer"
          >
            [ CANCEL ]
          </button>
        )}
      </div>

      {/* Surface Container */}
      <div
        ref={containerRef}
        className="relative w-full flex-1 bg-[#ffffff] border border-[#e5e5e5] p-7 rounded-[1.75rem] flex flex-col justify-between min-h-[340px] shadow-sm select-none"
      >
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between text-xs font-bold text-[#000000] uppercase tracking-widest border-b border-[#e5e5e5] pb-3">
          <span className="flex items-center gap-2 text-[#2d2d2d]">
            <Sparkles size={14} className="animate-spin text-[#2d2d2d]" />
            STAGE 0{activeStepIndex + 1} OF 0{CINEMATIC_STEPS.length}
          </span>
          <span className="font-mono text-[11px] text-[#575757]">DECODING</span>
        </div>

        {/* Big Stage Title */}
        <div className="my-auto py-8 text-center sm:text-left">
          <div className="text-xs text-[#575757] uppercase tracking-widest mb-2 font-mono font-semibold">
            CURRENT PIPELINE STAGE
          </div>
          <div className="font-display font-black text-3xl sm:text-5xl text-[#000000] uppercase tracking-tight">
            {CINEMATIC_STEPS[activeStepIndex]}
          </div>
        </div>

        {/* Lime Progress Line */}
        <div className="w-full pt-4">
          <div className="h-[4px] w-full bg-[#f0f0f0] overflow-hidden rounded-full border border-[#d6d6d6]">
            <div
              ref={progressBarRef}
              className="h-full w-full bg-[#e6fb2d] origin-left transform-gpu scale-x-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

