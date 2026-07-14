import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alsaydaliyah.com";

const metadataByLocale: Record<Locale, Metadata> = {
  ar: {
    metadataBase: new URL(SITE_URL),
    title: "الصيدلية بودكاست — فك شفرة سوق الدواء",
    description:
      "البودكاست الأول من نوعه في مجال الأعمال الدوائية، يأخذك خلف أبواب الإدارة العليا لكبرى شركات الأدوية. تقديم د. مينا زكريا فخري.",
    keywords: ["أدوية", "صيدلة", "بودكاست", "أعمال", "إدارة", "الصيدلية", "pharma", "podcast"],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: "الصيدلية بودكاست — فك شفرة سوق الدواء",
      description: "البودكاست الأول من نوعه في مجال الأعمال الدوائية، يأخذك خلف أبواب الإدارة العليا لكبرى شركات الأدوية.",
      type: "website",
      locale: "ar_EG",
      url: `${SITE_URL}/ar`,
      siteName: "الصيدلية بودكاست",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "الصيدلية بودكاست — فك شفرة سوق الدواء",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "الصيدلية بودكاست — فك شفرة سوق الدواء",
      description: "البودكاست الأول من نوعه في مجال الأعمال الدوائية، يأخذك خلف أبواب الإدارة العليا لكبرى شركات الأدوية.",
      images: ["/og-image.png"],
    },
  },
  en: {
    metadataBase: new URL(SITE_URL),
    title: "Alsaydaliyah — Decoding the Pharma Market",
    description:
      "The premier B2B podcast bringing you inside the closed doors of top pharmaceutical management. Hosted by Dr. Mina Zakaria Fakhry.",
    keywords: ["pharma", "pharmaceutical", "podcast", "B2B", "management", "Alsaydaliyah"],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: "Alsaydaliyah — Decoding the Pharma Market",
      description: "The premier B2B podcast bringing you inside the closed doors of top pharmaceutical management.",
      type: "website",
      locale: "en_US",
      url: `${SITE_URL}/en`,
      siteName: "Alsaydaliyah",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Alsaydaliyah — Decoding the Pharma Market",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Alsaydaliyah — Decoding the Pharma Market",
      description: "The premier B2B podcast bringing you inside the closed doors of top pharmaceutical management.",
      images: ["/og-image.png"],
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
  const currentLang = hasLocale(lang) ? (lang as Locale) : "ar";
  const baseMetadata = metadataByLocale[currentLang];

  return {
    ...baseMetadata,
    alternates: {
      canonical: `/${currentLang}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
  };
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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NVLHVKSP');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: `var(${fontVar}), system-ui, -apple-system, sans-serif` }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVLHVKSP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
