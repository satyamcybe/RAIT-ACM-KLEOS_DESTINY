import { NextResponse } from "next/server";
import { FinancialIngestionService } from "@/features/financial/financial-ingestion.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workerId } = body;

    if (!workerId) {
      return NextResponse.json({ error: "workerId is required" }, { status: 400 });
    }

    const ingestionService = new FinancialIngestionService();
    const result = await ingestionService.ingestForWorker(workerId);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[Ingest API Error]", error);
    return NextResponse.json({ error: "Failed to ingest financial data" }, { status: 500 });
  }
}
