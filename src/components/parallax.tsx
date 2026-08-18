"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
  max?: number;
};

export function Parallax({
  children,
  className = "",
  speed = 0.06,
  max = 28,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let raf = 0;
    let inView = false;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const offCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const shift = Math.max(-max, Math.min(max, -offCenter * speed));
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };
    const schedule = () => {
      if (inView && !raf) raf = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = !!entry?.isIntersecting;
        if (inView) update();
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, max]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export function DriftOrbs({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <span className="drift-orb drift-orb-a" />
      <span className="drift-orb drift-orb-b" />
    </div>
  );
}
