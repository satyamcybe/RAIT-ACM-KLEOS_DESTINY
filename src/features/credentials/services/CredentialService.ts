// ===========================================
// PRANAM - Credential Service
// Manages verifiable credential lifecycle
// ===========================================

import { getMode } from "@/lib/config/env";
import { SSIMockAdapter } from "@/integrations/ssi/mock";
import type { SSIAdapter } from "@/integrations/ssi/types";
import type { CredentialDisplay } from "../types/credential";

/** Factory: get SSI adapter (mock only for now) */
function getSSIAdapter(): SSIAdapter {
  const mode = getMode();
  // SSI is mock-only for hackathon
  void mode;
  return new SSIMockAdapter();
}

export class CredentialService {
  private ssi: SSIAdapter;

  constructor() {
    this.ssi = getSSIAdapter();
  }

  /** Issue a new credential */
  async issueCredential(
    workerId: string,
    type: string,
    claims: Record<string, unknown>
  ) {
    // TODO: Implement credential issuance
    const did = `did:pranam:worker:${workerId}`;
    return this.ssi.issueCredential({
      subjectDid: did,
      credentialType: type,
      claims,
    });
  }

  /** Verify a credential */
  async verifyCredential(credentialId: string) {
    // TODO: Implement credential verification
    return this.ssi.verifyCredential(credentialId);
  }

  /** Get all credentials for a worker */
  async getCredentials(_workerId: string): Promise<CredentialDisplay[]> {
    // TODO: Fetch from database
    return [];
  }
}

export const credentialService = new CredentialService();
