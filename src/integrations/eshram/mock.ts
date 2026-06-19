// ===========================================
// PRAMAAN - eShram Mock Adapter
// Returns simulated eShram data
// ===========================================

import type { EshramAdapter, EshramVerifyResult, EshramWorkerDetails } from "./types";

export class EshramMockAdapter implements EshramAdapter {
  async verifyByUAN(uan: string): Promise<EshramVerifyResult> {
    console.log(`[MOCK] eShram: Verifying UAN ${uan}`);
    return {
      success: true,
      verified: true,
      uan,
      workerName: "Raju Kamble",
    };
  }

  async fetchWorkerDetails(uan: string): Promise<EshramWorkerDetails> {
    console.log(`[MOCK] eShram: Fetching details for UAN ${uan}`);
    return {
      uan,
      name: "Raju Kamble",
      fatherName: "Suresh Kamble",
      dateOfBirth: "1998-03-22",
      gender: "Male",
      occupation: "Delivery Partner",
      occupationCode: "01",
      state: "Maharashtra",
      district: "Mumbai",
      registrationDate: "2022-03-14",
      cardStatus: "active",
      platform: "Zomato Technologies Pvt Ltd",
    };
  }
}
