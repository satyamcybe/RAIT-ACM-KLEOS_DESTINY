"use client";

export default function TrustOverviewSection() {
  return (
    <section id="trust-score" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Trust Score</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            We analyze your verified identity, financial transactions, and platform reputation to generate a dynamic Trust Score. This score helps you access micro-loans, better gigs, and financial products previously out of reach.
          </p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-teal-400">Identity Score</span>
                <span className="text-slate-400">100/100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full animate-fill-100" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-amber-400">Financial Score</span>
                <span className="text-slate-400">87/100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full animate-fill-87" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-purple-400">Reputation Score</span>
                <span className="text-slate-400">74/100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full animate-fill-74" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-72 h-72 rounded-full border-[16px] border-slate-800 flex flex-col items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                className="text-amber-400 animate-fill-circle"
              />
            </svg>
            <span className="text-6xl font-black relative z-10">742</span>
            <span className="text-sm text-slate-400 mt-2 relative z-10">Trust Score</span>
            <div className="mt-4 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full relative z-10">
              Excellent
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
