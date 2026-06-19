import { NormalizedTransaction, PlatformDetectedTransaction } from './types';

const PLATFORM_DICTIONARY: Record<string, string[]> = {
  ZOMATO: ['zomato', 'zmt food', 'zomato private limited', 'zomato media'],
  SWIGGY: ['swiggy', 'bundl technologies', 'swiggy payout'],
  RAPIDO: ['rapido', 'roppen transportation', 'rapido payout'],
  UBER: ['uber', 'uber india', 'uber systems'],
  OLA: ['ola', 'ani technologies', 'ola cabs'],
  BLINKIT: ['blinkit', 'grofers', 'blink commerce'],
  ZEPTO: ['zepto', 'kiranakart'],
  PORTER: ['porter', 'smartshift'],
  AMAZON_FLEX: ['amazon flex', 'amazon transportation'],
};

export class PlatformDetectionService {
  /**
   * Identifies gig platforms in the transaction narration using
   * dictionary matching and simple substring inclusion.
   */
  static detect(transactions: NormalizedTransaction[]): PlatformDetectedTransaction[] {
    return transactions.map(txn => {
      const text = txn.normalizedNarration;
      let detectedPlatform = 'UNKNOWN';
      let confidence = 0;

      for (const [platform, aliases] of Object.entries(PLATFORM_DICTIONARY)) {
        for (const alias of aliases) {
          if (text.includes(alias)) {
            detectedPlatform = platform;
            
            // Higher confidence for longer/more specific matches
            if (text === alias) {
              confidence = 100;
            } else if (text.startsWith(alias) || text.endsWith(alias)) {
              confidence = 90;
            } else {
              confidence = 80;
            }
            break; // Stop at first alias match for this platform
          }
        }
        if (detectedPlatform !== 'UNKNOWN') break;
      }

      return {
        ...txn,
        platform: detectedPlatform,
        platformConfidence: confidence
      };
    });
  }
}
