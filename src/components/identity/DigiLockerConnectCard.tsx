"use client";

import { Check } from "lucide-react";
import { generateOAuthUrl } from "@/lib/digilocker/oauth";

interface DigiLockerConnectCardProps {
  onConnect: () => void;
}

export default function DigiLockerConnectCard({ onConnect }: DigiLockerConnectCardProps) {
  const handleConnect = () => {
    onConnect();
    // In a real flow, this redirects the window. We'll simulate the redirect delay in the parent.
    setTimeout(() => {
      window.location.href = generateOAuthUrl();
    }, 1500);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="bg-blue-50 rounded-xl px-4 py-2 inline-flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
          D
        </div>
        <span className="text-blue-700 font-semibold text-sm">DigiLocker</span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
          <span>Your name and Aadhaar number</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
          <span>Your eShram card (if registered)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
          <span>Your government document list</span>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-800 mb-6 leading-relaxed">
        We only read your documents. We never modify, delete, or share them without your explicit consent.
      </div>

      <button
        onClick={handleConnect}
        className="bg-slate-900 text-white rounded-xl py-3 font-semibold text-sm w-full hover:bg-slate-800 transition-colors"
      >
        Connect DigiLocker →
      </button>
    </div>
  );
}
