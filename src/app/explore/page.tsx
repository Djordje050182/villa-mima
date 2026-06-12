import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ImageSlot from "@/components/ImageSlot";
import ContourDivider from "@/components/ContourDivider";
import Reveal from "@/components/Reveal";
import { CTA_LABEL } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Explore — Our Guide to Kotor, the Bay & Beyond",
  description:
    "The family guide to the Bay of Kotor: the new Kotor cable car to Mount Lovćen, the city walls, Perast, where we actually eat, and the day trips worth the drive.",
  alternates: { canonical: "/explore" },
};

const classics = [
  {
    title: "Kotor old town",
    body: "Twenty minutes' stroll along the shore from the villa, and a UNESCO World Heritage Site since 1979. Go early or in the evening when the cruise crowds thin, get lost in the lanes, and find the cats — they run the place.",
  },
  {
    title: "The city walls climb",
    body: "Around 1,350 steps up to the fortress of San Giovanni, 260 metres above the rooftops. Entry is about €15 in season; take water, skip the midday sun, and start from the gate near the River Gate. The view down the bay repays every step.",
  },
  {
    title: "Perast & Our Lady of the Rocks",
    body: "Twenty minutes' drive around the shore, baroque Perast is the bay at its most painterly. Small boats shuttle out to the man-made island church for around €5 return; the church and museum cost a couple of euros more.",
  },
  {
    title: "The Lovćen serpentine",
    body: "The old Austro-Hungarian road to Cetinje: twenty-five hairpin bends stacked up the mountainside, each with a wider view than the last. Drive it upwards, early, and stop where the whole bay fits in one glance.",
  },
  {
    title: "Njegoš Mausoleum",
    body: "At the top of Lovćen National Park, 461 steps lead to the resting place of Montenegro's poet-prince and a view across half the country. Park entry is about €3, the mausoleum about €8 — arrive before ten in summer.",
  },
];

const dayTrips = [
  {
    title: "Budva",
    body: "Half an hour south: a miniature walled town with a Venetian citadel and the busiest beaches on the coast. Best out of season or in the late afternoon.",
  },
  {
    title: "The Luštica peninsula",
    body: "Wild coves, olive groves and the Blue Cave on the seaward side; the new marina town of Luštica Bay and the Almara beach club on the other. A proper day out with a swim at the end.",
  },
  {
    title: "Skadar Lake",
    body: "An hour and a half east, the largest lake in the Balkans. From the village of Virpazar, two-hour boat trips (around €15, a glass of wine included) drift past fortress islands and pelicans.",
  },
];

// Verification status as of June 2026 — see CLAUDE.md rules before editing.
const eating = [
  {
    name: "Mudra Art Cuisine",
    place: "Dobrota",
    body: "Tasting-menu dining at the Huma hotel by a Michelin-starred chef — local, organic, zero-waste, with a sunset terrace on the water. The special-occasion booking.",
  },
  {
    name: "Galion",
    place: "Kotor waterfront",
    body: "Fresh fish and a long wine list, with a terrace looking back at the old town walls across the marina. Our pick for a long, late dinner.",
  },
  {
    name: "Konoba Ćatovića Mlini",
    place: "Morinj",
    body: "A two-hundred-year-old family watermill turned konoba, with streams, gardens and resident ducks. Twenty-five minutes around the bay and worth every one — order the whole grilled fish.",
  },
  {
    name: "Stari Mlini",
    place: "Ljuta",
    body: "An eighteenth-century mill on the river mouth past Dobrota, family-run for fifty years, with trout from their own ponds and tables by the water.",
  },
  {
    name: "Conte",
    place: "Perast",
    body: "Tables on the water beneath Perast's church tower. Oysters, fish chosen from the day's display — book ahead in summer.",
  },
  {
    name: "Konoba Portun",
    place: "Dobrota",
    body: "A small traditional konoba right on the promenade. The seafood platter for two and the grilled octopus are the orders; booking is essential.",
  },
  {
    name: "BBQ Tanjga",
    place: "Kotor",
    body: "The other end of the spectrum and a local institution: a no-frills family grill with enormous portions of ćevapi and ribs at small prices.",
  },
  {
    name: "Letrika",
    place: "Kotor old town",
    body: "Boho café by day, cocktails and DJs in the alley by night. Cash only, local crowd.",
  },
];

