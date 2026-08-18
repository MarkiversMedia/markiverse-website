"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";

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

export function V2Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10 lg:pb-24">
      <Reveal>
        <p className="v2-label mb-12">Questions/</p>
      </Reveal>

      <div className="max-w-[880px]">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.03}>
              <div className="border-t border-[var(--v2-line)] last:border-b">
                <button
                  className="flex w-full items-baseline gap-6 py-6 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="v2-mono w-9 flex-none text-[12px] text-[var(--v2-dim)]">
                    0{i + 1}/
                  </span>
                  <span className="display flex-1 text-[17px] font-medium text-[var(--v2-fg)]">
                    {f.q}
                  </span>
                  <span
                    className={`v2-mono flex-none text-[15px] transition-colors ${
                      isOpen ? "text-[var(--v2-fg)]" : "text-[var(--v2-dim)]"
                    }`}
                    aria-hidden
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[720px] pb-7 pl-[60px] text-[14px] leading-[2] text-[var(--v2-mut)]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
