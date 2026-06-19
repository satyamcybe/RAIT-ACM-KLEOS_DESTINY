import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustedByBar from "@/components/landing/TrustedByBar";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LabourPassportSection from "@/components/landing/LabourPassportSection";
import InstitutionsSection from "@/components/landing/InstitutionsSection";
import TrustOverviewSection from "@/components/landing/TrustOverviewSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <TrustedByBar />
      <HowItWorksSection />
      <LabourPassportSection />
      <InstitutionsSection />
      <TrustOverviewSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
