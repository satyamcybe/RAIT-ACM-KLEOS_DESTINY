// ===========================================
// PRANAM - Mock AA Generator Service
// Layer 2: Simulated Financial Data Generation
// ===========================================

import { v4 as uuidv4 } from "uuid";

export interface MockTransaction {
  transactionId: string;
  date: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  narration: string;
  balance: number;
  category: string;
}

export class MockAAGeneratorService {
  /**
   * Generates a dataset of 120 transactions for a given worker
   * covering the previous 6 months.
   */
  public generateDataset(): MockTransaction[] {
    const transactions: MockTransaction[] = [];
    const now = new Date();

    // We will generate 6 months of data, roughly 180 days.
    // 120 transactions / 180 days = ~0.66 tx/day.

    // Distributions required:
    // 45 Zomato, 15 Swiggy, 5 Rapido = 65 Gig Payouts
    // 55 Normal Transactions

    let currentBalance = 5000; // Starting balance

    const generateDates = (count: number) => {
      const dates = [];
      for (let i = 0; i < count; i++) {
        const daysAgo = Math.floor(Math.random() * 180);
        const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        // Add random hours/minutes
        d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
        dates.push(d);
      }
      return dates.sort((a, b) => a.getTime() - b.getTime()); // oldest first
    };

    const allDates = generateDates(120);

    // Prepare exactly the counts we need
    const pools: { type: "CREDIT" | "DEBIT", narration: string, amount: () => number, category: string }[] = [];

    // 45 Zomato
    for (let i = 0; i < 45; i++) {
      const nar = i % 2 === 0 ? "ZOMATO PRIVATE LIMITED" : (i % 3 === 0 ? "ZOMATO SETTLEMENT" : "ZOMATO PAYOUT WEEKLY");
      pools.push({ type: "CREDIT", narration: nar, amount: () => 1500 + Math.floor(Math.random() * 2000), category: "salary" });
    }
    // 15 Swiggy
    for (let i = 0; i < 15; i++) {
      const nar = i % 2 === 0 ? "SWIGGY PAYOUT" : "SWIGGY DELIVERY INCENTIVE";
      pools.push({ type: "CREDIT", narration: nar, amount: () => 1200 + Math.floor(Math.random() * 1500), category: "salary" });
    }
    // 5 Rapido
    for (let i = 0; i < 5; i++) {
      pools.push({ type: "CREDIT", narration: "RAPIDO DRIVER PAYOUT", amount: () => 800 + Math.floor(Math.random() * 1000), category: "salary" });
    }

    // 55 Normal Transactions
    const normalTemplates = [
      { type: "DEBIT" as const, narration: "DMART PURCHASE", amount: () => 500 + Math.floor(Math.random() * 1500), category: "shopping" },
      { type: "DEBIT" as const, narration: "JIO RECHARGE", amount: () => 299 + Math.floor(Math.random() * 400), category: "recharge" },
      { type: "DEBIT" as const, narration: "ATM WITHDRAWAL", amount: () => 1000 + Math.floor(Math.random() * 4000), category: "withdrawal" },
      { type: "DEBIT" as const, narration: "RENT PAYMENT", amount: () => 5000 + Math.floor(Math.random() * 2000), category: "rent" },
      { type: "DEBIT" as const, narration: "UPI TO FRIEND", amount: () => 100 + Math.floor(Math.random() * 900), category: "upi" },
      { type: "DEBIT" as const, narration: "FUEL STATION PUMP", amount: () => 300 + Math.floor(Math.random() * 700), category: "fuel" },
      { type: "CREDIT" as const, narration: "UPI FROM FRIEND", amount: () => 500 + Math.floor(Math.random() * 1500), category: "upi" },
    ];

    for (let i = 0; i < 55; i++) {
      const template = normalTemplates[Math.floor(Math.random() * normalTemplates.length)];
      pools.push({ type: template.type, narration: template.narration, amount: template.amount, category: template.category });
    }

    // Shuffle the pools to interleave gig payouts and normal transactions
    for (let i = pools.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pools[i], pools[j]] = [pools[j], pools[i]];
    }

    // Assign to dates and calculate balance
    allDates.forEach((date, i) => {
      const p = pools[i];
      const amt = p.amount();

      if (p.type === "CREDIT") {
        currentBalance += amt;
      } else {
        // Prevent negative balances occasionally
        if (currentBalance - amt < 0) {
          currentBalance += (amt + 500); // magically got some cash
        }
        currentBalance -= amt;
      }

      transactions.push({
        transactionId: `txn_${Math.random().toString(36).substring(2, 11)}_${Math.random().toString(36).substring(2, 11)}`,
        date: date.toISOString(),
        amount: amt,
        type: p.type,
        narration: p.narration,
        balance: currentBalance,
        category: p.category
      });
    });

    // Ensure they are ordered oldest first (as naturally created by sorted dates)
    return transactions;
  }
}         
