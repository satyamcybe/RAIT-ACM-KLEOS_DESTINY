"use client";

import { QrCode, ShieldCheck } from "lucide-react";

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
          {/* Column 1: Passport Card (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-full max-w-[360px] group">
              <div className="relative bg-gradient-to-br from-[#1A6B47] to-[#0D3D28] rounded-[20px] p-6 text-white w-full border border-white/5 overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_rgba(26,107,71,0.25)] hover:scale-[1.02] transition-all duration-500">
                {/* Glassmorphism glow decorators */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-500" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#2ECC8F] rounded-full filter blur-2xl opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />

                {/* Floating verified stamp */}
                <div className="absolute top-4 right-4 glassmorphism rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 z-20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2ECC8F] animate-pulse" />
                  <span className="text-[9px] font-bold text-white/90 uppercase tracking-wider">Active</span>
                </div>

                {/* Top Row */}
                <div className="flex items-start gap-3 relative z-10">
                  <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border border-white/15">
                    RK
                  </div>
                  <div>
                    <div className="font-bold text-base tracking-tight">
                      Ramesh Kumar
                    </div>
                    <div className="text-xs text-emerald-300 font-medium">
                      Delivery Partner
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 my-5" />

                {/* Verification Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-5 relative z-10">
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
                      Aadhaar
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      ✓ Verified
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
                      eShram
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      ✓ Verified
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
                      UAN
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      1005-XXXX-1234
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">
                      DigiLocker
                    </div>
                    <div className="text-xs font-semibold text-white mt-0.5">
                      ✓ Connected
                    </div>
                  </div>
                </div>

                {/* Trust Score Mini Ring */}
                <div className="flex items-center gap-4 bg-white/5 rounded-xl p-3 border border-white/10 mb-4 relative z-10">
                  <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                    <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-white/10"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-[#2ECC8F]"
                        strokeWidth="3"
                        strokeDasharray="85, 100"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="text-[12px] font-bold text-white">847</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Pramaan Score</div>
                    <div className="text-[12px] font-semibold text-white/80">Excellent — Top 15%</div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between text-[11px] text-emerald-300/80 border-t border-white/10 pt-4 relative z-10">
                  <span className="font-medium">PRAMAAN TRUST ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono tracking-wider">
                      PRAMAAN-2026-RK
                    </span>
                    <QrCode size={16} className="text-white" />
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

        {/* Divider & Supported Uses */}
        <div className="border-t border-[#E5E7EB] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
          <div className="text-left space-y-1">
            <span className="text-[12px] font-bold text-[#1A6B47] uppercase tracking-wider">Accepted Nationwide</span>
            <h4 className="text-[15px] font-bold text-[#111827]">Where can you use your PRAMAAN passport?</h4>
          </div>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {[
              "Bank Loan Applications",
              "Rental Agreements",
              "Welfare & Insurance"
            ].map((use, idx) => (
              <span
                key={idx}
                className="text-[13px] font-semibold bg-white border border-[#E5E7EB] px-4 py-2 rounded-full shadow-xs text-[#374151] hover:border-[#1A6B47]/30 hover:text-[#1A6B47] transition-all cursor-default"
              >
                {use}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
