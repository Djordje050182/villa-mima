export const site = {
  name: "Villa Mima",
  url: "https://www.villamima.com",
  description:
    "Villa Mima is a restored centuries-old stone villa in Muo, on the quiet western shore of the Bay of Kotor, Montenegro. Four bedrooms, private pool, 10,000 m² of private hillside and panoramic views over the whole bay. Book direct with the family.",
  location: {
    village: "Muo",
    region: "Bay of Kotor",
    country: "Montenegro",
    countryCode: "ME",
    // From the villa's Impera listing — TODO(owner): confirm against the gate location
    latitude: 42.43013,
    longitude: 18.75607,
  },
  facts: {
    bedrooms: 4,
    bathrooms: 3,
    sleeps: 8, // comfortably, in beds — the headline figure everywhere
    maxSleeps: 12, // two sofa beds take larger groups to twelve
    landSquareMetres: 10000,
  },
  hosts: "Lidija and Miro",
  email: "stay@villamima.com", // TODO(owner): confirm enquiry address
  bookingLinks: {
    // Footer only — direct booking is the primary route.
    airbnb: "https://www.airbnb.com/rooms/11931829",
    bookingCom: "https://www.booking.com/hotel/me/villa-mima.html",
  },
} as const;

export const nav = [
  { href: "/villa", label: "The Villa" },
  { href: "/explore", label: "Explore" },
  { href: "/availability", label: "Availability" },
  { href: "/contact", label: "Contact" },
] as const;

export const CTA_LABEL = "Check availability";
