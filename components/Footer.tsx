"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#030604] border-t border-[#c6f19d]/15 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#c6f19d]/10">
          <div className="md:col-span-6 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c6f19d] to-[#4e8e45] p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#060b07] rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
              <span className="text-2xl font-bold tracking-tight text-[#f5f4f2]">Alethia</span>
            </Link>
            <p className="text-[#889689] max-w-sm text-sm leading-relaxed">
              Know your impact—precisely. End-to-end environmental intelligence powered by science, blockchain, and transparent data you can trust.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-[#c6f19d] uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-[#a0ada1]">
              <li><a href="#vision" className="hover:text-[#c6f19d] transition-colors">Our Vision</a></li>
              <li><a href="#solutions" className="hover:text-[#c6f19d] transition-colors">Our Solutions</a></li>
              <li><a href="#technology" className="hover:text-[#c6f19d] transition-colors">Our Technology</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono text-[#c6f19d] uppercase tracking-wider mb-4">Connect</h4>
            <p className="text-sm text-[#a0ada1]">Ready to transform your climate telemetry?</p>
            <a href="mailto:contact@alethia.earth" className="inline-flex items-center gap-2 text-sm font-medium text-[#c6f19d] hover:underline pt-2">
              contact@alethia.earth →
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#617062] gap-4">
          <p>© {new Date().getFullYear()} Alethia Earth. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#c6f19d] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#c6f19d] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
