import { ArrowRight } from "lucide-react";

function HeroVisual() {
  return (
    <div className="relative z-10">
      <div className="surface-card relative rounded-[2rem] p-4 sm:p-5">
        <div className="flex items-baseline justify-between px-1 pb-3">
          <p className="eyebrow text-muted-foreground">The AI answer grid</p>
          <p className="eyebrow text-accent">Live impressions</p>
        </div>
        <div className="relative overflow-hidden rounded-[1.25rem]">
          <img
            src="/assets/hero-race-sketch.jpg"
            width={1536}
            height={1024}
            alt="Race track with trackside hoardings for ChatGPT, Perplexity, Claude and Gemini with live impression counters"
            className="w-full rounded-[1.25rem] object-cover"
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["AI Acceleration", "Outcome First", "Revenue Growth"].map((tag) => (
            <div
              key={tag}
              className="inline-flex items-center justify-center rounded-full border border-ink-black px-4 py-3.5 text-center text-sm font-semibold text-ink-black"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
        <img
          src="/assets/car-cutout-sketch.png"
          width={1536}
          height={1024}
          alt=""
          aria-hidden="true"
          className="animate-car-drive w-[85%] drop-shadow-[0_40px_50px_rgba(15,25,40,0.28)]"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-visible bg-hero pt-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 eyebrow text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            MARKIVERSE — AI-POWERED MARKETING. BUILT TO WORK.
          </span>
          <h1 className="mt-7 heading-h2">
            Is your brand racing in AI, and turning{" "}
            <span className="whitespace-nowrap">
              <span className="relative inline-block">
                <span className="relative z-10 heading-accent text-accent">
                  speed into revenue
                </span>
              </span>
              <span className="text-accent">?</span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We are the AI-native growth partner behind Fortune 1000 marketing
            teams in India — running Strategy, Experience, Demand, Revenue,
            Intelligence and Creative as one engine, from the first AI answer to
            attributed pipeline.&nbsp;
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-7 py-3.5 font-semibold text-accent-foreground shadow-[var(--shadow-accent)] transition-transform hover:-translate-y-0.5"
            >
              Run the free DeSiRE audit <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#pillars"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 font-semibold transition-colors hover:bg-secondary"
            >
              See the six pillars
            </a>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free · Results in under 3 minutes · No sales call
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
