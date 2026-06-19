// ===========================================
// PRANAM - Credential Types
// Verifiable Credentials (SSI)
// ===========================================

export interface Credential {
  id: string;
  workerId: string;
  type: CredentialType;
  issuer: string;
  subject: CredentialSubject;
  claims: Record<string, unknown>;
  proof: CredentialProof | null;
  status: CredentialStatus;
  issuedAt: Date;
  expiresAt: Date | null;
  revokedAt: Date | null;
  createdAt: Date;
}

export type CredentialType = "identity" | "financial" | "reputation";
export type CredentialStatus = "active" | "revoked" | "expired";

export interface CredentialSubject {
  id: string;
  name: string;
  // TODO: Extend based on credential type
}

export interface CredentialProof {
  type: string;
  created: string;
  verificationMethod: string;
  proofPurpose: string;
  proofValue: string;
}

export interface CredentialCreateInput {
  workerId: string;
  type: CredentialType;
  claims: Record<string, unknown>;
  expiresAt?: Date;
}

export interface CredentialVerifyResult {
  valid: boolean;
  credential: Credential | null;
  errors: string[];
}
