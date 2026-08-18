import type { CSSProperties } from "react";
import { AUDIT_URL } from "@/components/links";
import { Wordmark } from "./chrome";

const MARQUEE_ITEMS = [
  "AI Overviews",
  "ChatGPT",
  "Gemini",
  "SEO",
  "AEO",
  "GEO",
  "Demand Generation",
  "Brand Strategy",
  "Web Development",
  "Content",
  "Video",
  "ABM",
];

export function V2Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-[92px]">
      <div className="px-3 lg:px-5">
        <div className="v2-wipe">
          <Wordmark className="w-full text-[var(--v2-fg)]" />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-end gap-12 px-6 pb-14 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div
          className="hero-in"
          style={{ "--hero-delay": "0.35s", "--hero-rise": "28px" } as CSSProperties}
        >
          <p className="v2-label mb-7">
            India&apos;s leading digital marketing agency for the AI search era/
          </p>
          <h1 className="v2-h text-[clamp(2.4rem,5.4vw,4.4rem)]">
            Built by Strategists.
            <br />
            Sharpened by AI.
          </h1>
        </div>

        <div
          className="hero-in flex flex-col items-start gap-8 lg:items-end lg:text-right"
          style={{ "--hero-delay": "0.55s", "--hero-rise": "24px" } as CSSProperties}
        >
          <p className="v2-mono max-w-[380px] text-[13px] uppercase leading-[2] text-[var(--v2-mut)]">
            The next SEO battle isn&apos;t about search rankings — it&apos;s about AI
            recommendations. We make sure AI answers with your brand.
          </p>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a href={AUDIT_URL} target="_blank" rel="noopener" className="v2-cta text-[15px]">
              Run free brand audit <span aria-hidden>→</span>
            </a>
            <span className="v2-mono text-[11px] uppercase tracking-[0.14em] text-[var(--v2-dim)]">
              Free · Results in under 3 min · No sales call
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function V2Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-[var(--v2-line)] py-4">
      <div className="marquee-track items-center">
        {row.map((item, i) => (
          <span key={i} className="v2-marquee-item flex items-center whitespace-nowrap">
            <span className="px-7">{item}</span>
            <span className="text-[var(--v2-dim)]" aria-hidden>
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
