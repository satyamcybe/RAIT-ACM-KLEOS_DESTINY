// ===========================================
// PRAMAAN - Error Component
// Shared error display
// ===========================================

"use client";

import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  className?: string;
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorDisplay({
  className,
  title = "Something went wrong",
  message,
  onRetry,
}: ErrorDisplayProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-red-100 bg-red-50 p-8 text-center",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <span className="text-2xl">⚠️</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-red-900">{title}</h3>
        <p className="mt-1 text-sm text-red-700">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
