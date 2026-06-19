import { RawTransaction, Layer3Output } from './types';
import { TransactionPreprocessorService } from './transaction-preprocessor.service';
import { PlatformDetectionService } from './platform-detection.service';
import { TransactionIntentService } from './transaction-intent.service';
import { RefundReconciliationService } from './refund-reconciliation.service';
import { SelfTransferService } from './self-transfer.service';
import { BehaviourPatternService } from './behaviour-pattern.service';
import { GigConfidenceService } from './gig-confidence.service';
import { FeatureExtractionService } from './feature-extraction.service';

export class CategorizationService {
  /**
   * Orchestrates the entire Layer 3 pipeline from Raw FI Data to Behavioural Signals.
   */
  static processAll(rawTransactions: RawTransaction[]): Layer3Output {
    // Step 1: Preprocessing
    const normalized = TransactionPreprocessorService.process(rawTransactions);
    
    // Step 2: Platform Detection
    const platformDetected = PlatformDetectionService.detect(normalized);
    
    // Step 3: Transaction Intent
    const initialIntent = TransactionIntentService.classify(platformDetected);
    
    // Step 4: Refund Reconciliation
    const refundReconciled = RefundReconciliationService.reconcile(initialIntent);
    
    // Step 5: Self Transfer Detection
    const intentResolved = SelfTransferService.detect(refundReconciled);
    
    // Step 6: Behavioural Pattern Engine
    const patterns = BehaviourPatternService.analyze(intentResolved);
    
    // Step 7: Gig Confidence Engine & Final Categorization
    const categorized = GigConfidenceService.evaluate(intentResolved, patterns);
    
    // Step 8: Feature Extraction
    const behaviouralSignals = FeatureExtractionService.extract(categorized, patterns);

    // Prepare Output JSON
    const gigPayoutsDetected = categorized.filter(t => t.category === 'GIG_PAYOUT').length;
    const refundsDetected = categorized.filter(t => t.category === 'REFUND').length;
    const activePlatforms = new Set(categorized.filter(t => t.platform !== 'UNKNOWN').map(t => t.platform));

    return {
      transactionsAnalyzed: categorized.length,
      gigPayoutsDetected,
      refundsDetected,
      platformsDetected: Array.from(activePlatforms),
      behaviouralSignals
    };
  }
}
