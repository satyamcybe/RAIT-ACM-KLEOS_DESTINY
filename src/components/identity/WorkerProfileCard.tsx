interface WorkerProfileCardProps {
  name: string;
  initials: string;
  role: string;
  sector: string;
  registeredYear: string;
  verifications: {
    aadhaar: boolean;
    eshram: boolean;
    uan: boolean;
    digilocker: boolean;
  };
}

export default function WorkerProfileCard({
  name,
  initials,
  role,
  sector,
  registeredYear,
}: WorkerProfileCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-6 text-white w-full shadow-lg opacity-0 animate-fade-in-up">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
            {initials}
          </div>
          <div>
            <div className="font-bold text-lg">{name}</div>
            <div className="text-sm opacity-75">{role}</div>
          </div>
        </div>
        <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
          L1 Verified
        </div>
      </div>

      <div className="border-t border-white/20 my-4" />

      {/* Verification Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs opacity-60 mb-1">Aadhaar</div>
          <div className="text-xs font-semibold flex items-center gap-1">
            {verifications.aadhaar && <span>✓ Verified</span>}
          </div>
        </div>
        <div>
          <div className="text-xs opacity-60 mb-1">eShram</div>
          <div className="text-xs font-semibold flex items-center gap-1">
            {verifications.eshram && <span>✓ Verified</span>}
          </div>
        </div>
        <div>
          <div className="text-xs opacity-60 mb-1">UAN</div>
          <div className="text-xs font-semibold flex items-center gap-1">
            {verifications.uan && <span>✓ Extracted</span>}
          </div>
        </div>
        <div>
          <div className="text-xs opacity-60 mb-1">DigiLocker</div>
          <div className="text-xs font-semibold flex items-center gap-1">
            {verifications.digilocker && <span>✓ Connected</span>}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between text-xs opacity-70">
        <span>Sector: {sector}</span>
        <span>Registered since: {registeredYear}</span>
      </div>
    </div>
  );
}
