// ===========================================
// PRANAM - Setu AA Mock Adapter
// Returns simulated AA data
// ===========================================

import type {
  SetuAdapter,
  SetuConsentParams,
  SetuConsentResponse,
  SetuConsentStatusResponse,
  SetuFIDataResponse,
} from "./types";

export class SetuMockAdapter implements SetuAdapter {
  async createConsent(params: SetuConsentParams): Promise<SetuConsentResponse> {
    // TODO: Implement mock consent creation
    console.log(`[MOCK] Setu: Creating consent for ${params.customerVua}`);
    return {
      consentHandle: `mock_consent_${Date.now()}`,
      redirectUrl: `${params.redirectUrl}?mock=true`,
      status: "PENDING",
    };
  }

  async checkConsentStatus(consentHandle: string): Promise<SetuConsentStatusResponse> {
    // TODO: Implement mock consent status check
    console.log(`[MOCK] Setu: Checking consent status for ${consentHandle}`);
    return {
      consentHandle,
      consentId: `mock_consent_id_${Date.now()}`,
      status: "APPROVED",
    };
  }

  async fetchFinancialData(_consentId: string): Promise<SetuFIDataResponse> {
    // TODO: Implement mock financial data fetch
    console.log("[MOCK] Setu: Fetching financial data");
    return {
      accounts: [
        {
          accountType: "SAVINGS",
          maskedAccountNumber: "XXXX1234",
          fiType: "DEPOSIT",
          summary: {
            currentBalance: 25000,
            branch: "New Delhi Main Branch",
            ifscCode: "SBIN0001234",
          },
        },
      ],
      transactions: [
        {
          txnId: "mock_txn_001",
          amount: 15000,
          type: "CREDIT",
          narration: "SALARY/JUN/2024",
          transactionTimestamp: new Date().toISOString(),
          currentBalance: 25000,
          reference: "SAL001",
        },
        {
          txnId: "mock_txn_002",
          amount: 2000,
          type: "DEBIT",
          narration: "UPI/GROCERY",
          transactionTimestamp: new Date().toISOString(),
          currentBalance: 23000,
          reference: "UPI001",
        },
        {
          txnId: "mock_txn_003",
          amount: 5000,
          type: "DEBIT",
          narration: "ATM/CASH",
          transactionTimestamp: new Date().toISOString(),
          currentBalance: 18000,
          reference: "ATM001",
        },
      ],
    };
  }
}
