import type { Metadata } from "next";
import Header from "@/components/Header";
import ContourDivider from "@/components/ContourDivider";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import EnquiryForm from "@/components/EnquiryForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { bookingFaq, faqJsonLd, breadcrumbJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Availability & Booking — Book Direct with the Family",
  description:
    "Live availability for Villa Mima, Bay of Kotor. Book direct with the family — best rate, no platform fees. Send an enquiry and we reply personally within a day.",
  alternates: { canonical: "/availability" },
};

// Availability data revalidates hourly via the fetch in lib/availability.ts
export default function AvailabilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd("Availability & Booking", "/availability")),
        }}
      />
      <Header />

      <section data-elevation="villa" className="bg-limestone">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-16 sm:px-8 sm:pt-24">
          <p className="eyebrow text-teal">Availability &amp; booking</p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-6xl">
            Book direct with the family —{" "}
            <span className="italic">best rate, no platform fees</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-relaxed text-ink/80 sm:text-base">
            The calendar below is live and synced across every channel we list on.
            Found your dates? Send us an enquiry and we will reply personally, usually
            within a day. {site.hosts} will be there to welcome you when you arrive.
          </p>
          <a
            href="#enquiry"
            className="mt-7 inline-block text-[13px] font-bold tracking-[0.14em] text-teal uppercase underline decoration-sea-glass underline-offset-4 hover:text-bay-night"
          >
            Skip to the enquiry form ↓
          </a>
        </div>
      </section>

      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl">
              The <span className="italic">calendar</span>
            </h2>
            <div className="mt-8">
              <AvailabilityCalendar />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="enquiry" data-elevation="villa" className="bg-limestone">
        <ContourDivider fill="fill-limestone" bg="bg-limestone-warm" />
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,1.4fr)]">
            <Reveal>
              <h2 className="text-2xl sm:text-4xl">
                Send an <span className="italic">enquiry</span>
              </h2>
              <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink/75 sm:text-base">
                No payment is taken now. Tell us your dates and who is coming; we will
                confirm availability, agree the details, and hold the dates while we
                talk. Direct guests always get our best rate.
              </p>
              <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-ink/75 sm:text-base">
                Prefer email? Write to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="underline decoration-sea-glass underline-offset-2 hover:text-teal"
                >
                  {site.email}
                </a>
                .
              </p>
            </Reveal>
            <Reveal delay={120}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section data-elevation="villa" className="bg-limestone-warm">
        <ContourDivider fill="fill-limestone-warm" bg="bg-limestone" />
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl">
              Questions we are <span className="italic">often asked</span>
            </h2>
            <div className="mt-8 max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
              {bookingFaq.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-lg text-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="text-sea-glass transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink/75">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
