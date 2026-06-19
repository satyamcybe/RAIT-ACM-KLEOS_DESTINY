"use client";

import { useState } from "react";

export default function InstitutionsSection() {
  const [hoveredWorkerIdx, setHoveredWorkerIdx] = useState<number | null>(null);
  const [hoveredLenderIdx, setHoveredLenderIdx] = useState<number | null>(null);

  const workerPoints = [
    {
      title: "Simple, fast, free",
      desc: "Generates in less than 2 minutes. No platform fees or worker charges, ever."
    },
    {
      title: "Works on any phone",
      desc: "No complicated apps to install. Access your passport via WhatsApp or web link."
    },
    {
      title: "Your data, your control",
      desc: "Built on standard consent principles. You decide who sees your score and when."
    }
  ];

  const lenderPoints = [
    {
      title: "Machine-verifiable credentials",
      desc: "Cryptographically signed by PRAMAAN, preventing spoofing and profile tamper."
    },
    {
      title: "RBI Account Aggregator pipe",
      desc: "Direct banking ledger data flows with zero manual upload or document reviews."
    },
    {
      title: "Instant credit decisioning",
      desc: "Read structured JSON-LD schemas directly into automated underwriting systems."
    },
    {
      title: "Turnkey developer REST API",
      desc: "Deploy verification widgets in 1 day using our simple developer API and webhooks."
    }
  ];

  return (
    <section 
      id="institutions"
      className="py-20 bg-white border-b border-[#E5E7EB] select-none"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 
            className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Built for Institutions to Trust
          </h2>
        </div>

        {/* 2 Columns Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Left Column: For Workers */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
            <div className="space-y-6 text-left">
              <h3 
                className="text-[24px] font-bold text-[#111827] flex items-center gap-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="w-2.5 h-5 bg-[#F5A623] rounded-full animate-pulse" />
                For Workers
              </h3>
              
              <ul className="space-y-4">
                {workerPoints.map((point, idx) => (
                  <li 
                    key={idx} 
                    className={`p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-default ${
                      hoveredWorkerIdx === idx 
                        ? "border-[#F5A623]/40 bg-[#FEF3DC]/30 shadow-xs" 
                        : "border-transparent bg-white/40"
                    }`}
                    onMouseEnter={() => setHoveredWorkerIdx(idx)}
                    onMouseLeave={() => setHoveredWorkerIdx(null)}
                  >
                    <svg className="w-5 h-5 text-[#1A6B47] shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div className="space-y-1">
                      <span className="text-[15px] font-bold text-[#374151] block leading-tight">{point.title}</span>
                      <span className="text-[12px] text-[#6B7280] block leading-relaxed">{point.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: For Banks/Lenders */}
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex flex-col justify-between hover:translate-y-[-2px] hover:shadow-md transition-all duration-300">
            <div className="space-y-6 text-left">
              <h3 
                className="text-[24px] font-bold text-[#111827] flex items-center gap-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="w-2.5 h-5 bg-[#1A6B47] rounded-full animate-pulse" />
                For Banks & Lenders
              </h3>
              
              <ul className="space-y-4">
                {lenderPoints.map((point, idx) => (
                  <li 
                    key={idx} 
                    className={`p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-default ${
                      hoveredLenderIdx === idx 
                        ? "border-[#1A6B47]/40 bg-[#E8F5EF]/30 shadow-xs" 
                        : "border-transparent bg-white/40"
                    }`}
                    onMouseEnter={() => setHoveredLenderIdx(idx)}
                    onMouseLeave={() => setHoveredLenderIdx(null)}
                  >
                    <svg className="w-5 h-5 text-[#1A6B47] shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div className="space-y-1">
                      <span className="text-[15px] font-bold text-[#374151] block leading-tight">{point.title}</span>
                      <span className="text-[12px] text-[#6B7280] block leading-relaxed">{point.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
