"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 h-16 bg-white border-b border-[#E5E7EB] select-none">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/logo-text.png" 
            alt="Pranam Logo" 
            className="h-8 w-auto object-contain"
          />
        </Link>

        
        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] text-[#6B7280]">
          <Link href="#how-it-works" className="hover:text-[#1A6B47] font-medium transition-colors">
            How It Works
          </Link>
          <Link href="#for-workers" className="hover:text-[#1A6B47] font-medium transition-colors">
            For Workers
          </Link>
          <Link href="#institutions" className="hover:text-[#1A6B47] font-medium transition-colors">
            For Banks
          </Link>
          <Link href="#footer" className="hover:text-[#1A6B47] font-medium transition-colors">
            About
          </Link>
        </nav>

        {/* Right: CTA Button */}
        <div>
          <Link 
            href="/onboarding" 
            className="btn-primary py-2 px-5 text-[15px] rounded-[8px]"
          >
            Get My Credential
          </Link>
        </div>

      </div>
    </header>
  );
}
