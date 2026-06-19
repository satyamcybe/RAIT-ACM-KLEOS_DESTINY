"use client";

import { QrCode } from "lucide-react";

export default function LabourPassportSection() {
  const trustFactors = [
    {
      title: "Government-Verified Identity Link",
      desc: "Securely maps e-Shram UAN and DigiLocker parameters. Cryptographically matches identity to prevent fraud or profile tampering.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      )
    },
    {
      title: "RBI-Regulated Income Consent",
      desc: "Connects transaction ledger flows directly via the Setu Account Aggregator, proving real earning stability and consistency.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "Machine-Verifiable Portability",
      desc: "Generates W3C-compliant credentials signed by Pramaan. Share instantly with any bank or landlord via a secure QR code.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="8" y1="8" x2="16" y2="8" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="8" y1="16" x2="14" y2="16" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="credential-preview"
      className="py-24 bg-[#F9FAFB] border-b border-[#E5E7EB] select-none"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="inline-block text-[11px] font-bold text-[#1A6B47] uppercase tracking-[0.15em] bg-[#E8F5EF] px-4 py-1.5 rounded-full border border-[#1A6B47]/15">
            Why Pramaan Credentials?
          </span>
          <h2
            className="text-3xl md:text-[40px] font-bold text-[#111827] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Designed for Portable Trust
          </h2>
          <p
            className="text-[#6B7280] text-[15px] leading-relaxed max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Your digital footprint, converted into machine-readable reputation that any institution can verify instantly.
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          {/* Column 1: Passport Card (Span 5) - Real Horizontal Rectangular Card Shape */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-full max-w-[400px] aspect-[1.6/1] group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A6B47] to-[#0D3D28] rounded-[24px] p-6 text-white border border-white/10 overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_rgba(26,107,71,0.25)] hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between">
                
                {/* Sheen & Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-500 pointer-events-none" />
                
                {/* Top Row: Brand Header & Status Label */}
                <div className="flex justify-between items-start z-10">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-300 font-bold">PRAMAAN TRUST NETWORK</span>
                    <span className="text-[11px] font-bold text-white/80 uppercase">Professional Passport</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2ECC8F] animate-pulse" />
                    <span className="text-[9px] font-bold tracking-wider uppercase text-white/90">ACTIVE</span>
                  </div>
                </div>

                {/* Chip & Trust Score Middle Row */}
                <div className="flex justify-between items-center z-10 my-1">
                  {/* Smart Card Chip */}
                  <div className="w-12 h-9 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 rounded-md relative shadow-md border border-amber-600/20 overflow-hidden">
                    <div className="absolute inset-x-0 top-3 h-px bg-amber-900/10" />
                    <div className="absolute inset-x-0 bottom-3 h-px bg-amber-900/10" />
                    <div className="absolute inset-y-0 left-4 w-px bg-amber-900/10" />
                    <div className="absolute inset-y-0 right-4 w-px bg-amber-900/10" />
                  </div>
                  
                  {/* Trust Score badge */}
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl py-1.5 px-3 border border-white/10">
                    <span className="text-[15px] font-black text-white">847</span>
                    <span className="text-[8px] font-mono uppercase text-emerald-300 leading-none">PRAMAAN<br/>SCORE</span>
                  </div>
                </div>

                {/* Bottom Row: Holder Details & QR code */}
                <div className="flex justify-between items-end z-10 border-t border-white/10 pt-3">
                  <div className="text-left space-y-0.5">
                    <div className="text-[14px] font-bold tracking-wider text-white uppercase">
                      Ramesh Kumar
                    </div>
                    <div className="text-[10px] font-mono text-emerald-300/80">
                      ID: PRMN-2026-8840
                    </div>
                    <div className="text-[9px] text-white/60">
                      eShram & AA Verified
                    </div>
                  </div>
                  <div className="bg-white p-1 rounded-lg shadow-sm shrink-0">
                    <QrCode size={36} className="text-[#0D3D28]" />
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Column 2: 3 High-Impact Trust Anchors (Span 7) */}
          <div className="lg:col-span-7 w-full space-y-6 text-left">
            {trustFactors.map((factor, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 flex items-start gap-4 hover:border-[#1A6B47]/40 hover:shadow-md transition-all duration-300 relative group card-accent-left"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#E8F5EF] flex items-center justify-center text-[#1A6B47] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  {factor.icon}
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4
                    className="text-[16px] font-bold text-[#111827] leading-tight"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {factor.title}
                  </h4>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">
                    {factor.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
