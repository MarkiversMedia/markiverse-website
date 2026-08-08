"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AUDIT_URL } from "./links";

/* ---------------- particle constellation background ---------------- */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const N = 70;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
    }));
    const mouse = { x: -1, y: -1 };

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * w;
      mouse.y = ((e.clientY - r.top) / r.height) * h;
    };
    window.addEventListener("mousemove", onMove);

    const css = getComputedStyle(document.documentElement);
    const line = css.getPropertyValue("--color-teal").trim() || "#0dafb8";
    const dot = css.getPropertyValue("--color-mist").trim() || "#8b9bb4";
    const warm = css.getPropertyValue("--color-orange").trim() || "#e8820c";

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        const ax = a.x * w;
        const ay = a.y * h;
        for (let j = i + 1; j < N; j++) {
          const b = pts[j];
          const bx = b.x * w;
          const by = b.y * h;
          const d = Math.hypot(ax - bx, ay - by);
          const max = w * 0.09;
          if (d < max) {
            ctx.globalAlpha = (1 - d / max) * 0.25;
            ctx.strokeStyle = line;
            ctx.lineWidth = devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(ax - mouse.x, ay - mouse.y);
        const maxM = w * 0.12;
        if (mouse.x > 0 && dm < maxM) {
          ctx.globalAlpha = (1 - dm / maxM) * 0.35;
          ctx.strokeStyle = warm;
          ctx.lineWidth = devicePixelRatio;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = dot;
        ctx.beginPath();
        ctx.arc(ax, ay, 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-60" aria-hidden />;
}

/* ---------------- brand radar visualization ---------------- */
const SWEEP_SECONDS = 6;

const NODES = [
  { name: "ChatGPT", angle: 318, r: 41, color: "var(--color-teal-bright)" },
  { name: "AI Overviews", angle: 66, r: 45, color: "var(--color-orange-l)" },
  { name: "Gemini", angle: 105, r: 34, color: "var(--color-teal-bright)" },
  { name: "Perplexity", angle: 175, r: 43, color: "var(--color-orange-l)" },
  { name: "Copilot", angle: 245, r: 36, color: "var(--color-teal-bright)" },
];

function polar(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { left: `${50 + r * Math.cos(rad)}%`, top: `${50 + r * Math.sin(rad)}%` };
}

function Radar() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-square w-full max-w-[clamp(420px,calc(100vh_-_255px),540px)] select-none"
    >
      {/* concentric rings */}
      {[100, 72, 44].map((s) => (
        <div
          key={s}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line2"
          style={{ width: `${s}%`, height: `${s}%` }}
        />
      ))}

      {/* dashed counter-rotating ring */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-teal/30"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />

      {/* rotating sweep */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, transparent 290deg, color-mix(in srgb, var(--color-teal) 28%, transparent) 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: SWEEP_SECONDS, ease: "linear" }}
        />
      )}

      {/* spokes from center to nodes */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
        {NODES.map((n) => {
          const rad = ((n.angle - 90) * Math.PI) / 180;
          return (
            <line
              key={n.name}
              x1="50"
              y1="50"
              x2={50 + n.r * Math.cos(rad)}
              y2={50 + n.r * Math.sin(rad)}
              stroke="color-mix(in srgb, var(--color-teal) 25%, transparent)"
              strokeWidth="0.35"
              strokeDasharray="1.5 1.5"
            />
          );
        })}
      </svg>

      {/* center: your brand */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/50"
            animate={reduce ? undefined : { scale: [1, 2.1], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 2.6, delay: i * 1.3, ease: "easeOut" }}
          />
        ))}
        <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-teal to-orange shadow-[0_0_60px_color-mix(in_srgb,var(--color-teal)_55%,transparent)]">
          <span className="display text-[13px] font-bold uppercase tracking-[0.1em] text-white drop-shadow">
            Your
          </span>
          <span className="display text-[13px] font-bold uppercase tracking-[0.1em] text-white drop-shadow">
            Brand
          </span>
        </div>
      </div>

      {/* AI platform nodes — ping as the sweep passes */}
      {NODES.map((n) => {
        const pos = polar(n.angle, n.r);
        const delay = (n.angle / 360) * SWEEP_SECONDS;
        return (
          <div
            key={n.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={pos}
          >
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: n.color, opacity: 0 }}
              animate={reduce ? undefined : { scale: [0.4, 1.9], opacity: [0.55, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.1,
                delay,
                repeatDelay: SWEEP_SECONDS - 1.1,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="relative flex items-center gap-2 rounded-full border border-line2 bg-panel/95 py-1.5 pl-2 pr-3 shadow-lg backdrop-blur"
              animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
              transition={{
                repeat: Infinity,
                duration: 0.9,
                delay,
                repeatDelay: SWEEP_SECONDS - 0.9,
              }}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: n.color }} />
              <span className="whitespace-nowrap text-[12px] font-bold text-off">{n.name}</span>
            </motion.div>
          </div>
        );
      })}

      {/* floating proof chips */}
      <motion.div
        className="absolute right-[4%] top-[1%] flex items-center gap-2 rounded-2xl border border-teal/40 bg-panel/95 px-4 py-2.5 shadow-xl backdrop-blur"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[13px] font-bold text-white">
          ✓
        </span>
        <span className="text-[13px] font-bold text-off">AI-Recommended</span>
      </motion.div>

      <motion.div
        className="absolute bottom-[5%] left-[0%] rounded-2xl border border-orange/40 bg-panel/95 px-4 py-2.5 shadow-xl backdrop-blur"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1 }}
      >
        <span className="mb-1 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-bright" />
          </span>
          <span className="display text-[12px] font-bold uppercase tracking-[0.14em] text-teal-bright">
            SEO RADAR
          </span>
        </span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-mist">
          AI Confidence
        </span>
        <span className="display text-xl font-bold text-orange-l">92 / 100</span>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- hero ---------------- */
export default function Hero() {
  const reduce = useReducedMotion();
  const words = ["Built", "by", "Strategists.", "Sharpened", "by", "AI."];

  return (
    <section id="top" className="relative flex flex-1 items-center overflow-hidden bg-ink pt-[72px]">
      {/* backdrop glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[540px] w-[540px] rounded-full bg-teal/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-orange/10 blur-[140px]" />
      <Particles />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 px-5 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-8">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-bright"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-bright" />
            </span>
            India&apos;s Leading Digital Marketing Agency for the AI Search Era
          </motion.div>

          <h1 className="display mb-5 text-[clamp(2.4rem,min(6.2vw,8.5vh),5.2rem)] font-bold leading-[1.02] text-off">
            {words.map((w, i) => (
              <motion.span
                key={i}
                className={`inline-block ${
                  w === "Strategists." ? "text-teal-bright" : w === "AI." ? "text-orange-l" : ""
                }`}
                initial={reduce ? false : { opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
                {i < words.length - 1 && <span>&nbsp;</span>}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mb-7 max-w-[520px] text-lg leading-relaxed text-mist"
          >
            The next SEO battle isn&apos;t about search rankings — it&apos;s about AI
            recommendations. We make sure AI answers with{" "}
            <strong className="text-off">your brand</strong>.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <a href={AUDIT_URL} target="_blank" rel="noopener" className="btn-primary !px-8 !py-4 !text-base">
              Run Free Brand Audit <span aria-hidden>→</span>
            </a>
            <p className="mt-4 text-[13px] font-medium text-mist">
              Free &nbsp;·&nbsp; Results in under 3 minutes &nbsp;·&nbsp; No sales call
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end lg:pr-16">
          <Radar />
        </div>
      </div>
    </section>
  );
}
