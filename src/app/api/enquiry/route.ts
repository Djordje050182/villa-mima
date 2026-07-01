import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

type Enquiry = {
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  message: string;
};

function parseAndValidate(body: Record<string, unknown>): Enquiry | string {
  const checkIn = String(body.checkIn ?? "");
  const checkOut = String(body.checkOut ?? "");
  const guests = Number(body.guests ?? 0);
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  const isoDate = /^\d{4}-\d{2}-\d{2}$/;
  if (!isoDate.test(checkIn) || !isoDate.test(checkOut)) return "Please choose your dates.";
  if (checkOut <= checkIn) return "Check-out must be after check-in.";
  if (!Number.isInteger(guests) || guests < 1 || guests > site.facts.maxSleeps)
    return `Guests must be between 1 and ${site.facts.maxSleeps}.`;
  if (!name || name.length > 200) return "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320)
    return "Please enter a valid email address.";
  if (message.length > 5000) return "Message is too long.";

  return { checkIn, checkOut, guests, name, email, message };
}

async function storeInSupabase(enquiry: Enquiry): Promise<boolean> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.warn("enquiry: Supabase env vars not set — skipping store");
    return false;
  }
  const res = await fetch(`${url}/rest/v1/enquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      prefer: "return=minimal",
    },
    body: JSON.stringify({
      check_in: enquiry.checkIn,
      check_out: enquiry.checkOut,
      guests: enquiry.guests,
      name: enquiry.name,
      email: enquiry.email,
      message: enquiry.message,
    }),
  });
  if (!res.ok) {
    console.error("enquiry: Supabase insert failed", res.status, await res.text());
    return false;
  }
  return true;
}

async function emailOwner(enquiry: Enquiry): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL ?? "Villa Mima <onboarding@resend.dev>";
  if (!key || !to) {
    console.warn("enquiry: Resend env vars not set — skipping email");
    return false;
  }
  const nights =
    (Date.parse(enquiry.checkOut) - Date.parse(enquiry.checkIn)) / 86_400_000;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: enquiry.email,
      subject: `Enquiry: ${enquiry.checkIn} → ${enquiry.checkOut} · ${enquiry.guests} guests · ${enquiry.name}`,
      text: [
        `New direct enquiry from villamima.com`,
        ``,
        `Name:      ${enquiry.name}`,
        `Email:     ${enquiry.email}`,
        `Check-in:  ${enquiry.checkIn}`,
        `Check-out: ${enquiry.checkOut} (${nights} night${nights === 1 ? "" : "s"})`,
        `Guests:    ${enquiry.guests}`,
        ``,
        `Message:`,
        enquiry.message || "(none)",
      ].join("\n"),
    }),
  });
  if (!res.ok) {
    console.error("enquiry: Resend send failed", res.status, await res.text());
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without doing anything
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = parseAndValidate(body);
  if (typeof result === "string") {
    return NextResponse.json({ error: result }, { status: 400 });
  }

  const [stored, emailed] = await Promise.all([
    storeInSupabase(result),
    emailOwner(result),
  ]);

  if (!stored && !emailed) {
    return NextResponse.json(
      { error: "We could not send your enquiry just now." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
