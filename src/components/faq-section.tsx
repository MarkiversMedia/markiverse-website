"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./reveal";

const FAQS = [
  {
    q: "Can we start with just one pillar?",
    a: "Yes. Most engagements start with Strategy or Demand, then expand as the data shows where the leak is. Every pillar is built to plug into the others later without a rebuild.",
  },
  {
    q: "What does “sharpened by AI” actually mean?",
    a: "AI runs inside our workflow, not as a bolt-on: research and clustering, positioning stress-tests, generative creative variants, predictive lead scoring, and weekly monitoring of how AI engines describe your brand. Strategists still make the calls.",
  },
  {
    q: "How do you report on impact?",
    a: "One dashboard covering AI visibility, pipeline sourced and influenced, conversion by stage, and channel-level attribution — reviewed monthly with your leadership team.",
  },
  {
    q: "Do you replace our in-house team?",
    a: "No. We plug into it. Typically we own the systems and the heavy lifting while your team owns product knowledge, approvals and relationships.",
  },
];

export function FaqSection() {
  return (
    <section id="faqs" className="pt-14 pb-20 sm:pt-16 sm:pb-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="min-w-0">
          <p className="eyebrow text-accent">FAQs</p>
          <h2 className="mt-4 heading-h2">
            The questions we get on the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 heading-accent text-accent">
                first call
              </span>
            </span>
            .
          </h2>
        </div>
        <Accordion.Root type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 80}>
              <Accordion.Item value={faq.q} className="border-b border-border">
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    // Form-filler browser extensions stamp `fdprocessedid` on
                    // buttons before hydration; ignore that attribute diff.
                    suppressHydrationWarning
                    className="flex flex-1 cursor-pointer items-center justify-between py-4 text-left font-display text-lg font-semibold transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    {faq.q}
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-4 pt-0 text-base text-muted-foreground">
                    {faq.a}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Reveal>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
