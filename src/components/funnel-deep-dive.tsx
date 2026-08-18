"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CircleArrowRight, Target } from "lucide-react";

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

function FunnelStage({
  stage,
  topWidth,
  bottomWidth,
  height,
  isActive,
  revealed,
  index,
  onHover,
}: {
  stage: Stage;
  topWidth: number;
  bottomWidth: number;
  height: number;
  isActive: boolean;
  revealed: boolean;
  index: number;
  onHover: () => void;
}) {
  const top = (topWidth / 100) * 320;
  const bottom = (bottomWidth / 100) * 320;
  const topX = (320 - top) / 2;
  const bottomX = (320 - bottom) / 2;
  const path = `M ${topX} 0 L ${topX + top} 0 L ${bottomX + bottom} ${height} L ${bottomX} ${height} Z`;
  const midY = height / 2;
  return (
    <g
      onMouseEnter={onHover}
      className="cursor-pointer"
      style={{
        opacity: revealed ? (isActive ? 1 : 0.9) : 0,
        transform: revealed ? "translateY(0)" : "translateY(-14px)",
        transition:
          "opacity 520ms ease-out, transform 520ms cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${index * 180}ms`,
      }}
    >
      <defs>
        <linearGradient id={`grad-${stage.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={stage.color} stopOpacity={0.85} />
          <stop offset="100%" stopColor={stage.color} stopOpacity={1} />
        </linearGradient>
        <filter
          id={`shadow-${stage.id}`}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="rgba(15,25,40,0.18)"
          />
        </filter>
      </defs>
      <path
        d={path}
        fill={`url(#grad-${stage.id})`}
        filter={`url(#shadow-${stage.id})`}
        stroke="white"
        strokeWidth="2"
        className="transition-all duration-300"
        style={{
          transform: isActive ? "scale(1.02)" : "scale(1)",
          transformOrigin: "center",
        }}
      />
      <text
        x="160"
        y={midY - (stage.percent < 100 ? 16 : 6)}
        textAnchor="middle"
        className="fill-white font-display text-[11px] font-semibold uppercase tracking-wider"
      >
        {stage.title}
      </text>
      <text
        x="160"
        y={midY + (stage.percent < 100 ? 5 : 16)}
        textAnchor="middle"
        className="fill-white font-display text-[15px] font-bold"
      >
        {nf(stage.value)}
      </text>
      {stage.percent < 100 && (
        <text
          x="160"
          y={midY + 22}
          textAnchor="middle"
          className="fill-white/80 font-sans text-[10px]"
        >
          {stage.percent}% retained
        </text>
      )}
    </g>
  );
}

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
              className={`rounded-full px-3 py-1 text-xs transition-colors ${range === r ? "bg-accent/15 font-semibold text-accent" : "text-muted-foreground hover:text-foreground"}`}
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
  const [revealed, setRevealed] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const heights = [76, 74, 72, 70, 68];
  const topWidths = [100, 80, 64, 50, 38];
  const bottomWidths = [80, 64, 50, 38, 26];

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
            Hover each stage to see how many buyers are stuck at Unaware,
            Problem Aware, Solution Aware, Product Aware and Most Aware — and
            what SEO RADAR would do next.
          </p>
        </div>
        <span className="rounded-full border border-border bg-secondary px-4 py-2 text-xs font-semibold text-muted-foreground">
          Sample data: quantaloom.com · 28 days
        </span>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
        <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-1 items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 320 400"
              className="h-auto w-full max-w-[360px]"
              style={{ filter: "drop-shadow(0 20px 40px rgba(15,25,40,0.12))" }}
            >
              {STAGES.map((stage, i) => (
                <g
                  key={stage.id}
                  transform={`translate(0, ${heights.slice(0, i).reduce((a, b) => a + b, 0) + i * 8})`}
                >
                  <FunnelStage
                    stage={stage}
                    topWidth={topWidths[i]}
                    bottomWidth={bottomWidths[i]}
                    height={heights[i]}
                    isActive={active.id === stage.id}
                    revealed={revealed}
                    index={i}
                    onHover={() => setActive(stage)}
                  />
                </g>
              ))}
            </svg>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
            {STAGES.map((stage) => (
              <button
                key={stage.id}
                onMouseEnter={() => setActive(stage)}
                onClick={() => setActive(stage)}
                suppressHydrationWarning
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-medium transition-colors ${active.id === stage.id ? "bg-secondary text-foreground" : "hover:bg-secondary/50"}`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                {stage.title}
              </button>
            ))}
          </div>
          <div className="mt-5 flex-1 rounded-xl border border-border bg-secondary/40 p-5">
            <p className="eyebrow text-muted-foreground">Stage spotlight</p>
            <p
              className="mt-2 font-display text-lg font-semibold"
              style={{ color: active.color }}
            >
              {active.title}: {active.sub}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {STAGE_NOTES[active.id]}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow" style={{ color: active.color }}>
                  {active.title} · the data behind
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Hover a stage to load
                </p>
              </div>
              <div
                className="rounded-full p-2"
                style={{
                  backgroundColor: `color-mix(in oklab, ${active.color} 12%, transparent)`,
                }}
              >
                <Target className="h-4 w-4" style={{ color: active.color }} />
              </div>
            </div>
            <div className="mt-5">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-display text-4xl font-bold"
                  style={{ color: active.color }}
                >
                  {nf(active.value)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {active.label}
                </span>
              </div>
              <p className="mt-1 text-sm" style={{ color: active.color }}>
                {active.sub}
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {active.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border p-3 transition-colors hover:bg-secondary/50"
                >
                  <p className="font-display text-xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                  {stat.sub && (
                    <p
                      className={`mt-1 text-xs ${stat.tone === "positive" ? "text-green-600" : stat.tone === "negative" ? "text-red-600" : "text-muted-foreground"}`}
                    >
                      {stat.tone === "positive" && "↑ "}
                      {stat.tone === "negative" && "↓ "}
                      {stat.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <p className="eyebrow text-muted-foreground">
              Acquisition mix vs industry
            </p>
            <div className="mt-4 space-y-3">
              {CHANNEL_MIX.map((channel) => (
                <div
                  key={channel.label}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          channel.label === "Organic Search"
                            ? "var(--brand-blue)"
                            : channel.label === "Paid Search"
                              ? "var(--brand-orange)"
                              : channel.label === "Social"
                                ? "var(--brand-lime)"
                                : "var(--brand-amber)",
                      }}
                    />
                    {channel.label}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold">{channel.value}%</span>
                    <span
                      className={`text-xs ${channel.tone === "positive" ? "text-green-600" : channel.tone === "negative" ? "text-red-600" : "text-muted-foreground"}`}
                    >
                      {channel.tone === "positive"
                        ? "↑"
                        : channel.tone === "negative"
                          ? "↓"
                          : "→"}{" "}
                      {channel.target}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Click any channel in the full diagnostic for the verdict and
              action plan.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <p className="eyebrow text-muted-foreground">
              Where awareness starts
            </p>
            <div className="mt-4 space-y-3">
              {AWARENESS_PAGES.map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{page.path}</p>
                    <p className="text-xs text-muted-foreground">
                      {nf(page.total)} total · {nf(page.sessions)} sessions
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{nf(page.channelValue)}</p>
                    <p className="text-xs text-muted-foreground">
                      {page.channel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
        <CircleArrowRight className="h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-accent">Biggest leak:</span>{" "}
          Unaware to Problem Aware is losing 71.6% of the addressable audience.
          SEO RADAR would recommend problem-led content, category entry pages
          and awareness campaigns to pull buyers into the funnel.
        </p>
      </div>
      <OpportunitiesTable />
    </div>
  );
}
