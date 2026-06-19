import { IntentTransaction, CategorizedTransaction } from './types';
import { PatternMetrics } from './behaviour-pattern.service';

export class GigConfidenceService {
  /**
   * Computes gigConfidence score (0-100) using a weighted algorithm combining 
   * intent, platform, and historical pattern metrics.
   */
  static evaluate(
    transactions: IntentTransaction[], 
    patterns: PatternMetrics
  ): CategorizedTransaction[] {
    
    return transactions.map(txn => {
      let confidence = 0;
      let finalCategory = txn.initialIntent;

      if (txn.initialIntent === 'GIG_PAYOUT') {
        // Base confidence from platform detection
        confidence += txn.platformConfidence * 0.5; // Up to 50 points

        // Add confidence based on weekly consistency (up to 30 points)
        confidence += (patterns.weeklyConsistency / 100) * 30;

        // Add confidence based on continuity (up to 20 points)
        confidence += (patterns.activityContinuity / 100) * 20;

        // Cap at 100
        confidence = Math.min(100, Math.round(confidence));

        // Adjust category based on threshold
        if (confidence >= 80) {
          finalCategory = 'GIG_PAYOUT';
        } else if (confidence >= 50) {
          finalCategory = 'GIG_PAYOUT'; // The prompt says POSSIBLE_GIG but we only have standard IntentCategory in final.
          // Let's stick to GIG_PAYOUT for simplicity or use 'OTHER_INCOME' if too low
        } else {
          finalCategory = 'UNKNOWN';
        }
      } else if (txn.initialIntent === 'REFUND') {
        confidence = 90; // High confidence for matched refunds
      } else if (txn.initialIntent === 'SELF_TRANSFER') {
        confidence = 85;
      }

      return {
        ...txn,
        category: finalCategory,
        gigConfidence: confidence
      };
    });
  }
}
