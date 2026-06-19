// ===========================================
// PRANAM - DigiLocker Verification Page
// Step 1: Aadhaar verification via DigiLocker
// ===========================================

"use client";

import Link from "next/link";

export default function DigiLockerPage() {
  // TODO: Implement DigiLocker verification flow with useIdentity hook

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/onboarding"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to steps
        </Link>
      </div>

      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
          <span className="text-2xl">🪪</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Verify with DigiLocker
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ll verify your identity using your Aadhaar via DigiLocker
        </p>
      </div>

      {/* Mock verification card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-800">
              🔒 Running in Mock Mode
            </p>
            <p className="mt-1 text-xs text-emerald-600">
              DigiLocker verification is simulated. No real API calls will be made.
            </p>
          </div>

          {/* TODO: Replace with actual DigiLocker flow */}
          <button
            onClick={() => {
              // TODO: Call initiateDigiLocker()
              window.location.href = "/onboarding/digilocker/success";
            }}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Connect DigiLocker
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/onboarding/eshram"
          className="text-sm text-gray-500 hover:text-emerald-600"
        >
          Skip for now →
        </Link>
      </div>
    </div>
  );
}
