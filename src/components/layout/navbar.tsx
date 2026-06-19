// ===========================================
// PRANAM - Navbar Component
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <span className="text-sm font-bold text-white">P</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">
            Pranam
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
          >
            Dashboard
          </Link>
          <Link
            href="/wallet"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
          >
            Wallet
          </Link>
          <Link
            href="/settings"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
          >
            Settings
          </Link>
        </nav>

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
