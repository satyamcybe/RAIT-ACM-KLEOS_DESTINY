"use client";

export default function HowItWorksSection() {

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
      desc: "Work history is owned by corporate platforms, leaving your track record invisible to external systems.",
      accentColor: "#1A6B47",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#1A6B47]",
      visual: (
        <div className="mt-2 bg-[#E8F5EF]/50 rounded-xl p-3 border border-[#1A6B47]/10 flex flex-col gap-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#1A6B47]">
            <span className="font-semibold">PLATFORM DATA LOGS</span>
            <span className="bg-[#1A6B47] text-white px-1.5 py-0.5 rounded text-[8px] font-bold">LOCKED</span>
          </div>
          <div className="flex gap-2">
            {["Zomato", "Swiggy", "Uber"].map((plat) => (
              <span key={plat} className="text-[9px] bg-white border border-[#E5E7EB] px-2 py-1 rounded-md text-[#4B5563] shadow-xs font-semibold">
                {plat}
              </span>
            ))}
          </div>
          <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-[#1A6B47] h-full w-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
          </div>
        </div>
      )
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
      title: "Invisible Credit Profile",
      desc: "Banks see only generic weekly bank transfers. No rating, tenure, or consistency is shown.",
      accentColor: "#F5A623",
      accentBg: "bg-[#FEF3DC]",
      accentText: "text-[#F5A623]",
      visual: (
        <div className="mt-2 bg-[#FEF3DC]/50 rounded-xl p-3 border border-[#F5A623]/10 flex flex-col gap-2">
          <div className="text-[10px] font-mono text-[#B45309] font-semibold">
            TRADITIONAL BANK STATEMENT
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-2 flex flex-col gap-1 font-mono text-[9px] text-[#4B5563] shadow-xs">
            <div className="flex justify-between text-[#9CA3AF]">
              <span>Narration</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between border-t border-[#F3F4F6] pt-1">
              <span className="truncate max-w-[80px]">NEFT-ZOMATO...</span>
              <span className="font-bold text-[#D1D5DB] line-through">₹22,450</span>
            </div>
            <div className="text-[8px] text-red-500 font-sans font-bold flex items-center gap-1 mt-0.5">
              <span>⚠️ Invisible ratings & platform tenure</span>
            </div>
          </div>
        </div>
      )
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
      title: "Systemic Loan Rejections",
      desc: "Without portable proof of income, gig workers are excluded from credit, rentals, and insurance.",
      accentColor: "#0D3D28",
      accentBg: "bg-[#E8F5EF]",
      accentText: "text-[#0D3D28]",
      visual: (
        <div className="mt-2 bg-[#E8F5EF]/30 rounded-xl p-3 border border-[#0D3D28]/10 flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-[#0D3D28]">
            <span className="font-semibold">LOAN APPLICATION FLOW</span>
            <span className="font-bold text-red-600">78% REJECTED</span>
          </div>
          <div className="relative w-full h-3 bg-[#E5E7EB] rounded-full overflow-hidden flex">
            <div className="bg-red-500 h-full w-[78%]" />
            <div className="bg-[#1A6B47] h-full w-[22%]" />
          </div>
          <div className="flex justify-between text-[8px] text-[#6B7280] font-sans font-medium">
            <span>Rejected (78%)</span>
            <span>Approved (22%)</span>
          </div>
        </div>
      )
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
                <p className="text-[13px] text-[#6B7280] leading-relaxed relative z-10">
                  {problem.desc}
                </p>

                {/* Embedded Infographic visual */}
                {problem.visual && <div className="relative z-10 flex-1 flex flex-col justify-end">{problem.visual}</div>}

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
              Verify your reputation in three simple steps.
            </p>
          </div>

          {/* Horizontal Visual Workflow */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white border border-[#E5E7EB] rounded-[20px] p-8 flex flex-col items-center text-center gap-6 hover:border-[#1A6B47]/40 hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#E8F5EF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]" />

                {/* Step Circle with Icon */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#E8F5EF] text-[#1A6B47] flex items-center justify-center border border-[#1A6B47]/20 group-hover:scale-105 transition-transform duration-300 shadow-sm relative z-10">
                    {step.icon}
                  </div>
                  {/* Step index badge */}
                  <span className="absolute -top-1.5 -right-1.5 bg-[#1A6B47] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-xs z-20">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${step.badgeClass}`}>
                      {step.badge}
                    </span>
                    <h4 className="text-[16px] font-bold text-[#111827]" style={{ fontFamily: "var(--font-sans)" }}>
                      {step.title}
                    </h4>
                    <p className="text-[13px] text-[#6B7280] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Pulsing visual mockup under text */}
                <div className="w-full mt-4">
                  {idx === 0 && (
                    <div className="bg-[#E8F5EF]/30 rounded-lg p-2.5 border border-[#1A6B47]/10 flex justify-center gap-2">
                      <span className="text-[9px] font-semibold text-[#1A6B47] bg-white px-2 py-0.5 rounded shadow-xs border border-[#1A6B47]/10">✓ eShram</span>
                      <span className="text-[9px] font-semibold text-[#1A6B47] bg-white px-2 py-0.5 rounded shadow-xs border border-[#1A6B47]/10">✓ DigiLocker</span>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="bg-[#FEF3DC]/30 rounded-lg p-2.5 border border-[#F5A623]/10 flex justify-center gap-2">
                      <span className="text-[9px] font-semibold text-[#B45309] bg-white px-2 py-0.5 rounded shadow-xs border border-[#F5A623]/10">🔒 RBI AA Tunnel</span>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="bg-[#E8F5EF]/30 rounded-lg p-2.5 border border-[#1A6B47]/10 flex justify-center gap-2">
                      <span className="text-[9px] font-semibold text-[#1A6B47] bg-white px-2 py-0.5 rounded shadow-xs border border-[#1A6B47]/10">📄 Passport Ready</span>
                    </div>
                  )}
                </div>

                {/* Arrow connectors */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                    <svg className="w-6 h-6 text-[#1A6B47]/40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                {idx < 2 && (
                  <div className="md:hidden flex justify-center w-full absolute -bottom-6 left-0 right-0 z-20">
                    <div className="w-5 h-5 bg-white border border-[#E5E7EB] rounded-full flex items-center justify-center shadow-xs">
                      <svg className="w-3.5 h-3.5 text-[#1A6B47]/40 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
