import { PlatformDetectedTransaction, IntentTransaction, IntentCategory } from './types';

export class TransactionIntentService {
  /**
   * Determines the initial intent of a transaction based on direction,
   * platform matching, and simple keyword hints (pre-refund reconciliation).
   */
  static classify(transactions: PlatformDetectedTransaction[]): IntentTransaction[] {
    return transactions.map(txn => {
      let initialIntent: IntentCategory = 'UNKNOWN';
      
      const { type, platform, normalizedNarration } = txn;
      const text = normalizedNarration;

      if (type === 'CREDIT') {
        if (platform !== 'UNKNOWN') {
          // If it's a credit from a known platform, it's likely a payout (or refund, to be checked later)
          if (text.includes('refund') || text.includes('reversal')) {
            initialIntent = 'REFUND';
          } else {
            initialIntent = 'GIG_PAYOUT';
          }
        } else {
          // Credit from an unknown source
          if (text.includes('salary') || text.includes('pay')) {
            initialIntent = 'OTHER_INCOME';
          } else if (text.includes('upi') || text.includes('neft') || text.includes('imps')) {
            // Further self-transfer checks happen later, just broadly categorizing
            initialIntent = 'OTHER_INCOME'; 
          }
        }
      } else if (type === 'DEBIT') {
        if (platform !== 'UNKNOWN') {
          // Debit to a gig platform (e.g., buying food from Zomato, not working for them)
          initialIntent = 'PERSONAL_EXPENSE';
        } else {
          // General debit
          initialIntent = 'PERSONAL_EXPENSE';
        }
      }

      return {
        ...txn,
        initialIntent
      };
    });
  }
}
