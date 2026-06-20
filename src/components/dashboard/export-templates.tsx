import React from "react";
import { User, Calendar, ShieldCheck } from "lucide-react";

export function TrustCardTemplate({ credential }: { credential: any }) {
  return (
    <div 
      id="trust-card-template" 
      className="absolute top-[-10000px] left-[-10000px] bg-[#FCFDF9] rounded-3xl overflow-hidden shadow-sm"
      style={{ width: '800px', height: '500px', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background Dots/Pattern Mock */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-stone-500/5 rounded-full blur-[80px]" />
      
      {/* Border outline */}
      <div className="absolute inset-0 border-2 border-slate-200/50 rounded-3xl pointer-events-none" />

      {/* Header Logo */}
      <div className="absolute top-8 left-10 flex items-center">
        <span className="text-6xl font-black text-[#2B1014] tracking-tight mr-1" style={{ fontFamily: 'sans-serif' }}>प्र</span>
        <div className="relative">
          <div className="absolute -top-3 left-1 w-3 h-3 bg-[#1A6B47] rounded-full" />
          <span className="text-6xl font-normal text-[#2B1014] tracking-tight">maan</span>
        </div>
      </div>

      <div className="absolute top-28 bottom-8 left-10 right-10 flex items-stretch">
        
        {/* Photo Column */}
        <div className="w-[240px] h-[320px] rounded-2xl overflow-hidden border-2 border-[#2B1014] shrink-0 bg-slate-100 flex items-center justify-center relative mt-6">
          {/* Mock Image of Worker */}
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" 
            alt="Worker" 
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>

        {/* Center Details Column */}
        <div className="flex-1 px-10 pt-10 flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full border-2 border-[#2B1014] flex items-center justify-center shrink-0 text-[#2B1014]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2B1014] uppercase tracking-widest mb-0.5">Worker ID</p>
              <p className="text-2xl font-black text-[#2B1014]">ZM-99214</p>
            </div>
          </div>
          
          <div className="h-px bg-slate-200 w-full" />
          
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full border-2 border-[#2B1014] flex items-center justify-center shrink-0 text-[#2B1014]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2B1014] uppercase tracking-widest mb-0.5">Name</p>
              <p className="text-2xl font-black text-[#2B1014]">Ramesh Kumar</p>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full" />

          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full border-2 border-[#2B1014] flex items-center justify-center shrink-0 text-[#2B1014]">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#2B1014] uppercase tracking-widest mb-0.5">Issue Date</p>
              <p className="text-xl font-bold text-[#2B1014]">16 June 2026</p>
            </div>
          </div>
        </div>

        {/* Right QR & Verification Column */}
        <div className="w-[220px] flex flex-col justify-between items-end pt-2 pb-6">
          <div className="w-[200px] h-[200px] bg-white rounded-2xl border-2 border-[#2B1014] flex items-center justify-center relative overflow-hidden">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=pramaan://ZM-99214`} 
              alt="QR"
              className="w-[180px] h-[180px]"
              crossOrigin="anonymous"
            />
            {/* Center Logo in QR */}
            <div className="absolute w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-3xl font-black text-[#2B1014]">प्र<span className="absolute top-1 right-2 w-1.5 h-1.5 bg-[#1A6B47] rounded-full"/></span>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-auto">
            <ShieldCheck className="w-8 h-8 text-[#2B1014]" strokeWidth={1.5} />
            <div>
              <p className="text-xs text-slate-600 font-medium">Verified by</p>
              <p className="text-sm font-bold text-[#2B1014] leading-tight">E-Shram and Digilocker</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export function GovernmentPdfTemplate({ credential }: { credential: any }) {
  return (
    <div 
      id="gov-pdf-template" 
      className="absolute top-[-10000px] left-[-10000px] bg-white p-12"
      style={{ width: '800px', height: '1130px', fontFamily: 'Inter, sans-serif' }}
    >
      <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-widest">Govt. of India</h1>
        <h2 className="text-xl font-bold text-slate-700 mt-2">Pramaan Trust Credential Report</h2>
        <p className="text-sm text-slate-500 mt-1">Generated under Account Aggregator Framework</p>
      </div>

      <div className="flex justify-between items-start mb-10">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase">Subject Name</p>
          <p className="text-xl font-bold text-slate-900">Ramesh Kumar</p>
          <p className="text-sm text-slate-600 mt-1">Aadhaar: xxxx-xxxx-9821</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-500 uppercase">Credential Issue Date</p>
          <p className="text-lg font-bold text-slate-900">16 June 2026</p>
          <p className="text-sm text-slate-600 mt-1">Worker ID: ZM-99214</p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Financial Behavioural Intelligence (Layer 3)</h3>
        <div className="grid grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Average Monthly Income</p>
            <p className="text-lg font-mono text-slate-900">₹ 24,500.00</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Income Regularity Score</p>
            <p className="text-lg font-mono text-slate-900">84%</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Gig Platforms Mapped</p>
            <p className="text-lg font-mono text-slate-900">Zomato, Swiggy, Rapido</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase">Credit Risk Category</p>
            <p className="text-lg font-mono text-emerald-700">LOW RISK</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg mb-10">
        <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Cryptographic Verification (Layer 4)</h3>
        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Issuer DID</p>
        <p className="text-xs font-mono text-slate-700 break-all mb-4">{credential?.credential?.issuer || "did:pramaan:issuer:12345"}</p>
        
        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Subject DID</p>
        <p className="text-xs font-mono text-slate-700 break-all mb-4">{credential?.credential?.credentialSubject?.id || "did:pramaan:worker:zm99214"}</p>

        <p className="text-xs text-slate-500 font-bold uppercase mb-1">Cryptographic Hash (SHA-256)</p>
        <p className="text-xs font-mono text-slate-700 break-all bg-slate-200 p-3 rounded">{credential?.credential?.proof?.proofValue || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}</p>
      </div>

      <div className="mt-20 pt-8 border-t border-slate-300 text-center text-sm text-slate-500">
        <p>This is a digitally signed document. The verifiable credentials can be authenticated on the Pramaan Network.</p>
        <p className="mt-2 font-mono">pramaan.gov.in / verify</p>
      </div>
    </div>
  );
}
