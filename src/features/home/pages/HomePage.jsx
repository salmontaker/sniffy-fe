import DailyReportSection from "@/features/home/components/DailyReportSection";
import HeroSection from "@/features/home/components/HeroSection";
import MapSearchSection from "@/features/home/components/MapSearchSection";
import StatsSummarySection from "@/features/home/components/StatsSummarySection";
import ItemSearchSection from "@/features/items/components/ItemSearchSection";
import RecentItemsSection from "@/features/items/components/RecentItemsSection";

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
