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
            Raju has worked 3 years for Zomato. 4.8 rating. 97% on-time. Banks still reject his loans. PRAMAAN changes that — with verifiable, government-grade credentials.
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

        {/* Right Column: Floating Stat Cards around Delivery Worker */}
        <div 
          className="relative flex justify-center items-center h-[520px] w-full cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          
          {/* Soft Green Gradient Circle behind cards */}
          <div className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(26,107,71,0.06)_0%,transparent_70%)] -z-10 animate-pulse-green" />

          {/* Wavy Contour Lines matching card design */}
          <svg className="absolute inset-0 w-full h-full text-[#1A6B47]/10 pointer-events-none -z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 350 C120 300, 200 380, 350 280" stroke="currentColor" strokeWidth="1.5" />
            <path d="M50 330 C120 280, 200 360, 350 260" stroke="currentColor" strokeWidth="1.5" />
            <path d="M80 80 C180 140, 250 40, 350 120" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          
          {/* Decorative Dot nodes */}
          <div className="absolute top-[15%] left-[20%] w-2 h-2 rounded-full bg-[#1A6B47]/20" />
          <div className="absolute bottom-[20%] right-[15%] w-3.5 h-3.5 rounded-full bg-[#F5A623]/25 animate-pulse" />

          {/* 3D Delivery Worker Character in the center */}
          <div 
            className="relative z-10 w-[320px] md:w-[360px] transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${mouseOffset.x * 0.5}px, ${mouseOffset.y * 0.5}px)`,
            }}
          >
            <img 
              src="/delivery-worker.png" 
              alt="Delivery Worker" 
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(26,107,71,0.12)] pointer-events-none" 
            />
          </div>

          {/* CARD 1: Trust Score Dial (Top Left) */}
          <div 
            className="absolute top-[4%] left-[-4%] z-20 stat-card p-4 w-[130px] transition-transform duration-300 ease-out flex flex-col items-center"
            style={{
              transform: `translate(${mouseOffset.x * 1.2}px, ${mouseOffset.y * 1.2}px)`,
            }}
          >
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Trust Score</span>
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#E5E7EB]"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#1A6B47]"
                  strokeWidth="3.5"
                  strokeDasharray="92, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="text-[18px] font-bold text-[#111827]">92</span>
            </div>
            <span className="text-[10px] font-bold text-[#1A6B47] mt-2">Excellent</span>
          </div>

          {/* CARD 2: Monthly Income Sparkline (Top Right) */}
          <div 
            className="absolute top-[6%] right-[-4%] z-20 stat-card p-4 w-[160px] transition-transform duration-300 ease-out text-left"
            style={{
              transform: `translate(${mouseOffset.x * 1.4}px, ${mouseOffset.y * 1.4}px)`,
            }}
          >
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Monthly Income</span>
            <span className="text-[20px] font-black text-[#111827] mt-1 block">₹22,450</span>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] font-bold text-[#059669]">+18%</span>
              <span className="text-[9px] text-[#6B7280]">vs last month</span>
            </div>
            {/* Small Income trend SVG path */}
            <svg className="w-full h-8 text-[#059669] mt-2" viewBox="0 0 100 30" fill="none">
              <path d="M0 25 Q15 15 30 20 T60 10 T90 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M0 25 Q15 15 30 20 T60 10 T90 5 L90 30 L0 30 Z" fill="rgba(5,150,105,0.05)" />
            </svg>
          </div>

          {/* CARD 3: Identity Verified Checkmarks (Middle Left) */}
          <div 
            className="absolute bottom-[22%] left-[-8%] z-20 stat-card p-3.5 w-[140px] transition-transform duration-300 ease-out text-left"
            style={{
              transform: `translate(${mouseOffset.x * 0.8}px, ${mouseOffset.y * 0.8}px)`,
            }}
          >
            <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Identity Verified</span>
            <div className="space-y-1.5">
              {[
                { name: "eShram", active: true },
                { name: "DigiLocker", active: true },
                { name: "Aadhaar", active: true }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between text-[11px] font-semibold text-[#374151]">
                  <span>{item.name}</span>
                  <svg className="w-3.5 h-3.5 text-[#1A6B47]" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="8" cy="8" r="7" fill="#E8F5EF" />
                    <path d="M5 8L7 10L11 5" stroke="#1A6B47" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 4: AA Connected Bank Vault (Middle Right) */}
          <div 
            className="absolute bottom-[20%] right-[-8%] z-20 stat-card p-3.5 w-[130px] transition-transform duration-300 ease-out text-center"
            style={{
              transform: `translate(${mouseOffset.x * 0.9}px, ${mouseOffset.y * 0.9}px)`,
            }}
          >
            <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2">AA Connected</span>
            <div className="w-10 h-10 rounded-full bg-[#E8F5EF] flex items-center justify-center mx-auto mb-2 text-[#1A6B47]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="21" x2="21" y2="21" />
                <line x1="5" y1="11" x2="5" y2="21" />
                <line x1="12" y1="11" x2="12" y2="21" />
                <line x1="19" y1="11" x2="19" y2="21" />
                <polygon points="12,3 3,11 21,11" />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
              <span className="text-[10px] font-bold text-[#374151]">Connected</span>
            </div>
          </div>

          {/* CARD 5: Raju Kumar Avatar Card (Bottom Center) */}
          <div 
            className="absolute bottom-[2%] left-1/2 -translate-x-1/2 z-20 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-2.5 flex items-center gap-3 w-[220px] transition-transform duration-300 ease-out text-left"
            style={{
              transform: `translate(calc(-50% + ${mouseOffset.x * 0.7}px), ${mouseOffset.y * 0.7}px)`,
            }}
          >
            <div className="w-8 h-8 rounded-full bg-[#1A6B47] text-white font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#E5E7EB]">
              RK
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[12px] font-bold text-[#111827] block truncate">Raju Kumar</span>
              <span className="text-[9px] text-[#6B7280] block truncate">Delivery Partner</span>
            </div>
            <span className="badge-verified bg-[#E8F5EF] text-[#1A6B47] border-[#1A6B47]/20 text-[9px] px-1.5 py-0.5 rounded font-bold shrink-0">
              Verified
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
