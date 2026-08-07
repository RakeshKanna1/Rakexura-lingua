"use client";

import React from "react";

export default function CatchAllPage() {
  return (
    <iframe
      src="/alethia/index.html"
      title="Alethia Landing Page"
      scrolling="yes"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
        overflow: "auto",
      }}
    />
  );
}
