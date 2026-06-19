"use client";

export default function HowItWorksSection() {
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
        {/* =====================================================
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
              Verify your reputation in three simple steps.
            </p>
          </div>

          {/* Centered list of steps */}
          <div className="max-w-2xl mx-auto space-y-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-[16px] p-5 pl-14 border border-[#E5E7EB] bg-white hover:border-[#1A6B47]/30 hover:shadow-md transition-all duration-300 text-left"
              >
                {/* Step Circle with Icon */}
                <div
                  className="absolute left-4 top-5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 bg-[#E8F5EF] text-[#1A6B47] border border-[#1A6B47]/20"
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
        </div>
      </div>
    </section>
  );
}
