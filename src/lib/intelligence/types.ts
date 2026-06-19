export type TransactionType = 'CREDIT' | 'DEBIT';

export interface RawTransaction {
  txnId: string;
  date: string; // ISO String
  amount: number;
  type: TransactionType;
  narration: string;
  timestamp?: string; // Optional, ISO String
}

export interface NormalizedTransaction extends RawTransaction {
  normalizedNarration: string;
}

export interface PlatformDetectedTransaction extends NormalizedTransaction {
  platform: string;
  platformConfidence: number;
}

export type IntentCategory = 'GIG_PAYOUT' | 'REFUND' | 'PERSONAL_EXPENSE' | 'OTHER_INCOME' | 'SELF_TRANSFER' | 'UNKNOWN';

export interface IntentTransaction extends PlatformDetectedTransaction {
  initialIntent: IntentCategory;
}

export interface CategorizedTransaction extends IntentTransaction {
  category: IntentCategory; // Final category after all rules
  gigConfidence: number; // 0-100
}

export interface BehaviouralSignals {
  weeklyConsistency: number; // 0-100%
  gigTenureMonths: number;
  platformDiversity: number;
  activityContinuity: number; // 0-100%
  avgWeeklyGigIncome: number;
  refundRatio: number; // e.g. 0.05
  monthlyIncomeStability: number; // 0-100%
}

export interface Layer3Output {
  transactionsAnalyzed: number;
  gigPayoutsDetected: number;
  refundsDetected: number;
  platformsDetected: string[];
  behaviouralSignals: BehaviouralSignals;
}
