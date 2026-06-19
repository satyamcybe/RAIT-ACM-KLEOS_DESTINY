"use client";

export default function TrustOverviewSection() {
  const metrics = [
    { name: "Identity Score", val: "100/100", w: "w-full", bg: "bg-[#18C79C]" },
    { name: "Financial Score", val: "90/100", w: "w-[90%]", bg: "bg-[#22D3EE]" },
    { name: "Reputation Score", val: "86/100", w: "w-[86%]", bg: "bg-purple-500" }
  ];

  return (
    <section id="trust-score" className="py-24 bg-[#0F172A] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.06),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(24,199,156,0.04),transparent_50%)]" />
      
      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#18C79C] uppercase tracking-widest mb-3">SaaS Analytics</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Your Trust Overview
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            Your financial behavior and work history builds your trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Panel: Trust Score circular gauge + metrics */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 p-8 rounded-[24px] shadow-2xl flex flex-col md:flex-row items-center gap-12">
            
            {/* Score circle */}
            <div className="relative w-48 h-48 rounded-full border-[12px] border-slate-800 flex flex-col items-center justify-center shrink-0">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-[#18C79C] animate-fill-circle"
                />
              </svg>
              <span className="text-5xl font-black relative z-10 text-white">92</span>
              <span className="text-xs text-slate-400 mt-1 relative z-10 font-bold uppercase tracking-wider">Trust Score</span>
              <div className="mt-2.5 bg-[#18C79C]/20 border border-[#18C79C]/30 text-[#18C79C] text-[10px] font-black px-2.5 py-0.5 rounded-full relative z-10">
                Excellent
              </div>
            </div>

            {/* Metrics progress bars */}
            <div className="flex-1 w-full space-y-6">
              {metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-300">{m.name}</span>
                    <span className="text-[#18C79C]">{m.val}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${m.bg} rounded-full ${m.w} transition-all duration-1000 ease-out`} />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Panel: Income Growth Chart */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 p-8 rounded-[24px] shadow-2xl flex flex-col justify-between relative">
            
            {/* Title & Floating Tooltip */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="font-bold text-slate-200 text-lg">Income Trend</h4>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Last 6 Months</p>
              </div>
              <div className="bg-[#18C79C]/10 border border-[#18C79C]/20 px-3.5 py-1.5 rounded-full text-[#18C79C] font-black text-xs">
                ₹22,450
              </div>
            </div>

            {/* SVG Chart area */}
            <div className="relative h-44 w-full mt-4 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 360 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#18C79C" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#18C79C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal gridlines */}
                <line x1="0" y1="30" x2="360" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="90" x2="360" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="0" y1="150" x2="360" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                
                {/* Gradient area */}
                <path 
                  d="M 10 170 C 40 140, 80 120, 110 100 C 150 110, 190 90, 220 70 C 260 80, 300 40, 340 30 L 340 170 Z" 
                  fill="url(#chart-glow)"
                />
                
                {/* Neon green trend line */}
                <path 
                  d="M 10 170 C 40 140, 80 120, 110 100 C 150 110, 190 90, 220 70 C 260 80, 300 40, 340 30" 
                  fill="none" 
                  stroke="#18C79C" 
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Vertex dots */}
                <circle cx="10" cy="170" r="4.5" fill="#18C79C" stroke="#0F172A" strokeWidth="2" />
                <circle cx="110" cy="100" r="4.5" fill="#18C79C" stroke="#0F172A" strokeWidth="2" />
                <circle cx="220" cy="70" r="4.5" fill="#18C79C" stroke="#0F172A" strokeWidth="2" />
                <circle cx="340" cy="30" r="4.5" fill="#18C79C" stroke="#0F172A" strokeWidth="2" />
              </svg>
            </div>

            {/* Bottom Labels */}
            <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase tracking-wider mt-4 px-1">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
