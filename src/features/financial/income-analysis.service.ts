// src/features/financial/income-analysis.service.ts
// Income Analysis: Analyze transactions to compute financial signals

import {
  categorizeTransactions,
  calculateMonthlyIncome,
  calculateMonthlyExpense,
  calculateSalaryRegularity,
  calculateAverageBalance,
} from "../../integrations/setu/transactions";
import type { MockTransaction } from "../../integrations/setu/fetch";

export interface IncomeAnalysis {
  monthlyIncome: number;
  monthlyExpense: number;
  averageBalance: number;
  salaryRegularity: number;
  incomeConsistency: "HIGH" | "MEDIUM" | "LOW";
  riskScore: number;
  signals: {
    hasSteadySalary: boolean;
    hasRegularExpenses: boolean;
    savingsRate: number;
    topExpenseCategories: string[];
  };
}

export function analyzeIncome(transactions: MockTransaction[]): IncomeAnalysis {
  console.log("Income Analysis: Analyzing", transactions.length, "transactions");
  
  const categorized = categorizeTransactions(transactions);
  const monthlyIncome = calculateMonthlyIncome(transactions);
  const monthlyExpense = calculateMonthlyExpense(transactions);
  const averageBalance = calculateAverageBalance(transactions);
  const salaryRegularity = calculateSalaryRegularity(categorized.salary);

  // Compute savings rate
  const savingsRate = monthlyIncome > 0
    ? Math.round(((monthlyIncome - monthlyExpense) / monthlyIncome) * 100)
    : 0;

  // Determine income consistency
  let incomeConsistency: "HIGH" | "MEDIUM" | "LOW" = "LOW";
  if (salaryRegularity >= 0.8) incomeConsistency = "HIGH";
  else if (salaryRegularity >= 0.5) incomeConsistency = "MEDIUM";

  // Compute risk score (0-100, lower is better)
  let riskScore = 50; // neutral
  if (salaryRegularity >= 0.8) riskScore -= 20;
  if (savingsRate > 20) riskScore -= 15;
  if (averageBalance > 20000) riskScore -= 10;
  if (categorized.salary.length >= 3) riskScore -= 5;
  riskScore = Math.max(0, Math.min(100, riskScore));

  // Top expense categories
  const expenseBreakdown: Record<string, number> = {};
  for (const [category, txns] of Object.entries(categorized)) {
    if (category === "salary" || category === "bonus") continue;
    const total = txns.filter((t: any) => t.type === "DEBIT").reduce((sum: number, t: any) => sum + t.amount, 0);
    if (total > 0) expenseBreakdown[category] = total;
  }
  const topExpenseCategories = Object.entries(expenseBreakdown)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat]) => cat);

  return {
    monthlyIncome,
    monthlyExpense,
    averageBalance,
    salaryRegularity,
    incomeConsistency,
    riskScore,
    signals: {
      hasSteadySalary: categorized.salary.length >= 3,
      hasRegularExpenses: Object.keys(expenseBreakdown).length >= 2,
      savingsRate,
      topExpenseCategories,
    },
  };
}
