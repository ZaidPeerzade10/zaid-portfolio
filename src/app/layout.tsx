import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "./fonts/Geist-Variable.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Zaid Peerzade — Lead AI Engineer",
  description:
    "Zaid Peerzade is a lead AI engineer in Pune who builds agents, RAG systems and automation that do real work.",
  openGraph: {
    title: "Zaid Peerzade — Lead AI Engineer",
    description: "Lead AI Engineer in Pune building RAG pipelines and AI agents.",
    images: ["/zaid.webp"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
