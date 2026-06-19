// ===========================================
// PRANAM - Sidebar Component
// Side navigation for dashboard
// ===========================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: string; // emoji for now, TODO: replace with Lucide icons
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Identity", href: "/onboarding", icon: "🪪" },
  { label: "Financial", href: "/financial-verification", icon: "💰" },
  { label: "Wallet", href: "/wallet", icon: "👛" },
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 border-r border-gray-100 bg-white lg:block",
        className
      )}
    >
      <nav className="flex flex-col gap-1 p-4">
        {sidebarItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
