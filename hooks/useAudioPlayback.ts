"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createObjectURL, revokeObjectURL } from "@/lib/translator/audio-utils";

export function useAudioPlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  const loadAudio = useCallback((fileOrBlob: File | Blob) => {
    if (urlRef.current) {
      revokeObjectURL(urlRef.current);
    }

    const url = createObjectURL(fileOrBlob);
    urlRef.current = url;

    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const unload = useCallback(() => {
    stop();
    if (urlRef.current) {
      revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    audioRef.current = null;
    setDuration(0);
    setCurrentTime(0);
  }, [stop]);

  useEffect(() => {
    return () => {
      unload();
    };
  }, [unload]);

  return {
    isPlaying,
    currentTime,
    duration,
    loadAudio,
    togglePlay,
    stop,
    unload,
  };
}
