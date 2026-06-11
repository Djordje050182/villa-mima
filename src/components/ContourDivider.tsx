/**
 * Section transition in the hillside motif: layered contour lines, like the
 * elevation lines of a survey map of the slope behind the house.
 * Place at the top of a section; `fill` is the CLASS of the new section's
 * background colour (e.g. "fill-limestone-warm"), drawn over the previous
 * section's background, which should be set on a wrapper or via `bg`.
 */
export default function ContourDivider({
  fill,
  bg = "",
  flip = false,
}: {
  fill: string;
  bg?: string;
  flip?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`${bg} ${flip ? "rotate-180" : ""} -mb-px`}>
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="block h-[60px] w-full sm:h-[90px]"
      >
        <path
          d="M0 78 C 180 58, 320 92, 520 74 S 880 38, 1080 58 S 1340 84, 1440 64 L 1440 110 L 0 110 Z"
          className={fill}
        />
        <path
          d="M0 64 C 200 44, 360 80, 560 62 S 900 24, 1100 46 S 1350 72, 1440 50"
          fill="none"
          strokeWidth="1"
          className="stroke-sea-glass/40"
        />
        <path
          d="M0 46 C 220 30, 400 64, 600 48 S 920 12, 1120 32 S 1360 58, 1440 38"
          fill="none"
          strokeWidth="1"
          className="stroke-sea-glass/20"
        />
      </svg>
    </div>
  );
}
