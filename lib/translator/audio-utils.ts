export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function createObjectURL(fileOrBlob: File | Blob): string {
  if (typeof window === "undefined") return "";
  return URL.createObjectURL(fileOrBlob);
}

export function revokeObjectURL(url: string | null) {
  if (typeof window === "undefined" || !url || !url.startsWith("blob:")) return;
  try {
    URL.revokeObjectURL(url);
  } catch {
    // Ignore cleanup errors
  }
}

export const ALLOWED_AUDIO_EXTENSIONS = [".mp3", ".wav", ".m4a", ".webm", ".ogg"];
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
