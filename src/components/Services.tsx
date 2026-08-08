"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { CONTACT_URL } from "./links";

const SERVICES = [
  {
    n: "01",
    slug: "web-development",
    name: "Web Development",
    desc: "Fast, modern, conversion-ready websites with AI-powered personalization that adapts the experience to each visitor's industry, role, and intent.",
    img: "/images/story-bschool.jpg",
  },
  {
    n: "02",
    slug: "digital-marketing",
    name: "Digital Marketing",
    desc: "SEO, AEO, GEO, SEM, social media, content, and email built as one coordinated system with every channel feeding the same pipeline view.",
    img: "/images/industry-tech.jpg",
  },
  {
    n: "03",
    slug: "content-development",
    name: "Content Development",
    desc: "Content mapped to each stage of buyer evaluation: thought leadership for awareness, proof content for the harder middle, case studies and ROI tools for the decision.",
    img: "/images/service-content.jpg",
  },
  {
    n: "04",
    slug: "brand-design-strategy",
    name: "Brand Design & Strategy",
    desc: "Identity systems and positioning reinforced by AI website personalization — that hold up across a long, considered enterprise sales cycle.",
    img: "/images/team-studio.jpg",
  },
  {
    n: "05",
    slug: "video-development",
    name: "Video Development",
    desc: "From explainer videos to event and product storytelling, built to carry technical or institutional credibility where written content alone won't land.",
    img: "/images/hero-visual.jpg",
  },
  {
    n: "06",
    slug: "demand-generation",
    name: "Demand Generation",
    desc: "AI-driven funnels that build pipeline — from top-of-funnel visibility to intelligent lead scoring that tells sales exactly when a prospect is ready to talk.",
    img: "/images/service-demandgen.jpg",
  },
];

const TEXT_VARIANTS = [
  { initial: { opacity: 0, y: 16 }, exit: { opacity: 0, y: -8 } },
  { initial: { opacity: 0, x: -18 }, exit: { opacity: 0, x: 12 } },
  { initial: { opacity: 0, x: 18 }, exit: { opacity: 0, x: -12 } },
  { initial: { opacity: 0, scale: 0.96, y: 8 }, exit: { opacity: 0, scale: 0.98 } },
  { initial: { opacity: 0, filter: "blur(10px)" }, exit: { opacity: 0, filter: "blur(6px)" } },
  { initial: { opacity: 0, y: 12, filter: "blur(6px)" }, exit: { opacity: 0, filter: "blur(4px)" } },
  { initial: { opacity: 0, y: -16 }, exit: { opacity: 0, y: 8 } },
  { initial: { opacity: 0, y: -12, filter: "blur(6px)" }, exit: { opacity: 0, y: 6, filter: "blur(4px)" } },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [variant, setVariant] = useState(TEXT_VARIANTS[0]);

  const select = (i: number) => {
    if (i !== active) {
      setVariant(TEXT_VARIANTS[Math.floor(Math.random() * TEXT_VARIANTS.length)]);
    }
    setActive(i);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-ink py-20">
      <div className="relative mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-14">
          <span className="eyebrow mb-5">Services Spotlight</span>
          <h2 className="display max-w-[880px] text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Outcome-Based Services from the{" "}
            <span className="text-teal-bright">Premier Digital Marketing Agency</span>{" "}
            in India
          </h2>
          <p className="mt-5 max-w-[700px] text-lg leading-relaxed text-mist">
            DeSiRE and SEO RADAR are built on top of Markiverse&apos;s full-service
            AI-led capabilities that run as one connected system around your
            buyer&apos;s journey.
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
          {/* ---------- service list: names only, fixed height ---------- */}
          <div className="flex flex-col justify-between">
            {SERVICES.map((s, i) => {
              const isActive = active === i;
              return (
                <button
                  key={s.n}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  onClick={() => select(i)}
                  className={`group block w-full border-b py-[18px] text-left transition-colors first:border-t ${
                    isActive ? "border-teal/40" : "border-line"
                  }`}
                >
                  <span className="flex items-baseline gap-5">
                    <span
                      className={`display text-sm font-bold transition-colors ${
                        isActive ? "text-teal-bright" : "text-mist/50"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span
                      className={`display flex-1 text-[clamp(1.3rem,2.1vw,1.8rem)] font-bold transition-all duration-300 ${
                        isActive ? "translate-x-1.5 text-teal-bright" : "text-off"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span
                      aria-hidden
                      className={`text-xl transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-teal-bright opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                    >
                      →
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ---------- image frame, same height as the list ---------- */}
          <div className="relative hidden min-h-[420px] overflow-hidden rounded-3xl border border-line lg:block">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={SERVICES[active].img}
                  alt={SERVICES[active].name}
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* text lives on the image */}
            <span
              aria-hidden
              className="ghost absolute right-5 top-2 text-[5.5rem] leading-none"
            >
              {SERVICES[active].n}
            </span>
            <div className="absolute bottom-6 left-7 right-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={variant.initial}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
                  exit={{ ...variant.exit, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="display mb-2 text-2xl font-bold text-off drop-shadow">
                    {SERVICES[active].name}
                  </div>
                  <p className="max-w-[460px] text-[15px] leading-[1.8] text-off">
                    {SERVICES[active].desc}
                  </p>
                  <a
                    href={`${CONTACT_URL}?service=${SERVICES[active].slug}&utm_source=homepage&utm_medium=services_section`}
                    className="link-arrow mt-4 text-[14px]"
                  >
                    Reach Out to Us <span aria-hidden>→</span>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* mobile: description under the list, no image */}
        <div className="mt-6 lg:hidden">
          <p className="text-[14.5px] leading-[1.8] text-mist">
            {SERVICES[active].desc}
          </p>
          <a
            href={`${CONTACT_URL}?service=${SERVICES[active].slug}&utm_source=homepage&utm_medium=services_section`}
            className="link-arrow mt-3 text-[14px]"
          >
            Reach Out to Us <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
