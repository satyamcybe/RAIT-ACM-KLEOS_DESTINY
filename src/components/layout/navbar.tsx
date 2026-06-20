// ===========================================
// PRAMAAN - Navbar Component
// Top navigation bar
// ===========================================

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md",
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
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700 border border-emerald-200/50 shadow-xs">
            <User className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>
    </header>
  );
}
