"use client";

import { OutputLanguage, ReplyLanguage, ReplyTone } from "@/lib/types";
import { REPLY_LANGUAGES, REPLY_TONES, SUPPORTED_OUTPUT_LANGUAGES } from "@/lib/constants";
import { Globe } from "lucide-react";

interface LanguageSelectorsProps {
  outputLanguage: OutputLanguage;
  setOutputLanguage: (lang: OutputLanguage) => void;
  replyLanguage: ReplyLanguage;
  setReplyLanguage: (lang: ReplyLanguage) => void;
  replyTone: ReplyTone;
  setReplyTone: (tone: ReplyTone) => void;
}

export function LanguageSelectors({
  outputLanguage,
  setOutputLanguage,
  replyLanguage,
  setReplyLanguage,
  replyTone,
  setReplyTone,
}: LanguageSelectorsProps) {
  return (
    <div className="lamalama-card p-4 sm:p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Input Language (Auto Detect) */}
        <div>
          <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase tracking-wider font-heading">
            Customer Language
          </label>
          <div className="flex items-center gap-2 rounded-md border border-[#1a1c1c] bg-[#f9f4eb] px-3.5 py-2 text-xs font-bold text-[#000000]">
            <Globe size={15} className="text-[#ff0000] shrink-0" />
            <span>Auto Detect (Hinglish/Hindi)</span>
          </div>
        </div>

        {/* Output Translation Language */}
        <div>
          <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase tracking-wider font-heading flex items-center justify-between">
            <span>Translate To</span>
            <span className="text-[10px] text-[#ff0000] font-bold">Default: English</span>
          </label>
          <select
            value={outputLanguage}
            onChange={(e) => setOutputLanguage(e.target.value as OutputLanguage)}
            className="w-full rounded-md border border-[#1a1c1c] bg-[#ffffff] px-3.5 py-2 text-xs font-bold text-[#000000] shadow-sm focus:border-[#ff0000] focus:outline-none cursor-pointer"
          >
            {SUPPORTED_OUTPUT_LANGUAGES.map((lang) => (
              <option key={lang.name} value={lang.name} className="bg-[#ffffff] text-[#000000]">
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Suggested Reply Language */}
        <div>
          <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase tracking-wider font-heading">
            Reply Language
          </label>
          <select
            value={replyLanguage}
            onChange={(e) => setReplyLanguage(e.target.value as ReplyLanguage)}
            className="w-full rounded-md border border-[#1a1c1c] bg-[#ffffff] px-3.5 py-2 text-xs font-bold text-[#000000] shadow-sm focus:border-[#ff0000] focus:outline-none cursor-pointer"
          >
            {REPLY_LANGUAGES.map((lang) => (
              <option key={lang} value={lang} className="bg-[#ffffff] text-[#000000]">
                💬 Reply in {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Reply Tone */}
        <div>
          <label className="block text-xs font-bold text-[#000000] mb-1.5 uppercase tracking-wider font-heading">
            Seller Response Tone
          </label>
          <select
            value={replyTone}
            onChange={(e) => setReplyTone(e.target.value as ReplyTone)}
            className="w-full rounded-md border border-[#1a1c1c] bg-[#ffffff] px-3.5 py-2 text-xs font-bold text-[#000000] shadow-sm focus:border-[#ff0000] focus:outline-none cursor-pointer"
          >
            {REPLY_TONES.map(({ tone }) => (
              <option key={tone} value={tone} className="bg-[#ffffff] text-[#000000]">
                ✨ {tone} Tone
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
