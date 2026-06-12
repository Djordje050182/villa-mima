import { site } from "./site";

/** schema.org VacationRental — rendered as JSON-LD on the home page. */
export function vacationRentalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    name: site.name,
    url: site.url,
    description: site.description,
    identifier: "villa-mima-muo",
    brand: { "@type": "Brand", name: site.name },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.village,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.latitude,
      longitude: site.location.longitude,
    },
    containsPlace: {
      "@type": "Accommodation",
      occupancy: { "@type": "QuantitativeValue", value: site.facts.sleeps },
      numberOfBedrooms: site.facts.bedrooms,
      numberOfBathroomsTotal: site.facts.bathrooms,
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Private pool", value: true },
        { "@type": "LocationFeatureSpecification", name: "Panoramic bay view", value: true },
        { "@type": "LocationFeatureSpecification", name: "Private grounds (10,000 m²)", value: true },
        { "@type": "LocationFeatureSpecification", name: "Separate annex", value: true },
        { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
        { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
        { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
      ],
    },
    knowsLanguage: ["en", "sr"],
    image: [`${site.url}/images/og.jpg`],
  };
}

/** schema.org BreadcrumbList for inner pages. */
export function breadcrumbJsonLd(pageName: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Villa Mima", item: site.url },
      { "@type": "ListItem", position: 2, name: pageName, item: `${site.url}${path}` },
    ],
  };
}

/** The FAQ shown on the availability page — single source for the visible
 *  accordion AND the FAQPage JSON-LD (they must match, per Google's rules). */
export const bookingFaq = [
  {
    question: "How does booking direct work?",
    answer:
      "Send us your dates through the enquiry form and we reply personally, usually within a day. We confirm availability, agree the details and hold the dates while we talk. Booking direct with the family always gets you our best rate — there are no platform fees.",
  },
  {
    question: "How many people can Villa Mima sleep?",
    answer:
      "Up to eight guests, across four bedrooms and three bathrooms — including a separate annex with its own entrance for guests who like their own space.",
  },
  {
    question: "Where exactly is the villa?",
    answer:
      "In Muo, the quiet western shore of the Bay of Kotor in Montenegro — a twenty-minute walk or four-minute drive from Kotor's UNESCO old town, and around twenty minutes from Tivat airport.",
  },
  {
    question: "Is the availability calendar accurate?",
    answer:
      "Yes — it syncs automatically across every channel we list on, including Airbnb and Booking.com, so what you see here is live. If your dates show free, they are free.",
  },
  {
    question: "Do I pay anything when I enquire?",
    answer:
      "No. An enquiry is just a conversation — no payment is taken on this website. We agree everything personally before anything is confirmed.",
  },
] as const;

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: bookingFaq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
