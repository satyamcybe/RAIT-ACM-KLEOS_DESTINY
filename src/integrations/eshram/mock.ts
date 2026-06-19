// ===========================================
// PRANAM - eShram Mock Adapter
// Returns simulated eShram data
// ===========================================

import type { EshramAdapter, EshramVerifyResult, EshramWorkerDetails } from "./types";

export class EshramMockAdapter implements EshramAdapter {
  async verifyByUAN(uan: string): Promise<EshramVerifyResult> {
    // TODO: Implement mock eShram verification
    console.log(`[MOCK] eShram: Verifying UAN ${uan}`);
    return {
      success: true,
      verified: true,
      uan,
      workerName: "Rajesh Kumar",
    };
  }

  async fetchWorkerDetails(uan: string): Promise<EshramWorkerDetails> {
    // TODO: Implement mock eShram worker details
    console.log(`[MOCK] eShram: Fetching details for UAN ${uan}`);
    return {
      uan,
      name: "Rajesh Kumar",
      fatherName: "Suresh Kumar",
      dateOfBirth: "1990-05-15",
      gender: "Male",
      occupation: "Construction Worker",
      occupationCode: "01",
      state: "Delhi",
      district: "New Delhi",
      registrationDate: "2022-01-15",
      cardStatus: "active",
    };
  }
}
