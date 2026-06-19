// ===========================================
// PRAMAAN - Settings Page
// User settings and preferences
// ===========================================

"use client";

import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Download, 
  Info,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 select-none" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account preferences, connected credentials, and privacy consents.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 items-start">
        
        {/* Profile Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] text-[#1A6B47] flex items-center justify-center border border-emerald-100/50">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Profile Details</h2>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">Raju Kumar</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#1A6B47] hover:text-[#0D3D28] cursor-pointer">
                Edit
              </button>
            </div>

            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">+91 98765 43210</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#1A6B47] hover:text-[#0D3D28] cursor-pointer">
                Edit
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">raju.kumar@pranam.dev</p>
                </div>
              </div>
              <button className="text-xs font-bold text-[#1A6B47] hover:text-[#0D3D28] cursor-pointer">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/50">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-gray-900">Privacy & Data Consents</h2>
          </div>

          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Active Consents</p>
                  <p className="text-xs text-gray-400 mt-0.5">Revoke or update bank account consents</p>
                </div>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                Manage
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-semibold text-gray-800">Export Reputation Pass</p>
                  <p className="text-xs text-gray-400 mt-0.5">Download a signed cryptographically-secure PDF</p>
                </div>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                Export
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* App info */}
      <div className="rounded-xl bg-slate-50 border border-slate-100/60 p-4 text-center flex items-center justify-center gap-2 max-w-sm mx-auto">
        <Info className="w-4 h-4 text-slate-400" />
        <p className="text-xs text-slate-500 font-semibold">
          Pranam v0.1.0 · Hackathon Presentation Mode
        </p>
      </div>

    </div>
  );
}
