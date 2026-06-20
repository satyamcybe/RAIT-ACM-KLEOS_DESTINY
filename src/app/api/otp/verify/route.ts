import { NextResponse } from 'next/server';
import { otpStore } from '@/lib/otpStore';

export async function POST(request: Request) {
  try {
    const { mobile, otp } = await request.json();

    if (!mobile || !otp) {
      return NextResponse.json({ error: 'Mobile and OTP are required' }, { status: 400 });
    }

    const storedData = otpStore.get(mobile);

    if (!storedData) {
      return NextResponse.json({ error: 'No OTP requested for this mobile number' }, { status: 400 });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(mobile);
      return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
    }

    if (storedData.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }

    // OTP matched successfully, clear it from memory
    otpStore.delete(mobile);

    return NextResponse.json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 });
  }
}
