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

  const problems = [
    {
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      stat: "4,000+",
      title: "Deliveries Locked in Silos",
      desc: "Raju completed 4,000+ deliveries over 3 years. But Zomato, Swiggy, and Uber own that data — not him. His entire work history is invisible.",
      accentColor: "#EF4444",
      accentBg: "bg-red-50",
      accentText: "text-red-600",
    },
    {
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        </svg>
      ),
      stat: "₹0",
      title: "Credit Score for Gig Workers",
      desc: "Banks see only \"weekly transfer from Zomato Technologies.\" No ratings, no delivery count, no tenure. Traditional credit scoring simply doesn't work.",
      accentColor: "#F59E0B",
      accentBg: "bg-amber-50",
      accentText: "text-amber-600",
    },
    {
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      stat: "78%",
      title: "Loan Applications Rejected",
      desc: "Without portable proof of income, consistency, and reliability — gig workers are systematically excluded from loans, rentals, and welfare schemes.",
      accentColor: "#8B5CF6",
      accentBg: "bg-purple-50",
      accentText: "text-purple-600",
    },
  ];

  const steps = [
    {
      title: "Verify Identity",
      desc: "Connect DigiLocker + e-Shram UAN in minutes. Aadhaar-seeded, government-verified.",
      badge: "Layer 1: Identity",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      accentBg: "bg-blue-50",
      accentText: "text-blue-600",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="11" r="2.5" />
          <path d="M5 17c0-2 2-3 4-3s4 1 4 3" />
          <circle cx="17" cy="16.5" r="2.5" fill="#2563EB" stroke="none" />
          <path d="M16 16.5l.5.5 1-1" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      title: "Prove Your Income",
      desc: "Link your bank account via India's Account Aggregator framework. RBI-regulated, tamper-proof.",
      badge: "Layer 2: Financial",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
      accentBg: "bg-purple-50",
      accentText: "text-purple-600",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="5" y1="11" x2="5" y2="21" />
          <line x1="12" y1="11" x2="12" y2="21" />
          <line x1="19" y1="11" x2="19" y2="21" />
          <polygon points="12,3 3,11 21,11" />
        </svg>
      ),
    },
    {
      title: "Get Your Credential",
      desc: "Receive a signed, verifiable PRAMAAN credential. Share with banks, landlords, welfare schemes.",
      badge: "Layer 3: Credential",
      badgeClass: "bg-[#E8F5EF] text-[#1A6B47] border-[#1A6B47]/20",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="8" y1="8" x2="16" y2="8" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <polygon points="12,14 13.5,17 17,17.5 14.5,19.5 15,23 12,21.5 9,23 9.5,19.5 7,17.5 10.5,17" fill="#1A6B47" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-white border-b border-[#E5E7EB] select-none"
    >
      <div className="max-w-6xl mx-auto px-6 space-y-28">
        {/* =====================================================
            PART 1: THE PROBLEM — Premium Card Grid
           ===================================================== */}
        <div className="space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block text-[11px] font-bold text-[#1A6B47] uppercase tracking-[0.15em] bg-[#E8F5EF] px-4 py-1.5 rounded-full border border-[#1A6B47]/15">
              The Invisible Crisis
            </span>
            <h2
              className="text-3xl md:text-[40px] font-bold text-[#111827] tracking-tight leading-[1.15]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              The Problem No One <br className="hidden md:block" />
              Talks About
            </h2>
            <p
              className="text-[#6B7280] text-[15px] leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Gig workers complete thousands of tasks, but their track record is invisible to lenders, landlords, and institutions.
            </p>
          </div>

          {/* 3-Card Problem Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {problems.map((problem, idx) => (
              <div
                key={idx}
                className="group relative bg-white border border-[#E5E7EB] rounded-[20px] p-7 flex flex-col gap-5 hover:border-[#1A6B47]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E8F5EF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]" />

                {/* Icon Circle */}
                <div
                  className={`w-14 h-14 rounded-2xl ${problem.accentBg} ${problem.accentText} flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-300`}
                >
                  {problem.icon}
                </div>

                {/* Stat Headline */}
                <div className="relative z-10">
                  <span
                    className="text-[36px] md:text-[42px] font-black tracking-tight leading-none"
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: problem.accentColor,
                    }}
                  >
                    {problem.stat}
                  </span>
                </div>

                {/* Title */}
                <h4
                  className="text-[17px] font-bold text-[#111827] leading-snug relative z-10"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {problem.title}
                </h4>

                {/* Description */}
                <p className="text-[13px] text-[#6B7280] leading-relaxed relative z-10 flex-1">
                  {problem.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="h-[3px] w-12 rounded-full transition-all duration-300 group-hover:w-20"
                  style={{ backgroundColor: problem.accentColor }}
                />
              </div>
            ))}
          </div>

          {/* Transition text */}
          <div className="text-center flex flex-col items-center gap-3 pt-2">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-[#1A6B47]/40" />
            <span
              className="text-[14px] font-bold text-[#1A6B47] tracking-wide"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              PRAMAAN solves this — in 3 simple steps
            </span>
            <svg
              className="w-5 h-5 text-[#1A6B47] animate-bounce"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19,12 12,19 5,12" />
            </svg>
          </div>
        </div>

        {/* =====================================================
            PART 2: THE 3-STEP CREDENTIAL PIPELINE
           ===================================================== */}
        <div id="for-workers" className="space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="inline-block text-[11px] font-bold text-[#1A6B47] uppercase tracking-[0.15em] bg-[#E8F5EF] px-4 py-1.5 rounded-full border border-[#1A6B47]/15">
              Your Journey
            </span>
            <h3
              className="text-2xl md:text-[32px] font-bold text-[#111827] tracking-tight"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              How It Works
            </h3>
            <p className="text-[#6B7280] text-[14px] mt-1">
              Verify your reputation in three clear steps. Click a step to simulate.
            </p>
          </div>

          {/* 2-Column Split: Timeline Steps left, Interactive simulator right */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 max-w-5xl mx-auto items-start">
            {/* Left: Steps with connected timeline */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-[19px] top-[40px] bottom-[40px] w-[2px] bg-gradient-to-b from-[#1A6B47]/30 via-[#1A6B47]/20 to-[#1A6B47]/10 rounded-full hidden lg:block" />

              <div className="space-y-4 relative">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`relative rounded-[16px] p-5 pl-14 transition-all duration-300 cursor-pointer text-left border ${
                      activeStep === idx
                        ? "border-[#1A6B47] bg-[#E8F5EF]/20 shadow-md border-l-[4px]"
                        : "border-[#E5E7EB] bg-white hover:border-[#1A6B47]/40 hover:bg-[#F9FAFB]"
                    }`}
                  >
                    {/* Step Circle with Icon — sits on the timeline */}
                    <div
                      className={`absolute left-3 top-5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 z-10 ${
                        activeStep === idx
                          ? "bg-[#1A6B47] text-white shadow-lg shadow-[#1A6B47]/20"
                          : "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]"
                      }`}
                    >
                      {activeStep === idx ? (
                        step.icon
                      ) : (
                        <span className="font-bold text-[14px]">{idx + 1}</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${step.badgeClass}`}
                        >
                          {step.badge}
                        </span>
                      </div>
                      <h4
                        className="text-[16px] font-bold text-[#111827]"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {step.title}
                      </h4>
                      <p className="text-[13px] text-[#6B7280] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Simulator View */}
            <div className="bg-[#0D3D28] text-white rounded-[20px] p-6 shadow-2xl border border-white/10 relative overflow-hidden h-[360px] flex flex-col justify-between">
              {/* Background accent glow */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-[#1A6B47]/20 -top-12 -right-12 blur-2xl" />
              <div className="absolute w-[120px] h-[120px] rounded-full bg-[#2ECC8F]/10 bottom-0 left-0 blur-2xl" />

              {/* Pulsing border on active */}
              <div className="absolute inset-0 rounded-[20px] border-2 border-[#2ECC8F]/20 animate-pulse pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/15 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC8F] animate-pulse" />
                  <span className="text-[11px] font-mono text-white/70 uppercase tracking-widest font-semibold">
                    Live verification pipe
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i <= activeStep
                          ? "bg-[#2ECC8F]"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Simulator Screen body */}
              <div className="flex-1 py-4 flex flex-col justify-center relative z-10 font-sans text-left">
                {/* Active Step 0: Identity verification view */}
                {activeStep === 0 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <div className="text-[11px] text-white/60 uppercase font-bold tracking-wider">
                        Linking secure sources
                      </div>
                      <div className="text-[15px] font-bold">
                        Aadhaar e-KYC + e-Shram Registry
                      </div>
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
                        <span className="font-bold text-[#2ECC8F]">
                          OK (7844xxxx)
                        </span>
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
                      <div className="text-[11px] text-white/60 uppercase font-bold tracking-wider">
                        RBI Account Aggregator
                      </div>
                      <div className="text-[15px] font-bold">
                        Ledger Income Consistency Analysis
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-2 h-16 items-end pt-2 px-2 border-b border-white/10">
                      {[40, 60, 55, 85, 90, 75].map((val, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center gap-1 h-full justify-end"
                        >
                          <div
                            className="w-full bg-[#2ECC8F]/80 rounded-t-sm transition-all duration-500 ease-out"
                            style={{
                              height: `${(val * simProgress) / 100}%`,
                            }}
                          />
                          <span className="text-[9px] font-mono text-white/40">
                            {["N", "D", "J", "F", "M", "A"][idx]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-black/30 rounded-lg p-2.5 flex justify-between items-center border border-white/5 font-mono text-[11px]">
                      <div className="flex flex-col">
                        <span className="text-white/50 text-[10px]">
                          INCOME CONSISTENCY
                        </span>
                        <span className="font-bold text-[#F5A623] text-[13px] mt-0.5">
                          97.4% High Stability
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#2ECC8F] font-bold block text-[10px]">
                          CONSENT REGISTERED
                        </span>
                        <span className="text-white/40 text-[9px]">
                          Setu AA Pipeline
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Step 2: Get Your Credential view */}
                {activeStep === 2 && (
                  <div className="space-y-3 animate-fadeIn flex flex-col justify-center">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                      {/* Sub-logo stamp */}
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-[15px] font-black text-[#1A6B47] leading-none">
                          प्र
                        </span>
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="text-[13px] font-bold truncate">
                          PRAMAAN Credential Generated
                        </div>
                        <div className="text-[10px] text-white/50 truncate">
                          Cryptographically Signed
                        </div>
                      </div>
                      <span className="badge-verified bg-[#2ECC8F]/20 text-[#2ECC8F] border-[#2ECC8F]/30 text-[9px] font-bold px-2 py-0.5">
                        ACTIVE
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[12px] pt-1">
                      <span className="text-white/60">Signature Key:</span>
                      <span className="font-mono text-white/80 bg-white/5 px-2 py-0.5 rounded text-[10px]">
                        PRNM-SHA256-HEX
                      </span>
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
