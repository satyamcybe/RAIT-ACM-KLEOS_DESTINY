// ===========================================
// PRANAM - Financial Verification Page
// Account Aggregator consent and data flow
// ===========================================

"use client";

import Link from "next/link";
import { useState } from "react";

export default function FinancialVerificationPage() {
  const [step, setStep] = useState<'consent' | 'otp'>('consent');
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleVerify = () => {
    if (otp.length < 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-2xl">🏦</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          {step === 'consent' ? "Financial Verification" : "Verify Bank OTP"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {step === 'consent' 
            ? "Link your bank account via Account Aggregator to build your financial profile" 
            : "Enter the OTP sent by your bank to approve the Account Aggregator request"}
        </p>
      </div>

      {step === 'consent' ? (
        <>
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
            onClick={() => setStep('otp')}
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
        </>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Enter 6-Digit OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOtpChange}
              placeholder="000000"
              className={`block w-full px-4 py-4 border text-center ${
                error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
              } rounded-xl text-2xl tracking-[0.5em] font-mono text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all`}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
            )}
          </div>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </>
            ) : (
              "Verify OTP"
            )}
          </button>
          <button
            onClick={() => setStep('consent')}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
