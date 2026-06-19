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
            
            {/* Dynamic Card Mockup styled on /card-bg.png */}
            <div 
              className="relative w-full max-w-[360px] h-[225px] rounded-[16px] p-5 text-white shadow-xl overflow-hidden border border-white/10 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
              style={{ backgroundImage: "url('/card-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
            >
              {/* Top Row: Logo & stamp */}
              <div className="flex justify-between items-start">
                <img src="/logo-text.png" alt="Logo" className="h-6 w-auto brightness-0 invert" />
                <span className="text-[8.5px] tracking-wider font-mono text-white/50">ID: RMN-2026-MH-4A8B</span>
              </div>

              {/* Middle content: Photo, Details, QR */}
              <div className="grid grid-cols-[60px_1fr_64px] gap-3 items-center mt-3">
                {/* Photo initials placeholder */}
                <div className="w-14 h-14 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-bold text-lg text-white">
                  RK
                </div>

                {/* Details */}
                <div className="space-y-0.5 text-left pl-1">
                  <div className="flex flex-col leading-tight">
                    <span className="text-[8px] uppercase text-white/50 tracking-wider">Name</span>
                    <span className="text-[13px] font-bold text-white">Raju Kamble</span>
                  </div>
                  <div className="flex flex-col leading-tight mt-1">
                    <span className="text-[8px] uppercase text-white/50 tracking-wider">Pramaan Score</span>
                    <span className="text-[13px] font-mono font-bold text-[#F5A623]">847 / 1000</span>
                  </div>
                </div>

                {/* QR code with middle logo */}
                <div className="relative bg-white p-1 rounded-[6px] w-[60px] h-[60px] flex items-center justify-center shadow-sm shrink-0">
                  <svg className="w-full h-full text-[#0D3D28]" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {qrGrid.map((row, rIdx) =>
                      row.map((cell, cIdx) => (
                        <rect
                          key={`${rIdx}-${cIdx}`}
                          x={cIdx * 5}
                          y={rIdx * 5}
                          width="4"
                          height="4"
                          fill={cell ? "#0D3D28" : "transparent"}
                        />
                      ))
                    )}
                  </svg>
                  {/* Center Devanagari logo icon */}
                  <div className="absolute inset-0 m-auto w-5 h-5 bg-white rounded-sm flex items-center justify-center border border-[#E5E7EB] shadow-xs overflow-hidden">
                    <img src="/logo-icon.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              {/* Footer row */}
              <div className="flex justify-between items-end border-t border-white/10 pt-2 mt-2 text-[10px] text-white/70">
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-[#2ECC8F]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="2.5,6 5,8.5 9.5,4" />
                  </svg>
                  <span>Verified by e-Shram + DigiLocker</span>
                </div>
                <span className="font-mono text-[8px] text-white/40">pranam.in/verify</span>
              </div>
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
