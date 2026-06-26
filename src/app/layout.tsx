import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://williamragnarsson.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "William Ragnarsson — builds cool shit",
  description:
    "CS student, ex-VC intern at Plug & Play, full-time builder. Trained models, simulated chaos, won hackathons, shipped a lot. Just getting started.",
  keywords: [
    "William Ragnarsson",
    "software engineer",
    "Plug and Play",
    "machine learning",
    "hackathons",
    "portfolio",
  ],
  authors: [{ name: "William Ragnarsson" }],
  openGraph: {
    title: "William Ragnarsson — builds cool shit",
    description:
      "CS student, ex-VC intern, full-time builder. Trained models, simulated chaos, won hackathons. Just getting started.",
    url: SITE_URL,
    siteName: "William Ragnarsson",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "William Ragnarsson — builds cool shit",
    description:
      "CS student, ex-VC intern, full-time builder. Just getting started.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
