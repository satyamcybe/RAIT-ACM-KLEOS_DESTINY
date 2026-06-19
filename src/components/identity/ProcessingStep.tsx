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
      className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
        step.status === 'active' ? 'bg-amber-50 border border-amber-100' :
        step.status === 'complete' ? 'bg-slate-50' :
        step.status === 'failed' ? 'bg-red-50' :
        'bg-transparent'
      }`}
    >
      {/* Left: Icon circle */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            step.status === 'pending' ? 'bg-slate-100 text-slate-400' :
            step.status === 'active' ? 'bg-amber-100 text-amber-600' :
            step.status === 'complete' ? 'bg-teal-100 text-teal-600' :
            'bg-red-100 text-red-600'
          }`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        {/* Pulsing ring for active state */}
        {step.status === 'active' && (
          <div className="absolute inset-0 rounded-full border-2 border-amber-400 pulse-ring" />
        )}
      </div>

      {/* Center: Content */}
      <div className="flex-1 pt-1">
        <div className="text-xs text-slate-400 mb-0.5">Step {step.id}</div>
        <div
          className={`text-sm ${
            step.status === 'active' ? 'font-semibold text-slate-900' :
            step.status === 'pending' ? 'font-medium text-slate-500' :
            'font-medium text-slate-700'
          }`}
        >
          {step.label}
        </div>
        {step.status === 'complete' && step.detail && (
          <div className="text-xs text-teal-700 font-mono mt-1 fade-in-detail">
            {step.detail}
          </div>
        )}
      </div>

      {/* Right: Status indicator */}
      <div className="pt-2 flex-shrink-0">
        {step.status === 'active' && (
          <div className="flex items-center gap-1.5 text-amber-600">
            <span className="text-xs font-medium">Processing</span>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          </div>
        )}
        {step.status === 'complete' && (
          <span className="text-xs font-medium text-teal-600">Done</span>
        )}
        {step.status === 'failed' && (
          <span className="text-xs font-medium text-red-600">Failed</span>
        )}
      </div>
    </div>
  );
}
