// ===========================================
// PRANAM - Financial Types
// ===========================================

export interface FinancialConsent {
  id: string;
  status: "pending" | "approved" | "rejected" | "expired";
  fiTypes: string[];
  createdAt: Date;
  expiresAt: Date | null;
}

export interface FinancialData {
  accounts: AccountSummary[];
  transactions: TransactionItem[];
  profile: FinancialProfileSummary | null;
}

export interface AccountSummary {
  accountType: string;
  maskedNumber: string;
  balance: number;
  fiType: string;
}

export interface TransactionItem {
  id: string;
  amount: number;
  type: "credit" | "debit";
  narration: string;
  date: string;
  category?: string;
}

export interface FinancialProfileSummary {
  avgMonthlyIncome: number;
  avgMonthlyExpense: number;
  salaryRegularity: number;
  riskScore: number;
  reputationScore: number;
}

export interface ConsentRequest {
  fiTypes: string[];
  dateRangeFrom?: string;
  dateRangeTo?: string;
}
