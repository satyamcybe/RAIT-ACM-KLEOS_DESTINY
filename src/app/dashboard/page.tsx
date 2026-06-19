// ===========================================
// PRANAM - Dashboard Page
// Main dashboard with overview cards
// ===========================================

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IdentityCard } from "@/components/identity/IdentityCard";
import { useMockData } from "@/lib/context/MockDataContext";
import { QrCode } from "lucide-react";

export default function DashboardPage() {
  const { user, identityVerified, bankLinked } = useMockData();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [credential, setCredential] = useState<any>(null);
  const [issuing, setIssuing] = useState(false);

  useEffect(() => {
    if (bankLinked) {
      fetch("/api/financial/profile")
        .then(res => res.json())
        .then(data => {
          setProfile(data.data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [bankLinked]);

  const handleIssueCredential = async () => {
    setIssuing(true);
    try {
      const res = await fetch("/api/credential/issue", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setCredential(data.data);
      }
    } catch (err) {
      console.error(err);
    }
    setIssuing(false);
  };

  const getBadge = (score: number) => {
    if (score >= 700) return <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">Gold Reliability</span>;
    if (score >= 500) return <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">Silver Reliability</span>;
    return <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">Bronze Reliability</span>;
  };

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  const score = profile?.reputationScore ? Math.round(profile.reputationScore * 10) : 0;
  const signals = profile?.signalsJson || {};

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {identityVerified ? user.name.split(' ')[0] : "Demo Worker"} 👋
        </h1>
        <p className="mt-1 text-gray-600">
          Here&apos;s your identity and financial overview
        </p>
      </div>

      {bankLinked && profile && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Your Pramaan Score</p>
              <div className="flex items-center">
                <span className="text-6xl font-extrabold text-blue-900">{score}</span>
                {getBadge(score)}
              </div>
              <p className="text-xs text-blue-500 mt-2">Rating data: Simulated (zkTLS integration pending)</p>
            </div>
            
            <div className="mt-6 md:mt-0">
              {!credential ? (
                <button 
                  onClick={handleIssueCredential}
                  disabled={issuing}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors flex items-center gap-2 disabled:opacity-70"
                >
                  {issuing ? "Issuing..." : "Get My Credential"}
                </button>
              ) : (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                  <div className="bg-white p-2 border border-gray-100 rounded-lg mb-2">
                    <QrCode size={100} className="text-gray-800" />
                  </div>
                  <p className="text-xs font-mono text-gray-500 break-all w-32 text-center">{credential.credentialId}</p>
                  <Link href={`/verify/${credential.credentialId}`} target="_blank" className="text-xs text-blue-600 mt-1 hover:underline">View Public Page</Link>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 border-t border-blue-100 pt-6">
            <div>
              <p className="text-sm text-blue-600 font-medium">Tenure</p>
              <p className="text-xl font-bold text-gray-900">{signals.tenureMonths || 0} months</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Consistency</p>
              <p className="text-xl font-bold text-gray-900">{signals.consistencyPct || 0}%</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Avg Income</p>
              <p className="text-xl font-bold text-gray-900">₹{Math.round(profile.avgMonthlyIncome || 0).toLocaleString('en-IN')}/mo</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                {signals.incomeTrend === "growing" ? "Growing ↑" : "Stable ↔"}
              </p>
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Deliveries</p>
              <p className="text-xl font-bold text-gray-900">~{signals.estDeliveriesRange || "0-0"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Identity cards */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Identity Verification</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <IdentityCard
            type="aadhaar"
            name={identityVerified ? user.name : "Unverified User"}
            verified={identityVerified}
            details={identityVerified ? { "Aadhaar": user.aadhaar, "DOB": user.dob } : undefined}
          />
          <IdentityCard
            type="eshram"
            name={identityVerified ? user.name : "Unverified User"}
            verified={identityVerified}
            details={identityVerified ? { "UAN": "ESHRAM001", "Occupation": user.occupation } : undefined}
          />
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {!identityVerified && (
            <Link
              href="/onboarding"
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-sm"
            >
              <span className="text-xl">🪪</span>
              <div>
                <p className="font-medium text-gray-900">Verify Identity</p>
                <p className="text-xs text-gray-500">Connect DigiLocker & eShram</p>
              </div>
            </Link>
          )}
          {!bankLinked && (
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
          )}
          <Link
            href="/wallet"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-emerald-200 hover:shadow-sm"
          >
            <span className="text-xl">👛</span>
            <div>
              <p className="font-medium text-gray-900">View Wallet</p>
              <p className="text-xs text-gray-500">Manage your credentials</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
