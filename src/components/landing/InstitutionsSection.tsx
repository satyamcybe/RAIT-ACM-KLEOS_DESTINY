"use client";

export default function InstitutionsSection() {
  const partners = [
    "HDFC Bank",
    "ICICI Bank",
    "Bajaj Finserv",
    "Kotak",
    "PolicyBazaar",
    "Zomato",
    "Swiggy"
  ];

  // Duplicate the array to create a seamless infinite loop scrolling effect
  const marqueeItems = [...partners, ...partners, ...partners, ...partners];

  return (
    <section 
      id="institutions" 
      className="py-16 bg-[#F7F6F2] border-b border-[#E5E1DA] overflow-hidden select-none"
    >
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Label */}
        <div className="text-center mb-8">
          <p 
            className="text-[16px] font-semibold text-[#6B7280]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Institutions Ready to Trust Pramaan.
          </p>
        </div>

        {/* Outer Marquee wrapper */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Inner animated row */}
          <div className="flex items-center gap-12 whitespace-nowrap w-max animate-marquee">
            {marqueeItems.map((partner, idx) => (
              <div key={idx} className="inline-flex items-center gap-12">
                <span 
                  className="text-[15px] md:text-[18px] font-medium text-[#9CA3AF] hover:text-[#1A4D3A] transition-colors duration-200 cursor-default"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {partner}
                </span>
                
                {/* Custom inline SVG dot separator */}
                <svg className="w-2.5 h-2.5 text-[#E5E1DA] shrink-0" viewBox="0 0 10 10" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="5" r="3" />
                </svg>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
