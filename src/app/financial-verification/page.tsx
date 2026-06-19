// ===========================================
// PRANAM - Financial Verification Page
// Realistic Account Aggregator User Journey
// ===========================================

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Smartphone
} from "lucide-react";

type Step = 'intro' | 'mobile_verify' | 'otp_verify' | 'discovering' | 'accounts_found' | 'consent' | 'processing' | 'success';

const ALL_BANKS = [
  { id: 'hdfc', name: 'HDFC Bank', icon: '🏛️' },
  { id: 'sbi', name: 'State Bank of India', icon: '🏦' },
  { id: 'icici', name: 'ICICI Bank', icon: '🏦' },
];

export default function FinancialVerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('intro');
  
  // State for user choices
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [discoveredAccounts, setDiscoveredAccounts] = useState<any[]>([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
  const [months, setMonths] = useState<number>(12);
  const [ingestData, setIngestData] = useState<any>(null);
  const [error, setError] = useState("");
  const [showOtpToast, setShowOtpToast] = useState(false);

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
        // Optional: you can auto-verify, but letting user click verify is fine
      }, 2500);
    }, 1500);
  };

  const handleOtpSubmit = () => {
    if (otp.length < 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }
    setError("");
    setStep('discovering');
    
    // Simulate AA discovering accounts
    setTimeout(() => {
      // Mock discovering from some default banks for this demo
      const mockDiscovered = [
        { id: 'sbi_1', bankName: 'State Bank of India', accountNumber: `XXXX1234` },
        { id: 'hdfc_1', bankName: 'HDFC Bank', accountNumber: `XXXX5678` },
        { id: 'icici_1', bankName: 'ICICI Bank', accountNumber: `XXXX9876` }
      ];
      setDiscoveredAccounts(mockDiscovered);
      setSelectedAccountIds(['sbi_1', 'hdfc_1']); // Default select first two like in prompt
      setStep('accounts_found');
    }, 2000);
  };

  const toggleAccountSelection = (id: string) => {
    setSelectedAccountIds(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
    setError("");
  };

  const handleAccountsSubmit = () => {
    if (selectedAccountIds.length === 0) {
      setError("Please select at least one account");
      return;
    }
    setError("");
    setStep('consent');
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
          }, 4000); // Wait for simulation to finish
        })
        .catch(err => {
          console.error("Ingestion error:", err);
          setError("Failed to fetch records. Try again.");
          setStep('consent');
        });
    }
  }, [step, months]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Dynamic Header */}
      <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F3ED] border border-[#1A6B47]/10 shadow-sm">
          {step === 'consent' ? <ShieldCheck className="w-8 h-8 text-[#1A6B47]" /> : <Building2 className="w-8 h-8 text-[#1A6B47]" />}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {step === 'intro' && "Connect Financial Records"}
          {step === 'mobile_verify' && "Enter Mobile Number"}
          {step === 'otp_verify' && "Verify Mobile"}
          {step === 'discovering' && "Account Discovery"}
          {step === 'accounts_found' && "Accounts Found"}
          {step === 'consent' && "Consent Configuration"}
          {step === 'processing' && "Retrieving Records"}
          {step === 'success' && "Retrieval Summary"}
        </h1>
        <p className="mt-3 text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
          {step === 'intro' && "We use consent-based financial sharing to generate your Pramaan Gig Passport."}
          {step === 'mobile_verify' && "We will check for linked bank accounts securely."}
          {step === 'otp_verify' && `Enter the OTP sent to +91 ${mobile}`}
          {step === 'discovering' && "Searching the Account Aggregator network..."}
          {step === 'accounts_found' && "Select the accounts you want to connect to Pramaan."}
          {step === 'consent' && "Pramaan wants access to your financial records."}
          {step === 'processing' && "Connecting to FIPs and processing your transaction history..."}
          {step === 'success' && "Your financial data has been successfully ingested."}
        </p>
      </div>

      {/* ----------------- SCREEN 1: INTRO ----------------- */}
      {step === 'intro' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
          <button
            onClick={() => setStep('mobile_verify')}
            className="w-full py-4 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] shadow-sm"
          >
            Continue
          </button>
        </div>
      )}

      {/* ----------------- SCREEN 2: MOBILE VERIFY ----------------- */}
      {step === 'mobile_verify' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                <input
                  type="text"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, ''));
                    setError("");
                  }}
                  className={`block w-full pl-12 pr-4 py-3.5 border ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-[#1A6B47] focus:border-[#1A6B47]'} rounded-xl text-gray-900 placeholder-gray-400 font-medium transition-all`}
                  placeholder="Enter 10-digit number"
                />
              </div>
              {error && <p className="mt-2 text-xs font-medium text-red-500">{error}</p>}
            </div>
            
            <button
              onClick={handleMobileSubmit}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98]"
            >
              Get OTP
            </button>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 3: OTP VERIFY ----------------- */}
      {step === 'otp_verify' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-5">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">Enter OTP</p>
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
                className={`block w-full px-4 py-4 border text-center ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-[#1A6B47] focus:border-[#1A6B47]'} rounded-xl text-2xl tracking-[0.5em] font-mono text-gray-900 placeholder-gray-300 transition-all`}
                placeholder="000000"
              />
              {error && <p className="mt-2 text-xs font-medium text-red-500 text-center">{error}</p>}
            </div>
            
            <button
              onClick={handleOtpSubmit}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98]"
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 4: DISCOVERING ----------------- */}
      {step === 'discovering' && (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-300">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#1A6B47] animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Contacting Banks</h3>
            <p className="text-sm text-gray-500 mt-2">
              Securely discovering accounts across the AA network for +91 {mobile}...
            </p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 5: ACCOUNTS FOUND ----------------- */}
      {step === 'accounts_found' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
            <h3 className="font-bold text-gray-900 mb-4">Select Accounts</h3>
            
            <div className="space-y-3">
              {discoveredAccounts.map((acc) => {
                const isSelected = selectedAccountIds.includes(acc.id);
                return (
                  <div 
                    key={acc.id} 
                    onClick={() => toggleAccountSelection(acc.id)}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-[#1A6B47] bg-[#F4FAF7]' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-4 transition-colors ${isSelected ? 'bg-[#1A6B47] border-[#1A6B47]' : 'border border-gray-300 bg-white'}`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{acc.bankName}</p>
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
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] shadow-sm"
          >
            Continue
          </button>
        </div>
      )}

      {/* ----------------- SCREEN 6: CONSENT REQUEST ----------------- */}
      {step === 'consent' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-xs overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-5">
              <h3 className="text-lg font-bold text-gray-900">Consent Summary</h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="mt-1"><FileText className="w-5 h-5 text-gray-400" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Purpose</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">Generate Gig Worker Trust Profile</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="mt-1"><CreditCard className="w-5 h-5 text-gray-400" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Requested Data</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#1A6B47]" /> Transaction History
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1"><Landmark className="w-5 h-5 text-gray-400" /></div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Selected Accounts</p>
                  {discoveredAccounts.filter(a => selectedAccountIds.includes(a.id)).map(acc => (
                    <p key={acc.id} className="text-sm font-semibold text-gray-900 mt-1">
                      {acc.bankName} {acc.accountNumber}
                    </p>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="mt-1"><CalendarDays className="w-5 h-5 text-gray-400" /></div>
                <div className="w-full">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Transaction Period</p>
                  <select 
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full p-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 focus:ring-[#1A6B47] focus:border-[#1A6B47]"
                  >
                    <option value={3}>Last 3 Months</option>
                    <option value={6}>Last 6 Months</option>
                    <option value={12}>Last 12 Months</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
            <p className="text-xs font-medium text-gray-600 text-center">
              By continuing, you allow Pramaan to access your selected financial records for the chosen period.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleConsentApprove}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] shadow-sm"
            >
              Approve Consent
            </button>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 7: PROCESSING / MOCK FETCH ----------------- */}
      {step === 'processing' && (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-300">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            {/* Double spinner effect */}
            <Loader2 className="w-16 h-16 text-emerald-100 animate-spin absolute" />
            <Loader2 className="w-10 h-10 text-[#1A6B47] animate-spin absolute" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 animate-pulse">Consent Approved</p>
            <p className="text-sm font-semibold text-gray-700 animate-pulse delay-75">Locating Accounts...</p>
            <p className="text-sm font-semibold text-gray-700 animate-pulse delay-150">Retrieving Financial Records...</p>
            <p className="text-sm font-semibold text-gray-700 animate-pulse delay-300">Processing Transaction History...</p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 8: SUCCESS ----------------- */}
      {step === 'success' && (
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-500">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F4FAF7] border-4 border-emerald-50">
            <span className="text-4xl">🎉</span>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-xl text-left space-y-4 border border-gray-100">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-sm font-semibold text-gray-600">Accounts Connected</span>
              <span className="text-lg font-black text-gray-900">{selectedAccountIds.length}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-sm font-semibold text-gray-600">Selected Period</span>
              <span className="text-lg font-black text-gray-900">Last {months} Months</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-sm font-semibold text-gray-600">Transactions Retrieved</span>
              <span className="text-lg font-black text-[#1A6B47]">{ingestData?.totalTransactions || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-600">Status</span>
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">Successfully Retrieved</span>
            </div>
          </div>

          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white bg-[#0f172a] hover:bg-black transition-all active:scale-[0.98] shadow-sm mt-4"
          >
            Proceed To Transaction Intelligence
          </button>
        </div>
        </div>
      )}

      {/* ----------------- OTP TOAST NOTIFICATION ----------------- */}
      {showOtpToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex items-center gap-4 min-w-[300px]">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
              <span className="text-xl">💬</span>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Messages • Now</p>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">
                492015 is your OTP for Pramaan Account Aggregator. Do not share this with anyone.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
