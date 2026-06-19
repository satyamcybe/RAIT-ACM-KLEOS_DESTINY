// src/features/financial/financial-profile.service.ts
// Financial Profile Service: Generates and stores the final financial profile

import { prisma } from "../../lib/database/prisma";
import { analyzeIncome } from "./income-analysis.service";
import type { MockTransaction } from "../../integrations/setu/fetch";

export async function generateFinancialProfile(workerId: string, transactions: MockTransaction[]) {
  console.log("Financial Profile Service: Generating profile for worker", workerId);

  const analysis = analyzeIncome(transactions);

  // Compute reputation score (0-100, higher is better)
  const reputationScore = Math.round(100 - analysis.riskScore);

  const financialProfile = await prisma.financialProfile.upsert({
    where: { workerId },
    update: {
      avgMonthlyIncome: analysis.monthlyIncome,
      avgMonthlyExpense: analysis.monthlyExpense,
      salaryRegularity: analysis.salaryRegularity,
      accountCount: 1,
      riskScore: analysis.riskScore,
      reputationScore,
      signalsJson: analysis.signals as any,
      lastFetchedAt: new Date(),
    },
    create: {
      workerId,
      avgMonthlyIncome: analysis.monthlyIncome,
      avgMonthlyExpense: analysis.monthlyExpense,
      salaryRegularity: analysis.salaryRegularity,
      accountCount: 1,
      riskScore: analysis.riskScore,
      reputationScore,
      signalsJson: analysis.signals as any,
      lastFetchedAt: new Date(),
    },
  });

  console.log("Financial Profile Service: Profile saved with reputation score", reputationScore);

  return {
    profile: financialProfile,
    analysis,
  };
}

export async function getFinancialProfile(workerId: string) {
  return prisma.financialProfile.findUnique({
    where: { workerId },
  });
}
