import { IntentTransaction } from './types';
import { DataExtractionService } from './data-extraction.service';

export class RefundReconciliationService {
  /**
   * Reconciles refunds by matching DEBITs with subsequent CREDITs.
   * Handles edge cases: Multiple debits of same amount via UTR matching or FIFO State Tracking.
   */
  static reconcile(transactions: IntentTransaction[]): IntentTransaction[] {
    // 1. First, extract structured data (UTRs, IDs) for accurate matching
    const extractedTxns = DataExtractionService.extract(transactions);
    
    // Sort transactions chronologically
    const sorted = [...extractedTxns].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Track debits that are available for refund matching (State Tracking)
    // We store them with an 'isConsumed' flag to prevent double-matching
    const pendingDebits = sorted
      .filter(t => t.type === 'DEBIT' && t.platform !== 'UNKNOWN')
      .map(t => ({ ...t, isConsumed: false }));

    return sorted.map(txn => {
      if (txn.type === 'CREDIT' && txn.platform !== 'UNKNOWN' && txn.initialIntent === 'GIG_PAYOUT') {
        const txnDate = new Date(txn.date).getTime();
        const txnRef = txn.extractedData?.transactionReference || txn.extractedData?.utrNumber;

        // Try to find a matching Debit
        const matchingDebitIndex = pendingDebits.findIndex(d => {
          if (d.isConsumed) return false;
          if (d.platform !== txn.platform) return false;

          const dDate = new Date(d.date).getTime();
          const daysDiff = (txnDate - dDate) / (1000 * 60 * 60 * 24);
          if (daysDiff < 0 || daysDiff > 7) return false;

          // MATCHING LOGIC 1: UTR / Reference ID Match (100% Confidence)
          const dRef = d.extractedData?.transactionReference || d.extractedData?.utrNumber;
          if (txnRef && dRef && txnRef === dRef) {
            return true;
          }

          // MATCHING LOGIC 2: Amount & Platform Match (FIFO Fallback)
          if (d.amount === txn.amount) {
            return true;
          }

          return false;
        });

        // If a match is found, or it explicitly says refund/reversal
        if (matchingDebitIndex !== -1 || txn.normalizedNarration.includes('refund') || txn.normalizedNarration.includes('reversal')) {
          
          if (matchingDebitIndex !== -1) {
            // Lock the debit so it can't be used for another refund (FIFO State Tracking)
            pendingDebits[matchingDebitIndex].isConsumed = true;
          }

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
