// src/integrations/setu/fetch.ts
// Offline Mock Sandbox: Simulated FI Data Fetch

export interface MockAccount {
  accountType: string;
  maskedAccountNumber: string;
  fiType: string;
  summary: {
    currentBalance: number;
    branch: string;
    ifscCode: string;
    openingDate: string;
  };
}

export interface MockTransaction {
  txnId: string;
  amount: number;
  type: "CREDIT" | "DEBIT";
  narration: string;
  transactionTimestamp: string;
  currentBalance: number;
  reference: string;
  category?: string;
}

export async function fetchFIData(accessToken: string, consentId: string) {
  console.log("Offline Mock Sandbox: Fetching mock FI data for consent", consentId);

  const accounts: MockAccount[] = [
    {
      accountType: "SAVINGS",
      maskedAccountNumber: "XXXX4521",
      fiType: "DEPOSIT",
      summary: {
        currentBalance: 32500,
        branch: "Mumbai Andheri West",
        ifscCode: "SBIN0005678",
        openingDate: "2021-03-15",
      },
    },
  ];

  const now = new Date();
  const transactions: MockTransaction[] = [
    // 6 months of salary credits
    {
      txnId: "txn_001",
      amount: 18000,
      type: "CREDIT",
      narration: "SALARY/JAN/2026/SWIGGY",
      transactionTimestamp: new Date(now.getFullYear(), 0, 1).toISOString(),
      currentBalance: 28000,
      reference: "SAL001",
      category: "salary",
    },
    {
      txnId: "txn_002",
      amount: 18000,
      type: "CREDIT",
      narration: "SALARY/FEB/2026/SWIGGY",
      transactionTimestamp: new Date(now.getFullYear(), 1, 1).toISOString(),
      currentBalance: 31000,
      reference: "SAL002",
      category: "salary",
    },
    {
      txnId: "txn_003",
      amount: 18500,
      type: "CREDIT",
      narration: "SALARY/MAR/2026/SWIGGY",
      transactionTimestamp: new Date(now.getFullYear(), 2, 1).toISOString(),
      currentBalance: 35000,
      reference: "SAL003",
      category: "salary",
    },
    {
      txnId: "txn_004",
      amount: 18000,
      type: "CREDIT",
      narration: "SALARY/APR/2026/SWIGGY",
      transactionTimestamp: new Date(now.getFullYear(), 3, 1).toISOString(),
      currentBalance: 29500,
      reference: "SAL004",
      category: "salary",
    },
    {
      txnId: "txn_005",
      amount: 19000,
      type: "CREDIT",
      narration: "SALARY/MAY/2026/SWIGGY",
      transactionTimestamp: new Date(now.getFullYear(), 4, 1).toISOString(),
      currentBalance: 33000,
      reference: "SAL005",
      category: "salary",
    },
    {
      txnId: "txn_006",
      amount: 18500,
      type: "CREDIT",
      narration: "SALARY/JUN/2026/SWIGGY",
      transactionTimestamp: new Date(now.getFullYear(), 5, 1).toISOString(),
      currentBalance: 32500,
      reference: "SAL006",
      category: "salary",
    },
    // UPI payments
    {
      txnId: "txn_007",
      amount: 2500,
      type: "DEBIT",
      narration: "UPI/RENT/LANDLORD",
      transactionTimestamp: new Date(now.getFullYear(), 0, 5).toISOString(),
      currentBalance: 25500,
      reference: "UPI001",
      category: "rent",
    },
    {
      txnId: "txn_008",
      amount: 800,
      type: "DEBIT",
      narration: "UPI/GROCERY/DMART",
      transactionTimestamp: new Date(now.getFullYear(), 0, 10).toISOString(),
      currentBalance: 24700,
      reference: "UPI002",
      category: "grocery",
    },
    {
      txnId: "txn_009",
      amount: 500,
      type: "DEBIT",
      narration: "UPI/RECHARGE/JIO",
      transactionTimestamp: new Date(now.getFullYear(), 1, 15).toISOString(),
      currentBalance: 30500,
      reference: "UPI003",
      category: "utility",
    },
    {
      txnId: "txn_010",
      amount: 3000,
      type: "DEBIT",
      narration: "ATM/CASH/WITHDRAWAL",
      transactionTimestamp: new Date(now.getFullYear(), 2, 20).toISOString(),
      currentBalance: 32000,
      reference: "ATM001",
      category: "cash",
    },
    {
      txnId: "txn_011",
      amount: 1500,
      type: "CREDIT",
      narration: "UPI/BONUS/SWIGGY",
      transactionTimestamp: new Date(now.getFullYear(), 3, 10).toISOString(),
      currentBalance: 31000,
      reference: "BON001",
      category: "bonus",
    },
    {
      txnId: "txn_012",
      amount: 1200,
      type: "DEBIT",
      narration: "UPI/ELECTRICITY/TATA",
      transactionTimestamp: new Date(now.getFullYear(), 4, 5).toISOString(),
      currentBalance: 31800,
      reference: "UPI004",
      category: "utility",
    },
  ];

  return { accounts, transactions };
}
