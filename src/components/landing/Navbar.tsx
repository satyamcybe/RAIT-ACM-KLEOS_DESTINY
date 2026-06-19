"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 h-16 bg-[#FFFFFF] border-b border-[#E5E1DA] select-none">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* Custom inline SVG shield checkmark logo */}
          <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L4 5V11C4 16.52 7.42 21.64 12 23C16.58 21.64 20 16.52 20 11V5L12 2Z"
              fill="#1A4D3A"
            />
            <path
              d="M9 11.5L11 13.5L15 9.5"
              stroke="#2ECC8F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span 
            className="text-[22px] font-bold text-[#111827] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Pramaan
          </span>
        </Link>
        
        {/* Center: Navigation Links */}
        <nav 
          className="hidden md:flex items-center gap-6 h-full text-[15px] text-[#6B7280]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Link 
            href="#how-it-works" 
            className="hover:text-[#1A4D3A] h-full flex items-center border-b-2 border-transparent hover:border-[#2ECC8F] transition-all duration-200"
          >
            How It Works
          </Link>
          <Link 
            href="#features" 
            className="hover:text-[#1A4D3A] h-full flex items-center border-b-2 border-transparent hover:border-[#2ECC8F] transition-all duration-200"
          >
            Features
          </Link>
          <Link 
            href="#about" 
            className="hover:text-[#1A4D3A] h-full flex items-center border-b-2 border-transparent hover:border-[#2ECC8F] transition-all duration-200"
          >
            About
          </Link>
          <Link 
            href="#institutions" 
            className="hover:text-[#1A4D3A] h-full flex items-center border-b-2 border-transparent hover:border-[#2ECC8F] transition-all duration-200"
          >
            For Institutions
          </Link>
        </nav>

        {/* Right: CTA Button */}
        <div className="flex items-center gap-4">
          <Link 
            href="/onboarding" 
            className="bg-[#1A4D3A] hover:bg-[#153D2E] text-[#FFFFFF] text-[15px] font-medium px-6 py-2.5 rounded-[100px] shadow-sm hover:shadow-md transition-all duration-300"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Get Your Pramaan &rarr;
          </Link>
        </div>

      </div>
    </header>
  );
}
