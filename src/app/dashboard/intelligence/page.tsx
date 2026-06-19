'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRightLeft,
  Briefcase,
  PieChart,
  RefreshCw
} from 'lucide-react';

export default function IntelligenceDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For the hackathon demo, we'll fetch mock raw transactions 
    // and pass them through our newly built Layer 3 API
    const runIntelligenceEngine = async () => {
      try {
        // Mock AA payload that would come from Layer 2
        const mockTransactions = [
          { txnId: "T1", date: "2025-01-05", amount: 2100, type: "CREDIT", narration: "ZOMATO PRIVATE LIMITED" },
          { txnId: "T2", date: "2025-01-06", amount: 150, type: "DEBIT", narration: "SWIGGY INSTAMART" }, // personal expense
          { txnId: "T3", date: "2025-01-12", amount: 1950, type: "CREDIT", narration: "ZOMATO PVT LTD" },
          { txnId: "T4", date: "2025-01-14", amount: 450, type: "DEBIT", narration: "ZOMATO ORDER" },
          { txnId: "T5", date: "2025-01-16", amount: 450, type: "CREDIT", narration: "ZOMATO REFUND" }, // refund
          { txnId: "T6", date: "2025-01-19", amount: 2200, type: "CREDIT", narration: "ZMT FOOD" },
          { txnId: "T7", date: "2025-01-22", amount: 1000, type: "CREDIT", narration: "TRANSFER TO OWN A/C" }, // self transfer
          { txnId: "T8", date: "2025-01-26", amount: 2050, type: "CREDIT", narration: "ZOMATO MEDIA" },
          { txnId: "T9", date: "2025-02-02", amount: 2500, type: "CREDIT", narration: "BUNDL TECHNOLOGIES" }, // swiggy
          { txnId: "T10", date: "2025-02-09", amount: 2400, type: "CREDIT", narration: "SWIGGY PAYOUT" },
        ];

        const response = await fetch('/api/intelligence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            workerId: "mock-worker-123",
            transactions: mockTransactions
          })
        });

        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to run intelligence engine", error);
      } finally {
        setLoading(false);
      }
    };

    runIntelligenceEngine();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-slate-600 font-semibold">Running Transaction Intelligence Engine...</p>
          <p className="text-slate-400 text-sm">Extracting Behavioural Signals</p>
        </div>
      </div>
    );
  }

  if (!data) return <div>Failed to load data.</div>;

  const { behaviouralSignals } = data;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Transaction Intelligence</h1>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl">
            Layer 3 isolates raw financial data into behavioural trust signals without generating a final score. 
            This data is structurally prepared for the Layer 4 Pramaan Scoring Engine.
          </p>
        </div>

        {/* Top Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Txns Analysed</span>
            </div>
            <span className="text-3xl font-black text-slate-800">{data.transactionsAnalyzed}</span>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Briefcase className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Gig Payouts</span>
            </div>
            <span className="text-3xl font-black text-emerald-700">{data.gigPayoutsDetected}</span>
          </div>

          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Refunds Filtered</span>
            </div>
            <span className="text-3xl font-black text-amber-700">{data.refundsDetected}</span>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <PieChart className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Platforms</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.platformsDetected.map((p: string) => (
                <span key={p} className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-md">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Behavioural Signals Section */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Extracted Behavioural Signals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <SignalCard 
              title="Weekly Consistency" 
              value={`${behaviouralSignals.weeklyConsistency}%`}
              desc="Percentage of weeks with active gig payouts."
              color="text-emerald-600"
            />
            <SignalCard 
              title="Activity Continuity" 
              value={`${behaviouralSignals.activityContinuity}%`}
              desc="Measures lack of long inactivity gaps (>14 days)."
              color="text-emerald-600"
            />
            <SignalCard 
              title="Monthly Stability" 
              value={`${behaviouralSignals.monthlyIncomeStability}%`}
              desc="Stability of month-over-month earnings variance."
              color="text-blue-600"
            />
            <SignalCard 
              title="Gig Tenure" 
              value={`${behaviouralSignals.gigTenureMonths} Months`}
              desc="Duration since first identified gig payout."
              color="text-indigo-600"
            />
            <SignalCard 
              title="Platform Diversity" 
              value={behaviouralSignals.platformDiversity}
              desc="Number of unique gig platforms worked on."
              color="text-indigo-600"
            />
            <SignalCard 
              title="Avg Weekly Income" 
              value={`₹${behaviouralSignals.avgWeeklyGigIncome}`}
              desc="Average earnings strictly from verified platforms."
              color="text-slate-800"
            />
            <SignalCard 
              title="Refund Ratio" 
              value={behaviouralSignals.refundRatio}
              desc="Ratio of refunds to actual earnings (Lower is better)."
              color="text-amber-600"
            />
            
          </div>
        </div>

        {/* Layer 4 Hook */}
        <div className="mt-8 bg-slate-900 rounded-2xl p-8 text-white flex justify-between items-center shadow-xl">
          <div>
            <h3 className="text-lg font-bold">Ready for Layer 4</h3>
            <p className="text-slate-400 text-sm mt-1 max-w-lg">
              Raw transactions have been purged. Only secure, privacy-preserving behavioural signals remain. 
              These signals will now be fed into the Pramaan Scoring Engine.
            </p>
          </div>
          <div className="bg-slate-800 p-3 rounded-full">
            <ArrowRightLeft className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

      </div>
    </div>
  );
}

function SignalCard({ title, value, desc, color }: { title: string, value: string|number, desc: string, color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</h4>
      <div className={`text-3xl font-black ${color} mb-3`}>{value}</div>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
