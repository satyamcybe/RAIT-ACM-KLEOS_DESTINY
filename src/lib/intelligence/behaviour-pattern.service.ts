import { IntentTransaction } from './types';

export interface PatternMetrics {
  weeksActive: number;
  totalWeeks: number;
  gigTenureMonths: number;
  activityContinuity: number;
  weeklyConsistency: number;
}

export class BehaviourPatternService {
  /**
   * Analyzes chronological frequency of gig payouts to establish earning stability signals.
   */
  static analyze(transactions: IntentTransaction[]): PatternMetrics {
    const gigTxns = transactions.filter(t => t.initialIntent === 'GIG_PAYOUT');
    
    if (gigTxns.length === 0) {
      return { weeksActive: 0, totalWeeks: 0, gigTenureMonths: 0, activityContinuity: 0, weeklyConsistency: 0 };
    }

    const timestamps = gigTxns.map(t => new Date(t.date).getTime()).sort((a, b) => a - b);
    const firstTxn = timestamps[0];
    const lastTxn = timestamps[timestamps.length - 1];

    // Calculate tenure
    const msInMonth = 1000 * 60 * 60 * 24 * 30.44;
    const gigTenureMonths = Math.max(1, Math.ceil((lastTxn - firstTxn) / msInMonth));

    // Calculate active weeks
    const activeWeeks = new Set<string>();
    timestamps.forEach(ts => {
      const d = new Date(ts);
      // Generate a string key for the year-week (rough approximation)
      const weekKey = `${d.getFullYear()}-W${Math.ceil(d.getDate() / 7)}`;
      activeWeeks.add(weekKey);
    });

    const msInWeek = 1000 * 60 * 60 * 24 * 7;
    const totalWeeks = Math.max(1, Math.ceil((lastTxn - firstTxn) / msInWeek));
    const weeksActive = activeWeeks.size;
    const weeklyConsistency = Math.min(100, Math.round((weeksActive / totalWeeks) * 100));

    // Calculate Activity Continuity (detect inactivity gaps > 14 days)
    let gapsOver14Days = 0;
    for (let i = 1; i < timestamps.length; i++) {
      const gapDays = (timestamps[i] - timestamps[i-1]) / (1000 * 60 * 60 * 24);
      if (gapDays > 14) {
        gapsOver14Days++;
      }
    }
    
    // Penalize 10% for each gap over 14 days
    const activityContinuity = Math.max(0, 100 - (gapsOver14Days * 10));

    return {
      weeksActive,
      totalWeeks,
      gigTenureMonths,
      activityContinuity,
      weeklyConsistency
    };
  }
}
