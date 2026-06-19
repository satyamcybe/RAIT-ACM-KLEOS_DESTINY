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
  Wallet, 
  ReceiptText, 
  TrendingUp, 
  Landmark, 
  ChevronRight,
  Loader2,
  CheckCircle2,
  ShieldCheck
} from "lucide-react";

/* ─── Premium SVG Illustrations ─── */

function FinancialIllustration() {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Subtle background glow circle */}
      <circle cx="64" cy="64" r="50" fill="url(#heroBgGlow)" opacity="0.4" />

      {/* ── Modern Bank Building (Center) ── */}
      {/* Foundation Base */}
      <path d="M34 84 H94" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 80 H90" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Pillars */}
      <line x1="45" y1="58" x2="45" y2="80" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="57" y1="58" x2="57" y2="80" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="69" y1="58" x2="69" y2="80" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="81" y1="58" x2="81" y2="80" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Frieze (beam above pillars) */}
      <line x1="40" y1="58" x2="88" y2="58" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Pediment (roof triangle) */}
      <path d="M38 58 L64 42 L90 58 Z" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round" fill="#ECFDF5" />
      
      {/* Rupee Symbol inside Pediment */}
      <text x="64" y="53" textAnchor="middle" fill="#047857" fontSize="8" fontWeight="600" fontFamily="sans-serif">₹</text>

      {/* ── Verification Shield (Top Right) ── */}
      <path d="M84 26 L94 22 L104 26 V36 C104 42.5 99.5 46.5 94 49.5 C88.5 46.5 84 42.5 84 36 V26 Z" stroke="#10B981" strokeWidth="1.5" strokeLinejoin="round" fill="url(#shieldBg)" />
      {/* Checkmark inside Shield */}
      <path d="M90 35 L93 38 L99 32" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* ── Secure Document (Bottom Left) ── */}
      <rect x="20" y="58" width="16" height="22" rx="2" stroke="#10B981" strokeWidth="1.5" fill="white" />
      {/* Folded corner */}
      <path d="M30 58 L36 64 H30 Z" stroke="#10B981" strokeWidth="1.5" fill="#ECFDF5" strokeLinejoin="round" />
      {/* Document content lines */}
      <line x1="24" y1="67" x2="30" y2="67" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="71" x2="32" y2="71" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="75" x2="28" y2="75" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />

      {/* ── Connection Lines ── */}
      {/* Shield to Bank Pediment */}
      <path d="M84 36 C74 36 78 48 70 48" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />
      {/* Document to Bank columns */}
      <path d="M36 69 H42" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.6" />

      {/* Connection Nodes */}
      <circle cx="70" cy="48" r="2.5" fill="#10B981" />
      <circle cx="36" cy="69" r="2.5" fill="#10B981" />

      <defs>
        <radialGradient id="heroBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="shieldBg" x1="84" y1="22" x2="104" y2="49.5">
          <stop offset="0%" stopColor="#ECFDF5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Access items data with premium icons ─── */
const accessItems = [
  {
    Icon: Wallet,
    label: "Savings Account Summary",
    desc: "Balance, account holder name and basic details",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100/50",
    textColor: "text-emerald-600",
  },
  {
    Icon: ReceiptText,
    label: "Transaction History",
    desc: "Last 6 months of historical credits and debits",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-100/50",
    textColor: "text-violet-600",
  },
  {
    Icon: TrendingUp,
    label: "Income & Consistency Patterns",
    desc: "Verifies regular deposit patterns and salary credits",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100/50",
    textColor: "text-blue-600",
  },
];

