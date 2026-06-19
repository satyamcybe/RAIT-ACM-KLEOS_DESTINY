// ===========================================
// PRANAM - Profile Completion Page
// Step 3: Complete worker profile
// ===========================================

"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    occupation: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
          <span className="text-2xl">📝</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Complete Your Profile
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in your details to complete the onboarding process
        </p>
      </div>

      {/* Profile form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your full name"
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="profile-phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="profile-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="profile-email" className="block text-sm font-medium text-gray-700">
              Email (optional)
            </label>
            <input
              id="profile-email"
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your@email.com"
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="profile-occupation" className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <select
              id="profile-occupation"
              value={form.occupation}
              onChange={(e) => updateField("occupation", e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Select your occupation</option>
              <option value="construction">Construction Worker</option>
              <option value="domestic">Domestic Worker</option>
              <option value="vendor">Street Vendor</option>
              <option value="agriculture">Agricultural Worker</option>
              <option value="factory">Factory Worker</option>
              <option value="delivery">Delivery Partner</option>
              <option value="driver">Driver</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            onClick={() => {
              // TODO: Save profile and navigate
              window.location.href = "/onboarding/profile/success";
            }}
            disabled={!form.name || !form.phone}
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
}
