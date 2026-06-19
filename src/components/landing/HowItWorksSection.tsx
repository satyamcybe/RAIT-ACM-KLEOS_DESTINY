"use client";

import { useState, useEffect } from "react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [simProgress, setSimProgress] = useState(0);

  // Auto-progress simulation for active step
  useEffect(() => {
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 150);
    return () => clearInterval(interval);
  }, [activeStep]);

  const steps = [
    {
      title: "Verify Identity",
      desc: "Connect DigiLocker + e-Shram UAN in minutes. Aadhaar-seeded, government-verified.",
      badge: "Layer 1: Identity",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      accentBg: "bg-blue-50",
      accentText: "text-blue-600",
      icon: (
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="11" r="2.5" />
          <path d="M5 17c0-2 2-3 4-3s4 1 4 3" />
          <circle cx="17" cy="16.5" r="2.5" fill="#2563EB" stroke="none" />
          <path d="M16 16.5l.5.5 1-1" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      )
    },
    {
      title: "Prove Your Income",
      desc: "Link your bank account via India's Account Aggregator framework. RBI-regulated, tamper-proof.",
      badge: "Layer 2: Financial",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
      accentBg: "bg-purple-50",
      accentText: "text-purple-600",
      icon: (
        <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="5" y1="11" x2="5" y2="21" />
          <line x1="12" y1="11" x2="12" y2="21" />
          <line x1="19" y1="11" x2="19" y2="21" />
          <polygon points="12,3 3,11 21,11" />
        </svg>
      )
    },
    {
      title: "Get Your Credential",
      desc: "Receive a signed, verifiable PRAMAAN credential. Share with banks, landlords, welfare schemes.",
      badge: "Layer 3: Credential",
      badgeClass: "bg-[#E8F5EF] text-[#1A6B47] border-[#1A6B47]/20",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
      icon: (
        <svg className="w-6 h-6 text-[#1A6B47]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="8" y1="8" x2="16" y2="8" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <polygon points="12,14 13.5,17 17,17.5 14.5,19.5 15,23 12,21.5 9,23 9.5,19.5 7,17.5 10.5,17" fill="#1A6B47" stroke="none" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-20 bg-white border-b border-[#E5E7EB] select-none"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        
        {/* PART 1: THE PROBLEM COMPARISON DASHBOARD */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 
              className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The Problem No One Talks About
            </h2>
            <p className="text-[#6B7280] text-[15px] mt-2">
              Gig workers complete thousands of tasks, but their track record is invisible to lenders.
            </p>
          </div>

          {/* Interactive Split Panels Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Panel A: Locked Corporate Silos (Red Accent) */}
            <div className="bg-[#FFFFFF] border-2 border-red-100 hover:border-red-300 rounded-[16px] p-6 shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-300 relative group">
              <div className="absolute top-0 right-0 bg-red-50 text-red-700 text-[10px] font-bold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                Corporate Silos
              </div>
              
              <div className="space-y-4 text-left pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-[#111827] text-[16px]">Raju&apos;s Locked Work History</h4>
                </div>

                <div className="space-y-2 text-[#374151] text-[14px]">
                  <p className="leading-relaxed">
                    Completed <strong>4,000 deliveries</strong> over 3 years. Maintained a <strong>4.8 rating</strong> and 98% on-time completion.
                  </p>
                  
                  <div className="bg-red-50/50 border border-red-100 rounded-lg p-3 text-[12px] text-red-800 font-mono">
                    Bank sees only: <span className="font-semibold block mt-1 text-[#111827]">&quot;Weekly transfer from Zomato Technologies&quot;</span>
                  </div>

                  <p className="text-[12px] text-[#6B7280]">
                    No ratings visible. No delivery count. Tenure invisible. Loan rejected. Apartment lease denied.
                  </p>
                </div>
              </div>

              <div className="border-t border-red-100 pt-4 mt-6 text-left">
                <span className="text-[13px] font-bold text-red-600 uppercase tracking-wider">
                  Result: Invisible to Banks & Lenders
                </span>
              </div>
            </div>

            {/* Panel B: PRAMAAN Reputation Passport (Green Accent) */}
            <div className="bg-[#FFFFFF] border-2 border-[#E8F5EF] hover:border-[#2ECC8F] rounded-[16px] p-6 shadow-sm flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-300 relative group">
              <div className="absolute top-0 right-0 bg-[#E8F5EF] text-[#1A6B47] text-[10px] font-bold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider">
                PRAMAAN Unlocked
              </div>
              
              <div className="space-y-4 text-left pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5EF] flex items-center justify-center text-[#1A6B47]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-[#111827] text-[16px]">PRAMAAN Verified Credentials</h4>
                </div>

                <div className="space-y-2 text-[#374151] text-[14px]">
                  <p className="leading-relaxed">
                    Unlocks verified metrics direct from e-Shram, bank ledgers, and consent-based frameworks.
                  </p>
                  
                  <div className="bg-[#E8F5EF]/50 border border-[#2ECC8F]/30 rounded-lg p-3 text-[12px] text-[#1A6B47] font-mono flex items-center justify-between">
                    <span>Tenure, Rating, Consistency:</span>
                    <span className="font-bold bg-[#2ECC8F] text-white px-1.5 py-0.5 rounded text-[10px]">VERIFIED</span>
                  </div>

                  <p className="text-[12px] text-[#6B7280]">
                    Pramaan Score calculated at 847/1000. Verified income history. Machine-verifiable data formats.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#E8F5EF] pt-4 mt-6 text-left">
                <span className="text-[13px] font-bold text-[#1A6B47] uppercase tracking-wider">
                  Result: Portable, Bank-Grade Trust
                </span>
              </div>
            </div>

          </div>

          {/* Interactive Arrow Banner */}
          <div className="text-center pt-4 flex flex-col items-center gap-1.5">
            <span className="text-[13px] font-bold text-[#1A6B47] uppercase tracking-widest">
              PRAMAAN Unlocks It
            </span>
            <svg className="w-5 h-5 text-[#1A6B47] animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19,12 12,19 5,12" />
            </svg>
          </div>
        </div>

        {/* PART 2: THE 3-STEP CREDENTIAL PIPELINE */}
        <div id="for-workers" className="space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h3 
              className="text-2xl md:text-[28px] font-bold text-[#111827] tracking-tight"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              How It Works
            </h3>
            <p className="text-[#6B7280] text-[14px] mt-1">
              Verify your reputation in three clear steps. Click a step to simulate.
            </p>
          </div>

          {/* 2-Column Split: Steps stacked left, Interactive simulator screen right */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 max-w-5xl mx-auto items-start">
            
            {/* Left Steps stack */}
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`border rounded-[16px] p-6 transition-all duration-300 flex items-start gap-4 cursor-pointer text-left ${
                    activeStep === idx 
                      ? "border-[#1A6B47] bg-[#E8F5EF]/30 shadow-md translate-x-1" 
                      : "border-[#E5E7EB] bg-white hover:border-[#1A6B47]/40 hover:bg-[#F9FAFB]"
                  }`}
                >
                  {/* Step Index Circle */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 mt-0.5 ${
                    activeStep === idx ? "bg-[#1A6B47] text-white" : "bg-[#F3F4F6] text-[#6B7280]"
                  }`}>
                    {idx + 1}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${step.badgeClass}`}>
                        {step.badge}
                      </span>
                    </div>
                    <h4 className="text-[16px] font-bold text-[#111827]" style={{ fontFamily: "var(--font-sans)" }}>
                      {step.title}
                    </h4>
                    <p className="text-[13px] text-[#6B7280] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Live Simulator View */}
            <div className="bg-[#0D3D28] text-white rounded-[20px] p-6 shadow-2xl border border-white/10 relative overflow-hidden h-[330px] flex flex-col justify-between">
              {/* Background accent glow */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-[#1A6B47]/20 -top-12 -right-12 blur-2xl" />
              
              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/15 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC8F] animate-pulse" />
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest font-semibold">
                    Live verification pipe
                  </span>
                </div>
                <div className="text-[10px] font-mono text-white/50">
                  Step {activeStep + 1} of 3
                </div>
              </div>

              {/* Simulator Screen body */}
              <div className="flex-1 py-4 flex flex-col justify-center relative z-10 font-sans text-left">
                
                {/* Active Step 0: Identity verification view */}
                {activeStep === 0 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <div className="text-[11px] text-white/60 uppercase font-bold tracking-wider">Linking secure sources</div>
                      <div className="text-[15px] font-bold">Aadhaar e-KYC + e-Shram Registry</div>
                    </div>

                    <div className="bg-black/30 rounded-lg p-3.5 space-y-2 border border-white/5 font-mono text-[11px]">
                      <div className="flex justify-between items-center text-white/70">
                        <span>Initiating secure tunnel...</span>
                        <span className="text-[#2ECC8F]">ESTABLISHED</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Aadhaar data signature:</span>
                        <span className="font-bold text-[#F5A623]">VERIFIED</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>e-Shram UAN mapping:</span>
                        <span className="font-bold text-[#2ECC8F]">OK (7844xxxx)</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-white/60">
                        <span>Syncing profile data</span>
                        <span>{simProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#2ECC8F] transition-all duration-150 ease-out" 
                          style={{ width: `${simProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Step 1: Prove Your Income view */}
                {activeStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <div className="text-[11px] text-white/60 uppercase font-bold tracking-wider">RBI Account Aggregator</div>
                      <div className="text-[15px] font-bold">Ledger Income Consistency Analysis</div>
                    </div>

                    <div className="grid grid-cols-6 gap-2 h-16 items-end pt-2 px-2 border-b border-white/10">
                      {[40, 60, 55, 85, 90, 75].map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end">
                          <div 
                            className="w-full bg-[#2ECC8F]/80 rounded-t-sm transition-all duration-500 ease-out" 
                            style={{ height: `${(val * simProgress) / 100}%` }}
                          />
                          <span className="text-[9px] font-mono text-white/40">{["N", "D", "J", "F", "M", "A"][idx]}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-black/30 rounded-lg p-2.5 flex justify-between items-center border border-white/5 font-mono text-[11px]">
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[10px]">INCOME CONSISTENCY</span>
                        <span className="font-bold text-[#F5A623] text-[13px] mt-0.5">97.4% High Stability</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#2ECC8F] font-bold block text-[10px]">CONSENT REGISTERED</span>
                        <span className="text-white/40 text-[9px]">Setu AA Pipeline</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Step 2: Get Your Credential view */}
                {activeStep === 2 && (
                  <div className="space-y-3 animate-fadeIn flex flex-col justify-center">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                      {/* Sub-logo stamp placeholder */}
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-[15px] font-black text-[#1A6B47] leading-none">प्र</span>
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="text-[13px] font-bold truncate">PRAMAAN Credential Generated</div>
                        <div className="text-[10px] text-white/50 truncate">Cryptographically Signed</div>
                      </div>
                      <span className="badge-verified bg-[#2ECC8F]/20 text-[#2ECC8F] border-[#2ECC8F]/30 text-[9px] font-bold px-2 py-0.5">
                        ACTIVE
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[12px] pt-1">
                      <span className="text-white/60">Signature Key:</span>
                      <span className="font-mono text-white/80 bg-white/5 px-2 py-0.5 rounded text-[10px]">PRNM-SHA256-HEX</span>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <button className="flex-1 bg-[#1A6B47] hover:bg-[#1A6B47]/80 border border-white/10 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer text-center">
                        View Passport Details
                      </button>
                      <button className="flex-1 bg-white text-[#0D3D28] hover:bg-white/90 py-2 rounded-lg font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer text-center">
                        Copy Secure Share Link
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-[10px] font-mono text-white/40 relative z-10">
                <span>Secure API Protocol v1.2</span>
                <span>SHA-256 Validated</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
