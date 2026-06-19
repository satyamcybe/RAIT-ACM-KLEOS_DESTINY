// ===========================================
// PRANAM - Identity Card Component
// Displays identity verification status
// ===========================================

"use client";

import { cn } from "@/lib/utils";

interface IdentityCardProps {
  className?: string;
  type: "aadhaar" | "eshram";
  name: string | null;
  verified: boolean;
  details?: Record<string, string>;
  onVerify?: () => void;
}

export function IdentityCard({
  className,
  type,
  name,
  verified,
  details,
  onVerify,
}: IdentityCardProps) {
  const config = {
    aadhaar: {
      icon: "🪪",
      title: "Aadhaar (DigiLocker)",
      color: "emerald",
    },
    eshram: {
      icon: "👷",
      title: "eShram Card",
      color: "blue",
    },
  };

  const { icon, title } = config[type];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md",
        verified ? "border-emerald-200" : "border-gray-200",
        className
      )}
    >
      {/* Status badge */}
      <div className="absolute right-4 top-4">
        {verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            ✓ Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
            Pending
          </span>
        )}
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-2xl">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {name && (
            <p className="mt-1 text-sm text-gray-600">{name}</p>
          )}
          {details && (
            <div className="mt-3 space-y-1">
              {Object.entries(details).map(([key, value]) => (
                <p key={key} className="text-xs text-gray-500">
                  <span className="font-medium">{key}:</span> {value}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {!verified && onVerify && (
        <button
          onClick={onVerify}
          className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Verify Now
        </button>
      )}
    </div>
  );
}
