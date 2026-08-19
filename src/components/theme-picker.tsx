"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Palette } from "lucide-react";
import {
  DEFAULT_THEME_ID,
  THEMES,
  THEME_STORAGE_KEY,
  applyTheme,
} from "./themes";

/* The saved theme id as an external store: the server snapshot is the default
   (matching SSR output), the client snapshot is localStorage. */
const THEME_EVENT = "markiverse-theme-change";
function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(THEME_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function getSnapshot() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return saved && THEMES.some((t) => t.id === saved) ? saved : DEFAULT_THEME_ID;
}
function getServerSnapshot() {
  return DEFAULT_THEME_ID;
}

/* Header theme switcher: a palette button that opens a list of themes with
   colour swatches. The choice is applied to <html> (data-theme + dark class),
   saved to localStorage, and restored before paint by THEME_INIT_SCRIPT in
   the root layout. */
export function ThemePicker() {
  const [open, setOpen] = useState(false);
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (id: string) => {
    applyTheme(id);
    localStorage.setItem(THEME_STORAGE_KEY, id);
    window.dispatchEvent(new Event(THEME_EVENT));
    setOpen(false);
  };

  const active = THEMES.find((t) => t.id === current) ?? THEMES[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${active.name}. Change theme`}
        title="Try a theme"
        suppressHydrationWarning
        className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">Theme</span>
        <Swatch colors={active.swatch} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Choose a theme"
          // Phones: pinned to the viewport edges below the header so it can't
          // overflow; sm+: a normal dropdown anchored to the button.
          className="fixed inset-x-4 top-16 z-50 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-[var(--shadow-card)] sm:absolute sm:inset-x-auto sm:top-11 sm:right-0 sm:w-72"
        >
          <p className="eyebrow border-b border-border px-4 py-3 text-muted-foreground">
            Try a theme
          </p>
          <ul className="max-h-[70vh] overflow-y-auto p-1.5">
            {THEMES.map((theme) => {
              const selected = theme.id === current;
              return (
                <li key={theme.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => select(theme.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent/[0.08] ${selected ? "bg-accent/[0.08]" : ""}`}
                  >
                    <Swatch colors={theme.swatch} large />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        {theme.name}
                        {theme.dark && (
                          <span className="rounded-full bg-secondary px-1.5 py-px text-[10px] font-medium text-secondary-foreground">
                            dark
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {theme.tagline}
                      </span>
                    </span>
                    {selected && <Check className="h-4 w-4 shrink-0 text-accent" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function Swatch({
  colors,
  large = false,
}: {
  colors: [string, string, string];
  large?: boolean;
}) {
  const size = large ? "h-4 w-4" : "h-3 w-3";
  return (
    <span className="flex shrink-0 -space-x-1" aria-hidden="true">
      {colors.map((c, i) => (
        <span
          key={i}
          className={`${size} rounded-full border border-border ring-1 ring-card`}
          style={{ backgroundColor: c }}
        />
      ))}
    </span>
  );
}
