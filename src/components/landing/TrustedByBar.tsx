"use client";

export default function TrustedByBar() {
  const frameworks = [
    "e-Shram",
    "DigiLocker",
    "Account Aggregator",
    "RBI Framework"
  ];

  return (
    <section className="py-12 bg-[#F9FAFB] border-y border-[#E5E7EB] select-none">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
        
        {/* Label */}
        <p 
          className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6B7280]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Built on India&apos;s trusted government infrastructure
        </p>

        {/* Gray Subtle Logos list */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-[#6B7280]">
          {frameworks.map((fw, idx) => (
            <div key={idx} className="flex items-center gap-2 font-bold text-[15px] tracking-tight opacity-75 hover:opacity-100 transition-opacity">
              {/* Dot Separator */}
              {idx > 0 && <span className="text-[#E5E7EB] mr-6 hidden md:inline">&middot;</span>}
              <span>{fw}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
