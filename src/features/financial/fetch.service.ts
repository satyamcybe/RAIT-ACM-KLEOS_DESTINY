// src/features/financial/fetch.service.ts
// FI Fetch Service: Fetches financial data and stores transactions

import { getSetuAccessToken } from "../../integrations/setu/auth";
import { fetchFIData } from "../../integrations/setu/fetch";
import { prisma } from "../../lib/database/prisma";

export async function fetchAndStoreFinancialData(workerId: string, consentId: string) {
  console.log("FI Fetch Service: Fetching financial data for worker", workerId);
  
  const accessToken = await getSetuAccessToken();
  const fiData = await fetchFIData(accessToken, consentId);

  // Store transactions in DB
  const transactionRecords = await Promise.all(
    fiData.transactions.map((txn) =>
      prisma.transaction.create({
        data: {
          workerId,
          accountType: "savings",
          amount: txn.amount,
          type: txn.type === "CREDIT" ? "credit" : "debit",
          narration: txn.narration,
          txnDate: new Date(txn.transactionTimestamp),
          balance: txn.currentBalance,
          category: txn.category || null,
        },
      })
    )
  );

  console.log(`FI Fetch Service: Stored ${transactionRecords.length} transactions`);

  return {
    accounts: fiData.accounts,
    transactionsStored: transactionRecords.length,
    transactions: fiData.transactions,
  };
}
