"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGE_CODES } from "@/lib/translator/language-options";
import { ChevronDown, Check } from "lucide-react";

interface LanguageSelectorProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function LanguageSelector({
  label,
  value,
  options,
  onChange,
  disabled = false,
  className = "",
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const code = LANGUAGE_CODES[value] || "LANG";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: string) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative flex flex-col space-y-1.5 font-sans text-xs select-none ${className}`}>
      <label className="text-[10px] font-extrabold text-[#9e9e9e] uppercase tracking-widest px-2">
        {label}
      </label>

      {/* Original Outer Trigger Design */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-between w-full bg-[#0e0f14] border border-[#e6fb2d]/40 rounded-full px-3.5 py-2 text-[12px] font-bold text-white hover:border-[#e6fb2d] focus-within:border-[#e6fb2d] focus-within:ring-2 focus-within:ring-[#e6fb2d]/20 transition-all duration-200 cursor-pointer shadow-md text-left disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen ? "border-[#e6fb2d] ring-2 ring-[#e6fb2d]/20" : ""
        }`}
      >
        <span className="w-full text-[12px] font-bold text-white uppercase tracking-wider font-sans truncate">
          {value}
        </span>

        <div className="flex items-center gap-1.5 text-xs shrink-0 pl-2">
          <span className="font-mono text-[10px] font-bold text-[#e6fb2d]">[{code}]</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={13} className="text-[#9e9e9e]" />
          </motion.div>
        </div>
      </button>

      {/* Sleek Custom Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#1c1f27]/95 backdrop-blur-xl border border-[#e6fb2d]/40 rounded-2xl shadow-2xl p-1.5 min-w-[200px] flex flex-col space-y-1 overflow-hidden"
          >
            <div
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="max-h-56 overflow-y-auto overscroll-contain space-y-0.5 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#e6fb2d]/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#e6fb2d]"
            >
              {options.map((opt) => {
                const optCode = LANGUAGE_CODES[opt] || "";
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-[#e6fb2d] text-[#121212] font-extrabold shadow-xs"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="uppercase tracking-wider font-bold truncate">
                      {opt} {optCode && <span className={isSelected ? "text-[#121212]/70 font-mono text-[10px]" : "text-[#e6fb2d] font-mono text-[10px]"}>[{optCode}]</span>}
                    </span>
                    {isSelected && <Check size={14} className="shrink-0 text-[#121212]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
