import Reveal from "@/components/Reveal";
import { AUDIT_URL } from "@/components/links";
import { ScrubText } from "./motion";

/* ---------------- trusted partners: produx olive block ---------------- */
const TESTIMONIALS = [
  {
    quote:
      "Working with Markiverse on the revamp of our website has been a very positive experience. They understood our vision and translated it into a modern platform that incorporates contemporary technologies and evolving education trends.",
    name: "Pamela Kumar",
    role: "Chief Strategy Advisor, Telecom & Data, FSID, IISc",
  },
  {
    quote:
      "Markiverse excels in web tech, copywriting, and design, offering a one-stop, professional service. Their approach is timely, dedicated, and friendly — a perfect blend.",
    name: "Roshnie Venkataraman",
    role: "GM & Head of Marketing, BCT Digital",
  },
  {
    quote:
      "Markiverse excels in diverse marketing skills from web development to digital marketing. Their quality work, professionalism, and ethic shine; they consistently overdeliver.",
    name: "Rouba Habboushi",
    role: "CEO, Kelni GVG, Ghana",
  },
];

export function V2Voices() {
  return (
    <section id="voices" className="bg-[var(--v2-olive)] py-28 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <h2 className="v2-h text-[clamp(2.4rem,5.6vw,4.6rem)] !text-[var(--v2-paper)]">
              Trusted partners.
            </h2>
            <span className="v2-mono text-[11px] uppercase tracking-[0.16em] text-[var(--v2-paper)]/50">
              Hear from our clients/
            </span>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-28" : ""}>
              <figure className="flex min-h-[380px] flex-col justify-between bg-[var(--v2-paper)] p-8 text-[var(--v2-paper-ink)]">
                <figcaption className="flex items-center gap-4">
                  <span className="display flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[var(--v2-paper-ink)] text-[13px] font-semibold text-[var(--v2-paper)]">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold">{t.name}</span>
                    <span className="mt-0.5 block text-[12px] leading-snug opacity-60">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
                <blockquote className="mt-10 text-[16px] leading-[1.75]">
                  {t.quote}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- closing statement ---------------- */
export function V2Closing() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-32 lg:px-10 lg:py-44">
      <Reveal>
        <p className="v2-label mb-10">The next move is yours/</p>
      </Reveal>
      <ScrubText
        text="Ready to make your marketing AI-native?"
        className="v2-h max-w-[1000px] text-[clamp(2.4rem,5.6vw,4.6rem)]"
      />
      <Reveal>
        <p className="v2-mono mt-10 max-w-[560px] text-[12.5px] uppercase leading-[2.1] text-[var(--v2-mut)]">
          Start with a free DeSiRE audit — we&apos;ll show you exactly where AI can
          work hardest for your business.
        </p>
        <a
          href={AUDIT_URL}
          target="_blank"
          rel="noopener"
          className="v2-cta mt-12 text-[clamp(1rem,2vw,1.5rem)]"
        >
          Run a free AI marketing audit <span aria-hidden>→</span>
        </a>
      </Reveal>
    </section>
  );
}
