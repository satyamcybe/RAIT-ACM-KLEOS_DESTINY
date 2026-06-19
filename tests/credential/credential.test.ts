// ===========================================
// PRAMAAN - Credential Tests
// ===========================================

// TODO: Implement credential service tests
// - SSI mock adapter issues credentials
// - SSI mock adapter verifies credentials
// - CredentialService lifecycle works

import { SSIMockAdapter } from "@/integrations/ssi/mock";

describe("Credential - SSI Mock", () => {
  const adapter = new SSIMockAdapter();

  it("should issue credential", async () => {
    const result = await adapter.issueCredential({
      subjectDid: "did:PRAMAAN:worker:test",
      credentialType: "PRAMAANIdentityCredential",
      claims: { name: "Test Worker" },
    });
    expect(result.id).toBeDefined();
    expect(result.proof).toBeDefined();
  });

  it("should verify credential", async () => {
    const result = await adapter.verifyCredential("test_vc_id");
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should revoke credential", async () => {
    const result = await adapter.revokeCredential("test_vc_id");
    expect(result).toBe(true);
  });
});
