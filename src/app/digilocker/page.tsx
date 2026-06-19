"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Lock, UserCheck } from "lucide-react";
import { useMockData } from "@/lib/context/MockDataContext";

export default function DigiLockerMock() {
  const { identityVerified, setIdentityVerified } = useMockData();
  const router = useRouter();
  const [step, setStep] = useState<'aadhaar' | 'otp'>('aadhaar');
  const [aadhaar, setAadhaar] = useState("");

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("DigiLocker Auth Service", {
          body: msg,
          icon: "/logo-icon.png"
        });
      }
    }
    setTimeout(() => {
      setToastMessage("");
    }, 10000);
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and max 12 digits
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(value);
    setError("");
  };

  const formatAadhaar = (value: string) => {
    // Format as XXXX XXXX XXXX
    return value.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length < 12) {
      setError("Please enter a valid 12-digit Aadhaar Number.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    showNotification(`[DigiLocker] Aadhaar OTP: Code is ${code} (sent to Aadhaar-registered mobile)`);
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    if (otp !== generatedOtp) {
      setError(`Incorrect OTP. Use the code sent to your notification: ${generatedOtp}`);
      return;
    }
    
    setIsLoading(true);
    // Mock API call delay
    setTimeout(() => {
      setIdentityVerified(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("PRAMAAN_identity_verified", "true");
      }
      window.location.href = '/api/digilocker/callback?code=mock_oauth_code_xyz789';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-8 relative z-10 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm"
          >
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">
            {step === 'aadhaar' ? "DigiLocker Authentication" : "Enter OTP"}
          </h1>
          <p className="text-sm text-slate-500">
            {step === 'aadhaar' 
              ? "Verify your identity securely using your Aadhaar credentials."
              : "We've sent a 6-digit OTP to your Aadhaar registered mobile number."}
          </p>
        </div>

        {step === 'aadhaar' ? (
          <form onSubmit={handleAadhaarSubmit} className="space-y-6">
            <div>
              <label htmlFor="aadhaar" className="block text-sm font-medium text-slate-700 mb-2">
                Aadhaar Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="aadhaar"
                  suppressHydrationWarning
                  value={formatAadhaar(aadhaar)}
                  onChange={handleAadhaarChange}
                  placeholder="0000 0000 0000"
                  className={`block w-full pl-10 pr-3 py-3 border ${
                    error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-xl text-lg tracking-widest text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all bg-slate-50 focus:bg-white`}
                />
              </div>
              {error && (
                <p
                  className="mt-2 text-sm text-red-500"
                >
                  {error}
                </p>
              )}
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex gap-3 items-start border border-slate-100">
              <Lock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Your connection is secure. We use industry-standard encryption to protect your personal information.
              </p>
            </div>

            <button
              type="submit"
              suppressHydrationWarning
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              <div className="flex items-center gap-2">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-slate-700 mb-2">
                6-Digit OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  suppressHydrationWarning
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  className={`block w-full px-4 py-3 border text-center ${
                    error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
                  } rounded-xl text-2xl tracking-[0.5em] font-mono text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all bg-slate-50 focus:bg-white`}
                />
              </div>
              {error && (
                <p
                  className="mt-2 text-sm text-red-500 text-center"
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              suppressHydrationWarning
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Verify and Proceed</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
            <button
              type="button"
              onClick={() => { setStep('aadhaar'); setOtp(''); setError(''); }}
              className="w-full text-sm text-slate-500 hover:text-slate-700 font-medium"
            >
              Back
            </button>
          </form>
        )}
      </div>
      
      <div className="mt-8 text-center relative z-10 flex flex-col items-center gap-2">
        <img 
          src="/logo-text.png" 
          alt="PRAMAAN Logo" 
          className="h-7 w-auto object-contain mix-blend-multiply logo-brand-green opacity-50"
        />
        <p className="text-xs text-slate-400">
          Powered by <span className="font-semibold text-slate-500">Pramaan Trust Infrastructure</span>
        </p>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-start gap-3 animate-float-slow-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
            ✉
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aadhaar SMS System</div>
            <div className="text-sm font-semibold mt-1 leading-normal text-white">{toastMessage}</div>
          </div>
          <button 
            onClick={() => setToastMessage("")} 
            className="text-slate-400 hover:text-white text-xs font-bold px-1.5 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
