const ITEMS = [
  "AI Overviews",
  "ChatGPT",
  "Gemini",
  "SEO",
  "AEO",
  "GEO",
  "Demand Generation",
  "Brand Strategy",
  "Web Development",
  "Content",
  "Video",
  "ABM",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-line bg-navy py-5">
      <div className="marquee-track items-center gap-0">
        {row.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="display px-6 text-sm font-semibold uppercase tracking-[0.2em] text-mist/80">
              {item}
            </span>
            <span className="text-teal" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
