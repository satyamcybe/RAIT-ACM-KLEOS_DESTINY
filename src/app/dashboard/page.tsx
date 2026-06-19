// ===========================================
// PRANAM - Dashboard Page
// Main dashboard with overview cards
// ===========================================

import Link from "next/link";
import { IdentityCard } from "@/components/identity/IdentityCard";
import { FinancialSummary } from "@/components/financial/FinancialSummary";

export default function DashboardPage() {
  // TODO: Fetch real data from API

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, Demo Worker 👋
        </h1>
        <p className="mt-1 text-gray-600">
          Here&apos;s your identity and financial overview
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Verification Score</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">85%</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Reputation Score</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">72/100</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Credentials</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">0</p>
          <Link href="/wallet" className="text-xs text-emerald-600 hover:underline">
            View wallet →
          </Link>
        </div>
      </div>

      {/* Identity cards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Identity Verification</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <IdentityCard
            type="aadhaar"
            name="Rajesh Kumar"
            verified={true}
            details={{ "Aadhaar": "XXXX-XXXX-5678", "DOB": "15 May 1990" }}
          />
          <IdentityCard
            type="eshram"
            name="Rajesh Kumar"
            verified={true}
            details={{ "UAN": "ESHRAM001", "Occupation": "Construction Worker" }}
          />
        </div>
      </div>

      {/* Financial summary */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Financial Overview</h2>
        <FinancialSummary
          avgIncome={15000}
          avgExpense={10000}
          riskScore={35}
          reputationScore={72}
          accountCount={1}
        />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/financial-verification"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-sm"
          >
            <span className="text-xl">🏦</span>
            <div>
              <p className="font-medium text-gray-900">Link Bank Account</p>
              <p className="text-xs text-gray-500">Via Account Aggregator</p>
            </div>
          </Link>
          <Link
            href="/wallet"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-sm"
          >
            <span className="text-xl">👛</span>
            <div>
              <p className="font-medium text-gray-900">View Credentials</p>
              <p className="text-xs text-gray-500">Manage your VCs</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
