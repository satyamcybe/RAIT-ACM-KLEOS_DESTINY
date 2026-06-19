// ===========================================
// PRAMAAN - Sidebar Component
// Side navigation for dashboard
// ===========================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMockData } from "@/lib/context/MockDataContext";
import { 
  LayoutDashboard, 
  UserCheck, 
  Coins, 
  Wallet, 
  Settings 
} from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hideIf?: (ctx: { identityVerified: boolean; bankLinked: boolean }) => boolean;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Identity", href: "/onboarding", icon: UserCheck },
  { label: "Financial", href: "/financial-verification", icon: Coins },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "Settings", href: "/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const mockDataCtx = useMockData();

  const visibleItems = sidebarItems.filter(item => !item.hideIf || !item.hideIf(mockDataCtx));

  return (
    <aside
      className={cn(
        "hidden lg:block shrink-0 w-[72px] transition-all duration-300 ease-in-out relative z-30 group/sidebar",
        className
      )}
    >
      <div 
        className="absolute top-0 left-0 bottom-0 w-[72px] group-hover/sidebar:w-64 bg-white border-r border-gray-100 transition-all duration-300 ease-in-out flex flex-col py-6 px-3.5 overflow-hidden shadow-[1px_0_10px_rgba(0,0,0,0.01)] group-hover/sidebar:shadow-[4px_0_20px_rgba(0,0,0,0.06)]"
      >
        <nav className="flex flex-col gap-4 mt-2">
          {visibleItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap",
                  isActive
                    ? "bg-emerald-50 text-[#1A6B47]"
                    : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 shrink-0 transition-colors duration-300 ease-in-out", 
                  isActive ? "text-[#1A6B47]" : "text-gray-400"
                )} />
                <span className="opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300 ease-in-out font-sans ml-1">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
