"use client";

export default function TrustOverviewSection() {
  return (
    <section 
      id="trust-score" 
      className="py-20 bg-[#F7F6F2] border-b border-[#E5E1DA] select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Section Headings */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 
            className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your Trust, At a Glance.
          </h2>
        </div>

        {/* Centered White Infographic Card */}
        <div className="bg-[#FFFFFF] border-[1.5px] border-[#E5E1DA] rounded-[20px] p-6 md:p-12 shadow-[0_1px_6px_rgba(0,0,0,0.06)] max-w-[840px] mx-auto grid md:grid-cols-[40%_60%] gap-12 items-center">
          
          {/* Left Column: Dial & Progress Bars */}
          <div className="flex flex-col items-center space-y-8 w-full">
            
            {/* Trust Score Gauge Dial */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 flex flex-col items-center justify-center">
                <svg className="absolute w-full h-full transform" viewBox="0 0 100 100">
                  {/* Outer Background Ring */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#E8F5EF"
                    strokeWidth="6"
                    fill="none"
                  />
                  {/* Outer Filled Progress Arc (Calculated 92% of 264 circumference) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke="#2ECC8F"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="264"
                    strokeDashoffset="264"
                    strokeLinecap="round"
                    className="animate-arcfill origin-center transform -rotate-90"
                  />
                </svg>
                
                {/* Dial Text Content */}
                <div className="text-center z-10 space-y-1">
                  <div 
                    className="text-[48px] font-bold text-[#111827] leading-none mt-2"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    92
                  </div>
                  <div 
                    className="text-[13px] font-medium text-[#6B7280]"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Trust Score
                  </div>
                  <div className="pt-1">
                    <span 
                      className="px-3 py-0.5 bg-[#E8F5EF] text-[#1A4D3A] text-[11px] font-semibold rounded-full"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Excellent
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SVG Progress Bars */}
            <div className="w-full">
              <svg className="w-full h-[130px]" viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Identity Score Bar */}
                <text x="0" y="20" fill="#6B7280" fontSize="11" fontWeight="500" style={{ fontFamily: "var(--font-sans)" }}>Identity Score</text>
                <rect x="0" y="28" width="200" height="8" rx="4" fill="#E8F5EF" />
                <rect x="0" y="28" width="200" height="8" rx="4" fill="#2ECC8F" />
                <text x="210" y="36" fill="#111827" fontSize="12" fontWeight="bold" style={{ fontFamily: "var(--font-mono)" }}>100/100</text>

                {/* Financial Score Bar */}
                <text x="0" y="60" fill="#6B7280" fontSize="11" fontWeight="500" style={{ fontFamily: "var(--font-sans)" }}>Financial Score</text>
                <rect x="0" y="68" width="200" height="8" rx="4" fill="#E8F5EF" />
                <rect x="0" y="68" width="180" height="8" rx="4" fill="#2ECC8F" />
                <text x="210" y="76" fill="#111827" fontSize="12" fontWeight="bold" style={{ fontFamily: "var(--font-mono)" }}>90/100</text>

                {/* Reputation Score Bar */}
                <text x="0" y="100" fill="#6B7280" fontSize="11" fontWeight="500" style={{ fontFamily: "var(--font-sans)" }}>Reputation Score</text>
                <rect x="0" y="108" width="200" height="8" rx="4" fill="#E8F5EF" />
                <rect x="0" y="108" width="172" height="8" rx="4" fill="#2ECC8F" />
                <text x="210" y="116" fill="#111827" fontSize="12" fontWeight="bold" style={{ fontFamily: "var(--font-mono)" }}>86/100</text>
              </svg>
            </div>

          </div>

          {/* Right Column: Chart & Tooltip */}
          <div className="relative w-full h-[320px] flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#E5E1DA] pt-8 md:pt-0 md:pl-8">
            
            {/* Chart Title */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[16px] font-semibold text-[#111827]" style={{ fontFamily: "var(--font-sans)" }}>Income Trend</h4>
                <p className="text-[10px] text-[#6B7280] font-semibold uppercase tracking-wider">Last 6 Months</p>
              </div>
              <span 
                className="px-3 py-1 bg-[#E8F5EF] border border-[#2ECC8F] text-[#1A4D3A] text-xs font-semibold rounded-full"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                ₹22,450/mo
              </span>
            </div>

            {/* Income Trend Chart in SVG */}
            <div className="relative w-full h-[180px] mt-4">
              <svg className="w-full h-full" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal Dashed Gridlines */}
                <line x1="40" y1="30" x2="330" y2="30" stroke="#E5E1DA" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="40" y1="90" x2="330" y2="90" stroke="#E5E1DA" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="40" y1="150" x2="330" y2="150" stroke="#E5E1DA" strokeWidth="0.5" strokeDasharray="3 3" />

                {/* Y-Axis Labels */}
                <text x="32" y="34" fill="#6B7280" fontSize="10" textAnchor="end" style={{ fontFamily: "var(--font-sans)" }}>₹30K</text>
                <text x="32" y="94" fill="#6B7280" fontSize="10" textAnchor="end" style={{ fontFamily: "var(--font-sans)" }}>₹15K</text>
                <text x="32" y="154" fill="#6B7280" fontSize="10" textAnchor="end" style={{ fontFamily: "var(--font-sans)" }}>₹0</text>

                {/* Shaded Area Below Trend Line */}
                <path
                  d="M 50 150 L 100 135 L 150 110 L 200 118 L 250 85 L 300 60 L 300 150 Z"
                  fill="#E8F5EF"
                  opacity="0.6"
                />

                {/* Neon Green Trend Line */}
                <path
                  d="M 50 150 L 100 135 L 150 110 L 200 118 L 250 85 L 300 60"
                  stroke="#2ECC8F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-linedraw"
                />

                {/* Vertex Dots */}
                <circle cx="50" cy="150" r="3.5" fill="#2ECC8F" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="100" cy="135" r="3.5" fill="#2ECC8F" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="150" cy="110" r="3.5" fill="#2ECC8F" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="200" cy="118" r="3.5" fill="#2ECC8F" stroke="#FFFFFF" strokeWidth="1.5" />
                <circle cx="250" cy="85" r="3.5" fill="#2ECC8F" stroke="#FFFFFF" strokeWidth="1.5" />
                
                {/* June Endpoint circle marker */}
                <circle cx="300" cy="60" r="5" fill="#2ECC8F" stroke="#FFFFFF" strokeWidth="2" />
                
                {/* Small indicator line leader to tooltip */}
                <line x1="300" y1="60" x2="300" y2="40" stroke="#2ECC8F" strokeWidth="1" strokeDasharray="2 2" />

                {/* X-Axis Month Labels */}
                <text x="50" y="174" fill="#6B7280" fontSize="10" textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>Jan</text>
                <text x="100" y="174" fill="#6B7280" fontSize="10" textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>Feb</text>
                <text x="150" y="174" fill="#6B7280" fontSize="10" textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>Mar</text>
                <text x="200" y="174" fill="#6B7280" fontSize="10" textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>Apr</text>
                <text x="250" y="174" fill="#6B7280" fontSize="10" textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>May</text>
                <text x="300" y="174" fill="#6B7280" fontSize="10" textAnchor="middle" style={{ fontFamily: "var(--font-sans)" }}>Jun</text>
              </svg>

              {/* Floating Tooltip Card overlay on June node */}
              <div 
                className="absolute top-[8px] right-[5px] bg-[#FFFFFF] border border-[#E5E1DA] p-2 rounded-[8px] shadow-sm z-20 flex flex-col items-center pointer-events-none"
                style={{ width: "80px" }}
              >
                <span className="text-[12px] font-bold text-[#111827]" style={{ fontFamily: "var(--font-mono)" }}>
                  ₹22,450
                </span>
                <span className="text-[9px] text-[#6B7280]" style={{ fontFamily: "var(--font-sans)" }}>
                  June 2025
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
