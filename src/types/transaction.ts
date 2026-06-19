// ===========================================
// PRAMAAN - Transaction Types
// Financial transaction data
// ===========================================

export interface Transaction {
  id: string;
  workerId: string;
  accountType: string;
  amount: number;
  type: "credit" | "debit";
  narration: string | null;
  txnDate: Date;
  balance: number | null;
  category: string | null;
  createdAt: Date;
}

export interface TransactionSummary {
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  avgTransactionAmount: number;
  categories: Record<string, number>;
  monthlyBreakdown: MonthlyBreakdown[];
}

export interface MonthlyBreakdown {
  month: string; // YYYY-MM
  credits: number;
  debits: number;
  transactionCount: number;
}
