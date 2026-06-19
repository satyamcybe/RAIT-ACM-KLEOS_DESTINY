import React from "react";
import Link from "next/link";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-sm">
              P
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Praa<span className="text-amber-500">maan</span></span>
          </Link>
          {/* Layer references removed */}
        </div>
      </div>

      {/* Main content container */}
      <main className="max-w-2xl mx-auto px-4 pt-12 pb-24">
        {children}
      </main>
    </div>
  );
}
