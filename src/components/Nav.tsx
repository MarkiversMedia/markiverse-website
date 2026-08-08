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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink/85 backdrop-blur-xl border-b border-line"
          : "bg-transparent"
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-teal to-orange"
        style={{ scaleX: progress }}
      />
      <nav className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between px-5">
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
            aria-label="Toggle menu"
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

      {open && (
        <div className="border-t border-line bg-ink/95 px-6 py-6 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-base font-medium text-off"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={AUDIT_URL} className="btn-primary" target="_blank" rel="noopener">
                Run Free Brand Audit →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
