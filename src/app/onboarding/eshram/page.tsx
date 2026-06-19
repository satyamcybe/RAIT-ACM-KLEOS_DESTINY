// ===========================================
// PRANAM - eShram Verification Page
// Step 2: eShram card verification
// ===========================================

"use client";

import Link from "next/link";
import { useState } from "react";

export default function EshramPage() {
  const [uan, setUan] = useState("");

  // TODO: Implement eShram verification with useIdentity hook

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/onboarding"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to steps
        </Link>
      </div>

      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-2xl">👷</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Verify eShram Card
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter your eShram UAN to verify your worker registration
        </p>
      </div>

      {/* UAN input */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-800">
              🔒 Running in Mock Mode
            </p>
            <p className="mt-1 text-xs text-blue-600">
              eShram verification is simulated. Any UAN will be accepted.
            </p>
          </div>

          <div>
            <label
              htmlFor="uan-input"
              className="block text-sm font-medium text-gray-700"
            >
              eShram UAN Number
            </label>
            <input
              id="uan-input"
              type="text"
              value={uan}
              onChange={(e) => setUan(e.target.value)}
              placeholder="Enter your 12-digit UAN"
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => {
              // TODO: Call verifyEshram(uan)
              window.location.href = "/onboarding/profile";
            }}
            disabled={!uan.trim()}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Verify eShram Card
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/onboarding/profile"
          className="text-sm text-gray-500 hover:text-emerald-600"
        >
          Skip for now →
        </Link>
      </div>
    </div>
  );
}
