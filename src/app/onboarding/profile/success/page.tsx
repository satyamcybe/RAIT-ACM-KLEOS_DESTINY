// ===========================================
// PRANAM - Onboarding Success Page
// Shown after profile completion
// ===========================================

import Link from "next/link";

export default function ProfileSuccessPage() {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <span className="text-4xl">🎉</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Profile Complete!
        </h1>
        <p className="mt-2 text-gray-600">
          You&apos;re all set. Your verifiable identity is ready.
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-left">
        <h3 className="font-semibold text-gray-900">Your Identity Summary</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs">✓</span>
            <span className="text-sm text-gray-700">Aadhaar verified via DigiLocker</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs">✓</span>
            <span className="text-sm text-gray-700">eShram card linked</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs">✓</span>
            <span className="text-sm text-gray-700">Profile completed</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/dashboard"
          className="block w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Go to Dashboard →
        </Link>
        <Link
          href="/financial-verification"
          className="block text-sm text-emerald-600 hover:text-emerald-700"
        >
          Or link your bank account for financial verification
        </Link>
      </div>
    </div>
  );
}
