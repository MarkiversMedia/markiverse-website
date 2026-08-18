"use client";

import { useEffect, useState } from "react";

/* [ LIGHT ] / [ DARK ] switch — persists via localStorage `mv2-theme`;
   the boot script in page.tsx restores it before hydration. */
export function V2ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.getAttribute("data-v2-theme") === "light");
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.setAttribute("data-v2-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-v2-theme");
    }
    try {
      localStorage.setItem("mv2-theme", next ? "light" : "dark");
    } catch {}
  };

  return (
    <button type="button" onClick={toggle} className="v2-bracket" aria-pressed={light}>
      {light ? "Dark" : "Light"}
    </button>
  );
}
