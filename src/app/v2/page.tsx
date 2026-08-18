import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./v2.css";
import { V2Nav, V2Footer } from "./chrome";
import { V2Hero, V2Marquee } from "./hero";
import { V2Shift, V2Work, V2Industries, V2Logos } from "./story";
import { V2Services, V2System, V2Stats } from "./offer";
import { V2Voices, V2Closing } from "./voices";
import { V2Faq } from "./faq";
import { ParallaxBand, SmoothScroll } from "./motion";

const mono = Space_Mono({
  variable: "--font-v2-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Markiverse — Design Concept v2",
  description:
    "A design concept for the Markiverse homepage. Built by Strategists. Sharpened by AI.",
};

/* Drop a brand reel at public/videos/reel.mp4 and this section appears
   automatically — until then the page ships without it. */
const hasReel = existsSync(path.join(process.cwd(), "public", "videos", "reel.mp4"));

function V2Reel() {
  return (
    <section className="relative h-[85vh] min-h-[480px] overflow-hidden">
      <video
        src="/videos/reel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <span className="v2-label absolute left-6 top-8 lg:left-10">Showreel/</span>
      <span className="v2-mono absolute bottom-8 right-6 text-[11px] uppercase tracking-[0.16em] text-white/60 lg:right-10">
        Placeholder footage — swap with brand reel
      </span>
    </section>
  );
}

export default function V2Page() {
  return (
    <main className={`v2 relative ${mono.variable}`}>
      {/* restore the saved v2 theme before the sections below paint */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(localStorage.getItem('mv2-theme')==='light')document.documentElement.setAttribute('data-v2-theme','light')}catch(e){}",
        }}
      />
      <SmoothScroll />
      <V2Nav />
      <V2Hero />
      <V2Marquee />
      {hasReel && <V2Reel />}
      <V2Shift />
      <V2Logos />
      <V2Work />
      <V2Industries />
      <ParallaxBand img="/images/team-studio.jpg" alt="Markiverse studio at work" />
      <V2Services />
      <V2System />
      <V2Stats />
      <V2Voices />
      <V2Faq />
      <V2Closing />
      <V2Footer />
    </main>
  );
}
