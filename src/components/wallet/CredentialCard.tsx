// ===========================================
// PRAMAAN - Credential Card Component
// Displays a verifiable credential in wallet
// ===========================================

import { cn } from "@/lib/utils";

interface CredentialCardProps {
  className?: string;
  type: "identity" | "financial" | "reputation";
  issuer: string;
  status: "active" | "revoked" | "expired";
  issuedAt: string;
  claims: Record<string, unknown>;
  onView?: () => void;
  onShare?: () => void;
}

const typeConfig = {
  identity: { icon: "🪪", gradient: "from-emerald-500 to-teal-600", label: "Identity" },
  financial: { icon: "💳", gradient: "from-blue-500 to-indigo-600", label: "Financial" },
  reputation: { icon: "⭐", gradient: "from-amber-500 to-orange-600", label: "Reputation" },
};

export function CredentialCard({
  className,
  type,
  issuer,
  status,
  issuedAt,
  claims,
  onView,
  onShare,
}: CredentialCardProps) {
  const config = typeConfig[type];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {/* Header gradient */}
      <div
        className={cn(
          "flex items-center gap-3 bg-gradient-to-r px-6 py-4 text-white",
          config.gradient
        )}
      >
        <span className="text-2xl">{config.icon}</span>
        <div>
          <h3 className="font-semibold">{config.label} Credential</h3>
          <p className="text-xs opacity-80">Issued by {issuer}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Issued: {new Date(issuedAt).toLocaleDateString()}
          </span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              status === "active"
                ? "bg-emerald-50 text-emerald-700"
                : status === "revoked"
                  ? "bg-red-50 text-red-700"
                  : "bg-gray-50 text-gray-700"
            )}
          >
            {status}
          </span>
        </div>

        {/* Claims preview */}
        <div className="mt-4 space-y-2">
          {Object.entries(claims)
            .slice(0, 3)
            .map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{key}</span>
                <span className="font-medium text-gray-900">{String(value)}</span>
              </div>
            ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          {onView && (
            <button
              onClick={onView}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              View
            </button>
          )}
          {onShare && status === "active" && (
            <button
              onClick={onShare}
              className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
            >
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
