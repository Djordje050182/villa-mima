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
