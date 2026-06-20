import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function POST() {
  try {
    const userId = await getAuthUserId();
    
    // Delete mock worker from db (cascade deletes all related verification profiles, financial profiles, etc.)
    await prisma.worker.deleteMany({
      where: { clerkUserId: userId }
    });

    return NextResponse.json({ success: true, message: "Demo reset successful" });
  } catch (error: any) {
    console.error("Demo reset error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
