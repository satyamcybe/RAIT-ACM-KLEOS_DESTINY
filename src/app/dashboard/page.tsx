// ===========================================
// PRANAM - Dashboard Page
// Main dashboard with overview cards
// ===========================================

import Link from "next/link";
import { IdentityCard } from "@/components/identity/IdentityCard";
import { prisma } from "@/lib/database/prisma";

export default async function DashboardPage() {
  const firstWorker = await prisma.worker.findFirst();
  const workerId = firstWorker?.id;

  let allTxns: any[] = [];
  if (workerId) {
    allTxns = await prisma.transaction.findMany({
      where: { workerId },
      orderBy: { txnDate: 'desc' }
    });
  }

  let gigTransactions = 0;
  const gigPlatforms = new Set<string>();
  
  allTxns.forEach(txn => {
    if (txn.narration?.includes("ZOMATO")) { gigTransactions++; gigPlatforms.add("Zomato"); }
    if (txn.narration?.includes("SWIGGY")) { gigTransactions++; gigPlatforms.add("Swiggy"); }
    if (txn.narration?.includes("RAPIDO")) { gigTransactions++; gigPlatforms.add("Rapido"); }
  });

  const platformsDetected = Array.from(gigPlatforms);
  const latestTxns = allTxns.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {firstWorker?.name || "Demo Worker"} 👋
        </h1>
        <p className="mt-1 text-gray-600">
          Here&apos;s your identity and financial overview
        </p>
      </div>

      {/* Layer 2 Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{allTxns.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Gig Transactions</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{gigTransactions}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Detected Platforms</p>
          <div className="mt-2 flex gap-1 flex-wrap">
            {platformsDetected.length > 0 ? platformsDetected.map(p => (
              <span key={p} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">{p}</span>
            )) : <span className="text-sm text-gray-400">None</span>}
          </div>
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

      {/* Latest Transactions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Latest Transactions</h2>
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          {latestTxns.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Narration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {latestTxns.map(txn => (
                  <tr key={txn.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(txn.txnDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {txn.narration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{txn.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${txn.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {txn.type.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              No transactions found. <Link href="/financial-verification" className="text-emerald-600 hover:underline">Link your bank account</Link> to see them.
            </div>
          )}
        </div>
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
