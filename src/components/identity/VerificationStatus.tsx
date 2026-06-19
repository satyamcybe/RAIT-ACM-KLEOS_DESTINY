// ===========================================
// PRANAM - Verification Status Component
// Overall verification progress display
// ===========================================

import { cn } from "@/lib/utils";

interface VerificationStep {
  label: string;
  completed: boolean;
  active: boolean;
}

interface VerificationStatusProps {
  className?: string;
  steps: VerificationStep[];
  overallScore: number;
}

export function VerificationStatus({
  className,
  steps,
  overallScore,
}: VerificationStatusProps) {
  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Verification Progress</h3>
        <span className="text-2xl font-bold text-emerald-600">{overallScore}%</span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
          style={{ width: `${overallScore}%` }}
        />
      </div>

      {/* Steps */}
      <div className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                step.completed
                  ? "bg-emerald-100 text-emerald-700"
                  : step.active
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-400"
              )}
            >
              {step.completed ? "✓" : index + 1}
            </div>
            <span
              className={cn(
                "text-sm",
                step.completed
                  ? "font-medium text-emerald-700"
                  : step.active
                    ? "font-medium text-gray-900"
                    : "text-gray-400"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
