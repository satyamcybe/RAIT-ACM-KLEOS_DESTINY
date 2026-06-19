// ===========================================
// PRANAM - Setu AA Types
// Account Aggregator types
// ===========================================

/** Setu AA adapter interface */
export interface SetuAdapter {
  /** Create a consent request */
  createConsent(params: SetuConsentParams): Promise<SetuConsentResponse>;
  /** Check consent status */
  checkConsentStatus(consentHandle: string): Promise<SetuConsentStatusResponse>;
  /** Fetch financial data after consent */
  fetchFinancialData(consentId: string): Promise<SetuFIDataResponse>;
}

export interface SetuConsentParams {
  customerVua: string; // Virtual User Address
  fiTypes: string[];
  dateRangeFrom: string;
  dateRangeTo: string;
  redirectUrl: string;
}

export interface SetuConsentResponse {
  consentHandle: string;
  redirectUrl: string;
  status: string;
}

export interface SetuConsentStatusResponse {
  consentHandle: string;
  consentId: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "EXPIRED";
}

export interface SetuFIDataResponse {
  accounts: SetuAccount[];
  transactions: SetuTransaction[];
}

export interface SetuAccount {
  accountType: string;
  maskedAccountNumber: string;
  fiType: string;
  summary: {
    currentBalance: number;
    branch: string;
    ifscCode: string;
  };
}

export interface SetuTransaction {
  txnId: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  narration: string;
  transactionTimestamp: string;
  currentBalance: number;
  reference: string;
}
