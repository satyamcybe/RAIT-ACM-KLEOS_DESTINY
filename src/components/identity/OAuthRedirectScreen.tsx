"use client";

import { Loader2 } from "lucide-react";
export default function OAuthRedirectScreen() {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center transition-opacity duration-300">
      <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-4" />
      <h2 className="text-lg font-semibold text-slate-900 mb-2">Redirecting to DigiLocker...</h2>
      <p className="text-sm text-slate-500">You will be returned here automatically</p>
    </div>
  );
}
