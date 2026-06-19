// ===========================================
// PRANAM - Clerk Auth Helpers
// Server-side auth utilities
// ===========================================

// TODO: Import and configure Clerk when keys are set
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { clerkMiddleware } from "@clerk/nextjs/server";

import { isMockMode } from "@/lib/config/env";

/** Mock user for development without Clerk */
export interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const MOCK_USER: MockUser = {
  id: "mock_user_001",
  firstName: "Demo",
  lastName: "Worker",
  email: "demo@pranam.dev",
};

/**
 * Get the current authenticated user ID
 * In mock mode, returns a static user ID
 */
export async function getAuthUserId(): Promise<string> {
  if (isMockMode()) {
    return MOCK_USER.id;
  }

  // TODO: Implement real Clerk auth
  // const { userId } = await auth();
  // if (!userId) throw new Error("Unauthorized");
  // return userId;

  return MOCK_USER.id;
}

/**
 * Get current user details
 * In mock mode, returns mock user
 */
export async function getAuthUser(): Promise<MockUser> {
  if (isMockMode()) {
    return MOCK_USER;
  }

  // TODO: Implement real Clerk auth
  // const user = await currentUser();
  // if (!user) throw new Error("Unauthorized");
  // return { id: user.id, firstName: user.firstName, ... };

  return MOCK_USER;
}
