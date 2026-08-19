"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, CircleArrowRight, Target } from "lucide-react";
import { CosmicFunnel, CosmicTier } from "./cosmic-funnel";

type Tone = "positive" | "negative" | "neutral";

type Stage = {
  id: string;
  title: string;
  value: number;
  percent: number;
  label: string;
  sub: string;
  color: string;
  stats: { label: string; value: string; sub?: string; tone: Tone }[];
};

const STAGES: Stage[] = [
  {
    id: "unaware",
    title: "Unaware",
    value: 100000,
    percent: 100,
    label: "total addressable audience",
    sub: "Buyers who don't yet know they have a problem",
    color: "var(--brand-blue)",
    stats: [
      {
        label: "addressable audience",
        value: "100,000",
        sub: "Target accounts + search universe",
        tone: "neutral",
      },
      {
        label: "brand impressions",
        value: "12,450",
        sub: "12.5% share of voice",
        tone: "neutral",
      },
      {
        label: "category searches",
        value: "68,200",
        sub: "Unbranded, problem-blind queries",
        tone: "neutral",
      },
    ],
  },
  {
    id: "problem-aware",
    title: "Problem Aware",
    value: 28400,
    percent: 28.4,
    label: "problem-aware buyers",
    sub: "They feel the pain — but not your name",
    color: "var(--brand-amber)",
    stats: [
      {
        label: "problem-aware reach",
        value: "28,400",
        sub: "From pain-point content",
        tone: "neutral",
      },
      {
        label: "content engagement",
        value: "8,952",
        sub: "31% engaged share",
        tone: "positive",
      },
      {
        label: "brand recall",
        value: "4.2%",
        sub: "vs 9% benchmark",
        tone: "negative",
      },
    ],
  },
  {
    id: "solution-aware",
    title: "Solution Aware",
    value: 8952,
    percent: 31.5,
    label: "solution-aware buyers",
    sub: "Comparing categories, not vendors",
    color: "var(--brand-orange)",
    stats: [
      {
        label: "solution-aware reach",
        value: "8,952",
        sub: "Comparison + how-to traffic",
        tone: "neutral",
      },
      {
        label: "pages per session",
        value: "2.8",
        sub: "vs 3.2 benchmark",
        tone: "negative",
      },
      {
        label: "email captures",
        value: "1,241",
        sub: "14% capture rate",
        tone: "positive",
      },
    ],
  },
  {
    id: "product-aware",
    title: "Product Aware",
    value: 1241,
    percent: 13.9,
    label: "product-aware buyers",
    sub: "They know you — now they need proof",
    color: "var(--brand-lime)",
    stats: [
      {
        label: "product-aware reach",
        value: "1,241",
        sub: "Demo + pricing + case-study views",
        tone: "neutral",
      },
      {
        label: "demo requests",
        value: "310",
        sub: "25% demo intent rate",
        tone: "positive",
      },
      {
        label: "sales accepted",
        value: "198",
        sub: "64% SAL conversion",
        tone: "positive",
      },
    ],
  },
  {
    id: "most-aware",
    title: "Most Aware",
    value: 198,
    percent: 15.9,
    label: "most-aware buyers",
    sub: "Ready to buy — remove friction",
    color: "var(--brand-green)",
    stats: [
      {
        label: "most-aware reach",
        value: "198",
        sub: "Proposal + negotiation stage",
        tone: "neutral",
      },
      { label: "closed-won", value: "67", sub: "34% win rate", tone: "positive" },
      {
        label: "avg. deal size",
        value: "$42k",
        sub: "Pipeline velocity +2.1x",
        tone: "positive",
      },
    ],
  },
];

