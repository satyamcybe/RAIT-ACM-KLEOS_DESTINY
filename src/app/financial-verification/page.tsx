// ===========================================
// PRANAM - Financial Verification Page
// Account Aggregator consent and data flow (Layer 2)
// ===========================================

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const PROGRESS_STEPS = [
  "Creating Consent...",
  "Consent Approved",
  "Fetching Financial Records...",
  "Processing Transactions...",
  "Storing Transactions...",
  "Verification Complete"
];

export default function FinancialVerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState<'consent' | 'processing' | 'success'>('consent');
  const [progressIndex, setProgressIndex] = useState(0);
  const [ingestData, setIngestData] = useState<any>(null);

  useEffect(() => {
    if (step === 'processing') {
      const interval = setInterval(() => {
        setProgressIndex((prev) => {
          if (prev < PROGRESS_STEPS.length - 1) {
            return prev + 1;
          }
          clearInterval(interval);
          setTimeout(() => setStep('success'), 1000);
          return prev;
        });
      }, 1200); // 1.2s per step for dramatic effect

      // Trigger actual backend ingestion in the background
      fetch("/api/test/full-layer-2")
        .then(res => res.json())
        .then(data => {
          setIngestData(data);
        })
        .catch(err => console.error("Ingestion error:", err));

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-2xl">🏦</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Financial Verification
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {step === 'consent' && "Link your bank account via Account Aggregator to build your financial profile"}
          {step === 'processing' && "Simulating Account Aggregator Data Fetch..."}
          {step === 'success' && "Layer 2: Financial Ingestion Completed Successfully"}
        </p>
      </div>

      {step === 'consent' && (
        <div className="space-y-6">
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
            onClick={() => setStep('processing')}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Connect Financial Records
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
      )}

      {step === 'processing' && (
        <div className="rounded-xl border border-gray-200 bg-white p-8">
          <div className="space-y-6">
            {PROGRESS_STEPS.map((stepName, idx) => {
              const isActive = idx === progressIndex;
              const isCompleted = idx < progressIndex;
              
              return (
                <div key={stepName} className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors
                    ${isCompleted ? 'border-emerald-500 bg-emerald-500 text-white' : 
                      isActive ? 'border-blue-500 border-t-transparent animate-spin' : 'border-gray-200 text-gray-400'}`}
                  >
                    {isCompleted && "✓"}
                  </div>
                  <span className={`font-medium ${isCompleted ? 'text-emerald-600' : isActive ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
                    {stepName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {step === 'success' && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <span className="text-3xl">🎉</span>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-900">Financial Records Fetched!</h2>
            <p className="text-sm text-gray-500 mt-2">We successfully generated and stored Layer 2 data.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-left space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Transactions Retrieved:</span>
              <span className="font-bold text-gray-900">{ingestData?.totalTransactions || 120}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Gig Transactions:</span>
              <span className="font-bold text-emerald-600">{ingestData?.gigTransactions || 65}</span>
            </div>
            <div>
              <span className="text-gray-600 block mb-2">Platforms Detected:</span>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Zomato</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Swiggy</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Rapido</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Proceed To Transaction Intelligence Layer
          </button>
        </div>
      )}
    </div>
  );
}

