"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import { AUDIT_URL, CONTACT_URL, LOGO_URL } from "./links";

const LINKS = [
  { href: "#solution", label: "DeSiRE Audit" },
  { href: "#usecases", label: "Use Cases" },
  { href: "#services", label: "Services" },
  { href: "#stories", label: "Case Studies" },
  { href: "#faqs", label: "FAQs" },
];

/* the mobile menu is navigation only, so Contact Us belongs in the list */
const MOBILE_LINKS = [...LINKS, { href: CONTACT_URL, label: "Contact Us" }];

const MENU_LIST = {
  hidden: {},
  /* keep the stagger tight - the menu is expected to grow, and a longer list
     at a slower cadence makes the whole panel feel sluggish to open */
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const MENU_ITEM = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setPastHero(window.scrollY > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* the open menu covers the viewport, so the page behind it must not scroll */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    /* the document element is the scroll container here, so locking only
       body still lets the page scroll behind the menu */
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          open
            ? "bg-ink/55 backdrop-blur-2xl"
            : scrolled
              ? "bg-ink/85 backdrop-blur-xl border-b border-line"
              : "bg-transparent"
        }`}
      >
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-teal to-orange"
        style={{ scaleX: progress }}
      />
      <nav className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <a href="#top" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            alt="Markiverse"
            className="h-9 w-auto logo-inv"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement;
              if (fb) fb.style.display = "block";
            }}
          />
          <span className="display hidden text-xl font-bold text-off">
            Markiverse
          </span>
        </a>

          {/* user-approved 2026-08-11: preview link to the v2 design concept */}
          <a
            href="/v2"
            className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-teal-bright transition-colors hover:bg-teal/20 sm:text-[11px]"
          >
            Preview v2 ↗
          </a>
        </div>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-medium text-mist transition-colors hover:text-off"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-teal transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={CONTACT_URL}
            className="text-sm font-semibold text-mist transition-colors hover:text-off"
          >
            Contact Us
          </a>
          {/* CTA appears only after the visitor scrolls past the hero */}
          <AnimatePresence>
            {pastHero && (
              <motion.a
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3 }}
                href={AUDIT_URL}
                className="btn-primary !px-5 !py-2.5 !text-sm"
                target="_blank"
                rel="noopener"
              >
                Run Free Audit
                <span aria-hidden>→</span>
              </motion.a>
            )}
          </AnimatePresence>
          <ThemeSwitcher />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`h-0.5 w-6 bg-off transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span className={`h-0.5 w-6 bg-off transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-0.5 w-6 bg-off transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>
      </header>

      {/* Rendered as a sibling of the header, not inside it: the header's
          backdrop-blur makes it the containing block for position:fixed, which
          would collapse this overlay to the height of the bar.
          No CTA in here either - the menu is opened to navigate, not to
          convert. The desktop bar can carry one because it needs no tap. */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-ink/55 backdrop-blur-2xl lg:hidden"
          >
            {/* Brand glow, so the glass reads as designed rather than grey.
                Mixed from the theme tokens rather than hardcoded teal/orange,
                so it follows Aurora's violet, Ember's amber and stays a soft
                tint on Light instead of a dark blotch. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(115% 75% at 100% 0%, color-mix(in srgb, var(--color-teal) 16%, transparent), transparent 58%), radial-gradient(95% 60% at 0% 100%, color-mix(in srgb, var(--color-orange) 12%, transparent), transparent 55%)",
              }}
            />

            <motion.div
              variants={MENU_LIST}
              initial="hidden"
              animate="show"
              /* the panel scrolls once the list outgrows the screen; the safe
                 area keeps the last item clear of the iOS home indicator */
              className="relative flex h-full flex-col px-6 pt-3 pb-[calc(2.25rem+env(safe-area-inset-bottom))]"
            >
              {/* rows share the free height: they stretch when the list is
                  short and compress as entries are added, capped so a few
                  items never look bloated and floored to stay tappable */}
              <ul className="flex flex-1 flex-col">
                {MOBILE_LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    variants={MENU_ITEM}
                    className="flex max-h-[84px] min-h-[56px] flex-1"
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex w-full items-center gap-5 border-b border-line/60"
                    >
                      <span className="display w-5 text-[11px] font-bold tracking-widest text-teal-bright/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display flex-1 text-[clamp(1.15rem,4.6vw,1.5rem)] font-bold leading-tight text-off transition-colors group-active:text-teal-bright">
                        {l.label}
                      </span>
                      <span
                        aria-hidden
                        className="text-lg text-mist/35 transition-all duration-300 group-active:translate-x-1 group-active:text-teal-bright"
                      >
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* the sign-off is what gives a short menu its composition, but
                  a long one needs the height more - drop it past 7 entries so
                  the list keeps filling the screen without scrolling */}
              <motion.div
                variants={MENU_ITEM}
                className={`mt-auto shrink-0 pt-10 ${
                  MOBILE_LINKS.length > 7 ? "hidden" : ""
                }`}
              >
                <span className="eyebrow mb-3">Markiverse</span>
                <p className="display text-[1.15rem] font-bold leading-snug text-mist/60">
                  Built by Strategists.
                  <br />
                  <span className="text-teal-bright/75">Sharpened by AI.</span>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