const STAGE_NOTES: Record<string, string> = {
  unaware:
    "The biggest pool knows nothing. SEO RADAR would map the full category search universe, then build educational content and authority links that introduce the problem before the product.",
  "problem-aware":
    "Buyers feel the pain but don't connect it to your brand. SEO RADAR would sharpen problem-led landing pages, social proof and retargeting to lift brand recall above the benchmark.",
  "solution-aware":
    "They are comparing categories, not vendors. SEO RADAR would create comparison hubs, ROI calculators and case studies that move buyers from 'why change' to 'why you'.",
  "product-aware":
    "Intent is high; proof is the deciding factor. SEO RADAR would tighten demo pages, add pricing context, testimonials and one-click booking to protect this valuable stage.",
  "most-aware":
    "These buyers are ready to sign. SEO RADAR would remove final friction — faster forms, proposal content, objection handling and sales enablement — to protect revenue and deal velocity.",
};

const CHANNEL_MIX: { label: string; value: number; target: number; tone: Tone }[] =
  [
    { label: "Organic Search", value: 49.4, target: 53, tone: "negative" },
    { label: "Paid Search", value: 6.3, target: 15, tone: "neutral" },
    { label: "Social", value: 2.7, target: 5, tone: "neutral" },
    { label: "Other", value: 41.6, target: 27, tone: "positive" },
  ];

const AWARENESS_PAGES = [
  {
    path: "/",
    total: 9250,
    sessions: 9250,
    channel: "Organic Search",
    channelValue: 11680,
  },
  {
    path: "/product/activate",
    total: 1479,
    sessions: 1479,
    channel: "Direct",
    channelValue: 6590,
  },
  {
    path: "/blog/data-observability-best-practices",
    total: 420,
    sessions: 420,
    channel: "Referral",
    channelValue: 2611,
  },
  {
    path: "/blog/observability-vs-monitoring",
    total: 395,
    sessions: 395,
    channel: "Paid Search",
    channelValue: 1735,
  },
  {
    path: "/blog/schema-drift-detection",
    total: 298,
    sessions: 298,
    channel: "Email",
    channelValue: 1024,
  },
];

const nf = (n: number) => n.toLocaleString("en-US");

const OPPORTUNITY_ROWS = [
  {
    page: "/demo",
    type: "Conversion",
    impr: 22927,
    clicks: 198,
    ctr: 0.9,
    pos: 8.7,
    findings: [
      {
        finding: "High impressions · low CTR",
        suggestion: "Rewrite title tag",
        confidence: 95,
      },
      {
        finding: "Page 1 edge · push to top 3",
        suggestion: "Boost internal links & update content",
        confidence: 71,
      },
    ],
  },
  {
    page: "/pricing/quote",
    type: "Money",
    impr: 11361,
    clicks: 209,
    ctr: 1.8,
    pos: 7.5,
    findings: [
      {
        finding: "High impressions · low CTR",
        suggestion: "Rewrite title tag",
        confidence: 95,
      },
      {
        finding: "Page 1 edge · push to top 3",
        suggestion: "Boost internal links & update content",
        confidence: 78,
      },
    ],
  },
  {
    page: "/pricing",
    type: "Money",
    impr: 7610,
    clicks: 73,
    ctr: 1.0,
    pos: 6.3,
    findings: [
      {
        finding: "High impressions · low CTR",
        suggestion: "Rewrite title tag",
        confidence: 95,
      },
      {
        finding: "Page 1 edge · push to top 3",
        suggestion: "Boost internal links & update content",
        confidence: 84,
      },
    ],
  },
  {
    page: "/product/activate",
    type: "Money",
    impr: 2634,
    clicks: 34,
    ctr: 1.3,
    pos: 5.1,
    findings: [
      {
        finding: "High impressions · low CTR",
        suggestion: "Rewrite title tag",
        confidence: 95,
      },
      {
        finding: "Page 1 edge · push to top 3",
        suggestion: "Boost internal links & update content",
        confidence: 90,
      },
      {
        finding: "Rising impressions 683 → 2,634 (+286%)",
        suggestion: "Invest while trending",
        confidence: 85,
      },
    ],
  },
  {
    page: "/integrations/salesforce",
    type: "Info",
    impr: 498,
    clicks: 4,
    ctr: 0.8,
    pos: 6.0,
    findings: [
      {
        finding: "Page 1 edge · push to top 3",
        suggestion: "Boost internal links & update content",
        confidence: 85,
      },
    ],
  },
  {
    page: "/blog/ai-search-visibility",
    type: "Info",
    impr: 3120,
    clicks: 61,
    ctr: 2.0,
    pos: 11.2,
    findings: [
      {
        finding: "Answer-engine gap · no citation",
        suggestion: "Add FAQ schema & source-worthy stats",
        confidence: 76,
      },
    ],
  },
];

