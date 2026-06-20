"use client";

import { useState, useEffect } from "react";
import { useMockData } from "@/lib/context/MockDataContext";
import { generateIntelligence } from "@/lib/score-engine";
import { sahamatiTransactions } from "@/lib/sahamati-data";
import { ScoreCalculatorService } from "@/lib/layer4-ssi/score-calculator.service";
import { Layer3Simulation } from "@/components/dashboard/layer3-simulation";
import { ExportCredentialsModal } from "@/components/dashboard/export-credentials-modal";
import { ShieldCheck, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Briefcase, Calendar, Fuel, Utensils, Zap, Coffee, Building2, Fingerprint, Award, CheckCircle2, User, Download } from "lucide-react";

export default function DashboardPage() {
  const { user, identityVerified, bankLinked } = useMockData();
  // We use the 60 transaction Sahamati data for the dashboard tables
  const intelligence = generateIntelligence(sahamatiTransactions as any); 

  const [layer3Signals, setLayer3Signals] = useState<any>(null);
  const [credential, setCredential] = useState<any>(null);
  const [isIssuing, setIsIssuing] = useState(false);

  const calculatedScore = layer3Signals ? ScoreCalculatorService.calculatePramaanScore(layer3Signals) : null;
  const calculatedRisk = calculatedScore !== null ? ScoreCalculatorService.determineRiskCategory(calculatedScore) : null;
  const calculatedGiri = calculatedScore !== null ? calculatedScore / 100 : null;

  const [showSimulation, setShowSimulation] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    // Only run simulation once per session when bank is linked
    if (bankLinked && !sessionStorage.getItem("simulationDone")) {
      setShowSimulation(true);
    }
  }, [bankLinked]);

  useEffect(() => {
    // For demo purposes, we fetch the 12-month mock transaction intelligence
    // so we have authentic Layer 3 signals to feed to Layer 4
    const fetchIntelligence = async () => {
      try {
        const response = await fetch('/api/intelligence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workerId: "mock-worker-123", transactions: sahamatiTransactions })
        });
        const result = await response.json();
        if (result.success) {
          setLayer3Signals(result.data.behaviouralSignals);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (bankLinked && !showSimulation) fetchIntelligence();
  }, [bankLinked, showSimulation]);

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

  if (showSimulation) {
    return (
      <Layer3Simulation 
        onComplete={() => {
          sessionStorage.setItem("simulationDone", "true");
          setShowSimulation(false);
        }} 
      />
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
          {!credential ? (
            <button 
              onClick={issueCredential}
              disabled={isIssuing || !layer3Signals}
              className="flex items-center gap-2 bg-[#0F172A] hover:bg-slate-800 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-sm disabled:opacity-70"
            >
              <Fingerprint className={`w-4 h-4 ${isIssuing ? 'animate-pulse text-emerald-400' : ''}`} />
              {isIssuing ? "Generating Cryptographic SSI..." : "Issue Trust Credential"}
            </button>
          ) : (
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 bg-[#1A6B47] hover:bg-[#0D3D28] text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md animate-in slide-in-from-right-4"
            >
              <Download className="w-4 h-4" />
              Download & Export
            </button>
          )}
        </div>
      </div>

      {/* SSI CREDENTIAL ISSUED BANNER */}
      {credential && (
        <div className="bg-emerald-950 border border-emerald-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in-95 duration-500 relative overflow-hidden mt-6 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
          
          <div className="z-10 flex flex-col items-center">
            <div className="bg-emerald-900/80 p-5 rounded-2xl mb-4 border border-emerald-700">
              <Award className="w-16 h-16 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-black text-white flex items-center gap-2">
              Pramaan Trust Credential Issued <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </h3>
            <p className="text-emerald-300 font-medium mt-2 max-w-lg">
              Your financial behaviour has been cryptographically signed and secured on the Pramaan Network.
            </p>
          </div>

          <div className="z-10 bg-black/40 p-6 rounded-2xl border border-emerald-800/50 w-full max-w-2xl text-left space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Issuer DID</p>
                <p className="text-sm font-mono text-emerald-100">{credential.credential.issuer}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Subject DID</p>
                <p className="text-sm font-mono text-emerald-100">{credential.credential.credentialSubject.id}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-emerald-800/50">
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 flex justify-between">
                <span>Cryptographic Hash (SHA-256)</span>
                <span className="text-emerald-400 font-medium">Valid</span>
              </p>
              <p className="text-xs font-mono text-emerald-200 bg-black/60 p-3 rounded-lg border border-emerald-900/50 break-all">
                {credential.credential.proof.proofValue}
              </p>
            </div>
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
                  {credential ? credential.score : (calculatedScore !== null ? calculatedScore : "--")}
                </span>
                <span className="text-xl font-bold text-slate-500 mb-1">/ 100</span>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700">
              <p className="text-xs text-slate-400 uppercase font-bold tracking-wider text-center">Credit Risk</p>
              <p className={`text-lg font-black text-center ${(credential ? credential.risk : calculatedRisk) === 'LOW' ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {credential ? credential.risk : (calculatedRisk || intelligence.riskCategory)}
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
                <TrendingUp className="w-4 h-4 text-teal-400" /> {credential ? credential.credential.credentialSubject.gigIncomeReliabilityIndex.toFixed(2) : (calculatedGiri !== null ? calculatedGiri.toFixed(2) : "0.84")}
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

      <ExportCredentialsModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)} 
        credential={credential}
        intelligence={intelligence}
      />

    </div>
  );
}
