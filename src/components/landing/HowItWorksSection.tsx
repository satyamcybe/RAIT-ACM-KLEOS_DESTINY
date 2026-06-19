export default function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Connect Identity", desc: "Link DigiLocker and eShram to verify who you are." },
    { num: "02", title: "Link Finances", desc: "Securely connect your bank via Account Aggregator." },
    { num: "03", title: "Build Trust", desc: "Get your Pramaan Trust Score and Labour Passport." },
    { num: "04", title: "Access Benefits", desc: "Use your passport for better loans and new jobs." },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How Pramaan Works</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A simple 4-step process to take control of your professional identity.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative animate-step"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="text-5xl font-black text-slate-100 mb-4">{step.num}</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
              <p className="text-sm text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
