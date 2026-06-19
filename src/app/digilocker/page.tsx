"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, ArrowRight, Lock, UserCheck, KeyRound,
  FileText, CheckCircle2, ChevronRight, Phone, Fingerprint
} from "lucide-react";
import { useMockData } from "@/lib/context/MockDataContext";

type Step = "identifier" | "otp" | "pin" | "consent";

// Documents PRAMAAN requests access to
const REQUESTED_DOCS = [
  { icon: "🪪", label: "Aadhaar Card", issuer: "UIDAI" },
  { icon: "📋", label: "eShram Card", issuer: "Ministry of Labour" },
  { icon: "🎓", label: "Education Certificates", issuer: "DigiLocker Issued" },
  { icon: "🏥", label: "Ayushman Bharat Card", issuer: "NHA" },
];

export default function DigiLockerMock() {
  const { setIdentityVerified } = useMockData();
  const router = useRouter();

  const [step, setStep] = useState<Step>("identifier");
  const [identifierType, setIdentifierType] = useState<"aadhaar" | "mobile">("aadhaar");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [consentGranted, setConsentGranted] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
      }
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 12000);
  };

  // ── Step 1: Identifier ──
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const max = identifierType === "aadhaar" ? 12 : 10;
    setIdentifier(raw.slice(0, max));
    setError("");
  };

  const formatAadhaar = (v: string) => v.replace(/(.{4})/g, "$1 ").trim();

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const minLen = identifierType === "aadhaar" ? 12 : 10;
    if (identifier.length < minLen) {
      setError(`Please enter a valid ${identifierType === "aadhaar" ? "12-digit Aadhaar" : "10-digit mobile"} number.`);
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    showToast(`[DigiLocker OTP] Your code is ${code}. Valid for 10 minutes.`);
    setStep("otp");
  };

  // ── Step 2: OTP ──
  const handleOtpChange = (idx: number, val: string, refs: React.MutableRefObject<(HTMLInputElement | null)[]>, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (!/^\d*$/.test(val)) return;
    setter(prev => {
      const next = [...prev];
      next[idx] = val.slice(-1);
      return next;
    });
    setError("");
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent, refs: React.MutableRefObject<(HTMLInputElement | null)[]>, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (e.key === "Backspace") {
      setter(prev => {
        const next = [...prev];
        if (!next[idx] && idx > 0) {
          refs.current[idx - 1]?.focus();
          next[idx - 1] = "";
        } else {
          next[idx] = "";
        }
        return next;
      });
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Enter the 6-digit OTP."); return; }
    if (code !== generatedOtp) {
      setError(`Wrong OTP. Hint: ${generatedOtp}`);
      return;
    }
    setStep("pin");
    setTimeout(() => pinRefs.current[0]?.focus(), 100);
  };

  // ── Step 3: Security PIN ──
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = pin.join("");
    if (code.length < 6) { setError("Enter your 6-digit DigiLocker PIN."); return; }
    // Any 6-digit PIN is accepted in mock
    setStep("consent");
  };

  // ── Step 4: Consent / Authorization ──
  const handleAllow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIdentityVerified(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("PRAMAAN_identity_verified", "true");
      }
      window.location.href = "/api/digilocker/callback?code=mock_oauth_code_xyz789";
    }, 1800);
  };

  const handleDeny = () => {
    router.push("/onboarding");
  };

  // ── Progress indicator ──
  const STEPS: { id: Step; label: string }[] = [
    { id: "identifier", label: "Identity" },
    { id: "otp", label: "OTP" },
    { id: "pin", label: "PIN" },
    { id: "consent", label: "Authorise" },
  ];
  const currentIdx = STEPS.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ fontFamily: "var(--font-sans, Inter, sans-serif)" }}>
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* DigiLocker branding header */}
      <div className="relative z-10 flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#1A3BAA] flex items-center justify-center shadow">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#1A3BAA] uppercase tracking-widest">DigiLocker</p>
          <p className="text-[10px] text-slate-500">Ministry of Electronics & IT, Govt. of India</p>
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-blue-900/10 border border-slate-100 overflow-hidden relative z-10">

        {/* Step Progress Bar */}
        <div className="px-8 pt-7 pb-0">
          <div className="flex items-center gap-0 mb-6">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                    i < currentIdx ? "bg-blue-600 text-white" :
                    i === currentIdx ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                    "bg-slate-100 text-slate-400"
                  }`}>
                    {i < currentIdx ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={`text-[10px] font-bold whitespace-nowrap ${i <= currentIdx ? "text-blue-600" : "text-slate-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mb-4 mx-1 transition-all duration-500 ${i < currentIdx ? "bg-blue-600" : "bg-slate-100"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="px-8 pb-8">

          {/* ══════ STEP 1: IDENTIFIER ══════ */}
          {step === "identifier" && (
            <div>
              <h1 className="text-[22px] font-black text-slate-900 mb-1">Sign in to DigiLocker</h1>
              <p className="text-sm text-slate-500 mb-6">Enter your Aadhaar or mobile number to continue.</p>

              {/* Toggle */}
              <div className="flex rounded-xl overflow-hidden border border-slate-200 mb-6 bg-slate-50">
                {(["aadhaar", "mobile"] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => { setIdentifierType(t); setIdentifier(""); setError(""); }}
                    className={`flex-1 py-2.5 text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
                      identifierType === t ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {t === "aadhaar" ? <Fingerprint className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                    {t === "aadhaar" ? "Aadhaar" : "Mobile"}
                  </button>
                ))}
              </div>

              <form onSubmit={handleIdentifierSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {identifierType === "aadhaar" ? "Aadhaar Number" : "Mobile Number"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={identifierType === "aadhaar" ? formatAadhaar(identifier) : identifier}
                      onChange={handleIdentifierChange}
                      placeholder={identifierType === "aadhaar" ? "0000 0000 0000" : "98XXXXXXXX"}
                      className={`block w-full pl-11 pr-4 py-3 border ${error ? "border-red-300" : "border-slate-200"} rounded-xl text-[15px] tracking-widest font-mono text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 focus:bg-white transition-all`}
                    />
                  </div>
                  {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
                </div>

                <div className="bg-blue-50 rounded-xl p-3.5 flex gap-2.5 items-start border border-blue-100">
                  <Lock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 leading-relaxed">An OTP will be sent to your Aadhaar-registered mobile number for verification.</p>
                </div>

                <button type="submit" className="w-full flex items-center justify-center py-3.5 rounded-xl text-sm font-bold text-white bg-[#1A3BAA] hover:bg-[#142E8A] transition-all gap-2 shadow-sm">
                  Get OTP <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* ══════ STEP 2: OTP ══════ */}
          {step === "otp" && (
            <div>
              <h1 className="text-[22px] font-black text-slate-900 mb-1">Enter OTP</h1>
              <p className="text-sm text-slate-500 mb-6">
                A 6-digit OTP has been sent to the mobile number linked with your {identifierType === "aadhaar" ? "Aadhaar" : "account"}.
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">OTP</label>
                  <div className="flex gap-2 justify-between">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => { otpRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(i, e.target.value, otpRefs, setOtp)}
                        onKeyDown={e => handleOtpKeyDown(i, e, otpRefs, setOtp)}
                        className={`w-12 h-14 text-center text-xl font-black rounded-xl border-2 ${
                          error ? "border-red-300" : digit ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50"
                        } focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-800`}
                      />
                    ))}
                  </div>
                  {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
                </div>

                <button type="submit" className="w-full flex items-center justify-center py-3.5 rounded-xl text-sm font-bold text-white bg-[#1A3BAA] hover:bg-[#142E8A] transition-all gap-2 shadow-sm">
                  Verify OTP <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button type="button" onClick={() => { setStep("identifier"); setOtp(["","","","","",""]); setError(""); }} className="text-slate-500 hover:text-slate-700 font-medium">
                    ← Change number
                  </button>
                  <button type="button" onClick={() => {
                    const code = Math.floor(100000 + Math.random() * 900000).toString();
                    setGeneratedOtp(code);
                    showToast(`[DigiLocker OTP] New code: ${code}`);
                  }} className="text-blue-600 hover:text-blue-700 font-semibold">
                    Resend OTP
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ══════ STEP 3: SECURITY PIN ══════ */}
          {step === "pin" && (
            <div>
              <h1 className="text-[22px] font-black text-slate-900 mb-1">DigiLocker PIN</h1>
              <p className="text-sm text-slate-500 mb-6">Enter your 6-digit DigiLocker security PIN to continue.</p>

              <form onSubmit={handlePinSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-slate-400" />
                      Security PIN
                    </span>
                  </label>
                  <div className="flex gap-2 justify-between">
                    {pin.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => { pinRefs.current[i] = el; }}
                        type="password"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(i, e.target.value, pinRefs, setPin)}
                        onKeyDown={e => handleOtpKeyDown(i, e, pinRefs, setPin)}
                        className={`w-12 h-14 text-center text-2xl font-black rounded-xl border-2 ${
                          error ? "border-red-300" : digit ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50"
                        } focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-slate-800`}
                      />
                    ))}
                  </div>
                  {error && <p className="mt-2 text-sm text-red-500 text-center">{error}</p>}
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex gap-2.5">
                  <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">This is your DigiLocker account PIN, not your bank or Aadhaar PIN. Any 6-digit PIN works in demo.</p>
                </div>

                <button type="submit" className="w-full flex items-center justify-center py-3.5 rounded-xl text-sm font-bold text-white bg-[#1A3BAA] hover:bg-[#142E8A] transition-all gap-2 shadow-sm">
                  Confirm PIN <ArrowRight className="w-4 h-4" />
                </button>

                <button type="button" onClick={() => { setStep("otp"); setPin(["","","","","",""]); setError(""); }} className="w-full text-sm text-slate-500 hover:text-slate-700 font-medium">
                  ← Back
                </button>
              </form>
            </div>
          )}

          {/* ══════ STEP 4: CONSENT / AUTHORIZATION ══════ */}
          {step === "consent" && (
            <div>
              {/* App info */}
              <div className="flex items-center gap-3 mb-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-[#1A6B47]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#1A6B47]" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">PRAMAAN</p>
                  <p className="text-[11px] text-slate-500">pramaan.in · Verified App</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">✓ Verified</span>
                </div>
              </div>

              <h1 className="text-[19px] font-black text-slate-900 mb-1">Authorise Access</h1>
              <p className="text-sm text-slate-500 mb-4">
                <span className="font-semibold text-slate-700">PRAMAAN</span> is requesting access to the following documents from your DigiLocker account:
              </p>

              {/* Documents list */}
              <div className="border border-slate-100 rounded-xl overflow-hidden mb-5">
                {REQUESTED_DOCS.map((doc, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < REQUESTED_DOCS.length - 1 ? "border-b border-slate-100" : ""}`}>
                    <span className="text-xl">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800">{doc.label}</p>
                      <p className="text-[11px] text-slate-500">{doc.issuer}</p>
                    </div>
                    <FileText className="w-4 h-4 text-slate-300 shrink-0" />
                  </div>
                ))}
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-3 cursor-pointer mb-5 select-none group">
                <input
                  type="checkbox"
                  checked={consentGranted}
                  onChange={e => setConsentGranted(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700">
                  I consent to PRAMAAN accessing the above documents from my DigiLocker account for the purpose of identity and credential verification. This access is one-time and governed by the{" "}
                  <span className="text-blue-600 underline cursor-pointer">DigiLocker Privacy Policy</span>.
                </span>
              </label>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDeny}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
                >
                  Deny
                </button>
                <button
                  type="button"
                  onClick={handleAllow}
                  disabled={!consentGranted || isLoading}
                  className="flex-1 flex items-center justify-center py-3.5 rounded-xl text-sm font-bold text-white bg-[#1A3BAA] hover:bg-[#142E8A] disabled:opacity-50 disabled:cursor-not-allowed transition-all gap-2 shadow-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authorising…
                    </>
                  ) : (
                    <>Allow Access <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                Powered by DigiLocker · Ministry of Electronics & IT · Govt. of India
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Bottom branding */}
      <div className="mt-6 text-center relative z-10 flex flex-col items-center gap-1.5">
        <img src="/logo-text.png" alt="PRAMAAN" className="h-10 w-auto object-contain mix-blend-multiply" />
        <p className="text-xs text-slate-400">Powered by <span className="font-semibold text-slate-500">PRAMAAN Trust Infrastructure</span></p>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full bg-[#1A3BAA] text-white rounded-2xl p-4 shadow-2xl border border-white/10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0">✉</div>
          <div className="flex-1">
            <div className="text-[10px] font-bold text-blue-200 uppercase tracking-wider mb-1">DigiLocker · SMS</div>
            <div className="text-sm font-semibold leading-normal">{toastMessage}</div>
          </div>
          <button onClick={() => setToastMessage("")} className="text-blue-300 hover:text-white text-xs font-bold px-1">✕</button>
        </div>
      )}
    </div>
  );
}
