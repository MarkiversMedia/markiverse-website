"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile accordion: open the tapped pillar and bring it to the top of the
  // viewport (just under the fixed 4rem header) so its content is readable
  // without hunting for it.
  const openOnMobile = (i: number) => {
    setActive(i);
    requestAnimationFrame(() => {
      const el = itemRefs.current[i];
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  return (
    <section id="pillars" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="eyebrow text-accent">The operating model</p>
            <h2 className="mt-4 max-w-3xl heading-h2">
              Most agencies sell services.
              <br />
              <span className="heading-accent text-accent">
                We run{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 heading-accent text-foreground">
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

        {/* Mobile / tablet: accordion — every pillar visible, one open at a time */}
        <div className="surface-card mt-14 rounded-[2rem] p-3 lg:hidden">
          {PILLARS.map((p, i) => {
            const open = i === active;
            return (
              <div
                key={p.id}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={`scroll-mt-20 rounded-2xl border transition-colors ${open ? "border-accent/40 bg-accent/10" : "border-transparent"} ${i > 0 ? "mt-2" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => openOnMobile(i)}
                  aria-expanded={open}
                  aria-controls={`pillar-panel-${p.id}`}
                  suppressHydrationWarning
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left ${open ? "text-foreground" : "text-muted-foreground"}`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${open ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}`}
                  >
                    <p.icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 font-display text-base font-semibold">
                    {p.n} · {p.name}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div
                    id={`pillar-panel-${p.id}`}
                    className="animate-in fade-in-0 slide-in-from-top-1 px-4 pb-5 duration-200"
                  >
                    <PillarDetail pillar={p} compact />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: tab list + detail panel */}
        <div className="surface-card mt-14 hidden gap-8 rounded-[2rem] p-10 lg:grid lg:grid-cols-[340px_1fr]">
          <div className="flex flex-col gap-3">
            {PILLARS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                suppressHydrationWarning
                className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all ${i === active ? "border-accent/40 bg-accent/10 text-foreground" : "border-border bg-card text-muted-foreground hover:border-border hover:bg-secondary"}`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${i === active ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
                >
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="font-display text-base font-semibold">
                  {p.n} · {p.name}
                </span>
              </button>
            ))}
          </div>
          <PillarDetail pillar={pillar} />
        </div>
      </div>
    </section>
  );
}

function PillarDetail({
  pillar,
  compact = false,
}: {
  pillar: Pillar;
  compact?: boolean;
}) {
  return (
    <div>
      {!compact && (
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
            <pillar.icon className="h-5 w-5" />
          </span>
          <div>
            <p className="eyebrow text-accent">Pillar {pillar.n}</p>
            <h3 className="font-display text-2xl font-bold">{pillar.name}</h3>
          </div>
        </div>
      )}
      <p
        className={`font-display text-xl font-semibold sm:text-2xl ${compact ? "" : "mt-6"}`}
      >
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
  );
}
