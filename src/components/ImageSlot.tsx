import Image from "next/image";
import manifest from "@/lib/image-manifest.json";

type Tint = "bay" | "stone" | "garden" | "pool" | "interior" | "night";

const tints: Record<Tint, string> = {
  bay: "from-bay-night via-teal to-sea-glass/60",
  night: "from-bay-night via-bay-night to-teal",
  stone: "from-limestone-warm via-limestone to-sea-glass/30",
  garden: "from-herb/90 via-herb/60 to-limestone-warm",
  pool: "from-teal via-sea-glass/70 to-limestone",
  interior: "from-ink/80 via-limestone-warm to-limestone",
};

const files = manifest as Record<string, string>;

// next/image does not prepend basePath to src in unoptimized/static-export mode,
// so the GitHub Pages preview needs it added by hand. Empty in production.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Photography slot. Drop a real photo at public/images/<id>.jpg (or .webp/.avif/.png)
 * and re-run dev/build — the slot renders it via next/image. Until then it renders a
 * palette-tinted placeholder labelled with the slot id and recommended size.
 * Every slot is documented in public/images/README.md.
 */
export default function ImageSlot({
  id,
  alt,
  size,
  tint = "bay",
  className = "",
  priority = false,
  sizes = "100vw",
  label = true,
}: {
  id: string;
  alt: string;
  /** Recommended dimensions, shown on the placeholder, e.g. "2400×1600" */
  size: string;
  tint?: Tint;
  className?: string;
  priority?: boolean;
  sizes?: string;
  label?: boolean;
}) {
  const src = files[id];

  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={`${BASE_PATH}${src}`}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden bg-gradient-to-br ${tints[tint]} ${className}`}
    >
      {/* faint contour pattern, part of the hillside motif */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {[18, 34, 52, 71, 88].map((y, i) => (
          <path
            key={y}
            d={`M0 ${y} C 20 ${y - 6 + i}, 45 ${y + 5 - i}, 68 ${y - 3} S 92 ${y + 4}, 100 ${y - 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.35"
            className="text-limestone"
          />
        ))}
      </svg>
      {label && (
        <span className="absolute bottom-3 left-4 font-sans text-[10px] tracking-[0.18em] uppercase text-limestone/70">
          photo · {id} · {size}
        </span>
      )}
    </div>
  );
}
