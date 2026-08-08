"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const THEMES = [
  { id: "ink", name: "Ink", swatch: ["#060b16", "#0dafb8", "#e8820c"] },
  { id: "aurora", name: "Aurora", swatch: ["#0b0716", "#a78bfa", "#db2777"] },
  { id: "ember", name: "Ember", swatch: ["#16100a", "#fbbf24", "#dc2626"] },
  { id: "light", name: "Light", swatch: ["#f5f8fc", "#0a98a1", "#e8820c"] },
];

export function applyTheme(id: string) {
  if (id === "ink") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", id);
  try {
    localStorage.setItem("mv-theme", id);
  } catch {}
}

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("ink");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") ?? "ink");
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Choose color theme"
        title="Theme"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line2 transition-colors hover:border-teal"
      >
        <span className="relative flex h-5 w-5 overflow-hidden rounded-full border border-line2">
          <span className="h-full w-1/2" style={{ background: current.swatch[1] }} />
          <span className="h-full w-1/2" style={{ background: current.swatch[2] }} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-2xl border border-line bg-panel p-1.5 shadow-2xl"
          >
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  applyTheme(t.id);
                  setTheme(t.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  theme === t.id ? "bg-veil text-off" : "text-mist hover:bg-veil hover:text-off"
                }`}
              >
                <span className="flex overflow-hidden rounded-full border border-line2">
                  {t.swatch.map((c) => (
                    <span key={c} className="h-4 w-3" style={{ background: c }} />
                  ))}
                </span>
                {t.name}
                {theme === t.id && <span className="ml-auto text-teal-bright">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
