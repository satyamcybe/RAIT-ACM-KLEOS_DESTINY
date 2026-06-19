// ===========================================
// PRANAM - Financial Profile Types
// Computed financial summary
// ===========================================

export interface FinancialProfile {
  id: string;
  workerId: string;
  avgMonthlyIncome: number | null;
  avgMonthlyExpense: number | null;
  salaryRegularity: number | null;
  accountCount: number;
  riskScore: number | null;
  reputationScore: number | null;
  signalsJson: FinancialSignals | null;
  lastFetchedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface FinancialSignals {
  incomeStability: number;     // 0-100
  savingsRatio: number;        // 0-1
  transactionFrequency: number;
  accountAge: number;          // months
  loanRepaymentScore: number;  // 0-100
  // TODO: Add more signals as needed
}

export interface FinancialProfileSummary {
  profile: FinancialProfile | null;
  riskCategory: "low" | "medium" | "high";
  reputationCategory: "poor" | "fair" | "good" | "excellent";
  lastUpdated: Date | null;
}
