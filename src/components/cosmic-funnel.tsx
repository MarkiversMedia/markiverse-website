"use client";

/* The Golden Funnel — 3D "cosmic" funnel.

   Ported from the SEO Dashboard's Golden Funnel (and its MiniFunnel
   variant) and extended from four to five tiers. One continuous gradient
   flows top-to-bottom through every tier (gradientUnits="userSpaceOnUse"
   makes it span the canvas rather than each polygon); cylindrical shading,
   a diagonal sheen and perspective rim ellipses give each tier a
   turned-metal feel. On hover/tap the funnel "explodes" (tiers above lift,
   tiers below drop) and the focused tier is spotlit golden and scales up.

   Two sizes:
   • default — desktop hero visual, HTML labels (4 lines), sticky focus
     that a mousedown outside the funnel clears;
   • compact — the MiniFunnel recipe: shorter tiers, SVG text (2 lines),
     lighter shadow, subtle zoom. Used on phones as the tappable selector
     above the stage data panel; focus is controlled by the parent.

   All colours come from the --funnel-* tokens in globals.css. */

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

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
  /** Controlled focus. When provided the funnel shows this tier as focused
      and does not manage focus itself (no click-outside reset). */
  focusId?: string | null;
  /** Compact (MiniFunnel) size. */
  compact?: boolean;
  /** Play the staggered top→bottom "tap me" wave while nothing is focused. */
  nudge?: boolean;
  className?: string;
};

// ── Geometry ──────────────────────────────────────────────────────────
type Size = {
  w: number;
  topY: number;
  tierH: number;
  ry: number;
  topRatio: number;
  bottomRatio: number;
  gap: number; // explode shift
  rest: number; // resting scale
  focus: number; // focused scale
  shadow: number; // drop-shadow blur
  textOffset: number; // text band top offset (default size only)
  bottomPad: number;
};

const SIZES: Record<"default" | "compact", Size> = {
  default: {
    w: 720,
    topY: 40,
    tierH: 126,
    ry: 16,
    topRatio: 0.92,
    bottomRatio: 0.28,
    gap: 16,
    rest: 0.9,
    focus: 1.08,
    shadow: 8,
    textOffset: 6,
    bottomPad: 30,
  },
  compact: {
    w: 300,
    topY: 14,
    tierH: 64,
    ry: 11,
    topRatio: 0.92,
    bottomRatio: 0.32,
    gap: 6,
    rest: 0.96,
    focus: 1.04,
    shadow: 4,
    textOffset: 0,
    bottomPad: 22,
  },
};

