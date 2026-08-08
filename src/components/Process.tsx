"use client";

import Reveal from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "ICP & Buyer Persona Mapping",
    body: "We define your Ideal Customer Profile with firmographic and technographic precision, and map every likely influencer in a deal — economic buyer, technical evaluator, end user, procurement.",
  },
  {
    n: "02",
    title: "Multi-Channel Execution, One System",
    body: "SEO, content, paid, ABM, and brand work run as one coordinated sequence, not separate efforts competing for the same budget line.",
  },
  {
    n: "03",
    title: "Lead Scoring & Nurturing",
    body: "Leads are scored on fit and behavior, not just form fills, so sales gets what's actually ready and marketing nurtures what isn't yet.",
  },
  {
    n: "04",
    title: "Marketing–Sales Alignment & Reporting",
    body: "A defined, shared path from visitor to MQL to SQL, with reporting both teams trust because they're reading the same numbers.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden bg-ink py-20">
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-orange/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-16">
          <span className="eyebrow mb-5">Our Process</span>
          <h2 className="display max-w-[820px] text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            How We Build{" "}
            <span className="bg-gradient-to-r from-teal-bright to-orange-l bg-clip-text text-transparent">
              Pipeline &amp; Presence
            </span>{" "}
            Together
          </h2>
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="group relative h-full pt-6">
                {/* connecting line */}
                <div className="absolute left-0 top-0 hidden h-px w-full bg-track lg:block">
                  <div className="h-full w-0 bg-gradient-to-r from-teal to-teal-bright transition-all duration-700 group-hover:w-full" />
                </div>
                <div className="absolute -top-[5px] left-0 hidden h-[11px] w-[11px] rounded-full border-2 border-teal bg-ink transition-colors duration-300 group-hover:bg-teal-bright lg:block" />

                <span className="ghost block text-6xl leading-none transition-all duration-300 group-hover:-translate-y-1">
                  {s.n}
                </span>
                <h3 className="display mb-3 mt-4 text-lg font-bold text-off">{s.title}</h3>
                <p className="text-[14px] leading-[1.8] text-mist">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
