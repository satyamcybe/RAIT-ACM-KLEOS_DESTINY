"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { useMockData } from "@/lib/context/MockDataContext";

export default function LoginPage() {
  const router = useRouter();
  const { identityVerified } = useMockData();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    setError("");
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setStep('otp');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    
    setIsLoading(true);
    // Mock API call delay
    setTimeout(() => {
      // If already verified, go to dashboard. Else onboarding.
      if (identityVerified) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-emerald-900/5 p-8 sm:p-10 relative z-10 border border-gray-100">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white mb-6 shadow-md shadow-emerald-600/20">
            <span className="text-3xl font-bold font-sans">P</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
            {step === 'phone' ? "Welcome to Pranam" : "Verify Mobile"}
          </h1>
          <p className="text-sm text-gray-500">
            {step === 'phone' 
              ? "Financial Identity for India's Gig Workers"
              : `We've sent an OTP to +91 ${phone}`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 font-medium">
                  +91
                </div>
                <input
                  suppressHydrationWarning
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="00000 00000"
                  className={`block w-full pl-12 pr-4 py-3.5 border ${
                    error ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                  } rounded-xl text-lg text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>

            <div className="bg-emerald-50/50 rounded-xl p-4 flex gap-3 items-start border border-emerald-100/50">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                By continuing, you agree to Pranam's Terms of Service and Privacy Policy.
              </p>
            </div>

            <button
              suppressHydrationWarning
              type="submit"
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-emerald-600/20 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all active:scale-[0.98]"
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
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit OTP
              </label>
              <div className="relative">
                <input
                  suppressHydrationWarning
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  className={`block w-full px-4 py-3.5 border text-center ${
                    error ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-emerald-500 focus:border-emerald-500"
                  } rounded-xl text-2xl tracking-[0.5em] font-mono text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500 text-center">
                  {error}
                </p>
              )}
            </div>

            <button
              suppressHydrationWarning
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-emerald-600/20 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Verify OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => { setStep('phone'); setOtp(''); setError(''); }}
              className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
            >
              Change Mobile Number
            </button>
          </form>
        )}
      </div>
      
      <div className="mt-8 text-center relative z-10">
        <p className="text-xs text-gray-400 font-medium">
          Powered by <span className="text-gray-500">Pramaan Trust Infrastructure</span>
        </p>
      </div>
    </div>
  );
}