function geom(index: number, count: number, s: Size) {
  const t = index / count;
  const t1 = (index + 1) / count;
  const topW = (s.topRatio + (s.bottomRatio - s.topRatio) * t) * s.w;
  const bottomW = (s.topRatio + (s.bottomRatio - s.topRatio) * t1) * s.w;
  const topY = s.topY + index * s.tierH;
  const bottomY = topY + s.tierH;
  const cx = s.w / 2;
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

export function CosmicFunnel({
  stages,
  onActivate,
  focusId,
  compact = false,
  nudge = false,
  className,
}: Props) {
  const s = SIZES[compact ? "compact" : "default"];
  const count = stages.length;
  const canvasH = s.topY + s.tierH * count + s.bottomPad;
  // Unique paint-server ids so desktop + compact instances can coexist.
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `cf-${uid}-${name}`;

  // Visual focus: controlled via `focusId` when provided, otherwise
  // internal + sticky, cleared by a mousedown outside the funnel.
  const controlled = focusId !== undefined;
  const [innerFocus, setInnerFocus] = useState<string | null>(null);
  const currentFocus = controlled ? focusId : innerFocus;
  const svgRef = useRef<SVGSVGElement>(null);
  const activeIdx = stages.findIndex((st) => st.id === currentFocus);

  const focus = (stageId: string) => {
    if (!controlled) setInnerFocus(stageId);
    onActivate(stageId);
  };

  useEffect(() => {
    if (controlled) return;
    const onDown = (e: MouseEvent) => {
      if (svgRef.current && !svgRef.current.contains(e.target as Node)) {
        setInnerFocus(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [controlled]);

  const cosmicStops = ["--funnel-1", "--funnel-2", "--funnel-3", "--funnel-4", "--funnel-5"];
  const textBand = s.tierH - 2 * s.ry - s.textOffset;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${s.w} ${canvasH}`}
      className={className}
      role="img"
      aria-label={`The Golden Funnel — ${count} stacked stages from ${stages[0]?.title} to ${stages[count - 1]?.title}`}
    >
      <defs>
        {/* Continuous cosmic gradient spanning the whole funnel height */}
        <linearGradient
          id={id("cosmic")}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={s.topY}
          x2="0"
          y2={s.topY + s.tierH * count}
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
        <linearGradient id={id("golden")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={stop("var(--funnel-gold-1)")} />
          <stop offset="50%" style={stop("var(--funnel-gold-2)")} />
          <stop offset="100%" style={stop("var(--funnel-gold-3)")} />
        </linearGradient>

        {/* Cylindrical horizontal shading — multiplied over the body */}
        <linearGradient id={id("cyl")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="22%" stopColor="#000" stopOpacity="0.10" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="78%" stopColor="#000" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>

        {/* Diagonal sheen — off-axis light catch */}
        <linearGradient id={id("sheen")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* Dark interior of each rim — you look "into" the tier */}
        <radialGradient id={id("rim")} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" style={stop("var(--funnel-depth)")} stopOpacity="0.95" />
          <stop offset="60%" style={stop("var(--funnel-depth)")} stopOpacity="0.80" />
          <stop offset="100%" style={stop("var(--funnel-depth)")} stopOpacity="0.55" />
        </radialGradient>

        {/* Ambient halo behind the funnel (default size only) */}
        {!compact && (
          <radialGradient id={id("ambient")} cx="0.5" cy="0.45" r="0.55">
            <stop offset="0%" style={stop("var(--funnel-3)")} stopOpacity="0.30" />
            <stop offset="60%" style={stop("var(--funnel-1)")} stopOpacity="0.10" />
            <stop offset="100%" style={stop("var(--funnel-depth)")} stopOpacity="0" />
          </radialGradient>
        )}

        {/* Drop shadow for the whole funnel */}
        <filter id={id("shadow")} x="-20%" y="-10%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={s.shadow} />
          <feOffset dy={s.shadow} />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Golden glow around the focused tier */}
        <filter id={id("glow")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={compact ? 4 : 6} />
          <feFlood style={{ floodColor: "var(--funnel-gold-rim)" }} floodOpacity="0.85" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {!compact && <rect width={s.w} height={canvasH} fill={`url(#${id("ambient")})`} />}

      <g filter={`url(#${id("shadow")})`}>
        {stages.map((stage, i) => {
          const g = geom(i, count, s);
          const focused = i === activeIdx;
          const shiftY =
            activeIdx < 0 ? 0 : i < activeIdx ? -s.gap : i > activeIdx ? s.gap : 0;
          const scale = focused ? s.focus : s.rest;
          const nudging = nudge && activeIdx < 0;
          return (
            <g
              key={stage.id}
              onMouseEnter={() => focus(stage.id)}
              onClick={() => focus(stage.id)}
              className={`cursor-pointer ${nudging ? "animate-funnel-nudge" : ""}`}
              filter={focused ? `url(#${id("glow")})` : undefined}
              style={{
                transform: `translateY(${shiftY}px) scale(${scale})`,
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: "transform 220ms ease",
                animationDelay: nudging ? `${i * 0.22}s` : undefined,
              }}
            >
              {/* 1. body */}
              <polygon
                points={g.points}
                fill={focused ? `url(#${id("golden")})` : `url(#${id("cosmic")})`}
                style={{ transition: "fill 200ms ease" }}
              />
              {/* 2. cylindrical shading */}
              <polygon
                points={g.points}
                fill={`url(#${id("cyl")})`}
                style={{ mixBlendMode: "multiply" }}
              />
              {/* 3. sheen */}
              <polygon points={g.points} fill={`url(#${id("sheen")})`} />
              {/* 4. rim ellipse */}
              <ellipse
                cx={g.cx}
                cy={g.topY}
                rx={g.topW / 2}
                ry={s.ry}
                fill={`url(#${id("rim")})`}
                stroke={focused ? "var(--funnel-gold-rim)" : "var(--funnel-rim)"}
                strokeWidth={focused ? (compact ? 1.75 : 2.5) : compact ? 1 : 1.5}
                style={{
                  filter: focused ? "drop-shadow(0 0 8px var(--funnel-gold-halo))" : undefined,
                }}
              />
              {/* 5. front-edge highlight on the rim */}
              <path
                d={`M ${g.cx - g.topW / 2 + 8} ${g.topY + 2} Q ${g.cx} ${g.topY - s.ry * 0.7} ${g.cx + g.topW / 2 - 8} ${g.topY + 2}`}
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={compact ? 1 : 1.5}
                strokeLinecap="round"
              />

              {/* 6. labels */}
              {compact ? (
                <>
                  <text
                    x={g.cx}
                    y={g.topY + s.ry + (s.tierH - s.ry) / 2 - 9}
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 9,
                      fontWeight: 600,
                      letterSpacing: "0.14em",
                      fill: focused ? "var(--funnel-gold-ink)" : "var(--funnel-ink)",
                      opacity: 0.8,
                      pointerEvents: "none",
                    }}
                  >
                    {stage.title.toUpperCase()}
                  </text>
                  <text
                    x={g.cx}
                    y={g.topY + s.ry + (s.tierH - s.ry) / 2 + 9}
                    textAnchor="middle"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 14,
                      fontWeight: 700,
                      fill: focused ? "var(--funnel-gold-ink)" : "var(--funnel-ink)",
                      pointerEvents: "none",
                    }}
                  >
                    {stage.value}
                  </text>
                </>
              ) : (
                <foreignObject
                  x={g.cx - g.topW / 2}
                  y={g.topY + s.ry + s.textOffset}
                  width={g.topW}
                  height={textBand}
                >
                  <div
                    className="flex h-full select-none flex-col items-center justify-center px-6 text-center"
                    style={{
                      height: textBand,
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
                      <p className="mt-1 text-[11px] font-semibold leading-tight opacity-95">
                        {stage.sub}
                      </p>
                    )}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ── Single tier (for the mobile accordion) ────────────────────────────
   One tier as its own small SVG so a data panel can be inserted between
   tiers. Static by design: the cosmic gradient slice (positioned in user
   space as if the whole funnel were present, so stacked tiers read as one
   continuous gradient) with cylindrical shading, sheen, perspective rim
   and bottom lip, and a soft shadow — no focus state, no motion apart from
   the optional nudge wave. */
export function CosmicTier({
  stage,
  index,
  count,
  nudgeDelay,
  className,
}: {
  stage: CosmicFunnelStage;
  index: number;
  count: number;
  /** Seconds; when set the tier plays the nudge wave with this delay. */
  nudgeDelay?: number;
  className?: string;
}) {
  const s = SIZES.compact;
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `ct-${uid}-${name}`;
  const wg = geom(index, count, s);
  const ry = s.ry; // rim ellipse radius — the "3D opening" of the tier
  const pad = 2;
  const top = pad + ry;
  const bottom = top + s.tierH;
  const points = `${wg.cx - wg.topW / 2},${top} ${wg.cx + wg.topW / 2},${top} ${wg.cx + wg.bottomW / 2},${bottom} ${wg.cx - wg.bottomW / 2},${bottom}`;
  const h = s.tierH + 2 * ry + 2 * pad;
  const cosmicStops = ["--funnel-1", "--funnel-2", "--funnel-3", "--funnel-4", "--funnel-5"];
  const nudging = nudgeDelay !== undefined;
  const midY = top + ry + (s.tierH - ry) / 2;

  return (
    <svg
      viewBox={`0 0 ${s.w} ${h}`}
      className={className}
      role="img"
      aria-label={`${stage.title}: ${stage.value}`}
    >
      <defs>
        <linearGradient
          id={id("cosmic")}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={top - index * s.tierH}
          x2="0"
          y2={top - index * s.tierH + count * s.tierH}
        >
          {cosmicStops.map((v, i) => (
            <stop
              key={v}
              offset={`${(i / (cosmicStops.length - 1)) * 100}%`}
              style={stop(`var(${v})`)}
            />
          ))}
        </linearGradient>
        <linearGradient id={id("cyl")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
          <stop offset="22%" stopColor="#000" stopOpacity="0.10" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="78%" stopColor="#000" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={id("sheen")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("rim")} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" style={stop("var(--funnel-depth)")} stopOpacity="0.95" />
          <stop offset="60%" style={stop("var(--funnel-depth)")} stopOpacity="0.80" />
          <stop offset="100%" style={stop("var(--funnel-depth)")} stopOpacity="0.55" />
        </radialGradient>
        <filter id={id("shadow")} x="-20%" y="-20%" width="140%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        filter={`url(#${id("shadow")})`}
        className={nudging ? "animate-funnel-nudge" : undefined}
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          animationDelay: nudging ? `${nudgeDelay}s` : undefined,
        }}
      >
        <polygon points={points} fill={`url(#${id("cosmic")})`} />
        <polygon points={points} fill={`url(#${id("cyl")})`} style={{ mixBlendMode: "multiply" }} />
        <polygon points={points} fill={`url(#${id("sheen")})`} />
        {/* bottom lip — the dark opening into the tier below */}
        <ellipse
          cx={wg.cx}
          cy={bottom}
          rx={wg.bottomW / 2}
          ry={ry * 0.8}
          fill={`url(#${id("rim")})`}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={0.75}
        />
        {/* top rim — perspective opening, static */}
        <ellipse
          cx={wg.cx}
          cy={top}
          rx={wg.topW / 2}
          ry={ry}
          fill={`url(#${id("rim")})`}
          stroke="var(--funnel-rim)"
          strokeWidth={1}
        />
        <path
          d={`M ${wg.cx - wg.topW / 2 + 6} ${top + 1.5} Q ${wg.cx} ${top - ry * 0.7} ${wg.cx + wg.topW / 2 - 6} ${top + 1.5}`}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <text
          x={wg.cx}
          y={midY - 8}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.14em",
            fill: "var(--funnel-ink)",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        >
          {stage.title.toUpperCase()}
        </text>
        <text
          x={wg.cx}
          y={midY + 9}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 14,
            fontWeight: 700,
            fill: "var(--funnel-ink)",
            pointerEvents: "none",
          }}
        >
          {stage.value}
          {stage.sub && (
            <tspan
              style={{ fontSize: 8.5, fontWeight: 500, opacity: 0.85, letterSpacing: "0.02em" }}
              dx="6"
            >
              {stage.sub}
            </tspan>
          )}
        </text>
      </g>
    </svg>
  );
}
