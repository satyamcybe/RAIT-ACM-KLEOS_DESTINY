// ===========================================
// PRANAM - Credential Types
// ===========================================

export interface CredentialDisplay {
  id: string;
  type: string;
  issuer: string;
  status: "active" | "revoked" | "expired";
  issuedAt: string;
  expiresAt: string | null;
  claims: Record<string, unknown>;
}

export interface CredentialIssueRequest {
  type: "identity" | "financial" | "reputation";
  claims: Record<string, unknown>;
}

export interface CredentialVerifyRequest {
  credentialId: string;
}
