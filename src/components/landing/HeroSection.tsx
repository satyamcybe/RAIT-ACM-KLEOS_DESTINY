"use client";

import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30; // scaling factor for mouse movement
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section 
      className="relative py-20 bg-white overflow-hidden select-none min-h-[85vh] flex items-center"
    >
      <div className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Copy, CTAs, and Social Proof */}
        <div className="text-left space-y-6 max-w-xl">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2">
            <span 
              className="text-[14px] font-bold text-[#1A6B47] uppercase tracking-wider"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Backed by e-Shram + Account Aggregator Framework
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="text-5xl md:text-[56px] font-bold text-[#111827] tracking-tight leading-[1.1] flex flex-col"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>4,000 Deliveries.</span>
            <span>Zero Proof.</span>
            <span className="text-[#1A6B47]">Until Now.</span>
          </h1>

          {/* Body subtext */}
          <p 
            className="text-[#6B7280] text-[16px] leading-[1.6]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Raju has worked 3 years for Zomato. 4.8 rating. 97% on-time. Banks still reject his loans. Pranam changes that — with verifiable, government-grade credentials.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link 
              href="/onboarding" 
              className="btn-primary w-full sm:w-auto text-center"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get My Credential &rarr;
            </Link>
            <a 
              href="#how-it-works" 
              className="btn-secondary w-full sm:w-auto text-center"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {/* Play icon in custom inline SVG */}
              <svg className="w-4.5 h-4.5 fill-current text-[#1A6B47] inline-block mr-2" viewBox="0 0 24 24" fill="none">
                <polygon points="6,4 20,12 6,20" />
              </svg>
              Watch How It Works
            </a>
          </div>

          {/* Social Proof Row */}
          <div className="pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#1A6B47] text-white font-bold text-[10px] flex items-center justify-center border border-white">R</div>
              <div className="w-7 h-7 rounded-full bg-[#F5A623] text-white font-bold text-[10px] flex items-center justify-center border border-white">A</div>
              <div className="w-7 h-7 rounded-full bg-[#374151] text-white font-bold text-[10px] flex items-center justify-center border border-white">M</div>
            </div>
            <div className="text-[14px] text-[#374151] font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              Join 2,400+ gig workers &middot; <span className="font-bold text-[#1A6B47]">4.9/5 stars</span>
              {/* Star symbol inline SVG */}
              <svg className="w-4 h-4 text-[#F5A623] fill-current inline-block ml-1.5 align-text-top" viewBox="0 0 24 24">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            </div>
          </div>

        </div>

        {/* Right Column: Floating Stat Cards in Fintech Style */}
        <div 
          className="relative flex justify-center items-center h-[480px] w-full cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* Soft Green Gradient Circle behind cards */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(26,107,71,0.06)_0%,transparent_70%)] -z-10" />

          {/* Wavy Contour Lines matching card design */}
          <svg className="absolute inset-0 w-full h-full text-[#1A6B47]/10 pointer-events-none -z-10 animate-pulse-green" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 350 C120 300, 200 380, 350 280" stroke="currentColor" strokeWidth="1.5" />
            <path d="M50 330 C120 280, 200 360, 350 260" stroke="currentColor" strokeWidth="1.5" />
            <path d="M80 80 C180 140, 250 40, 350 120" stroke="currentColor" strokeWidth="1.5" />
            <path d="M80 60 C180 120, 250 20, 350 100" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          
          {/* Decorative Dot nodes */}
          <div className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-[#1A6B47]/20" />
          <div className="absolute bottom-[20%] right-[15%] w-3.5 h-3.5 rounded-full bg-[#F5A623]/25 animate-pulse" />
          <div className="absolute bottom-[45%] left-[10%] w-2.5 h-2.5 rounded-full bg-[#1A6B47]/10" />


          {/* CARD 1: Pramaan Score (Top Left, rotated -3deg) */}
          <div 
            className="absolute top-[8%] left-[0%] stat-card p-5 w-[160px] animate-float-slow-1 z-20 transition-all duration-300 ease-out"
            style={{
              transform: `translate(${mouseOffset.x * 1.5}px, ${mouseOffset.y * 1.5}px) rotate(-3deg)`,
            }}
          >
            <div className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider mb-2">
              Pramaan Score
            </div>
            <div className="text-2xl font-bold text-[#1A6B47] mb-2" style={{ fontFamily: "var(--font-sans)" }}>
              847 / 1000
            </div>
            <div>
              <span className="badge-gold text-[10px] px-2 py-0.5">
                Gold Reliability
              </span>
            </div>
          </div>

          {/* CARD 2: Worker Credential Preview (Center Main) */}
          <div 
            className="absolute top-[18%] left-[22%] z-10 w-[265px] animate-float-slow-2 drop-shadow-2xl hover:scale-[1.03] transition-all duration-300 ease-out"
            style={{
              transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)`,
            }}
          >
            <img 
              src="/card-mockup.png" 
              alt="Pranam Card Preview" 
              className="rounded-[16px] border border-[#E5E7EB] pointer-events-none shadow-xl" 
            />
          </div>


          {/* CARD 3: Income Consistency (Bottom Right, rotated +2deg) */}
          <div 
            className="absolute bottom-[10%] right-[0%] stat-card p-5 w-[170px] animate-float-slow-3 z-20 transition-all duration-300 ease-out"
            style={{
              transform: `translate(${mouseOffset.x * 1.2}px, ${mouseOffset.y * 1.2}px) rotate(2deg)`,
            }}
          >
            <div className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider mb-1">
              Income Consistency
            </div>
            <div className="text-3xl font-bold text-[#1A6B47] mb-1" style={{ fontFamily: "var(--font-sans)" }}>
              97.4%
            </div>
            <div className="flex items-center text-[11px] text-[#059669] font-bold">
              {/* Up arrow SVG */}
              <svg className="w-3.5 h-3.5 fill-current mr-1" viewBox="0 0 20 20">
                <path d="M10 3l-7 7h4v7h6v-7h4z" />
              </svg>
              <span>Growing trend</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
