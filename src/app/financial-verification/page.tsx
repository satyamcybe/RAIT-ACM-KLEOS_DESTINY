// ===========================================
// PRANAM - Financial Verification Page
// Realistic Account Aggregator User Journey (Finvu Inspired)
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
  Smartphone,
  Network
} from "lucide-react";

type Step = 'intro' | 'mobile_verify' | 'otp_verify' | 'select_banks' | 'discovering' | 'accounts_found' | 'linked' | 'consent' | 'processing' | 'success';

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
          }, 4500); // Wait for the 4-step animation to finish
        })
        .catch(err => {
          console.error("Ingestion error:", err);
          setError("Failed to fetch records. Try again.");
          setStep('consent');
        });
    }
  }, [step, months]);

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-10">
      {/* Dynamic Header */}
      <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8F3ED] border border-[#1A6B47]/10 shadow-sm">
          {step === 'consent' ? <ShieldCheck className="w-8 h-8 text-[#1A6B47]" /> : <Network className="w-8 h-8 text-[#1A6B47]" />}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {step === 'intro' && "Connect Financial Records"}
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
          {step === 'intro' && "We use consent-based financial sharing to generate your Pramaan Gig Passport."}
          {step === 'mobile_verify' && "We will check for linked bank accounts securely across the AA network."}
          {step === 'otp_verify' && `Enter the OTP sent to +91 ${mobile}`}
          {step === 'select_banks' && "Bank accounts linked to your mobile number will be fetched."}
          {step === 'discovering' && "Finding Available Financial Institutions (FIPs)..."}
          {step === 'accounts_found' && "Select the accounts you want to connect to Pramaan."}
          {step === 'linked' && "Your selected accounts have been successfully linked to your AA profile."}
          {step === 'consent' && "Pramaan wants access to your financial records. Review the artefact."}
          {step === 'processing' && "Activating consent and fetching data from Financial Information Providers..."}
          {step === 'success' && "Your financial data has been successfully ingested from FIPs."}
        </p>
      </div>

      {/* ----------------- SCREEN 1: INTRO ----------------- */}
      {step === 'intro' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
          <button
            onClick={() => setStep('mobile_verify')}
            className="w-full py-4 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] shadow-sm flex justify-center items-center gap-2"
          >
            Continue to Account Aggregator
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
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-300">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-[#1A6B47] animate-spin" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Finding Available Financial Institutions...</h3>
            <p className="text-sm text-gray-500 mt-2">
              Querying FIPs mapped to +91 {mobile}...
            </p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 5: ACCOUNTS FOUND ----------------- */}
      {step === 'accounts_found' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
            <h3 className="font-bold text-gray-900 mb-4">Select Accounts to Link</h3>
            
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
            className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] shadow-sm"
          >
            Link Selected Accounts
          </button>
        </div>
      )}

      {/* ----------------- SCREEN 6: ACCOUNTS LINKED ----------------- */}
      {step === 'linked' && (
        <div className="rounded-2xl border border-emerald-100 bg-[#F4FAF7] p-12 text-center space-y-5 shadow-xs animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-emerald-100 text-[#1A6B47] rounded-full flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h3 className="font-bold text-[#0D3D28] text-lg">Accounts Linked Successfully</h3>
            <p className="text-sm text-emerald-700 mt-1">
              Preparing consent artefact...
            </p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 7: CONSENT CONFIGURATION ----------------- */}
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
                <div className="flex-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Selected Accounts</p>
                  <div className="space-y-2 mt-2">
                    {discoveredAccounts.filter(a => selectedAccountIds.includes(a.id)).map(acc => (
                      <div key={acc.id} className="flex items-center gap-2">
                        <img src={acc.iconUri} alt={acc.bankName} className="w-5 h-5 object-contain" />
                        <p className="text-sm font-semibold text-gray-900">
                          {acc.bankName} <span className="font-mono text-gray-500 text-xs ml-1">{acc.accountNumber}</span>
                        </p>
                      </div>
                    ))}
                  </div>
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
            <p className="text-xs font-medium text-gray-600 text-center leading-relaxed">
              By continuing, you allow Pramaan to access your selected financial records for the chosen period.
            </p>
          </div>

          <button
            onClick={handleConsentApprove}
            className="w-full py-4 px-4 rounded-xl text-sm font-bold text-white bg-[#1A6B47] hover:bg-[#0D3D28] transition-all active:scale-[0.98] shadow-sm"
          >
            Approve Consent
          </button>
        </div>
      )}

      {/* ----------------- SCREEN 8: PROCESSING / FIP FETCH ----------------- */}
      {step === 'processing' && (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-300">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <Loader2 className="w-16 h-16 text-emerald-100 animate-spin absolute" />
            <Loader2 className="w-10 h-10 text-[#1A6B47] animate-spin absolute" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700 animate-pulse">Creating Consent Artefact...</p>
            <p className="text-sm font-semibold text-gray-700 animate-pulse delay-75">Consent Activated</p>
            <p className="text-sm font-semibold text-gray-700 animate-pulse delay-150">Requesting Financial Information...</p>
            <p className="text-sm font-semibold text-gray-700 animate-pulse delay-300">Fetching Data From FIPs...</p>
          </div>
        </div>
      )}

      {/* ----------------- SCREEN 9: SUCCESS ----------------- */}
      {step === 'success' && (
        <div className="space-y-6 animate-in zoom-in-95 duration-500">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xs">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F4FAF7] border-4 border-emerald-50 mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Retrieval Summary</h2>

            {/* --- NEW DATA SOURCE METADATA SECTION --- */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left mb-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Data Source Metadata</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">AA Provider</span>
                  <span className="text-sm font-semibold text-slate-900">Finvu Sandbox</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Financial Information Provider(s)</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {discoveredAccounts.filter(a => selectedAccountIds.includes(a.id)).map(a => a.bankName.split(' ')[0]).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Data Status</span>
                  <span className="text-sm font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Retrieved Successfully
                  </span>
                </div>
              </div>
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
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-600">Transactions Retrieved</span>
                <span className="text-lg font-black text-[#1A6B47]">{ingestData?.totalTransactions || 0}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 px-6 rounded-xl text-sm font-bold text-white bg-[#0f172a] hover:bg-black transition-all active:scale-[0.98] shadow-sm mt-6"
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
