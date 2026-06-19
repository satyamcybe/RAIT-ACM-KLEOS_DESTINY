// ===========================================
// PRAMAAN - Setu AA Constants
// ===========================================

export const SETU_CONSTANTS = {
  /** Supported FI types */
  FI_TYPES: [
    "DEPOSIT",
    "TERM_DEPOSIT",
    "RECURRING_DEPOSIT",
    "INSURANCE",
    "MUTUAL_FUNDS",
  ] as const,
  /** Consent expiry in days */
  CONSENT_EXPIRY_DAYS: 30,
  /** Data fetch frequency */
  FETCH_TYPE: "ONETIME" as const,
  /** API versions */
  API_VERSION: "v2" as const,
} as const;
