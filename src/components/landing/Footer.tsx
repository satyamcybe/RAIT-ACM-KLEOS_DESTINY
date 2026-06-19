"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer 
      className="bg-[#FFFFFF] py-16 text-[#6B7280] border-t border-[#E5E1DA] select-none"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
        
        {/* Branding & Newsletter */}
        <div className="col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              className="text-[20px] font-bold text-[#111827] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Pramaan
            </span>
          </Link>
          
          <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-sm">
            Building the trust layer for gig workers and modern institutions.
          </p>

          {/* Newsletter field */}
          <div className="space-y-2">
            <label className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-[0.08em] block">
              Subscribe to updates
            </label>
            <div className="flex gap-2 max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full text-[14px]"
              />
              <button className="bg-[#1A4D3A] hover:bg-[#153D2E] text-white px-4 rounded-[8px] flex items-center justify-center shadow-sm">
                {/* Custom Inline SVG Send Arrow */}
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product Column */}
        <div className="col-span-1">
          <h4 className="text-[#111827] font-semibold text-[13px] mb-4 uppercase tracking-[0.08em]">Product</h4>
          <ul className="space-y-3 text-[14px]">
            <li><Link href="#how-it-works" className="hover:text-[#1A4D3A] transition-colors">How it works</Link></li>
            <li><Link href="#features" className="hover:text-[#1A4D3A] transition-colors">Features</Link></li>
            <li><Link href="#trust-score" className="hover:text-[#1A4D3A] transition-colors">Trust Score</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="col-span-1">
          <h4 className="text-[#111827] font-semibold text-[13px] mb-4 uppercase tracking-[0.08em]">Company</h4>
          <ul className="space-y-3 text-[14px]">
            <li><Link href="/about" className="hover:text-[#1A4D3A] transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-[#1A4D3A] transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-[#1A4D3A] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="col-span-1">
          <h4 className="text-[#111827] font-semibold text-[13px] mb-4 uppercase tracking-[0.08em]">Resources</h4>
          <ul className="space-y-3 text-[14px]">
            <li><Link href="/blog" className="hover:text-[#1A4D3A] transition-colors">Blog</Link></li>
            <li><Link href="/docs" className="hover:text-[#1A4D3A] transition-colors">Documentation</Link></li>
            <li><Link href="/help" className="hover:text-[#1A4D3A] transition-colors">Help Center</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="col-span-1">
          <h4 className="text-[#111827] font-semibold text-[13px] mb-4 uppercase tracking-[0.08em]">Legal</h4>
          <ul className="space-y-3 text-[14px]">
            <li><Link href="/privacy" className="hover:text-[#1A4D3A] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#1A4D3A] transition-colors">Terms of Service</Link></li>
            <li><Link href="/security" className="hover:text-[#1A4D3A] transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      
      {/* Bottom Footer Info (Strict Emoji-Free) */}
      <div className="max-w-[1440px] mx-auto px-6 pt-8 border-t border-[#E5E1DA] text-[13px] flex flex-col md:flex-row justify-between items-center gap-4 text-[#6B7280]/70 font-medium">
        <p>&copy; {new Date().getFullYear()} Pramaan. All rights reserved.</p>
        <p>Built for the digital reputation of informal workers</p>
      </div>
    </footer>
  );
}
