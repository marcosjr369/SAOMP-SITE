import ActivitiesSection from "@/components/activities-section/ActivitiesSection";
import DocumentsSection from "@/components/document-section/DocumentSection";
import HeroSection from "@/components/hero-section/HeroSectio";
import MissionSection from "@/components/mission-section/MissionSection";
import ObrasSection from "@/components/obras-section/ObrasSection";
import QuickLinksSection from "@/components/quick-links-section/QuickLinksSection";
import QuoteSection from "@/components/quote-section/QuoteSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <QuickLinksSection />
      <MissionSection />
      <ObrasSection />
      <QuoteSection />
      <ActivitiesSection />
      <DocumentsSection />
    </>
  );
}
