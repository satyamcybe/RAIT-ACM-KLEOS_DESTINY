import { exchangeToken } from '@/integrations/digilocker/token';
import { getUserDetails } from '@/integrations/digilocker/user';
import { getIssuedDocuments, findEshramDocument } from '@/integrations/digilocker/documents';
import { downloadDocument } from '@/integrations/digilocker/file-download';
import { parseEshramPdf } from './document-parser.service';
import { createOrUpdateWorkerProfile } from './worker-profile.service';
import { verifyWorkerData } from './verification.service';

export async function processIdentityVerification(code: string, redirectUri: string, clerkUserId?: string) {
  console.log("Offline Mock Sandbox: Executing complete offline verification flow");
  
  // 1. Exchange Token
  const tokenData = await exchangeToken(code, redirectUri);
  
  // 2. Get User Profile
  const digilockerProfile = await getUserDetails(tokenData.access_token);
  
  // 3. Get Issued Documents & Find eShram
  const documents = await getIssuedDocuments(tokenData.access_token);
  const eshramDocInfo = findEshramDocument(documents);
  
  let eshramExtracted = null;
  if (eshramDocInfo && eshramDocInfo.uri) {
    // 4. Download Mock PDF
    const pdfBuffer = await downloadDocument(tokenData.access_token, eshramDocInfo.uri);
    // 5. Parse Mock PDF (which directly returns mock fallback data safely)
    eshramExtracted = await parseEshramPdf(pdfBuffer);
  } else {
    throw new Error("eShram document not found in DigiLocker mock");
  }

  // 6. Verify and Finalize
  const verificationResult = verifyWorkerData(digilockerProfile, eshramExtracted);

  const workerRecord = await createOrUpdateWorkerProfile({
    clerkUserId,
    digilockerId: digilockerProfile.digilockerid,
    name: digilockerProfile.name,
    gender: digilockerProfile.gender,
    dob: digilockerProfile.dob,
    eshramUan: eshramExtracted?.uan,
    occupation: eshramExtracted?.occupation,
    verificationStatus: verificationResult.status,
    verificationSource: verificationResult.sources,
  });

  return workerRecord;
}
