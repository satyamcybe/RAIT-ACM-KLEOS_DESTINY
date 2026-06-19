// ===========================================
// PRANAM - Financial Summary Component
// Displays financial overview
// ===========================================

import { cn } from "@/lib/utils";

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
      icon: "💰",
    },
    {
      label: "Avg Monthly Expense",
      value: avgExpense ? `₹${avgExpense.toLocaleString("en-IN")}` : "—",
      icon: "💸",
    },
    {
      label: "Risk Score",
      value: riskScore !== null ? `${riskScore}/100` : "—",
      icon: "📊",
    },
    {
      label: "Reputation Score",
      value: reputationScore !== null ? `${reputationScore}/100` : "—",
      icon: "⭐",
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
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-gray-50 p-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
