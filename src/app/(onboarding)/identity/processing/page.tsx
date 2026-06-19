"use client";

import ProcessingPipeline from "@/components/identity/ProcessingPipeline";

export default function ProcessingPage() {
  return (
    <div className="w-full max-w-[560px] mx-auto pt-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-bold text-2xl text-slate-900 mb-2 flex items-center">
          Verifying your identity
          <span className="inline-flex ml-1 w-6">
            <span className="dot-1">.</span>
            <span className="dot-2">.</span>
            <span className="dot-3">.</span>
          </span>
        </h1>
        <p className="text-sm text-slate-500">
          This usually takes 20–30 seconds. Please stay on this page.
        </p>
      </div>

      {/* Pipeline */}
      <ProcessingPipeline />

      {/* Bottom Note */}
      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          All data is processed securely. Nothing leaves our servers without your consent.
        </p>
      </div>
    </div>
  );
}
