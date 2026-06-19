// ===========================================
// PRAMAAN - Wallet Page
// Verifiable Credentials wallet
// ===========================================

"use client";

import { EmptyState } from "@/components/shared/empty-state";
import { useMockData } from "@/lib/context/MockDataContext";
import { 
  Wallet, 
  ShieldCheck, 
  Building2, 
  Check, 
  Plus, 
  ArrowUpRight 
} from "lucide-react";

export default function WalletPage() {
  const { credentials } = useMockData();

  return (
    <div className="space-y-8 select-none" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Credential Wallet</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your verified digital credentials and identity passports.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 self-start rounded-xl bg-[#1A6B47] hover:bg-[#0D3D28] px-4 py-2.5 text-sm font-bold text-white shadow-xs transition-colors cursor-pointer"
          onClick={() => {
            // TODO: Open issue credential dialog
          }}
        >
          <Plus className="w-4 h-4" />
          <span>Issue Credential</span>
        </button>
      </div>

      {credentials.length === 0 ? (
        <EmptyState
          icon={<Wallet className="w-12 h-12 text-slate-400" />}
          title="No Credentials Yet"
          description="Complete your identity and financial verification to receive your first portable verifiable credentials."
          action={{ label: "Start Verification", href: "/onboarding" }}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {credentials.map((cred) => {
            const isFinancial = cred.type.includes("Financial");
            return (
              <div 
                key={cred.id} 
                className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:shadow-md hover:border-gray-200/80 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Visual indicator corner bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${isFinancial ? 'bg-[#1A6B47]' : 'bg-emerald-600'}`} />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${
                        isFinancial 
                          ? "bg-[#E8F5EF] text-[#1A6B47] border-emerald-100/50" 
                          : "bg-blue-50 text-blue-600 border-blue-100/50"
                      }`}>
                        {isFinancial ? <Building2 className="w-5.5 h-5.5" /> : <ShieldCheck className="w-5.5 h-5.5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-[15px] group-hover:text-[#1A6B47] transition-colors">{cred.type}</h3>
                        <p className="text-[11px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">{cred.issuer}</p>
                      </div>
                    </div>
                    
                    <span className="text-gray-300 group-hover:text-gray-400 transition-colors pt-1">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500">
                  <span className="font-medium">Issued: {cred.date}</span>
                  <span className="bg-[#E8F5EF] text-[#1A6B47] border border-emerald-100/60 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
