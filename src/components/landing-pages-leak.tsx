"use client";

import { useMemo, useState } from "react";

type LandingPage = {
  url: string;
  campaign: string;
  sessions: number;
  convRate: number;
  benchmark: number;
  cpc: number;
  issues: string[];
};

const PAGES: LandingPage[] = [
  {
    url: "/lp/demo-request",
    campaign: "Search",
    sessions: 12480,
    convRate: 1.4,
    benchmark: 3.2,
    cpc: 6.4,
    issues: ["Ad promise ≠ headline", "Form has 9 fields", "LCP 4.1s on mobile"],
  },
  {
    url: "/lp/pricing-calculator",
    campaign: "Search",
    sessions: 8210,
    convRate: 2.6,
    benchmark: 3.8,
    cpc: 5.1,
    issues: ["No proof above the fold", "Exit rate 74% on step 2"],
  },
  {
    url: "/lp/ai-visibility-audit",
    campaign: "Social",
    sessions: 15340,
    convRate: 0.7,
    benchmark: 1.9,
    cpc: 2.2,
    issues: [
      "Creative → page message mismatch",
      "CTA below the fold",
      "No retargeting pixel event",
    ],
  },
  {
    url: "/lp/enterprise",
    campaign: "Display",
    sessions: 4120,
    convRate: 0.4,
    benchmark: 0.9,
    cpc: 1.8,
    issues: ["Generic offer for a high-intent audience", "No sales-assist path"],
  },
  {
    url: "/lp/webinar-geo",
    campaign: "Social",
    sessions: 6650,
    convRate: 2.1,
    benchmark: 2.4,
    cpc: 2.9,
    issues: ["Thin follow-up sequence"],
  },
];

const AVG_DEAL = 4200;
const CHANNELS = ["Search", "Social", "Display"];

function leakFor(page: LandingPage) {
  const missed = Math.max(
    0,
    ((page.benchmark - page.convRate) / 100) * page.sessions,
  );
  return {
    missed,
    wasted: page.sessions * page.cpc * (1 - page.convRate / page.benchmark),
    revenue: missed * AVG_DEAL,
  };
}

const money = (n: number) =>
  n >= 1e6
    ? `$${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `$${Math.round(n / 1e3)}k`
      : `$${Math.round(n)}`;

const nf = (n: number) => n.toLocaleString("en-US");

export function LandingPagesLeak() {
  const [channels, setChannels] = useState<string[]>([...CHANNELS]);
  const [range, setRange] = useState("28 days");
  const [selectedUrl, setSelectedUrl] = useState(PAGES[0].url);

  const rows = PAGES.filter((page) => channels.includes(page.campaign));
  const selected =
    PAGES.find((page) => page.url === selectedUrl) ?? rows[0] ?? PAGES[0];
  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, page) => {
          const leak = leakFor(page);
          return {
            revenue: acc.revenue + leak.revenue,
            wasted: acc.wasted + leak.wasted,
            missed: acc.missed + leak.missed,
          };
        },
        { revenue: 0, wasted: 0, missed: 0 },
      ),
    [rows],
  );
  const toggleChannel = (c: string) =>
    setChannels((cur) =>
      cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c],
    );

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow text-accent">Campaign landing pages</p>
          <h4 className="mt-2 font-display text-2xl sm:text-3xl">
            See where your pages are{" "}
            <span className="italic text-accent">leaking revenue</span> from
            paid ads
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            SEO RADAR scores every paid landing page against its own category
            benchmark, then prices the gap — so you see the opportunity you
            missed, not just the traffic you bought.
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
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Revenue leaking",
            value: money(totals.revenue),
            tone: "var(--brand-orange)",
          },
          {
            label: "Ad spend under-returning",
            value: money(totals.wasted),
            tone: "var(--brand-amber)",
          },
          {
            label: "Conversions missed",
            value: nf(Math.round(totals.missed)),
            tone: "var(--brand-blue)",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-background p-4"
          >
            <p className="eyebrow text-xs text-muted-foreground">{card.label}</p>
            <p
              className="mt-1 font-display text-3xl"
              style={{ color: card.tone }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
        <span className="text-muted-foreground">Channel:</span>
        {CHANNELS.map((c) => (
          <label key={c} className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={channels.includes(c)}
              onChange={() => toggleChannel(c)}
              suppressHydrationWarning
              className="h-4 w-4 accent-[var(--brand-orange)]"
            />
            <span>{c}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                {[
                  "Landing page",
                  "Sessions",
                  "CVR",
                  "Benchmark",
                  "Revenue leak",
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
              {rows.map((page) => {
                const leak = leakFor(page);
                return (
                  <tr
                    key={page.url}
                    onClick={() => setSelectedUrl(page.url)}
                    className={`cursor-pointer border-t border-border transition-colors ${page.url === selected.url ? "bg-accent/10" : "hover:bg-muted/40"}`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-accent">
                        {page.url}
                      </span>
                      <span className="ml-2 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                        {page.campaign}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">{nf(page.sessions)}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {page.convRate.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground">
                      {page.benchmark.toFixed(1)}%
                    </td>
                    <td
                      className="px-4 py-3 text-right font-semibold"
                      style={{ color: "var(--brand-orange)" }}
                    >
                      {money(leak.revenue)}
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    Select at least one channel to see leaking pages.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <aside className="rounded-xl border border-border bg-background p-5">
          <p className="eyebrow text-xs text-muted-foreground">
            Where the money goes
          </p>
          <p className="mt-1 font-mono text-sm text-accent">{selected.url}</p>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Converting today</span>
                <span>{selected.convRate.toFixed(1)}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(selected.convRate / selected.benchmark) * 100}%`,
                    background: "var(--brand-blue)",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Benchmark for this offer</span>
                <span>{selected.benchmark.toFixed(1)}%</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full w-full rounded-full"
                  style={{ background: "var(--brand-lime)" }}
                />
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm">
            <span
              className="font-semibold"
              style={{ color: "var(--brand-orange)" }}
            >
              {money(leakFor(selected).revenue)}
            </span>{" "}
            of pipeline is walking off this page every {range.toLowerCase()} —{" "}
            {nf(Math.round(leakFor(selected).missed))} conversions at a{" "}
            {money(AVG_DEAL)} average deal.
          </p>
          <p className="eyebrow mt-5 text-xs text-muted-foreground">
            Leak points detected
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            {selected.issues.map((issue) => (
              <li key={issue} className="flex gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--brand-orange)" }}
                />
                <span className="text-muted-foreground">{issue}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
