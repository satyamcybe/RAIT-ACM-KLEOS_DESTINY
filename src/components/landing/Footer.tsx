import Link from "next/link";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] py-16 text-slate-500 border-t border-[rgba(15,23,42,0.06)] font-sans">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
        
        {/* Branding & Newsletter */}
        <div className="col-span-2 space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#18C79C] to-[#129E7B] flex items-center justify-center text-white font-black text-sm">
              P
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">Pramaan</span>
          </Link>
          
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
            Building the trust layer for gig workers and modern institutions.
          </p>

          {/* Newsletter field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Subscribe to updates
            </label>
            <div className="flex gap-2 max-w-sm">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white border border-[rgba(15,23,42,0.08)] px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#18C79C] w-full shadow-sm"
              />
              <button className="bg-gradient-to-r from-[#18C79C] to-[#129E7B] hover:opacity-95 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Column */}
        <div className="col-span-1">
          <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Product</h4>
          <ul className="space-y-3 text-sm font-semibold">
            <li><Link href="#how-it-works" className="hover:text-[#18C79C] transition-colors">How it works</Link></li>
            <li><Link href="#features" className="hover:text-[#18C79C] transition-colors">Features</Link></li>
            <li><Link href="#trust-score" className="hover:text-[#18C79C] transition-colors">Trust Score</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="col-span-1">
          <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm font-semibold">
            <li><Link href="/about" className="hover:text-[#18C79C] transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-[#18C79C] transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-[#18C79C] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="col-span-1">
          <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Resources</h4>
          <ul className="space-y-3 text-sm font-semibold">
            <li><Link href="/blog" className="hover:text-[#18C79C] transition-colors">Blog</Link></li>
            <li><Link href="/docs" className="hover:text-[#18C79C] transition-colors">Documentation</Link></li>
            <li><Link href="/help" className="hover:text-[#18C79C] transition-colors">Help Center</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="col-span-1">
          <h4 className="text-slate-900 font-bold text-sm mb-4 uppercase tracking-wider">Legal</h4>
          <ul className="space-y-3 text-sm font-semibold">
            <li><Link href="/privacy" className="hover:text-[#18C79C] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#18C79C] transition-colors">Terms of Service</Link></li>
            <li><Link href="/security" className="hover:text-[#18C79C] transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-8 pt-8 border-t border-slate-200/50 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-medium">
        <p>© {new Date().getFullYear()} Pramaan. All rights reserved.</p>
        <p className="text-slate-400">Made with ❤️ for India&apos;s Gig Workers</p>
      </div>
    </footer>
  );
}
