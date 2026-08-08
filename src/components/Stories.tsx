"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const STORIES = [
  {
    img: "/images/story-infra.jpg",
    tag: "SEM · SEO · ROI",
    title:
      "Driving Strong ROI by Optimizing SEM & SEO for a Leading Digital Infrastructure Company",
  },
  {
    img: "/images/story-bschool.jpg",
    tag: "Web · CMS · Education",
    title:
      "Modernizing Premier B-School Websites for Speed, Discoverability & CMS Independence",
  },
  {
    img: "/images/story-brand.jpg",
    tag: "Brand · Admissions · UX",
    title: "Delivering Transformative Website, Admissions & Brand Experiences",
  },
];

export default function Stories() {
  return (
    <section id="stories" className="relative bg-ink py-20">
      <div className="mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-14">
          <span className="eyebrow mb-5">Credentials</span>
          <h2 className="display max-w-[760px] text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Success Stories from the{" "}
            <span className="text-orange-l">Business World</span>
          </h2>
        </Reveal>

        <div className="grid gap-7 md:grid-cols-3">
          {STORIES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <motion.a
                href="#"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="group block h-full overflow-hidden rounded-3xl border border-line bg-panel"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel/90 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-line2 bg-ink/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-off backdrop-blur">
                    {s.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="display mb-4 text-lg font-bold leading-snug text-off transition-colors group-hover:text-teal-bright">
                    {s.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-bright">
                    Read the story{" "}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </span>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
