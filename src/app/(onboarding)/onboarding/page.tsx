"use client";

import { ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DigiLockerConnectCard from "@/components/identity/DigiLockerConnectCard";
import OAuthRedirectScreen from "@/components/identity/OAuthRedirectScreen";
import { useMockData } from "@/lib/context/MockDataContext";

export default function OnboardingPage() {
  const { identityVerified } = useMockData();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (identityVerified) {
      router.replace('/dashboard');
    }
  }, [identityVerified, router]);

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
