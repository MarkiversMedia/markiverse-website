"use client";

/* The Golden Funnel — 3D "cosmic" funnel (desktop visual).

   Ported from the SEO Dashboard's Golden Funnel and extended from four to
   five tiers. One continuous gradient flows top-to-bottom through every
   tier (gradientUnits="userSpaceOnUse" makes it span the canvas rather than
   each polygon); cylindrical shading, a diagonal sheen and perspective rim
   ellipses give each tier a turned-metal feel. On hover the funnel
   "explodes" (tiers above lift, tiers below drop), and the hovered tier is
   spotlit golden and scales up. The focus is sticky — it stays on the last
   hovered tier after the cursor leaves — and a mousedown anywhere outside
   the funnel clears it, returning the funnel to its resting shape (the
   parent's side panel keeps the last stage; only the visual resets).

   All colours come from the --funnel-* tokens in globals.css so themes can
   restyle it. */

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type CosmicFunnelStage = {
  id: string;
  title: string;
  value: string;
  label: string;
  sub?: string;
};

type Props = {
  stages: CosmicFunnelStage[];
  /** Called when a tier is hovered/clicked — drives the parent's data panel. */
  onActivate: (id: string) => void;
  className?: string;
};

// ── Geometry ──────────────────────────────────────────────────────────
const CANVAS_W = 720;
const TIER_TOP_Y = 40;
const TIER_HEIGHT = 126;
const ELLIPSE_RY = 16;
const TOP_RATIO = 0.92;
const BOTTOM_RATIO = 0.28;
// Tiers above the focused one shift up, below shift down — the "exploded
// view" that separates the hovered tier without breaking the silhouette.
const EXPLODE_GAP = 16;
const SCALE_REST = 0.9;
const SCALE_FOCUS = 1.08;
// Text band inside a tier: below this tier's rim, above the next tier's
// rim, nudged down a few px so the title has breathing room under the rim.
const TEXT_TOP_OFFSET = 6;
const TIER_TEXT_HEIGHT = TIER_HEIGHT - 2 * ELLIPSE_RY - TEXT_TOP_OFFSET;

function geom(index: number, count: number) {
  const t = index / count;
  const t1 = (index + 1) / count;
  const topW = (TOP_RATIO + (BOTTOM_RATIO - TOP_RATIO) * t) * CANVAS_W;
  const bottomW = (TOP_RATIO + (BOTTOM_RATIO - TOP_RATIO) * t1) * CANVAS_W;
  const topY = TIER_TOP_Y + index * TIER_HEIGHT;
  const bottomY = topY + TIER_HEIGHT;
  const cx = CANVAS_W / 2;
  return {
    topY,
    bottomY,
    topW,
    bottomW,
    cx,
    points: `${cx - topW / 2},${topY} ${cx + topW / 2},${topY} ${cx + bottomW / 2},${bottomY} ${cx - bottomW / 2},${bottomY}`,
  };
}

const stop = (color: string): CSSProperties => ({ stopColor: color });

