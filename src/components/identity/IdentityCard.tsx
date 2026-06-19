// ===========================================
// PRAMAAN - Identity Card Component
// Displays identity verification status
// ===========================================

"use client";

import { cn } from "@/lib/utils";
import { Fingerprint, Briefcase, Check, AlertCircle } from "lucide-react";
import Link from "next/link";

interface IdentityCardProps {
  className?: string;
  type: "aadhaar" | "eshram";
  name: string | null;
  verified: boolean;
  details?: Record<string, string>;
  onVerify?: () => void;
  href?: string;
}

export function IdentityCard({
  className,
  type,
  name,
  verified,
  details,
  onVerify,
  href,
}: IdentityCardProps) {
  const config = {
    aadhaar: {
      icon: Fingerprint,
      title: "Aadhaar (DigiLocker)",
      color: "emerald",
    },
    eshram: {
      icon: Briefcase,
      title: "eShram Card",
      color: "blue",
    },
  };

  const { icon: IconComponent, title } = config[type];

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
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
            <Check className="w-3.5 h-3.5" />
            Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700">
            <AlertCircle className="w-3.5 h-3.5" />
            Pending
          </span>
        )}
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-slate-500 border border-gray-100/50">
          <IconComponent className="w-6 h-6" />
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

      {!verified && href && (
        <Link
          href={href}
          className="mt-4 block w-full text-center rounded-xl bg-[#1A6B47] hover:bg-[#0D3D28] py-2 px-4 text-xs font-bold text-white transition-all cursor-pointer active:scale-[0.99] select-none"
        >
          Verify Now
        </Link>
      )}

      {!verified && !href && onVerify && (
        <button
          onClick={onVerify}
          className="mt-4 w-full rounded-xl bg-[#1A6B47] hover:bg-[#0D3D28] py-2 px-4 text-xs font-bold text-white transition-all cursor-pointer active:scale-[0.99]"
        >
          Verify Now
        </button>
      )}
    </div>
  );
}
