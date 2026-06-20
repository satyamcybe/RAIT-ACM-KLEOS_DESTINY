import { NextResponse } from 'next/server';
import { otpStore } from '@/lib/otpStore';


export async function POST(request: Request) {
  try {
    const { mobile } = await request.json();

    if (!mobile || mobile.length !== 10) {
      return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration

    // Store it
    otpStore.set(mobile, { otp, expiresAt });

    // HACKATHON DEMO LOG: Print securely to terminal
    console.log(`\n\n==========================================`);
    console.log(`📱 SMS SIMULATION FOR: +91 ${mobile}`);
    console.log(`🔐 YOUR PRAMAAN ACCOUNT AGGREGATOR OTP IS: ${otp}`);
    console.log(`==========================================\n\n`);

    // NOTE: If you have a Twilio API key, you can integrate it here:
    // const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    // await client.messages.create({ body: `Your OTP is ${otp}`, from: '+123', to: `+91${mobile}` });

    return NextResponse.json({ success: true, message: 'OTP sent successfully', otp: otp });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}

// Helper export to access the store in verify route
