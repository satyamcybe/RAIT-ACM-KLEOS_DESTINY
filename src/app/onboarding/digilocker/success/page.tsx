// ===========================================
// PRANAM - DigiLocker Success Page
// Shown after successful Aadhaar verification
// ===========================================

import Link from "next/link";

export default function DigiLockerSuccessPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <span className="text-4xl">✅</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Aadhaar Verified!
        </h1>
        <p className="mt-2 text-gray-600">
          Your identity has been successfully verified through DigiLocker
        </p>
      </div>

      {/* Verified details */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-left">
        <h3 className="font-semibold text-emerald-900">Verified Details</h3>
        <div className="mt-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-emerald-700">Name</span>
            <span className="font-medium text-emerald-900">Rajesh Kumar</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-emerald-700">Aadhaar</span>
            <span className="font-medium text-emerald-900">XXXX-XXXX-5678</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-emerald-700">Date of Birth</span>
            <span className="font-medium text-emerald-900">15 May 1990</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-emerald-600">
          * Mock data — real verification will use DigiLocker sandbox
        </p>
      </div>

      <Link
        href="/onboarding/eshram"
        className="block w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Continue to eShram Verification →
      </Link>
    </div>
  );
}
