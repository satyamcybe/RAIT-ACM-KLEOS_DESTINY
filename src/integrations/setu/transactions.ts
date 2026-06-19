// src/integrations/setu/transactions.ts
// Transaction categorization and processing

import type { MockTransaction } from "./fetch";

export interface CategorizedTransactions {
  salary: MockTransaction[];
  rent: MockTransaction[];
  utility: MockTransaction[];
  grocery: MockTransaction[];
  cash: MockTransaction[];
  bonus: MockTransaction[];
  other: MockTransaction[];
}

export function categorizeTransactions(transactions: MockTransaction[]): CategorizedTransactions {
  const categories: CategorizedTransactions = {
    salary: [],
    rent: [],
    utility: [],
    grocery: [],
    cash: [],
    bonus: [],
    other: [],
  };

  for (const txn of transactions) {
    const narration = txn.narration.toUpperCase();
    if (narration.includes("SALARY") || txn.category === "salary") {
      categories.salary.push(txn);
    } else if (narration.includes("RENT") || txn.category === "rent") {
      categories.rent.push(txn);
    } else if (narration.includes("RECHARGE") || narration.includes("ELECTRICITY") || txn.category === "utility") {
      categories.utility.push(txn);
    } else if (narration.includes("GROCERY") || txn.category === "grocery") {
      categories.grocery.push(txn);
    } else if (narration.includes("ATM") || narration.includes("CASH") || txn.category === "cash") {
      categories.cash.push(txn);
    } else if (narration.includes("BONUS") || txn.category === "bonus") {
      categories.bonus.push(txn);
    } else {
      categories.other.push(txn);
    }
  }

  return categories;
}

export function calculateMonthlyIncome(transactions: MockTransaction[]): number {
  const credits = transactions.filter((t) => t.type === "CREDIT");
  const totalCredit = credits.reduce((sum, t) => sum + t.amount, 0);
  
  // Get unique months
  const months = new Set(credits.map((t) => {
    const d = new Date(t.transactionTimestamp);
    return `${d.getFullYear()}-${d.getMonth()}`;
  }));
  
  return months.size > 0 ? Math.round(totalCredit / months.size) : 0;
}

export function calculateMonthlyExpense(transactions: MockTransaction[]): number {
  const debits = transactions.filter((t) => t.type === "DEBIT");
  const totalDebit = debits.reduce((sum, t) => sum + t.amount, 0);
  
  const months = new Set(debits.map((t) => {
    const d = new Date(t.transactionTimestamp);
    return `${d.getFullYear()}-${d.getMonth()}`;
  }));
  
  return months.size > 0 ? Math.round(totalDebit / months.size) : 0;
}

export function calculateSalaryRegularity(salaryTransactions: MockTransaction[]): number {
  // Score 0-1: measures how consistently salary arrives
  if (salaryTransactions.length === 0) return 0;
  if (salaryTransactions.length >= 5) return 0.95;
  if (salaryTransactions.length >= 3) return 0.75;
  return 0.5;
}

export function calculateAverageBalance(transactions: MockTransaction[]): number {
  if (transactions.length === 0) return 0;
  const balances = transactions.filter((t) => t.currentBalance != null).map((t) => t.currentBalance);
  return Math.round(balances.reduce((sum, b) => sum + b, 0) / balances.length);
}
