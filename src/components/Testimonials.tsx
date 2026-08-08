"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const TESTIMONIALS = [
  {
    quote:
      "Working with Markiverse on the revamp of our website has been a very positive experience. They understood our vision and translated it into a modern platform that incorporates contemporary technologies and evolving education trends.",
    name: "Pamela Kumar",
    role: "Chief Strategy Advisor, Telecom & Data, FSID, IISc",
  },
  {
    quote:
      "Markiverse excels in web tech, copywriting, and design, offering a one-stop, professional service. Their approach is timely, dedicated, and friendly — a perfect blend.",
    name: "Roshnie Venkataraman",
    role: "GM & Head of Marketing, BCT Digital",
  },
  {
    quote:
      "Markiverse excels in diverse marketing skills from web development to digital marketing. Their quality work, professionalism, and ethic shine; they consistently overdeliver.",
    name: "Rouba Habboushi",
    role: "CEO, Kelni GVG, Ghana",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-navy py-20">
      <div
        aria-hidden
        className="ghost pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-[clamp(5rem,13vw,11rem)] leading-none"
      >
        VOICES
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-14 text-center">
          <span className="eyebrow mb-5 justify-center">Hear From Our Clients</span>
          <h2 className="display text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Trusted by Teams That{" "}
            <span className="text-teal-bright">Ship &amp; Scale</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.figure

                className="card-glow flex h-full flex-col rounded-3xl border border-line bg-panel p-8"
              >
                <span aria-hidden className="display mb-4 text-5xl leading-none text-teal/40">
                  &ldquo;
                </span>
                <blockquote className="flex-1 text-[14.5px] italic leading-[1.9] text-off/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                  <span className="display flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal/40 text-sm font-bold text-ink">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-off">{t.name}</span>
                    <span className="block text-[12px] leading-snug text-mist">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
