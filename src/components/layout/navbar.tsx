// ===========================================
// PRAMAAN - Navbar Component
// Top navigation bar
// ===========================================

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md",
        className
      )}
    >
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <img 
            src="/logo-text.png" 
            alt="PRAMAAN Logo" 
            className="h-12 w-auto object-contain mix-blend-multiply logo-brand-green"
          />
        </Link>



        {/* User Menu */}
        <div className="flex items-center gap-3">
          {/* TODO: Replace with Clerk UserButton */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-medium text-emerald-700">
            D
          </div>
        </div>
      </div>
    </header>
  );
}
