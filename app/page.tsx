"use client";

import { TranslatorWorkspace } from "@/components/translator/TranslatorWorkspace";

export default function HomePage() {
  return (
    <main>
      <h1>LINGUA TRANSLATION ENGINE</h1>
      <p>Hindi, Tanglish &amp; Hinglish Customer Speech &amp; Intent Engine</p>

      <section>
        <TranslatorWorkspace />
      </section>

      <footer>
        <p>LINGUA Engine Active • Ready for New Design Integration</p>
      </footer>
    </main>
  );
}
