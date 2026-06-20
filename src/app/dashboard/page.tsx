"use client";

import { useState, useEffect } from "react";
import { useMockData } from "@/lib/context/MockDataContext";
import { generateIntelligence, rawMockTransactions } from "@/lib/score-engine";
import { ShieldCheck, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Briefcase, Calendar, Fuel, Utensils, Zap, Coffee, Building2, Fingerprint, Award, CheckCircle2, User } from "lucide-react";

export default function DashboardPage() {
  const { user, identityVerified, bankLinked } = useMockData();
  const intelligence = generateIntelligence(rawMockTransactions); // Keeping this for the transactions table only

  const [layer3Signals, setLayer3Signals] = useState<any>(null);
  const [credential, setCredential] = useState<any>(null);
  const [isIssuing, setIsIssuing] = useState(false);

  useEffect(() => {
    // For demo purposes, we fetch the 12-month mock transaction intelligence
    // so we have authentic Layer 3 signals to feed to Layer 4
    const fetchIntelligence = async () => {
      try {
        const mockTransactions = [
          { txnId: "T1", date: "2024-03-05", amount: 2100, type: "CREDIT", narration: "ZOMATO PRIVATE LIMITED" },
          { txnId: "T2", date: "2024-03-12", amount: 1950, type: "CREDIT", narration: "ZOMATO PVT LTD" },
          { txnId: "T3", date: "2024-03-19", amount: 2200, type: "CREDIT", narration: "ZMT FOOD" },
          { txnId: "T4", date: "2024-03-26", amount: 2050, type: "CREDIT", narration: "ZOMATO MEDIA" },
          { txnId: "T5", date: "2024-04-05", amount: 2500, type: "CREDIT", narration: "BUNDL TECHNOLOGIES" },
          { txnId: "T6", date: "2024-04-12", amount: 2400, type: "CREDIT", narration: "SWIGGY PAYOUT" },
          { txnId: "T7", date: "2024-04-19", amount: 2600, type: "CREDIT", narration: "SWIGGY PAYOUT" },
          { txnId: "T8", date: "2024-04-26", amount: 2700, type: "CREDIT", narration: "SWIGGY PAYOUT" },
          { txnId: "T9", date: "2024-05-05", amount: 1500, type: "CREDIT", narration: "RAPIDO PAYOUT" },
          { txnId: "T10", date: "2024-05-12", amount: 1600, type: "CREDIT", narration: "RAPIDO PAYOUT" },
          { txnId: "T11", date: "2024-05-19", amount: 1400, type: "CREDIT", narration: "RAPIDO PAYOUT" },
          { txnId: "T12", date: "2024-05-26", amount: 1800, type: "CREDIT", narration: "RAPIDO PAYOUT" }
        ];

        const response = await fetch('/api/intelligence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workerId: "mock-worker-123", transactions: mockTransactions })
        });
        const result = await response.json();
        if (result.success) {
          setLayer3Signals(result.data.behaviouralSignals);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (bankLinked) fetchIntelligence();
  }, [bankLinked]);

  const issueCredential = async () => {
    if (!layer3Signals) return;
    setIsIssuing(true);
    try {
      const response = await fetch('/api/issue-credential', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workerId: "mock-worker-123", signals: layer3Signals })
      });
      const result = await response.json();
      if (result.success) {
        setTimeout(() => setCredential(result.data), 1500); // Small delay for UX effect
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsIssuing(false), 1500);
    }
  };

  if (!identityVerified || !bankLinked) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
        <ShieldCheck className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Incomplete</h2>
        <p className="text-gray-500 max-w-sm mb-6">You need to complete Identity and Financial verification before viewing your Pramaan Dashboard.</p>
        <a href="/financial-verification" className="bg-[#1A6B47] text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-[#0D3D28] transition-colors">
          Complete Verification
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pramaan Dashboard</h1>
          <p className="text-gray-500 mt-1">Your Gig Worker Trust & Financial Profile</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex items-center gap-2 bg-[#E8F3ED] px-4 py-2 rounded-full border border-[#1A6B47]/20">
            <ShieldCheck className="w-4 h-4 text-[#1A6B47]" />
            <span className="text-sm font-bold text-[#1A6B47]">Profile Verified</span>
          </div>
          {!credential && (
            <button 
              onClick={issueCredential}
              disabled={isIssuing || !layer3Signals}
              className="flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm disabled:opacity-70"
            >
              <Fingerprint className={`w-4 h-4 ${isIssuing ? 'animate-pulse text-emerald-400' : ''}`} />
              {isIssuing ? "Generating Cryptographic SSI..." : "Issue Trust Credential"}
            </button>
          )}
        </div>
      </div>

      {/* SSI CREDENTIAL ISSUED BANNER */}
      {credential && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Award className="w-8 h-8 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                Verifiable Credential Issued <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </h3>
              <p className="text-xs text-emerald-700 font-medium mt-1">
                Issuer: {credential.credential.issuer} <br/>
                DID: {credential.credential.credentialSubject.id}
              </p>
            </div>
          </div>
          <div className="bg-white/60 p-3 rounded-lg border border-emerald-100 max-w-xs overflow-hidden">
            <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">Cryptographic Hash (SHA-256)</p>
            <p className="text-xs font-mono text-emerald-600 truncate" title={credential.credential.proof.proofValue}>
              {credential.credential.proof.proofValue}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        
        {/* IDENTITY CARD */}
        <div className="col-span-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-[#E8F3ED] border-4 border-white shadow-sm flex items-center justify-center mb-4 z-10 text-[#1A6B47]">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 z-10">{user.name}</h2>
          <p className="text-sm font-semibold text-gray-500 mb-4 z-10 flex items-center justify-center gap-1">
            <Briefcase className="w-3.5 h-3.5" /> {user.occupation}
          </p>
          <div className="w-full space-y-3 text-left mt-2 z-10">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase">Aadhaar</p>
              <p className="text-sm font-mono font-semibold text-slate-900 mt-0.5">{user.aadhaar}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase">DOB</p>
              <p className="text-sm font-semibold text-slate-900 mt-0.5">{user.dob}</p>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl opacity-60"></div>
        </div>

        {/* PRAMAAN SCORE CARD */}
        <div className="col-span-1 md:col-span-2 bg-[#0f172a] rounded-2xl p-8 shadow-lg text-white relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start z-10">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pramaan Trust Score</h3>
              <div className="flex items-end gap-3 mt-2">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  {credential ? credential.score : (layer3Signals ? "84" : "--")}
                </span>
                <span className="text-xl font-bold text-slate-500 mb-1">/ 100</span>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider text-center">Credit Risk</p>
              <p className={`text-lg font-black text-center ${(credential ? credential.risk : intelligence.riskCategory) === 'LOW' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {credential ? credential.risk : intelligence.riskCategory}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 z-10">
            <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-semibold mb-1">Total Verified Income</p>
              <p className="text-lg font-bold text-white flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> ₹{intelligence.totalIncome.toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-semibold mb-1">GIRI Index</p>
              <p className="text-lg font-bold text-white flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-teal-400" /> {credential ? credential.credential.credentialSubject.gigIncomeReliabilityIndex.toFixed(2) : "0.84"}
              </p>
            </div>
            <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-semibold mb-1">Income Regularity</p>
              <p className="text-lg font-bold text-emerald-400">{layer3Signals ? `${layer3Signals.weeklyConsistency}%` : intelligence.salaryRegularity}</p>
            </div>
            <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
              <p className="text-xs text-slate-400 font-semibold mb-1">Top Payer</p>
              <p className="text-lg font-bold text-white">{intelligence.topIncomeSources[0]?.source}</p>
            </div>
          </div>
          
          {/* Abstract background graphics */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* TRANSACTIONS SECTION */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-xs overflow-hidden mt-6">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-gray-400" /> Discovered Transactions
          </h3>
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">Via Finvu AA</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {intelligence.transactions.map((txn) => {
                const isCredit = txn.type === 'CREDIT';
                return (
                  <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(txn.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{txn.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        txn.category === 'INCOME' ? 'bg-emerald-100 text-emerald-700' :
                        txn.category === 'FUEL' ? 'bg-orange-100 text-orange-700' :
                        txn.category === 'FOOD' ? 'bg-rose-100 text-rose-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {txn.category === 'INCOME' && <TrendingUp className="w-3 h-3" />}
                        {txn.category === 'FUEL' && <Fuel className="w-3 h-3" />}
                        {txn.category === 'FOOD' && <Utensils className="w-3 h-3" />}
                        {txn.category === 'UTILITY' && <Zap className="w-3 h-3" />}
                        {txn.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end gap-1 font-bold ${isCredit ? 'text-emerald-600' : 'text-gray-900'}`}>
                        {isCredit ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4 text-gray-400" />}
                        ₹{txn.amount.toLocaleString('en-IN')}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
