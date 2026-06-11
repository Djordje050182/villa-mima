import {
  getAvailability,
  daysInMonth,
  firstWeekday,
  todayIso,
  type AvailabilityMonth,
} from "@/lib/availability";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function Month({ data, today }: { data: AvailabilityMonth; today: string }) {
  const blocked = new Set(data.blockedDays);
  const total = daysInMonth(data.year, data.month);
  const offset = firstWeekday(data.year, data.month);
  const cells: (number | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  return (
    <div>
      <h3 className="font-display text-lg">{data.label}</h3>
      <table className="mt-3 w-full table-fixed border-collapse text-center text-[13px]">
        <thead>
          <tr>
            {WEEKDAYS.map((d, i) => (
              <th
                key={i}
                scope="col"
                className="pb-2 text-[10px] font-bold tracking-[0.14em] text-ink/40"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(cells.length / 7) }, (_, row) => (
            <tr key={row}>
              {cells.slice(row * 7, row * 7 + 7).map((day, col) => {
                if (!day) return <td key={col} />;
                const iso = `${data.year}-${String(data.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isPast = iso < today;
                const isBlocked = blocked.has(iso);
                return (
                  <td key={col} className="p-0.5">
                    <span
                      className={`flex aspect-square items-center justify-center ${
                        isPast
                          ? "text-ink/25"
                          : isBlocked
                            ? "bg-ink/10 text-ink/35 line-through decoration-ink/30"
                            : "bg-sea-glass/25 text-ink"
                      }`}
                    >
                      {day}
                      <span className="sr-only">
                        {isPast ? " (past)" : isBlocked ? " (booked)" : " (available)"}
                      </span>
                    </span>
                  </td>
                );
              })}
              {/* pad the final row */}
              {row === Math.ceil(cells.length / 7) - 1 &&
                cells.length % 7 !== 0 &&
                Array.from({ length: 7 - (cells.length % 7) }, (_, i) => <td key={`pad-${i}`} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Server component — fetches the Hosthub public calendar (ISR, hourly). */
export default async function AvailabilityCalendar() {
  const { ok, months } = await getAvailability(8);
  const today = todayIso();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-ink/60">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-3.5 w-3.5 bg-sea-glass/25" /> Available
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-3.5 w-3.5 bg-ink/10" /> Booked
        </span>
        <span className="ml-auto hidden sm:inline">Synced hourly across all booking channels</span>
      </div>

      {!ok && (
        <p className="mt-6 border border-herb/40 bg-herb/10 px-4 py-3 text-sm text-ink/75">
          The live calendar is taking a moment — please send an enquiry below and we
          will confirm your dates personally.
        </p>
      )}

      <div className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {months.map((m) => (
          <Month key={m.label} data={m} today={today} />
        ))}
      </div>
    </div>
  );
}
