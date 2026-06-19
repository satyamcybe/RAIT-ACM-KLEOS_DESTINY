"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-black text-sm">
            P
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-xl">
            Praa<span className="text-teal-600">maan</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#how-it-works" className="hover:text-teal-600 transition-colors">How it Works</Link>
          <Link href="#trust-score" className="hover:text-teal-600 transition-colors">Trust Score</Link>
          <Link href="#institutions" className="hover:text-teal-600 transition-colors">For Partners</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="hidden sm:block text-sm font-semibold text-slate-700 hover:text-teal-600 transition-colors">
            Log In
          </Link>
          <Link href="/onboarding" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
