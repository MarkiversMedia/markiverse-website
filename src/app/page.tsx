import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ShiftSection } from "@/components/shift-section";
import { PillarsSection } from "@/components/pillars-section";
import { EngineSection } from "@/components/engine-section";
import { OutcomesSection } from "@/components/outcomes-section";
import { FaqSection } from "@/components/faq-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ShiftSection />
      <PillarsSection />
      <EngineSection />
      <OutcomesSection />
      <FaqSection />
      <SiteFooter />
    </main>
  );
}
