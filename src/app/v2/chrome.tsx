import { AUDIT_URL, CONTACT_URL, WHATSAPP_URL } from "@/components/links";
import { V2ThemeToggle } from "./theme";

/* Edge-to-edge wordmark: SVG text stretched to the full viewBox width, so it
   always spans the container exactly like the produx hero/footer marks. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1000 118" className={className} aria-hidden focusable="false">
      <text
        x="0"
        y="102"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        className="v2-wordmark-text"
        fill="currentColor"
      >
        MARKIVERSE
      </text>
    </svg>
  );
}

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#voices", label: "Voices" },
  { href: CONTACT_URL, label: "Contact" },
];

export function V2Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="display text-[17px] font-semibold tracking-[0.02em] text-[var(--v2-fg)]">
          MARKIVERSE
        </a>
        <div className="flex items-center gap-6 lg:gap-9">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={`v2-bracket ${i < NAV_LINKS.length - 1 ? "hidden md:inline" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <V2ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export function V2Footer() {
  return (
    <footer className="border-t border-[var(--v2-line)]">
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-20 lg:px-10">
        <div className="mb-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="v2-label mb-6">Menu/</div>
            <ul className="flex flex-col gap-4">
              {[
                ["#work", "Work"],
                ["#capabilities", "Capabilities"],
                ["#voices", "Voices"],
                ["#faqs", "FAQs"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="v2-bracket">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="v2-label mb-6">Get in touch/</div>
            <ul className="v2-mono flex flex-col gap-4 text-[13px] uppercase">
              <li>
                <a href={CONTACT_URL} className="text-[var(--v2-mut)] transition-colors hover:text-[var(--v2-fg)]">
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-[var(--v2-mut)] transition-colors hover:text-[var(--v2-fg)]"
                >
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={AUDIT_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-[var(--v2-mut)] transition-colors hover:text-[var(--v2-fg)]"
                >
                  Free DeSiRE audit
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="v2-label mb-6">Socials/</div>
            <ul className="v2-mono flex flex-col gap-4 text-[13px] uppercase">
              {[
                ["https://www.linkedin.com/company/markiverse-media/", "LinkedIn"],
                ["https://x.com/Markyverse", "X / Twitter"],
                ["https://www.youtube.com/@markiversemedia8280", "YouTube"],
                ["https://www.instagram.com/markiversemedia/", "Instagram"],
                ["https://www.facebook.com/markiverseOfficial/", "Facebook"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    className="text-[var(--v2-mut)] transition-colors hover:text-[var(--v2-fg)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="v2-mono mt-8 text-[12px] uppercase leading-[1.9] text-[var(--v2-dim)]">
              HQ/ Hyderabad, India
            </p>
          </div>

          <div>
            <div className="v2-label mb-6">Versions/</div>
            <a href="/" className="v2-bracket">
              Classic homepage
            </a>
            <p className="v2-mono mt-6 max-w-[300px] text-[12px] leading-[1.9] text-[var(--v2-dim)]">
              Design concept v2 — the classic homepage remains the live version.
            </p>
          </div>
        </div>

        <Wordmark className="w-full text-[var(--v2-fg)]" />

        <div className="v2-mono mt-8 flex flex-col gap-3 border-t border-[var(--v2-line)] pt-6 text-[11px] uppercase tracking-[0.12em] text-[var(--v2-dim)] md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Markiverse Media. All rights reserved.</span>
          <span>Built by Strategists. Sharpened by AI.</span>
        </div>
      </div>
    </footer>
  );
}
