"use client";

import { useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  BrainCircuit,
  Compass,
  Layers,
  Megaphone,
  Palette,
  Sparkles,
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
        <div className="surface-card mt-14 hidden items-stretch gap-8 rounded-[2rem] p-10 lg:grid lg:grid-cols-[340px_1fr]">
          <div className="flex h-full flex-col gap-3">
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
          <PillarDesktopPanel active={active} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Detail sections ---------- */

function PillarIntro({
  pillar,
  compact = false,
}: {
  pillar: Pillar;
  compact?: boolean;
}) {
  return (
    <div>
      {!compact && (
        <p className="eyebrow text-accent">
          Pillar {pillar.n} · {pillar.name}
        </p>
      )}
      <h3
        className={`font-display text-xl font-semibold sm:text-2xl ${compact ? "" : "mt-3"}`}
      >
        {pillar.promise}
      </h3>
      <p className="mt-3 max-w-2xl text-muted-foreground">{pillar.body}</p>
    </div>
  );
}

/* Services: a clean list, not a process chain */
function PillarServices({ pillar }: { pillar: Pillar }) {
  return (
    <div>
      <p className="eyebrow text-muted-foreground">What we deliver</p>
      <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2.5 lg:grid-cols-3">
        {pillar.chain.map((step) => (
          <li
            key={step}
            className="flex items-center gap-2.5 text-sm font-medium text-foreground"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* AI layer: quiet footer line */
function PillarAI({ pillar }: { pillar: Pillar }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">AI layer. </span>
        {pillar.ai}
      </p>
    </div>
  );
}

/* Mobile accordion body: sections in sequence, natural height */
function PillarDetail({
  pillar,
  compact = false,
}: {
  pillar: Pillar;
  compact?: boolean;
}) {
  return (
    <div>
      <PillarIntro pillar={pillar} compact={compact} />
      <div className="mt-7 border-t border-border pt-5">
        <PillarServices pillar={pillar} />
      </div>
      <div className="mt-7 border-t border-border pt-5">
        <PillarAI pillar={pillar} />
      </div>
    </div>
  );
}

/* Desktop panel: each section is stacked across ALL six pillars in one grid
   cell, so every section takes the height of its tallest variant. Result:
   the dividers, the services block and the AI line sit at fixed positions
   and nothing inside the box shifts when you switch tabs. */
function PillarStack({
  active,
  render,
}: {
  active: number;
  render: (pillar: Pillar) => ReactNode;
}) {
  return (
    <div className="grid">
      {PILLARS.map((p, i) => {
        const isActive = i === active;
        return (
          <div
            key={p.id}
            aria-hidden={!isActive}
            className={`col-start-1 row-start-1 ${isActive ? "" : "invisible pointer-events-none"}`}
          >
            {render(p)}
          </div>
        );
      })}
    </div>
  );
}

function PillarDesktopPanel({ active }: { active: number }) {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card p-8">
      <PillarStack active={active} render={(p) => <PillarIntro pillar={p} />} />
      <div className="mt-7 border-t border-border pt-5">
        <PillarStack
          active={active}
          render={(p) => <PillarServices pillar={p} />}
        />
      </div>
      {/* pinned to the bottom so the box fills the tab column's height */}
      <div className="mt-auto pt-7">
        <div className="border-t border-border pt-5">
          <PillarStack active={active} render={(p) => <PillarAI pillar={p} />} />
        </div>
      </div>
    </div>
  );
}
