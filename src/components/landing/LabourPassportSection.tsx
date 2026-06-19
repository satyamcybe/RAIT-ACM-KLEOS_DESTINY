"use client";

import { QrCode, ShieldCheck } from "lucide-react";

export default function LabourPassportSection() {
  const verifiedFacts = [
    { label: "Identity", val: "DigiLocker + Aadhaar" },
    { label: "Platform", val: "Zomato Technologies" },
    { label: "Tenure", val: "44 months" },
    { label: "Income", val: "₹18,246/mo avg" },
    { label: "Consistency", val: "97.4%" },
    { label: "Est. Deliveries", val: "3,800–5,700" }
  ];

  const acceptedUses = [
    "Bank loan applications",
    "Rental agreements",
    "Government welfare schemes",
    "Insurance applications"
  ];



  return (
    <section 
      id="credential-preview"
      className="py-20 bg-white border-b border-[#E5E7EB] select-none"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 
            className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            What Your Pranam Credential Contains
          </h2>
        </div>

        {/* Three Columns Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Column 1: Passport Card (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-center w-full">
            {/* Live Ramesh Kumar verified credential passport card */}
            <div className="w-full max-w-[360px] drop-shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="bg-gradient-to-br from-[#1A6B47] to-[#0D3D28] rounded-[20px] p-6 text-white w-full border border-white/5 relative overflow-hidden shadow-2xl">
                {/* Background glow decorator */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400 rounded-full mix-blend-screen filter blur-2xl opacity-20 pointer-events-none"></div>
                
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/10 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border border-white/15">
                      RK
                    </div>
                    <div>
                      <div className="font-bold text-base tracking-tight">Ramesh Kumar</div>
                      <div className="text-xs text-emerald-300 font-medium">Delivery Partner</div>
                    </div>
                  </div>
                  <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full px-3 py-1 text-[11px] font-bold flex items-center gap-1">
                    <ShieldCheck size={12} />
                    Verified
                  </div>
                </div>

                <div className="border-t border-white/10 my-5" />

                {/* Verification Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-5">
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Aadhaar</div>
                    <div className="text-xs font-semibold text-white mt-0.5">✓ Verified</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">eShram</div>
                    <div className="text-xs font-semibold text-white mt-0.5">✓ Verified</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">UAN</div>
                    <div className="text-xs font-semibold text-white mt-0.5">1005-XXXX-1234</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">DigiLocker</div>
                    <div className="text-xs font-semibold text-white mt-0.5">✓ Connected</div>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="flex items-center justify-between text-[11px] text-emerald-300/80 border-t border-white/10 pt-4">
                  <span className="font-medium">PRANAM TRUST ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono tracking-wider">PRANAM-2026-RK</span>
                    <QrCode size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Facts Grid (Span 5) */}
          <div className="lg:col-span-5 w-full space-y-6">
            <h3 
              className="text-xl font-bold text-[#111827] text-left"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Verified Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {verifiedFacts.map((fact, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 flex flex-col items-start text-left hover:border-[#1A6B47]/40 hover:bg-[#E8F5EF]/20 hover:shadow-xs transition-all duration-300 relative group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#059669] shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="6" fill="#E8F5EF" />
                      <path d="M5.5 8L7 9.5L10.5 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wider">{fact.label}</span>
                  </div>
                  <span className="text-[14px] text-[#111827] font-bold mt-2">{fact.val}</span>
                  
                  {/* Subtle tooltip revealing verification source on hover */}
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#0D3D28] text-white text-[9px] font-mono px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                    Source: {fact.label === "Identity" ? "DigiLocker API" : fact.label === "Platform" ? "e-Shram DB Sync" : "Account Aggregator AA"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Accepted Uses List (Span 3) */}
          <div className="lg:col-span-3 space-y-6 text-left lg:pt-0">
            <h3 
              className="text-xl font-bold text-[#111827]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Accepted for:
            </h3>

            {/* Checklist */}
            <div className="space-y-4">
              {acceptedUses.map((use, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <svg className="w-6 h-6 text-[#1A6B47] shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" fill="#E8F5EF" stroke="none" />
                    <polyline points="7.5,12 10.5,15 16.5,9" />
                  </svg>
                  <span 
                    className="text-[15px] font-semibold text-[#374151]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {use}
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
