// ===========================================
// PRAMAAN - Financial Verification Page
// Account Aggregator consent and data flow
// ===========================================

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMockData } from "@/lib/context/MockDataContext";
import { 
  Building2, 
  CreditCard, 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function FinancialVerificationPage() {
  const { bankLinked, setBankLinked } = useMockData();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState("");

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
          }, 2200);
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
    <div className="space-y-8 max-w-lg mx-auto py-4 select-none" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
      
      {/* Page Header */}
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F5EF] text-[#1A6B47] shadow-xs">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Financial Verification
        </h1>
        <p className="mt-2.5 text-[14px] leading-relaxed text-gray-500 max-w-sm mx-auto">
          Link your bank account via Account Aggregator to build your portable reputation credential.
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400">Consent Details</h3>
            <div className="space-y-4 pt-1">
              {[
                { icon: CreditCard, label: "Savings Account Summary", desc: "Balance, account holder name and basic details" },
                { icon: BarChart3, label: "Transaction History", desc: "Last 6 months of historical credits and debits" },
                { icon: TrendingUp, label: "Income & Consistency Patterns", desc: "Verifies regular deposit patterns and salary credits" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100/50 flex items-center justify-center text-slate-500 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50/50 rounded-xl p-4 flex gap-3 items-start border border-emerald-100/50">
            <ShieldCheck className="w-5 h-5 text-[#1A6B47] shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600 leading-relaxed">
              This request is consent-based. We only read data to generate your credential. Your credentials can be revoked anytime from your dashboard.
            </p>
          </div>

          {error && <p className="text-sm font-semibold text-red-500 text-center">{error}</p>}

          <button
            onClick={handleConnect}
            className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>Connect via Account Aggregator</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center space-y-5 shadow-xs">
          <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#1A6B47] animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Awaiting Consent Approval...</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
              Please approve the consent request sent to your registered Account Aggregator app or mobile.
            </p>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center space-y-5 shadow-xs">
          <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Analyzing Financial Profile...</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
              Fetching transactional details securely to calculate consistency metrics.
            </p>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="rounded-2xl border border-emerald-100 bg-[#F4FAF7] p-8 text-center space-y-5 shadow-xs">
          <div className="w-14 h-14 bg-emerald-100 text-[#1A6B47] rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-[#0D3D28] text-lg">Account Successfully Linked</h3>
            <p className="text-sm text-emerald-700 mt-1">
              Your financial passport is updated. Redirecting to dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
