"use client";

import { QrCode, ShieldCheck } from "lucide-react";

export default function LabourPassportSection() {
  const verifiedFacts = [
    {
      label: "Identity",
      val: "DigiLocker + Aadhaar",
      source: "DigiLocker API",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      label: "Platform",
      val: "Zomato Technologies",
      source: "e-Shram DB Sync",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      label: "Tenure",
      val: "44 months",
      source: "Account Aggregator AA",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      label: "Income",
      val: "₹18,246/mo avg",
      source: "Account Aggregator AA",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      label: "Consistency",
      val: "97.4%",
      source: "Account Aggregator AA",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      label: "Est. Deliveries",
      val: "3,800–5,700",
      source: "Account Aggregator AA",
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
  ];

  const acceptedUses = [
    {
      label: "Bank loan applications",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="5" y1="11" x2="5" y2="21" />
          <line x1="12" y1="11" x2="12" y2="21" />
          <line x1="19" y1="11" x2="19" y2="21" />
          <polygon points="12,3 3,11 21,11" />
        </svg>
      ),
    },
    {
      label: "Rental agreements",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: "Government welfare schemes",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      label: "Insurance applications",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
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
            Credential Preview
          </span>
          <h2
            className="text-3xl md:text-[40px] font-bold text-[#111827] tracking-tight leading-[1.15]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What Your PRAMAAN <br className="hidden md:block" />
            Credential Contains
          </h2>
          <p
            className="text-[#6B7280] text-[15px] leading-relaxed max-w-md mx-auto"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            A cryptographically signed, machine-verifiable credential you own and control.
          </p>
        </div>

        {/* Three Columns Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          {/* Column 1: Passport Card (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-center w-full">
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

          {/* Column 2: Facts Grid (Span 5) */}
          <div className="lg:col-span-5 w-full space-y-5">
            <h3
              className="text-xl font-bold text-[#111827] text-left flex items-center gap-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <ShieldCheck size={20} className="text-[#1A6B47]" />
              Verified Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {verifiedFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-start gap-3 text-left hover:border-[#1A6B47]/40 hover:shadow-md transition-all duration-300 relative group card-accent-left"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-lg bg-[#E8F5EF] flex items-center justify-center text-[#1A6B47] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {fact.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wider block">
                      {fact.label}
                    </span>
                    <span className="text-[14px] text-[#111827] font-bold mt-0.5 block truncate">
                      {fact.val}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-[#0D3D28] text-white text-[9px] font-mono px-2.5 py-1 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                    Source: {fact.source}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Accepted Uses (Span 3) */}
          <div className="lg:col-span-3 space-y-5 text-left lg:pt-0">
            <h3
              className="text-xl font-bold text-[#111827] flex items-center gap-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <svg className="w-5 h-5 text-[#1A6B47]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
              Accepted for
            </h3>

            {/* Mini-Cards */}
            <div className="space-y-3">
              {acceptedUses.map((use, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-3.5 flex items-center gap-3 group hover:border-[#1A6B47]/40 hover:shadow-sm transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E8F5EF] flex items-center justify-center text-[#1A6B47] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {use.icon}
                  </div>
                  <span
                    className="text-[14px] font-semibold text-[#374151]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {use.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
