"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { CONTACT_URL } from "./links";

const NUMBERS = [
  { to: 100, suffix: "K+", label: "leads generated for clients since inception" },
  { to: 99, suffix: "%", label: "client retention rate, year-on-year" },
  { to: 10, suffix: "x", label: "ROI achieved through tailored strategies" },
  { to: 10, suffix: "+", label: "years of experience driving measurable results" },
];

const link =
  "font-semibold text-teal-bright underline decoration-teal/40 underline-offset-4 transition-colors hover:text-off hover:decoration-teal";

const REASONS = [
  {
    icon: "◎",
    title: "Services Built Around the Buyer Journey",
    body: (
      <>
        Enterprise deals move through procurement, technical evaluators, and
        finance approval — often over several months. Anchored in the{" "}
        <a href="#" className={link}>
          Eugene Schwartz model
        </a>{" "}
        of market sophistication, we build separate messaging tracks for every
        stakeholder in the buying committee.
      </>
    ),
  },
  {
    icon: "⬡",
    title: "Full-Stack, Not Just Channels",
    body: (
      <>
        Every service runs as part of one connected stack, not a menu of
        isolated tactics. As an AI-led B2B digital marketing agency, our work
        spans the full journey from first search to signed deal.
      </>
    ),
  },
  {
    icon: "◈",
    title: "Data-Driven, ROI-Accountable Engagements",
    body: (
      <>
        As a B2B digital marketing agency in India, we understand better than
        anyone else that marketing leaders report pipeline and revenue
        contribution to the board, not &ldquo;engagement.&rdquo; Our reporting
        is built the same way — tracking what actually moves a deal forward,
        not vanity metrics.{" "}
        <a href={CONTACT_URL} className={link}>
          Get exact figures available on request.
        </a>
      </>
    ),
  },
  {
    icon: "✦",
    title: "Smarter Funnels With AI at Every Stage",
    body: (
      <>
        We build funnels powered by AI at every stage — content and SEO that
        finds the right buyers,{" "}
        <a href="#" className={link}>
          AI-powered website personalization
        </a>{" "}
        that adapts to each visitor&apos;s role and intent, and intelligent
        lead scoring that tells sales exactly when a prospect is ready to talk.
      </>
    ),
  },
];

const PILLS = ["AI-Led", "Full-Stack", "ROI-Accountable", "Buyer-Journey First"];

export default function Why() {
  return (
    <section className="relative bg-navy py-20">
      <div className="mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-10">
          <span className="eyebrow mb-5">Why Markiverse</span>
          <h2 className="display max-w-[820px] text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Enterprise &amp; B2B Brands{" "}
            <span className="text-orange-l">Choose Markiverse</span>
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
          {/* ---------- the story: one flowing checklist ---------- */}
          <div className="flex flex-col justify-between gap-6">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.08}>
                <div className="group flex gap-5">
                  <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-teal/10 text-base text-teal-bright transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="display mb-1.5 text-[16px] font-bold text-off">
                      {r.title}
                    </h3>
                    <p className="text-[14px] leading-[1.7] text-mist">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---------- the proof: numbers talk panel ---------- */}
          <Reveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-panel via-panel to-ink p-6">
              {/* animated top rule */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-teal via-teal-bright to-orange"
              />
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal/10 blur-[90px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange/5 blur-[90px]" />

              <div className="relative mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-bright">
                  Numbers Talk
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist">
                  Proof, not promises
                </span>
              </div>

              <div className="relative grid flex-1 grid-cols-2 gap-3">
                {NUMBERS.map((n, i) => (
                  <motion.div
                    key={n.label}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex flex-col items-center justify-center rounded-2xl border border-line bg-veil px-4 py-4 text-center"
                  >
                    <span className="display bg-gradient-to-br from-off via-off to-mist bg-clip-text text-[clamp(1.7rem,2.3vw,2.2rem)] font-bold leading-none text-transparent transition-all duration-500 group-hover:from-teal-bright group-hover:via-teal-bright group-hover:to-orange-l">
                      <Counter to={n.to} suffix={n.suffix} once={false} />
                    </span>
                    <span className="mt-2 max-w-[180px] text-[12px] leading-relaxed text-mist">
                      {n.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-4 flex flex-wrap gap-2">
                {PILLS.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-line px-3.5 py-1 text-[11.5px] font-semibold text-mist transition-colors hover:border-teal/40 hover:text-teal-bright"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
