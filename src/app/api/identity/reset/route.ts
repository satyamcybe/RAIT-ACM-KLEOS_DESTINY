import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { getAuthUserId } from "@/lib/auth/clerk";

export async function POST() {
  try {
    const userId = await getAuthUserId();
    
    // Find mock worker and reset their status in db
    const worker = await prisma.worker.findUnique({ where: { clerkUserId: userId } });
    if (worker) {
      await prisma.worker.update({
        where: { id: worker.id },
        data: {
          aadhaarVerified: false,
          eshramVerified: false,
          profileComplete: false,
          verificationStatus: "pending",
        }
      });
      
      // Delete financial profile if it exists
      await prisma.financialProfile.deleteMany({
        where: { workerId: worker.id }
      });
    }

    return NextResponse.json({ success: true, message: "Demo reset successful" });
  } catch (error: any) {
    console.error("Demo reset error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
