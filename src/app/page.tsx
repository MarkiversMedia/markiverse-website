import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ShiftSection, ShiftStats } from "@/components/shift-section";
import { PillarsSection } from "@/components/pillars-section";
import { EngineSection } from "@/components/engine-section";
import { OutcomesSection } from "@/components/outcomes-section";
import { FaqSection } from "@/components/faq-section";
import { SiteFooter } from "@/components/site-footer";
import { StackCard } from "@/components/stack-card";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      {/* Folds stack like cards: each pins in place and the next slides up
          over it, through Outcomes. */}
      <StackCard first>
        <HeroSection />
      </StackCard>
      <StackCard>
        <ShiftSection />
      </StackCard>
      {/* Flows up over the pinned Shift card ahead of Pillars, so the stats
          stay readable until they clear the top of the viewport. */}
      <ShiftStats />
      <StackCard>
        <PillarsSection />
      </StackCard>
      <StackCard>
        <EngineSection />
      </StackCard>
      <StackCard>
        <OutcomesSection />
      </StackCard>
      {/* FAQs and footer are plain flow (not cards): they ride up over the last
          pinned card together and scroll normally from there. */}
      <div className="relative rounded-t-[2rem] border-t border-border bg-background shadow-[0_-24px_60px_-30px_color-mix(in_oklab,var(--ink-shadow)_45%,transparent)]">
        <FaqSection />
        <SiteFooter />
      </div>
    </main>
  );
}
