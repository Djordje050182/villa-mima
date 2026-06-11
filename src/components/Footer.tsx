import Link from "next/link";
import { nav, site, CTA_LABEL } from "@/lib/site";

export default function Footer() {
  return (
    <footer data-elevation="bay" data-elevation-theme="dark" className="bg-bay-night text-limestone">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl">
              Villa <span className="italic">Mima</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-limestone/70">
              Our mother&rsquo;s house in Muo, on the quiet western shore of the Bay of
              Kotor. Book direct with the family — best rate, no platform fees.
            </p>
            <Link
              href="/availability"
              className="mt-6 inline-block border border-sea-glass/60 px-5 py-2.5 text-[13px] font-bold tracking-[0.14em] text-sea-glass uppercase transition-colors hover:bg-sea-glass hover:text-bay-night"
            >
              {CTA_LABEL}
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-limestone/80 transition-colors hover:text-sea-glass"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/" className="text-limestone/80 transition-colors hover:text-sea-glass">
              Home
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-limestone/80 transition-colors hover:text-sea-glass"
            >
              {site.email}
            </a>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-limestone/15 pt-6 text-xs text-limestone/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Villa Mima · {site.location.village},{" "}
            {site.location.region}, {site.location.country}
          </p>
          <p>
            Also on{" "}
            <a
              href={site.bookingLinks.airbnb}
              rel="noopener noreferrer"
              target="_blank"
              className="underline decoration-limestone/30 underline-offset-2 hover:text-limestone/80"
            >
              Airbnb
            </a>{" "}
            and{" "}
            <a
              href={site.bookingLinks.bookingCom}
              rel="noopener noreferrer"
              target="_blank"
              className="underline decoration-limestone/30 underline-offset-2 hover:text-limestone/80"
            >
              Booking.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
