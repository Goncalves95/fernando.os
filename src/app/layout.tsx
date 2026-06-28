import { MotionConfig } from "framer-motion";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const TITLE = "Fernando Gonçalves | Full Stack Engineer · Zürich";
const DESCRIPTION =
  "Senior Full Stack Engineer specializing in Java, Angular, Python ML. Based in Zürich, Switzerland.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Fernando Gonçalves",
  },
  description: DESCRIPTION,
  keywords: [
    "Fernando Gonçalves",
    "Full Stack Engineer",
    "Java",
    "Spring Boot",
    "Angular",
    "Python",
    "Machine Learning",
    "Zürich",
    "Switzerland",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Fernando Gonçalves" }],
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Fernando Gonçalves",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-surface font-sans text-zinc-200 antialiased">
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
