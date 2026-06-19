export default function TrustedByBar() {
  const partners = [
    { name: "Aadhaar", icon: "🆔" },
    { name: "DigiLocker", icon: "📂" },
    { name: "eShram", icon: "⚙️" },
    { name: "Account Aggregator", icon: "🏦" },
    { name: "UPI", icon: "💸" },
    { name: "Banking Partners", icon: "🤝" }
  ];

  return (
    <section className="py-16 bg-white border-y border-[rgba(15,23,42,0.06)]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Built on Trusted Infrastructure
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
          {partners.map((partner, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2.5 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default"
            >
              <span className="text-2xl">{partner.icon}</span>
              <span className="font-extrabold text-slate-800 text-lg tracking-tight">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
