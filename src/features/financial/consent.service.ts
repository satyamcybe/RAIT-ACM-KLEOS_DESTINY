// src/features/financial/consent.service.ts
// Consent Service: Create and manage AA consent requests

import { getSetuAccessToken } from "../../integrations/setu/auth";
import { createConsentRequest, checkConsentStatus } from "../../integrations/setu/consent";
import { prisma } from "../../lib/database/prisma";

export async function createConsent(workerId: string, mobileNumber: string) {
  console.log("Consent Service: Creating consent for worker", workerId);
  
  const accessToken = await getSetuAccessToken();
  const consentResult = await createConsentRequest(accessToken, mobileNumber);

  // Store consent request in DB
  const consentRecord = await prisma.consentRequest.create({
    data: {
      workerId,
      consentHandle: consentResult.consentHandle,
      status: "pending",
      fiTypes: ["DEPOSIT"],
      dateRangeFrom: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      dateRangeTo: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    consentHandle: consentResult.consentHandle,
    redirectUrl: consentResult.redirectUrl,
    consentRequestId: consentRecord.id,
    status: consentResult.status,
  };
}

export async function pollConsentStatus(workerId: string, consentHandle: string) {
  console.log("Consent Service: Polling consent status for", consentHandle);
  
  const accessToken = await getSetuAccessToken();
  const statusResult = await checkConsentStatus(accessToken, consentHandle);

  // Update DB record
  if (statusResult.status === "APPROVED") {
    await prisma.consentRequest.updateMany({
      where: { consentHandle, workerId },
      data: {
        status: "approved",
        approvedAt: new Date(),
      },
    });
  }

  return {
    consentHandle: statusResult.consentHandle,
    consentId: statusResult.consentId,
    status: statusResult.status,
  };
}
