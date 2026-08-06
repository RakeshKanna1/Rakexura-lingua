"use client";

import { useState } from "react";

export type CursorType = "default" | "view" | "play" | "copy" | "open" | "drag";

export function useCursor() {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorText, setCursorText] = useState<string>("");

  const setCursor = (type: CursorType, text: string = "") => {
    setCursorType(type);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorType("default");
    setCursorText("");
  };

  return {
    cursorType,
    cursorText,
    setCursor,
    resetCursor,
  };
}
