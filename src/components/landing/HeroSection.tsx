"use client";

import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Shield, Landmark, Sparkles, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-[#F8FAFC]">
      {/* Background radial decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-teal-50/40 to-transparent rounded-full blur-3xl -z-10 opacity-70" />
      
      <div className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="text-left space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[rgba(15,23,42,0.06)] shadow-sm text-sm font-semibold text-slate-700 animate-float-3">
            <Sparkles className="w-4 h-4 text-[#18C79C]" />
            <span>Premium Verification SaaS for Gig Workers</span>
          </div>

          <h1 className="text-5xl md:text-[68px] font-black text-[#0F172A] tracking-tight leading-[1.05]">
            Turn Gig Work <br />
            Into <span className="bg-gradient-to-r from-[#18C79C] to-[#22D3EE] bg-clip-text text-transparent">Trust.</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Verify identity, connect earnings, and build a trusted worker passport that unlocks financial opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link 
              href="/onboarding" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#18C79C] to-[#129E7B] hover:opacity-95 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              Generate Passport
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-[rgba(15,23,42,0.08)] text-slate-700 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              Watch Demo
              <Play className="w-4 h-4 fill-slate-700 text-slate-700" />
            </a>
          </div>

          <div className="flex items-center gap-6 pt-6 border-t border-[rgba(15,23,42,0.06)]">
            <div>
              <div className="text-2xl font-bold text-slate-900">4.8★</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Avg rating verified</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <div className="text-2xl font-bold text-slate-900">10k+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Passports generated</div>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Central Visual + Floating UI Cards */}
        <div className="relative flex items-center justify-center h-[600px] w-full lg:h-[650px] select-none">
          
          {/* Circular Rings Background */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#18C79C]/10 to-[#22D3EE]/5 blur-2xl -z-10" />
          <div className="absolute w-[380px] h-[380px] border border-slate-200/50 rounded-full animate-spin-slow -z-10" style={{ borderStyle: 'dashed' }} />
          <div className="absolute w-[280px] h-[280px] border border-slate-200/30 rounded-full -z-10" />
          
          {/* Central 3D Delivery Partner Character */}
          <img 
            src="/delivery-partner.png" 
            alt="Delivery Partner" 
            className="relative w-[340px] md:w-[380px] h-auto object-contain z-10 drop-shadow-xl"
          />

          {/* CARD 1: TRUST SCORE (Top-Left) */}
          <div className="absolute top-[8%] left-[2%] bg-white/90 backdrop-blur-md p-4 rounded-[20px] shadow-custom border border-white/80 z-20 w-[160px] animate-float-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Trust Score</div>
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-100"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#18C79C]"
                    strokeWidth="3.5"
                    strokeDasharray="92, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="text-sm font-black text-slate-800">92</span>
              </div>
              <div>
                <div className="text-sm font-bold text-[#18C79C]">Excellent</div>
                <div className="text-[10px] text-slate-400 font-semibold">Top 5% Partner</div>
              </div>
            </div>
          </div>

          {/* CARD 2: MONTHLY INCOME (Top-Right) */}
          <div className="absolute top-[14%] right-[0%] bg-white/90 backdrop-blur-md p-4 rounded-[20px] shadow-custom border border-white/80 z-20 w-[180px] animate-float-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Monthly Income</div>
            <div className="text-2xl font-black text-slate-900">₹22,450</div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs mt-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18% vs last month</span>
            </div>
            {/* Sparkline simulation */}
            <div className="h-6 w-full mt-2 flex items-end gap-1.5">
              <div className="h-1/3 w-full bg-emerald-100 rounded-sm" />
              <div className="h-1/2 w-full bg-emerald-100 rounded-sm" />
              <div className="h-2/3 w-full bg-emerald-100 rounded-sm" />
              <div className="h-4/5 w-full bg-emerald-100 rounded-sm" />
              <div className="h-full w-full bg-[#18C79C] rounded-sm" />
            </div>
          </div>

          {/* CARD 3: VERIFIED IDENTITY (Mid-Left) */}
          <div className="absolute bottom-[28%] left-[0%] bg-white/90 backdrop-blur-md p-4 rounded-[20px] shadow-custom border border-white/80 z-20 w-[170px] animate-float-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Identity Verified</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#18C79C] shrink-0" />
                <span>eShram Verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#18C79C] shrink-0" />
                <span>DigiLocker Connected</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#18C79C] shrink-0" />
                <span>Aadhaar Anchored</span>
              </div>
            </div>
          </div>

          {/* CARD 4: CONNECTED ACCOUNTS (Mid-Right) */}
          <div className="absolute bottom-[35%] right-[2%] bg-white/90 backdrop-blur-md p-4 rounded-[20px] shadow-custom border border-white/80 z-20 w-[150px] animate-float-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-700">AA Account</div>
                <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 5: VERIFIED WORKER PROFILE (Bottom-Center) */}
          <div className="absolute bottom-[10%] right-[15%] bg-white/90 backdrop-blur-md p-3.5 rounded-[22px] shadow-custom border border-white/80 z-20 w-[240px] flex items-center gap-3.5 animate-float-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-black text-sm shrink-0">
              RK
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>Raju Kumar</span>
                <Shield className="w-3.5 h-3.5 fill-[#18C79C] text-white" />
              </div>
              <div className="text-[10px] text-slate-400 font-semibold mb-1">Delivery Partner</div>
              <span className="inline-flex text-[9px] font-black text-[#18C79C] bg-[#18C79C]/10 px-2 py-0.5 rounded-full">
                ✓ Verified Worker
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
