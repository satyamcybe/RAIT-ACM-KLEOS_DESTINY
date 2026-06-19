// ===========================================
// PRANAM - SSI Types
// Self-Sovereign Identity types
// ===========================================

/** SSI adapter interface */
export interface SSIAdapter {
  /** Issue a verifiable credential */
  issueCredential(params: SSIIssueParams): Promise<SSICredential>;
  /** Verify a credential */
  verifyCredential(credentialId: string): Promise<SSIVerifyResult>;
  /** Revoke a credential */
  revokeCredential(credentialId: string): Promise<boolean>;
  /** List credentials for a DID */
  listCredentials(did: string): Promise<SSICredential[]>;
}

export interface SSIIssueParams {
  subjectDid: string;
  credentialType: string;
  claims: Record<string, unknown>;
  expiresAt?: string;
}

export interface SSICredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: {
    id: string;
    [key: string]: unknown;
  };
  proof?: {
    type: string;
    created: string;
    proofPurpose: string;
    verificationMethod: string;
    jws?: string;
  };
}

export interface SSIVerifyResult {
  valid: boolean;
  checks: SSIVerifyCheck[];
  errors: string[];
}

export interface SSIVerifyCheck {
  check: string;
  status: "passed" | "failed";
  message?: string;
}
