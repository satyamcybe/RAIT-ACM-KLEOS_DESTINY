"use client";

import { ProcessingStep as ProcessingStepType } from "@/types/identity";
import { User, FileText, Search, Download, Hash, ShieldCheck, CheckCheck, Award, Check, Loader2, X } from "lucide-react";

interface ProcessingStepProps {
  step: ProcessingStepType;
}

export default function ProcessingStep({ step }: ProcessingStepProps) {
  // Select icon based on step ID
  const getIcon = () => {
    switch (step.id) {
      case 1: return User;
      case 2: return FileText;
      case 3: return Search;
      case 4: return Download;
      case 5: return Hash;
      case 6: return ShieldCheck;
      case 7: return CheckCheck;
      case 8: return Award;
      default: return Check;
    }
  };

  const IconComponent = step.status === 'complete' ? Check : (step.status === 'failed' ? X : getIcon());

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 border ${
        step.status === 'active' ? 'bg-emerald-50/60 border-emerald-100/80 shadow-xs' :
        step.status === 'complete' ? 'bg-slate-50/50 border-transparent' :
        step.status === 'failed' ? 'bg-red-50/50 border-red-100' :
        'bg-transparent border-transparent opacity-60'
      }`}
    >
      {/* Left: Icon circle */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
            step.status === 'pending' ? 'bg-slate-100 text-slate-400' :
            step.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
            step.status === 'complete' ? 'bg-teal-50 text-teal-600 border border-teal-100' :
            'bg-red-100 text-red-600'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        {/* Pulsing ring for active state */}
        {step.status === 'active' && (
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-25" />
        )}
      </div>

      {/* Center: Content */}
      <div className="flex-1 pt-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Step {step.id}</div>
        <div
          className={`text-[14px] ${
            step.status === 'active' ? 'font-bold text-[#111827]' :
            step.status === 'pending' ? 'font-medium text-slate-400' :
            'font-semibold text-slate-700'
          }`}
        >
          {step.label}
        </div>
        {step.status === 'complete' && step.detail && (
          <div className="text-xs text-teal-700 font-mono font-semibold mt-1 bg-teal-50/60 px-2 py-0.5 rounded border border-teal-100/40 inline-block fade-in-detail">
            {step.detail}
          </div>
        )}
      </div>

      {/* Right: Status indicator */}
      <div className="pt-2 flex-shrink-0">
        {step.status === 'active' && (
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="text-xs font-bold">Processing</span>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          </div>
        )}
        {step.status === 'complete' && (
          <span className="text-xs font-bold text-teal-600">Done</span>
        )}
        {step.status === 'failed' && (
          <span className="text-xs font-bold text-red-600">Failed</span>
        )}
      </div>
    </div>
  );
}
