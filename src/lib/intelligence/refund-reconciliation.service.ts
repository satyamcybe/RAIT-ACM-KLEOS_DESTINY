import { IntentTransaction } from './types';

export class RefundReconciliationService {
  /**
   * Reconciles refunds by matching DEBITs with subsequent CREDITs 
   * of the exact same amount to the same platform within 7 days.
   */
  static reconcile(transactions: IntentTransaction[]): IntentTransaction[] {
    // Sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Track debits to match against
    const debits = sorted.filter(t => t.type === 'DEBIT' && t.platform !== 'UNKNOWN');

    return sorted.map(txn => {
      if (txn.type === 'CREDIT' && txn.platform !== 'UNKNOWN' && txn.initialIntent === 'GIG_PAYOUT') {
        // Is there a matching debit within the last 7 days?
        const txnDate = new Date(txn.date).getTime();
        const matchingDebit = debits.find(d => {
          const dDate = new Date(d.date).getTime();
          const daysDiff = (txnDate - dDate) / (1000 * 60 * 60 * 24);
          
          return d.platform === txn.platform && 
                 d.amount === txn.amount && 
                 daysDiff >= 0 && daysDiff <= 7;
        });

        if (matchingDebit || txn.normalizedNarration.includes('refund') || txn.normalizedNarration.includes('reversal')) {
          return {
            ...txn,
            initialIntent: 'REFUND'
          };
        }
      }
      return txn;
    });
  }
}
