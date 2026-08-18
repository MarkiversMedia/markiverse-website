import type { Metadata } from "next";
import "./fonts.css";
import "./markiverse.css";
import "./custom.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
