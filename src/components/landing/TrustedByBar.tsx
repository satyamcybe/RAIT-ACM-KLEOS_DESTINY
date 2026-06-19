export default function TrustedByBar() {
  return (
    <div className="border-y border-slate-100 bg-white py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
          Powered by India&apos;s Digital Public Infrastructure
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale">
          {/* Mock Logos text */}
          <span className="font-bold text-xl text-slate-800">DigiLocker</span>
          <span className="font-bold text-xl text-slate-800">eShram</span>
          <span className="font-bold text-xl text-slate-800">Aadhaar</span>
          <span className="font-bold text-xl text-slate-800">UPI</span>
          <span className="font-bold text-xl text-slate-800">Account Aggregator</span>
        </div>
      </div>
    </div>
  );
}
