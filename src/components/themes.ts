/* Theme registry — one entry per `[data-theme="…"]` block in globals.css.
   `swatch` colours are only used for the picker preview dots. */

export type Theme = {
  id: string;
  name: string;
  tagline: string;
  dark: boolean;
  swatch: [string, string, string];
};

export const THEME_STORAGE_KEY = "markiverse-theme";
export const DEFAULT_THEME_ID = "circuit";

export const THEMES: Theme[] = [
  {
    id: "circuit",
    name: "Circuit Orange",
    tagline: "The current look — signal orange on paper white",
    dark: false,
    swatch: ["oklch(99.5% 0.002 250)", "oklch(62.6% 0.183 38)", "oklch(56% 0.122 243)"],
  },
  {
    id: "midnight",
    name: "Midnight Pit Lane",
    tagline: "Lights-out navy garage, hot orange, chrome blue",
    dark: true,
    swatch: ["oklch(16% 0.025 255)", "oklch(70% 0.185 42)", "oklch(70% 0.13 240)"],
  },
  {
    id: "monza",
    name: "Monza Rosso",
    tagline: "Racing red on warm cream, gold and slate trim",
    dark: false,
    swatch: ["oklch(98% 0.012 80)", "oklch(54% 0.22 28)", "oklch(78% 0.15 85)"],
  },
  {
    id: "silverstone",
    name: "Silverstone",
    tagline: "British racing green, gold trim, misty white",
    dark: false,
    swatch: ["oklch(98.5% 0.006 140)", "oklch(46% 0.12 158)", "oklch(80% 0.14 85)"],
  },
  {
    id: "neon",
    name: "Neon Grid",
    tagline: "Violet-black with electric cyan and magenta",
    dark: true,
    swatch: ["oklch(14% 0.025 285)", "oklch(82% 0.15 200)", "oklch(68% 0.24 340)"],
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    tagline: "Cool blue-teal system, coral warmth, sky white",
    dark: false,
    swatch: ["oklch(98.5% 0.008 230)", "oklch(52% 0.17 252)", "oklch(68% 0.17 32)"],
  },
  {
    id: "graphite",
    name: "Graphite & Sand",
    tagline: "Warm charcoal with brushed-gold accents",
    dark: true,
    swatch: ["oklch(21% 0.008 60)", "oklch(80% 0.12 82)", "oklch(68% 0.07 240)"],
  },
];

/** Applies a theme to <html>: data-theme attribute + `dark` class. */
export function applyTheme(id: string) {
  const theme = THEMES.find((t) => t.id === id) ?? THEMES[0];
  const root = document.documentElement;
  if (theme.id === DEFAULT_THEME_ID) delete root.dataset.theme;
  else root.dataset.theme = theme.id;
  root.classList.toggle("dark", theme.dark);
}

/** Inline, pre-hydration version of applyTheme so the saved theme is on the
    page before first paint (no flash of the default theme). Keep in sync. */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var d=${JSON.stringify(DEFAULT_THEME_ID)};var dark=${JSON.stringify(THEMES.filter((t) => t.dark).map((t) => t.id))};var ids=${JSON.stringify(THEMES.map((t) => t.id))};var t=localStorage.getItem(k);if(!t||ids.indexOf(t)<0||t===d)return;var r=document.documentElement;r.setAttribute("data-theme",t);if(dark.indexOf(t)>=0)r.classList.add("dark");}catch(e){}})();`;
