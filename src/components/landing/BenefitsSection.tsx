import { Landmark, Briefcase, Globe } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Landmark,
      title: "Access Better Financial Products",
      desc: "Unlock lower interest rates, faster loan approvals, and customized insurance policies that fit your gig income cycle.",
      badge: "Financial Access"
    },
    {
      icon: Briefcase,
      title: "Get Hired Faster",
      desc: "Share your instant verified work passport with new platforms to skip long background checks and start earning immediately.",
      badge: "Fast Onboarding"
    },
    {
      icon: Globe,
      title: "Build Portable Reputation",
      desc: "Your hard work isn't locked to Zomato or Uber. Carry your tenure, ratings, and consistency score wherever you go.",
      badge: "Total Ownership"
    }
  ];

  return (
    <section className="py-24 bg-[#F8FAFC] border-t border-[rgba(15,23,42,0.06)]">
      <div className="max-w-[1440px] mx-auto px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#18C79C] uppercase tracking-widest mb-3">
            Why Pramaan
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight">
            Designed for Gig Workers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx}
                className="bg-white/80 backdrop-blur-md border border-white/60 p-8 rounded-[24px] shadow-custom hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#18C79C]/5 to-transparent rounded-bl-[120px] transition-all duration-500 group-hover:scale-110" />
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100/50 flex items-center justify-center text-[#18C79C] mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-[#18C79C] bg-[#18C79C]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider block w-fit mb-3">
                  {benefit.badge}
                </span>
                <h4 className="font-extrabold text-[#0F172A] text-lg mb-3 leading-snug">{benefit.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
