"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  BrainCircuit,
  ChevronDown,
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

/* Hub geometry: six nodes on a ring around the client, in a 100×100 box. */
const RING_R = 36;
const NODE_POS = PILLARS.map((_, i) => {
  const a = ((i * 60 - 90) * Math.PI) / 180;
  return { x: 50 + RING_R * Math.cos(a), y: 50 + RING_R * Math.sin(a) };
});

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
          {/* On desktop the video lives behind the hub below; here it's the
              mobile/tablet visual only. */}
          <figure className="surface-card overflow-hidden rounded-[1.75rem] p-3 lg:hidden">
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
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      id={`pillar-panel-${p.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-5">
                        <PillarDetail pillar={p} compact />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Desktop: hub + detail panel */}
        <div className="surface-card mt-14 hidden items-stretch gap-10 rounded-[2rem] p-10 lg:grid lg:grid-cols-[440px_1fr]">
          <PillarHub active={active} onSelect={setActive} />
          <PillarDesktopPanel active={active} />
        </div>
      </div>
    </section>
  );
}

/* ---------- The hub: six pillars around the client ---------- */

function PillarHub({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const hex = NODE_POS.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border">
      {/* Background: the strategist video, ghosted under the hub */}
      <video
        src="/assets/f1-strategist-sketch.mp4"
        poster="/assets/f1-strategist-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--card)_35%,transparent),color-mix(in_oklab,var(--card)_55%,transparent))]"
      />
      <div className="relative z-10 flex h-full flex-col justify-center px-6 py-8">
      <div className="relative mx-auto aspect-square w-full max-w-[400px]">
        {/* Lines */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* slow outer orbit */}
          <motion.circle
            cx="50"
            cy="50"
            r={RING_R + 6}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="1.2 2.4"
            vectorEffect="non-scaling-stroke"
            className="text-foreground/[0.07]"
            style={{ transformOrigin: "50% 50%" }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 90, ease: "linear", repeat: Infinity }}
          />
          {/* mesh: everything is connected to everything */}
          <polygon
            points={hex}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            className="text-foreground/[0.07]"
          />
          {/* spokes to the client */}
          {NODE_POS.map((p, i) => {
            const isActive = i === active;
            return (
              <g key={PILLARS[i].id}>
                <line
                  x1="50"
                  y1="50"
                  x2={p.x}
                  y2={p.y}
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className="text-foreground/[0.07]"
                />
                {isActive && (
                  <motion.line
                    key={`active-${i}`}
                    x1={p.x}
                    y1={p.y}
                    x2="50"
                    y2="50"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="1.6 2.2"
                    vectorEffect="non-scaling-stroke"
                    className="text-accent"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      strokeDashoffset: reduce ? 0 : [0, -7.6],
                    }}
                    transition={{
                      opacity: { duration: 0.25 },
                      strokeDashoffset: {
                        duration: 1.1,
                        ease: "linear",
                        repeat: Infinity,
                      },
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Centre: the client */}
        <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-border/60 bg-card/55 text-center shadow-[0_8px_30px_-12px_rgba(0,0,0,0.2)] backdrop-blur-[2px]">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-accent/30"
            animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
          />
          <span className="eyebrow text-muted-foreground">Built around</span>
          <span className="mt-1 font-display text-lg font-bold leading-tight">
            your growth
          </span>
        </div>

        {/* Nodes */}
        {PILLARS.map((p, i) => {
          const pos = NODE_POS[i];
          const isActive = i === active;
          return (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onSelect(i)}
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              aria-pressed={isActive}
              suppressHydrationWarning
              className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 font-display text-sm font-semibold shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/60 ${
                isActive
                  ? "border-accent/80 bg-accent/85 text-accent-foreground backdrop-blur-[2px]"
                  : "border-border/60 bg-card/40 text-foreground/80 backdrop-blur-[2px] hover:border-accent/40 hover:bg-card/60 hover:text-foreground"
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              animate={{ scale: isActive ? 1.08 : 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              {isActive && (
                <motion.span
                  layoutId="pillar-halo"
                  aria-hidden="true"
                  className="absolute -inset-1.5 rounded-full border-2 border-accent/35"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${isActive ? "bg-accent-foreground/15" : "bg-foreground/[0.06]"}`}
              >
                <p.icon className="h-3.5 w-3.5" />
              </span>
              {p.name}
            </motion.button>
          );
        })}
      </div>
      <p className="mx-auto mt-5 max-w-[380px] rounded-xl bg-card/55 px-4 py-2 text-center text-xs leading-relaxed text-foreground/75 backdrop-blur-[2px]">
        One client at the centre, six systems working on it at once. Hover any
        pillar to see what we run there.
      </p>
      </div>
    </div>
  );
}

/* ---------- Detail sections ---------- */

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

function PillarIntro({
  pillar,
  compact = false,
  live = true,
}: {
  pillar: Pillar;
  compact?: boolean;
  live?: boolean;
}) {
  return (
    <motion.div
      variants={sectionVariants}
      initial={false}
      animate={live ? "show" : "hidden"}
    >
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
    </motion.div>
  );
}

/* Services: a clean list, not a process chain */
function PillarServices({
  pillar,
  live = true,
}: {
  pillar: Pillar;
  live?: boolean;
}) {
  return (
    <motion.div
      variants={listVariants}
      initial={false}
      animate={live ? "show" : "hidden"}
    >
      <p className="eyebrow text-muted-foreground">What we deliver</p>
      <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2.5 lg:grid-cols-3">
        {pillar.chain.map((step) => (
          <motion.li
            key={step}
            variants={itemVariants}
            className="flex items-center gap-2.5 text-sm font-medium text-foreground"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            {step}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* AI layer: quiet footer line, lands last */
function PillarAI({ pillar, live = true }: { pillar: Pillar; live?: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
        },
      }}
      initial={false}
      animate={live ? "show" : "hidden"}
      className="flex items-start gap-3"
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">AI layer. </span>
        {pillar.ai}
      </p>
    </motion.div>
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
   and nothing inside the box shifts when you switch pillars — only the
   words animate in. */
function PillarStack({
  active,
  render,
}: {
  active: number;
  render: (pillar: Pillar, live: boolean) => ReactNode;
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
            {render(p, isActive)}
          </div>
        );
      })}
    </div>
  );
}

function PillarDesktopPanel({ active }: { active: number }) {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-border bg-card p-8">
      <PillarStack
        active={active}
        render={(p, live) => <PillarIntro pillar={p} live={live} />}
      />
      <div className="mt-7 border-t border-border pt-5">
        <PillarStack
          active={active}
          render={(p, live) => <PillarServices pillar={p} live={live} />}
        />
      </div>
      {/* pinned to the bottom so the box fills the hub's height */}
      <div className="mt-auto pt-7">
        <div className="border-t border-border pt-5">
          <PillarStack
            active={active}
            render={(p, live) => <PillarAI pillar={p} live={live} />}
          />
        </div>
      </div>
    </div>
  );
}
