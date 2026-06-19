// src/integrations/setu/consent.ts
// Offline Mock Sandbox: Simulated Consent Flow

export async function createConsentRequest(
  accessToken: string,
  mobileNumber: string
) {
  console.log("Offline Mock Sandbox: Creating mock consent request for", mobileNumber);

  const consentHandle = `consent_handle_${Date.now()}`;
  const consentId = `consent_id_${Date.now()}`;

  return {
    consentHandle,
    consentId,
    redirectUrl: `/sandbox/setu/consent?handle=${consentHandle}`,
    status: "PENDING" as const,
  };
}

export async function checkConsentStatus(accessToken: string, consentHandle: string) {
  console.log("Offline Mock Sandbox: Checking consent status for", consentHandle);

  return {
    consentHandle,
    consentId: `consent_id_approved_${Date.now()}`,
    status: "APPROVED" as const,
    approvedAt: new Date().toISOString(),
  };
}
