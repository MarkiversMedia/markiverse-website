"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const HEADER = 64; // fixed site header height (4rem)

/* Wraps a page fold so the folds stack like cards on scroll: each card pins
   under the header and the next one slides up over it. A card taller than
   the viewport pins by its bottom edge instead, so you scroll through all of
   it before the next card covers it. */
export function StackCard({
  children,
  first = false,
  className = "",
}: {
  children: ReactNode;
  first?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>(first ? 0 : HEADER);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const offset = first ? 0 : HEADER;
    const update = () => {
      const h = el.offsetHeight;
      const room = window.innerHeight - offset;
      setTop(h > room ? window.innerHeight - h : offset);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [first]);

  return (
    <div
      ref={ref}
      style={{ top }}
      className={`sticky bg-background ${
        first
          ? ""
          : "overflow-hidden rounded-t-[2rem] border-t border-border shadow-[0_-24px_60px_-30px_color-mix(in_oklab,var(--ink-shadow)_45%,transparent)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
