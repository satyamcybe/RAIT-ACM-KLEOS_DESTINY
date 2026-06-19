import { RawTransaction, NormalizedTransaction } from './types';

export class TransactionPreprocessorService {
  /**
   * Normalizes transaction narration by converting to lowercase,
   * removing special characters, and normalizing spaces.
   */
  static process(transactions: RawTransaction[]): NormalizedTransaction[] {
    return transactions.map(txn => {
      let normalized = txn.narration || '';
      
      // Convert to lowercase
      normalized = normalized.toLowerCase();
      
      // Remove special characters (keep only alphanumeric and spaces)
      normalized = normalized.replace(/[^a-z0-9 ]/g, ' ');
      
      // Normalize multiple spaces to single space
      normalized = normalized.replace(/\s+/g, ' ').trim();
      
      // Standardize common merchant suffixes
      normalized = normalized
        .replace(/\bpvt ltd\b/g, 'private limited')
        .replace(/\bltd\b/g, 'limited')
        .replace(/\binc\b/g, 'incorporated')
        .replace(/\bco\b/g, 'company');

      return {
        ...txn,
        normalizedNarration: normalized
      };
    });
  }
}
