// ===========================================
// PRAMAAN - Worker Types
// ===========================================

export interface Worker {
  id: string;
  clerkUserId: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  aadhaarVerified: boolean;
  eshramId: string | null;
  eshramVerified: boolean;
  profileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkerCreateInput {
  clerkUserId: string;
  name?: string;
  phone?: string;
  email?: string;
}

export interface WorkerUpdateInput {
  name?: string;
  phone?: string;
  email?: string;
  aadhaarVerified?: boolean;
  eshramId?: string;
  eshramVerified?: boolean;
  profileComplete?: boolean;
}

/** Onboarding step tracker */
export type OnboardingStep =
  | "digilocker"
  | "eshram"
  | "profile"
  | "complete";

export interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  worker: Worker | null;
}
