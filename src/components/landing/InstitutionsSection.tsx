"use client";

import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InstitutionsSection() {
  return (
    <section id="institutions" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">For Banks & Gig Platforms</h2>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Integrate with Pramaan&apos;s API to instantly verify worker identities, assess creditworthiness, and streamline onboarding. We provide the trust layer so you can focus on growth.
        </p>
        <Link href="/api-docs" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          View Developer Documentation <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
