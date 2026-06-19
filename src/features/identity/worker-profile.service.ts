import { prisma } from '@/lib/database/prisma';

export async function createOrUpdateWorkerProfile(data: {
  clerkUserId?: string;
  digilockerId: string;
  name: string;
  gender?: string;
  dob?: string;
  eshramUan?: string;
  occupation?: string;
  verificationStatus: string;
  verificationSource: string[];
}) {
  const clerkId = data.clerkUserId || `mock-clerk-${data.digilockerId}`;
  
  return await prisma.worker.upsert({
    where: { clerkUserId: clerkId },
    update: {
      name: data.name,
      gender: data.gender,
      dob: data.dob,
      digilockerId: data.digilockerId,
      eshramUan: data.eshramUan,
      occupation: data.occupation,
      verificationStatus: data.verificationStatus,
      verificationSource: data.verificationSource,
      eshramVerified: data.verificationSource.includes('eShram'),
      profileComplete: true,
    },
    create: {
      clerkUserId: clerkId,
      name: data.name,
      gender: data.gender,
      dob: data.dob,
      digilockerId: data.digilockerId,
      eshramUan: data.eshramUan,
      occupation: data.occupation,
      verificationStatus: data.verificationStatus,
      verificationSource: data.verificationSource,
      eshramVerified: data.verificationSource.includes('eShram'),
      profileComplete: true,
    }
  });
}
