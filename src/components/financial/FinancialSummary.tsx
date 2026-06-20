// ===========================================
// PRAMAAN - Financial Summary Component
// Displays financial overview
// ===========================================

import { cn } from "@/lib/utils";
import { Coins, CreditCard, BarChart2, Star } from "lucide-react";

interface FinancialSummaryProps {
  className?: string;
  avgIncome: number | null;
  avgExpense: number | null;
  riskScore: number | null;
  reputationScore: number | null;
  accountCount: number;
}

export function FinancialSummary({
  className,
  avgIncome,
  avgExpense,
  riskScore,
  reputationScore,
  accountCount,
}: FinancialSummaryProps) {
  const stats = [
    {
      label: "Avg Monthly Income",
      value: avgIncome ? `₹${avgIncome.toLocaleString("en-IN")}` : "—",
      icon: Coins,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100/50",
    },
    {
      label: "Avg Monthly Expense",
      value: avgExpense ? `₹${avgExpense.toLocaleString("en-IN")}` : "—",
      icon: CreditCard,
      iconColor: "text-rose-600 bg-rose-50 border-rose-100/50",
    },
    {
      label: "Risk Score",
      value: riskScore !== null ? `${riskScore}/100` : "—",
      icon: BarChart2,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100/50",
    },
    {
      label: "Reputation Score",
      value: reputationScore !== null ? `${reputationScore}/100` : "—",
      icon: Star,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100/50",
    },
  ];

  return (
    <div className={cn("rounded-xl border border-gray-200 bg-white p-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Financial Summary</h3>
        <span className="text-xs text-gray-500">
          {accountCount} account{accountCount !== 1 ? "s" : ""} linked
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl bg-slate-50/50 p-4 border border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center border", stat.iconColor)}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-gray-500">{stat.label}</span>
              </div>
              <p className="mt-3.5 text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
