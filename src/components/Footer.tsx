import { AUDIT_URL, CONTACT_URL, LOGO_URL, WHATSAPP_URL } from "./links";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} alt="Markiverse" className="mb-5 h-9 w-auto logo-inv" />
          <p className="max-w-[380px] text-[14px] leading-[1.85] text-mist">
            Built by Strategists. Sharpened by AI. India&apos;s leading digital
            marketing agency for the AI search era — making sure AI recommends your
            brand when buyers ask.
          </p>
        </div>

        <div>
          <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-off">
            Explore
          </div>
          <ul className="flex flex-col gap-3 text-[14px]">
            {[
              ["#solution", "DeSiRE Audit"],
              ["#usecases", "Use Cases"],
              ["#services", "Services"],
              ["#stories", "Case Studies"],
              ["#faqs", "FAQs"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-mist transition-colors hover:text-teal-bright">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-off">
            Get In Touch
          </div>
          <ul className="flex flex-col gap-3 text-[14px]">
            <li>
              <a href={CONTACT_URL} className="text-mist transition-colors hover:text-teal-bright">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener"
                className="text-mist transition-colors hover:text-teal-bright"
              >
                WhatsApp Us
              </a>
            </li>
            <li>
              <a
                href={AUDIT_URL}
                target="_blank"
                rel="noopener"
                className="text-mist transition-colors hover:text-teal-bright"
              >
                Free DeSiRE Audit
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-6 text-center text-[12px] text-mist/70">
        © {new Date().getFullYear()} Markiverse Media. All rights reserved.
      </div>
    </footer>
  );
}
