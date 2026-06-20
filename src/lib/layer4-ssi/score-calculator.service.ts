import { BehaviouralSignals } from '../intelligence/types';

export class ScoreCalculatorService {
  /**
   * Calculates the final Pramaan Trust Score out of 100
   * based on Layer 3 Behavioural Signals.
   */
  static calculatePramaanScore(signals: BehaviouralSignals): number {
    let score = 0;

    // 1. Weekly Consistency (Weight: 30%)
    // If consistency is 100%, adds 30 points
    score += (signals.weeklyConsistency / 100) * 30;

    // 2. Monthly Income Stability (Weight: 30%)
    // Stability is also 0-100%, 100% being perfectly stable
    score += (signals.monthlyIncomeStability / 100) * 30;

    // 3. Platform Diversity (Weight: 20%)
    // Assuming max diversity benefit at 3+ platforms
    const diversityPoints = Math.min((signals.platformDiversity / 3) * 20, 20);
    score += diversityPoints;

    // 4. Activity Continuity (Weight: 20%)
    // 100% continuity adds 20 points
    score += (signals.activityContinuity / 100) * 20;

    // Optional deductions (like high refund ratio)
    if (signals.refundRatio && signals.refundRatio > 0.2) {
      score -= 15; // Penalty for very high refunds
    }

    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(Math.round(score), 100));

    return score;
  }

  /**
   * Determines the Credit Risk Category based on the out-of-100 score.
   */
  static determineRiskCategory(score: number): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (score >= 75) return 'LOW';
    if (score >= 50) return 'MEDIUM';
    return 'HIGH';
  }
}
