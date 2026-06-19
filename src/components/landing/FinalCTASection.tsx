"use client";

import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="py-20 bg-[#0D3D28] text-white text-center select-none relative overflow-hidden">
      
      {/* Subtle background glow rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/5 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 space-y-6 relative z-10">
        
        {/* Headline */}
        <h2 
          className="text-4xl md:text-[48px] font-bold tracking-tight leading-snug"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Your work deserves proof.
        </h2>
        
        {/* Subhead */}
        <p 
          className="text-[#E8F5EF] text-[18px] max-w-md mx-auto"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Get your Pranam credential in 2 minutes.
        </p>

        {/* White button green text */}
        <div className="pt-4 flex flex-col items-center gap-4">
          <Link 
            href="/onboarding" 
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#1A6B47] hover:bg-[#E8F5EF] rounded-[8px] font-bold text-[16px] transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Get Started Free &rarr;
          </Link>
          
          {/* Small text */}
          <span 
            className="text-[12px] text-[#E8F5EF]/75 font-medium"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            No platform cooperation needed. No app to install.
          </span>
        </div>

      </div>
    </section>
  );
}
