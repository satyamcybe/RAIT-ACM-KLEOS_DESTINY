// ===========================================
// PRAMAAN - Financial Verification Page
// Account Aggregator consent and data flow
// ===========================================

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMockData } from "@/lib/context/MockDataContext";

export default function FinancialVerificationPage() {
  const { bankLinked, setBankLinked } = useMockData();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState("");

  // bankLinked auto-redirect removed to allow step 4 to display fully

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 2) {
      interval = setInterval(async () => {
        try {
          const res = await fetch("/api/financial/consent");
          const data = await res.json();
          if (data.data?.status === "approved") {
            clearInterval(interval);
            setStep(3);
          }
        } catch (err) {
          console.error("Poll error", err);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      const fetchData = async () => {
        try {
          await fetch("/api/financial/fetch");
          setStep(4);
          setTimeout(() => {
            setBankLinked(true);
            router.replace('/dashboard');
          }, 2000);
        } catch (err) {
          setError("Failed to fetch financial data");
          setStep(1);
        }
      };
      fetchData();
    }
  }, [step, setBankLinked, router]);

  const handleConnect = async () => {
    setStep(2);
    setError("");
    try {
      await fetch("/api/financial/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fiTypes: ["TRANSACTIONS"] }),
      });
    } catch (err) {
      setError("Failed to initiate consent");
      setStep(1);
    }
  };

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

      {step === 1 && (
        <>
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

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            onClick={handleConnect}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Connect Bank
          </button>
        </>
      )}

      {step === 2 && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center space-y-4">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="font-semibold text-gray-900">Awaiting Consent...</h3>
          <p className="text-sm text-gray-500">Please approve the request sent to your bank.</p>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="font-semibold text-gray-900">Fetching Financial Data...</h3>
          <p className="text-sm text-gray-500">Analyzing your transactions securely.</p>
        </div>
      )}

      {step === 4 && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">✓</div>
          <h3 className="font-semibold text-green-900">Successfully Connected</h3>
          <p className="text-sm text-green-700">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
}
