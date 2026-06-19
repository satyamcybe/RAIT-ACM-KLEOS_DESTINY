import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-28 bg-[#0F172A] relative overflow-hidden text-center border-t border-slate-800">
      {/* Background glow behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#18C79C]/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-8 relative z-10 space-y-8">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
          Ready to Build Your <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-[#18C79C] to-[#22D3EE] bg-clip-text text-transparent">Trust Passport?</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-medium">
          Start building a verified reputation today.
        </p>

        <div className="pt-6 relative inline-block group">
          {/* Button glow backdrop */}
          <div className="absolute inset-0 bg-[#18C79C] rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-all duration-300 transform scale-95" />
          <Link 
            href="/onboarding" 
            className="relative inline-flex items-center gap-2.5 px-10 py-5 bg-gradient-to-r from-[#18C79C] to-[#129E7B] text-white rounded-2xl font-black text-xl shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
          >
            Generate Passport <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}
