"use client";

export default function ScootyAnimation() {
  return (
    <div className="w-full h-12 overflow-hidden relative border-b border-slate-100 bg-slate-50/50">
      <style>{`
        @keyframes drive {
          0% { left: -10%; }
          100% { left: 110%; }
        }
        .scooty-driver {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          animation: drive 8s linear infinite;
        }
      `}</style>
      <div className="scooty-driver">
        <span className="text-2xl" role="img" aria-label="delivery scooter">🛵</span>
      </div>
    </div>
  );
}
