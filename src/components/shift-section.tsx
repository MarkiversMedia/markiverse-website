import { Reveal } from "./reveal";
import { Parallax, DriftOrbs } from "./parallax";
import { CountUp } from "./count-up";

const STATS = [
  { k: "69%", v: "of AI-summary searches end without a click on any result" },
  { k: "6", v: "connected pillars run by one accountable team" },
  { k: "48 hrs", v: "to a full growth and AI-visibility diagnostic" },
  { k: "90 days", v: "to measurable pipeline and attribution lift" },
];

export function ShiftSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-[color-mix(in_oklab,var(--ink)_60%,transparent)] py-24 sm:py-28">
      <DriftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="space-y-5 text-lg text-muted-foreground">
            <p className="eyebrow text-accent">The shift</p>
            <h2 className="heading-h2 text-foreground">
              Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 heading-accent text-accent">
                  buyer&apos;s journey
                </span>
              </span>{" "}
              begins with an AI answer.
            </h2>
            <p>
              The journey no longer starts on your website. It starts in an AI
              answer, a peer thread, a review round-up, a LinkedIn post. By the
              time a form is filled, the shortlist is already written.
            </p>
            <p>
              That is why isolated services stopped working. Winning now means
              shaping the market narrative, the AI answer, the experience and
              the revenue system{" "}
              <span className="text-foreground">at the same time</span> — with
              data proving what moved.
            </p>
          </Reveal>
          <Parallax speed={0.07} max={26}>
            <Reveal className="surface-card overflow-hidden rounded-[1.75rem] p-3">
              <video
                src="/assets/f1-pit-crew-sketch.mp4"
                poster="/assets/f1-pit-crew-poster.jpg"
                width={1200}
                height={912}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Pit crew changing tyres and refuelling a race car during a pit stop"
                className="w-full rounded-[1.25rem] object-cover"
              />
              <figcaption className="eyebrow px-2 pb-1 pt-3 text-muted-foreground">
                The Markiverse pit crew — one team, one stop, every system
                touched
              </figcaption>
            </Reveal>
          </Parallax>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.k}
              delay={i * 120}
              className="group relative bg-card p-7 hover:z-10 hover:bg-accent/[0.04] hover:shadow-[0_20px_50px_-12px_color-mix(in_oklab,var(--brand-orange)_20%,transparent)]"
            >
              <span className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-[image:var(--gradient-accent)] transition-transform duration-300 group-hover:scale-x-100" />
              <p className="heading-accent text-accent">
                <CountUp value={stat.k} />
              </p>
              <p className="mt-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                {stat.v}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
