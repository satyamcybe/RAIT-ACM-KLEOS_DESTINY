"use client";

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

  // Helper QR placeholder grid values
  const qrGrid = [
    [true, false, true, true, true],
    [true, true, false, false, true],
    [false, true, true, true, false],
    [true, false, false, true, true],
    [true, true, true, false, true]
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

        {/* Two Columns Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Passport Card & Facts Grid */}
          <div className="flex flex-col items-center w-full">
            
            {/* Actual Ramesh Kumar verified card as a PNG tag */}
            <div className="w-full max-w-[360px] drop-shadow-xl hover:scale-[1.02] transition-all duration-300">
              <img 
                src="/card-mockup.png" 
                alt="Pranam Credential Passport" 
                className="rounded-[16px] border border-[#E5E7EB] pointer-events-none w-full h-auto"
              />
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-[360px]">
              {verifiedFacts.map((fact, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 flex flex-col items-start text-left hover:border-[#1A6B47]/40 hover:bg-[#E8F5EF]/20 hover:shadow-xs transition-all duration-300 relative group"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#059669] shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="6" fill="#E8F5EF" />
                      <path d="M5.5 8L7 9.5L10.5 6" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                    <span className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wider">{fact.label}</span>
                  </div>
                  <span className="text-[13px] text-[#111827] font-bold mt-1.5">{fact.val}</span>
                  
                  {/* Subtle tooltip revealing verification source on hover */}
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#0D3D28] text-white text-[9px] font-mono px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                    Source: {fact.label === "Identity" ? "DigiLocker API" : fact.label === "Platform" ? "e-Shram DB Sync" : "Account Aggregator AA"}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Accepted Uses List */}
          <div className="space-y-6 text-left lg:pt-4">
            <h3 
              className="text-2xl font-bold text-[#111827]"
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
                    className="text-[16px] font-semibold text-[#374151]"
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
