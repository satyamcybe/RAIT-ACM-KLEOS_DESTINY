// ===========================================
// PRANAM - SSI Constants
// ===========================================

export const SSI_CONSTANTS = {
  /** Credential context */
  CONTEXT: ["https://www.w3.org/2018/credentials/v1"] as const,
  /** Issuer DID */
  ISSUER_DID: "did:pranam:issuer:001",
  /** Credential types */
  CREDENTIAL_TYPES: {
    identity: "PranamIdentityCredential",
    financial: "PranamFinancialCredential",
    reputation: "PranamReputationCredential",
  },
  /** Default credential validity in days */
  DEFAULT_VALIDITY_DAYS: 365,
} as const;
