"use client";

import { useState } from "react";
import { Download, FileText, Share2, CreditCard, X, ChevronRight, CheckCircle2 } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  credential: any;
}

export function ExportCredentialsModal({ isOpen, onClose, credential }: ExportModalProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = (type: string) => {
    setDownloading(type);
    // Simulate API call or PDF generation delay
    setTimeout(() => {
      setDownloading(null);
      setSuccess(type);
      setTimeout(() => setSuccess(null), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="p-6 pb-0 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Export Credentials</h2>
            <p className="text-sm text-slate-500 mt-1">Select an format to share your Trust Profile</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-3">
          {/* Option 1: PDF */}
          <button 
            onClick={() => handleExport('pdf')}
            disabled={!!downloading}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-[#1A6B47] hover:bg-[#E8F3ED]/50 transition-all group disabled:opacity-50 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-red-50 text-red-600 p-3 rounded-xl group-hover:bg-red-100 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Bank Loan PDF</p>
                <p className="text-xs text-slate-500">Detailed report for underwriting</p>
              </div>
            </div>
            {success === 'pdf' ? <CheckCircle2 className="w-5 h-5 text-[#1A6B47]" /> : downloading === 'pdf' ? <div className="w-5 h-5 border-2 border-[#1A6B47] border-t-transparent rounded-full animate-spin" /> : <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1A6B47] transition-colors" />}
          </button>

          {/* Option 2: Shareable Link */}
          <button 
            onClick={() => handleExport('link')}
            disabled={!!downloading}
            className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-[#1A6B47] hover:bg-[#E8F3ED]/50 transition-all group disabled:opacity-50 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                <Share2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Landlord Summary</p>
                <p className="text-xs text-slate-500">Shareable secure web link</p>
              </div>
            </div>
            {success === 'link' ? <CheckCircle2 className="w-5 h-5 text-[#1A6B47]" /> : downloading === 'link' ? <div className="w-5 h-5 border-2 border-[#1A6B47] border-t-transparent rounded-full animate-spin" /> : <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#1A6B47] transition-colors" />}
          </button>

          {/* Option 3: Credential Card */}
          <button 
            onClick={() => handleExport('card')}
            disabled={!!downloading}
            className="w-full flex items-center justify-between p-4 rounded-2xl border-emerald-500/30 bg-emerald-50 hover:bg-emerald-100 transition-all group disabled:opacity-50 text-left overflow-hidden relative"
          >
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-emerald-600 text-white p-3 rounded-xl shadow-md shadow-emerald-500/20">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-emerald-900">Pramaan Trust Card</p>
                <p className="text-xs text-emerald-700">Download Verifiable Digital ID Card</p>
              </div>
            </div>
            {success === 'card' ? <CheckCircle2 className="w-5 h-5 text-[#1A6B47] relative z-10" /> : downloading === 'card' ? <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin relative z-10" /> : <Download className="w-5 h-5 text-emerald-600 relative z-10" />}
          </button>
        </div>
      </div>
    </div>
  );
}
