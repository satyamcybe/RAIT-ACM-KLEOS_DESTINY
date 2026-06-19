"use client";

import { useState } from "react";

export default function InstitutionsSection() {
  const [hoveredWorkerIdx, setHoveredWorkerIdx] = useState<number | null>(null);
  const [hoveredLenderIdx, setHoveredLenderIdx] = useState<number | null>(null);

  const workerPoints = [
    {
      title: "Instant & Free",
      desc: "Generate your credential in under 2 minutes with zero platform fees, ever.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      title: "Accessible Anywhere",
      desc: "No apps required. Access and share your credentials instantly via WhatsApp or web link.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    },
    {
      title: "Complete Data Control",
      desc: "Built on standard consent principles. You decide who sees your score and when.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
  ];

  const lenderPoints = [
    {
      title: "Tamper-Proof Verification",
      desc: "Cryptographically signed credentials that prevent spoofing and profile tampering.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: "Automated Ledger Flows",
      desc: "Direct bank data streams via RBI's Account Aggregator with zero manual uploads.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      ),
    },
    {
      title: "Turnkey API Integration",
      desc: "Deploy structured verification widgets in 1 day using our REST API and webhooks.",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="institutions"
      className="py-24 bg-white border-b border-[#E5E7EB] select-none"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block text-[11px] font-bold text-[#1A6B47] uppercase tracking-[0.15em] bg-[#E8F5EF] px-4 py-1.5 rounded-full border border-[#1A6B47]/15">
            Two Sides of Trust
          </span>
          <h2
            className="text-3xl md:text-[40px] font-bold text-[#111827] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Built for Everyone to Trust
          </h2>
          <p
            className="text-[#6B7280] text-[15px] leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            One platform. Two sides of trust. Workers get proof. Institutions get verified data.
          </p>
        </div>

        {/* 2 Columns Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column: For Workers */}
          <div className="bg-gradient-to-br from-white to-[#F9FAFB] border border-[#E5E7EB] rounded-[20px] p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-[#F5A623]/20 transition-all duration-300 group">
            <div className="space-y-7 text-left">
              {/* Header with icon */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FEF3DC] flex items-center justify-center text-[#F5A623] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-[22px] font-bold text-[#111827]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    For Workers
                  </h3>
                  <p className="text-[12px] text-[#6B7280] font-medium">
                    Get your work recognized
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {workerPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 cursor-default ${
                      hoveredWorkerIdx === idx
                        ? "border-[#F5A623]/50 bg-[#FEF3DC]/40 shadow-sm border-l-[3px] border-l-[#F5A623]"
                        : "border-[#E5E7EB] bg-white hover:border-[#F5A623]/30"
                    }`}
                    onMouseEnter={() => setHoveredWorkerIdx(idx)}
                    onMouseLeave={() => setHoveredWorkerIdx(null)}
                  >
                    {/* Icon indicator */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                        hoveredWorkerIdx === idx
                          ? "bg-[#F5A623] text-white scale-105"
                          : "bg-[#FEF3DC] text-[#F5A623]"
                      }`}
                    >
                      {point.icon}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[15px] font-bold text-[#374151] block leading-tight">
                        {point.title}
                      </span>
                      <span className="text-[12px] text-[#6B7280] block leading-relaxed">
                        {point.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: For Banks/Lenders */}
          <div className="bg-gradient-to-br from-white to-[#F9FAFB] border border-[#E5E7EB] rounded-[20px] p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 hover:border-[#1A6B47]/20 transition-all duration-300 group">
            <div className="space-y-7 text-left">
              {/* Header with icon */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5EF] flex items-center justify-center text-[#1A6B47] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <line x1="5" y1="11" x2="5" y2="21" />
                    <line x1="12" y1="11" x2="12" y2="21" />
                    <line x1="19" y1="11" x2="19" y2="21" />
                    <polygon points="12,3 3,11 21,11" />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-[22px] font-bold text-[#111827]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    For Banks & Lenders
                  </h3>
                  <p className="text-[12px] text-[#6B7280] font-medium">
                    Verify trust instantly
                  </p>
                </div>
              </div>

              <ul className="space-y-3">
                {lenderPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 cursor-default ${
                      hoveredLenderIdx === idx
                        ? "border-[#1A6B47]/50 bg-[#E8F5EF]/30 shadow-sm border-l-[3px] border-l-[#1A6B47]"
                        : "border-[#E5E7EB] bg-white hover:border-[#1A6B47]/30"
                    }`}
                    onMouseEnter={() => setHoveredLenderIdx(idx)}
                    onMouseLeave={() => setHoveredLenderIdx(null)}
                  >
                    {/* Icon indicator */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                        hoveredLenderIdx === idx
                          ? "bg-[#1A6B47] text-white scale-105"
                          : "bg-[#E8F5EF] text-[#1A6B47]"
                      }`}
                    >
                      {point.icon}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[15px] font-bold text-[#374151] block leading-tight">
                        {point.title}
                      </span>
                      <span className="text-[12px] text-[#6B7280] block leading-relaxed">
                        {point.desc}
                      </span>
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
