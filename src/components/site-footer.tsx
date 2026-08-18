import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="surface-card rounded-3xl p-10 text-center sm:p-16">
          <p className="eyebrow text-accent">Start here</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold sm:text-5xl">
            See where your growth engine is leaking — in{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-display text-5xl font-black text-accent sm:text-6xl">
                48 hours
              </span>
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            A free diagnostic across all six pillars, including how AI engines
            describe your brand today. No pitch deck, no sales call.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="mailto:hello@markiverse.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-accent)] px-8 py-3.5 font-semibold text-accent-foreground shadow-[var(--shadow-accent)] transition-transform hover:-translate-y-0.5"
            >
              Request the diagnostic <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#pillars"
              className="inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 font-semibold transition-colors hover:bg-secondary"
            >
              Explore the six pillars
            </a>
          </div>
        </Reveal>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row">
          <img
            src="/assets/markiverse-logo.png"
            alt="Markiverse"
            width={200}
            height={84}
            className="h-13 w-auto"
          />
          <p>
            Strategy · Experience · Demand · Revenue · Intelligence · Creative
          </p>
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Markiverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
