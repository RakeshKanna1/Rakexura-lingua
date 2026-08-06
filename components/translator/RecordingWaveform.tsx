"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface RecordingWaveformProps {
  analyserNode?: AnalyserNode | null;
  isRecording?: boolean;
  className?: string;
}

export function RecordingWaveform({
  analyserNode = null,
  isRecording = false,
  className = "",
}: RecordingWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || prefersReduced) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numBars = 28;
    const dataArray = new Uint8Array(32);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyserNode && isRecording) {
        analyserNode.getByteFrequencyData(dataArray);
      }

      const barWidth = 3;
      const gap = 5;
      const startX = (canvas.width - (numBars * (barWidth + gap))) / 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;

        if (isRecording) {
          if (analyserNode) {
            const val = dataArray[i % dataArray.length];
            barHeight = Math.max(4, (val / 255) * canvas.height * 0.85);
          } else {
            // Deterministic sine wave fallback
            const time = Date.now() * 0.005;
            barHeight = Math.max(4, Math.sin(time + i * 0.4) * 14 + 16);
          }
        }

        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = isRecording ? "rgba(230, 251, 45, 0.95)" : "rgba(230, 251, 45, 0.3)";
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      if (isRecording) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [analyserNode, isRecording, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className={`flex items-center gap-1 h-12 px-4 bg-[#14161d] border border-[#434343] rounded-2xl font-mono text-xs text-[#9e9e9e] ${className}`}>
        <span>STATUS: {isRecording ? "RECORDING..." : "IDLE"}</span>
      </div>
    );
  }

  return (
    <div className={`w-full flex items-center justify-center h-20 bg-[#14161d] border border-[#434343] rounded-2xl overflow-hidden shadow-inner ${className}`}>
      <canvas ref={canvasRef} width={280} height={50} className="w-full h-full" />
    </div>
  );
}

