"use client";

import React from "react";

export default function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#040805] overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <video
          src="/loop2.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#040805]/85" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#122216] border border-[#c6f19d]/20 text-[#c6f19d] text-xs font-mono tracking-widest uppercase">
            our solutions
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-center text-[#f5f4f2] tracking-tight leading-tight mb-20 max-w-4xl mx-auto">
          Validating What the Ecosystem Does Naturally
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative rounded-3xl bg-[#08100a]/90 backdrop-blur-xl border border-[#c6f19d]/20 p-8 sm:p-12 hover:border-[#c6f19d]/50 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#142819] text-[#c6f19d] text-xs font-mono mb-6">
                SOLUTION 01
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f4f2] mb-4 leading-snug">
                Carbon Markets Built on Truth, Not Estimates
              </h3>
              <p className="text-[#889689] leading-relaxed mb-6">
                Eliminate greenwashing risks with continuous atmospheric monitoring and remote sensing that measure true carbon sequestration in real-time.
              </p>
              <div className="my-6 rounded-xl overflow-hidden border border-[#c6f19d]/15 bg-[#060b07] aspect-video">
                <img
                  src="/AOvusZ4HBIesiiwduhztr6JaRk.png"
                  alt="Carbon MRV Visual"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="pt-6 border-t border-[#c6f19d]/10 flex items-center justify-between">
              <span className="text-sm font-medium text-[#c6f19d]">Explore Carbon MRV</span>
              <div className="w-8 h-8 rounded-full bg-[#122216] flex items-center justify-center text-[#c6f19d] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl bg-[#08100a]/90 backdrop-blur-xl border border-[#c6f19d]/20 p-8 sm:p-12 hover:border-[#c6f19d]/50 transition-all duration-300 shadow-2xl flex flex-col justify-between overflow-hidden group">
            <div>
              <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#142819] text-[#c6f19d] text-xs font-mono mb-6">
                SOLUTION 02
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f4f2] mb-4 leading-snug">
                Real-World Emissions Data. Enterprise-Wide Climate Clarity.
              </h3>
              <p className="text-[#889689] leading-relaxed mb-6">
                Unify complex Scope 1, 2, and 3 GHG inventories into a single transparent intelligence dashboard powered by automated telemetry.
              </p>
              <div className="my-6 rounded-xl overflow-hidden border border-[#c6f19d]/15 bg-[#060b07] aspect-video">
                <img
                  src="/5H1NwxMWQnFVorUBCnkN5TqGxWQ.png"
                  alt="Enterprise Climate Intelligence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="pt-6 border-t border-[#c6f19d]/10 flex items-center justify-between">
              <span className="text-sm font-medium text-[#c6f19d]">Explore Enterprise Suite</span>
              <div className="w-8 h-8 rounded-full bg-[#122216] flex items-center justify-center text-[#c6f19d] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
