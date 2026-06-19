"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-[rgba(15,23,42,0.06)] transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#18C79C] to-[#129E7B] flex items-center justify-center text-white font-black text-base shadow-sm">
            P
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-xl">
            Praa<span className="text-[#18C79C]">maan</span>
          </span>
        </Link>
        
        {/* Centered Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="#how-it-works" className="hover:text-[#18C79C] transition-colors duration-200">How It Works</Link>
          <Link href="#features" className="hover:text-[#18C79C] transition-colors duration-200">Features</Link>
          <Link href="#trust-score" className="hover:text-[#18C79C] transition-colors duration-200">Trust Score</Link>
          <Link href="#institutions" className="hover:text-[#18C79C] transition-colors duration-200">Institutions</Link>
          <Link href="#pricing" className="hover:text-[#18C79C] transition-colors duration-200">Pricing</Link>
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="hidden sm:block text-sm font-bold text-slate-700 hover:text-[#18C79C] transition-colors duration-200">
            Log In
          </Link>
          <Link 
            href="/onboarding" 
            className="bg-gradient-to-r from-[#18C79C] to-[#047857] hover:opacity-95 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Generate Passport
          </Link>
        </div>

      </div>
    </header>
  );
}
