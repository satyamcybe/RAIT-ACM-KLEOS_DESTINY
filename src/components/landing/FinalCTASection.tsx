import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTASection() {
  return (
    <section className="py-24 bg-teal-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to claim your digital identity?
        </h2>
        <p className="text-teal-100 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of gig workers in India who are turning their hard work into verifiable financial trust. It takes less than 2 minutes to start.
        </p>
        <Link href="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 hover:bg-teal-50 rounded-xl font-bold text-lg transition-colors shadow-lg">
          Start Verification Now <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
