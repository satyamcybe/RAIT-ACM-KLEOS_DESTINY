"use client";

export default function LabourPassportSection() {
  // Generate a random 5x5 grid of boolean values for the QR code placeholder
  const qrGrid = [
    [true, false, true, true, true],
    [true, true, false, false, true],
    [false, true, true, true, false],
    [true, false, false, true, true],
    [true, true, true, false, true]
  ];

  return (
    <section 
      id="passport-preview"
      className="py-20 bg-[#FFFFFF] border-b border-[#E5E1DA] select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Title above both columns */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 
            className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your Labour Passport.
          </h2>
        </div>

        {/* Two-Column Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Passport Card ID Mockup */}
          <div className="flex justify-center">
            
            {/* forest green `#1A4D3A` ID Card */}
            <div 
              className="relative w-full max-w-[340px] h-[520px] bg-[#1A4D3A] rounded-[16px] p-6 text-[#FFFFFF] shadow-[0_1px_6px_rgba(0,0,0,0.06)] flex flex-col justify-between overflow-hidden"
              style={{ aspectRatio: "1/1.55" }}
            >
              
              {/* Tactile Diamond Grid SVG pattern overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="diamondGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#diamondGrid)" />
                </svg>
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L4 5V11C4 16.52 7.42 21.64 12 23C16.58 21.64 20 16.52 20 11V5L12 2Z"
                      fill="#2ECC8F"
                    />
                    <path
                      d="M9 11.5L11 13.5L15 9.5"
                      stroke="#1A4D3A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span 
                    className="text-[11px] font-bold tracking-[0.15em] text-white/70"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    PRAMAAN
                  </span>
                </div>
                
                {/* Verified Badge */}
                <div className="bg-[#2ECC8F]/20 border border-[#2ECC8F]/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <svg className="w-3 h-3 text-[#2ECC8F]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="2.5,6 5,8.5 9.5,4" />
                  </svg>
                  <span className="text-[9px] font-bold text-[#2ECC8F] uppercase tracking-wider">Verified</span>
                </div>
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-4 z-10 pt-4">
                <div className="w-12 h-12 rounded-full bg-[#2ECC8F] flex items-center justify-center text-[#FFFFFF] font-bold text-[18px]" style={{ fontFamily: "var(--font-serif)" }}>
                  RK
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[22px] font-bold leading-tight" style={{ fontFamily: "var(--font-serif)" }}>Raju Kumar</h4>
                  <p className="text-[13px] text-white/70 font-medium" style={{ fontFamily: "var(--font-sans)" }}>Delivery Partner &middot; Mumbai</p>
                </div>
              </div>

              {/* Trust Score Display */}
              <div className="z-10 py-2">
                <div className="flex items-baseline gap-1 leading-none">
                  <span className="text-[48px] font-bold" style={{ fontFamily: "var(--font-mono)" }}>92</span>
                  <span className="text-[18px] text-white/50" style={{ fontFamily: "var(--font-mono)" }}>/100</span>
                </div>
                <span className="text-[11px] text-white/60 font-semibold uppercase tracking-wider block mt-1" style={{ fontFamily: "var(--font-sans)" }}>
                  Reputation Trust Score
                </span>
              </div>

              {/* Gold Divider Line */}
              <div className="z-10 py-1">
                <svg className="w-full h-[1px]" viewBox="0 0 280 1">
                  <line x1="0" y1="0" x2="280" y2="0" stroke="#D4A853" strokeWidth="0.5" />
                </svg>
              </div>

              {/* Data Pills (3 rows in row) */}
              <div className="grid grid-cols-3 gap-2.5 z-10">
                <div className="bg-white/10 rounded-[8px] p-2.5 border border-white/5 flex flex-col justify-between">
                  <span className="text-[12px] font-bold block" style={{ fontFamily: "var(--font-mono)" }}>₹20K–25K</span>
                  <span className="text-[9px] text-white/50 font-medium mt-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)" }}>Income Band</span>
                </div>
                <div className="bg-white/10 rounded-[8px] p-2.5 border border-white/5 flex flex-col justify-between">
                  <span className="text-[12px] font-bold block" style={{ fontFamily: "var(--font-mono)" }}>3.4 Yrs</span>
                  <span className="text-[9px] text-white/50 font-medium mt-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)" }}>Tenure</span>
                </div>
                <div className="bg-white/10 rounded-[8px] p-2.5 border border-white/5 flex flex-col justify-between">
                  <span className="text-[12px] font-bold block" style={{ fontFamily: "var(--font-mono)" }}>High</span>
                  <span className="text-[9px] text-white/50 font-medium mt-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)" }}>Activity</span>
                </div>
              </div>

              {/* Bottom Row: Verification Checkmarks & QR Code */}
              <div className="flex justify-between items-end z-10 pt-4">
                
                {/* Checklist Footer */}
                <div className="space-y-1.5 pb-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                    <svg className="w-3 h-3 text-[#2ECC8F] shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="2.5,6 5,8.5 9.5,4" />
                    </svg>
                    <span>eShram Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                    <svg className="w-3 h-3 text-[#2ECC8F] shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="2.5,6 5,8.5 9.5,4" />
                    </svg>
                    <span>DigiLocker Connected</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                    <svg className="w-3 h-3 text-[#2ECC8F] shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="2.5,6 5,8.5 9.5,4" />
                    </svg>
                    <span>AA Consent Link</span>
                  </div>
                </div>

                {/* Inline SVG QR Code Placeholder */}
                <div className="bg-[#FFFFFF] p-1.5 rounded-[6px] shrink-0">
                  <svg className="w-10 h-10 text-[#1A4D3A]" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {qrGrid.map((row, rIdx) =>
                      row.map((cell, cIdx) => (
                        <rect
                          key={`${rIdx}-${cIdx}`}
                          x={cIdx * 5}
                          y={rIdx * 5}
                          width="4"
                          height="4"
                          fill={cell ? "#1A4D3A" : "transparent"}
                        />
                      ))
                    )}
                  </svg>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Passport Build Journey */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 
                className="text-2xl md:text-[24px] font-bold text-[#111827] tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Watch Your Passport Being Built.
              </h3>
              <p 
                className="text-[#6B7280] text-[14px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Real-time journey from data to trust.
              </p>
            </div>

            {/* Step visualization strip */}
            <div className="bg-[#F7F6F2] border border-[#E5E1DA] rounded-[16px] p-6 space-y-8 relative">
              
              {/* Nodes row */}
              <div className="relative flex justify-between items-center z-10 px-2">
                
                {/* Horizontal dotted connector */}
                <div className="absolute top-[20px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-[#E5E1DA] -z-10" />

                {/* Node 1 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#2ECC8F] flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-[#1A4D3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="6" width="18" height="12" rx="2" />
                      <circle cx="8" cy="12" r="2" />
                      <line x1="13" y1="10" x2="19" y2="10" />
                      <line x1="13" y1="14" x2="17" y2="14" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-[#111827]" style={{ fontFamily: "var(--font-sans)" }}>eShram</span>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#2ECC8F] flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-[#1A4D3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="4" y1="20" x2="20" y2="20" />
                      <line x1="6" y1="10" x2="6" y2="20" />
                      <line x1="12" y1="10" x2="12" y2="20" />
                      <line x1="18" y1="10" x2="18" y2="20" />
                      <polygon points="12,4 4,10 20,10" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-[#111827]" style={{ fontFamily: "var(--font-sans)" }}>AA</span>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#2ECC8F] flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-[#1A4D3A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 4c-4 0-6 2-6 5c0 2 1.5 3 3 4c-1 1-1.5 2-1.5 3.5c0 3 3 4.5 4.5 4.5" />
                      <path d="M12 4c4 0 6 2 6 5c0 2-1.5 3-3 4c1 1 1.5 2 1.5 3.5c0 3-3 4.5-4.5 4.5" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-[#111827]" style={{ fontFamily: "var(--font-sans)" }}>AI</span>
                </div>

                {/* Node 4 */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E5E1DA] flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-[#6B7280]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5" y="4" width="14" height="16" rx="1.5" />
                      <line x1="8" y1="8" x2="14" y2="8" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <circle cx="15" cy="16" r="1.5" fill="#E8F5EF" />
                    </svg>
                  </div>
                  <span className="text-[12px] font-medium text-[#6B7280]" style={{ fontFamily: "var(--font-sans)" }}>Passport</span>
                </div>

              </div>

              {/* Progress bar shimmer details */}
              <div className="border-t border-[#E5E1DA] pt-6 space-y-3">
                <div className="flex justify-between items-center text-[13px] font-semibold text-[#6B7280]">
                  <span style={{ fontFamily: "var(--font-sans)" }}>Analyzing work history...</span>
                  <span style={{ fontFamily: "var(--font-mono)" }} className="text-[#2ECC8F]">75%</span>
                </div>
                
                {/* Progress bar with shimmer fill animation */}
                <div className="relative w-full h-2.5 bg-[#E8F5EF] rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full w-[75%] rounded-full animate-shimmer"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
