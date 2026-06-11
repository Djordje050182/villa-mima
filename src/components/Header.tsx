"use client";

import Link from "next/link";
import { useState } from "react";
import { nav, CTA_LABEL } from "@/lib/site";

/**
 * variant "overlay" — absolute, light text, for pages opening on a dark hero.
 * variant "solid" — in-flow on limestone, ink text, for inner pages.
 */
export default function Header({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const [open, setOpen] = useState(false);
  const overlay = variant === "overlay";

  const linkColor = overlay
    ? "text-limestone/90 hover:text-limestone"
    : "text-ink/80 hover:text-ink";

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-50"
          : "relative z-50 border-b border-ink/10 bg-limestone"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className={`font-display text-xl tracking-wide ${overlay ? "text-limestone" : "text-ink"}`}
        >
          Villa <span className="italic">Mima</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-bold tracking-[0.14em] uppercase transition-colors ${linkColor}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/availability"
            className={`border px-4 py-2 text-[13px] font-bold tracking-[0.14em] uppercase transition-colors ${
              overlay
                ? "border-limestone/50 text-limestone hover:bg-limestone hover:text-bay-night"
                : "border-teal text-teal hover:bg-teal hover:text-limestone"
            }`}
          >
            {CTA_LABEL}
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${
            overlay ? "text-limestone" : "text-ink"
          }`}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={`block h-px w-6 bg-current transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-current transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-limestone/15 bg-bay-night px-5 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-bold tracking-[0.14em] text-limestone/90 uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/availability"
                onClick={() => setOpen(false)}
                className="inline-block border border-sea-glass/60 px-4 py-2 text-sm font-bold tracking-[0.14em] text-sea-glass uppercase"
              >
                {CTA_LABEL}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
