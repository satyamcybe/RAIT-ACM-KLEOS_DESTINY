"use client";

export default function FeaturesBar() {
  const cards = [
    {
      title: "Identity Verification",
      desc: "Instant identity anchoring via eShram and Aadhaar records directly through secure government pathways.",
      tag: "Government Backed",
      svg: (
        <svg className="w-12 h-12 text-[#1A4D3A]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          {/* Worker ID card with photo placeholder and barcode */}
          <rect x="4" y="8" width="40" height="32" rx="3" />
          <circle cx="12" cy="20" r="4" />
          <line x1="22" y1="16" x2="38" y2="16" strokeLinecap="round" />
          <line x1="22" y1="21" x2="34" y2="21" strokeLinecap="round" />
          <line x1="22" y1="26" x2="38" y2="26" strokeLinecap="round" />
          
          {/* Barcode lines */}
          <line x1="8" y1="32" x2="8" y2="36" strokeWidth="2.5" />
          <line x1="13" y1="32" x2="13" y2="36" strokeWidth="1.2" />
          <line x1="17" y1="32" x2="17" y2="36" strokeWidth="2" />
          <line x1="21" y1="32" x2="21" y2="36" strokeWidth="1.2" />
          <line x1="25" y1="32" x2="25" y2="36" strokeWidth="2.5" />
          <line x1="30" y1="32" x2="30" y2="36" strokeWidth="1.2" />
          <line x1="34" y1="32" x2="34" y2="36" strokeWidth="2" />
          <line x1="38" y1="32" x2="38" y2="36" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      title: "DigiLocker Verification",
      desc: "Access government-issued certificates instantly. Keep your credentials fully secure and in your control.",
      tag: "Consent First",
      svg: (
        <svg className="w-12 h-12 text-[#1A4D3A]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          {/* Folder body + lock */}
          <path d="M6 12A2 2 0 018 10h10l4 4h18a2 2 0 012 2v20a2 2 0 01-2 2H8a2 2 0 01-2-2V12Z" strokeLinejoin="round" />
          <rect x="20" y="22" width="10" height="8" rx="1.5" />
          <path d="M22 22v-3a3 3 0 016 0v3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: "Account Aggregator",
      desc: "Connect your bank statements through secure, consent-based RBI-regulated digital networks.",
      tag: "RBI Regulated",
      svg: (
        <svg className="w-12 h-12 text-[#1A4D3A]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          {/* Two facing banks connected by a consent double-sided arrow and shield */}
          <rect x="4" y="24" width="12" height="12" rx="1" />
          <polygon points="10,16 4,24 16,24" />
          <line x1="7" y1="28" x2="7" y2="33" />
          <line x1="10" y1="28" x2="10" y2="33" />
          <line x1="13" y1="28" x2="13" y2="33" />

          <rect x="32" y="24" width="12" height="12" rx="1" />
          <polygon points="38,16 32,24 44,24" />
          <line x1="35" y1="28" x2="35" y2="33" />
          <line x1="38" y1="28" x2="38" y2="33" />
          <line x1="41" y1="28" x2="41" y2="33" />

          {/* Double-headed consent arrow path */}
          <path d="M18 29h12" strokeLinecap="round" />
          <polyline points="21,26 18,29 21,32" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="27,26 30,29 27,32" strokeLinecap="round" strokeLinejoin="round" />

          {/* Consent Shield */}
          <path d="M24 10c0 0-2.5-1-4-1s-4 1-4 1v4c0 2.2 1.8 4 4 4.5c2.2-.5 4-2.3 4-4.5v-4z" />
        </svg>
      )
    },
    {
      title: "Reputation Engine",
      desc: "Our AI model analyzes your consistent work activity patterns, feedback ratings, and gig platform history.",
      tag: "AI Powered",
      svg: (
        <svg className="w-12 h-12 text-[#1A4D3A]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          {/* Two brain hemispheres + neural pattern */}
          <path d="M24 14c-1.5-4.5-5.5-6-10-6s-8 3.5-8 8.5c0 4 3 6.5 6 7.5c-2 2-3 4-3 6.5c0 5 4.5 7.5 9 7.5" strokeLinecap="round" />
          <path d="M24 14c1.5-4.5 5.5-6 10-6s8 3.5 8 8.5c0 4-3 6.5-6 7.5c2 2 3 4 3 6.5c0 5-4.5 7.5-9 7.5" strokeLinecap="round" />
          <line x1="24" y1="10" x2="24" y2="38" strokeDasharray="3 3" />
          
          {/* Neural nodes */}
          <circle cx="18" cy="22" r="2.5" fill="#2ECC8F" stroke="none" />
          <circle cx="30" cy="22" r="2.5" fill="#2ECC8F" stroke="none" />
          <circle cx="24" cy="30" r="2.5" fill="#2ECC8F" stroke="none" />
          <line x1="18" y1="22" x2="24" y2="30" strokeWidth="1" />
          <line x1="30" y1="22" x2="24" y2="30" strokeWidth="1" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#FFFFFF] select-none">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Headings */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 
            className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Built on India's Verified Stack.
          </h2>
          <p 
            className="text-[#6B7280] text-[18px] leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Every layer is RBI-regulated, government-backed, or AI-verified.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="bg-[#FFFFFF] border-[1.5px] border-[#E5E1DA] border-l-[3px] border-l-[#2ECC8F] rounded-[12px] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:-translate-y-[3px] hover:border-[#2ECC8F] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* SVG Icon */}
                <div className="w-12 h-12 flex items-center justify-start">
                  {card.svg}
                </div>
                
                {/* Text Content */}
                <div className="space-y-2">
                  <h4 
                    className="text-[20px] font-semibold text-[#111827]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {card.title}
                  </h4>
                  <p 
                    className="text-[#6B7280] text-[14px] leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Tag Pill */}
              <div className="pt-6">
                <span 
                  className="inline-flex px-3 py-1 bg-[#E8F5EF] text-[#1A4D3A] text-[11px] font-semibold rounded-full uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {card.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
