// ===========================================
// PRAMAAN - Empty State Component
// Shown when no data is available
// ===========================================

import React from "react";
import { cn } from "@/lib/utils";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({
  className,
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-12 text-center",
        className
      )}
    >
      <div className="text-slate-400">
        {icon || <FolderOpen className="w-12 h-12" />}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
