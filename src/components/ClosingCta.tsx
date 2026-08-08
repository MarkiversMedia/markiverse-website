"use client";

import Reveal from "./Reveal";
import { AUDIT_URL } from "./links";

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24">
      {/* animated gradient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-teal/15 via-transparent to-orange/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[900px] px-5 text-center">
        <Reveal>
          <span className="eyebrow mb-6 justify-center">The Next Move Is Yours</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mb-7 text-[clamp(2.4rem,5.4vw,4.2rem)] font-bold leading-[1.05] text-off">
            Ready to Make Your Marketing{" "}
            <span className="bg-gradient-to-r from-teal-bright to-orange-l bg-clip-text text-transparent">
              AI-Native?
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mb-5 max-w-[640px] text-lg leading-[1.85] text-mist">
            AI isn&apos;t a tool you bolt onto existing campaigns. It&apos;s a new way
            to build funnels, personalise experiences, and qualify pipeline. The
            brands figuring this out now are pulling ahead fast.
          </p>
          <p className="mx-auto mb-10 max-w-[640px] text-lg font-semibold leading-relaxed text-off">
            Start with a free DeSiRE Audit — we&apos;ll show you exactly where AI can
            work hardest for your business.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={AUDIT_URL} target="_blank" rel="noopener" className="btn-primary !px-8 !py-4 !text-base">
              Run a Free AI Marketing Audit <span aria-hidden>→</span>
            </a>
            <a href="#stories" className="btn-ghost !px-8 !py-4 !text-base">
              Explore Our Work
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
