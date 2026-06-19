// ===========================================
// PRANAM - Financial Ingestion Service
// Layer 2: Simulated AA Data Ingestion Workflow
// ===========================================

import { prisma } from "@/lib/database/prisma";
import { MockAAGeneratorService } from "./mock-aa-generator.service";

export class FinancialIngestionService {
  private generator = new MockAAGeneratorService();

  /**
   * Generates a mock dataset, stores it for the worker, and returns a summary.
   */
  public async ingestForWorker(workerId: string, months: number = 12) {
    console.log(`[Layer 2] Starting ingestion for worker ${workerId} for last ${months} months`);

    // 1. Generate Mock Dataset (covers 6-12 months naturally)
    let mockData = this.generator.generateDataset();
    
    // Filter by months
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - months);
    mockData = mockData.filter(txn => new Date(txn.date) >= cutoffDate);

    // 2. Prepare for Prisma
    const prismaTransactions = mockData.map(txn => ({
      workerId,
      accountType: "savings", // Default for simulated AA
      amount: txn.amount,
      type: txn.type.toLowerCase(), // Prisma might expect 'credit' | 'debit' or any string, we map to lowercase convention often used
      narration: txn.narration,
      txnDate: new Date(txn.date),
      balance: txn.balance,
      category: txn.category,
    }));

    // 3. Store Transactions (Delete existing for this worker first to be idempotent, optional but good for hackathon testing)
    await prisma.transaction.deleteMany({
      where: { workerId }
    });

    const result = await prisma.transaction.createMany({
      data: prismaTransactions
    });

    console.log(`[Layer 2] Stored ${result.count} transactions for worker ${workerId}`);

    // Calculate Summary metrics
    const totalTransactions = result.count;
    let gigTransactions = 0;
    let normalTransactions = 0;

    const gigNarrations = ["ZOMATO", "SWIGGY", "RAPIDO"];
    
    mockData.forEach(txn => {
      const isGig = gigNarrations.some(gig => txn.narration.includes(gig));
      if (isGig) {
        gigTransactions++;
      } else {
        normalTransactions++;
      }
    });

    return {
      workerId,
      totalTransactions,
      gigTransactions,
      normalTransactions,
      status: "completed"
    };
  }
}
