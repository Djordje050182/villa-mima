export const site = {
  name: "Villa Mima",
  url: "https://www.villamima.com",
  description:
    "Villa Mima is a restored 150-year-old stone villa in Muo, on the quiet western shore of the Bay of Kotor, Montenegro. Four bedrooms, private pool, 10,000 m² of private hillside and panoramic views over the whole bay. Book direct with the family.",
  location: {
    village: "Muo",
    region: "Bay of Kotor",
    country: "Montenegro",
    countryCode: "ME",
    // TODO(owner): replace with the villa's exact coordinates
    latitude: 42.4225,
    longitude: 18.7621,
  },
  facts: {
    bedrooms: 4,
    bathrooms: 3,
    sleeps: 8,
    landSquareMetres: 10000,
  },
  hosts: "Lidija and Miro",
  email: "stay@villamima.com", // TODO(owner): confirm enquiry address
  bookingLinks: {
    // Footer only — direct booking is the primary route.
    airbnb: "https://www.airbnb.com/", // TODO(owner): paste the real listing URL
    bookingCom: "https://www.booking.com/", // TODO(owner): paste the real listing URL
  },
} as const;

export const nav = [
  { href: "/villa", label: "The Villa" },
  { href: "/explore", label: "Explore" },
  { href: "/availability", label: "Availability" },
  { href: "/contact", label: "Contact" },
] as const;

export const CTA_LABEL = "Check availability";
