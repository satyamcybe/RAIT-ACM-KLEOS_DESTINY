"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMockData } from "@/lib/context/MockDataContext";

type Step = "identifier" | "pin" | "otp" | "consent";

const DL_BLUE = "#0070C9";
const DL_PURPLE = "#6B3FA0";

// Real DigiLocker logo from CDN (inline SVG fallback)
function DigiLockerLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src="https://cdn.digilocker.gov.in/digilocker-landing-page/assets/img/DigilockerLogo.svg"
      alt="DigiLocker"
      className={className}
      onError={(e) => {
        // Fallback SVG if CDN fails
        const target = e.currentTarget as HTMLImageElement;
        target.style.display = "none";
        const fallback = target.nextElementSibling as HTMLElement;
        if (fallback) fallback.style.display = "flex";
      }}
    />
  );
}

const DOCS = [
  { id: 1, label: "Aadhaar Card", ref: "XX1234", checked: true },
  { id: 2, label: "eShram Card", ref: "XXESH567", checked: true },
  { id: 3, label: "PAN Verification Record", ref: "XXPAN890", checked: false },
];

export default function DigiLockerMock() {
  const { setIdentityVerified } = useMockData();
  const router = useRouter();

  const [step, setStep] = useState<Step>("identifier");
  const [idType, setIdType] = useState<"mobile" | "aadhaar">("aadhaar");
  const [identifier, setIdentifier] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpFetching, setOtpFetching] = useState(false);
  const [otpReady, setOtpReady] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [docs, setDocs] = useState(DOCS);
  const [docsExpanded, setDocsExpanded] = useState(true);
  const [consentDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
  });

  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 10000);
  };

  // ── Box input handlers ──
  const handleBoxChange = (
    idx: number,
    val: string,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!/^\d*$/.test(val)) return;
    setter(prev => {
      const next = [...prev];
      next[idx] = val.slice(-1);
      return next;
    });
    setError("");
    if (val && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handleBoxKeyDown = (
    idx: number,
    e: React.KeyboardEvent,
    refs: React.MutableRefObject<(HTMLInputElement | null)[]>,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
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

  // ── Step 1: Identifier Submit ──
  const handleIdentifierSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const minLen = idType === "aadhaar" ? 12 : 10;
    if (identifier.replace(/\s/g, "").length < minLen) {
      setError(`Enter a valid ${idType === "aadhaar" ? "12-digit Aadhaar" : "10-digit mobile"} number.`);
      return;
    }
    setStep("pin");
    setTimeout(() => pinRefs.current[0]?.focus(), 100);
  };

  // ── Step 2: PIN Submit ──
  const handlePinSubmit = (e?: React.FormEvent, customPin?: string[]) => {
    if (e) e.preventDefault();
    const pinToVerify = customPin || pin;
    if (pinToVerify.join("").length < 6) { setError("Enter your 6-digit Security PIN."); return; }
    // Auto-fetch OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setStep("otp");
    setOtpFetching(true);
    setOtpReady(false);
    // Simulate OTP being fetched/sent ~300ms
    setTimeout(() => {
      setOtpFetching(false);
      setOtpReady(true);
      // Auto-fill OTP boxes
      setOtp(code.split(""));
      showToast(`DigiLocker OTP: ${code} has been sent to your registered mobile.`);
      // Focus last box so user just hits Enter
      setTimeout(() => otpRefs.current[5]?.focus(), 100);
    }, 300);
  };

  // ── Step 3: OTP Submit ──
  const handleOtpSubmit = (e?: React.FormEvent, customOtp?: string) => {
    if (e) e.preventDefault();
    const entered = customOtp || otp.join("");
    if (entered.length < 6) { setError("Waiting for OTP…"); return; }
    if (entered !== generatedOtp) { setError(`Wrong OTP. (Hint: ${generatedOtp})`); return; }
    setStep("consent");
  };

  // ── Step 4: Allow ──
  const handleAllow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIdentityVerified(true);
      if (typeof window !== "undefined") localStorage.setItem("PRAMAAN_identity_verified", "true");
      window.location.href = "/api/digilocker/callback?code=mock_oauth_code_xyz789";
    }, 300);
  };

  const toggleDoc = (id: number) => {
    setDocs(prev => prev.map(d => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  const allChecked = docs.every(d => d.checked);
  const someChecked = docs.some(d => d.checked);

  const formatAadhaar = (v: string) => v.replace(/(.{4})/g, "$1 ").trim();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] p-4" style={{ fontFamily: "Arial, sans-serif" }}>

      {/* ── MAIN CARD ── */}
      <div className="w-full max-w-[400px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">

        {/* ── HEADER ── */}
        {step !== "consent" ? (
          // Auth flow header — just DigiLocker branding
          <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex flex-col items-center gap-3">
            {/* DigiLocker Logo */}
            <div className="flex items-center gap-2">
              <DigiLockerLogo className="h-10 w-auto" />
              {/* Fallback */}
              <div className="hidden items-center gap-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: DL_PURPLE }}>
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                </div>
                <span className="font-bold text-lg" style={{ color: DL_PURPLE }}>DigiLocker</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center">Document Wallet to Empower Citizens</p>
          </div>
        ) : (
          // Consent header — DigiLocker + Shield + PRAMAAN logo
          <div className="bg-white px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <DigiLockerLogo className="h-9 w-auto" />
              {/* Shield verified icon */}
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M12 2L4 6v6c0 5.52 3.41 10.69 8 12 4.59-1.31 8-6.48 8-12V6l-8-4z" fill="#22c55e"/>
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {/* PRAMAAN actual logo */}
              <img
                src="/logo-text.png"
                alt="PRAMAAN"
                className="h-8 w-auto object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
            {/* Mock disclaimer */}
            <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <div className="w-4 h-4 rounded-full bg-amber-400 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">i</div>
              <p className="text-[10px] text-amber-700 leading-relaxed">
                <strong>Demo Mode:</strong> This is a simulated DigiLocker authorization screen for the PRAMAAN prototype. No real data is shared.
              </p>
            </div>
          </div>
        )}

        {/* ── BODY ── */}
        <div className="px-6 py-5">

          {/* ══ STEP 1: IDENTIFIER ══ */}
          {step === "identifier" && (
            <form onSubmit={handleIdentifierSubmit} className="space-y-4">
              <div>
                <h2 className="text-[15px] font-bold text-gray-800 mb-0.5">Sign in to DigiLocker</h2>
                <p className="text-xs text-gray-500">Use your Aadhaar or Mobile number</p>
              </div>

              {/* Tab toggle */}
              <div className="flex border border-gray-200 rounded overflow-hidden text-sm">
                {(["mobile", "aadhaar"] as const).map(t => (
                  <button key={t} type="button"
                    onClick={() => { setIdType(t); setIdentifier(""); setError(""); }}
                    className="flex-1 py-2 font-semibold transition-colors"
                    style={idType === t ? { background: DL_BLUE, color: "white" } : { background: "white", color: "#555" }}>
                    {t === "mobile" ? "Mobile" : "Aadhaar"}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  {idType === "mobile" ? "Mobile Number" : "Aadhaar Number"}
                </label>
                <input
                  type="text" inputMode="numeric" autoFocus
                  value={idType === "aadhaar" ? formatAadhaar(identifier) : identifier}
                  onChange={e => {
                    const raw = e.target.value.replace(/\D/g, "").slice(0, idType === "aadhaar" ? 12 : 10);
                    setIdentifier(raw); setError("");
                  }}
                  placeholder={idType === "mobile" ? "Enter 10-digit mobile" : "0000 0000 0000"}
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm tracking-widest text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                />
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>

              <button type="submit" className="w-full py-2.5 rounded text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: DL_BLUE }}>
                Next
              </button>

              <p className="text-[10px] text-center text-gray-400">
                By continuing, you agree to DigiLocker's{" "}
                <span className="underline cursor-pointer" style={{ color: DL_BLUE }}>Terms of Service</span>
              </p>
            </form>
          )}

          {/* ══ STEP 2: SECURITY PIN ══ */}
          {step === "pin" && (
            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <h2 className="text-[15px] font-bold text-gray-800 mb-0.5">Enter Security PIN</h2>
                <p className="text-xs text-gray-500">Your 6-digit DigiLocker Security PIN</p>
              </div>

              <div>
                <div className="flex gap-2 justify-between mb-1">
                  {pin.map((d, i) => (
                    <input
                      key={i}
                      ref={el => { pinRefs.current[i] = el; }}
                      type="password" inputMode="numeric" maxLength={1}
                      value={d}
                      onChange={e => handleBoxChange(i, e.target.value, pinRefs, setPin)}
                      onKeyDown={e => handleBoxKeyDown(i, e, pinRefs, setPin)}
                      className="w-11 h-12 text-center text-xl font-bold border rounded focus:outline-none transition-colors"
                      style={{ borderColor: d ? DL_BLUE : "#d1d5db", background: d ? "#EFF6FF" : "white" }}
                    />
                  ))}
                </div>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                <p className="text-[10px] text-gray-400 mt-1">Any 6-digit PIN works in demo mode</p>
              </div>

              <button type="submit" className="w-full py-2.5 rounded text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ background: DL_BLUE }}>
                Verify PIN
              </button>

              <button type="button" onClick={() => { setStep("identifier"); setPin(["","","","","",""]); setError(""); }}
                className="w-full text-xs text-gray-500 hover:text-gray-700">
                ← Back
              </button>
            </form>
          )}

          {/* ══ STEP 3: OTP ══ */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <h2 className="text-[15px] font-bold text-gray-800 mb-0.5">Enter OTP</h2>
                <p className="text-xs text-gray-500">
                  {otpFetching ? "Sending OTP to your registered mobile…" : "OTP sent to your Aadhaar-linked mobile number"}
                </p>
              </div>

              {/* OTP boxes */}
              <div className="relative">
                <div className="flex gap-2 justify-between">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el; }}
                      type="text" inputMode="numeric" maxLength={1}
                      value={d}
                      onChange={e => handleBoxChange(i, e.target.value, otpRefs, setOtp)}
                      onKeyDown={e => handleBoxKeyDown(i, e, otpRefs, setOtp)}
                      disabled={otpFetching}
                      className="w-11 h-12 text-center text-xl font-bold border rounded focus:outline-none transition-all duration-300 disabled:opacity-40"
                      style={{
                        borderColor: d ? DL_BLUE : "#d1d5db",
                        background: d ? "#EFF6FF" : "white",
                      }}
                    />
                  ))}
                </div>
                {/* Fetching overlay animation */}
                {otpFetching && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded">
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: DL_BLUE }}>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/>
                      </svg>
                      Fetching OTP…
                    </div>
                  </div>
                )}
              </div>

              {otpReady && (
                <div className="text-[11px] text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 flex items-center gap-2">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 shrink-0"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  OTP auto-filled — press <strong>Verify &amp; Continue</strong> to proceed.
                </div>
              )}

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button type="submit" disabled={otpFetching}
                className="w-full py-2.5 rounded text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ background: DL_BLUE }}>
                {otpFetching ? "Please wait…" : "Verify & Continue"}
              </button>

              <div className="flex justify-between text-xs">
                <button type="button" onClick={() => { setStep("pin"); setOtp(["","","","","",""]); setOtpReady(false); setError(""); }}
                  className="text-gray-500 hover:text-gray-700">← Back</button>
                <button type="button" onClick={() => {
                  const code = Math.floor(100000 + Math.random() * 900000).toString();
                  setGeneratedOtp(code);
                  setOtpFetching(true); setOtpReady(false); setOtp(["","","","","",""]);
                  setTimeout(() => {
                    setOtp(code.split("")); setOtpFetching(false); setOtpReady(true);
                    showToast(`New OTP: ${code}`);
                    setTimeout(() => otpRefs.current[5]?.focus(), 50);
                  }, 2000);
                }} className="font-semibold" style={{ color: DL_BLUE }}>Resend OTP</button>
              </div>
            </form>
          )}

          {/* ══ STEP 4: CONSENT (exact DigiLocker layout) ══ */}
          {step === "consent" && (
            <div className="space-y-0 text-sm text-gray-700">
              <p className="mb-3 text-[13px]">
                Please provide your consent to share the following with <strong>PRAMAAN</strong>:
              </p>

              {/* Issued Documents */}
              <div className="border border-gray-200 rounded mb-2">
                <div
                  className="flex items-center justify-between px-3 py-2.5 cursor-pointer select-none"
                  onClick={() => setDocsExpanded(v => !v)}
                >
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 20 20" fill="currentColor" className={`w-3.5 h-3.5 text-gray-500 transition-transform ${docsExpanded ? "" : "-rotate-90"}`}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                    <span className="text-[12px] font-semibold text-gray-700">Issued Documents ({docs.filter(d=>d.checked).length})</span>
                  </div>
                  <button type="button"
                    className="text-[11px] font-semibold flex items-center gap-1"
                    style={{ color: DL_BLUE }}
                    onClick={e => { e.stopPropagation(); setDocs(prev => prev.map(d => ({ ...d, checked: !allChecked }))); }}>
                    {allChecked ? "Deselect all" : "Select all"}
                    <span className={`w-4 h-4 border-2 rounded flex items-center justify-center`}
                      style={{ borderColor: someChecked ? DL_BLUE : "#d1d5db", background: allChecked ? DL_BLUE : "white" }}>
                      {allChecked && <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>}
                    </span>
                  </button>
                </div>

                {docsExpanded && (
                  <div className="border-t border-gray-100 divide-y divide-gray-100">
                    {docs.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between px-3 py-2 bg-gray-50">
                        <span className="text-[12px] text-gray-700">{doc.label} ({doc.ref})</span>
                        <button type="button" onClick={() => toggleDoc(doc.id)}
                          className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors"
                          style={{ borderColor: doc.checked ? "#22c55e" : "#d1d5db", background: doc.checked ? "#22c55e" : "white" }}>
                          {doc.checked && <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Information */}
              <div className="border-b border-gray-100 py-3 flex gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0 mt-0.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <div>
                  <p className="text-[12px] font-semibold text-gray-700">Profile Information</p>
                  <p className="text-[11px] text-gray-500">Name, Date of Birth, Gender</p>
                </div>
              </div>

              {/* Consent validity date */}
              <div className="border-b border-gray-100 py-3 flex gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0 mt-0.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-gray-700">Consent validity date <span className="text-[10px] font-normal text-gray-400">(Today +30 days)</span></p>
                    <button className="text-[11px] flex items-center gap-0.5" style={{ color: DL_BLUE }}>
                      Edit
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-500">{consentDate}</p>
                </div>
              </div>

              {/* Purpose */}
              <div className="py-3 flex gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 text-gray-400 shrink-0 mt-0.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h4"/></svg>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-gray-700">Purpose</p>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </div>
                  <p className="text-[11px] text-gray-500">Identity Verification for Gig Workers</p>
                </div>
              </div>

              {/* Legal text */}
              <div className="border-t border-gray-100 pt-3 pb-1">
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Consent validity is subject to applicable laws.<br />
                  By clicking &apos;Allow&apos;, you are giving consent to share with <strong>PRAMAAN</strong>.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => router.push("/onboarding")}
                  className="flex-1 py-2.5 rounded border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  Deny
                </button>
                <button type="button" onClick={handleAllow}
                  disabled={!docs.some(d => d.checked) || isLoading}
                  className="flex-1 py-2.5 rounded text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  style={{ background: DL_BLUE }}>
                  {isLoading ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/></svg>Authorising…</>
                  ) : "Allow"}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* ── FOOTER ── */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-center gap-2">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-gray-400"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
          <span className="text-[10px] text-gray-400">Secured by DigiLocker · Govt. of India</span>
        </div>
      </div>

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs rounded-lg px-4 py-3 shadow-xl flex items-start gap-2.5 max-w-sm w-full mx-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 shrink-0 mt-0.5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <div>
            <div className="font-bold text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">DigiLocker · SMS</div>
            <div>{toastMsg}</div>
          </div>
          <button onClick={() => setToastMsg("")} className="ml-auto text-gray-400 hover:text-white">✕</button>
        </div>
      )}
    </div>
  );
}
