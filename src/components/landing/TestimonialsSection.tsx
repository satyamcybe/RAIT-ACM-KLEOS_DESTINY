import { Star, ShieldCheck } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      initials: "RK",
      name: "Raju Kumar",
      role: "Delivery Partner",
      score: "92",
      quote: "Pramaan helped me connect my bank statement and eShram details. I walked into the local branch and got my two-wheeler loan approved in just 48 hours without showing payslips!",
      improvement: "+25% loan terms improvement",
      verified: "eShram + DigiLocker Verified"
    },
    {
      initials: "AS",
      name: "Amit Sharma",
      role: "Ride-sharing Driver",
      score: "95",
      quote: "I've been driving for 4 years but landlords always asked for corporate salary slips. Sharing my Pramaan Trust Passport showed my real work regularity and got me a flat instantly.",
      improvement: "Rent security deposit halved",
      verified: "DigiLocker + AA Verified"
    },
    {
      initials: "PD",
      name: "Pooja Devi",
      role: "Home Care Professional",
      score: "89",
      quote: "Platforms charge commission and keep my ratings. My Pramaan profile lets me prove my 5-star rating directly to premium clients on my own terms. My earnings have shot up.",
      improvement: "+40% monthly earning jump",
      verified: "eShram Verified"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-[rgba(15,23,42,0.06)]">
      <div className="max-w-[1440px] mx-auto px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#18C79C] uppercase tracking-widest mb-3">
            Success Stories
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight">
            Hear from Verified Partners
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white border border-[rgba(15,23,42,0.06)] p-8 rounded-[24px] shadow-custom flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 relative group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 font-extrabold text-sm border border-slate-200">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{t.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{t.role}</p>
                    </div>
                  </div>
                  <div className="bg-[#18C79C]/10 border border-[#18C79C]/25 text-[#18C79C] font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <span>★</span>
                    <span>{t.score}</span>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Bottom row metrics */}
              <div className="border-t border-slate-100 pt-6 mt-6 space-y-3">
                <div className="bg-emerald-50 text-emerald-700 font-black text-xs px-3.5 py-1.5 rounded-xl w-fit flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{t.improvement}</span>
                </div>
                <div className="text-[10px] text-[#18C79C] font-black tracking-wider uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 fill-[#18C79C] text-white" />
                  <span>{t.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
