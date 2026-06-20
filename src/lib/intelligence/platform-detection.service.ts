import { NormalizedTransaction, PlatformDetectedTransaction } from './types';
import { VectorEngine } from './vector-engine';

const PLATFORM_SIGNATURES: Record<string, string> = {
  ZOMATO: 'zomato private limited food payout',
  SWIGGY: 'swiggy bundl technologies payout',
  RAPIDO: 'rapido roppen transportation payout',
  UBER: 'uber india systems driver',
  OLA: 'ola ani technologies cabs',
  BLINKIT: 'blinkit grofers commerce',
  ZEPTO: 'zepto kiranakart delivery',
  PORTER: 'porter smartshift',
  AMAZON_FLEX: 'amazon flex transportation',
};

const SIMILARITY_THRESHOLD = 0.45; // Tuned for N-gram matching on short strings

export class PlatformDetectionService {
  /**
   * Identifies gig platforms in the transaction narration using
   * Mathematical Vector Embeddings (TF-IDF N-grams & Cosine Similarity)
   * This naturally handles typos, variable account names, and dynamic aliases.
   */
  static detect(transactions: NormalizedTransaction[]): PlatformDetectedTransaction[] {
    return transactions.map(txn => {
      const text = txn.normalizedNarration;
      let bestPlatform = 'UNKNOWN';
      let highestSimilarity = 0;

      for (const [platform, signature] of Object.entries(PLATFORM_SIGNATURES)) {
        // Calculate Cosine Similarity between the incoming narration vector and the platform signature vector
        const similarity = VectorEngine.cosineSimilarity(text, signature);
        
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          if (similarity >= SIMILARITY_THRESHOLD) {
            bestPlatform = platform;
          }
        }
      }

      // Exact substring fallback for very short perfect matches (e.g., just "zomato")
      if (bestPlatform === 'UNKNOWN') {
        for (const [platform, signature] of Object.entries(PLATFORM_SIGNATURES)) {
          const mainKeyword = platform.toLowerCase();
          if (text.includes(mainKeyword)) {
            bestPlatform = platform;
            highestSimilarity = 0.8; // High confidence for exact keyword
            break;
          }
        }
      }

      return {
        ...txn,
        platform: bestPlatform,
        platformConfidence: Math.round(highestSimilarity * 100) // Convert to percentage
      };
    });
  }
}
