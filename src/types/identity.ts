export interface DigiLockerUser {
  name: string;
  aadhaarMasked: string;
  dob: string;
  gender: string;
}

export interface DigiLockerDocument {
  id: string;
  name: string;
  type: string;
  issuer: string;
  issuedDate: string;
}

export type ProcessingStepStatus = 'pending' | 'active' | 'complete' | 'failed';

export interface ProcessingStep {
  id: number;
  label: string;
  detail: string;
  status: ProcessingStepStatus;
  completedAt?: Date;
}

export interface EShramVerification {
  uan: string;
  name: string;
  sector: string;
  registrationDate: string;
  status: 'Active' | 'Inactive';
}

export interface WorkerProfile {
  workerId: string;
  name: string;
  sector: string;
  layer1Complete: boolean;
  verifiedAt: string;
  verifications: {
    aadhaar: boolean;
    eshram: boolean;
    uan: boolean;
    digilocker: boolean;
  };
}
