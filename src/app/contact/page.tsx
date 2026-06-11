import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import ContourDivider from "@/components/ContourDivider";
import Reveal from "@/components/Reveal";
import { site, CTA_LABEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Getting Here — Muo, Bay of Kotor",
  description:
    "How to reach Villa Mima in Muo, Bay of Kotor: Tivat airport 20 minutes away, driving from Dubrovnik with our quiet border-crossing tip, and how to get in touch.",
  alternates: { canonical: "/contact" },
};

const routes = [
  {
    title: "Tivat — the easy way",
    body: "Tivat airport is around twenty minutes from the villa, with direct flights from across Europe in season. Through the Vrmac tunnel, along the shore, and you are here before your luggage has settled.",
  },
  {
    title: "Dubrovnik — with our border tip",
    body: "Dubrovnik airport is about ninety minutes away and often has the best flight choice. In summer the main coastal border at Karasovići–Debeli Brijeg can queue for hours — so do what the locals do: a few minutes after the airport, turn off the main road towards Molunat and Vitaljina and cross at the small Konfin–Kobila crossing instead. It is open to ordinary cars, rarely has more than a handful of vehicles, and brings you out on the bay near Herceg Novi. We will send precise directions before you travel.",
  },
  {
    title: "Podgorica",
    body: "Montenegro's capital airport is around ninety minutes inland, useful for year-round and budget connections. The drive in over the mountains is a fine introduction to the country.",
  },
];

const practical = [
  {
    title: "Arriving at the villa",
    body: "Private parking at the house, so ignore every word you have read about Kotor parking. Lidija or Miro will meet you, show you around, and leave you to the view.",
  },
  {
    title: "Getting about",
    body: "A car is useful but not essential. Kotor old town is a flat twenty-minute walk along the water; taxis and water taxis are inexpensive; and we can help arrange boats, transfers and day trips.",
  },
  {
    title: "When to come",
    body: "June and September are our favourites — warm sea, soft light, no crowds. July and August are full summer; spring and autumn are quiet and green; winter is for fires, books and having the bay to yourself.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <section data-elevation="villa" className="bg-limestone">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24">
          <p className="eyebrow text-teal">Contact &amp; practical</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
            Getting here is <span className="italic">half the pleasure</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink/80 sm:text-base">
            Three airports serve the bay, and the last stretch of every route runs
            along the water. Write to us at{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline decoration-sea-glass underline-offset-2 hover:text-teal"
            >
              {site.email}
            </a>{" "}
            with any question at all — before, during or after your stay.
          </p>
        </div>
      </section>

      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-herb">By air &amp; road</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              Three ways <span className="italic">in</span>
            </h2>
          </Reveal>
          <div className="mt-12 space-y-0 divide-y divide-ink/10 border-y border-ink/10">
            {routes.map((route, i) => (
              <Reveal key={route.title} delay={i * 80}>
                <article className="grid gap-3 py-8 sm:grid-cols-[220px_1fr] sm:gap-10">
                  <h3 className="font-display text-xl text-teal">{route.title}</h3>
                  <p className="max-w-prose text-[15px] leading-relaxed text-ink/75 sm:text-base">
                    {route.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-limestone-warm" />
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="eyebrow text-teal">Once you are here</p>
            <h2 className="mt-5 text-3xl leading-snug sm:text-5xl">
              The practical <span className="italic">bits</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {practical.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <h3 className="border-b border-ink/15 pb-3 font-display text-xl">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-elevation="bay" data-elevation-theme="dark" className="bg-gradient-to-b from-teal to-bay-night text-limestone">
        <ContourDivider fill="fill-teal" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl leading-snug sm:text-5xl">
              Questions, dates, or just a feeling this might be{" "}
              <span className="italic">the one</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/availability"
                className="bg-limestone px-8 py-4 text-[13px] font-bold tracking-[0.14em] text-bay-night uppercase transition-colors hover:bg-sea-glass"
              >
                {CTA_LABEL}
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="px-2 py-4 text-[13px] font-bold tracking-[0.14em] text-limestone/80 uppercase transition-colors hover:text-limestone"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
