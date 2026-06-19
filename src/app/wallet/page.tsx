// ===========================================
// PRANAM - Wallet Page
// Verifiable Credentials wallet
// ===========================================

"use client";

import { EmptyState } from "@/components/shared/empty-state";

export default function WalletPage() {
  // TODO: Fetch credentials from API
  const credentials: unknown[] = [];

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
          {/* TODO: Map credentials to CredentialCard components */}
        </div>
      )}
    </div>
  );
}
