// ===========================================
// PRANAM - Database Seed Script
// Run: npx prisma db seed
// ===========================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // TODO: Add seed data for development/demo
  // Create sample workers
  const worker = await prisma.worker.upsert({
    where: { clerkUserId: "seed_user_001" },
    update: {},
    create: {
      clerkUserId: "seed_user_001",
      name: "Demo Worker",
      phone: "+919876543210",
      email: "demo@pranam.dev",
      aadhaarVerified: true,
      eshramId: "ESHRAM001",
      eshramVerified: true,
      profileComplete: true,
    },
  });

  // Create verification profile
  await prisma.verificationProfile.upsert({
    where: { workerId: worker.id },
    update: {},
    create: {
      workerId: worker.id,
      verificationScore: 85,
      status: "verified",
      digilockerData: { aadhaarName: "Demo Worker", dob: "1990-01-01" },
      eshramData: { uan: "ESHRAM001", occupation: "Construction Worker" },
    },
  });

  // Create financial profile
  await prisma.financialProfile.upsert({
    where: { workerId: worker.id },
    update: {},
    create: {
      workerId: worker.id,
      avgMonthlyIncome: 15000,
      avgMonthlyExpense: 10000,
      salaryRegularity: 0.75,
      accountCount: 1,
      riskScore: 35,
      reputationScore: 72,
    },
  });

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
