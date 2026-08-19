import { ArrowRight, ChartLine, Gauge, Radar, Rocket } from "lucide-react";
import { Reveal } from "./reveal";
import { Parallax, DriftOrbs } from "./parallax";
import { RadarScanDemo } from "./radar-scan-demo";
import { FunnelDeepDive } from "./funnel-deep-dive";
import { LandingPagesLeak } from "./landing-pages-leak";

const GEARS = [
  {
    icon: Radar,
    title: "Diagnose",
    time: "WEEK 1–2",
    body: "Market, ICP, funnel, tech stack and AI visibility audited in one pass. You get a ranked to-do list and a ranked stop-doing list.",
  },
  {
    icon: Gauge,
    title: "Discovery",
    time: "WEEK 3–5",
    body: "Positioning, journey map, experience blueprint and revenue operating model — signed off before anything is built.",
  },
  {
    icon: Rocket,
    title: "Demand",
    time: "WEEK 6–12",
    body: "Brand, site, demand programmes and automation ship in sprints. Creative and campaigns run against the same plan.",
  },
  {
    icon: ChartLine,
    title: "Deliver",
    time: "ONGOING",
    body: "Attribution and customer intelligence feed the next cycle. Spend shifts to what proves out, monthly.",
  },
];

export function EngineSection() {
  return (
    <section id="engine" className="relative overflow-hidden pt-14 pb-20 sm:pt-16 sm:pb-24">
      <DriftOrbs className="opacity-70" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0">
            <p className="eyebrow text-accent">OUR PRODUCT</p>
            <h2 className="mt-4 max-w-3xl heading-h2">
              One{" "}
              <span className="relative inline-block">
                <span className="relative z-10 heading-accent text-accent">
                  growth engine
                </span>
              </span>{" "}
              that unlocks speed &amp; precision
            </h2>
            <div className="mt-6 space-y-4">
              <p className="max-w-xl text-lg text-muted-foreground">
                Our AI cutting-edge product{" "}
                <span className="font-bold text-foreground">SEO RADAR</span>{" "}
                exactly understands what&apos;s triggering your B2B prospects to
                drop out after entering your marketing funnel.
              </p>
              <p className="max-w-xl text-lg text-muted-foreground">
                The insights SEO RADAR provides have re-engineered the marketing
                and sales funnel of many businesses, leading to revenue growth.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex min-h-11 items-center gap-2 font-display font-bold text-accent transition-colors hover:opacity-80"
                >
                  Know More About SEO RADAR <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <Parallax speed={0.07} max={26}>
            <Reveal className="surface-card overflow-hidden rounded-[1.75rem] p-3">
              <video
                src="/assets/f1-cockpit-sketch.mp4"
                poster="/assets/f1-cockpit-poster.jpg"
                width={1200}
                height={912}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Cockpit view of a helmeted driver at speed with the speedometer and dashboard telemetry ticking"
                className="w-full rounded-[1.25rem] object-cover"
              />
              <figcaption className="eyebrow px-2 pb-1 pt-3 text-muted-foreground">
                IN THE COCKPIT — EVERY NUMBER VISIBLE WHILE THE RACE IS STILL ON
              </figcaption>
            </Reveal>
          </Parallax>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {GEARS.map((gear, i) => (
            <Reveal
              key={gear.title}
              delay={i * 100}
              className="surface-card group relative rounded-2xl p-7 transition-transform hover:-translate-y-1"
            >
              <span className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Gear {i + 1}
              </span>
              <gear.icon className="mt-4 h-6 w-6 text-accent" />
              <h3 className="mt-4 font-display text-xl font-bold">
                {gear.title}
              </h3>
              <p className="eyebrow mt-1 text-accent">{gear.time}</p>
              <p className="mt-3 text-sm text-muted-foreground">{gear.body}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <RadarScanDemo />
        </Reveal>
        <Reveal delay={100}>
          <FunnelDeepDive />
        </Reveal>
        <Reveal delay={100}>
          <LandingPagesLeak />
        </Reveal>
      </div>
    </section>
  );
}
