"use client";

import { Check, Landmark, ChevronRight } from "lucide-react";
import WorkerProfileCard from "./WorkerProfileCard";
import VerificationBadge from "./VerificationBadge";
import { useRouter } from "next/navigation";

export default function Layer1CompleteScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top: Success animation */}
      <div
        className="w-[72px] h-[72px] bg-teal-500 rounded-full flex items-center justify-center mb-4"
      >
        <Check className="w-9 h-9 text-white" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900">Identity Verified</h2>
      <p className="text-sm text-slate-500 text-center mt-1 mb-8">
        Your identity has been verified successfully. Here is your worker profile.
      </p>

      {/* Worker Profile Card */}
      <WorkerProfileCard
        name="Raju Kumar"
        initials="RK"
        role="Delivery Partner"
        sector="Transport & Delivery"
        registeredYear="2021"
        verifications={{
          aadhaar: true,
          eshram: true,
          uan: true,
          digilocker: true
        }}
      />

      {/* Below card badges */}
      <div
        className="flex gap-3 mt-6 flex-wrap justify-center"
      >
        <VerificationBadge label="DigiLocker Verified" colorScheme="blue" />
        <VerificationBadge label="eShram Verified" colorScheme="purple" />
        <VerificationBadge label="UAN Extracted" colorScheme="teal" />
      </div>

      {/* Layer 2 CTA block */}
      <div className="w-full border-t border-slate-100 mt-8 pt-6">
        <div className="text-xs uppercase tracking-wider text-slate-400 mb-4">What&apos;s Next</div>
        
        <button
          onClick={() => router.push('/financial-verification')}
          className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4 hover:bg-amber-100 transition-colors text-left"
        >
          <div className="flex-shrink-0">
            <Landmark className="w-7 h-7 text-amber-600" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 text-sm">Layer 2 · Financial Verification</div>
            <div className="text-xs text-slate-500 mt-0.5">Connect your bank account to verify earnings</div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-500 flex-shrink-0" />
        </button>

        <p className="text-xs text-slate-400 text-center mt-6">
          You can always come back to complete Layer 2 later.
        </p>
      </div>
    </div>
  );
}
