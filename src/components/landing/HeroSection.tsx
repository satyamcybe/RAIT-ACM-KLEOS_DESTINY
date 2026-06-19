"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-50 rounded-full blur-3xl -z-10 opacity-50" />
      
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-8"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>India&apos;s first Trust Infrastructure for Gig Workers</span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
        >
          Turn your gig work <br className="hidden md:block" />
          into <span className="text-teal-600">verifiable trust.</span>
        </h1>

        <p
          className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
        >
          Pramaan combines your DigiLocker identity, eShram registration, and financial history into a single, portable Labour Passport.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/onboarding" className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2">
            Create your Labour Passport
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
