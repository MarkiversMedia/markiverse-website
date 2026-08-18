import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { AUDIT_URL, CONTACT_URL } from "@/components/links";
import { ScrubText } from "./motion";

/* ---------------- capabilities: numbered list rows ---------------- */
const SERVICES = [
  {
    slug: "web-development",
    name: "Web Development",
    desc: "Fast, modern, conversion-ready websites with AI-powered personalization that adapts the experience to each visitor's industry, role, and intent.",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    desc: "SEO, AEO, GEO, SEM, social media, content, and email built as one coordinated system with every channel feeding the same pipeline view.",
  },
  {
    slug: "content-development",
    name: "Content Development",
    desc: "Content mapped to each stage of buyer evaluation: thought leadership for awareness, proof content for the harder middle, case studies and ROI tools for the decision.",
  },
  {
    slug: "brand-design-strategy",
    name: "Brand Design & Strategy",
    desc: "Identity systems and positioning reinforced by AI website personalization — that hold up across a long, considered enterprise sales cycle.",
  },
  {
    slug: "video-development",
    name: "Video Development",
    desc: "From explainer videos to event and product storytelling, built to carry technical or institutional credibility where written content alone won't land.",
  },
  {
    slug: "demand-generation",
    name: "Demand Generation",
    desc: "AI-driven funnels that build pipeline — from top-of-funnel visibility to intelligent lead scoring that tells sales exactly when a prospect is ready to talk.",
  },
];

export function V2Services() {
  return (
    <section id="capabilities" className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal>
        <p className="v2-label mb-6">Capabilities/</p>
        <p className="v2-mono mb-14 max-w-[560px] text-[12px] uppercase leading-[2] text-[var(--v2-dim)]">
          DeSiRE and SEO RADAR are built on top of Markiverse&apos;s full-service
          AI-led capabilities that run as one connected system around your
          buyer&apos;s journey.
        </p>
      </Reveal>

      <div>
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.04}>
            <a
              href={`${CONTACT_URL}?service=${s.slug}&utm_source=homepage_v2&utm_medium=services_section`}
              className="group grid gap-3 border-t border-[var(--v2-line)] py-8 transition-colors duration-300 last:border-b hover:bg-white/[0.03] lg:grid-cols-[80px_1.1fr_1.3fr_60px] lg:items-center lg:gap-8"
            >
              <span className="v2-mono text-[12px] text-[var(--v2-dim)]">0{i + 1}/</span>
              <h3 className="display text-[clamp(1.4rem,2.4vw,2rem)] font-medium text-[var(--v2-fg)] transition-transform duration-300 lg:group-hover:translate-x-2">
                {s.name}
              </h3>
              <p className="max-w-[560px] text-[14px] leading-[1.9] text-[var(--v2-mut)]">
                {s.desc}
              </p>
              <span
                aria-hidden
                className="v2-mono hidden text-right text-lg text-[var(--v2-dim)] transition-colors duration-300 group-hover:text-[var(--v2-fg)] lg:block"
              >
                ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- the system: DeSiRE + SEO RADAR ---------------- */
const SYSTEM = [
  {
    tag: "01 / DeSiRE — Free 48-hour diagnostic",
    statement: "In 48 hours, DeSiRE shows you exactly what AI says when your buyers ask.",
    body: "DeSiRE is Markiverse's AI confidence audit — a free, 48-hour diagnostic that shows enterprise marketing leaders exactly how AI responds when buyers ask the questions your brand should be answering. It measures not where you rank, but whether AI recommends you when your buyer is making a decision.",
    quote:
      "DeSiRE is the only tool that gives your team a ranked to-do list AND a ranked stop-doing list generated from your own data — in under three minutes.",
    cta: { label: "Run free brand audit", href: AUDIT_URL },
  },
  {
    tag: "02 / SEO RADAR — AI visibility retainer",
    statement: "Then SEO RADAR closes the gap — week by week, until AI answers with your brand.",
    body: "Once DeSiRE shows you where your brand stands in AI-generated responses, the next question is straightforward: what closes the gap? SEO RADAR is Markiverse's AI visibility retainer — a proven platform that works the answer, week by week, until your brand is consistently part of the conversation your buyers are having with AI.",
    quote:
      "DeSiRE finds the gap. SEO RADAR closes it — and tracks it so your leadership always knows where the brand stands in AI responses, not just Google rankings.",
    cta: { label: "Talk to us about SEO RADAR", href: CONTACT_URL },
  },
];

export function V2System() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10 lg:pb-24">
      <Reveal>
        <p className="v2-label mb-4">The system/</p>
        <h2 className="v2-h mb-6 max-w-[900px] text-[clamp(2rem,4.2vw,3.4rem)]">
          Two steps from invisible to AI-recommended.
        </h2>
      </Reveal>

      {SYSTEM.map((step, i) => (
        <Reveal key={step.tag} delay={0.06}>
          <div className="grid gap-10 border-t border-[var(--v2-line)] py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:py-20">
            <div>
              <p className="v2-mono mb-8 text-[12px] uppercase tracking-[0.16em] text-[var(--v2-mut)]">
                {step.tag}
              </p>
              <ScrubText
                text={step.statement}
                className="v2-h max-w-[560px] text-[clamp(1.7rem,3.4vw,2.7rem)]"
              />
            </div>
            <div className="flex flex-col justify-between gap-10">
              <div>
                <p className="mb-8 max-w-[560px] text-[14.5px] leading-[2] text-[var(--v2-mut)]">
                  {step.body}
                </p>
                <p className="v2-mono max-w-[520px] border-l border-[var(--v2-line)] pl-5 text-[12px] uppercase leading-[2.1] text-[var(--v2-soft)]">
                  &ldquo;{step.quote}&rdquo;
                </p>
              </div>
              <a
                href={step.cta.href}
                target="_blank"
                rel="noopener"
                className="v2-cta w-fit text-[13px]"
              >
                {step.cta.label} <span aria-hidden>{i === 0 ? "→" : "↗"}</span>
              </a>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------------- numbers talk ---------------- */
const NUMBERS = [
  { to: 100, suffix: "K+", label: "Leads generated for clients since inception" },
  { to: 99, suffix: "%", label: "Client retention rate, year-on-year" },
  { to: 10, suffix: "x", label: "ROI achieved through tailored strategies" },
  { to: 10, suffix: "+", label: "Years of experience driving measurable results" },
];

export function V2Stats() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-28 lg:px-10 lg:pb-40">
      <Reveal>
        <p className="v2-label mb-10">Numbers talk/</p>
      </Reveal>
      <div className="grid grid-cols-2 border-b border-t border-[var(--v2-line)] lg:grid-cols-4">
        {NUMBERS.map((n, i) => (
          <div
            key={n.label}
            className={`flex flex-col gap-4 p-7 lg:p-9 ${
              i > 0 ? "border-l border-[var(--v2-line)]" : ""
            } ${i === 2 ? "max-lg:border-l-0" : ""} ${
              i >= 2 ? "max-lg:border-t max-lg:border-[var(--v2-line)]" : ""
            }`}
          >
            <span className="display text-[clamp(2.4rem,4.4vw,3.8rem)] font-medium leading-none text-[var(--v2-fg)]">
              <Counter to={n.to} suffix={n.suffix} once={false} />
            </span>
            <span className="v2-mono text-[11px] uppercase leading-[1.9] tracking-[0.12em] text-[var(--v2-mut)]">
              {n.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
