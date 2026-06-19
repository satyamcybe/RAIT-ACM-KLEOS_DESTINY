// ===========================================
// PRAMAAN - Reputation Types
// ===========================================

export interface ReputationProfile {
  workerId: string;
  overallScore: number; // 0-100
  category: ReputationCategory;
  signals: ReputationSignal[];
  lastCalculatedAt: Date | null;
}

export type ReputationCategory = "poor" | "fair" | "good" | "excellent";

export interface ReputationSignal {
  name: string;
  value: number;
  weight: number;
  description: string;
}

export interface ReputationCalculation {
  identityScore: number;
  financialScore: number;
  consistencyScore: number;
  totalScore: number;
}
