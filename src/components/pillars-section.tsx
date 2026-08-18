"use client";

import { useState } from "react";
import {
  BrainCircuit,
  Compass,
  Layers,
  Megaphone,
  Palette,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type Pillar = {
  id: string;
  n: string;
  name: string;
  icon: LucideIcon;
  promise: string;
  body: string;
  chain: string[];
  ai: string;
};

const PILLARS: Pillar[] = [
  {
    id: "strategy",
    n: "01",
    name: "Strategy",
    icon: Compass,
    promise: "Know exactly who to win, and why they should pick you.",
    body: "We size the market, sharpen the ICP, and write positioning your buyers repeat back to you. Then we map the real customer journey and turn it into a growth strategy with named bets and numbers attached.",
    chain: ["Market", "ICP", "Positioning", "Customer journey", "Growth strategy"],
    ai: "AI clusters buyer signals, review data and competitor language to pressure-test positioning before a rupee is spent.",
  },
  {
    id: "experience",
    n: "02",
    name: "Experience",
    icon: Layers,
    promise: "Every touchpoint feels like it was built for that one buyer.",
    body: "Brand systems, websites and product-grade UX that carry the story from first impression to signed contract — with personalisation that adapts to industry, role and intent.",
    chain: ["Brand", "Website", "UX", "Digital experience", "Personalisation"],
    ai: "Real-time intent models reshape hero copy, proof and CTAs per visitor segment.",
  },
  {
    id: "demand",
    n: "03",
    name: "Demand",
    icon: Megaphone,
    promise: "Be the answer — in search, in AI, and in the inbox.",
    body: "SEO and GEO so AI engines recommend you, paid that compounds instead of leaking, ABM for the accounts that matter, and content plus outbound working the same list.",
    chain: ["SEO", "GEO", "Paid", "ABM", "Campaigns", "Content", "Outbound"],
    ai: "We track how ChatGPT, Gemini, Perplexity and AI Overviews describe your brand — weekly — and close the gaps.",
  },
  {
    id: "revenue",
    n: "04",
    name: "Revenue",
    icon: Workflow,
    promise: "Turn interest into pipeline your sales team actually works.",
    body: "CRM built around how you really sell, marketing automation that nurtures instead of nags, disciplined lead management, and enablement assets that shorten the deal.",
    chain: [
      "CRM",
      "Marketing automation",
      "Lead management",
      "Sales enablement",
      "Conversion",
    ],
    ai: "Predictive scoring routes the right lead to the right rep with the next best action already written.",
  },
  {
    id: "intelligence",
    n: "05",
    name: "Intelligence",
    icon: BrainCircuit,
    promise: "One version of the truth, from click to closed-won.",
    body: "Clean data foundations, analytics leadership trusts, multi-touch attribution across the messy real journey, and customer intelligence that tells you what to do next.",
    chain: ["Data", "Analytics", "Attribution", "AI", "Customer intelligence"],
    ai: "Models surface churn risk, expansion signals and spend waste before your monthly review does.",
  },
  {
    id: "creative",
    n: "06",
    name: "Creative",
    icon: Palette,
    promise: "Work that is impossible to scroll past — and easy to remember.",
    body: "Brand identity, design systems, video and storytelling built for the platforms your buyers actually live on, produced at campaign speed.",
    chain: ["Brand", "Design", "Video", "Storytelling", "Campaigns"],
    ai: "Generative tooling multiplies variants; our strategists and directors decide what ships.",
  },
];

export function PillarsSection() {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active] ?? PILLARS[0];

  return (
    <section id="pillars" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-accent">The operating model</p>
            <h2 className="mt-4 max-w-3xl heading-h2">
              Most agencies sell services.
              <br />
              <span className="heading-accent text-accent">
                We run{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 heading-accent text-ink-black">
                    six
                  </span>
                </span>{" "}
                connected systems.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Each pillar stands on its own. Together they compound — strategy
              informs experience, experience feeds demand, demand fuels
              revenue, and intelligence rewires all of it.
            </p>
          </div>
          <figure className="surface-card overflow-hidden rounded-[1.75rem] p-3">
            <video
              src="/assets/f1-strategist-sketch.mp4"
              poster="/assets/f1-strategist-poster.jpg"
              width={1024}
              height={1024}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Race strategist on the pit wall, speaking into his headset mic and counting up six fingers before a fist pump"
              className="w-full rounded-[1.25rem] object-cover"
            />
            <figcaption className="eyebrow px-2 pb-1 pt-3 text-muted-foreground">
              The strategist on the mic — six pillars, one clear call
            </figcaption>
          </figure>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {PILLARS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                suppressHydrationWarning
                className={`flex min-w-[190px] items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all ${i === active ? "border-accent/40 bg-accent/10 text-foreground" : "border-border bg-card/40 text-muted-foreground hover:border-border hover:bg-card"}`}
              >
                <p.icon
                  className={`h-5 w-5 shrink-0 ${i === active ? "text-accent" : "text-muted-foreground"}`}
                />
                <span className="font-display text-base font-semibold">
                  {p.n} · {p.name}
                </span>
              </button>
            ))}
          </div>
          <div className="surface-card rounded-2xl p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <pillar.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow text-accent">Pillar {pillar.n}</p>
                <h3 className="font-display text-2xl font-bold">
                  {pillar.name}
                </h3>
              </div>
            </div>
            <p className="mt-6 font-display text-xl font-semibold sm:text-2xl">
              {pillar.promise}
            </p>
            <p className="mt-4 max-w-2xl text-muted-foreground">{pillar.body}</p>
            <div className="mt-7 flex flex-wrap items-center gap-2">
              {pillar.chain.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-sm">
                    {step}
                  </span>
                  {i < pillar.chain.length - 1 && (
                    <span className="text-accent">→</span>
                  )}
                </span>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-accent/25 bg-accent/10 p-5">
              <p className="eyebrow text-accent">AI layer</p>
              <p className="mt-2 text-sm text-muted-foreground">{pillar.ai}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
