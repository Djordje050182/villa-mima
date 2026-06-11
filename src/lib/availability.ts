/**
 * Availability from the Hosthub (SyncBnB) PUBLIC calendar endpoint.
 * Shows blocked vs available dates only — no guest data.
 *
 * HARD RULE (see CLAUDE.md): never use the private iCal URL anywhere in this
 * project. This public endpoint has no CORS headers, so it must only ever be
 * fetched server-side (this module runs in Server Components / route handlers).
 */

const RENTAL_ID = "978101";
const CAL_URL = `https://app.hosthub.com/public/rentals/${RENTAL_ID}/calendar`;

type HosthubEvent = {
  id: number;
  title: string;
  allDay: boolean;
  /** compact ISO UTC, e.g. "20260608T130000Z" */
  start: string;
  end: string;
};

export type AvailabilityMonth = {
  year: number;
  /** 0-based */
  month: number;
  label: string;
  /** ISO day strings ("2026-06-08") of blocked NIGHTS in this month */
  blockedDays: string[];
};

const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isoFromCompact(compact: string): string {
  // "20260608T130000Z" -> "2026-06-08"
  return `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`;
}

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Fetches blocked nights for `months` months starting from the current month.
 * A Hosthub event blocks nights from its start date up to (but not including)
 * its end date — the end date is the checkout day and stays bookable.
 * Returns `ok: false` (with no blocked days) if the upstream call fails, so the
 * page can show a graceful "calendar temporarily unavailable" note.
 */
export async function getAvailability(months = 8): Promise<{
  ok: boolean;
  months: AvailabilityMonth[];
}> {
  const now = new Date();
  const startYear = now.getUTCFullYear();
  const startMonth = now.getUTCMonth();
  const start = `${startYear}-${String(startMonth + 1).padStart(2, "0")}-01`;
  const endDate = new Date(Date.UTC(startYear, startMonth + months, 1));
  const end = endDate.toISOString().slice(0, 10);

  let blocked: Set<string> = new Set();
  let ok = true;

  try {
    const res = await fetch(`${CAL_URL}?start=${start}&end=${end}`, {
      // ISR: availability refreshes hourly without losing static speed
      next: { revalidate: 3600 },
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`Hosthub responded ${res.status}`);
    const events = (await res.json()) as HosthubEvent[];
    for (const event of events) {
      const first = isoFromCompact(event.start);
      const checkout = isoFromCompact(event.end);
      for (let day = first; day < checkout; day = addDays(day, 1)) {
        blocked.add(day);
      }
    }
  } catch (error) {
    console.error("availability: failed to fetch public calendar", error);
    ok = false;
    blocked = new Set();
  }

  const result: AvailabilityMonth[] = [];
  for (let i = 0; i < months; i++) {
    const date = new Date(Date.UTC(startYear, startMonth + i, 1));
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}-`;
    result.push({
      year,
      month,
      label: `${MONTH_LABELS[month]} ${year}`,
      blockedDays: [...blocked].filter((d) => d.startsWith(prefix)).sort(),
    });
  }

  return { ok, months: result };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

/** Monday-first weekday index (0 = Monday) of the month's first day. */
export function firstWeekday(year: number, month: number): number {
  return (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
}

export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
