// ===========================================
// PRANAM - Financial Service
// Orchestrates AA consent and data flows
// ===========================================

import { getMode } from "@/lib/config/env";
import { SetuMockAdapter } from "@/integrations/setu/mock";
import { SetuSandboxAdapter } from "@/integrations/setu/sandbox";
import type { SetuAdapter } from "@/integrations/setu/types";
import type { FinancialData } from "../types/financial";

/** Factory: get the right Setu adapter */
function getSetuAdapter(): SetuAdapter {
  const mode = getMode();
  switch (mode) {
    case "sandbox":
    case "production":
      return new SetuSandboxAdapter();
    default:
      return new SetuMockAdapter();
  }
}

export class FinancialService {
  private setu: SetuAdapter;

  constructor() {
    this.setu = getSetuAdapter();
  }

  /** Create a consent request */
  async createConsent(customerVua: string, fiTypes: string[]) {
    // TODO: Implement consent creation flow
    return this.setu.createConsent({
      customerVua,
      fiTypes,
      dateRangeFrom: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      dateRangeTo: new Date().toISOString(),
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/financial-verification`,
    });
  }

  /** Check consent status */
  async checkConsentStatus(consentHandle: string) {
    // TODO: Implement consent status check
    return this.setu.checkConsentStatus(consentHandle);
  }

  /** Fetch financial data */
  async fetchFinancialData(consentId: string): Promise<FinancialData> {
    // TODO: Implement data fetch, parse, and store
    const raw = await this.setu.fetchFinancialData(consentId);
    return {
      accounts: raw.accounts.map((a) => ({
        accountType: a.accountType,
        maskedNumber: a.maskedAccountNumber,
        balance: a.summary.currentBalance,
        fiType: a.fiType,
      })),
      transactions: raw.transactions.map((t) => ({
        id: t.txnId,
        amount: t.amount,
        type: t.type === "CREDIT" ? "credit" : "debit",
        narration: t.narration,
        date: t.transactionTimestamp,
      })),
      profile: null, // TODO: Compute from transactions
    };
  }
}

/** Singleton instance */
export const financialService = new FinancialService();
