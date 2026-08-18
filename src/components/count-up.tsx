"use client";

import { useEffect, useRef, useState } from "react";

function easeOutQuart(t: number) {
  return 1 - (1 - t) ** 4;
}

function splitValue(value: string) {
  const match = value.match(/^([0-9.,]+)\s*(.*)$/);
  if (!match || match[1] === undefined) return { num: null, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] ?? "" };
}

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 1600, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            const { num, suffix } = splitValue(value);
            if (num === null) {
              setDisplay(value);
              return;
            }
            const start = performance.now();
            const decimalsPart = value.split(".")[1];
            const decimals = decimalsPart ? decimalsPart.length : 0;
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = easeOutQuart(progress);
              const current = num * eased;
              const text =
                decimals > 0
                  ? current.toFixed(decimals)
                  : Number.isInteger(num)
                    ? Math.round(current).toString()
                    : current.toFixed(1);
              setDisplay(`${text}${suffix ? ` ${suffix}` : ""}`);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, started]);

  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-300 ${started ? "scale-100" : "scale-95"} ${className ?? ""}`}
    >
      {display}
    </span>
  );
}
