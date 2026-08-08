"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "What does Markiverse do?",
    a: "Markiverse is an AI-led digital marketing, communications, and MarTech agency offering Web Design & Development, Digital Marketing, Content Development, Brand Design & Strategy, Video Development, and Demand Generation — for enterprise, B2B, and education sector clients.",
  },
  {
    q: "What is the DeSiRE Audit?",
    a: "DeSiRE is Markiverse's free AI visibility audit. It measures how often and how confidently AI platforms — ChatGPT, Google AI Overviews, Gemini — recommend your brand when buyers ask questions in your category. Most enterprise marketing teams are surprised by the result.",
  },
  {
    q: "What is SEO RADAR?",
    a: "SEO RADAR is Markiverse's paid AI visibility retainer — the system that closes the gap the DeSiRE Audit reveals, and tracks your AI recommendation score weekly so leadership always knows where the brand stands.",
  },
  {
    q: "Is this just SEO?",
    a: "No. Traditional SEO measures where you rank on Google. DeSiRE and SEO RADAR measure whether AI confidently recommends you when buyers ask questions — which is a different problem requiring a different approach.",
  },
  {
    q: "Do you specialize in B2B and enterprise marketing?",
    a: "Yes. Enterprise and B2B engagements — particularly in technology, telecom, and education — are core to our work, with strategies built around longer sales cycles, multiple decision-makers, and the AI search behaviour of sophisticated buyers.",
  },
  {
    q: "How long does it take to see results from SEO RADAR?",
    a: "Most clients see measurable improvement in their AI confidence score within 60–90 days. Traditional SEO rankings follow within three to six months, compounding over twelve months and beyond.",
  },
  {
    q: "What marketing automation and CRM platforms do you work with?",
    a: "We work on all leading CRM platforms, including Go High Level, Zoho, Salesforce and HubSpot, which we have extensive experience leveraging for 360-degree marketing and lead generation campaigns.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative bg-navy py-20">
      <div className="mx-auto max-w-[860px] px-5">
        <Reveal className="mb-14 text-center">
          <span className="eyebrow mb-5 justify-center">FAQs</span>
          <h2 className="display text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Questions, <span className="text-teal-bright">Answered</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-3.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-teal/40 bg-panel" : "border-line bg-panel/60 hover:border-line2"
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="display text-[1.05rem] font-bold text-off">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border text-lg ${
                        isOpen
                          ? "border-teal bg-teal/15 text-teal-bright"
                          : "border-line2 text-mist"
                      }`}
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-[14.5px] leading-[1.9] text-mist">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
