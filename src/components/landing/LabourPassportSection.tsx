import { Check, ShieldAlert, ShieldCheck, QrCode } from "lucide-react";

export default function LabourPassportSection() {
  const verifications = [
    { name: "eShram Verified", ok: true },
    { name: "DigiLocker Verified", ok: true },
    { name: "AA Verified", ok: true }
  ];

  const steps = [
    { label: "eShram", active: true, done: true },
    { label: "AA", active: true, done: true },
    { label: "AI Analysis", active: true, done: false },
    { label: "Passport", active: false, done: false }
  ];

  return (
    <section className="py-24 bg-white border-b border-[rgba(15,23,42,0.06)]">
      <div className="max-w-[1440px] mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Worker Passport Preview */}
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Your Labour Passport
            </h3>
            <p className="text-slate-500 text-sm">
              Your trust. Your identity. Your future.
            </p>
          </div>

          {/* Green Gradient Passport Card */}
          <div className="bg-gradient-to-br from-[#18C79C] to-[#129E7B] rounded-[24px] p-8 text-white shadow-2xl relative overflow-hidden select-none max-w-lg">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            
            {/* Top row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-white font-black text-xl">
                  RK
                </div>
                <div>
                  <h4 className="font-extrabold text-xl">Raju Kumar</h4>
                  <p className="text-xs text-teal-100 font-semibold mt-0.5">Delivery Partner</p>
                </div>
              </div>
              <div className="bg-white/25 border border-white/20 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4 fill-white text-[#18C79C]" />
                <span>Verified Worker</span>
              </div>
            </div>

            {/* Middle Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8 border-y border-white/10 py-6">
              <div>
                <p className="text-[10px] text-teal-100 uppercase font-semibold tracking-wider mb-1">Income Band</p>
                <p className="font-extrabold text-lg">₹20k – ₹25k</p>
              </div>
              <div>
                <p className="text-[10px] text-teal-100 uppercase font-semibold tracking-wider mb-1">Estimated Tenure</p>
                <p className="font-extrabold text-lg">3.4 Years</p>
              </div>
              <div>
                <p className="text-[10px] text-teal-100 uppercase font-semibold tracking-wider mb-1">Activity Level</p>
                <p className="font-extrabold text-lg">High Activity</p>
              </div>
              <div>
                <p className="text-[10px] text-teal-100 uppercase font-semibold tracking-wider mb-1">Trust Score</p>
                <p className="font-extrabold text-3xl text-white">92</p>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                {verifications.map((v, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-teal-50">
                    <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-teal-100 text-[10px]">✓</span>
                    <span>{v.name}</span>
                  </div>
                ))}
              </div>
              
              {/* Fake QR code */}
              <div className="bg-white p-2 rounded-xl shadow-md border border-white/10 shrink-0">
                <QrCode className="w-12 h-12 text-[#129E7B]" />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Passport Generation Process Visualization */}
        <div className="space-y-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
              Watch Your Passport Being Built
            </h3>
            <p className="text-slate-500 text-sm">
              Real-time journey from data to trust.
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[rgba(15,23,42,0.06)] rounded-[24px] p-8 shadow-sm space-y-8 relative">
            
            {/* Step visualization strip */}
            <div className="flex justify-between items-center relative">
              <div className="absolute top-[22px] left-[5%] right-[5%] h-1 bg-slate-200 -z-10" />
              <div 
                className="absolute top-[22px] left-[5%] h-1 bg-[#18C79C] -z-10 transition-all duration-1000 ease-out" 
                style={{ width: "70%" }} 
              />
              
              {steps.map((st, i) => (
                <div key={i} className="flex flex-col items-center gap-2 relative">
                  <div 
                    className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-md transition-all duration-300 ${
                      st.done ? "bg-[#18C79C] text-white" :
                      st.active ? "bg-amber-400 text-white animate-pulse" :
                      "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {st.done ? (
                      <span className="font-bold text-sm">✓</span>
                    ) : (
                      <span className="font-extrabold text-xs">{i+1}</span>
                    )}
                  </div>
                  <span className={`text-xs font-black tracking-tight ${st.active ? "text-slate-800" : "text-slate-400"}`}>
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Status updates */}
            <div className="border-t border-slate-200/60 pt-6 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-500">Analyzing work history...</span>
                <span className="font-extrabold text-[#18C79C]">75%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#18C79C] to-[#22D3EE] rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            {/* Live processing indicator */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-[rgba(15,23,42,0.04)] shadow-sm">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                Reading monthly earning consistency through consent-based API aggregator logs.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
