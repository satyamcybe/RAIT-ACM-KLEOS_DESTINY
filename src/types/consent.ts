// ===========================================
// PRAMAAN - Consent Types
// AA Consent flow types
// ===========================================

export interface ConsentRequest {
  id: string;
  workerId: string;
  consentHandle: string | null;
  status: ConsentStatus;
  fiTypes: string[];
  dateRangeFrom: Date | null;
  dateRangeTo: Date | null;
  approvedAt: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ConsentStatus = "pending" | "approved" | "rejected" | "expired";

export interface ConsentCreateInput {
  workerId: string;
  fiTypes: string[];
  dateRangeFrom?: Date;
  dateRangeTo?: Date;
}

/** Consent artifact from Account Aggregator */
export interface ConsentArtifact {
  consentId: string;
  consentHandle: string;
  status: ConsentStatus;
  fiTypes: string[];
  approvedAt?: string;
  expiresAt?: string;
}
