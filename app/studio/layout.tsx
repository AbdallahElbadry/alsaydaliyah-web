import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alsaydaliyah Studio",
  robots: { index: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
