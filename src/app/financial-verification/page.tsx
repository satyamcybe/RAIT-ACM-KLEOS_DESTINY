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
  ShieldCheck,
  CheckCircle2, 
  Loader2,
  Landmark,
  FileText,
  Clock,
  CalendarDays,
  Smartphone,
  Network,
  RefreshCw,
  Wallet,
  ReceiptText,
  TrendingUp,
  ChevronRight
} from "lucide-react";

type Step = 'intro' | 'mobile_verify' | 'otp_verify' | 'select_banks' | 'discovering' | 'accounts_found' | 'linked' | 'consent' | 'processing' | 'success';

const ALL_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', icon: '🏛️' },
  { id: 'sbi', name: 'State Bank of India', icon: '🏦' },
  { id: 'icici', name: 'ICICI Bank', icon: '🏦' },
];

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
  const router = useRouter();
  const { bankLinked, setBankLinked, resetDemo } = useMockData();
  const [step, setStep] = useState<Step>('intro');
  
  // State for user choices
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedFips, setSelectedFips] = useState<string[]>([]);
  const [discoveredAccounts, setDiscoveredAccounts] = useState<any[]>([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [months, setMonths] = useState<number>(12);
  const [ingestData, setIngestData] = useState<any>(null);
  const [error, setError] = useState("");
  const [showOtpToast, setShowOtpToast] = useState(false);

  const ALL_FIPS = [
    { id: 'HDFC', name: 'HDFC Bank', iconUri: 'https://cdn.finvu.in/finvulogos/hdfc_bank_icon.png' },
    { id: 'CANARA', name: 'Canara Bank', iconUri: 'https://cdn.finvu.in/finvulogos/canarabank_icon.jpg' },
    { id: 'SBI', name: 'State Bank of India', iconUri: 'https://cdn.finvu.in/finvulogos/sbi_icon.jpg' },
    { id: 'ICICI-FIP', name: 'ICICI Bank', iconUri: 'https://cdn.finvu.in/finvulogos/icicibank_icon.jpg' },
    { id: 'RBL', name: 'RBL Bank', iconUri: 'https://cdn.finvu.in/finvulogos/rbl_bank_icon.png' },
    { id: 'KOTAK', name: 'Kotak Mahindra Bank', iconUri: 'https://cdn.finvu.in/finvulogos/kotak_bank_icon.png' },
    { id: 'BOB', name: 'Bank of Baroda', iconUri: 'https://cdn.finvu.in/finvulogos/bob_icon.png' },
    { id: 'AXIS', name: 'Axis Bank', iconUri: 'https://cdn.finvu.in/finvulogos/axisbank_icon.png' },
    { id: 'IBFIP', name: 'Indian Bank', iconUri: 'https://cdn.finvu.in/finvulogos/indian-bank-logo.png' },
  ];

  const handleMobileSubmit = () => {
    if (mobile.length < 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setStep('otp_verify');
    
    // Simulate OTP arriving via SMS
    setTimeout(() => {
      setShowOtpToast(true);
      
      // Simulate Auto-read SMS
      setTimeout(() => {
        setOtp("492015");
        setShowOtpToast(false);
      }, 2500);
    }, 1500);
  };

  const handleOtpSubmit = () => {
    if (otp.length < 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setError("");
    setStep('select_banks');
  };

  const toggleFipSelection = (id: string) => {
    setSelectedFips(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    setError("");
  };

  const handleBankSelectionSubmit = () => {
    if (selectedFips.length === 0) {
      setError("Please select at least one bank to search");
      return;
    }
    setError("");
    setStep('discovering');
    
    // Simulate AA discovering Financial Institutions using Finvu SDK schema
    setTimeout(() => {
      const allMockAccounts = [
        { 
          id: 'IBFIP', 
          bankName: 'Indian Bank', 
          accountNumber: 'XXXXX2108', 
          accType: 'SAVINGS',
          FIType: 'DEPOSIT',
          iconUri: 'https://cdn.finvu.in/finvulogos/indian-bank-logo.png' 
        },
        { 
          id: 'ICICI-FIP', 
          bankName: 'ICICI Bank', 
          accountNumber: 'XXXXX3054', 
          accType: 'CURRENT',
          FIType: 'DEPOSIT',
          iconUri: 'https://cdn.finvu.in/finvulogos/icicibank_icon.jpg' 
        },
        { 
          id: 'HDFC', 
          bankName: 'HDFC Bank', 
          accountNumber: 'XXXXX9912', 
          accType: 'SAVINGS',
          FIType: 'DEPOSIT',
          iconUri: 'https://cdn.finvu.in/finvulogos/hdfc_bank_icon.png' 
        }
      ];
      
      const discovered = allMockAccounts.filter(acc => selectedFips.includes(acc.id));
      // If none of the selected banks have accounts, add a fallback or just show empty
      if (discovered.length === 0) {
          discovered.push(allMockAccounts[0]); // fallback for demo
      }

      setDiscoveredAccounts(discovered);
      setSelectedAccountIds(discovered.map(a => a.id)); // Default select all found
      setStep('accounts_found');
    }, 2500);
  };

  const toggleAccountSelection = (id: string) => {
    setSelectedAccountIds(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
    setError("");
  };

  const handleAccountsSubmit = () => {
    if (selectedAccountIds.length === 0) {
      setError("Please select at least one account to link");
      return;
    }
    setError("");
    setStep('linked');
    
    // Briefly show linked success before consent
    setTimeout(() => {
      setStep('consent');
    }, 2000);
  };

  const handleConsentApprove = () => {
    setStep('processing');
  };

  useEffect(() => {
    if (step === 'processing') {
      // Background ingestion with requested months
      fetch(`/api/test/full-layer-2?months=${months}`)
        .then(res => res.json())
        .then(data => {
          setTimeout(() => {
            setIngestData(data);
            setStep('success');
            setBankLinked(true);
            if (typeof window !== "undefined") {
              localStorage.setItem("PRAMAAN_bank_linked", "true");
            }
          }, 4500); // Wait for the 4-step animation to finish
        })
        .catch(err => {
          console.error("Ingestion error:", err);
          setError("Failed to fetch records. Try again.");
          setStep('consent');
        });
    }
  }, [step, months, setBankLinked]);

  if (bankLinked) {
    return (
      <div className="space-y-8 select-none max-w-2xl mx-auto animate-in fade-in duration-500" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight font-sans">Financial Intelligence</h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time Account Aggregator linkage and earnings insight.
          </p>
        </div>

        {/* Status Header */}
        <div className="rounded-2xl border border-emerald-100 bg-[#F4FAF7] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-emerald-100 text-[#1A6B47] rounded-xl flex items-center justify-center border border-emerald-200/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Linked Accounts & Data Active</h3>
              <p className="text-xs text-emerald-800 font-medium">Auto-refreshing via Account Aggregator pipeline</p>
            </div>
          </div>
          <span className="bg-[#1A6B47] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Consented
          </span>
        </div>

        {/* Ingested Accounts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Linked Bank Accounts */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#1A6B47]" />
              Connected Institutions (FIPs)
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div>
                  <p className="font-bold text-gray-800 text-xs">State Bank of India</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">XXXX1234</p>
                </div>
                <span className="bg-[#E8F5EF] text-[#1A6B47] border border-emerald-100/60 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <div>
                  <p className="font-bold text-gray-800 text-xs">HDFC Bank</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">XXXX5678</p>
                </div>
                <span className="bg-[#E8F5EF] text-[#1A6B47] border border-emerald-100/60 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Earnings Analytics */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#1A6B47]" />
              Analysis Statistics
            </h3>
            <div className="space-y-3.5 text-xs text-gray-600 font-sans">
              <div className="flex justify-between">
                <span>Total Ingested Txns:</span>
                <span className="text-gray-900 font-bold">{ingestData?.totalTransactions || 120} Transactions</span>
              </div>
              <div className="flex justify-between">
                <span>Gig Income Detected:</span>
                <span className="text-[#1A6B47] font-bold">65 Payouts</span>
              </div>
              <div className="flex justify-between">
                <span>Income Consistency:</span>
                <span className="text-emerald-600 font-bold">94% Score</span>
              </div>
              <div className="flex justify-between">
                <span>Platforms Mapped:</span>
                <span className="text-gray-900 font-semibold">Zomato, Swiggy, Rapido</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Bar Chart representing income flow */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-[#0F172A] text-sm">Monthly Gig Deposit Consistency (Zomato / Swiggy / Rapido Payouts)</h3>
          <div className="flex justify-between items-end h-28 gap-3 px-1 pt-4 border-b border-gray-100 pb-2">
            {[35, 55, 45, 80, 85, 70].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end h-full items-center gap-1.5">
                <div 
                  className="w-full bg-gradient-to-t from-[#1A6B47] to-[#2ECC8F] rounded-t-md transition-all duration-700 ease-out" 
                  style={{ height: `${height}%` }}
                />
                <span className="text-[10px] text-gray-400 font-semibold">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Actions */}
        <div className="rounded-2xl border border-gray-100 bg-slate-50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="font-bold text-gray-800 text-sm">Need to update bank connections?</h4>
            <p className="text-xs text-gray-500 mt-0.5">You can reset or unlink your financial institutions and reconnect.</p>
          </div>
          <button
            onClick={async () => {
              if (confirm("Reset financial linkage? This will clear all ingested transactions.")) {
                await resetDemo();
                router.push("/financial-verification");
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 text-xs font-bold text-gray-700 shadow-2xs transition-colors cursor-pointer active:scale-[0.98]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reconnect Bank</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-10">
      {/* Subtle background radial accents */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 50% 0%, rgba(16,185,129,0.04), transparent), radial-gradient(ellipse 400px 300px at 80% 80%, rgba(37,99,235,0.03), transparent)",
        }}
      />

      {/* Dynamic Header */}
      {step === 'intro' ? (
        <div className="relative z-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
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
      ) : (
        <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F3ED]/60 border border-emerald-100/50 shadow-xs">
            {step === 'consent' ? <ShieldCheck className="w-8 h-8 text-[#059669]" /> : <Network className="w-8 h-8 text-[#059669]" />}
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">
            {step === 'mobile_verify' && "Enter Mobile Number"}
            {step === 'otp_verify' && "Verify Mobile"}
            {step === 'select_banks' && "Select Banks"}
            {step === 'discovering' && "Discovering Institutions..."}
            {step === 'accounts_found' && "Accounts Found"}
            {step === 'linked' && "Accounts Linked"}
            {step === 'consent' && "Configure Consent"}
            {step === 'processing' && "Retrieving Records"}
            {step === 'success' && "Retrieval Summary"}
          </h1>
          <p className="mt-3 text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
            {step === 'mobile_verify' && "We will check for linked bank accounts securely across the AA network."}
            {step === 'otp_verify' && `Enter the OTP sent to +91 ${mobile}`}
            {step === 'select_banks' && "Bank accounts linked to your mobile number will be fetched."}
            {step === 'discovering' && "Finding Available Financial Institutions (FIPs)..."}
            {step === 'accounts_found' && "Select the accounts you want to connect to Pramaan."}
            {step === 'linked' && "Your selected accounts have been successfully linked to your AA profile."}
            {step === 'consent' && "Pramaan wants access to your financial records. Review the details."}
            {step === 'processing' && "Activating consent and fetching data from Financial Information Providers..."}
            {step === 'success' && "Your financial data has been successfully ingested from FIPs."}
          </p>
        </div>
      )}

      {/* ----------------- SCREEN 1: INTRO ----------------- */}
      {step === 'intro' && (
        <div className="space-y-0 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
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

          {/* Connect Bank Button */}
          <button
            onClick={() => setStep('mobile_verify')}
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
        </div>
      )}

      {/* ----------------- SCREEN 2: MOBILE VERIFY ----------------- */}
      {step === 'mobile_verify' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div 
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-xs space-y-6"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">+91</span>
                <input
                  type="text"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ''));
                    setError("");
                  }}
                  className={`block w-full pl-14 pr-4 py-3.5 border ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-[#E2E8F0] focus:ring-[#10B981] focus:border-[#10B981]'} rounded-xl text-gray-900 placeholder-slate-400 font-medium transition-all`}
                  placeholder="Enter 10-digit number"
                />
              </div>
              {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
            </div>
            
            <button
              onClick={handleMobileSubmit}
              className="w-full flex items-center justify-center text-white font-semibold cursor-pointer"
              style={{
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                fontSize: 15,
                fontWeight: 600,
                boxShadow: "0 2px 6px rgba(16, 185, 129, 0.2)",
                border: "none",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(16, 185, 129, 0.2)";
              }}
            >
              Get OTP
            </button>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 3: OTP VERIFY ----------------- */}
      {step === 'otp_verify' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div 
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-xs space-y-6"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            <div className="text-center">
              <p className="text-sm text-slate-500 font-medium">Verification Code</p>
            </div>
            <div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ''));
                  setError("");
                }}
                className={`block w-full px-4 py-4 border text-center ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-[#E2E8F0] focus:ring-[#10B981] focus:border-[#10B981]'} rounded-xl text-2xl tracking-[0.5em] font-mono text-gray-900 placeholder-slate-300 transition-all`}
                placeholder="000000"
              />
              {error && <p className="mt-2 text-xs font-medium text-red-500 text-center">{error}</p>}
            </div>
            
            <button
              onClick={handleOtpSubmit}
              className="w-full flex items-center justify-center text-white font-semibold cursor-pointer"
              style={{
                height: 56,
                borderRadius: 14,
                background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                fontSize: 15,
                fontWeight: 600,
                boxShadow: "0 2px 6px rgba(16, 185, 129, 0.2)",
                border: "none",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(16, 185, 129, 0.2)";
              }}
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 3.5: SELECT BANKS (Profile Discovery) ----------------- */}
      {step === 'select_banks' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900 text-sm">{selectedFips.length} banks selected</h3>
              <button 
                onClick={() => setSelectedFips([])}
                className="text-xs font-semibold text-gray-500 hover:text-gray-900"
              >
                Reset
              </button>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {ALL_FIPS.map((fip) => {
                const isSelected = selectedFips.includes(fip.id);
                return (
                  <div 
                    key={fip.id} 
                    onClick={() => toggleFipSelection(fip.id)}
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#1A6B47] bg-[#F4FAF7]' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="w-8 h-8 rounded bg-white border border-gray-100 flex items-center justify-center mr-3 p-1 shrink-0">
                      <img src={fip.iconUri} alt={fip.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{fip.name}</p>
                    </div>

                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${isSelected ? 'bg-[#1A6B47] border-[#1A6B47]' : 'border border-gray-300 bg-white'}`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <input type="checkbox" className="mt-0.5 rounded text-[#1A6B47] focus:ring-[#1A6B47]" defaultChecked />
              <p className="text-xs text-gray-500 leading-relaxed">
                I consent to checking any existing Account Aggregator profiles linked to my mobile number, to enhance user experience. <span className="text-[#1A6B47] font-semibold">Learn more</span>
              </p>
            </div>

            {error && <p className="text-sm font-semibold text-red-500 text-center mt-4">{error}</p>}
          </div>

          <button
            onClick={handleBankSelectionSubmit}
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] shadow-sm"
          >
            Proceed
          </button>
        </div>
      )}

      {/* ----------------- SCREEN 4: DISCOVERING FIPs ----------------- */}
      {step === 'discovering' && (
        <div 
          className="bg-white border border-[#E2E8F0] rounded-[24px] p-12 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-300"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
          }}
        >
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#059669] animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] text-lg">Finding Available Financial Institutions...</h3>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Querying FIPs mapped to +91 {mobile}...
            </p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 5: ACCOUNTS FOUND ----------------- */}
      {step === 'accounts_found' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div 
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 shadow-xs space-y-6"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            <h3 className="font-bold text-[#0F172A] text-[18px] mb-4">Select Accounts to Link</h3>
            
            <div className="space-y-3">
              {discoveredAccounts.map((acc) => {
                const isSelected = selectedAccountIds.includes(acc.id);
                return (
                  <div 
                    key={acc.id} 
                    onClick={() => toggleAccountSelection(acc.id)}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#10B981] bg-[#F4FAF7]' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'}`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-4 transition-colors ${isSelected ? 'bg-[#10B981] border-[#10B981]' : 'border border-slate-300 bg-white'}`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    
                    <div className="w-10 h-10 rounded bg-white border border-gray-100 flex items-center justify-center mr-3 p-1 shrink-0">
                      <img src={acc.iconUri} alt={acc.bankName} className="max-w-full max-h-full object-contain" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-gray-900 text-sm">{acc.bankName}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">{acc.accType}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono font-medium mt-0.5">{acc.accountNumber}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {error && <p className="text-sm font-semibold text-red-500 text-center mt-4">{error}</p>}
          </div>

          <button
            onClick={handleAccountsSubmit}
            className="w-full flex items-center justify-center text-white font-semibold cursor-pointer"
            style={{
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              fontSize: 15,
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(16, 185, 129, 0.2)",
              border: "none",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(16, 185, 129, 0.2)";
            }}
          >
            Link Selected Accounts
          </button>
        </div>
      )}

      {/* ----------------- SCREEN 6: ACCOUNTS LINKED ----------------- */}
      {step === 'linked' && (
        <div 
          className="bg-white border border-[#E2E8F0] rounded-[24px] p-12 text-center space-y-5 shadow-xs animate-in zoom-in-95 duration-300"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
          }}
        >
          <div className="w-16 h-16 bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-[#0F172A] text-lg">Accounts Linked Successfully</h3>
            <p className="text-sm text-slate-500 mt-2 font-medium">
              Preparing consent request...
            </p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 7: CONSENT CONFIGURATION ----------------- */}
      {step === 'consent' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div 
            className="bg-white border border-[#E2E8F0] rounded-[24px] shadow-xs overflow-hidden"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            <div className="bg-slate-50 border-b border-gray-100 p-5">
              <h3 className="text-lg font-bold text-[#0F172A]">Consent Summary</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1"><FileText className="w-5 h-5 text-[#059669]" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Purpose</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1">Generate Gig Worker Trust Profile</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="mt-1"><CreditCard className="w-5 h-5 text-[#059669]" /></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Requested Data</p>
                  <p className="text-sm font-semibold text-slate-800 mt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> Transaction History
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1"><Landmark className="w-5 h-5 text-[#059669]" /></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Selected Accounts</p>
                  <div className="space-y-2 mt-2">
                    {discoveredAccounts.filter(a => selectedAccountIds.includes(a.id)).map(acc => (
                      <div key={acc.id} className="flex items-center gap-2">
                        <img src={acc.iconUri} alt={acc.bankName} className="w-5 h-5 object-contain" />
                        <p className="text-sm font-semibold text-slate-800">
                          {acc.bankName} <span className="font-mono text-slate-500 text-xs ml-1">{acc.accountNumber}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="mt-1"><CalendarDays className="w-5 h-5 text-[#059669]" /></div>
                <div className="w-full">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Transaction Period</p>
                  <select 
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:ring-[#10B981] focus:border-[#10B981]"
                  >
                    <option value={3}>Last 3 Months</option>
                    <option value={6}>Last 6 Months</option>
                    <option value={12}>Last 12 Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
            <p className="text-xs font-medium text-slate-500 text-center leading-relaxed">
              By continuing, you allow Pramaan to access your selected financial records for the chosen period.
            </p>
          </div>

          <button
            onClick={handleConsentApprove}
            className="w-full flex items-center justify-center text-white font-semibold cursor-pointer"
            style={{
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
              fontSize: 15,
              fontWeight: 600,
              boxShadow: "0 2px 6px rgba(16, 185, 129, 0.2)",
              border: "none",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(16, 185, 129, 0.2)";
            }}
          >
            Approve Consent
          </button>
        </div>
      )}

      {/* ----------------- SCREEN 8: PROCESSING / FIP FETCH ----------------- */}
      {step === 'processing' && (
        <div 
          className="bg-white border border-[#E2E8F0] rounded-[24px] p-12 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-300"
          style={{
            boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
          }}
        >
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <Loader2 className="w-16 h-16 text-emerald-100 animate-spin absolute" />
            <Loader2 className="w-10 h-10 text-[#059669] animate-spin absolute" />
          </div>
          <div className="space-y-2 pt-2">
            <p className="text-sm font-semibold text-slate-700 animate-pulse">Creating Consent Artefact...</p>
            <p className="text-sm font-semibold text-slate-700 animate-pulse delay-75">Consent Activated</p>
            <p className="text-sm font-semibold text-slate-700 animate-pulse delay-150">Requesting Financial Information...</p>
            <p className="text-sm font-semibold text-slate-700 animate-pulse delay-300">Fetching Data From FIPs...</p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 9: SUCCESS ----------------- */}
      {step === 'success' && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div 
            className="bg-white border border-[#E2E8F0] rounded-[24px] p-8 text-center shadow-xs"
            style={{
              boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)"
            }}
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F4FAF7] border-4 border-emerald-50 mb-6">
              <span className="text-4xl animate-bounce">🎉</span>
            </div>
            
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Retrieval Summary</h2>

            {/* --- NEW DATA SOURCE METADATA SECTION --- */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Data Source Metadata</p>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">AA Provider</span>
                  <span className="font-semibold text-slate-800">Finvu Sandbox</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Financial Information Provider(s)</span>
                  <span className="font-semibold text-slate-800">
                    {discoveredAccounts.filter(a => selectedAccountIds.includes(a.id)).map(a => a.bankName.split(' ')[0]).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Data Status</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Retrieved Successfully
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl text-left space-y-4 border border-gray-100">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-sm font-semibold text-slate-600">Accounts Connected</span>
                <span className="text-lg font-black text-slate-800">{selectedAccountIds.length}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <span className="text-sm font-semibold text-slate-600">Selected Period</span>
                <span className="text-lg font-black text-slate-800">Last {months} Months</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-600">Transactions Retrieved</span>
                <span className="text-lg font-black text-[#059669]">{ingestData?.totalTransactions || 0}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full flex items-center justify-center text-white font-semibold cursor-pointer"
              style={{
                height: 56,
                borderRadius: 14,
                background: "#0F172A",
                fontSize: 15,
                fontWeight: 600,
                boxShadow: "0 2px 6px rgba(15, 23, 42, 0.15)",
                border: "none",
                transition: "all 0.2s ease-in-out",
                marginTop: 24
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#000000";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0F172A";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Proceed To Transaction Intelligence
            </button>
          </div>
        </div>
      )}

      {/* ----------------- OTP TOAST NOTIFICATION ----------------- */}
      {showOtpToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-10 fade-in duration-300 w-[90%] max-w-sm">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Messages • Now</p>
              <p className="text-sm font-semibold text-gray-900 mt-1 leading-relaxed">
                492015 is your OTP for Pramaan Account Aggregator. Do not share this with anyone.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
