import { NextResponse } from 'next/server';
import { getDigilockerAuthUrl } from '@/integrations/digilocker/auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/identity/digilocker/callback`;
  const state = "mock_state_123";

  const authUrl = getDigilockerAuthUrl(redirectUri, state);
  
  return NextResponse.redirect(authUrl);
}
