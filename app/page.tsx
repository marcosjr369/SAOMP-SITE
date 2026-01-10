import ActivitiesSection from "@/components/activities-section/ActivitiesSection";
import DocumentsSection from "@/components/document-section/DocumentSection";
import HeroSection from "@/components/hero-section/HeroSectio";
import MissionSection from "@/components/mission-section/MissionSection";
import QuoteSection from "@/components/quote-section/QuoteSection";

export default function Home() {
  return (
    <div className="">
     <HeroSection />
     <QuoteSection />
     <MissionSection />
     <ActivitiesSection/>
     <DocumentsSection />
    </div>
  );
}
