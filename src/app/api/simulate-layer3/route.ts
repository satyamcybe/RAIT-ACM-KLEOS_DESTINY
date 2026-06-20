import { NextResponse } from 'next/server';
import { TransactionPreprocessorService } from '@/lib/intelligence/transaction-preprocessor.service';
import { DataExtractionService } from '@/lib/intelligence/data-extraction.service';
import { PlatformDetectionService } from '@/lib/intelligence/platform-detection.service';
import { TransactionIntentService } from '@/lib/intelligence/transaction-intent.service';
import { RefundReconciliationService } from '@/lib/intelligence/refund-reconciliation.service';
import { RawTransaction } from '@/lib/intelligence/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transactions } = body as { transactions: RawTransaction[] };

    if (!transactions || !Array.isArray(transactions)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const logs: string[] = [];
    logs.push("🚀 PRAMAAN LAYER 3 INTELLIGENCE ENGINE INITIATED");
    logs.push(`Received ${transactions.length} raw transactions from Finvu AA.`);

    // Step 1: Preprocessing
    logs.push("\n[STEP 1] Preprocessing & Normalization...");
    const normalized = TransactionPreprocessorService.preprocess(transactions);
    normalized.forEach(t => {
      logs.push(`- Normalized Txn ${t.txnId}: "${t.narration}" -> "${t.normalizedNarration}"`);
    });

    // Step 2: Data Extraction
    logs.push("\n[STEP 2] Structured Data Extraction (Regex)...");
    const extracted = DataExtractionService.extract(normalized);
    extracted.forEach(t => {
      const { upiId, utrNumber, transactionReference } = t.extractedData || {};
      const found = [upiId, utrNumber, transactionReference].filter(Boolean).join(', ');
      if (found) {
        logs.push(`- Extracted from ${t.txnId}: ${found}`);
      }
    });

    // Step 3: Platform Detection (Vector Engine)
    logs.push("\n[STEP 3] NLP Platform Detection (TF-IDF Vector Embeddings)...");
    const platformDetected = PlatformDetectionService.detect(extracted);
    platformDetected.forEach(t => {
      logs.push(`- Vector Match for ${t.txnId}: Detected [${t.platform}] with ${t.platformConfidence}% Cosine Similarity`);
    });

    // Step 4: Intent Category Base
    logs.push("\n[STEP 4] Base Intent Categorization...");
    const intentDetected = TransactionIntentService.detect(platformDetected);

    // Step 5: Refund Reconciliation (The Edge Case Logic)
    logs.push("\n[STEP 5] Temporal Refund Reconciliation Engine (State Tracking)...");
    const reconciled = RefundReconciliationService.reconcile(intentDetected);
    
    // Log the difference
    reconciled.forEach((t, index) => {
      const originalIntent = intentDetected[index].initialIntent;
      if (originalIntent !== t.initialIntent && t.initialIntent === 'REFUND') {
        logs.push(`🔥 EDGE CASE RESOLVED: Txn ${t.txnId} (Credit) matched with prior Debit. State locked. Categorized as REFUND instead of INCOME.`);
      } else if (t.initialIntent === 'GIG_PAYOUT') {
        logs.push(`✅ Txn ${t.txnId} (Credit) verified as independent GIG_PAYOUT (No matching debits found).`);
      }
    });

    logs.push("\n🏁 LAYER 3 EXECUTION COMPLETE.");

    return NextResponse.json({ success: true, logs, finalTransactions: reconciled });
  } catch (error: any) {
    console.error("Simulation error", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