export function CosmicFunnel({ stages, onActivate, className }: Props) {
  const count = stages.length;
  const canvasH = TIER_TOP_Y + TIER_HEIGHT * count + 30;
  // Visual focus (golden tier + exploded gap). Independent of the parent's
  // active stage so click-outside can reset the funnel without blanking
  // the data panel.
  const [focusId, setFocusId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const activeIdx = stages.findIndex((s) => s.id === focusId);

  const focus = (id: string) => {
    setFocusId(id);
    onActivate(id);
  };

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(e.target as Node)) {
        setFocusId(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);
  // Gradient stops spread evenly over the five funnel tokens.
  const cosmicStops = ["--funnel-1", "--funnel-2", "--funnel-3", "--funnel-4", "--funnel-5"];

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CANVAS_W} ${canvasH}`}
      className={className}
      role="img"
      aria-label={`The Golden Funnel — ${count} stacked stages from ${stages[0]?.title} to ${stages[count - 1]?.title}`}
    >
      <defs>
        {/* Continuous cosmic gradient spanning the whole funnel height */}
        <linearGradient
          id="cf-cosmic"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={TIER_TOP_Y}
          x2="0"
          y2={TIER_TOP_Y + TIER_HEIGHT * count}
        >
          {cosmicStops.map((v, i) => (
            <stop
              key={v}
              offset={`${(i / (cosmicStops.length - 1)) * 100}%`}
              style={stop(`var(${v})`)}
            />
          ))}
        </linearGradient>

        {/* Golden spotlight for the focused tier */}
        <linearGradient id="cf-golden" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--funnel-gold-1)")} />
          <stop offset="50%" style={stop("var(--funnel-gold-2)")} />
          <stop offset="100%" style={stop("var(--funnel-gold-3)")} />
        </linearGradient>

        {/* Cylindrical horizontal shading — multiplied over the body */}
        <linearGradient id="cf-cyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="22%" stopColor="#000" stopOpacity="0.10" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="78%" stopColor="#000" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>

        {/* Diagonal sheen — off-axis light catch */}
        <linearGradient id="cf-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* Dark interior of each rim — you look "into" the tier */}
        <radialGradient id="cf-rim" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" style={stop("var(--funnel-depth)")} stopOpacity="0.95" />
          <stop offset="60%" style={stop("var(--funnel-depth)")} stopOpacity="0.80" />
          <stop offset="100%" style={stop("var(--funnel-depth)")} stopOpacity="0.55" />
        </radialGradient>

        {/* Ambient halo behind the funnel */}
        <radialGradient id="cf-ambient" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0%" style={stop("var(--funnel-3)")} stopOpacity="0.30" />
          <stop offset="60%" style={stop("var(--funnel-1)")} stopOpacity="0.10" />
          <stop offset="100%" style={stop("var(--funnel-depth)")} stopOpacity="0" />
        </radialGradient>

        {/* Drop shadow for the whole funnel */}
        <filter id="cf-shadow" x="-20%" y="-10%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dy="8" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Golden glow around the focused tier */}
        <filter id="cf-glow-gold" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feFlood style={{ floodColor: "var(--funnel-gold-rim)" }} floodOpacity="0.85" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width={CANVAS_W} height={canvasH} fill="url(#cf-ambient)" />

      <g filter="url(#cf-shadow)">
        {stages.map((stage, i) => {
          const g = geom(i, count);
          const focused = i === activeIdx;
          const shiftY =
            activeIdx < 0 ? 0 : i < activeIdx ? -EXPLODE_GAP : i > activeIdx ? EXPLODE_GAP : 0;
          const scale = focused ? SCALE_FOCUS : SCALE_REST;
          return (
            <g
              key={stage.id}
              onMouseEnter={() => focus(stage.id)}
              onClick={() => focus(stage.id)}
              className="cursor-pointer"
              filter={focused ? "url(#cf-glow-gold)" : undefined}
              style={{
                transform: `translateY(${shiftY}px) scale(${scale})`,
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: "transform 220ms ease",
              }}
            >
              {/* 1. body */}
              <polygon
                points={g.points}
                fill={focused ? "url(#cf-golden)" : "url(#cf-cosmic)"}
                style={{ transition: "fill 200ms ease" }}
              />
              {/* 2. cylindrical shading */}
              <polygon points={g.points} fill="url(#cf-cyl)" style={{ mixBlendMode: "multiply" }} />
              {/* 3. sheen */}
              <polygon points={g.points} fill="url(#cf-sheen)" />
              {/* 4. rim ellipse */}
              <ellipse
                cx={g.cx}
                cy={g.topY}
                rx={g.topW / 2}
                ry={ELLIPSE_RY}
                fill="url(#cf-rim)"
                stroke={focused ? "var(--funnel-gold-rim)" : "var(--funnel-rim)"}
                strokeWidth={focused ? 2.5 : 1.5}
                style={{
                  filter: focused ? "drop-shadow(0 0 8px var(--funnel-gold-halo))" : undefined,
                }}
              />
              {/* 5. front-edge highlight on the rim */}
              <path
                d={`M ${g.cx - g.topW / 2 + 8} ${g.topY + 2} Q ${g.cx} ${g.topY - ELLIPSE_RY * 0.7} ${g.cx + g.topW / 2 - 8} ${g.topY + 2}`}
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* 6. label */}
              <foreignObject
                x={g.cx - g.topW / 2}
                y={g.topY + ELLIPSE_RY + TEXT_TOP_OFFSET}
                width={g.topW}
                height={TIER_TEXT_HEIGHT}
              >
                <div
                  className="flex h-full select-none flex-col items-center justify-center px-6 text-center"
                  style={{
                    height: TIER_TEXT_HEIGHT,
                    color: focused ? "var(--funnel-gold-ink)" : "var(--funnel-ink)",
                  }}
                >
                  <p className="font-display text-[11px] font-semibold uppercase leading-tight tracking-[0.2em] opacity-80">
                    {stage.title}
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold leading-none tabular-nums drop-shadow-sm">
                    {stage.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-tight opacity-75">{stage.label}</p>
                  {stage.sub && (
                    <p className="mt-1 text-[11px] font-semibold leading-tight opacity-95">{stage.sub}</p>
                  )}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
