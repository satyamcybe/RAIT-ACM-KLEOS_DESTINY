import { NormalizedTransaction } from './types';

export interface ExtractedData {
  upiId?: string;
  utrNumber?: string;
  merchantId?: string;
  transactionReference?: string;
}

export type ExtractedTransaction<T extends NormalizedTransaction = NormalizedTransaction> = T & {
  extractedData: ExtractedData;
};

export class DataExtractionService {
  /**
   * Extracts highly structured entities (UPI IDs, UTRs, Reference Numbers)
   * from messy unstructured bank narrations using Regex patterns.
   */
  static extract<T extends NormalizedTransaction>(transactions: T[]): ExtractedTransaction<T>[] {
    return transactions.map(txn => {
      const text = txn.narration; // We use raw narration for exact case matching if needed
      
      const extracted: ExtractedData = {};

      // 1. Extract UPI IDs (e.g. name@okhdfcbank, 9876543210@ybl)
      const upiMatch = text.match(/[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/i);
      if (upiMatch) {
        extracted.upiId = upiMatch[0].toLowerCase();
      }

      // 2. Extract UTR / Reference Numbers (Usually 12-16 digit numbers following specific bank prefixes)
      const utrMatch = text.match(/\b(CMS|NEFT|IMPS|RTGS|UPI)[/-]?(\d{10,16})\b/i);
      if (utrMatch) {
        extracted.utrNumber = utrMatch[2];
      }

      // 3. Extract generic 12 digit transaction references common in India
      if (!extracted.utrNumber) {
        const refMatch = text.match(/\b\d{12}\b/);
        if (refMatch) {
          extracted.transactionReference = refMatch[0];
        }
      }

      // 4. Extract Merchant IDs (e.g. MID:123456)
      const midMatch = text.match(/\b(MID|MERCHANT)[-:\s]?([A-Z0-9]{5,15})\b/i);
      if (midMatch) {
        extracted.merchantId = midMatch[2];
      }

      return {
        ...txn,
        extractedData: extracted
      };
    });
  }
}
