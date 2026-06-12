import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ImageSlot from "@/components/ImageSlot";
import ContourDivider from "@/components/ContourDivider";
import Reveal from "@/components/Reveal";
import { CTA_LABEL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "The Villa — 4 Bedrooms, Private Pool & 10,000 m² of Hillside",
  description:
    "Inside Villa Mima: four bedrooms, three bathrooms, a separate annex, private pool and original stone interiors — a luxury villa for eight above the Bay of Kotor.",
  alternates: { canonical: "/villa" },
};

// TODO(owner): confirm bed configurations and per-room details.
const bedrooms = [
  {
    id: "bedroom-1",
    name: "The bay room",
    detail: "King bed · bay view — confirm details",
  },
  {
    id: "bedroom-2",
    name: "The beam room",
    detail: "King bed · original beams — confirm details",
  },
  {
    id: "bedroom-3",
    name: "The garden room",
    detail: "Double bed · garden view — confirm details",
  },
  {
    id: "bedroom-4",
    name: "The annex room",
    detail: "Double bed · in the annex — confirm details",
  },
];

// TODO(owner): confirm this list before launch — placeholders marked.
const amenities: { group: string; items: string[] }[] = [
  {
    group: "The house",
    items: [
      "Original wooden beams and thick stone walls",
      "Cool in summer, warm in winter",
      "Air conditioning throughout",
      "Fast Wi-Fi",
      "Full kitchen, properly equipped",
      "Washing machine",
    ],
  },
  {
    group: "Outside",
    items: [
      "Private pool above the bay",
      "10,000 m² of private gardens, olive and herb",
      "Private nature trail up the mountainside",
      "Outdoor dining with panoramic bay views",
      "Barbecue",
      "Private parking",
    ],
  },
  {
    group: "Looked after",
    items: [
      "Lidija and Miro, our cousins, host on the ground",
      "Welcome on arrival and local knowledge throughout",
      "Linen and towels included",
      "Cleaning before arrival and after departure",
    ],
  },
];

const gallery = [
  { id: "gallery-living", alt: "The living room at Villa Mima", tint: "interior" },
  { id: "gallery-kitchen", alt: "The kitchen at Villa Mima", tint: "interior" },
  { id: "gallery-terrace", alt: "The terrace overlooking the Bay of Kotor", tint: "bay" },
  { id: "gallery-pool-evening", alt: "The pool at dusk", tint: "night" },
  { id: "gallery-garden-olive", alt: "Olive trees in the garden", tint: "garden" },
  { id: "gallery-bathroom", alt: "A bathroom at Villa Mima", tint: "stone" },
] as const;

export default function VillaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("The Villa", "/villa")) }}
      />
      <Header />

      <section data-elevation="villa" className="bg-limestone">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-8 sm:pt-24">
          <p className="eyebrow text-teal">The villa</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
            A house with a <span className="italic">memory</span>, restored for the way
            you want to live now
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Every wall here was built by hand a century and a half ago. The restoration
            kept all of it — the beams, the stone, the proportions — and added what a
            modern stay needs: generous bathrooms, a proper kitchen, and a pool above
            the water. Four bedrooms and a separate annex sleep eight in comfort.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
          <ImageSlot
            id="villa-exterior"
            alt="Villa Mima's stone facade among the gardens"
            size="2560×1440"
            tint="stone"
            priority
            className="aspect-[16/9] w-full"
          />
        </div>
      </section>

      {/* Rooms */}
      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-herb">Sleeping</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              Four bedrooms, <span className="italic">three bathrooms</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {bedrooms.map((room, i) => (
              <Reveal key={room.id} delay={i * 100}>
                <figure>
                  <ImageSlot
                    id={room.id}
                    alt={`${room.name} at Villa Mima`}
                    size="1600×1100"
                    tint="interior"
                    className="aspect-[16/11] w-full"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                  <figcaption className="mt-4">
                    <span className="font-display text-xl">{room.name}</span>
                    <span className="mt-1 block text-[11px] font-bold tracking-[0.18em] text-ink/50 uppercase">
                      {room.detail}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Annex */}
      <section data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-limestone-warm" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-teal">The annex</p>
              <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
                A door of <span className="italic">your own</span>
              </h2>
              <p className="mt-7 max-w-prose text-[15px] leading-relaxed text-ink/80 sm:text-base">
                Separate from the main house, the annex suits grandparents who keep
                different hours, teenagers who want independence, or friends who like
                their privacy at the end of the evening. Same view, own key.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ImageSlot
                id="villa-annex"
                alt="The separate annex at Villa Mima"
                size="1800×1200"
                tint="stone"
                className="aspect-[3/2] w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pool & outdoors */}
      <section data-elevation="mountain" className="bg-herb/15">
        <ContourDivider fill="fill-herb/15" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <ImageSlot
                id="villa-pool-day"
                alt="The private pool in full sun, the bay beyond"
                size="2000×1400"
                tint="pool"
                className="aspect-[10/7] w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
            <Reveal className="order-1 lg:order-2" delay={120}>
              <p className="eyebrow text-herb">Outside</p>
              <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
                The pool, the gardens, <span className="italic">the mountain</span>
              </h2>
              <p className="mt-7 max-w-prose text-[15px] leading-relaxed text-ink/80 sm:text-base">
                The pool sits above the bay with nothing between you and the water but
                our father&rsquo;s gardens. Ten thousand square metres of private land
                mean you can spend whole days here without seeing another soul — and
                when you want to climb, the family trail starts at the back gate.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-herb/15" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-teal">Amenities</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              Everything in its <span className="italic">place</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {amenities.map((group, i) => (
              <Reveal key={group.group} delay={i * 100}>
                <h3 className="border-b border-ink/15 pb-3 font-display text-xl">
                  {group.group}
                </h3>
                <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink/75">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-sea-glass" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-herb">Gallery</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              Around the <span className="italic">house</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <Reveal key={g.id} delay={(i % 3) * 100}>
                <ImageSlot
                  id={g.id}
                  alt={g.alt}
                  size="1400×1400"
                  tint={g.tint}
                  className="aspect-square w-full"
                  sizes="(min-width: 768px) 33vw, 50vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-elevation="bay" data-elevation-theme="dark" className="bg-gradient-to-b from-teal to-bay-night text-limestone">
        <ContourDivider fill="fill-teal" bg="bg-limestone-warm" />
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl leading-snug sm:text-5xl">
              The house is <span className="italic">waiting</span>
            </h2>
            <Link
              href="/availability"
              className="mt-10 inline-block bg-limestone px-8 py-4 text-[13px] font-bold tracking-[0.14em] text-bay-night uppercase transition-colors hover:bg-sea-glass"
            >
              {CTA_LABEL}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
