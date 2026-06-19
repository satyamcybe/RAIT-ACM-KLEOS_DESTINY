"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProcessingStep as ProcessingStepType } from "@/types/identity";
import ProcessingStep from "./ProcessingStep";

const initialSteps: ProcessingStepType[] = [
  { id: 1, label: "Fetching your DigiLocker profile", detail: "", status: 'pending' },
  { id: 2, label: "Retrieving your document list", detail: "", status: 'pending' },
  { id: 3, label: "Looking for eShram registration", detail: "", status: 'pending' },
  { id: 4, label: "Downloading eShram certificate", detail: "", status: 'pending' },
  { id: 5, label: "Extracting UAN from certificate", detail: "", status: 'pending' },
  { id: 6, label: "Verifying with eShram database", detail: "", status: 'pending' },
  { id: 7, label: "Cross-validating DigiLocker + eShram", detail: "", status: 'pending' },
  { id: 8, label: "Building your worker profile", detail: "", status: 'pending' },
];

const delays = [1200, 800, 1000, 1500, 900, 1300, 1100, 700];

const getDetail = (index: number): string => {
  switch (index) {
    case 0: return "Raju Kumar · Aadhaar ****1234 · DOB 15 Aug 1992";
    case 1: return "6 documents found in your DigiLocker";
    case 2: return "eShram card found · UAN pending extraction";
    case 3: return "PDF downloaded · 2.3 KB";
    case 4: return "UAN: 10-****-1234-5678 extracted";
    case 5: return "Verified · Registration active · Sector: Transport";
    case 6: return "Name match ✓ · DOB match ✓ · Photo match ✓";
    case 7: return "Profile generated · Layer 1 complete";
    default: return "";
  }
};

export default function ProcessingPipeline() {
  const [steps, setSteps] = useState<ProcessingStepType[]>(initialSteps);
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;

    const runPipeline = async () => {
      for (let i = 0; i < steps.length; i++) {
        if (isCancelled) return;

        // Set current step to active
        setSteps(prev => prev.map((s, idx) =>
          idx === i ? { ...s, status: 'active' } : s
        ));

        // MOCK: wait for simulated delay
        await new Promise(resolve => setTimeout(resolve, delays[i]));

        if (isCancelled) return;

        // Set step to complete and show detail
        setSteps(prev => prev.map((s, idx) =>
          idx === i ? { ...s, status: 'complete', detail: getDetail(i) } : s
        ));
      }

      if (!isCancelled) {
        // Wait briefly after all steps complete, then redirect
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push('/identity/complete');
      }
    };

    runPipeline();

    return () => {
      isCancelled = true;
    };
  }, [router]);

  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <ProcessingStep key={step.id} step={step} />
      ))}
    </div>
  );
}
