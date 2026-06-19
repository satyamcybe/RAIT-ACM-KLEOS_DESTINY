import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-teal-600 flex items-center justify-center text-white font-black text-xs">
              P
            </div>
            <span className="font-bold text-white tracking-tight">Pramaan</span>
          </Link>
          <p className="text-sm text-slate-500 mb-4">
            Building financial trust for the informal economy.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link></li>
            <li><Link href="#trust-score" className="hover:text-white transition-colors">Trust Score</Link></li>
            <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Developers</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/api-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
            <li><Link href="/institutions" className="hover:text-white transition-colors">For Institutions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Pramaan. All rights reserved.</p>
        <p className="text-slate-500">Made with ❤️ for India&apos;s Gig Workers</p>
      </div>
    </footer>
  );
}
