"use client";

import { useState, useEffect } from "react";
import { Terminal, Play, FileJson, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_JSON = `[
  {
    "txnId": "T1",
    "date": "2024-06-15T10:00:00Z",
    "amount": 450,
    "type": "DEBIT",
    "narration": "UPI/ZOMATO ONLINE/123456789"
  },
  {
    "txnId": "T2",
    "date": "2024-06-16T12:00:00Z",
    "amount": 450,
    "type": "DEBIT",
    "narration": "UPI/ZOMATO ONLINE/987654321"
  },
  {
    "txnId": "T3",
    "date": "2024-06-17T15:00:00Z",
    "amount": 450,
    "type": "CREDIT",
    "narration": "NEFT/ZOMATO REFUND/123456789"
  },
  {
    "txnId": "T4",
    "date": "2024-06-18T18:00:00Z",
    "amount": 2500,
    "type": "CREDIT",
    "narration": "IMPS/ZOMATO GURGAON PAYOUT/CMS1122"
  }
]`;

export default function SimulatorPage() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);

  // Typing effect for logs
  useEffect(() => {
    if (logs.length > 0 && displayedLogs.length < logs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, logs[prev.length]]);
      }, 300); // 300ms delay per log line for dramatic effect
      return () => clearTimeout(timer);
    } else if (logs.length > 0 && displayedLogs.length === logs.length) {
      setIsSimulating(false);
    }
  }, [logs, displayedLogs]);

  const runEngine = async () => {
    try {
      setIsSimulating(true);
      setLogs([]);
      setDisplayedLogs([]);
      
      const transactions = JSON.parse(jsonInput);
      
      const res = await fetch('/api/simulate-layer3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions })
      });
      
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      } else {
        setLogs([`❌ ERROR: ${data.error}`]);
      }
    } catch (e: any) {
      setLogs([`❌ JSON Parse Error: ${e.message}`]);
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Layer 3: Intelligence Sandbox</h1>
              <p className="text-sm text-slate-500">Test Vector Embeddings and Refund Reconciliation live</p>
            </div>
          </div>
          <button
            onClick={runEngine}
            disabled={isSimulating}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-md font-semibold transition-all disabled:opacity-50"
          >
            {isSimulating ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Play className="w-4 h-4" /> Run AI Engine
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[75vh]">
          
          {/* Left Panel: JSON Editor */}
          <div className="flex flex-col border border-slate-800 rounded-xl bg-slate-900/50 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900">
              <FileJson className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-slate-300">Mock AA Response (JSON)</span>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="flex-1 w-full bg-transparent text-sm font-mono text-blue-300 p-4 outline-none resize-none"
              spellCheck={false}
            />
          </div>

          {/* Right Panel: Terminal Output */}
          <div className="flex flex-col border border-slate-800 rounded-xl bg-slate-950 overflow-hidden relative shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-slate-300">Engine Execution Logs</span>
              {isSimulating && <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            </div>
            
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2">
              {displayedLogs.length === 0 && !isSimulating ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3">
                  <Terminal className="w-12 h-12 opacity-20" />
                  <p>Click "Run AI Engine" to start execution</p>
                </div>
              ) : (
                displayedLogs.map((log, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "animate-in fade-in slide-in-from-bottom-2 duration-300",
                      log.includes("ERROR") && "text-red-400",
                      log.includes("STEP") && "text-blue-400 font-bold mt-4",
                      log.includes("EDGE CASE") && "text-amber-400 font-bold",
                      log.includes("Vector Match") && "text-emerald-400",
                      log.startsWith("-") && "pl-4 text-slate-400",
                      log.includes("🚀") && "text-emerald-300 font-bold text-base"
                    )}
                  >
                    {log}
                  </div>
                ))
              )}
              {isSimulating && (
                <div className="animate-pulse text-emerald-500 pl-4">_</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
