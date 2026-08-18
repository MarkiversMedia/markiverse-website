"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { SERVICES, TOOLS, INDUSTRIES } from "./site-data";

type MenuId = "services" | "tools" | "industries";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [mobileSection, setMobileSection] = useState<MenuId | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const show = (id: MenuId | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  };
  const scheduleHide = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const menuButton = (id: MenuId, label: string) => (
    <button
      type="button"
      onMouseEnter={() => show(id)}
      onFocus={() => show(id)}
      onClick={() => setOpenMenu((cur) => (cur === id ? null : id))}
      aria-expanded={openMenu === id}
      suppressHydrationWarning
      className={`inline-flex items-center gap-1 text-sm transition-colors ${openMenu === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
    >
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform ${openMenu === id ? "rotate-180" : ""}`}
      />
    </button>
  );

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
      onMouseLeave={scheduleHide}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2" onClick={() => setOpenMenu(null)}>
          <img
            src="/assets/markiverse-logo.png"
            alt="Markiverse"
            width={200}
            height={84}
            className="h-14 w-auto"
          />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          <a
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onMouseEnter={() => show(null)}
          >
            Home
          </a>
          <a
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onMouseEnter={() => show(null)}
          >
            About Us
          </a>
          {menuButton("services", "Services")}
          {menuButton("tools", "Tools")}
          {menuButton("industries", "Industries")}
          <a
            href="/resources"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onMouseEnter={() => show(null)}
          >
            Resources
          </a>
          <a
            href="/join-us"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onMouseEnter={() => show(null)}
          >
            Join Us
          </a>
        </nav>
        <div className="hidden lg:block">
          <a
            href="/contact"
            className="inline-flex items-center rounded-full bg-[image:var(--gradient-accent)] px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-accent)] transition-transform hover:-translate-y-0.5"
          >
            Book a growth review
          </a>
        </div>
        <button
          className="lg:hidden"
          aria-label="Toggle navigation"
          suppressHydrationWarning
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {openMenu && (
        <div
          className="absolute inset-x-0 top-16 hidden border-b border-border/60 bg-background/98 backdrop-blur-xl lg:block"
          onMouseEnter={() => show(openMenu)}
        >
          <div className="mx-auto max-w-7xl px-8 py-8">
            {openMenu === "services" && (
              <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                {SERVICES.map((service) => (
                  <a
                    key={service.label}
                    href={`/${service.hash}`}
                    onClick={() => setOpenMenu(null)}
                    className="group rounded-2xl border border-transparent p-3 transition-colors hover:border-border hover:bg-accent/[0.05]"
                  >
                    <div className="text-sm font-semibold text-foreground">
                      {service.label}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {service.desc}
                    </p>
                  </a>
                ))}
              </div>
            )}
            {openMenu === "tools" && (
              <div className="grid max-w-3xl grid-cols-2 gap-6">
                {TOOLS.map((tool) => (
                  <a
                    key={tool.label}
                    href={tool.to}
                    onClick={() => setOpenMenu(null)}
                    className="rounded-2xl border border-border p-5 transition-colors hover:bg-accent/[0.05]"
                  >
                    <div className="text-sm font-semibold text-foreground">
                      {tool.label}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {tool.desc}
                    </p>
                  </a>
                ))}
              </div>
            )}
            {openMenu === "industries" && (
              <div className="grid grid-cols-4 gap-x-8 gap-y-3">
                {INDUSTRIES.map((industry) => (
                  <a
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    onClick={() => setOpenMenu(null)}
                    className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/[0.05] hover:text-foreground"
                  >
                    {industry.label}
                  </a>
                ))}
                <a
                  href="/industries"
                  onClick={() => setOpenMenu(null)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-foreground"
                >
                  All industries →
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background/98 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <MobileLink href="/" onClick={() => setMobileOpen(false)}>
              Home
            </MobileLink>
            <MobileLink href="/about" onClick={() => setMobileOpen(false)}>
              About Us
            </MobileLink>
            <MobileGroup
              label="Services"
              open={mobileSection === "services"}
              onToggle={() =>
                setMobileSection((cur) => (cur === "services" ? null : "services"))
              }
            >
              {SERVICES.map((service) => (
                <a
                  key={service.label}
                  href={`/${service.hash}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm text-muted-foreground"
                >
                  {service.label}
                </a>
              ))}
            </MobileGroup>
            <MobileGroup
              label="Tools"
              open={mobileSection === "tools"}
              onToggle={() =>
                setMobileSection((cur) => (cur === "tools" ? null : "tools"))
              }
            >
              {TOOLS.map((tool) => (
                <a
                  key={tool.label}
                  href={tool.to}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm text-muted-foreground"
                >
                  {tool.label}
                </a>
              ))}
            </MobileGroup>
            <MobileGroup
              label="Industries"
              open={mobileSection === "industries"}
              onToggle={() =>
                setMobileSection((cur) =>
                  cur === "industries" ? null : "industries",
                )
              }
            >
              {INDUSTRIES.map((industry) => (
                <a
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-sm text-muted-foreground"
                >
                  {industry.label}
                </a>
              ))}
            </MobileGroup>
            <MobileLink href="/resources" onClick={() => setMobileOpen(false)}>
              Resources
            </MobileLink>
            <MobileLink href="/join-us" onClick={() => setMobileOpen(false)}>
              Join Us
            </MobileLink>
            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 rounded-full bg-[image:var(--gradient-accent)] px-5 py-2.5 text-center text-sm font-semibold text-accent-foreground"
            >
              Book a growth review
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="border-b border-border/60 py-3 text-sm font-medium text-foreground"
    >
      {children}
    </a>
  );
}

function MobileGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        suppressHydrationWarning
        className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="flex flex-col pb-3 pl-3">{children}</div>}
    </div>
  );
}
