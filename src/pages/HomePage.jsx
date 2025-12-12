import DailyReportSection from "@/components/home/sections/DailyReportSection";
import HeroSection from "@/components/home/sections/HeroSection";
import ItemSearchSection from "@/components/home/sections/ItemSearchSection";
import MapSearchSection from "@/components/home/sections/MapSearchSection";
import RecentItemsSection from "@/components/home/sections/RecentItemsSection";
import StatsSummarySection from "@/components/home/sections/StatsSummarySection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ItemSearchSection />
      <MapSearchSection />
      <DailyReportSection />
      <RecentItemsSection />
      <StatsSummarySection />
    </>
  );
}

export default HomePage;
