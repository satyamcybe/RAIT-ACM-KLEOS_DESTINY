import { CategorizedTransaction, BehaviouralSignals } from './types';
import { PatternMetrics } from './behaviour-pattern.service';

export class FeatureExtractionService {
  /**
   * Generates behavioural trust signals based on categorized transactions and pattern metrics.
   */
  static extract(
    transactions: CategorizedTransaction[],
    patterns: PatternMetrics
  ): BehaviouralSignals {
    
    const gigTxns = transactions.filter(t => t.category === 'GIG_PAYOUT');
    const refunds = transactions.filter(t => t.category === 'REFUND');

    // Platform Diversity
    const activePlatforms = new Set(gigTxns.map(t => t.platform));
    const platformDiversity = activePlatforms.size;

    // Average Weekly Gig Income
    const totalGigEarnings = gigTxns.reduce((sum, t) => sum + t.amount, 0);
    const avgWeeklyGigIncome = patterns.totalWeeks > 0 
      ? Math.round(totalGigEarnings / patterns.totalWeeks) 
      : 0;

    // Refund Ratio
    const totalRefunds = refunds.reduce((sum, t) => sum + t.amount, 0);
    const refundRatio = totalGigEarnings > 0 
      ? parseFloat((totalRefunds / totalGigEarnings).toFixed(4)) 
      : 0;

    // Monthly Income Stability (Lower Variation = Higher Stability)
    // Group by month
    const monthlyIncome: Record<string, number> = {};
    gigTxns.forEach(t => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      monthlyIncome[key] = (monthlyIncome[key] || 0) + t.amount;
    });

    const monthlyValues = Object.values(monthlyIncome);
    let monthlyIncomeStability = 0;
    
    if (monthlyValues.length > 1) {
      const mean = monthlyValues.reduce((a, b) => a + b, 0) / monthlyValues.length;
      const variance = monthlyValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / monthlyValues.length;
      const stdDev = Math.sqrt(variance);
      
      // Coefficient of Variation
      const cv = mean > 0 ? stdDev / mean : 1; 
      
      // Stability score: 0 CV = 100 stability, 1+ CV = 0 stability
      monthlyIncomeStability = Math.max(0, Math.min(100, Math.round((1 - cv) * 100)));
    } else if (monthlyValues.length === 1) {
      monthlyIncomeStability = 50; // Neutral if only 1 month
    }

    return {
      weeklyConsistency: patterns.weeklyConsistency,
      gigTenureMonths: patterns.gigTenureMonths,
      platformDiversity,
      activityContinuity: patterns.activityContinuity,
      avgWeeklyGigIncome,
      refundRatio,
      monthlyIncomeStability
    };
  }
}
