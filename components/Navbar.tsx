"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060b07]/80 backdrop-blur-xl border-b border-[#c6f19d]/15 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c6f19d] to-[#4e8e45] p-[1px] flex items-center justify-center shadow-[0_0_15px_rgba(198,241,157,0.3)] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#060b07] rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3V21M12 3L6 9M12 3L18 9M6 15L12 21M18 15L12 21"
                  stroke="#c6f19d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#f5f4f2] group-hover:text-[#c6f19d] transition-colors">
            Alethia
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#vision" className="text-xs font-mono tracking-widest text-[#c0c7c0] hover:text-[#c6f19d] transition-colors uppercase">
            our vision
          </a>
          <a href="#solutions" className="text-xs font-mono tracking-widest text-[#c0c7c0] hover:text-[#c6f19d] transition-colors uppercase">
            our solutions
          </a>
          <a href="#technology" className="text-xs font-mono tracking-widest text-[#c0c7c0] hover:text-[#c6f19d] transition-colors uppercase">
            our technology
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="relative group inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#060b07] bg-[#c6f19d] rounded-full shadow-[0_0_20px_rgba(198,241,157,0.3)] hover:shadow-[0_0_25px_rgba(198,241,157,0.5)] hover:bg-[#d5eebc] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Let’s Talk</span>
            <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#c0c7c0] hover:text-[#c6f19d]"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060b07]/95 border-b border-[#c6f19d]/20 px-4 pt-2 pb-6 space-y-4 backdrop-blur-2xl">
          <a href="#vision" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-mono tracking-wider text-[#c0c7c0] hover:text-[#c6f19d] py-2 uppercase">
            our vision
          </a>
          <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-mono tracking-wider text-[#c0c7c0] hover:text-[#c6f19d] py-2 uppercase">
            our solutions
          </a>
          <a href="#technology" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-mono tracking-wider text-[#c0c7c0] hover:text-[#c6f19d] py-2 uppercase">
            our technology
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="w-full mt-4 inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-[#060b07] bg-[#c6f19d] rounded-full shadow-lg">
            Let’s Talk
          </a>
        </div>
      )}
    </header>
  );
}
