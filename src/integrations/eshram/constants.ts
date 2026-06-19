// ===========================================
// PRANAM - eShram Constants
// ===========================================

export const ESHRAM_CONSTANTS = {
  /** API base URLs */
  API_URLS: {
    sandbox: "https://sandbox.eshram.gov.in/api/v1",
    production: "https://api.eshram.gov.in/api/v1",
  },
  /** Valid occupation codes */
  OCCUPATION_CODES: {
    "01": "Construction Worker",
    "02": "Domestic Worker",
    "03": "Street Vendor",
    "04": "Agricultural Worker",
    "05": "Factory Worker",
    "99": "Other",
  },
  /** Card validity period in years */
  CARD_VALIDITY_YEARS: 5,
} as const;
