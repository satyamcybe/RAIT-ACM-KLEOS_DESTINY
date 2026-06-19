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
  SetuTransaction,
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
    console.log("[MOCK] Setu: Fetching financial data");

    const transactions: SetuTransaction[] = [];
    let currentBalance = 28000;
    const now = new Date();

    for (let i = 0; i < 48; i++) {
      const base = 4200;
      const variation = Math.sin(i) * 600;
      const amount = Math.round(base + variation);
      
      const isEven = i % 2 === 0;
      const narration = isEven 
        ? `NEFT/ZOMATO TECHNOLOGIES PVT LTD/WK${48 - i}`
        : `IMPS/ZOMATO TECH/WEEKLY/${48 - i}`;

      const txnDate = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      
      transactions.push({
        txnId: `mock_txn_${i.toString().padStart(3, '0')}`,
        amount,
        type: "CREDIT",
        narration,
        transactionTimestamp: txnDate.toISOString(),
        currentBalance,
        reference: `ZOM${48 - i}`,
      });

      // Simulate a debit between credits to keep balance realistic
      if (i > 0) {
        currentBalance -= Math.round(amount * 0.9); // Spend most of what was earned
      }
    }

    return {
      accounts: [
        {
          accountType: "SAVINGS",
          maskedAccountNumber: "XXXX1234",
          fiType: "DEPOSIT",
          summary: {
            currentBalance: transactions[0].currentBalance,
            branch: "Mumbai Main Branch",
            ifscCode: "SBIN0001234",
          },
        },
      ],
      transactions,
    };
  }
}
