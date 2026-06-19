"use client";

import { ShieldCheck, UserCheck, FileText, Fingerprint, CheckCircle2, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DigiLockerConnectCard from "@/components/identity/DigiLockerConnectCard";
import OAuthRedirectScreen from "@/components/identity/OAuthRedirectScreen";
import { useMockData } from "@/lib/context/MockDataContext";

export default function OnboardingPage() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { identityVerified, user, resetDemo } = useMockData();

  if (identityVerified) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-8 select-none animate-in fade-in duration-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Verified Identity Profile</h1>
          <p className="mt-1 text-sm text-gray-500">
            Your identity has been authenticated against national registries.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Aadhaar Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-600" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/50">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Aadhaar Card</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">UIDAI e-KYC</p>
                </div>
              </div>
              <span className="bg-[#E8F5EF] text-[#1A6B47] border border-emerald-100/60 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-50 text-xs font-mono text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400 font-sans">Full Name:</span>
                <span className="text-gray-800 font-bold">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-sans">Date of Birth:</span>
                <span className="text-gray-800 font-semibold">{user.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-sans">Aadhaar Number:</span>
                <span className="text-gray-800 font-bold">{user.aadhaar}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-dashed border-gray-100">
                <span className="text-[10px] text-gray-400 font-sans">Security Signature:</span>
                <span className="text-[10px] text-emerald-600 font-bold">SHA256-AUTHENTIC</span>
              </div>
            </div>
          </div>

          {/* e-Shram Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">e-Shram Registry</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ministry of Labour</p>
                </div>
              </div>
              <span className="bg-blue-50 text-blue-600 border border-blue-100/60 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Active
              </span>
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-50 text-xs font-mono text-gray-600">
              <div className="flex justify-between">
                <span className="text-gray-400 font-sans">UAN:</span>
                <span className="text-gray-800 font-bold">1200-9876-5432</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-sans">Occupation:</span>
                <span className="text-gray-800 font-semibold">{user.occupation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-sans">Employment Category:</span>
                <span className="text-gray-800 font-semibold">Platform/Gig Worker</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-dashed border-gray-100">
                <span className="text-[10px] text-gray-400 font-sans">State Mapping:</span>
                <span className="text-[10px] text-blue-600 font-bold">Maharashtra (MH)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Actions */}
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Need to update your documents?</h4>
            <p className="text-xs text-gray-500 mt-0.5">You can reset your identity verification status and re-verify.</p>
          </div>
          <button
            onClick={async () => {
              if (confirm("Reset identity status? This will restart the onboarding flow.")) {
                await resetDemo();
                router.push("/onboarding");
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-700 shadow-2xs transition-colors cursor-pointer active:scale-[0.98]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Identity</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Progress / Breadcrumb */}
      <div className="mb-8">
        <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">
          Step 1 of 3 · Identity Verification
        </div>
        <div className="flex gap-1">
          <div className="h-1.5 rounded-full flex-1 bg-amber-500"></div>
          <div className="h-1.5 rounded-full flex-1 bg-slate-100"></div>
          <div className="h-1.5 rounded-full flex-1 bg-slate-100"></div>
        </div>
      </div>

      {/* Heading block */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 mb-6">
          <ShieldCheck className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="font-bold text-2xl text-slate-900 mb-3">Verify your identity</h1>
        <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          We use DigiLocker — India&apos;s official government document wallet —
          to verify your identity. This takes less than 60 seconds.
        </p>
      </div>

      {/* Action Card */}
      <DigiLockerConnectCard onConnect={() => setIsRedirecting(true)} />

      {/* Bottom Note */}
      <div className="text-xs text-slate-400 text-center mt-6">
        Protected by DigiLocker · Government of India
      </div>

      {/* Overlay */}
      {isRedirecting && <OAuthRedirectScreen />}
    </div>
  );
}
