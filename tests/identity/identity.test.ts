// ===========================================
// PRANAM - Identity Tests
// ===========================================

// TODO: Implement identity verification tests
// - DigiLocker mock adapter returns expected data
// - eShram mock adapter returns expected data
// - IdentityService switches adapters based on MODE
// - API routes return correct responses

import { DigiLockerMockAdapter } from "@/integrations/digilocker/mock";
import { EshramMockAdapter } from "@/integrations/eshram/mock";

describe("Identity - DigiLocker Mock", () => {
  const adapter = new DigiLockerMockAdapter();

  it("should initiate verification", async () => {
    const result = await adapter.initiateVerification("test_user");
    expect(result.sessionId).toBeDefined();
    expect(result.redirectUrl).toBeDefined();
  });

  it("should complete verification", async () => {
    const result = await adapter.completeVerification("session_1", {});
    expect(result.success).toBe(true);
    expect(result.aadhaarName).toBeDefined();
  });
});

describe("Identity - eShram Mock", () => {
  const adapter = new EshramMockAdapter();

  it("should verify UAN", async () => {
    const result = await adapter.verifyByUAN("TEST123");
    expect(result.success).toBe(true);
    expect(result.verified).toBe(true);
  });

  it("should fetch worker details", async () => {
    const result = await adapter.fetchWorkerDetails("TEST123");
    expect(result.uan).toBe("TEST123");
    expect(result.name).toBeDefined();
  });
});
