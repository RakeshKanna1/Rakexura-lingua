"use client";

import { TranslatorWorkspace } from "@/components/translator/TranslatorWorkspace";

export function TranslatorSection() {
  return (
    <section id="demo" className="_wrap_1u2bi_1 _secondary_1u2bi_11 _box-wrap_j450q_1 scroll-mt-24">
      <div className="_wrap_4jrbl_1 _sm_4jrbl_10" style={{ ["--container-padding-multiplier" as any]: "2" }}>
        <p className="_wrap_1tble_1 _md_1tble_16 _fw-400_1tble_26 _subtitle_j450q_22">
          <span>04 / INTERACTIVE SPEECH WORKSTATION</span>
        </p>

        <div className="_wrap_j450q_5">
          <h2 className="_wrap_1tble_1 _title-h1_1tble_38 _fw-400_1tble_26">
            <div className="_inner_1tble_69">
              <span className="_word-wrap_1tble_78">
                <span className="_word_1tble_62">SAY IT THE WAY YOU ACTUALLY SPEAK.</span>
              </span>
            </div>
          </h2>
        </div>

        <div className="w-full max-w-7xl mx-auto mt-8">
          <TranslatorWorkspace />
        </div>
      </div>
    </section>
  );
}
