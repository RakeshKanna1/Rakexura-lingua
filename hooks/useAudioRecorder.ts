"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { AudioRecordingState } from "@/lib/translator/types";

const MAX_RECORDING_SECONDS = 120; // 02:00 max

export function useAudioRecorder() {
  const [recordingState, setRecordingState] = useState<AudioRecordingState>("idle");
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const stopTracksAndAudioContext = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setAnalyserNode(null);
  }, []);

  const startRecording = useCallback(async () => {
    if (typeof window === "undefined" || !navigator?.mediaDevices?.getUserMedia) {
      setRecordingState("error");
      setErrorMessage("Browser audio recording is not supported.");
      return;
    }

    try {
      setRecordingState("requesting_permission");
      setErrorMessage(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Web Audio Analyser setup
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const sourceNode = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        sourceNode.connect(analyser);
        analyserRef.current = analyser;
        setAnalyserNode(analyser);
      } catch {
        analyserRef.current = null;
        setAnalyserNode(null);
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType || "audio/webm" });
        setAudioBlob(blob);
        setRecordingState("recorded");
        stopTracksAndAudioContext();
      };

      mediaRecorder.start(200);
      setRecordingState("recording");
      setDuration(0);

      timerIntervalRef.current = setInterval(() => {
        setDuration((prev) => {
          if (prev >= MAX_RECORDING_SECONDS - 1) {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
              mediaRecorderRef.current.stop();
            }
            return MAX_RECORDING_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      setRecordingState("error");
      setErrorMessage("MICROPHONE ACCESS BLOCKED. Allow microphone access in your browser settings, or use text and audio upload mode instead.");
      stopTracksAndAudioContext();
    }
  }, [stopTracksAndAudioContext]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingState("paused");
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setRecordingState("recording");
      timerIntervalRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const resetRecording = useCallback(() => {
    stopTracksAndAudioContext();
    setRecordingState("idle");
    setDuration(0);
    setAudioBlob(null);
    setErrorMessage(null);
    chunksRef.current = [];
  }, [stopTracksAndAudioContext]);

  useEffect(() => {
    return () => {
      stopTracksAndAudioContext();
    };
  }, [stopTracksAndAudioContext]);

  return {
    recordingState,
    duration,
    audioBlob,
    analyserNode,
    errorMessage,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    resetRecording,
  };
}
