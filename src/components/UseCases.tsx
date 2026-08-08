"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import { AUDIT_URL } from "./links";

const CASES = [
  {
    img: "/images/persona-cmo.jpg",
    role: "Chief Marketing Officer",
    org: "IT Infrastructure Services brand",
    question: "Who are the best IT infrastructure brands in India?",
    pain: "Your rankings are green. Your SEO report looks fine. But ChatGPT's answer doesn't include you — AI has formed an opinion about your brand, and you don't know what it is.",
    steps: [
      {
        tool: "DeSiRE",
        text: "Walk into your next board meeting with complete visibility on where you — and your competitors — stand with AI, plus reduced SEO wastage.",
      },
      {
        tool: "SEO RADAR",
        text: "Build a clear strategy to stay visible in the AI search era, with assured outcomes.",
      },
    ],
  },
  {
    img: "/images/persona-edu.jpg",
    role: "Digital Marketing Head",
    org: "Higher educational institution",
    question: "Which university should I choose for this program?",
    pain: "Families research extensively before ever picking up the phone. If AI answers weakly about you, you're out of consideration before the conversation starts — and no SEO metric fires a red flag.",
    steps: [
      {
        tool: "DeSiRE",
        text: "See exactly which AI platforms recommend you — and which send prospective families to competitors. Get exact, custom fixes.",
      },
      {
        tool: "SEO RADAR",
        text: "Own AI overviews and LLM recommendations before your next admissions cycle.",
      },
    ],
  },
  {
    img: "/images/persona-auto.jpg",
    role: "Business Development Manager",
    org: "Local automobile dealer",
    question: "Which is the best dealership near me to buy a car?",
    pain: "Your showrooms are visible and your website ranks. But AI's answer names three competitors and a review aggregator — not you. The shortlist forms before anyone visits a showroom.",
    steps: [
      {
        tool: "DeSiRE",
        text: "Find out which AI recommends your competitors while buyers are still deciding. Get step-by-step fixes.",
      },
      {
        tool: "SEO RADAR",
        text: "Get your brand into AI answers before the test drive is booked elsewhere.",
      },
    ],
  },
];

function FlipCard({ c, index }: { c: (typeof CASES)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  return (
    <Reveal delay={index * 0.1}>
      <div className="h-[510px]" style={{ perspective: 1400 }}>
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {/* ---------- front ---------- */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-line bg-panel"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="relative flex-none overflow-hidden" style={{ height: 136 }}>
              <Image
                src={c.img}
                alt={`${c.role} — ${c.org}`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent" />
              <div className="absolute bottom-3 left-5 right-5">
                <div className="display text-lg font-bold text-off">{c.role}</div>
                <div className="text-[15px] font-semibold text-off/90">{c.org}</div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              {/* the buyer's AI question, chat-style */}
              <div className="mb-4 rounded-2xl rounded-bl-none border border-teal/30 bg-teal/10 px-4 py-3">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-teal-bright">
                  Buyer asks
                </span>
                <span className="text-[15px] font-semibold italic leading-snug text-off">
                  &ldquo;{c.question}&rdquo;
                </span>
              </div>

              <p className="flex-1 text-[14px] leading-[1.75] text-mist">{c.pain}</p>

              <button
                onClick={() => setFlipped(true)}
                className="btn-ghost mt-4 w-full justify-center !py-3 !text-sm"
              >
                See the fix <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          {/* ---------- back ---------- */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-teal/40 bg-panel p-6"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-teal-bright">
              What we offer you
            </div>
            <div className="display mb-5 text-xl font-bold text-off">{c.role}</div>

            <div className="flex flex-1 flex-col gap-4">
              {c.steps.map((s, j) => (
                <div
                  key={s.tool}
                  className={`rounded-2xl border p-4 ${
                    j === 0 ? "border-teal/30 bg-teal/5" : "border-orange/30 bg-orange/5"
                  }`}
                >
                  <div
                    className={`mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] ${
                      j === 0 ? "text-teal-bright" : "text-orange-l"
                    }`}
                  >
                    <span
                      className={`display flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                        j === 0 ? "bg-teal/15" : "bg-orange/15"
                      }`}
                    >
                      {j + 1}
                    </span>
                    {s.tool}
                  </div>
                  <p className="text-[13.5px] leading-[1.7] text-off/80">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setFlipped(false)}
                className="text-sm font-semibold text-mist transition-colors hover:text-off"
              >
                ← Back
              </button>
              <a href={AUDIT_URL} target="_blank" rel="noopener" className="link-arrow text-sm">
                Start with DeSiRE <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

export default function UseCases() {
  return (
    <section id="usecases" className="relative bg-navy py-20">
      <div className="mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-14">
          <span className="eyebrow mb-5">Problems &amp; Use Cases</span>
          <h2 className="display max-w-[860px] text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Real AI SEO Challenges.{" "}
            <span className="text-orange-l">Actionable Solutions.</span>
          </h2>
          <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-mist">
            Transformative AI SEO platforms that your board can get behind — because
            it starts with your own data. Find your story below, then flip the card.
          </p>
        </Reveal>

        <div className="grid gap-7 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <FlipCard key={c.role} c={c} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
