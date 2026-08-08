"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const INDUSTRIES = [
  {
    img: "/images/industry-tech.jpg",
    name: "Technology & Hi-Tech",
    body: "Demand generation and ABM built for long, technically complex sales cycles.",
  },
  {
    img: "/images/industry-telecom.jpg",
    name: "Telecom",
    body: "Programs built around enterprise procurement timelines and technically detailed buying criteria.",
  },
  {
    img: "/images/industry-edu.jpg",
    name: "Education & EdTech",
    body: "Messaging and digital presence built around admissions cycles, institutional decision-making, and trust-building with prospective students and parents.",
  },
  {
    img: "/images/industry-fintech.jpg",
    name: "FinTech Services",
    body: "Compliance-aware programs that build the trust required before a financial buyer engages.",
  },
  {
    img: "/images/industry-health.jpg",
    name: "Healthcare & Pharma",
    body: "Marketing that respects regulatory constraints while still generating qualified interest.",
  },
  {
    img: "/images/industry-gov.jpg",
    name: "Government & Public Sector",
    body: "Strategies built around tender cycles and formal public-sector decision structures.",
  },
];

export default function Industries() {
  return (
    <section className="relative bg-navy py-20">
      <div className="mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-14">
          <span className="eyebrow mb-5">Presence</span>
          <h2 className="display max-w-[720px] text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Industries We <span className="text-teal-bright">Serve</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group relative h-64 overflow-hidden rounded-2xl border border-line"
              >
                <Image
                  src={ind.img}
                  alt={ind.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10 transition-colors duration-300 group-hover:from-ink group-hover:via-ink/70" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="display mb-1 text-xl font-bold text-off">{ind.name}</h3>
                  <p className="max-h-0 overflow-hidden text-[13px] leading-relaxed text-mist opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {ind.body}
                  </p>
                </div>
                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-line2 bg-ink/40 text-off opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  →
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