const PAGE_TYPES = ["Money", "Conversion", "Info", "Other"];

function OpportunitiesTable() {
  const [types, setTypes] = useState<string[]>(["Money", "Conversion"]);
  const [range, setRange] = useState("28 days");
  const counts = useMemo(
    () =>
      Object.fromEntries(
        PAGE_TYPES.map((t) => [
          t,
          OPPORTUNITY_ROWS.filter((row) => row.type === t).length,
        ]),
      ),
    [],
  );
  const rows = OPPORTUNITY_ROWS.filter((row) => types.includes(row.type));
  const toggleType = (t: string) =>
    setTypes((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t],
    );

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="font-display text-2xl">
            Opportunities{" "}
            <span className="text-base text-muted-foreground">
              · Pages with growth potential
            </span>
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {rows.length} pages
            </span>{" "}
            with growth potential
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-border p-1">
          {["7 days", "28 days", "90 days"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              suppressHydrationWarning
              className={`min-h-9 rounded-full px-3 py-1 text-xs transition-colors sm:min-h-0 ${range === r ? "bg-accent/15 font-semibold text-accent" : "text-muted-foreground hover:text-foreground"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-muted-foreground">Page filter:</span>
        {PAGE_TYPES.map((t) => (
          <label key={t} className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={types.includes(t)}
              onChange={() => toggleType(t)}
              suppressHydrationWarning
              className="h-4 w-4 accent-[var(--brand-orange)]"
            />
            <span>
              {t} <span className="text-muted-foreground">({counts[t] ?? 0})</span>
            </span>
          </label>
        ))}
      </div>
      <div className="mt-5 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-muted/50 text-left">
              {[
                "Page",
                "Finding",
                "Suggestion",
                "Impr.",
                "Clicks",
                "CTR",
                "Pos.",
                "Confidence",
              ].map((h) => (
                <th
                  key={h}
                  className="eyebrow px-4 py-3 text-xs font-semibold text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) =>
              row.findings.map((f, i) => (
                <tr
                  key={row.page + i}
                  className="border-t border-border align-middle"
                >
                  {i === 0 && (
                    <td
                      rowSpan={row.findings.length}
                      className="px-4 py-3 font-mono text-xs text-accent"
                    >
                      {row.page}
                    </td>
                  )}
                  <td className="px-4 py-3 font-medium">{f.finding}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {f.suggestion}
                  </td>
                  {i === 0 && (
                    <>
                      <td
                        rowSpan={row.findings.length}
                        className="px-4 py-3 text-right font-semibold"
                      >
                        {nf(row.impr)}
                      </td>
                      <td
                        rowSpan={row.findings.length}
                        className="px-4 py-3 text-right"
                      >
                        {row.clicks}
                      </td>
                      <td
                        rowSpan={row.findings.length}
                        className="px-4 py-3 text-right"
                      >
                        {row.ctr.toFixed(1)}%
                      </td>
                      <td
                        rowSpan={row.findings.length}
                        className="px-4 py-3 text-right"
                      >
                        {row.pos.toFixed(1)}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${f.confidence}%`,
                            background: "var(--brand-orange)",
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {f.confidence}%
                      </span>
                    </div>
                  </td>
                </tr>
              )),
            )}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Select a page filter to see opportunities.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function FunnelDeepDive() {
  const [active, setActive] = useState(STAGES[0]);
  const activate = (id: string) => {
    const next = STAGES.find((s) => s.id === id);
    if (next) setActive(next);
  };

  return (
    <div
      id="sample-funnel-deep-dive"
      className="surface-card mt-14 scroll-mt-24 overflow-hidden rounded-[1.75rem] p-6 sm:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow text-accent">Sample deep dive</p>
          <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            The Golden Funnel: Eugene Schwartz&apos;s 5 buyer awareness stages
          </h3>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            <span className="lg:hidden">Tap</span>
            <span className="hidden lg:inline">Hover</span> each stage to see
            how many buyers are stuck at Unaware, Problem Aware, Solution
            Aware, Product Aware and Most Aware — and what SEO RADAR would do
            next.
          </p>
        </div>
        <span className="rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
          Sample data: quantaloom.com · 28 days
        </span>
      </div>

      {/* Mobile / tablet: the funnel itself is an accordion — tap a layer to
          unfold its data right beneath it. */}
      <div className="mt-8 flex flex-col gap-4 lg:hidden">
        <FunnelAccordion />
        <ChannelMixCard />
        <AwarenessPagesCard />
        <BiggestLeakBanner />
      </div>

      {/* Desktop: interactive SVG funnel + side panel driven by hover */}
      <div className="mt-10 hidden gap-8 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-1 items-start justify-center">
            <CosmicFunnel
              className="h-auto w-full max-w-[470px]"
              onActivate={activate}
              stages={STAGES.map((s) => ({
                id: s.id,
                title: s.title,
                value: nf(s.value),
                label: s.label,
                sub: s.percent < 100 ? `${s.percent}% retained` : undefined,
              }))}
            />
          </div>
        </div>
        {/* Right column: the two stage/mix cards. The left box stretches to
            end exactly on the bottom of "Acquisition mix"; the third card
            sits below the pair at full width. */}
        <div className="flex flex-col gap-4">
          {/* All stage cards share one grid cell so the card keeps the height
              of the tallest stage — switching stages never reflows the row. */}
          <div className="grid">
            {STAGES.map((stage) => {
              const isActive = stage.id === active.id;
              return (
                <div
                  key={stage.id}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 ${isActive ? "" : "invisible pointer-events-none"}`}
                >
                  <StageDataCard stage={stage} hint="Hover a stage to load" />
                </div>
              );
            })}
          </div>
          <BiggestLeakBanner className="flex-1" />
        </div>
        {/* Row 2: acquisition mix under the funnel, awareness pages under
            the leak callout. */}
        <ChannelMixCard />
        <AwarenessPagesCard />
      </div>

      <OpportunitiesTable />
    </div>
  );
}

/* Mobile funnel accordion: each layer is a tappable 3D tier (the MiniFunnel
   recipe, one tier per row so data can unfold between layers). Tapping a
   layer spotlights it gold, scrolls it to the top of the viewport and
   unfolds that stage's data beneath it; tapping it again folds it. A "Next
   stage" link walks down the funnel. Until the first tap the tiers play a
   top→bottom nudge wave (once in view; never under prefers-reduced-motion). */
function FunnelAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [nudging, setNudging] = useState(false);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNudging(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openStage = (i: number) => {
    const id = STAGES[i].id;
    const willOpen = openId !== id;
    setNudging(false);
    setOpenId(willOpen ? id : null);
    if (!willOpen) return;
    requestAnimationFrame(() => {
      const el = rowRefs.current[i];
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  return (
    <div ref={rootRef} className="rounded-2xl border border-border bg-card p-4">
      <p className="eyebrow text-center text-muted-foreground">
        Tap a stage to unfold its data
      </p>
      <div className="mt-3 flex flex-col">
        {STAGES.map((stage, i) => {
          const open = openId === stage.id;
          const next = STAGES[i + 1];
          return (
            <div
              key={stage.id}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              // Tiers overlap slightly (rim on the lip above) unless a data
              // panel is open between them.
              className={`scroll-mt-20 ${i > 0 && openId !== STAGES[i - 1].id ? "-mt-6" : ""}`}
            >
              <button
                type="button"
                onClick={() => openStage(i)}
                aria-expanded={open}
                aria-controls={`funnel-panel-${stage.id}`}
                suppressHydrationWarning
                className="block w-full"
              >
                <CosmicTier
                  stage={{
                    id: stage.id,
                    title: stage.title,
                    value: nf(stage.value),
                    label: stage.label,
                    sub: stage.percent < 100 ? `${stage.percent}% retained` : undefined,
                  }}
                  index={i}
                  count={STAGES.length}
                  nudgeDelay={nudging && !open ? i * 0.22 : undefined}
                  className="mx-auto block h-auto w-full max-w-[320px]"
                />
              </button>

              {open && (
                <div
                  id={`funnel-panel-${stage.id}`}
                  className="animate-in fade-in-0 slide-in-from-top-1 my-3 rounded-2xl border p-4 duration-200"
                  style={{
                    borderColor: `color-mix(in oklab, ${stage.color} 40%, transparent)`,
                    background: `color-mix(in oklab, ${stage.color} 8%, transparent)`,
                  }}
                >
                  <p className="eyebrow" style={{ color: stage.color }}>
                    {stage.title} · the data behind
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span
                      className="font-display text-4xl font-bold"
                      style={{ color: stage.color }}
                    >
                      {nf(stage.value)}
                    </span>
                    <span className="text-sm text-muted-foreground">{stage.label}</span>
                  </div>
                  <p className="mt-1 text-sm" style={{ color: stage.color }}>
                    {stage.sub}
                  </p>
                  <div className="mt-4 grid gap-3">
                    {stage.stats.map((stat) => (
                      <StatTile key={stat.label} stat={stat} />
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl border border-border bg-card/70 p-4">
                    <p className="eyebrow text-muted-foreground">What SEO RADAR would do</p>
                    <p className="mt-2 text-sm text-muted-foreground">{STAGE_NOTES[stage.id]}</p>
                  </div>
                  {next && (
                    <button
                      type="button"
                      onClick={() => openStage(i + 1)}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                      style={{ color: next.color }}
                    >
                      Next stage: {next.title}
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatTile({
  stat,
  large = false,
}: {
  stat: Stage["stats"][number];
  large?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card transition-colors hover:bg-secondary/50 ${large ? "p-4" : "p-3"}`}
    >
      <p className={`font-display font-bold ${large ? "text-2xl" : "text-xl"}`}>
        {stat.value}
      </p>
      <p className={`mt-1 text-muted-foreground ${large ? "text-sm" : "text-xs"}`}>
        {stat.label}
      </p>
      {stat.sub && (
        <p
          className={`mt-1 ${large ? "text-sm" : "text-xs"} ${stat.tone === "positive" ? "text-success" : stat.tone === "negative" ? "text-destructive" : "text-muted-foreground"}`}
        >
          {stat.tone === "positive" && "↑ "}
          {stat.tone === "negative" && "↓ "}
          {stat.sub}
        </p>
      )}
    </div>
  );
}

function StageDataCard({ stage, hint }: { stage: Stage; hint: string }) {
  return (
    <div className="h-full rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="eyebrow" style={{ color: stage.color }}>
            {stage.title} · the data behind
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
        </div>
        <div
          className="rounded-full p-2"
          style={{
            backgroundColor: `color-mix(in oklab, ${stage.color} 12%, transparent)`,
          }}
        >
          <Target className="h-4 w-4" style={{ color: stage.color }} />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-3">
          <span
            className="font-display text-4xl font-bold"
            style={{ color: stage.color }}
          >
            {nf(stage.value)}
          </span>
          <span className="text-sm text-muted-foreground">{stage.label}</span>
        </div>
        <p className="mt-1 text-sm" style={{ color: stage.color }}>
          {stage.sub}
        </p>
      </div>
      {/* Stats as horizontal rows: number left, label + delta right. Text
          can lengthen or shorten without changing the card's height. */}
      <div className="mt-4 divide-y divide-border border-t border-border">
        {stage.stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 py-2">
            <p className="w-24 shrink-0 font-display text-xl font-bold tabular-nums">
              {stat.value}
            </p>
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground">{stat.label}</p>
              <p
                className={`truncate text-xs ${
                  stat.tone === "positive"
                    ? "text-success"
                    : stat.tone === "negative"
                      ? "text-destructive"
                      : "text-muted-foreground"
                }`}
              >
                {stat.sub ? (
                  <>
                    {stat.tone === "positive" && "↑ "}
                    {stat.tone === "negative" && "↓ "}
                    {stat.sub}
                  </>
                ) : (
                  " "
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CHANNEL_COLOR: Record<string, string> = {
  "Organic Search": "var(--brand-blue)",
  "Paid Search": "var(--brand-orange)",
  Social: "var(--brand-lime)",
  Other: "var(--brand-amber)",
};

function ChannelMixCard({ className = "" }: { className?: string }) {
  const max = Math.max(...CHANNEL_MIX.flatMap((c) => [c.value, c.target]));
  return (
    <div className={`flex flex-col rounded-2xl border border-border bg-card p-5 sm:p-6 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="eyebrow text-muted-foreground">Acquisition mix vs industry</p>
        <p className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-4 rounded-full bg-foreground/70" /> share
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-0.5 rounded-full bg-foreground/50" /> industry
          </span>
        </p>
      </div>
      <div className="mt-5 flex flex-1 flex-col justify-evenly gap-4">
        {CHANNEL_MIX.map((channel) => {
          const color = CHANNEL_COLOR[channel.label] ?? "var(--brand-amber)";
          const tone =
            channel.tone === "positive"
              ? "text-success"
              : channel.tone === "negative"
                ? "text-destructive"
                : "text-muted-foreground";
          const arrow =
            channel.tone === "positive" ? "↑" : channel.tone === "negative" ? "↓" : "→";
          return (
            <div key={channel.label}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                  {channel.label}
                </span>
                <span className="flex items-baseline gap-2 tabular-nums">
                  <span className="font-display text-base font-bold">{channel.value}%</span>
                  <span className={`text-xs ${tone}`}>
                    {arrow} {channel.target}%
                  </span>
                </span>
              </div>
              {/* share bar with an industry-benchmark marker */}
              <div className="relative mt-2 h-2.5 overflow-visible rounded-full bg-secondary">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(channel.value / max) * 100}%`,
                    background: `linear-gradient(90deg, color-mix(in oklab, ${color} 70%, white), ${color})`,
                  }}
                />
                <span
                  className="absolute -top-[3px] h-4 w-0.5 rounded-full bg-foreground/50"
                  style={{ left: `calc(${(channel.target / max) * 100}% - 1px)` }}
                  title={`Industry: ${channel.target}%`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Click any channel in the full diagnostic for the verdict and action plan.
      </p>
    </div>
  );
}

function BiggestLeakBanner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 ${className}`}
    >
      <CircleArrowRight className="h-5 w-5 shrink-0 text-accent" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-accent">Biggest leak:</span>{" "}
        Unaware to Problem Aware is losing 71.6% of the addressable audience.
        SEO RADAR would recommend problem-led content, category entry pages
        and awareness campaigns to pull buyers into the funnel.
      </p>
    </div>
  );
}

function AwarenessPagesCard() {
  const max = Math.max(...AWARENESS_PAGES.map((p) => p.channelValue));
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <p className="eyebrow text-muted-foreground">Where awareness starts</p>
        <p className="text-[11px] text-muted-foreground">Top entry pages · 28 days</p>
      </div>
      <ol className="mt-4 space-y-1.5">
        {AWARENESS_PAGES.map((page, i) => (
          <li
            key={page.path}
            className="relative overflow-hidden rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary/60"
          >
            {/* proportional bar behind the row */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 rounded-xl bg-accent/[0.07]"
              style={{ width: `${(page.channelValue / max) * 100}%` }}
            />
            <div className="relative flex items-center justify-between gap-3 text-sm">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary font-display text-[11px] font-bold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-medium">{page.path}</p>
                  <p className="text-xs text-muted-foreground">
                    {nf(page.total)} total · {nf(page.sessions)} sessions
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-base font-bold tabular-nums">
                  {nf(page.channelValue)}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2 py-px text-[11px] text-muted-foreground">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: CHANNEL_COLOR[page.channel] ?? "var(--brand-green)" }}
                  />
                  {page.channel}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
