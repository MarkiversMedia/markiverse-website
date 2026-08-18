"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle, Radar } from "lucide-react";

const STAGES = [
  { label: "AI answer / search", note: "Brand cited in generative answers" },
  { label: "Landing experience", note: "Message match and load speed" },
  { label: "Consideration", note: "Proof, pricing clarity, comparison" },
  { label: "Form / demo request", note: "Friction, field count, intent capture" },
  { label: "Sales follow-up", note: "Speed to lead and routing" },
];

function hashString(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

type ScanResult = {
  host: string;
  visibility: number;
  stages: { label: string; note: string; retained: number; drop: number }[];
};

function buildResult(url: string): ScanResult {
  const host = url
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .toLowerCase();
  const seed = hashString(host || "markiverse");
  let remaining = 100;
  const stages = STAGES.map((stage, i) => {
    const dropPct = 8 + ((seed >> (i * 3)) % 26) + i * 3;
    const before = remaining;
    remaining = Math.max(3, Math.round(before * (1 - dropPct / 100)));
    return {
      label: stage.label,
      note: stage.note,
      retained: remaining,
      drop: Math.round(before - remaining),
    };
  });
  return { host: host || "your-site.com", stages, visibility: 18 + (seed % 55) };
}

export function RadarScanDemo() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "done">("idle");
  const [result, setResult] = useState<ScanResult | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setStatus("scanning");
    const next = buildResult(url);
    window.setTimeout(() => {
      setResult(next);
      setStatus("done");
    }, 1100);
  };

  const biggestLeak = result
    ? result.stages.reduce<ScanResult["stages"][number] | null>(
        (max, stage) => (max && max.drop >= stage.drop ? max : stage),
        null,
      )
    : null;

  return (
    <div className="surface-card mt-14 overflow-hidden rounded-[1.75rem] p-7 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow text-accent">Live demo</p>
          <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
            Run a sample <span className="italic text-accent">SEO RADAR</span>{" "}
            scan
          </h3>
          <p className="mt-4 text-muted-foreground">
            Drop in a website and see an illustrative funnel-dropoff preview —
            where attention is lost between the AI answer and the sales
            follow-up.
          </p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="radar-url">
              Website URL
            </label>
            <input
              id="radar-url"
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourcompany.com"
              suppressHydrationWarning
              className="w-full rounded-full border border-border bg-background px-5 py-3 text-base outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              disabled={status === "scanning"}
              suppressHydrationWarning
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[image:var(--gradient-accent)] px-6 py-3 font-semibold text-accent-foreground shadow-[var(--shadow-accent)] transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              {status === "scanning" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Scanning
                </>
              ) : (
                <>
                  <Radar className="h-4 w-4" /> Scan funnel
                </>
              )}
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            Illustrative preview only. The full diagnostic uses your live
            analytics, CRM and AI visibility data.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          {status !== "done" || !result ? (
            <div className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center">
              <Radar
                className={`h-10 w-10 text-primary ${status === "scanning" ? "animate-spin" : "opacity-40"}`}
              />
              <p className="mt-4 text-sm text-muted-foreground">
                {status === "scanning"
                  ? "Sweeping the funnel for drop-off signals…"
                  : "Your funnel preview will appear here."}
              </p>
              {status !== "scanning" && (
                <a
                  href="#sample-funnel-deep-dive"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  See a sample funnel deep dive
                </a>
              )}
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-lg font-bold">{result.host}</p>
                <p className="eyebrow text-accent">
                  AI visibility {result.visibility}%
                </p>
              </div>
              <ul className="mt-6 space-y-4">
                {result.stages.map((stage) => (
                  <li key={stage.label}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-semibold">{stage.label}</span>
                      <span className="text-muted-foreground">
                        {stage.retained}% left · −{stage.drop}%
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-[image:var(--gradient-primary,var(--gradient-accent))] transition-[width] duration-700 ease-out"
                        style={{ width: `${stage.retained}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {stage.note}
                    </p>
                  </li>
                ))}
              </ul>
              {biggestLeak && (
                <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm">
                  <p className="font-semibold text-accent">
                    Biggest leak: {biggestLeak.label}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {biggestLeak.drop}% of demand is lost here. This is where
                    SEO RADAR would focus the first sprint.
                  </p>
                </div>
              )}
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 font-display font-bold text-accent transition-colors hover:opacity-80"
              >
                Get the full diagnostic <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
