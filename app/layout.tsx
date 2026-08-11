import type { Metadata } from "next";
import { Jost, Fraunces } from "next/font/google";
import "./globals.css";
import { ADDRESS, PRICING, PROJECT, SITE_URL } from "@/lib/project";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const title = `${PROJECT.name} | Townhomes From ${PRICING.fromDisplay} | ${ADDRESS.city}`;
const description = `Aura at Lakeview Village — final release urban towns by ${PROJECT.developer} at ${ADDRESS.street}, ${ADDRESS.city} (${ADDRESS.crossStreets}). From ${PRICING.fromDisplay}, ${PRICING.sqftMin}–${PRICING.sqftMax} sq. ft., ${PRICING.bedsMin}–${PRICING.bedsMax} bedrooms, underground parking included. Get the price list and all seven floor plans.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${PROJECT.name}`,
  },
  description,
  keywords: [
    "Aura Lakeview Village",
    "Aura at Lakeview Village",
    "Aura Towns Mississauga",
    "Aura by Caivan",
    "Lakeview Village Mississauga",
    "Mississauga pre-construction townhomes",
    "Mississauga waterfront townhomes",
    "Caivan Mississauga",
    "Aura Towns Lakeshore and Dixie",
    "Caivan stacked townhomes Mississauga",
    "new townhomes Mississauga",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: PROJECT.name,
    title,
    description,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "real estate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${jost.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
