"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ProcessingStep as ProcessingStepType } from "@/types/identity";
import { User, FileText, Search, Download, Hash, ShieldCheck, CheckCheck, Award, Check, Loader2 } from "lucide-react";

const STEPS: ProcessingStepType[] = [
  { id: 1, label: "Fetching your DigiLocker profile",      detail: "Raju Kumar · Aadhaar ****1234 · DOB 15 Aug 1992",  status: 'pending' },
  { id: 2, label: "Retrieving your document list",          detail: "6 documents found in your DigiLocker",             status: 'pending' },
  { id: 3, label: "Looking for eShram registration",        detail: "eShram card found · UAN pending extraction",       status: 'pending' },
  { id: 4, label: "Downloading eShram certificate",         detail: "PDF downloaded · 2.3 KB",                          status: 'pending' },
  { id: 5, label: "Extracting UAN from certificate",        detail: "UAN: 10-****-1234-5678 extracted",                 status: 'pending' },
  { id: 6, label: "Verifying with eShram database",         detail: "Verified · Registration active · Sector: Transport", status: 'pending' },
  { id: 7, label: "Cross-validating DigiLocker + eShram",   detail: "Name match ✓ · DOB match ✓ · Photo match ✓",      status: 'pending' },
  { id: 8, label: "Building your worker profile",           detail: "Profile generated · Identity verification complete", status: 'pending' },
];

const DELAYS = [1200, 800, 1000, 1500, 900, 1300, 1100, 700];

const ICONS = [User, FileText, Search, Download, Hash, ShieldCheck, CheckCheck, Award];

export default function ProcessingPipeline() {
  const router = useRouter();

  // Index of the step currently visible in the card
  const [activeIdx, setActiveIdx] = useState(0);
  // true = step is completing (done state shown), false = in-progress
  const [stepDone, setStepDone] = useState(false);
  // Fade state: 'in' | 'out'
  const [fade, setFade] = useState<'in' | 'out'>('in');
  // Number of steps completed (drives the progress bar)
  const [completed, setCompleted] = useState(0);
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;

    const run = async () => {
      for (let i = 0; i < STEPS.length; i++) {
        if (cancelRef.current) return;

        // Fade IN the new step
        setActiveIdx(i);
        setStepDone(false);
        setFade('in');

        // Hold "Processing" state for the step's delay
        await sleep(DELAYS[i]);
        if (cancelRef.current) return;

        // Show "Done" state briefly
        setStepDone(true);
        setCompleted(i + 1);

        await sleep(600);
        if (cancelRef.current) return;

        // Fade OUT before moving to the next step (skip on last)
        if (i < STEPS.length - 1) {
          setFade('out');
          await sleep(350); // matches CSS transition duration
          if (cancelRef.current) return;
        }
      }

      // All done — brief pause then redirect
      await sleep(800);
      if (!cancelRef.current) router.push('/identity/complete');
    };

    run();
    return () => { cancelRef.current = true; };
  }, [router]);

  const progressPercent = (completed / STEPS.length) * 100;
  const step = STEPS[activeIdx];
  const Icon = ICONS[activeIdx] ?? Check;

  return (
    <div className="space-y-6">
      {/* ── Smooth Progress Bar ── */}
      <div className="relative w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{
            width: `${progressPercent}%`,
            transition: "width 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        {/* Shimmer overlay */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: progressPercent > 0 && progressPercent < 100 ? "shimmer 1.6s infinite" : "none",
            transition: "width 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-0.5">
        <span>Step {activeIdx + 1} of {STEPS.length}</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>

      {/* ── Single-step Card with Crossfade ── */}
      <div className="relative w-full">
        <div
          key={activeIdx}
          className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm min-h-[110px] flex flex-col justify-center"
          style={{
            opacity: fade === 'in' ? 1 : 0,
            transform: fade === 'in' ? 'translateY(0)' : 'translateY(6px)',
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <div className="flex items-center gap-4">
            {/* Icon circle */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  stepDone
                    ? "bg-teal-50 text-teal-600 border border-teal-100"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {stepDone ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              {/* Pulsing ring while processing */}
              {!stepDone && (
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-25" />
              )}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Step {step.id}
              </div>
              <div className="text-[15px] font-bold text-slate-900 leading-snug">
                {step.label}
              </div>
              {stepDone && step.detail && (
                <div className="mt-2 text-xs font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-100/60 inline-block">
                  {step.detail}
                </div>
              )}
            </div>

            {/* Right status */}
            <div className="flex-shrink-0 pl-2">
              {stepDone ? (
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                  Done
                </span>
              ) : (
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <span className="text-xs font-bold">Processing</span>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}
