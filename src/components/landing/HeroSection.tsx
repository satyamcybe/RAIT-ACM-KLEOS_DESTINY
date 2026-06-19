"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section 
      className="relative pt-16 pb-24 overflow-hidden select-none min-h-[90vh] flex items-center bg-gradient-to-br from-[#F7F6F2] to-[#EDF5F0]"
    >
      <div className="max-w-[1440px] mx-auto px-6 w-full grid lg:grid-cols-[55%_45%] gap-12 items-center">
        
        {/* Left Column: Copy & Actions */}
        <div className="text-left space-y-8 max-w-xl">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5EF] border border-[#2ECC8F]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#2ECC8F] opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ECC8F]"></span>
            </span>
            <span 
              className="text-[12px] font-semibold text-[#1A4D3A] tracking-wider uppercase"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Trusted by 10,000+ Verified Workers
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="text-5xl md:text-64px font-bold text-[#111827] tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Turn Proof <br />
            Into <span className="text-[#2ECC8F]">Power.</span>
          </h1>

          {/* Subtext */}
          <p 
            className="text-[#6B7280] text-lg leading-relaxed max-w-[480px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pramaan builds a verified reputation for every gig worker — so your years of honest work finally count.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link 
              href="/onboarding" 
              className="w-full sm:w-auto px-8 py-3.5 bg-[#1A4D3A] hover:bg-[#153D2E] text-white rounded-full font-medium text-[15px] shadow-sm hover:shadow-md transition-all duration-300 text-center"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get Your Pramaan &rarr;
            </Link>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-1.5 border-[#1A4D3A] text-[#1A4D3A] rounded-full font-medium text-[15px] hover:bg-[#1A4D3A]/5 transition-all duration-300 text-center"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Watch How It Works
            </a>
          </div>

          {/* Trust Infrastructure Strip */}
          <div className="pt-6 border-t border-[#E5E1DA] flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* eShram */}
            <div className="flex items-center gap-2">
              <svg className="w-4.5 h-4.5 text-[#6B7280]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Stick figure with hard hat */}
                <circle cx="10" cy="6.5" r="2.5" />
                <path d="M5 16C5 12.5 7.5 11 10 11C12.5 11 15 12.5 15 16" />
                <path d="M7.5 4C7.5 3 8.5 2.5 10 2.5C11.5 2.5 12.5 3 12.5 4" strokeLinecap="round" />
              </svg>
              <span className="text-[13px] text-[#6B7280] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                eShram Verified
              </span>
            </div>
            
            <span className="text-[#E5E1DA] hidden sm:inline">&middot;</span>
            
            {/* DigiLocker */}
            <div className="flex items-center gap-2">
              <svg className="w-4.5 h-4.5 text-[#6B7280]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Folder with lock */}
                <path d="M3 5.5A1.5 1.5 0 014.5 4h3.793a1 1 0 01.707.293L10.5 5.5H15.5A1.5 1.5 0 0117 7v7.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 14.5V5.5Z" />
                <rect x="8.5" y="9.5" width="3" height="2.5" rx="0.5" />
                <path d="M9.5 9.5V8.5C9.5 7.95 9.95 7.5 10.5 7.5C11.05 7.5 11.5 7.95 11.5 8.5V9.5" />
              </svg>
              <span className="text-[13px] text-[#6B7280] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                DigiLocker Connected
              </span>
            </div>
            
            <span className="text-[#E5E1DA] hidden sm:inline">&middot;</span>
            
            {/* RBI AA */}
            <div className="flex items-center gap-2">
              <svg className="w-4.5 h-4.5 text-[#6B7280]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Bank columns */}
                <line x1="3" y1="16.5" x2="17" y2="16.5" />
                <line x1="4" y1="4.5" x2="16" y2="4.5" />
                <polygon points="4,4.5 10,1.5 16,4.5" />
                <rect x="5.5" y="7.5" width="2" height="6.5" />
                <rect x="9" y="7.5" width="2" height="6.5" />
                <rect x="12.5" y="7.5" width="2" height="6.5" />
              </svg>
              <span className="text-[13px] text-[#6B7280] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                RBI AA Licensed
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Character SVG + Floating Cards */}
        <div className="relative flex justify-center items-center h-[500px] w-full">
          
          {/* Central 3D Delivery Partner Character */}
          <img 
            src="/delivery-partner.png" 
            alt="Delivery Partner" 
            className="relative w-[280px] md:w-[320px] h-auto object-contain z-10 drop-shadow-md"
          />


          {/* CARD 1: Trust Score (Top Right) */}
          <div className="absolute top-[8%] right-[-5%] sm:right-[0%] bg-[#FFFFFF] border border-[#E5E1DA] p-4 rounded-[16px] shadow-sm z-20 w-[155px] animate-float-1">
            <div 
              className="text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Trust Score
            </div>
            <div className="flex items-center gap-3">
              {/* Custom SVG dial/arc */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-[220deg]" viewBox="0 0 36 36">
                  {/* Background Arc */}
                  <path
                    className="text-[#E8F5EF]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="75 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Filled Arc */}
                  <path
                    className="text-[#2ECC8F]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray="69 100" // 92% of active arc space
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="text-[14px] font-bold text-[#111827] mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
                  92
                </span>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#2ECC8F]" style={{ fontFamily: "var(--font-sans)" }}>Excellent</div>
                <div className="text-[9px] text-[#6B7280] font-medium" style={{ fontFamily: "var(--font-sans)" }}>Top 5% Partner</div>
              </div>
            </div>
          </div>

          {/* CARD 2: Monthly Income (Middle Right) */}
          <div className="absolute top-[48%] right-[-10%] sm:right-[-2%] bg-[#FFFFFF] border border-[#E5E1DA] p-4 rounded-[16px] shadow-sm z-20 w-[180px] animate-float-2">
            <div 
              className="text-[11px] font-semibold text-[#6B7280] tracking-wider uppercase mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Monthly Income
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#111827]" style={{ fontFamily: "var(--font-mono)" }}>
                ₹22,450
              </span>
              <span className="text-[11px] font-semibold text-[#2ECC8F]" style={{ fontFamily: "var(--font-sans)" }}>
                +18%
              </span>
            </div>

            {/* Sparkline polyline */}
            <div className="flex items-center justify-between mt-3">
              <svg className="w-[60px] h-[24px]" viewBox="0 0 60 24" fill="none">
                <polyline
                  points="0,22 12,18 24,12 36,15 48,6 60,2"
                  stroke="#2ECC8F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[10px] text-[#6B7280] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                vs last month
              </span>
            </div>
          </div>

          {/* CARD 3: Verification Pills (Bottom Left) */}
          <div className="absolute bottom-[8%] left-[-8%] sm:left-[0%] bg-[#FFFFFF] border border-[#E5E1DA] p-4 rounded-[16px] shadow-sm z-20 w-[160px] animate-float-3">
            <div className="space-y-2.5">
              
              {/* Row 1 */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-[#2ECC8F]" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="8" fill="#2ECC8F" />
                  <path d="M5.5 8L7 9.5L10.5 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-[13px] text-[#111827] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                  eShram
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-[#2ECC8F]" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="8" fill="#2ECC8F" />
                  <path d="M5.5 8L7 9.5L10.5 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-[13px] text-[#111827] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                  DigiLocker
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0 text-[#2ECC8F]" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="8" fill="#2ECC8F" />
                  <path d="M5.5 8L7 9.5L10.5 6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                <span className="text-[13px] text-[#111827] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                  Aadhaar
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
