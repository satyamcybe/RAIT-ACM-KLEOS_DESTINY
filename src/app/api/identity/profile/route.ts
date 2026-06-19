import { NextRequest, NextResponse } from "next/server";
import { getAuthUserId } from "@/lib/auth/clerk";
import { prisma } from "@/lib/database/prisma";

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthUserId();
    const body = await req.json();
    const { profession, platform, city, state } = body;

    const worker = await prisma.worker.findUnique({ where: { clerkUserId: userId } });
    
    if (!worker) {
      return NextResponse.json({ error: "Worker not found" }, { status: 404 });
    }

    const updatedWorker = await prisma.worker.update({
      where: { id: worker.id },
      data: {
        occupation: profession,
        profileComplete: true,
        verificationStatus: "verified",
      },
    });

    return NextResponse.json({
      success: true,
      workerId: updatedWorker.id,
      layer1Complete: true,
      verifiedAt: new Date().toISOString(),
      profile: {
        name: updatedWorker.name,
        sector: updatedWorker.occupation,
        verifications: {
          aadhaar: updatedWorker.aadhaarVerified,
          eshram: updatedWorker.eshramVerified,
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body or update failed" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const userId = await getAuthUserId();
    const worker = await prisma.worker.findUnique({
      where: { clerkUserId: userId },
      include: {
        financialProfile: true,
      }
    });

    if (!worker) {
      return NextResponse.json({
        success: true,
        identityVerified: false,
        bankLinked: false,
      });
    }

    return NextResponse.json({
      success: true,
      identityVerified: worker.aadhaarVerified,
      bankLinked: !!worker.financialProfile,
      name: worker.name,
      dob: worker.dob,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
