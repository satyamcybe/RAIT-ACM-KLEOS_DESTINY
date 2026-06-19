"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer 
      id="footer"
      className="bg-white py-16 text-[#6B7280] border-t border-[#E5E7EB] select-none"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 items-start text-left">
        
        {/* Left Side: Branding */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="/logo-text.png" 
              alt="Pranam Logo" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          <p className="text-[14px] text-[#6B7280] leading-relaxed max-w-xs font-semibold">
            Your Work. Your Proof. Your Future.
          </p>
          <p className="text-[13px] text-[#6B7280] leading-relaxed max-w-xs">
            India&apos;s first portable reputation credential for gig workers.
          </p>
        </div>

        {/* Middle Column: Sitemap links */}
        <div className="space-y-4">
          <h4 className="text-[#111827] font-bold text-[13px] uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-3 text-[14px]">
            <li>
              <Link href="#how-it-works" className="hover:text-[#1A6B47] transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="#for-workers" className="hover:text-[#1A6B47] transition-colors">
                For Workers
              </Link>
            </li>
            <li>
              <Link href="#credential-preview" className="hover:text-[#1A6B47] transition-colors">
                Verify Credential
              </Link>
            </li>
            <li>
              <Link href="#institutions" className="hover:text-[#1A6B47] transition-colors">
                About Institutions
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Data Sources */}
        <div className="space-y-4">
          <h4 className="text-[#111827] font-bold text-[13px] uppercase tracking-wider">Data Integrations</h4>
          <p className="text-[13px] leading-relaxed text-[#6B7280]">
            Pranam securely interfaces directly with consent-based pipelines.
          </p>
          <div className="text-[13px] font-bold text-[#374151]">
            Data Sources: e-Shram, DigiLocker, Setu AA
          </div>
        </div>

      </div>
      
      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-[#E5E7EB] text-[13px] flex flex-col md:flex-row justify-between items-center gap-4 text-[#6B7280]/80">
        <p>&copy; {new Date().getFullYear()} Pranam. All rights reserved.</p>
        <p className="font-semibold text-[#1A6B47]">Built for India&apos;s 7.7 crore gig workers</p>
      </div>

    </footer>
  );
}
