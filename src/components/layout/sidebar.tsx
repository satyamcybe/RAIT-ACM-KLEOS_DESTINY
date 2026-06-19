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
        "hidden w-64 shrink-0 border-r border-gray-100 bg-white lg:block",
        className
      )}
    >
      <nav className="flex flex-col gap-1 p-4">
        {visibleItems.map((item) => {
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
              <item.icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
