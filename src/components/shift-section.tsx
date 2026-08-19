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
    <section className="relative overflow-hidden border-y border-border bg-[color-mix(in_oklab,var(--ink)_60%,transparent)] py-16 sm:py-20">
      <DriftOrbs />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Mirrors the hero: text left, card-framed visual right, same card
            chrome (eyebrow row, rounded media), tighter vertical rhythm. */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="min-w-0">
            <p className="eyebrow text-accent">The shift</p>
            <h2 className="mt-5 heading-h2 text-foreground">
              Your{" "}
              <span className="relative inline-block">
                <span className="relative z-10 heading-accent text-accent">
                  buyer&apos;s journey
                </span>
              </span>{" "}
              begins with an AI answer.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The journey no longer starts on your website. It starts in an AI
              answer, a peer thread, a review round-up, a LinkedIn post. By the
              time a form is filled, the shortlist is already written.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              That is why isolated services stopped working. Winning now means
              shaping the market narrative, the AI answer, the experience and
              the revenue system{" "}
              <span className="text-foreground">at the same time</span>, with
              data proving what moved.
            </p>
          </Reveal>
          <Parallax speed={0.07} max={26} className="w-full lg:justify-self-center">
            <Reveal className="surface-card relative rounded-[2rem] p-4 sm:p-5">
              <div className="flex items-baseline justify-between px-1 pb-3">
                <p className="eyebrow text-muted-foreground">The pit stop</p>
                <p className="eyebrow text-accent">One team, one stop</p>
              </div>
              <div className="relative overflow-hidden rounded-[1.25rem]">
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
              </div>
              <figcaption className="eyebrow px-1 pt-3 text-muted-foreground">
                The Markiverse pit crew — every system touched in one stop
              </figcaption>
            </Reveal>
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/* Rendered in normal flow between the Shift card and the next card (see
   page.tsx): it rides up over the pinned Shift card ahead of the next fold,
   so the numbers stay readable until they cross the top of the viewport. */
export function ShiftStats() {
  return (
    <div className="relative z-10 mx-auto -mt-6 max-w-7xl px-5 pb-8 sm:px-8">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.k}
            delay={i * 120}
            className="group relative bg-card p-7"
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
  );
}
