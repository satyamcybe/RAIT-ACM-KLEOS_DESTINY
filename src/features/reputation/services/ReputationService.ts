// ===========================================
// PRAMAAN - Reputation Service
// Calculates reputation scores from signals
// ===========================================

import type { ReputationProfile, ReputationCalculation } from "../types/reputation";
import { prisma } from "@/lib/database/prisma";

export class ReputationService {
  /** Calculate reputation score for a worker */
  async calculateReputation(workerId: string): Promise<ReputationCalculation> {
    const transactions = await prisma.transaction.findMany({
      where: { workerId },
    });

    const platformTxns = transactions.filter(t =>
      t.narration?.includes("ZOMATO") ||
      t.narration?.includes("SWIGGY") ||
      t.narration?.includes("BLINKIT")
    );

    if (platformTxns.length === 0) {
      return { identityScore: 0, financialScore: 0, consistencyScore: 0, totalScore: 0 };
    }

    const firstTxn = platformTxns.reduce((min, t) => t.txnDate < min ? t.txnDate : min, platformTxns[0].txnDate);
    const today = new Date();
    const tenureMonths = Math.max(1, Math.floor((today.getTime() - firstTxn.getTime()) / (1000 * 60 * 60 * 24 * 30)));

    const getWeek = (d: Date) => {
      const date = new Date(d.getTime());
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      const week1 = new Date(date.getFullYear(), 0, 4);
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    };

    const weeksMap = new Map<string, number>();
    for (const t of platformTxns) {
      const yearWeek = `${t.txnDate.getFullYear()}-${getWeek(t.txnDate)}`;
      weeksMap.set(yearWeek, (weeksMap.get(yearWeek) || 0) + t.amount);
    }

    const totalWeeks = Math.max(1, Math.floor((today.getTime() - firstTxn.getTime()) / (1000 * 60 * 60 * 24 * 7)));
    const paidWeeks = weeksMap.size;
    const consistencyScore = Math.min(100, Math.round((paidWeeks / totalWeeks) * 100));

    const weeklyAmounts = Array.from(weeksMap.values());
    const avgWeekly = weeklyAmounts.length > 0 ? weeklyAmounts.reduce((a, b) => a + b, 0) / weeklyAmounts.length : 0;
    const avgMonthly = avgWeekly * 4.33;

    const sortedWeekly = Array.from(weeksMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(e => e[1]);
    
    let trend = "stable";
    if (sortedWeekly.length >= 16) {
      const recentAvg = sortedWeekly.slice(-8).reduce((a, b) => a + b, 0) / 8;
      const earlierAvg = sortedWeekly.slice(0, 8).reduce((a, b) => a + b, 0) / 8;
      trend = recentAvg > earlierAvg ? "growing" : "stable";
    }

    const totalEarnings = platformTxns.reduce((sum, t) => sum + t.amount, 0);
    const estLow = Math.floor(totalEarnings / 60);
    const estHigh = Math.floor(totalEarnings / 40);

    const consistencyPoints = consistencyScore * 4;
    const tenurePoints = (Math.min(tenureMonths, 36) / 36) * 300;
    const incomePoints = (Math.min(avgMonthly, 25000) / 25000) * 300;
    const pramanScore = Math.round(consistencyPoints + tenurePoints + incomePoints);

    const signalsJson = {
      tenureMonths,
      consistencyPct: consistencyScore,
      avgWeeklyIncome: avgWeekly,
      incomeTrend: trend,
      estDeliveriesRange: `${estLow}-${estHigh}`,
      platformDetected: "Zomato Technologies",
      dataSource: "AA Bank Statement (Setu Sandbox)",
      isVerifiedFact: true,
      ratingNote: "Not available - pending zkTLS integration"
    };

    await prisma.financialProfile.upsert({
      where: { workerId },
      update: {
        avgMonthlyIncome: avgMonthly,
        salaryRegularity: consistencyScore / 100,
        reputationScore: pramanScore / 10,
        lastFetchedAt: new Date(),
        signalsJson,
      },
      create: {
        workerId,
        avgMonthlyIncome: avgMonthly,
        salaryRegularity: consistencyScore / 100,
        reputationScore: pramanScore / 10,
        lastFetchedAt: new Date(),
        signalsJson,
      },
    });

    return {
      identityScore: 100,
      financialScore: pramanScore,
      consistencyScore: consistencyScore,
      totalScore: pramanScore,
    };
  }

  /** Get reputation profile */
  async getReputationProfile(workerId: string): Promise<ReputationProfile | null> {
    const profile = await prisma.financialProfile.findUnique({
      where: { workerId },
    });
    
    if (!profile) return null;

    const score = (profile.reputationScore || 0) * 10;
    let category: "excellent" | "good" | "fair" | "poor" = "poor";
    if (score >= 800) category = "excellent";
    else if (score >= 600) category = "good";
    else if (score >= 400) category = "fair";

    return {
      ...profile,
      workerId,
      overallScore: score,
      category,
      signals: [],
      lastCalculatedAt: profile.lastFetchedAt?.toISOString() || null,
    } as any;
  }
}

export const reputationService = new ReputationService();
