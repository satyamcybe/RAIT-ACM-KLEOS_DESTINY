// ===========================================
// PRAMAAN - Loading Component
// Shared loading spinner
// ===========================================

import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function Loading({ className, text = "Loading...", size = "md" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-emerald-200 border-t-emerald-600",
          sizeClasses[size]
        )}
      />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );
}
