"use client";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      label: "Verify Identity",
      desc: "Connect DigiLocker & eShram in minutes.",
      svg: (
        <svg className="w-8 h-8 text-[#1A4D3A] transition-colors duration-200 group-hover:text-[#2ECC8F]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2">
          {/* Fingerprint: concentric paths open on sides */}
          <path d="M16 26 A10 10 0 0 1 6 16 C6 13 8 10 11 8.5" strokeLinecap="round" />
          <path d="M12 28 A13 13 0 0 1 6 16 C6 10 10.5 5 16 5 A11 11 0 0 1 27 16" strokeLinecap="round" />
          <path d="M16 23 A7 7 0 0 1 9 16 C9 14 10 12 12 11 A5 5 0 0 1 18 10" strokeLinecap="round" />
          <path d="M16 19 A3.5 3.5 0 0 1 12.5 16 A3.5 3.5 0 0 1 16 12.5 A3.5 3.5 0 0 1 19.5 16" strokeLinecap="round" />
          <path d="M20 28 A11 11 0 0 0 24 20 A9 9 0 0 0 20 12" strokeLinecap="round" />
        </svg>
      )
    },
    {
      num: "02",
      label: "Connect Bank",
      desc: "Secure, one-time RBI AA consent sharing.",
      svg: (
        <svg className="w-8 h-8 text-[#1A4D3A] transition-colors duration-200 group-hover:text-[#2ECC8F]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Bank Facade */}
          <polygon points="16,6 4,12 28,12" />
          <line x1="6" y1="26" x2="26" y2="26" />
          <rect x="7" y="16" width="3" height="10" />
          <rect x="14.5" y="16" width="3" height="10" />
          <rect x="22" y="16" width="3" height="10" />
          <line x1="5" y1="12" x2="27" y2="12" />
        </svg>
      )
    },
    {
      num: "03",
      label: "Analyze Work",
      desc: "AI reviews monthly earning regularity.",
      svg: (
        <svg className="w-8 h-8 text-[#2ECC8F]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8">
          {/* Waveform */}
          <path d="M3 16 H10 L12 8 L15 24 L18 13 L20 18 L22 16 H29" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      num: "04",
      label: "AI Scoring",
      desc: "Generate your secure trust scorecard.",
      svg: (
        <svg className="w-8 h-8 text-[#1A4D3A] transition-colors duration-200 group-hover:text-[#2ECC8F]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Shield outline with tiny star inside */}
          <path d="M16 4 L6 7 V15 C6 21 10.5 26.5 16 28 C21.5 26.5 26 21 26 15 V7 L16 4 Z" strokeLinejoin="round" />
          <polygon points="16,11 17.5,14 20.5,14.5 18,16.5 19,19.5 16,18 13,19.5 14,16.5 11.5,14.5 14.5,14" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      num: "05",
      label: "Get Passport",
      desc: "Download and share your portable credential.",
      svg: (
        <svg className="w-8 h-8 text-[#1A4D3A] transition-colors duration-200 group-hover:text-[#2ECC8F]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Document with rounded cut and stamp */}
          <path d="M8 6 H20 L25 11 V26 A1.5 1.5 0 0 1 23.5 27.5 H8.5 A1.5 1.5 0 0 1 7 26 V7.5 A1.5 1.5 0 0 1 8 6 Z" strokeLinejoin="round" />
          <line x1="11" y1="12" x2="17" y2="12" strokeLinecap="round" />
          <line x1="11" y1="16" x2="21" y2="16" strokeLinecap="round" />
          <line x1="11" y1="20" x2="18" y2="20" strokeLinecap="round" />
          <circle cx="20" cy="22" r="2.5" fill="#2ECC8F" stroke="none" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-20 bg-[#F7F6F2] border-b border-[#E5E1DA] select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Headings */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <p 
            className="text-[12px] font-semibold text-[#6B7280] tracking-[0.12em] uppercase"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            How It Works
          </p>
          <h2 
            className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Five Steps to Your Pramaan.
          </h2>
        </div>

        {/* Pipeline container */}
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4 px-4">
          
          {/* Dashboard Animated Pipeline Connector Path (Desktop only) */}
          <div className="hidden md:block absolute top-8 left-[6%] right-[6%] h-[2px] overflow-hidden -z-10">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line 
                x1="0" 
                y1="1" 
                x2="100%" 
                y2="1" 
                stroke="#E5E1DA" 
                strokeWidth="2" 
                strokeDasharray="6 4" 
                className="animate-dashflow"
              />
            </svg>
          </div>

          {/* Node columns */}
          {steps.map((st, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center flex-1 w-full group relative"
            >
              {/* Circle Node */}
              <div 
                className="w-16 h-16 rounded-full bg-[#FFFFFF] border-[1.5px] border-[#E5E1DA] flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.02)] group-hover:border-[#2ECC8F] group-hover:bg-[#E8F5EF] transition-all duration-300 transform group-hover:scale-105"
              >
                {st.svg}
              </div>

              {/* Node Metadata labels */}
              <div className="mt-5 space-y-2">
                <div 
                  className="text-[11px] font-bold text-[#6B7280] tracking-wide"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {st.num}
                </div>
                <h4 
                  className="text-[14px] font-semibold text-[#111827]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {st.label}
                </h4>
                <p 
                  className="text-[13px] text-[#6B7280] leading-snug max-w-[160px] mx-auto"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {st.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
