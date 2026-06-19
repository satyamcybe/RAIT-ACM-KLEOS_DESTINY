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
      title: "Siloed Work History",
      desc: "Your delivery and platform history remains locked inside individual corporate servers.",
      accentColor: "#1A6B47",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
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
      title: "No Credit History",
      desc: "Banks only see generic bank transfers, hiding your consistency and rating signals.",
      accentColor: "#F5A623",
      accentBg: "bg-[#FEF3DC]",
      accentText: "text-[#F5A623]",
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
      title: "Credit Exclusion",
      desc: "Reliable gig workers are systematically rejected for loans due to lack of portable proof.",
      accentColor: "#0D3D28",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#0D3D28]",
    },
  ];

  const steps = [
    {
      title: "Verify Identity",
      desc: "Instantly link Aadhaar and national e-Shram registry securely.",
      badge: "Layer 1: Identity",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      accentBg: "bg-blue-50",
      accentText: "text-blue-600",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="11" r="2.5" />
          <path d="M5 17c0-2 2-3 4-3s4 1 4 3" />
          <circle cx="17" cy="16.5" r="2.5" fill="#1A6B47" stroke="none" />
          <path d="M16 16.5l.5.5 1-1" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      title: "Link Financials",
      desc: "Securely share transaction history using RBI AA guidelines.",
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
      title: "Generate Passport",
      desc: "Download your professional passport to share in seconds.",
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
      <div className="max-w-6xl mx-auto px-6 space-y-24">
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
                className="group relative bg-white border border-[#E5E7EB] rounded-[20px] p-7 flex flex-col gap-4 hover:border-[#1A6B47]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E8F5EF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]" />

                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-2xl ${problem.accentBg} ${problem.accentText} flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-300`}
                >
                  {problem.icon}
                </div>

                {/* Stat Headline */}
                <div className="relative z-10">
                  <span
                    className="text-[36px] md:text-[40px] font-bold tracking-tight leading-none"
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
                  className="text-[16px] font-bold text-[#111827] leading-snug relative z-10"
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
        </div>

<<<<<<< HEAD
        {/* =====================================================
=======
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
>>>>>>> 13a343ddbc4e5edf112d789c0610752d35855a0a
            PART 2: THE 3-STEP CREDENTIAL PIPELINE
           ===================================================== */}
        <div id="for-workers" className="space-y-14 pt-6">
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
              Verify your reputation in three simple steps. Click a step to simulate.
            </p>
          </div>

          {/* Interactive Split Screen: Steps on Left, Interactive Visual Mockup on Right */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 max-w-5xl mx-auto items-center">
            {/* Left Column: List of Steps */}
            <div className="relative space-y-4">
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
                  {/* Step Circle with Icon */}
                  <div
                    className={`absolute left-3 top-5.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 z-10 ${
                      activeStep === idx
                        ? "bg-[#1A6B47] text-white shadow-md"
                        : "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]"
                    }`}
                  >
                    {step.icon}
                  </div>

                  <div className="space-y-1">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider ${step.badgeClass}`}>
                      {step.badge}
                    </span>
                    <h4 className="text-[15px] font-bold text-[#111827]" style={{ fontFamily: "var(--font-sans)" }}>
                      {step.title}
                    </h4>
                    <p className="text-[12.5px] text-[#6B7280] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Interactive Visual Panel */}
            <div className="bg-[#0D3D28] text-white rounded-[24px] p-6 shadow-2xl border border-white/10 relative overflow-hidden min-h-[360px] flex flex-col justify-between transition-all duration-500">
              
              {/* Background glows */}
              <div className="absolute w-[200px] h-[200px] rounded-full bg-[#1A6B47]/20 -top-12 -right-12 blur-2xl pointer-events-none" />
              <div className="absolute w-[120px] h-[120px] rounded-full bg-[#2ECC8F]/10 bottom-0 left-0 blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center pb-3 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC8F] animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-300 uppercase tracking-widest font-semibold">
                    {activeStep === 0 && "Secure Identity Verification"}
                    {activeStep === 1 && "Account Aggregator Consent"}
                    {activeStep === 2 && "Pramaan Passport Issued"}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === activeStep ? "bg-[#2ECC8F]" : "bg-white/20"}`} />
                  ))}
                </div>
              </div>

              {/* Body Content */}
              <div className="flex-1 py-6 flex flex-col justify-center relative z-10 text-left font-sans">
                {/* Active Step 0 Content */}
                {activeStep === 0 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-[#2ECC8F] flex items-center justify-center shrink-0 border border-[#2ECC8F]/20">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-white">e-KYC Authenticated</div>
                        <div className="text-[10px] text-emerald-300">Aadhaar Seeded via DigiLocker</div>
                      </div>
                      <span className="bg-[#2ECC8F]/20 text-[#2ECC8F] border border-[#2ECC8F]/30 text-[9px] font-bold px-2 py-0.5 rounded-full">
                        SUCCESS
                      </span>
                    </div>
                    
                    <div className="bg-black/20 border border-white/5 rounded-xl p-4 space-y-2 font-mono text-[11px] text-white/70">
                      <div className="flex justify-between">
                        <span>Verification Source:</span>
                        <span className="text-[#2ECC8F] font-bold">Aadhaar CIDR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>e-Shram Registry Status:</span>
                        <span className="text-[#2ECC8F] font-bold">LINKED (Active)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Worker Profile Stamp:</span>
                        <span className="text-amber-400 font-bold">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Step 1 Content */}
                {activeStep === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-1">
                      <div className="text-[13px] font-bold text-white">Consented Banking Analysis</div>
                      <div className="text-[10px] text-emerald-300">Real-time ledger flow from Account Aggregator</div>
                    </div>

                    {/* Chart visual representation */}
                    <div className="bg-black/20 border border-white/5 rounded-xl p-4 space-y-4">
                      <div className="flex justify-between items-end h-20 gap-3 px-2">
                        {[35, 55, 45, 80, 85, 70].map((height, i) => (
                          <div key={i} className="flex-1 flex flex-col justify-end h-full items-center gap-1.5">
                            <div 
                              className="w-full bg-gradient-to-t from-[#1A6B47] to-[#2ECC8F] rounded-t-sm transition-all duration-700 ease-out" 
                              style={{ height: `${height}%` }}
                            />
                            <span className="text-[8px] text-white/40 font-mono">
                              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-[10px] border-t border-white/5 pt-2 text-white/60 font-mono">
                        <span>Earning Consistency:</span>
                        <span className="text-[#2ECC8F] font-bold">97.4% Stable</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Step 2 Content */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-[16px] font-black text-[#1A6B47] leading-none">प्र</span>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-[13px] font-bold text-white truncate">Professional Passport Issued</div>
                        <div className="text-[10px] text-emerald-300">Cryptographically Signed & Locked</div>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC8F] animate-pulse" />
                    </div>

                    <div className="bg-black/20 border border-white/5 rounded-xl p-4 space-y-3 font-mono text-[10px] text-white/70">
                      <div className="flex justify-between">
                        <span>Hashing Protocol:</span>
                        <span className="text-white/90">SHA-256 (Pramaan ID)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verification State:</span>
                        <span className="text-[#2ECC8F] font-bold">PUBLICLY VERIFIABLE</span>
                      </div>
                      <div className="flex gap-2 pt-1.5 font-sans">
                        <span className="flex-1 bg-[#1A6B47] text-center py-2 rounded-lg text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer hover:bg-[#1A6B47]/80 transition-colors">
                          Download PDF
                        </span>
                        <span className="flex-1 bg-white text-[#0D3D28] text-center py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider cursor-pointer hover:bg-white/95 transition-colors">
                          Copy Share Link
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 pt-2 flex justify-between items-center text-[9px] font-mono text-white/40 relative z-10">
                <span>API Endpoints Verified</span>
                <span>SSL Secured Tunnel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
