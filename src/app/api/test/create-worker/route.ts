import { NextResponse } from 'next/server';
import { processIdentityVerification } from '@/features/identity/identity.service';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const redirectUri = `${url.origin}/api/identity/digilocker/callback`;
    
    const workerRecord = await processIdentityVerification("dummy_code_for_test", redirectUri);
    
    return NextResponse.json({
      success: true,
      message: "Mock verified worker created successfully via fallback flow",
      data: workerRecord
    });
  } catch (error: any) {
    console.error("Test Endpoint Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
