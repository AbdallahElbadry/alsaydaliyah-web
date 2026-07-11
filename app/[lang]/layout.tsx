import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, locales, type Locale } from "./dictionaries";
import "../globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataByLocale: Record<Locale, Metadata> = {
  ar: {
    title: "الصيدلية بودكاست — فك شفرة سوق الدواء",
    description:
      "البودكاست الأول من نوعه في مجال الأعمال الدوائية، يأخذك خلف أبواب الإدارة العليا لكبرى شركات الأدوية. تقديم د. مينا زكريا فخري.",
    keywords: ["أدوية", "صيدلة", "بودكاست", "أعمال", "إدارة", "الصيدلية", "pharma", "podcast"],
    openGraph: {
      title: "الصيدلية بودكاست — فك شفرة سوق الدواء",
      description: "البودكاست الأول من نوعه في مجال الأعمال الدوائية، يأخذك خلف أبواب الإدارة العليا لكبرى شركات الأدوية.",
      type: "website",
      locale: "ar_EG",
    },
  },
  en: {
    title: "Alsaydaliyah — Decoding the Pharma Market",
    description:
      "The premier B2B podcast bringing you inside the closed doors of top pharmaceutical management. Hosted by Dr. Mina Zakaria Fakhry.",
    keywords: ["pharma", "pharmaceutical", "podcast", "B2B", "management", "Alsaydaliyah"],
    openGraph: {
      title: "Alsaydaliyah — Decoding the Pharma Market",
      description: "The premier B2B podcast bringing you inside the closed doors of top pharmaceutical management.",
      type: "website",
      locale: "en_US",
    },
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return metadataByLocale.ar;
  return metadataByLocale[lang];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const isArabic = lang === "ar";
  const fontClass = isArabic ? cairo.variable : inter.variable;
  const fontVar = isArabic ? "--font-cairo" : "--font-inter";

  return (
    <html
      lang={lang}
      dir={isArabic ? "rtl" : "ltr"}
      className={`${fontClass} ${geistMono.variable} antialiased`}
    >
      <body
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: `var(${fontVar}), system-ui, -apple-system, sans-serif` }}
      >
        {children}
      </body>
    </html>
  );
}
