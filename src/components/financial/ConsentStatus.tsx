// ===========================================
// PRANAM - Consent Status Component
// Displays AA consent status
// ===========================================

"use client";

import { cn } from "@/lib/utils";

interface ConsentStatusProps {
  className?: string;
  status: "pending" | "approved" | "rejected" | "expired" | "none";
  fiTypes: string[];
  onRequestConsent?: () => void;
}

const statusConfig = {
  none: { label: "Not Requested", color: "gray", icon: "📋" },
  pending: { label: "Pending", color: "amber", icon: "⏳" },
  approved: { label: "Approved", color: "emerald", icon: "✅" },
  rejected: { label: "Rejected", color: "red", icon: "❌" },
  expired: { label: "Expired", color: "gray", icon: "⏰" },
};

export function ConsentStatus({
  className,
  status,
  fiTypes,
  onRequestConsent,
}: ConsentStatusProps) {
  const config = statusConfig[status];

  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Consent Status</h3>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
            {
              "bg-gray-50 text-gray-700": config.color === "gray",
              "bg-amber-50 text-amber-700": config.color === "amber",
              "bg-emerald-50 text-emerald-700": config.color === "emerald",
              "bg-red-50 text-red-700": config.color === "red",
            }
          )}
        >
          {config.icon} {config.label}
        </span>
      </div>

      {fiTypes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {fiTypes.map((type) => (
            <span
              key={type}
              className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              {type}
            </span>
          ))}
        </div>
      )}

      {(status === "none" || status === "expired") && onRequestConsent && (
        <button
          onClick={onRequestConsent}
          className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Request Consent
        </button>
      )}
    </div>
  );
}