/* ─── Main Page Component ─── */

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
    <div className="space-y-6">
      {/* Subtle background radial accents */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 0%, rgba(16,185,129,0.04), transparent), radial-gradient(ellipse 400px 300px at 80% 80%, rgba(37,99,235,0.03), transparent)",
        }}
      />

      {/* Hero section */}
      <div className="relative z-10 text-center">
        {/* Illustration container */}
        <div
          className="mx-auto mb-6 flex items-center justify-center rounded-3xl"
          style={{
            width: 128,
            height: 128,
            background: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
            boxShadow: "0 2px 12px rgba(16, 185, 129, 0.1)",
          }}
        >
          <FinancialIllustration />
        </div>

        {/* Title */}
        <h1
          className="font-bold"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "#0F172A",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Financial Verification
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mt-4"
          style={{
            maxWidth: 600,
            color: "#64748B",
            lineHeight: 1.6,
            fontSize: "clamp(14px, 2.5vw, 16px)",
          }}
        >
          Link your bank account via Account Aggregator to build your portable reputation credential.
        </p>
      </div>

      {/* Step 1 — Access Card + Button */}
      {step === 1 && (
        <>
          {/* Access Information Card */}
          <div
            className="relative z-10"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              borderRadius: 24,
              padding: "32px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              marginTop: 40,
            }}
          >
            <h3
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#0F172A",
                marginBottom: 24,
              }}
            >
              What we&apos;ll access
            </h3>
            <div className="space-y-0">
              {accessItems.map((item, idx) => (
                <div key={item.label} className="group">
                  <div
                    className="flex items-start gap-6 py-6 px-4 rounded-xl transition-colors duration-250 hover:bg-slate-50/50"
                  >
                    {/* Icon container */}
                    <div
                      className={`flex items-center justify-center shrink-0 ${item.bgColor} border ${item.borderColor}`}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                      }}
                    >
                      <item.Icon className={`${item.textColor} stroke-[1.75]`} size={24} />
                    </div>
                    {/* Text */}
                    <div className="pt-1.5">
                      <p
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#0F172A",
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontWeight: 400,
                          fontSize: 14,
                          color: "#64748B",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  {/* Separator (not after last item) */}
                  {idx < accessItems.length - 1 && (
                    <div
                      className="mx-4"
                      style={{
                        height: 1,
                        background: "linear-gradient(90deg, transparent, #E2E8F0 20%, #E2E8F0 80%, transparent)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Consent Details Banner */}
          <div className="bg-emerald-50/30 rounded-2xl p-4 flex gap-3 items-start border border-emerald-100/50 mt-6 relative z-10">
            <ShieldCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              This request is consent-based. We only read data to generate your credential. Your credentials can be revoked anytime from your dashboard.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-sm text-red-500 text-center relative z-10">{error}</p>
          )}

          {/* Connect Bank Button */}
          <button
            onClick={handleConnect}
            className="group relative z-10 w-full flex items-center justify-center gap-3 text-white font-semibold cursor-pointer"
            style={{
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              fontSize: 16,
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
              marginTop: 32,
              border: "none",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(5, 150, 105, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(16, 185, 129, 0.25)";
            }}
          >
            <Landmark size={20} className="stroke-[2] opacity-90" />
            <span>Connect via Account Aggregator</span>
            <ChevronRight size={20} className="stroke-[2] transition-transform duration-200 group-hover:translate-x-1 opacity-90" />
          </button>
        </>
      )}

      {/* Step 2 — Awaiting Consent */}
      {step === 2 && (
        <div
          className="relative z-10 text-center space-y-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#059669] animate-spin" />
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: 18, color: "#0F172A" }}>
              Awaiting Consent Approval...
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", marginTop: 8 }}>
              Please approve the consent request sent to your registered Account Aggregator app or mobile.
            </p>
          </div>
        </div>
      )}

      {/* Step 3 — Fetching Data */}
      {step === 3 && (
        <div
          className="relative z-10 text-center space-y-5"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-[#059669] animate-spin" />
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: 18, color: "#0F172A" }}>
              Analyzing Financial Profile...
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", marginTop: 8 }}>
              Fetching transactional details securely to calculate consistency metrics.
            </p>
          </div>
        </div>
      )}

      {/* Step 4 — Success */}
      {step === 4 && (
        <div
          className="relative z-10 text-center space-y-5"
          style={{
            background: "linear-gradient(135deg, #ECFDF5, #F0FDF4)",
            border: "1px solid #A7F3D0",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 1px 4px rgba(16, 185, 129, 0.08)",
          }}
        >
          <div
            className="mx-auto flex items-center justify-center"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10B981, #059669)",
              boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)",
            }}
          >
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: 18, color: "#065F46" }}>
              Account Successfully Linked
            </h3>
            <p style={{ fontSize: 14, color: "#047857", marginTop: 8 }}>
              Your financial passport is updated. Redirecting to dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
