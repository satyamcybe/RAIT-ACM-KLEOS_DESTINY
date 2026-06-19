// ===========================================
// PRANAM - Onboarding Start Page
// Entry point for worker verification
// ===========================================

import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
          <span className="text-3xl">🪪</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Pranam
        </h1>
        <p className="mt-2 text-gray-600">
          Build your verifiable financial identity in 3 simple steps
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Verify Identity via DigiLocker</h3>
              <p className="mt-1 text-sm text-gray-600">
                Connect your Aadhaar through DigiLocker for KYC verification
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Link eShram Card</h3>
              <p className="mt-1 text-sm text-gray-600">
                Verify your eShram worker card for employment validation
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-emerald-200 hover:shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Complete Profile</h3>
              <p className="mt-1 text-sm text-gray-600">
                Add your details and get your verifiable credentials
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/onboarding/digilocker"
        className="block w-full rounded-xl bg-emerald-600 px-6 py-4 text-center text-lg font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Start Verification →
      </Link>

      <p className="text-center text-xs text-gray-400">
        Your data is encrypted and never shared without your consent
      </p>
    </div>
  );
}
