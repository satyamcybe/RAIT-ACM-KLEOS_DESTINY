// ===========================================
// PRAMAAN - SSI Mock Adapter
// Simulated SSI operations
// ===========================================

import type {
  SSIAdapter,
  SSIIssueParams,
  SSICredential,
  SSIVerifyResult,
} from "./types";
import { SSI_CONSTANTS } from "./constants";

export class SSIMockAdapter implements SSIAdapter {
  async issueCredential(params: SSIIssueParams): Promise<SSICredential> {
    // TODO: Implement mock credential issuance
    console.log(`[MOCK] SSI: Issuing credential for ${params.subjectDid}`);
    const id = `vc:PRAMAAN:${Date.now()}`;
    return {
      id,
      type: ["VerifiableCredential", params.credentialType],
      issuer: SSI_CONSTANTS.ISSUER_DID,
      issuanceDate: new Date().toISOString(),
      expirationDate: params.expiresAt,
      credentialSubject: {
        id: params.subjectDid,
        ...params.claims,
      },
      proof: {
        type: "Ed25519Signature2020",
        created: new Date().toISOString(),
        proofPurpose: "assertionMethod",
        verificationMethod: `${SSI_CONSTANTS.ISSUER_DID}#key-1`,
        jws: "mock_signature_placeholder",
      },
    };
  }

  async verifyCredential(credentialId: string): Promise<SSIVerifyResult> {
    // TODO: Implement mock credential verification
    console.log(`[MOCK] SSI: Verifying credential ${credentialId}`);
    return {
      valid: true,
      checks: [
        { check: "signature", status: "passed" },
        { check: "expiration", status: "passed" },
        { check: "revocation", status: "passed" },
      ],
      errors: [],
    };
  }

  async revokeCredential(credentialId: string): Promise<boolean> {
    // TODO: Implement mock credential revocation
    console.log(`[MOCK] SSI: Revoking credential ${credentialId}`);
    return true;
  }

  async listCredentials(did: string): Promise<SSICredential[]> {
    // TODO: Implement mock credential listing
    console.log(`[MOCK] SSI: Listing credentials for ${did}`);
    return [];
  }
}
