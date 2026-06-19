import { NextResponse } from 'next/server';
import { identityService } from '@/features/identity/services/IdentityService';
import { getAuthUserId } from '@/lib/auth/clerk';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get('sessionId') || "mock_session";
  const userId = await getAuthUserId();

  try {
    await identityService.completeDigiLocker(sessionId, {}, userId);
    return NextResponse.redirect(`${url.origin}/onboarding/identity/complete`);
  } catch (error) {
    console.error("Critical error in callback route:", error);
    return NextResponse.redirect(`${url.origin}/financial-verification`);
  }
}
