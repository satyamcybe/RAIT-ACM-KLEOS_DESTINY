// ===========================================
// PRAMAAN - API Response Helpers
// Standardized API responses
// ===========================================

import { NextResponse } from "next/server";

/** Standard API response shape */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/** Success response */
export function successResponse<T>(data: T, message?: string, status = 200) {
  return NextResponse.json<ApiResponse<T>>(
    { success: true, data, message },
    { status }
  );
}

/** Error response */
export function errorResponse(error: string, status = 400) {
  return NextResponse.json<ApiResponse>(
    { success: false, error },
    { status }
  );
}

/** Not found response */
export function notFoundResponse(resource = "Resource") {
  return errorResponse(`${resource} not found`, 404);
}

/** Unauthorized response */
export function unauthorizedResponse() {
  return errorResponse("Unauthorized", 401);
}

/** Server error response */
export function serverErrorResponse(error?: unknown) {
  const message = error instanceof Error ? error.message : "Internal server error";
  return errorResponse(message, 500);
}
