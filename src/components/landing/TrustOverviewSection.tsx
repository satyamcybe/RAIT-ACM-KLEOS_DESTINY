"use client";

import { useEffect, useState } from "react";

function AnimatedStat({ target, decimals = 1, prefix = "", suffix = "" }: { target: number; decimals?: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setVal(target);
        clearInterval(timer);
      } else {
        setVal(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  if (target === 0) {
    return <span>0</span>;
  }

  return (
    <span>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function TrustOverviewSection() {
  const stats = [
    { target: 7.7, decimals: 1, prefix: "", suffix: " Cr+", label: "Gig workers in India" },
    { target: 1.6, decimals: 1, prefix: "₹", suffix: " L Cr", label: "AA loans disbursed 2024-25" },
    { target: 2.88, decimals: 2, prefix: "", suffix: " Bn", label: "AA-enabled accounts" },
    { target: 0, decimals: 0, prefix: "", suffix: "", label: "Platform APIs needed" }
  ];

  return (
    <section 
      id="trust-score"
      className="py-20 bg-[#F9FAFB] border-b border-[#E5E7EB] select-none"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="PRAMAAN-card p-6 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:border-[#1A6B47] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Soft glow background on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#E8F5EF]/10 to-[#1A6B47]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <span 
                className="text-3xl md:text-[36px] font-bold text-[#1A6B47] block relative z-10"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <AnimatedStat 
                  target={stat.target} 
                  decimals={stat.decimals} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                />
              </span>
              <span 
                className="text-[13px] font-semibold text-[#6B7280] mt-2 block relative z-10"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
