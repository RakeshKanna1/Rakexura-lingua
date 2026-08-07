"use client";

import React from "react";

export default function TechSection() {
  return (
    <section id="technology" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060b07] border-t border-[#c6f19d]/10 overflow-hidden">
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <video
          src="/CLOUDS_no%20fade.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#060b07]/80" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#122216] border border-[#c6f19d]/20 text-[#c6f19d] text-xs font-mono tracking-widest uppercase">
            our technology
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-center text-[#f5f4f2] tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
          Scientific Rigor. Commercial Precision. Unmatched Trust.
        </h2>

        <p className="text-lg text-[#a0ada1] text-center max-w-2xl mx-auto leading-relaxed mb-20">
          The first to bring Atmospheric-Based Digital MRV to corporate climate action—turning emissions data into verified insight.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0a120c]/90 backdrop-blur-xl border border-[#c6f19d]/15 hover:border-[#c6f19d]/40 transition-all duration-300 relative overflow-hidden group">
            <div className="text-xs font-mono text-[#c6f19d] uppercase mb-4 tracking-wider">PILLAR 01</div>
            <h3 className="text-xl font-bold text-[#f5f4f2] mb-3">Atmospheric-Based MRV</h3>
            <p className="text-[#889689] text-sm leading-relaxed mb-6">
              We’re the first to bring Atmospheric-Based Digital MRV—trusted by top climate institutions—to corporate climate accountability.
            </p>
            <div className="mb-6 rounded-xl overflow-hidden border border-[#c6f19d]/15 bg-[#060b07] h-36">
              <img
                src="/6DKpbMHYlKSyfGJf8prenTk.png"
                alt="Atmospheric MRV Sensor"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-xs font-mono text-[#c6f19d]/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6f19d]" />
              Continuous Sensor Fusion
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#0a120c]/90 backdrop-blur-xl border border-[#c6f19d]/15 hover:border-[#c6f19d]/40 transition-all duration-300 relative overflow-hidden group">
            <div className="text-xs font-mono text-[#c6f19d] uppercase mb-4 tracking-wider">PILLAR 02</div>
            <h3 className="text-xl font-bold text-[#f5f4f2] mb-3">Blockchain Technology</h3>
            <p className="text-[#889689] text-sm leading-relaxed mb-6">
              Built on blockchain, our system makes every data point fully traceable, tamper-proof, and cryptographically verifiable.
            </p>
            <div className="mb-6 rounded-xl overflow-hidden border border-[#c6f19d]/15 bg-[#060b07] h-36">
              <img
                src="/O2SGIWK1YNszGJskQdHBJuKMeDE.png"
                alt="Blockchain Audit Verification"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-xs font-mono text-[#c6f19d]/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6f19d]" />
              Immutable Audit Trails
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#0a120c]/90 backdrop-blur-xl border border-[#c6f19d]/15 hover:border-[#c6f19d]/40 transition-all duration-300 relative overflow-hidden group">
            <div className="text-xs font-mono text-[#c6f19d] uppercase mb-4 tracking-wider">PILLAR 03</div>
            <h3 className="text-xl font-bold text-[#f5f4f2] mb-3">Automated Intelligence</h3>
            <p className="text-[#889689] text-sm leading-relaxed mb-6">
              No spreadsheets. No guesswork. Intelligent pipelines validate GHG metrics automatically with zero manual labor.
            </p>
            <div className="mb-6 rounded-xl overflow-hidden border border-[#c6f19d]/15 bg-[#060b07] h-36">
              <img
                src="/DhZqqFUEIwULVhbYzxuOJJtc.png"
                alt="Automated Pipeline Intelligence"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="text-xs font-mono text-[#c6f19d]/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6f19d]" />
              Zero Manual Spreadsheets
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
