import { Shield, CreditCard, Sparkles, Award } from "lucide-react";

export default function FeaturesBar() {
  const features = [
    {
      icon: Shield,
      title: "Identity Verification",
      desc: "Verify your worker identity using eShram, India's national database, and government-anchored records instantly.",
      color: "text-[#18C79C] bg-[#18C79C]/10 border-[#18C79C]/20"
    },
    {
      icon: CreditCard,
      title: "Earnings Verification",
      desc: "Connect your bank accounts securely through RBI-regulated Account Aggregator infrastructure to verify monthly income.",
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      icon: Sparkles,
      title: "AI Trust Engine",
      desc: "Our AI model analyzes your financial consistency, gig activity, and platform tenure to calculate a dynamic trust score.",
      color: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      icon: Award,
      title: "Digital Reputation Passport",
      desc: "Get a W3C-compliant, tamper-evident digital passport that belongs entirely to you and remains fully portable.",
      color: "text-purple-600 bg-purple-50 border-purple-100"
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#18C79C] uppercase tracking-widest mb-3">
            Core Engine
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight">
            Trusted. Verified. Empowered.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="bg-white border border-[rgba(15,23,42,0.06)] p-8 rounded-[24px] shadow-custom hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${feat.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-[#0F172A] text-xl mb-3">{feat.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
