import { IntentTransaction } from './types';

export class SelfTransferService {
  /**
   * Detects self-transfers (user moving money between their own accounts)
   * based on narration hints (e.g., 'to self', 'own account').
   */
  static detect(transactions: IntentTransaction[]): IntentTransaction[] {
    return transactions.map(txn => {
      if (txn.type === 'CREDIT' && txn.initialIntent === 'OTHER_INCOME') {
        const text = txn.normalizedNarration;
        
        const selfTransferKeywords = [
          'to self',
          'own account',
          'self transfer',
          'transfer to own',
          'sweep in'
        ];

        const isSelfTransfer = selfTransferKeywords.some(kw => text.includes(kw));

        if (isSelfTransfer) {
          return {
            ...txn,
            initialIntent: 'SELF_TRANSFER'
          };
        }
      }
      return txn;
    });
  }
}
