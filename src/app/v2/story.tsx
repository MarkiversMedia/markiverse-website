import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { ScrubText, WorkCard } from "./motion";

/* ---------------- the shift: statement + proof ---------------- */
export function V2Shift() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal>
        <p className="v2-label mb-10">The shift/</p>
      </Reveal>
      <ScrubText
        text="In the AI era, recommendations matter more than rankings."
        className="v2-h max-w-[1050px] text-[clamp(2.2rem,5vw,4.2rem)]"
      />

      <div className="mt-20 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal delay={0.08}>
          <div>
            <div className="display text-[clamp(4.5rem,9vw,8rem)] font-medium leading-none text-[var(--v2-fg)]">
              <Counter to={92} suffix="%" once={false} />
            </div>
            <p className="v2-mono mt-5 max-w-[340px] text-[12px] uppercase leading-[2] text-[var(--v2-mut)]">
              of searches showing an AI Overview end without a click on any search
              result —{" "}
              <a
                href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-4 transition-colors hover:text-[var(--v2-fg)]"
              >
                Pew Research, July 2025
              </a>
              , 68,879 real Google searches.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="max-w-[640px]">
            <p className="mb-6 text-[15.5px] leading-[2] text-[var(--v2-mut)]">
              Until recently, a buyer looking to solve a problem simply Googled it.
              If your SEO got your brand onto page one, your job was done. Today,
              buyers consult multiple sources before a single sales conversation —
              Google, AI Overviews, ChatGPT, Gemini, LinkedIn, industry reviews, and
              peer recommendations.
            </p>
            <p className="mb-10 text-[15.5px] leading-[2] text-[var(--v2-mut)]">
              And here&apos;s what makes the shift so significant:{" "}
              <span className="text-[var(--v2-fg)]">
                most buyers never scroll past the AI Overview.
              </span>{" "}
              Many don&apos;t open a single search result. If AI doesn&apos;t mention
              or cite your brand in its answer, you&apos;re losing the conversation
              entirely.
            </p>
            <p className="v2-mono border-l border-[var(--v2-fg)] pl-6 text-[13px] uppercase leading-[2.1] text-[var(--v2-fg)]">
              Fortune 1000 marketing leaders are working with Markiverse to find out
              and fix this SEO gap that&apos;s costing them millions.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- trusted by: client logo wall ---------------- */
const CLIENTS = [
  ["tcs.svg", "TCS"],
  ["tech_mahindra.svg", "Tech Mahindra"],
  ["ntt_data.svg", "NTT Data"],
  ["tata_communications.svg", "Tata Communications"],
  ["adp.svg", "ADP"],
  ["rakuten_symphony.svg", "Rakuten Symphony"],
  ["lt_t_services.svg", "L&T Technology Services"],
  ["sify.svg", "Sify"],
  ["sg_analytics.svg", "SG Analytics"],
  ["bct_digital.svg", "BCT Digital"],
  ["symbiosis.svg", "Symbiosis"],
  ["01-IISc.svg", "IISc Bengaluru"],
  ["tata_projects.svg", "Tata Projects"],
  ["iudx.svg", "IUDX"],
  ["dnx.svg", "DNX"],
  ["moomark.svg", "mooMark"],
  ["sls_noida.svg", "Symbiosis Law School Noida"],
  ["ngic.svg", "NGIC"],
];

export function V2Logos() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="overflow-hidden pb-28 lg:pb-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <p className="v2-label mb-12">Trusted by/</p>
        </Reveal>
      </div>
      <div className="v2-track-slow gap-5 px-6">
        {row.map(([file, name], i) => (
          <div
            key={`${file}-${i}`}
            className="flex h-[130px] w-[220px] flex-none items-center justify-center border border-[var(--v2-line)] p-8 transition-colors duration-300 hover:border-[var(--v2-mut)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/clients/${file}`}
              alt={name}
              className="v2-logo-img max-h-12 w-auto max-w-full opacity-80"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- selected work ---------------- */
const STORIES = [
  {
    img: "/images/story-infra.jpg",
    tag: "SEM · SEO · ROI",
    title:
      "Driving Strong ROI by Optimizing SEM & SEO for a Leading Digital Infrastructure Company",
  },
  {
    img: "/images/story-bschool.jpg",
    tag: "Web · CMS · Education",
    title:
      "Modernizing Premier B-School Websites for Speed, Discoverability & CMS Independence",
  },
  {
    img: "/images/story-brand.jpg",
    tag: "Brand · Admissions · UX",
    title: "Delivering Transformative Website, Admissions & Brand Experiences",
  },
];

export function V2Work() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-6 pb-28 lg:px-10 lg:pb-40">
      <Reveal>
        <div className="mb-12 flex items-end justify-between gap-6">
          <p className="v2-label">Selected work/</p>
          <span className="v2-mono hidden text-[11px] uppercase tracking-[0.14em] text-[var(--v2-dim)] sm:inline">
            Success stories from the business world
          </span>
        </div>
      </Reveal>

      <div className="flex flex-col gap-8">
        {STORIES.map((s, i) => (
          <WorkCard key={s.title} img={s.img} tag={s.tag} title={s.title} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- industries: bordered card loop ---------------- */
const INDUSTRIES = [
  { name: "Technology & Hi-Tech", note: "Demand gen & ABM" },
  { name: "Telecom", note: "Enterprise procurement" },
  { name: "Education & EdTech", note: "Admissions & trust" },
  { name: "FinTech Services", note: "Compliance-aware growth" },
  { name: "Healthcare & Pharma", note: "Regulated marketing" },
  { name: "Government & Public Sector", note: "Tender-cycle strategy" },
];

export function V2Industries() {
  const row = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section className="overflow-hidden pb-28 lg:pb-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <p className="v2-label mb-12">Where we operate/</p>
        </Reveal>
      </div>
      <div className="v2-track-slow gap-5 px-6">
        {row.map((ind, i) => (
          <div
            key={`${ind.name}-${i}`}
            className="flex h-[210px] w-[280px] flex-none flex-col justify-between border border-[var(--v2-line)] p-6 transition-colors duration-300 hover:border-[var(--v2-mut)]"
          >
            <span className="v2-mono text-[11px] text-[var(--v2-dim)]">
              0{(i % INDUSTRIES.length) + 1}/
            </span>
            <div>
              <div className="display mb-2 text-[19px] font-medium leading-snug text-[var(--v2-fg)]">
                {ind.name}
              </div>
              <div className="v2-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--v2-mut)]">
                {ind.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
