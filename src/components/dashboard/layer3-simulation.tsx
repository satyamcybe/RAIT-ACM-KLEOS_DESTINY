"use client";

import { useEffect, useState } from "react";
import { Cpu, Terminal, Database, ShieldCheck, Activity, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Layer3SimulationProps {
  onComplete: () => void;
}

type SimulationStep = {
  id: string;
  label: string;
  icon: any;
  duration: number;
};

const SIMULATION_STEPS: SimulationStep[] = [
  { id: "init", label: "Initializing Pramaan AI Engine...", icon: Cpu, duration: 1000 },
  { id: "fetch", label: "Connecting to Finvu AA... Fetching 120 raw transactions.", icon: Database, duration: 1500 },
  { id: "nlp", label: "Running NLP Normalization... Detected 'Zomato', 'Swiggy', 'Rapido'.", icon: Terminal, duration: 2000 },
  { id: "fraud", label: "Filtering noise... Reconciling Refunds (Ratio: 0.05). Ignoring Self-Transfers.", icon: ShieldCheck, duration: 1500 },
  { id: "metrics", label: "Extracting Behavioural Metrics: Weekly Consistency (84%), Platform Diversity (2).", icon: Activity, duration: 1500 },
  { id: "done", label: "Assembling Trust Engine... Generating Pramaan Trust Score & GIRI.", icon: CheckCircle2, duration: 1500 },
];

export function Layer3Simulation({ onComplete }: Layer3SimulationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const runStep = (index: number) => {
      if (index >= SIMULATION_STEPS.length) {
        setTimeout(onComplete, 500);
        return;
      }
      
      const step = SIMULATION_STEPS[index];
      setLogs((prev) => [...prev, `[${new Date().toISOString().split('T')[1].substring(0,8)}] ${step.label}`]);
      setCurrentStepIndex(index);
      
      timeout = setTimeout(() => {
        runStep(index + 1);
      }, step.duration);
    };

    runStep(0);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#020617] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-2xl w-full bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="bg-[#1e293b] p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <div className="text-xs font-mono text-slate-400">Pramaan Layer-3 Neural Engine</div>
          <div className="w-4 h-4" /> {/* Spacer */}
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col items-center gap-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 pointer-events-none" />
          
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
            <div className="bg-[#1e293b] p-6 rounded-full border border-emerald-500/30 relative z-10">
              {(() => {
                const CurrentIcon = SIMULATION_STEPS[currentStepIndex]?.icon || Cpu;
                return <CurrentIcon className="w-12 h-12 text-emerald-400 animate-pulse" />;
              })()}
            </div>
          </div>

          <h2 className="text-xl font-bold text-white text-center h-8">
            {SIMULATION_STEPS[currentStepIndex]?.label || "Finalizing..."}
          </h2>

          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, ((currentStepIndex + 1) / SIMULATION_STEPS.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Terminal Logs */}
        <div className="bg-black/50 p-4 font-mono text-xs text-emerald-400 h-48 overflow-y-auto border-t border-slate-800 flex flex-col gap-1.5">
          {logs.map((log, idx) => (
            <div key={idx} className={cn("animate-in slide-in-from-bottom-2 fade-in duration-300", idx === logs.length - 1 ? "text-emerald-300 font-bold" : "text-emerald-600")}>
              {log}
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </div>
    </div>
  );
}
