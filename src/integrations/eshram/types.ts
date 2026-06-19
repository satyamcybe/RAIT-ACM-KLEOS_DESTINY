// ===========================================
// PRAMAAN - eShram Types
// ===========================================

/** eShram adapter interface - implemented by mock & sandbox */
export interface EshramAdapter {
  /** Verify eShram card by UAN */
  verifyByUAN(uan: string): Promise<EshramVerifyResult>;
  /** Fetch worker details by UAN */
  fetchWorkerDetails(uan: string): Promise<EshramWorkerDetails>;
}

export interface EshramVerifyResult {
  success: boolean;
  verified: boolean;
  uan: string;
  workerName: string | null;
  error?: string;
}

export interface EshramWorkerDetails {
  uan: string;
  name: string;
  fatherName: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  occupationCode: string;
  state: string;
  district: string;
  registrationDate: string;
  cardStatus: "active" | "inactive" | "expired";
  platform?: string;
}
