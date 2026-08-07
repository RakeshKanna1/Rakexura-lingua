"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#060b07]">
      {/* Dynamic Radial Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#c6f19d]/20 via-[#4e8e45]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#224424]/30 blur-[100px] rounded-full" />
      </div>

      {/* Floating 3D Rocks Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-60">
        <img
          src="/EZVHOS2TSmjnZTlR4QTIEcbgrag.png"
          alt="Rock Layer Back"
          className="absolute -top-10 -right-20 w-[500px] object-contain filter blur-[1px] animate-float"
        />
        <img
          src="/60KTRPNlOwJbfPST90EU3Z0F0c.png"
          alt="Rock Layer Mid"
          className="absolute bottom-10 -left-20 w-[450px] object-contain opacity-80 animate-pulse-glow"
        />
        <img
          src="/AOvusZ4HBIesiiwduhztr6JaRk.png"
          alt="Rock Layer Front"
          className="absolute -bottom-20 right-10 w-[600px] object-contain opacity-90"
        />
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Top Tag/Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#122216]/90 border border-[#c6f19d]/30 text-[#c6f19d] text-xs font-mono tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(198,241,157,0.15)] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#c6f19d]" />
          Atmospheric-Based Environmental Intelligence
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#f5f4f2] leading-[1.1] mb-8 font-sans">
          Where Ecosystem Science <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#f5f4f2] via-[#c6f19d] to-[#7dbf6a] bg-clip-text text-transparent">
            and Enterprise Strategy Meet
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-[#a0ada1] font-normal leading-relaxed mb-12">
          Know your impact—precisely. End-to-end environmental intelligence powered by science, blockchain, and transparent data you can trust.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
          <a
            href="#solutions"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#060b07] bg-[#c6f19d] rounded-full shadow-[0_0_30px_rgba(198,241,157,0.35)] hover:shadow-[0_0_40px_rgba(198,241,157,0.6)] hover:bg-[#d5eebc] transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore Platform
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#f5f4f2] bg-[#122216]/60 border border-[#c6f19d]/25 rounded-full hover:border-[#c6f19d]/60 hover:bg-[#1a3321] transition-all duration-300 backdrop-blur-sm"
          >
            Schedule Demo
          </a>
        </div>

        {/* Mouse Wheel Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mb-12 group cursor-pointer">
          <div className="w-6 h-10 rounded-full border-2 border-[#f5f4f2]/40 flex justify-center p-1.5 relative">
            <div className="w-1.5 h-2.5 bg-[#c6f19d] rounded-full animate-bounce" />
          </div>
          <span className="text-xs font-mono text-[#a0ada1] uppercase tracking-widest group-hover:text-[#c6f19d] transition-colors">
            Scroll to discover
          </span>
        </div>

        {/* Interactive Feature Highlight Video Container */}
        <div className="mt-8 relative rounded-2xl border border-[#c6f19d]/20 bg-[#0a120c]/80 backdrop-blur-xl p-2 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group">
          <div className="relative rounded-xl overflow-hidden border border-[#c6f19d]/10 bg-[#060b07] aspect-video flex items-center justify-center">
            <video
              src="/scan.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#060b07]/80 backdrop-blur-md border border-[#c6f19d]/20 text-xs font-mono text-[#c6f19d]">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c6f19d] animate-ping" />
                <span className="tracking-widest uppercase">Atmospheric MRV Telemetry Stream</span>
              </div>
              <div className="flex gap-4 mt-2 sm:mt-0 text-[#889689]">
                <span>LAT: 28.6139° N</span>
                <span>LON: 77.2090° E</span>
                <span>VERIFIED: 99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
