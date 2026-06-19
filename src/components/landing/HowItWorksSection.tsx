"use client";

import { useState, useEffect } from "react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [simProgress, setSimProgress] = useState(0);
  const [hasConsent, setHasConsent] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Auto-progress simulation for active step
  useEffect(() => {
    setSimProgress(0);
    const interval = setInterval(() => {
      setSimProgress((prev) => (prev < 100 ? prev + 10 : 100));
    }, 150);
    return () => clearInterval(interval);
  }, [activeStep]);

  useEffect(() => {
    setShareSuccess(false);
  }, [activeStep]);

  const problems = [
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "Siloed Work History",
      desc: "Platform history is locked inside corporate servers, making it unusable elsewhere.",
      accentColor: "#1A6B47",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        </svg>
      ),
      title: "Invisible Income",
      desc: "Banks only see generic transfers, hiding ratings and earning consistency.",
      accentColor: "#1A6B47",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      ),
      title: "Credit Exclusion",
      desc: "Workers are systematically excluded from formal credit due to lack of portable proof.",
      accentColor: "#1A6B47",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
    },
  ];

  const steps = [
    {
      title: "Verify Identity",
      desc: "Instantly link Aadhaar and national e-Shram registry securely.",
      badge: "Layer 1: Identity",
      badgeClass: "bg-[#E8F5EF] text-[#1A6B47] border-[#1A6B47]/20",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="11" r="2.5" />
          <path d="M5 17c0-2 2-3 4-3s4 1 4 3" />
        </svg>
      ),
    },
    {
      title: "Link Financials",
      desc: "Securely share transaction history using RBI AA guidelines.",
      badge: "Layer 2: Financial",
      badgeClass: "bg-[#E8F5EF] text-[#1A6B47] border-[#1A6B47]/20",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <line x1="8" y1="8" x2="16" y2="8" />
          <line x1="8" y1="12" x2="16" y2="12" />
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
                  className={`w-11 h-11 rounded-xl ${problem.accentBg} ${problem.accentText} flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-300`}
                >
                  {problem.icon}
                </div>

                {/* Title */}
                <h4
                  className="text-[16px] font-bold text-[#111827] leading-snug relative z-10 mt-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {problem.title}
                </h4>

                {/* Description */}
                <p className="text-[13px] text-[#6B7280] leading-relaxed relative z-10 flex-1">
                  {problem.desc}
                </p>
              </div>
            ))}
          </div>
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
                  <div className="w-2 h-2 rounded-full bg-[#2ECC8F] animate-pulse" />
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
              <div className="flex-1 py-5 flex flex-col justify-center relative z-10 text-left font-sans">
                {/* Active Step 0 Content (Identity) */}
                {activeStep === 0 && (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Mock e-KYC Identity Card */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3 relative overflow-hidden">
                      {/* Grid scanning effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(46,204,143,0.1)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none animate-pulse" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#E8F5EF] text-[#1A6B47] flex items-center justify-center font-bold text-xs">🪪</div>
                          <div>
                            <div className="text-[12px] font-bold text-white leading-tight">DigiLocker Verified</div>
                            <div className="text-[9px] text-[#2ECC8F]">Government of India e-KYC</div>
                          </div>
                        </div>
                        <span className="bg-[#2ECC8F]/20 text-[#2ECC8F] border border-[#2ECC8F]/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Seeded
                        </span>
                      </div>

                      {/* Verified details checklist */}
                      <div className="space-y-1.5 border-t border-white/10 pt-2.5 text-[11px] font-mono text-white/80">
                        <div className="flex justify-between items-center">
                          <span>Full Name:</span>
                          <span className="text-white font-semibold">RAMESH KUMAR</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Aadhaar UAN:</span>
                          <span className="text-white font-semibold">XXXX-XXXX-8840</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>e-Shram Status:</span>
                          <span className="text-[#2ECC8F] font-bold">✓ ACTIVE REGISTERED</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/25 border border-white/5 rounded-xl p-3 text-[10px] font-mono text-white/60 space-y-1">
                      <div className="flex justify-between">
                        <span>L1 Attestation Hash:</span>
                        <span className="text-white/80">0x7a83...f812</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Secured Encryption:</span>
                        <span className="text-white/80">AES-256 GCM</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Step 1 Content (Financials) */}
                {activeStep === 1 && (
                  <div className="space-y-3.5 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-[13px] font-bold text-white">Consented Banking Analysis</div>
                        <div className="text-[9px] text-emerald-300">Setu Account Aggregator Live Consent API</div>
                      </div>
                      
                      {/* Interactive Consent Toggle */}
                      <button 
                        onClick={() => setHasConsent(!hasConsent)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                          hasConsent 
                            ? "bg-[#2ECC8F]/20 text-[#2ECC8F] border-[#2ECC8F]/30" 
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {hasConsent ? "✓ Consent Granted" : "✗ Revoked (Mock)"}
                      </button>
                    </div>

                    {hasConsent ? (
                      <div className="bg-black/25 border border-white/5 rounded-xl p-3.5 space-y-3">
                        {/* Custom Bar Chart representing income flow */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-white/60 block font-mono">Monthly Deposits (Zomato / Swiggy Payouts):</span>
                          <div className="flex justify-between items-end h-16 gap-3 px-1 pt-2">
                            {[35, 55, 45, 80, 85, 70].map((height, i) => (
                              <div key={i} className="flex-1 flex flex-col justify-end h-full items-center gap-1">
                                <div 
                                  className="w-full bg-gradient-to-t from-[#1A6B47] to-[#2ECC8F] rounded-t-sm transition-all duration-700 ease-out" 
                                  style={{ height: `${height}%` }}
                                />
                                <span className="text-[7px] text-white/40 font-mono">
                                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Earning stats */}
                        <div className="flex justify-between items-center text-[10.5px] border-t border-white/10 pt-2 text-white/70 font-mono">
                          <span>Stability Index:</span>
                          <span className="text-[#2ECC8F] font-bold">98.4% Consistent</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-950/20 border border-red-500/15 rounded-xl p-6 text-center text-white/60 font-mono text-[11px] space-y-1 py-8">
                        <div>⚠️ DATA SOURCE DE-AUTHORIZED</div>
                        <div className="text-[9px] text-white/40">Provide consent to analyze transactional consistency.</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Active Step 2 Content (Passport) */}
                {activeStep === 2 && (
                  <div className="space-y-4 animate-fadeIn">
                    {/* Mini Reputation Passport Representation */}
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                          <span className="text-[16px] font-black text-[#1A6B47] leading-none">प्र</span>
                        </div>
                        <div className="text-left">
                          <div className="text-[13px] font-bold text-white">Professional Passport</div>
                          <div className="text-[9px] text-emerald-300 font-mono">ID: PRMN-9842-1084</div>
                        </div>
                      </div>
                      
                      {/* Circular Progress Gauge */}
                      <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                        <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                          <circle cx="18" cy="18" r="16" fill="none" stroke="#2ECC8F" strokeWidth="3" strokeDasharray="85, 100" strokeLinecap="round" />
                        </svg>
                        <span className="text-[11px] font-bold text-white">847</span>
                      </div>
                    </div>

                    <div className="bg-black/20 border border-white/5 rounded-xl p-3.5 space-y-2.5">
                      <div className="flex justify-between items-center text-[10.5px] font-mono text-white/70">
                        <span>W3C Cryptographic Proof:</span>
                        <span className="text-[#2ECC8F] font-bold">✓ SIGNED VERIFIED</span>
                      </div>
                      
                      <div className="flex gap-2 font-sans">
                        <button 
                          onClick={() => {
                            setShareSuccess(true);
                            setTimeout(() => setShareSuccess(false), 3000);
                          }}
                          className="flex-1 bg-[#1A6B47] text-center py-2 rounded-lg text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer hover:bg-[#1A6B47]/85 transition-colors border border-transparent"
                        >
                          Verify Signature
                        </button>
                        <button 
                          onClick={() => {
                            setShareSuccess(true);
                            setTimeout(() => setShareSuccess(false), 3000);
                          }}
                          className="flex-1 bg-white text-[#0D3D28] text-center py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider cursor-pointer hover:bg-white/95 transition-colors border border-transparent"
                        >
                          Share Credential
                        </button>
                      </div>
                    </div>

                    {/* Floating Success Alert */}
                    {shareSuccess && (
                      <div className="bg-emerald-500 text-white rounded-lg p-2.5 text-center text-[10.5px] font-bold animate-fadeIn shadow-lg">
                        🎉 Cryptographic link copied to clipboard successfully!
                      </div>
                    )}
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
