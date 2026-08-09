"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Counter from "./Counter";

const STATS = [
  { to: 92, suffix: "%", label: "of searches showing an AI Overview end without a click on any search result*" },
  { to: 48, suffix: "hrs", label: "for a complete DeSiRE brand diagnostic" },
  { to: 3, prefix: "<", suffix: " min", label: "to run your first free AI audit" },
  { to: 90, prefix: "60–", label: "days to measurable AI confidence score improvement" },
];

export default function Shift() {
  return (
    <section id="shift" className="relative overflow-hidden bg-navy py-20">
      {/* ghost backdrop word */}
      <div
        aria-hidden
        className="ghost pointer-events-none absolute -right-10 top-8 text-[clamp(6rem,16vw,14rem)] leading-none"
      >
        SHIFT
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5">
        <Reveal>
          <span className="eyebrow mb-5">The Shift</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="display mb-8 max-w-[880px] text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.06] text-off">
            In the AI Era,{" "}
            <span className="bg-gradient-to-r from-teal-bright to-orange-l bg-clip-text text-transparent">
              Recommendations
            </span>{" "}
            Matter More Than Rankings.
          </h2>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal delay={0.12}>
              <p className="mb-5 max-w-[620px] text-[1.05rem] leading-[1.9] text-mist">
                Until recently, a buyer looking to solve a problem simply Googled it.
                If your SEO got your brand onto page one, your job was done. Today,
                buyers consult multiple sources before a single sales conversation —
                Google, AI Overviews, ChatGPT, Gemini, LinkedIn, industry reviews, and
                peer recommendations.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mb-5 max-w-[620px] text-[1.05rem] leading-[1.9] text-mist">
                And here&apos;s what makes the shift so significant:{" "}
                <strong className="text-off">
                  most buyers never scroll past the AI Overview.
                </strong>{" "}
                Many don&apos;t open a single search result. If AI doesn&apos;t mention
                or cite your brand in its answer, you&apos;re losing the conversation
                entirely.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="max-w-[620px] rounded-xl border-l-4 border-orange bg-gradient-to-r from-orange/10 to-transparent p-5 text-[1.02rem] font-semibold leading-relaxed text-off">
                Fortune 1000 marketing leaders are working with Markiverse to find out
                and fix this SEO gap that&apos;s costing them millions.
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <motion.div

                  className="card-glow flex h-full flex-col justify-between rounded-2xl border border-line bg-panel p-6"
                >
                  <div className="display text-[clamp(2rem,3.4vw,2.9rem)] font-bold text-teal-bright">
                    <Counter to={s.to} suffix={s.suffix ?? ""} prefix={s.prefix ?? ""} once={false} />
                  </div>
                  <div className="mt-3 text-[13px] leading-relaxed text-mist">{s.label}</div>
                </motion.div>
              </Reveal>
            ))}
            <p className="col-span-2 text-[11px] text-dim">
              *Source:{" "}
              <a
                href="https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/"
                target="_blank"
                rel="noopener"
                className="underline transition-colors hover:text-teal-bright"
              >
                Pew Research Center, July 2025
              </a>{" "}
              — analysis of 68,879 real Google searches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
