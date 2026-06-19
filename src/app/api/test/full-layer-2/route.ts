import { NextResponse } from "next/server";
import { FinancialIngestionService } from "@/features/financial/financial-ingestion.service";
import { prisma } from "@/lib/database/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let workerId = searchParams.get("workerId");
    const monthsParam = searchParams.get("months");
    const months = monthsParam ? parseInt(monthsParam, 10) : 12;

    // If no workerId is provided, just pick the first worker in the DB
    if (!workerId) {
      const firstWorker = await prisma.worker.findFirst();
      if (!firstWorker) {
        // Create a dummy worker for testing if none exist
        const newWorker = await prisma.worker.create({
          data: {
            clerkUserId: `test_user_${Date.now()}`,
            name: "Test Worker Layer 2",
            phone: "9999999999"
          }
        });
        workerId = newWorker.id;
      } else {
        workerId = firstWorker.id;
      }
    }

    const ingestionService = new FinancialIngestionService();
    const result = await ingestionService.ingestForWorker(workerId, months);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[Test Layer 2 API Error]", error);
    return NextResponse.json({ error: "Failed to run Layer 2 test" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return GET(req); // support both GET and POST for easy hackathon testing
}
