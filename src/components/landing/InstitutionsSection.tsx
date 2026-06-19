export default function InstitutionsSection() {
  const categories = [
    {
      title: "Gig Platforms & Networks",
      partners: ["Zomato", "Swiggy", "Uber", "Ola"]
    },
    {
      title: "Banks & NBFCs",
      partners: ["HDFC Bank", "ICICI Bank", "Kotak Bank", "Bajaj Finserv"]
    },
    {
      title: "Insurance & Providers",
      partners: ["Policybazaar", "Digit Insurance", "Acko"]
    }
  ];

  return (
    <section id="institutions" className="py-24 bg-white border-t border-[rgba(15,23,42,0.06)] select-none">
      <div className="max-w-[1440px] mx-auto px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold text-[#18C79C] uppercase tracking-widest mb-3">
            Integration
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] tracking-tight">
            Trusted by Institutions
          </h2>
        </div>

        <div className="space-y-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="border-b border-slate-100 pb-10 last:border-none last:pb-0">
              <h4 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
                {cat.title}
              </h4>
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                {cat.partners.map((partner, pIdx) => (
                  <div 
                    key={pIdx}
                    className="font-black text-slate-700 hover:text-slate-900 text-xl tracking-tight transition-all duration-300 transform hover:scale-110 cursor-default opacity-60 hover:opacity-100"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
