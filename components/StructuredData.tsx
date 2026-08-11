import {
  ADDRESS,
  CONTACT,
  FAQS,
  PHASE,
  PRICING,
  PROJECT,
  SALES_CENTRE,
  SITE_URL,
} from "@/lib/project";

/**
 * All JSON-LD is emitted from one place and reads from lib/project.ts, so the
 * markup can never contradict the visible copy.
 *
 * Deliberately NOT emitted:
 *
 * - aggregateRating / review. We have no genuine review corpus, and fabricating
 *   one is both a Google spam violation and a RECO advertising problem.
 *
 * - A numeric offer price. Caivan publishes a band ("from the high $500s"), not
 *   a figure. Emitting a machine-readable lowPrice would mean inventing one:
 *   $500,000 understates the band by up to $99,000, and anything higher is a
 *   guess. A rich result is not worth a price in the SERP that the page cannot
 *   honour, so the offer carries availability and currency only.
 */
export function StructuredData() {
  const postal = {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  };

  const geo = {
    "@type": "GeoCoordinates",
    latitude: ADDRESS.lat,
    longitude: ADDRESS.lng,
  };

  const images = [
    `${SITE_URL}/renderings/lakefront-ogden-park.jpg`,
    `${SITE_URL}/renderings/elevation.jpg`,
    `${SITE_URL}/renderings/kitchen.jpg`,
  ];

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: PROJECT.name,
      inLanguage: "en-CA",
      publisher: { "@id": `${SITE_URL}/#brokerage` },
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/#brokerage`,
      name: CONTACT.brokerage,
      url: SITE_URL,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      areaServed: { "@type": "City", name: ADDRESS.city },
    },
    {
      "@type": "ApartmentComplex",
      "@id": `${SITE_URL}/#development`,
      name: PROJECT.name,
      alternateName: [...PROJECT.alternateNames],
      url: SITE_URL,
      image: images,
      description: `Pre-construction ${PROJECT.homeType.toLowerCase()} by ${PROJECT.developer} — ${PROJECT.productNote.toLowerCase()} — in the ${PROJECT.masterPlan} master-planned waterfront community, ${ADDRESS.city}, Ontario.`,
      address: postal,
      geo,
      numberOfAvailableAccommodationUnits: PHASE.homeCount,
      numberOfBedrooms: {
        "@type": "QuantitativeValue",
        minValue: PRICING.bedsMin,
        maxValue: PRICING.bedsMax,
      },
      floorSize: {
        "@type": "QuantitativeValue",
        minValue: PRICING.sqftMin,
        maxValue: PRICING.sqftMax,
        unitCode: "FTK",
      },
      petsAllowed: true,
      amenityFeature: [
        "Underground parking included",
        "Two-minute walk to the Lake Ontario waterfront",
        "Backing onto Ogden Park",
        "Lakeview Village District Energy system",
        "ENERGY STAR rated windows",
      ].map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}/#offer`,
      name: `${PROJECT.name} — ${PHASE.label}`,
      description: `${PRICING.bedsMin}–${PRICING.bedsMax} bedroom ${PROJECT.homeType.toLowerCase()}, ${PRICING.sqftMin}–${PRICING.sqftMax} sq. ft., from ${PRICING.fromDisplay}. First tentative closing ${PRICING.occupancy}.`,
      image: images,
      brand: { "@type": "Brand", name: PROJECT.developer },
      category: "Pre-construction townhome",
      offers: {
        "@type": "Offer",
        priceCurrency: PRICING.currency,
        availability: "https://schema.org/PreOrder",
        seller: { "@id": `${SITE_URL}/#brokerage` },
        url: SITE_URL,
      },
    },
    {
      "@type": "Place",
      "@id": `${SITE_URL}/#place`,
      name: PROJECT.masterPlan,
      description: `177-acre master-planned waterfront community on the Lake Ontario shoreline, ${ADDRESS.locationNote}`,
      address: postal,
      geo,
    },
    {
      "@type": "Place",
      "@id": `${SITE_URL}/#salesgallery`,
      name: SALES_CENTRE.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SALES_CENTRE.address,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.region,
        addressCountry: ADDRESS.country,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: `${ADDRESS.city} Pre-Construction`,
          item: `${SITE_URL}/#overview`,
        },
        { "@type": "ListItem", position: 3, name: PROJECT.name, item: SITE_URL },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
