"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  variant?: "flip" | "arc" | "rise";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  threshold = 0,
  variant = "flip",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const shownClasses =
    variant === "arc"
      ? "translate-y-0 rotate-0 scale-100 opacity-100 blur-0"
      : variant === "flip"
        ? "translate-y-0 [transform:perspective(1400px)_rotateX(0deg)_scale(1)] opacity-100 blur-0"
        : "translate-y-0 scale-100 opacity-100 blur-0";
  const hiddenClasses =
    variant === "arc"
      ? "translate-y-14 rotate-[-4deg] scale-[0.94] opacity-0 blur-[2px]"
      : variant === "flip"
        ? "translate-y-12 [transform:perspective(1400px)_rotateX(14deg)_scale(0.95)] opacity-0 blur-[2px]"
        : "translate-y-16 scale-[0.97] opacity-0 blur-[2px]";

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className} ${shown ? shownClasses : hiddenClasses}`}
      style={{
        transitionDelay: shown ? `${delay}ms` : "0ms",
        transformOrigin:
          variant === "flip"
            ? "center top"
            : variant === "arc"
              ? "left bottom"
              : undefined,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
