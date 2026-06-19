import { prisma } from './lib/database/prisma';
import { createConsent, pollConsentStatus } from './features/financial/consent.service';
import { fetchAndStoreFinancialData } from './features/financial/fetch.service';
import { generateFinancialProfile } from './features/financial/financial-profile.service';

async function run() {
  try {
    // 1. Find existing verified worker
    const worker = await prisma.worker.findFirst({
      where: { verificationStatus: "Verified" },
    });
    if (!worker) { console.error("No verified worker found"); return; }
    console.log("Using worker:", worker.id, worker.name);

    // 2. Create Consent
    const consent = await createConsent(worker.id, "9999999999");
    console.log("Consent created:", consent.consentHandle);

    // 3. Poll Consent Status
    const status = await pollConsentStatus(worker.id, consent.consentHandle);
    console.log("Consent status:", status.status);

    // 4. Fetch FI Data
    const fetchResult = await fetchAndStoreFinancialData(worker.id, status.consentId!);
    console.log("Transactions stored:", fetchResult.transactionsStored);

    // 5. Generate Financial Profile
    const profileResult = await generateFinancialProfile(worker.id, fetchResult.transactions);
    console.log("\n=== FINANCIAL PROFILE ===");
    console.log(JSON.stringify(profileResult, null, 2));
  } catch (e) {
    console.error("FAIL:", e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
