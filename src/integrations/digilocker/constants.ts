// ===========================================
// PRAMAAN - DigiLocker Constants
// ===========================================

export const DIGILOCKER_CONSTANTS = {
  /** Session expiry in minutes */
  SESSION_EXPIRY_MINUTES: 15,
  /** Supported document types */
  SUPPORTED_DOC_TYPES: ["AADHAAR", "PAN", "DRIVING_LICENSE"] as const,
  /** DigiLocker API base URLs */
  API_URLS: {
    sandbox: "https://digilocker.meripehchaan.gov.in/public/oauth2/1",
    production: "https://api.digitallocker.gov.in/public/oauth2/1",
  },
  /** OAuth scopes */
  SCOPES: "openid",
} as const;
