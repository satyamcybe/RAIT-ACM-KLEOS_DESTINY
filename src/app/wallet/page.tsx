// ===========================================
// PRAMAAN - Wallet Page
// Verifiable Credentials wallet
// ===========================================

"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { useMockData } from "@/lib/context/MockDataContext";

export default function WalletPage() {
  const { credentials } = useMockData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Credential Wallet</h1>
          <p className="mt-1 text-sm text-gray-600">
            Your verifiable credentials, issued and stored securely
          </p>
        </div>
        <button
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          onClick={() => {
            // TODO: Open issue credential dialog
          }}
        >
          + Issue Credential
        </button>
      </div>

      {credentials.length === 0 ? (
        <EmptyState
          icon="👛"
          title="No Credentials Yet"
          description="Complete your identity and financial verification to receive your first verifiable credentials."
          action={{ label: "Start Verification", href: "/onboarding" }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {credentials.map((cred) => (
            <div key={cred.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  {cred.type.includes("Financial") ? "🏦" : "🛡️"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cred.type}</h3>
                  <p className="text-xs text-gray-500">{cred.issuer}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                <span>Issued: {cred.date}</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium">Verified ✓</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
