import { sahamatiTransactions } from './src/lib/sahamati-data';
import { TransactionPreprocessorService } from './src/lib/intelligence/transaction-preprocessor.service';
import { DataExtractionService } from './src/lib/intelligence/data-extraction.service';
import { PlatformDetectionService } from './src/lib/intelligence/platform-detection.service';
import { TransactionIntentService } from './src/lib/intelligence/transaction-intent.service';
import { RefundReconciliationService } from './src/lib/intelligence/refund-reconciliation.service';
import { FeatureExtractionService } from './src/lib/intelligence/feature-extraction.service';

async function runBackendSimulation() {
  console.log("=========================================");
  console.log("🧠 PRAMAAN LAYER 3: INTELLIGENCE ENGINE");
  console.log("=========================================\n");

  console.log(`[1] INGESTION: Received ${sahamatiTransactions.length} raw transactions from Account Aggregator (FI Payload).`);
  
  // Step 1: Preprocessing
  console.log(`\n[2] PRE-PROCESSING: Normalizing narrations (removing special characters, lowering case)...`);
  const normalizedTxns = TransactionPreprocessorService.process(sahamatiTransactions as any);

  // Step 2: Data Extraction
  console.log(`\n[3] DATA EXTRACTION: Running Regex pipelines to extract UTRs, UPI IDs, and Reference Numbers...`);
  const extractedTxns = DataExtractionService.extract(normalizedTxns);
  const txnsWithRefs = extractedTxns.filter(t => t.extractedData?.utrNumber || t.extractedData?.transactionReference);
  console.log(`    ↳ Successfully extracted structural data from ${txnsWithRefs.length} transactions.`);

  // Step 3: Platform Detection (Vector Embeddings)
  console.log(`\n[4] NLP LITE & VECTOR EMBEDDINGS: Calculating TF-IDF N-grams and Cosine Similarity against known platform signatures...`);
  const platformTxns = PlatformDetectionService.detect(extractedTxns);
  
  const platformsFound = new Set(platformTxns.filter(t => t.platform !== 'UNKNOWN').map(t => t.platform));
  console.log(`    ↳ High-confidence Platforms detected: ${Array.from(platformsFound).join(', ')}`);

  // Step 4: Base Intent Classification
  console.log(`\n[5] BASE INTENT CLASSIFICATION: Categorizing Credit vs Debit initial intents...`);
  const intentTxns = TransactionIntentService.classify(platformTxns);

  // Step 5: Refund Reconciliation (The Edge Case Solver)
  console.log(`\n[6] TEMPORAL RECONCILIATION: Scanning for Refund vs Payout anomalies using 'isConsumed' FIFO state tracking...`);
  const reconciledTxns = RefundReconciliationService.reconcile(intentTxns);
  
  const refunds = reconciledTxns.filter(t => t.initialIntent === 'REFUND');
  const payouts = reconciledTxns.filter(t => t.initialIntent === 'GIG_PAYOUT');
  
  console.log(`    ↳ Identified ${payouts.length} verified Gig Payouts (Income).`);
  if (refunds.length > 0) {
    console.log(`    ↳ CAUTION: Identified ${refunds.length} Refunds! Mathematical state tracking prevented double-counting as income.`);
  }

  // Step 6: Final Feature Extraction
  console.log(`\n[7] BEHAVIOURAL SIGNALS EXTRACTION: Compiling final data for Layer 4 GIRI Score Calculation...`);
  const mockPatterns = { weeksActive: 10, totalWeeks: 12, weeklyConsistency: 85, gigTenureMonths: 6, activityContinuity: 90 };
  const finalSignals = FeatureExtractionService.extract(reconciledTxns as any, mockPatterns);

  console.log("\n✅ LAYER 3 OUTPUT (Passed to Layer 4):");
  console.log(JSON.stringify(finalSignals, null, 2));
  
  console.log("\n=========================================");
  console.log("🚀 BACKEND SIMULATION COMPLETE");
  console.log("=========================================");
}

runBackendSimulation();
