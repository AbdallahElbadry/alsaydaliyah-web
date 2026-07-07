import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alsaydaliyah — Decoding the Pharma Market",
  description:
    "The premier B2B podcast bringing you inside the closed doors of top pharmaceutical management. Hosted by Dr. Mina Zakaria Fakhry.",
  keywords: [
    "pharma",
    "pharmaceutical",
    "podcast",
    "B2B",
    "management",
    "Alsaydaliyah",
  ],
  openGraph: {
    title: "Alsaydaliyah — Decoding the Pharma Market",
    description:
      "The premier B2B podcast bringing you inside the closed doors of top pharmaceutical management.",
    type: "website",
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
      className={`${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
