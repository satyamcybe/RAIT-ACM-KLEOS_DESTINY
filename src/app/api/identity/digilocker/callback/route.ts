import { NextResponse } from 'next/server';
import { processIdentityVerification } from '@/features/identity/identity.service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  const redirectUri = `${url.origin}/api/identity/digilocker/callback`;
  const clerkUserId = undefined; 

  if (!code) {
    console.warn("No auth code found, triggering fallback flow directly");
    await processIdentityVerification("dummy_code", redirectUri, clerkUserId);
    return NextResponse.redirect(`${url.origin}/financial-verification`);
  }

  try {
    await processIdentityVerification(code, redirectUri, clerkUserId);
    return NextResponse.redirect(`${url.origin}/financial-verification`);
  } catch (error) {
    console.error("Critical error in callback route:", error);
    return NextResponse.redirect(`${url.origin}/financial-verification`);
  }
}
