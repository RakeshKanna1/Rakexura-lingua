"use client";

import React from "react";

export default function VisionSection() {
  return (
    <section id="vision" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060b07] border-t border-[#c6f19d]/10 overflow-hidden">
      {/* Background Ambient Loop */}
      <div className="absolute inset-0 opacity-25 pointer-events-none overflow-hidden">
        <video
          src="/loop1.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#060b07]/80" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-center mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#122216] border border-[#c6f19d]/20 text-[#c6f19d] text-xs font-mono tracking-widest uppercase">
            our vision
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-center text-[#f5f4f2] tracking-tight leading-tight mb-8 max-w-4xl mx-auto">
          From Data Chaos to Science-Backed, Actionable Insights
        </h2>

        <p className="text-lg sm:text-xl text-[#a0ada1] text-center max-w-3xl mx-auto leading-relaxed mb-16">
          Bringing true scientific credibility to corporate climate action. From a single farm to global enterprise operations, Alethia adapts to your data infrastructure and ecosystem environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0a120c]/90 backdrop-blur-xl border border-[#c6f19d]/15 hover:border-[#c6f19d]/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-[#122216] border border-[#c6f19d]/30 flex items-center justify-center mb-6 text-[#c6f19d] group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f5f4f2] mb-3">Empirical Rigor</h3>
            <p className="text-[#889689] leading-relaxed text-sm">
              Replace subjective estimates with direct atmospheric measurements and satellite-validated environmental metrics.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0a120c]/90 backdrop-blur-xl border border-[#c6f19d]/15 hover:border-[#c6f19d]/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-[#122216] border border-[#c6f19d]/30 flex items-center justify-center mb-6 text-[#c6f19d] group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f5f4f2] mb-3">Uncompromising Trust</h3>
            <p className="text-[#889689] leading-relaxed text-sm">
              Cryptographically secure every datapoint on-chain to provide auditable audit trails for regulators, investors, and stakeholders.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0a120c]/90 backdrop-blur-xl border border-[#c6f19d]/15 hover:border-[#c6f19d]/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-[#122216] border border-[#c6f19d]/30 flex items-center justify-center mb-6 text-[#c6f19d] group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f5f4f2] mb-3">Seamless Adaptability</h3>
            <p className="text-[#889689] leading-relaxed text-sm">
              Integrate effortlessly into existing ERPs, IoT devices, and supply chain telemetry without operational friction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
