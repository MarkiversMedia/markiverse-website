import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { THEME_INIT_SCRIPT } from "@/components/themes";

export const metadata: Metadata = {
  title: "Markiverse | AI-Native Marketing Agency for Growth",
  description:
    "Strategy, Experience, Demand, Revenue, Intelligence and Creative run as one AI-sharpened growth engine — from market definition to attributed pipeline.",
  openGraph: {
    title: "Markiverse | AI-Native Marketing Agency for Growth",
    description:
      "Strategy, Experience, Demand, Revenue, Intelligence and Creative run as one AI-sharpened growth engine — from market definition to attributed pipeline.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning on <html>: the theme init script sets
    // data-theme/class before hydration. On <body>: browser extensions inject
    // attributes before React hydrates. Both only affect that one element.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Restore the saved theme before first paint to avoid a flash. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