export default function ExplorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("Explore", "/explore")) }}
      />
      <Header />

      <section data-elevation="villa" className="bg-limestone">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24">
          <p className="eyebrow text-teal">Explore</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
            The bay, as the <span className="italic">family</span> knows it
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink/80 sm:text-base">
            We have spent our whole lives on this shore. This is not a list of
            everything — it is the short list of what we would actually do with a week
            here, starting with the one thing we tell every guest not to miss.
          </p>
        </div>
      </section>

      {/* Lead feature: the cable car */}
      <section data-elevation="mountain" data-elevation-theme="dark" className="bg-bay-night text-limestone">
        <ContourDivider fill="fill-bay-night" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-sea-glass">Don&rsquo;t miss</p>
              <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
                The Kotor cable car —{" "}
                <span className="italic">sea level to 1,350 metres in eleven minutes</span>
              </h2>
              <div className="mt-7 max-w-prose space-y-5 text-[15px] leading-relaxed text-limestone/80 sm:text-base">
                <p>
                  Opened in summer 2023, the cable car climbs from Dub, a few minutes
                  from Kotor, to the Kuk peak on Mount Lovćen — 1,350 metres above the
                  bay you woke up beside. The whole of Boka unrolls beneath you on the
                  way up.
                </p>
                <p>
                  At the top: the Forza Kuk panoramic restaurant, the open-air 1350
                  Bar a short walk along the ridge, an alpine coaster (around €8 a
                  ride) and walking trails into Lovćen National Park. A return ticket
                  is around €20–23 for adults.
                </p>
                <p>
                  Go late in the day if you can — the sunset runs are the special
                  ones, with the bay turning gold below. It runs roughly April to
                  October; check times and tickets on the{" "}
                  <a
                    href="https://kotorcablecar.com"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="underline decoration-sea-glass/60 underline-offset-2 hover:text-sea-glass"
                  >
                    official site
                  </a>{" "}
                  before you set out.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <ImageSlot
                id="explore-cable-car"
                alt="The Kotor cable car climbing above the Bay of Kotor towards Mount Lovćen"
                size="1800×2200"
                tint="night"
                className="aspect-[4/5] w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* The classics */}
      <section data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-bay-night" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-teal">The classics</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              Five things we never <span className="italic">tire of</span>
            </h2>
          </Reveal>
          <div className="mt-12 space-y-0 divide-y divide-ink/10 border-y border-ink/10">
            {classics.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <article className="grid gap-3 py-8 sm:grid-cols-[220px_1fr] sm:gap-10">
                  <h3 className="font-display text-xl text-teal">{item.title}</h3>
                  <p className="max-w-prose text-[15px] leading-relaxed text-ink/75 sm:text-base">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Day trips */}
      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-herb">Further afield</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              Worth the <span className="italic">drive</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {dayTrips.map((trip, i) => (
              <Reveal key={trip.title} delay={i * 100}>
                <h3 className="border-b border-ink/15 pb-3 font-display text-xl">{trip.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{trip.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Food & drink */}
      <section data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-limestone-warm" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-teal">Food &amp; drink</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              Where we send <span className="italic">our guests</span>
            </h2>
            <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink/75 sm:text-base">
              Muo itself stays quiet — that is rather the point — so dinner means the
              waterfront at Dobrota, the old town, or one of the mill restaurants
              around the bay. Lidija and Miro will happily book any of these for you.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {eating.map((spot, i) => (
              <Reveal key={spot.name} delay={(i % 2) * 80}>
                <article>
                  <h3 className="font-display text-xl">
                    {spot.name}{" "}
                    <span className="text-[12px] font-sans font-bold tracking-[0.16em] text-herb uppercase">
                      · {spot.place}
                    </span>
                  </h3>
                  <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/75">
                    {spot.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* On the water */}
      <section data-elevation="bay" data-elevation-theme="dark" className="bg-gradient-to-b from-teal to-bay-night text-limestone">
        <ContourDivider fill="fill-teal" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-sea-glass">On the water</p>
              <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
                The bay is best <span className="italic">from the bay</span>
              </h2>
              <p className="mt-7 max-w-prose text-[15px] leading-relaxed text-limestone/80 sm:text-base">
                Water taxis and private charters will collect you more or less from
                the villa&rsquo;s doorstep — Muo pickups are standard. A classic
                afternoon: Perast and Our Lady of the Rocks, the Verige strait, then
                out to the Blue Cave with swimming stops on the way back. Ask us and
                we will arrange a boat for your dates.
              </p>
              <Link
                href="/availability"
                className="mt-9 inline-block border border-sea-glass/60 px-5 py-3 text-[13px] font-bold tracking-[0.14em] text-sea-glass uppercase transition-colors hover:bg-sea-glass hover:text-bay-night"
              >
                {CTA_LABEL}
              </Link>
            </Reveal>
            <Reveal delay={120}>
              <ImageSlot
                id="explore-boat"
                alt="A boat crossing the Bay of Kotor near Muo"
                size="1800×1300"
                tint="bay"
                className="aspect-[18/13] w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
