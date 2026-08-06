"use client";

import React, { useState, useRef } from "react";
import { Upload, FileAudio, X, ArrowRight, Play, Pause } from "lucide-react";
import { formatFileSize, ALLOWED_AUDIO_EXTENSIONS, MAX_FILE_SIZE_BYTES } from "@/lib/translator/audio-utils";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";

interface AudioUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  onSubmitTranslation: () => void;
  isLoading?: boolean;
  className?: string;
}

const FORMAT_TAGS = ["AUDIO", "MP3", "WAV", "M4A", "WEBM", "OGG"];

export function AudioUpload({
  onFileSelect,
  onFileRemove,
  onSubmitTranslation,
  isLoading = false,
  className = "",
}: AudioUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isPlaying, togglePlay, loadAudio, unload } = useAudioPlayback();

  const validateAndProcessFile = (file: File) => {
    setValidationError(null);

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_AUDIO_EXTENSIONS.includes(ext)) {
      setValidationError(`UNSUPPORTED FORMAT: ${ext}. Accepted: ${ALLOWED_AUDIO_EXTENSIONS.join(", ")}`);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setValidationError(`FILE TOO LARGE: ${formatFileSize(file.size)}. Max allowed: 25 MB.`);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
    loadAudio(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    unload();
    setSelectedFile(null);
    setValidationError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onFileRemove();
  };

  return (
    <div className={`w-full flex flex-col space-y-3 font-sans ${className}`}>
      {/* Micro-label Header */}
      <div className="flex items-center justify-between text-xs text-[#575757] font-semibold tracking-wider uppercase select-none px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#e6fb2d] border border-[#2d2d2d] animate-pulse" />
          <span>AUDIO FILE INGESTION</span>
        </div>
        <span className="font-mono text-[11px] text-[#575757]">MAX: 25 MB</span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_AUDIO_EXTENSIONS.join(",")}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload Drag & Drop Zone */}
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full min-h-[220px] bg-[#ffffff] border-2 border-dashed rounded-[1.75rem] p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer select-none space-y-4 shadow-sm ${
            isDragOver
              ? "border-[#2d2d2d] bg-[#e6fb2d]/20"
              : "border-[#d6d6d6] hover:border-[#2d2d2d] hover:bg-[#fafafa]"
          }`}
        >
          <div className="p-3 rounded-full bg-[#e6fb2d]/40 border border-[#e6fb2d] text-[#2d2d2d]">
            <Upload size={24} />
          </div>
          <div className="text-xs font-extrabold text-[#000000] uppercase tracking-widest">
            DRAG & DROP AUDIO FILE OR CLICK TO BROWSE
          </div>

          {/* Format Tags */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-1">
            {FORMAT_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-[#f7f7f7] border border-[#e5e5e5] rounded-full text-[10px] font-bold text-[#575757] uppercase tracking-wider font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Selected File Surface */
        <div className="w-full bg-[#ffffff] border border-[#e5e5e5] rounded-[1.75rem] p-6 flex flex-col space-y-4 shadow-sm font-sans">
          <div className="flex items-center justify-between gap-4 border-b border-[#e5e5e5] pb-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2.5 rounded-full bg-[#e6fb2d]/40 border border-[#e6fb2d] text-[#2d2d2d]">
                <FileAudio size={20} className="shrink-0" />
              </div>
              <div className="truncate">
                <div className="text-xs font-extrabold text-[#000000] uppercase tracking-wider truncate">
                  {selectedFile.name}
                </div>
                <div className="text-[10px] text-[#575757] font-mono uppercase">
                  {formatFileSize(selectedFile.size)}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-full bg-[#f0f0f0] hover:bg-red-500 hover:text-white text-[#575757] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={togglePlay}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f0f0f0] border border-[#dbdbdb] text-[#2d2d2d] font-bold text-xs uppercase tracking-widest hover:bg-[#e6fb2d] transition-all cursor-pointer"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "PAUSE PREVIEW" : "PLAY PREVIEW"}</span>
            </button>

            <button
              type="button"
              onClick={onSubmitTranslation}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2d2d2d] text-white hover:bg-[#e6fb2d] hover:text-[#2d2d2d] font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md disabled:opacity-40"
            >
              <span>TRANSLATE FILE</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {validationError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-sans">
          {validationError}
        </div>
      )}
    </div>
  );
}
