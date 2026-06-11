"use client";

import { useEffect, useState } from "react";

const STRATA = [
  { id: "mountain", label: "Mountain" },
  { id: "villa", label: "Villa" },
  { id: "bay", label: "Bay" },
] as const;

/**
 * The elevation rail — the site's hillside signature. A quiet fixed rail on the
 * left edge (desktop only) showing where you are on the slope: the bay below,
 * the villa, the mountain behind. Sections opt in with data-elevation="bay|villa|mountain".
 */
export default function ElevationRail() {
  const [active, setActive] = useState<string | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-elevation]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            setActive(entry.target.dataset.elevation ?? null);
            setDark(entry.target.dataset.elevationTheme === "dark");
          }
        }
      },
      // a narrow band around the viewport centre decides the active stratum
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (active === null) return null;

  const line = dark ? "bg-limestone/25" : "bg-ink/15";
  const idle = dark ? "bg-limestone/40" : "bg-ink/25";
  const text = dark ? "text-limestone/70" : "text-ink/50";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 left-7 z-40 hidden -translate-y-1/2 xl:block"
    >
      <div className="relative flex flex-col items-center gap-10 py-2">
        <span className={`absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 ${line}`} />
        {STRATA.map((s) => {
          const isActive = active === s.id;
          return (
            <span key={s.id} className="relative flex items-center">
              <span
                className={`relative z-10 block rounded-full transition-all duration-500 ${
                  isActive ? "h-2 w-2 bg-sea-glass" : `h-1.5 w-1.5 ${idle}`
                }`}
              />
              <span
                className={`absolute left-4 text-[10px] tracking-[0.22em] uppercase whitespace-nowrap transition-opacity duration-500 ${text} ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                {s.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
