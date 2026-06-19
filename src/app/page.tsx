import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesBar from "@/components/landing/FeaturesBar";
import TrustOverviewSection from "@/components/landing/TrustOverviewSection";
import LabourPassportSection from "@/components/landing/LabourPassportSection";
import InstitutionsSection from "@/components/landing/InstitutionsSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F6F2]">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesBar />
      <TrustOverviewSection />
      <LabourPassportSection />
      <InstitutionsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}

