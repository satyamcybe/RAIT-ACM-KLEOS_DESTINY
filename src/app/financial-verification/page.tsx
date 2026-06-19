// ===========================================
// PRANAM - Financial Verification Page
// Account Aggregator consent and data flow
// ===========================================

"use client";

import Link from "next/link";

export default function FinancialVerificationPage() {
  // TODO: Implement AA consent flow with useFinancial hook

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-2xl">🏦</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Financial Verification
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Link your bank account via Account Aggregator to build your financial profile
        </p>
      </div>

      {/* Consent info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">What we&apos;ll access</h3>
        <div className="mt-4 space-y-3">
          {[
            { icon: "💳", label: "Savings Account Summary", desc: "Balance and account details" },
            { icon: "📊", label: "Transaction History", desc: "Last 6 months of transactions" },
            { icon: "📈", label: "Income Patterns", desc: "Salary and credit patterns" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mock mode notice */}
      <div className="rounded-lg bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-800">
          ⚡ Running in Mock Mode
        </p>
        <p className="mt-1 text-xs text-amber-600">
          Account Aggregator flow is simulated. No real bank data will be accessed.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          // TODO: Call requestConsent()
          window.location.href = "/dashboard";
        }}
        className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Give Consent & Link Account
      </button>

      <div className="text-center">
        <Link
          href="/dashboard"
          className="text-sm text-gray-500 hover:text-emerald-600"
        >
          Skip for now →
        </Link>
      </div>
    </div>
  );
}
