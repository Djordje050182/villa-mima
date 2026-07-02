import Link from "next/link";
import Header from "@/components/Header";
import ImageSlot from "@/components/ImageSlot";
import ContourDivider from "@/components/ContourDivider";
import Reveal from "@/components/Reveal";
import { site, CTA_LABEL } from "@/lib/site";
import { vacationRentalJsonLd } from "@/lib/structuredData";

const facts = [
  { value: "4", label: "Bedrooms" },
  { value: "3", label: "Bathrooms" },
  { value: "8", label: "Guests" },
  { value: "10,000 m²", label: "Private land" },
];

// Real guest reviews from the Airbnb listing (airbnb.com/rooms/11931829), lightly trimmed.
const reviews = [
  {
    quote:
      "Absolutely stunning view. Very comfortable space. Tons of common area to relax in. Very well equipped kitchen. The pool was sparkling clear and lovely.",
    name: "Nancy",
    detail: "Airbnb guest · September 2023",
  },
  {
    quote:
      "Beautiful villa in Kotor. Lovely outdoor space with view. Hosts were extremely helpful throughout our stay — helped organise transfers, a private boat tour and even dropped up a lighter for the barbecue.",
    name: "Kate",
    detail: "Airbnb guest · June 2022",
  },
  {
    quote:
      "We had a great time here. A perfect place especially for families with older kids. Recommended.",
    name: "André",
    detail: "Airbnb guest · July 2022",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vacationRentalJsonLd()) }}
      />

      {/* ——— Hero · the bay ——— */}
      <section data-elevation="bay" data-elevation-theme="dark" className="relative min-h-svh">
        <ImageSlot
          id="home-hero"
          alt="Golden-hour panorama over the Bay of Kotor from Villa Mima"
          size="2560×1600"
          tint="bay"
          priority
          className="absolute inset-0"
          label={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bay-night/60 via-bay-night/20 to-bay-night/70" />
        <Header variant="overlay" />

        <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pb-24 sm:px-8">
          <p className="eyebrow text-sea-glass">
            Muo · Bay of Kotor · Montenegro
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] text-limestone sm:text-6xl lg:text-7xl">
            Centuries of stone, sea and <span className="italic">family</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-limestone/85 sm:text-lg">
            Villa Mima is our mother&rsquo;s house — a restored stone villa on the quiet
            western shore of the Bay of Kotor, with a private pool, ten thousand square
            metres of hillside, and the whole bay laid out below.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/availability"
              className="bg-limestone px-6 py-3.5 text-[13px] font-bold tracking-[0.14em] text-bay-night uppercase transition-colors hover:bg-sea-glass"
            >
              {CTA_LABEL}
            </Link>
            <a
              href="#story"
              className="px-2 py-3.5 text-[13px] font-bold tracking-[0.14em] text-limestone/80 uppercase transition-colors hover:text-limestone"
            >
              Our story ↓
            </a>
          </div>
        </div>
      </section>

      {/* ——— The story · the villa stratum ——— */}
      <section id="story" data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-bay-night" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-herb">The story</p>
              <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
                Named after our mum.
                <br />
                <span className="italic">Built long before any of us.</span>
              </h2>
              <div className="mt-7 max-w-prose space-y-5 text-[15px] leading-relaxed text-ink/80 sm:text-base">
                <p>
                  This land has been in our family for more than a hundred years. The
                  house itself is older still — a centuries-old stone house where our
                  father was born, and where he tended the gardens and herbs his whole
                  life.
                </p>
                <p>
                  When we restored it, we kept everything that made it what it is: the
                  original wooden beams, the thick stone walls that keep it cool in
                  summer and warm in winter. Around them we added the comfort of a
                  proper luxury villa — because a house this loved deserves guests who
                  are looked after properly.
                </p>
                <p>
                  Our cousins Lidija and Miro live nearby and host on the ground, so
                  there is always family close at hand — and always someone who knows
                  where the best bread, fish and coffee in the bay are to be found.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="grid grid-cols-5 gap-4">
                <ImageSlot
                  id="story-stone-detail"
                  alt="Original stone wall and wooden beams inside Villa Mima"
                  size="1200×1600"
                  tint="interior"
                  className="col-span-3 aspect-[3/4]"
                  sizes="(min-width: 1024px) 360px, 60vw"
                />
                <ImageSlot
                  id="story-garden"
                  alt="Herbs and gardens our father tended at Villa Mima"
                  size="900×1200"
                  tint="garden"
                  className="col-span-2 mt-14 aspect-[3/4]"
                  sizes="(min-width: 1024px) 240px, 40vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— The villa ——— */}
      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow text-teal">The villa</p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-snug sm:text-5xl">
              Old stone outside, <span className="italic">quiet luxury</span> within
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <dl className="mt-12 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="flex flex-col bg-limestone-warm px-6 py-8 text-center">
                  <dt className="order-2 mt-2 text-[11px] font-bold tracking-[0.18em] text-ink/60 uppercase">
                    {f.label}
                  </dt>
                  <dd className="font-display text-3xl text-teal sm:text-4xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <ImageSlot
                id="villa-pool-view"
                alt="The private pool at Villa Mima with the Bay of Kotor beyond"
                size="2000×1300"
                tint="pool"
                className="aspect-[16/10] w-full"
                sizes="(min-width: 1024px) 760px, 100vw"
              />
            </Reveal>
            <Reveal delay={150}>
              <div className="flex h-full flex-col justify-between gap-8">
                <p className="max-w-prose text-[15px] leading-relaxed text-ink/80 sm:text-base">
                  Four bedrooms and three bathrooms across the main house, with a
                  separate annex for guests who like their own door. A private pool
                  above the water, panoramic views over the entire bay, and ten
                  thousand square metres of garden, olive and herb to yourselves.
                </p>
                <Link
                  href="/villa"
                  className="inline-block self-start border border-teal px-5 py-3 text-[13px] font-bold tracking-[0.14em] text-teal uppercase transition-colors hover:bg-teal hover:text-limestone"
                >
                  Explore the villa
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— The land & mountain ——— */}
      <section data-elevation="mountain" className="relative bg-herb/15">
        <ContourDivider fill="fill-herb/15" bg="bg-limestone-warm" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <ImageSlot
                id="land-trail"
                alt="The private nature trail climbing the mountainside behind Villa Mima"
                size="1600×2000"
                tint="garden"
                className="aspect-[4/5] w-full max-w-md"
                sizes="(min-width: 1024px) 480px, 100vw"
              />
            </Reveal>
            <Reveal className="order-1 lg:order-2" delay={100}>
              <p className="eyebrow text-herb">The land &amp; mountain</p>
              <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
                Behind the house, the land <span className="italic">climbs</span>
              </h2>
              <div className="mt-7 max-w-prose space-y-5 text-[15px] leading-relaxed text-ink/80 sm:text-base">
                <p>
                  Most villas end at the garden wall. Ours keeps going — up into the
                  mountain, through a hundred years of family land, along a private
                  nature trail our father walked all his life.
                </p>
                <p>
                  Climb for ten minutes and the whole of Boka Bay opens out beneath
                  you, with Tivat and the open Adriatic beyond. Go up early while the
                  bay is still, or before dinner when the light softens. It is a view
                  very few people will ever have to themselves.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Location ——— */}
      <section data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-herb/15" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow text-teal">Where you are</p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-snug sm:text-5xl">
              Muo — the bay&rsquo;s quiet <span className="italic">western shore</span>
            </h2>
            <p className="mt-7 max-w-prose text-[15px] leading-relaxed text-ink/80 sm:text-base">
              Muo is the side of the bay the crowds never quite find: a string of old
              fishing houses looking back across the water at Kotor&rsquo;s walls.
              You are twenty minutes&rsquo; walk along the shore from the old town —
              four by car — yet evenings here belong to the locals and the fishing
              boats.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {[
                ["20 min", "walk along the shore to Kotor's UNESCO old town"],
                ["4 min", "drive to the old town gates"],
                ["~20 min", "from Tivat airport to your front door"],
              ].map(([value, label]) => (
                <li key={label} className="bg-limestone px-6 py-8">
                  <span className="font-display text-3xl text-teal">{value}</span>
                  <span className="mt-2 block text-sm leading-snug text-ink/70">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/explore"
                className="border border-teal px-5 py-3 text-[13px] font-bold tracking-[0.14em] text-teal uppercase transition-colors hover:bg-teal hover:text-limestone"
              >
                Our guide to the bay
              </Link>
              <Link
                href="/contact"
                className="px-2 py-3 text-[13px] font-bold tracking-[0.14em] text-ink/70 uppercase transition-colors hover:text-ink"
              >
                Getting here →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Reviews ——— */}
      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="eyebrow text-herb">Guests</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              In their <span className="italic">words</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={i} delay={i * 120}>
                <blockquote className="flex h-full flex-col justify-between border-l-2 border-sea-glass pl-6">
                  <p className="font-display text-lg leading-relaxed text-ink/85 italic">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <footer className="mt-6 text-[11px] font-bold tracking-[0.18em] text-ink/50 uppercase">
                    {r.name} · {r.detail}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Direct booking · back down to the bay ——— */}
      <section data-elevation="bay" data-elevation-theme="dark" className="bg-gradient-to-b from-teal to-bay-night text-limestone">
        <ContourDivider fill="fill-teal" bg="bg-limestone-warm" />
        <div className="mx-auto max-w-6xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal>
            <p className="eyebrow text-sea-glass">Stay with us</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl leading-snug sm:text-5xl">
              Book direct with the family —{" "}
              <span className="italic">best rate, no platform fees</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-limestone/80 sm:text-base">
              Write to us with your dates and we will reply personally, usually within
              a day. {site.hosts} will be there to welcome you when you arrive.
            </p>
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
