// ===========================================
// PRAMAAN - Footer Component
// ===========================================

import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "border-t border-gray-100 bg-white py-6",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} PRAMAAN. Built for India&apos;s gig workers.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
              Hackathon MVP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
