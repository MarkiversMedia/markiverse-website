"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Lenis from "lenis";

/* ---------------- inertial smooth scrolling (produx feel) ---------------- */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1 });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return null;
}

/* ---------------- text that brightens word-by-word on scroll ---------------- */
function Word({
  progress,
  range,
  word,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  word: string;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, Math.min((i + 1.5) / words.length, 1)]}
          word={w}
        />
      ))}
    </p>
  );
}

/* ---------------- mosaic tile reveal over an image ---------------- */
const TILE_COLS = 10;
const TILE_ROWS = 5;

export function TileReveal() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 grid"
      style={{
        gridTemplateColumns: `repeat(${TILE_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${TILE_ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: TILE_COLS * TILE_ROWS }, (_, i) => (
        <motion.div
          key={i}
          className="bg-[var(--v2-bg)]"
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          /* deterministic pseudo-random stagger — Math.random() would
             mismatch between server and client render */
          transition={{ duration: 0.45, delay: ((i * 37) % 29) / 29 * 0.7, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ---------------- work card: parallax + mosaic + cursor pill ---------------- */
type WorkCardProps = {
  img: string;
  tag: string;
  title: string;
  index: number;
};

export function WorkCard({ img, tag, title, index }: WorkCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  /* image drifts slower than the page while the card crosses the viewport */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  /* cursor pill trails the pointer on a spring */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 32 });
  const sy = useSpring(my, { stiffness: 350, damping: 32 });

  return (
    <a
      ref={ref}
      href="#"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block h-[52vh] min-h-[360px] cursor-none overflow-hidden max-lg:cursor-auto"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -inset-y-[8%]">
          <Image
            src={img}
            alt={title}
            fill
            quality={90}
            sizes="100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-colors duration-500 group-hover:via-black/40" />
      <TileReveal />

      <span className="v2-mono absolute left-6 top-6 z-20 text-[12px] tracking-[0.14em] text-[var(--v2-fg)] lg:left-10">
        0{index + 1}/
      </span>
      <span className="v2-mono absolute right-6 top-6 z-20 text-[11px] uppercase tracking-[0.16em] text-[var(--v2-soft)] lg:right-10">
        {tag}
      </span>

      <div className="absolute inset-x-6 bottom-7 z-20 lg:inset-x-10">
        <h3 className="display max-w-[820px] text-[clamp(1.3rem,2.6vw,2.1rem)] font-medium leading-[1.15] text-white">
          {title}
        </h3>
      </div>

      {/* pointer-following pill, desktop only */}
      <motion.span
        aria-hidden
        style={{ x: sx, y: sy }}
        className={`v2-mono pointer-events-none absolute left-0 top-0 z-30 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-[var(--v2-fg)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--v2-bg)] transition-opacity duration-200 lg:flex ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        Read story ↗
      </motion.span>
    </a>
  );
}

/* ---------------- full-bleed image band with scroll parallax ---------------- */
export function ParallaxBand({ img, alt }: { img: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div ref={ref} className="relative h-[70vh] min-h-[420px] overflow-hidden">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -inset-y-[14%]">
        <Image src={img} alt={alt} fill quality={90} sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-black/25" />
      <TileReveal />
    </div>
  );
}
