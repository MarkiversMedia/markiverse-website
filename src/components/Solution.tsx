"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { AUDIT_URL, CONTACT_URL } from "./links";

const STEPS = [
  {
    num: "01",
    tag: "Free · 48-Hour Diagnostic",
    name: "DeSiRE",
    title: "Discover Where Your Brand Stands on the AI SEO Spectrum",
    body: "DeSiRE is Markiverse's AI confidence audit — a free, 48-hour diagnostic that shows enterprise marketing leaders exactly how AI responds when buyers ask the questions your brand should be answering. It measures not where you rank, but whether AI recommends you when your buyer is making a decision.",
    quote:
      "DeSiRE is the only tool that gives your team a ranked to-do list AND a ranked stop-doing list generated from your own data — in under three minutes.",
    quoteLabel: "Not just another SEO audit tool",
    cta: { label: "Run Free Brand Audit", href: AUDIT_URL, primary: true },
    accent: "teal",
  },
  {
    num: "02",
    tag: "AI Visibility Retainer",
    name: "SEO RADAR",
    title: "From Knowing the Gap to Closing It",
    body: "Once DeSiRE shows you where your brand stands in AI-generated responses, the next question is straightforward: what closes the gap? SEO RADAR is Markiverse's AI visibility retainer — a proven platform that works the answer, week by week, until your brand is consistently part of the conversation your buyers are having with AI.",
    quote:
      "DeSiRE finds the gap. SEO RADAR closes it — and tracks it so your leadership always knows where the brand stands in AI responses, not just Google rankings.",
    quoteLabel: "From identifying risks to mitigating them",
    cta: { label: "Talk to Us About SEO RADAR", href: CONTACT_URL, primary: false },
    accent: "orange",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden bg-ink py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-teal/5 blur-[120px]" />

      <div className="relative mx-auto max-w-[1240px] px-5">
        <Reveal className="mb-16 text-center">
          <span className="eyebrow mb-5 justify-center">The Solution</span>
          <h2 className="display mx-auto max-w-[760px] text-[clamp(2rem,4.2vw,3.3rem)] font-bold leading-[1.08] text-off">
            Two Steps From Invisible to{" "}
            <span className="text-teal-bright">AI-Recommended</span>
          </h2>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {STEPS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.12}>
              <motion.article

                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel p-8 lg:p-10"
              >
                {/* giant step number */}
                <span
                  aria-hidden
                  className="ghost absolute -top-6 right-4 text-[7rem] leading-none transition-opacity group-hover:opacity-60"
                >
                  {s.num}
                </span>

                <span
                  className={`mb-5 w-fit rounded-full border px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
                    s.accent === "teal"
                      ? "border-teal/30 bg-teal/10 text-teal-bright"
                      : "border-orange/30 bg-orange/10 text-orange-l"
                  }`}
                >
                  Step {s.num} · {s.tag}
                </span>

                <h3 className="display mb-1 text-3xl font-bold text-off">{s.name}</h3>
                <p className="mb-4 text-lg font-semibold text-off/85">{s.title}</p>
                <p className="mb-6 flex-1 leading-[1.85] text-mist">{s.body}</p>

                <figure
                  className={`mb-7 rounded-xl border-l-4 bg-well p-5 ${
                    s.accent === "teal" ? "border-teal" : "border-orange"
                  }`}
                >
                  <figcaption className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-mist">
                    {s.quoteLabel}
                  </figcaption>
                  <blockquote className="text-[15px] italic leading-relaxed text-off/85">
                    &ldquo;{s.quote}&rdquo;
                  </blockquote>
                </figure>

                <a
                  href={s.cta.href}
                  target="_blank"
                  rel="noopener"
                  className={s.cta.primary ? "btn-primary w-fit" : "btn-ghost w-fit"}
                >
                  {s.cta.label} <span aria-hidden>→</span>
                </a>
              </motion.article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
