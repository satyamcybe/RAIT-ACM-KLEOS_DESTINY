import { UserCheck, Landmark, Activity, TrendingUp, Award, ChevronRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: UserCheck,
      title: "1. Verify Identity",
      desc: "Using eShram & DigiLocker",
      color: "from-blue-400 to-blue-600 bg-blue-50"
    },
    {
      icon: Landmark,
      title: "2. Connect Accounts",
      desc: "Secure RBI AA Integration",
      color: "from-emerald-400 to-emerald-600 bg-emerald-50"
    },
    {
      icon: Activity,
      title: "3. Analyze Data",
      desc: "Financial + Work Pattern Analysis",
      color: "from-purple-400 to-purple-600 bg-purple-50"
    },
    {
      icon: TrendingUp,
      title: "4. AI Evaluation",
      desc: "Generate Trust Score",
      color: "from-amber-400 to-amber-600 bg-amber-50"
    },
    {
      icon: Award,
      title: "5. Get Passport",
      desc: "Share your verified Labour Passport",
      color: "from-teal-400 to-teal-600 bg-teal-50"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-y border-[rgba(15,23,42,0.06)]">
      <div className="max-w-[1440px] mx-auto px-8">
        
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-[#18C79C] uppercase tracking-widest mb-3">Workflow</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight">How Pramaan Works</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-4 relative px-4">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center flex-1 w-full lg:w-auto animate-step"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Step Circle with Gradient Icon */}
                <div className="relative group flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center border border-[rgba(15,23,42,0.06)] shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${step.color} flex items-center justify-center text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Connector Line for Desktop */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+45px)] w-[calc(100%-90px)] h-0.5 border-t-2 border-dashed border-slate-200" />
                  )}
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 max-w-[180px] mx-auto leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
