export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  category: 'INCOME' | 'FOOD' | 'FUEL' | 'UTILITY' | 'TRANSFER' | 'OTHER';
  description: string;
}

export interface IntelligenceReport {
  pramaanScore: number;
  totalIncome: number;
  totalExpense: number;
  expenseRatio: number;
  salaryRegularity: 'HIGH' | 'MEDIUM' | 'LOW';
  topIncomeSources: { source: string; amount: number }[];
  riskCategory: 'LOW' | 'MEDIUM' | 'HIGH';
  transactions: Transaction[];
}

export const rawMockTransactions: Transaction[] = [
  { id: 't1', date: '2023-10-01', amount: 8500, type: 'CREDIT', category: 'INCOME', description: 'NEFT SWIGGY PAYOUT' },
  { id: 't2', date: '2023-10-05', amount: 1200, type: 'DEBIT', category: 'FUEL', description: 'INDIAN OIL CORP' },
  { id: 't3', date: '2023-10-15', amount: 9200, type: 'CREDIT', category: 'INCOME', description: 'NEFT SWIGGY PAYOUT' },
  { id: 't4', date: '2023-10-18', amount: 350, type: 'DEBIT', category: 'FOOD', description: 'ZOMATO ONLINE' },
  { id: 't5', date: '2023-11-01', amount: 8800, type: 'CREDIT', category: 'INCOME', description: 'NEFT SWIGGY PAYOUT' },
  { id: 't6', date: '2023-11-06', amount: 1500, type: 'DEBIT', category: 'FUEL', description: 'BHARAT PETROLEUM' },
  { id: 't7', date: '2023-11-15', amount: 9100, type: 'CREDIT', category: 'INCOME', description: 'NEFT SWIGGY PAYOUT' },
  { id: 't8', date: '2023-11-20', amount: 4500, type: 'DEBIT', category: 'TRANSFER', description: 'UPI TRANSFER TO FAMILY' },
  { id: 't9', date: '2023-12-01', amount: 8600, type: 'CREDIT', category: 'INCOME', description: 'NEFT SWIGGY PAYOUT' },
  { id: 't10', date: '2023-12-08', amount: 1300, type: 'DEBIT', category: 'FUEL', description: 'HPCL PETROL BUNK' },
  { id: 't11', date: '2023-12-15', amount: 9400, type: 'CREDIT', category: 'INCOME', description: 'NEFT SWIGGY PAYOUT' },
  { id: 't12', date: '2023-12-22', amount: 800, type: 'DEBIT', category: 'UTILITY', description: 'JIO RECHARGE' },
];

export function generateIntelligence(transactions: Transaction[]): IntelligenceReport {
  let totalIncome = 0;
  let totalExpense = 0;
  const incomeSources: Record<string, number> = {};

  transactions.forEach(t => {
    if (t.type === 'CREDIT') {
      totalIncome += t.amount;
      const source = t.description.includes('SWIGGY') ? 'Swiggy' : 
                     t.description.includes('ZOMATO') ? 'Zomato' : 
                     t.description.includes('UBER') ? 'Uber' : 'Other Income';
      incomeSources[source] = (incomeSources[source] || 0) + t.amount;
    } else {
      totalExpense += t.amount;
    }
  });

  const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;
  
  // Calculate Pramaan Score (Base 300, Max 900)
  // High income is good, low expense ratio is good
  let score = 300;
  
  // Income component (up to +300 points)
  if (totalIncome > 50000) score += 300;
  else if (totalIncome > 30000) score += 200;
  else if (totalIncome > 15000) score += 100;

  // Expense Ratio component (up to +300 points)
  if (expenseRatio < 30) score += 300;
  else if (expenseRatio < 50) score += 200;
  else if (expenseRatio < 70) score += 100;
  else score -= 50;

  // Cap at 900
  score = Math.min(Math.max(score, 300), 900);

  let riskCategory: 'LOW' | 'MEDIUM' | 'HIGH' = 'HIGH';
  if (score > 750) riskCategory = 'LOW';
  else if (score > 550) riskCategory = 'MEDIUM';

  const topIncomeSources = Object.entries(incomeSources)
    .map(([source, amount]) => ({ source, amount }))
    .sort((a, b) => b.amount - a.amount);

  return {
    pramaanScore: score,
    totalIncome,
    totalExpense,
    expenseRatio: Math.round(expenseRatio),
    salaryRegularity: 'HIGH', // Mocked for hackathon
    topIncomeSources,
    riskCategory,
    transactions
  };
}
