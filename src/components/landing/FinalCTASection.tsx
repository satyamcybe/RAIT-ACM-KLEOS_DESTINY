"use client";

import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="py-20 bg-[#EDF0EB] border-b border-[#E5E1DA] text-center select-none">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        
        {/* Headline */}
        <h2 
          className="text-3xl md:text-[36px] font-bold text-[#111827] tracking-tight leading-snug"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Ready to Build Your Trust Passport?
        </h2>
        
        {/* Subheadline */}
        <p 
          className="text-[#6B7280] text-[16px] max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Start building a verified reputation today.
        </p>

        {/* CTA Button */}
        <div className="pt-4 flex justify-center">
          <Link 
            href="/onboarding" 
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#1A4D3A] hover:bg-[#153D2E] text-[#FFFFFF] rounded-full font-medium text-[15px] shadow-[0_1px_6px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Get Your Pramaan</span>
            {/* Custom Inline SVG arrow */}
            <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9,4 13,8 9,12" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
