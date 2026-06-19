// ===========================================
// PRAMAAN - Financial Service
// Orchestrates AA consent and data flows
// ===========================================

import { getMode } from "@/lib/config/env";
import { SetuMockAdapter } from "@/integrations/setu/mock";
import { SetuSandboxAdapter } from "@/integrations/setu/sandbox";
import type { SetuAdapter } from "@/integrations/setu/types";
import type { FinancialData } from "../types/financial";
import { prisma } from "@/lib/database/prisma";
import { reputationService } from "@/features/reputation/services/ReputationService";

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
  async createConsent(customerVua: string, fiTypes: string[], workerId: string) {
    const res = await this.setu.createConsent({
      customerVua,
      fiTypes,
      dateRangeFrom: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      dateRangeTo: new Date().toISOString(),
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/financial-verification`,
    });

    await prisma.consentRequest.create({
      data: {
        workerId,
        consentHandle: res.consentHandle,
        status: "approved", // auto-approve for mock flow
        fiTypes,
        dateRangeFrom: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        dateRangeTo: new Date(),
      },
    });

    return res;
  }

  /** Check consent status */
  async checkConsentStatus(consentHandle: string) {
    // TODO: Implement consent status check
    return this.setu.checkConsentStatus(consentHandle);
  }

  /** Fetch financial data */
  async fetchFinancialData(consentId: string, workerId: string): Promise<FinancialData> {
    const raw = await this.setu.fetchFinancialData(consentId);
    
    // Save transactions to DB
    const txnsToSave = raw.transactions.map((t) => ({
      workerId,
      amount: t.amount,
      type: t.type === "CREDIT" ? "credit" : "debit",
      narration: t.narration,
      txnDate: new Date(t.transactionTimestamp),
      category: t.narration?.includes("ZOMATO") || t.narration?.includes("SWIGGY") 
        ? "platform_credit" 
        : "other",
      accountType: "SAVINGS",
      balance: t.currentBalance,
    }));

    await prisma.transaction.createMany({
      data: txnsToSave,
    });

    await reputationService.calculateReputation(workerId);
    const reputationProfile = await reputationService.getReputationProfile(workerId);

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
      profile: reputationProfile as any,
    };
  }
}

/** Singleton instance */
export const financialService = new FinancialService();
