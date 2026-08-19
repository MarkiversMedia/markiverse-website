import { Reveal } from "./reveal";
import { DriftOrbs } from "./parallax";

const CASES = [
  {
    role: "CMO · B2B SaaS",
    ask: "“Why is our brand missing from every AI answer in our category?”",
    fix: "GEO + content architecture rebuilt around buyer questions; brand cited in 4 of 5 AI engines within a quarter.",
    pillars: ["Demand", "Intelligence"],
  },
  {
    role: "Growth Head · Higher Education",
    ask: "“Enquiries are up, admissions are flat.”",
    fix: "Journey redesign plus lead scoring and counsellor enablement; qualified-to-enrolled conversion reworked end to end.",
    pillars: ["Revenue", "Experience"],
  },
  {
    role: "Founder · D2C",
    ask: "“Every channel claims the same sale.”",
    fix: "Unified data layer and multi-touch attribution; spend reallocated off vanity channels into what actually compounds.",
    pillars: ["Intelligence", "Strategy"],
  },
];

export function OutcomesSection() {
  return (
    <section
      id="outcomes"
      className="relative overflow-x-clip border-y border-border bg-[color-mix(in_oklab,var(--ink)_60%,transparent)] pt-14 pb-20 sm:pt-16 sm:pb-24"
    >
      <DriftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative grid items-center gap-10 overflow-visible lg:grid-cols-[1fr_1fr]">
          <div className="min-w-0">
            <p className="eyebrow text-accent">Outcomes</p>
            <h2 className="mt-4 max-w-3xl heading-h2">
              Real problems,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 heading-accent text-accent">
                  solved
                </span>
              </span>{" "}
              across pillars.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              The work only counts when it crosses the line — pipeline sourced,
              conversion moved, spend proven.
            </p>
          </div>
          <Reveal className="surface-card relative rounded-[1.75rem] p-3">
            <img
              src="/assets/f1-finish-sketch.jpg"
              width={1536}
              height={1024}
              loading="lazy"
              alt="Empty finish-line straight with Markiverse trackside hoardings"
              className="w-full rounded-[1.25rem] object-cover"
            />
            <figcaption className="eyebrow px-2 pb-1 pt-3 text-muted-foreground">
              Chequered flag — outcomes, not activity reports
            </figcaption>
            <span className="animate-car-finish pointer-events-none absolute bottom-[10%] left-[4%] z-20 block w-[88%] origin-bottom-left">
              <img
                src="/assets/car-cutout-sketch.png"
                alt=""
                aria-hidden="true"
                className="animate-car-rumble w-full drop-shadow-lift-sm"
              />
            </span>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {CASES.map((item, i) => (
            <Reveal
              key={item.role}
              delay={i * 100}
              className="surface-card flex flex-col rounded-2xl p-7"
            >
              <p className="eyebrow text-accent">{item.role}</p>
              <p className="mt-4 font-display text-xl font-semibold">
                {item.ask}
              </p>
              <p className="mt-4 flex-1 text-sm text-muted-foreground">
                {item.fix}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.pillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
