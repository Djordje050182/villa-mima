import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Footer from "@/components/Footer";
import ElevationRail from "@/components/ElevationRail";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Villa Mima — Luxury Villa with Private Pool, Bay of Kotor, Montenegro",
    template: "%s — Villa Mima, Bay of Kotor",
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_GB",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Villa Mima above the Bay of Kotor at golden hour" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${karla.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <ElevationRail />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
