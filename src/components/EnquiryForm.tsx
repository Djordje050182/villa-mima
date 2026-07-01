"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClasses =
  "w-full border border-ink/20 bg-limestone px-4 py-3 text-[15px] text-ink placeholder:text-ink/40 focus:border-teal";

// The static GitHub Pages preview has no API routes, so the form falls back to
// composing an email instead of posting to /api/enquiry.
const IS_STATIC_PREVIEW = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (IS_STATIC_PREVIEW) {
      const subject = encodeURIComponent(
        `Enquiry: ${data.checkIn} to ${data.checkOut}, ${data.guests} guests — ${data.name}`
      );
      const bodyText = encodeURIComponent(
        `Dates: ${data.checkIn} to ${data.checkOut}\nGuests: ${data.guests}\n\n${data.message ?? ""}`
      );
      window.location.href = `mailto:stay@villamima.com?subject=${subject}&body=${bodyText}`;
      return;
    }

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error ?? "Something went wrong sending your enquiry.");
      }
      setStatus("sent");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div aria-live="polite" className="border border-herb/40 bg-herb/10 px-6 py-8">
        <p className="font-display text-2xl">Thank you — we have your enquiry.</p>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink/75">
          We reply personally, usually within a day. If your dates are free we will
          hold them while we talk.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="checkIn" className="eyebrow block text-ink/60">
            Check-in
          </label>
          <input id="checkIn" name="checkIn" type="date" required className={`mt-2 ${inputClasses}`} />
        </div>
        <div>
          <label htmlFor="checkOut" className="eyebrow block text-ink/60">
            Check-out
          </label>
          <input id="checkOut" name="checkOut" type="date" required className={`mt-2 ${inputClasses}`} />
        </div>
        <div>
          <label htmlFor="guests" className="eyebrow block text-ink/60">
            Guests
          </label>
          <select id="guests" name="guests" required defaultValue="2" className={`mt-2 ${inputClasses}`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className="eyebrow block text-ink/60">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-2 ${inputClasses}`}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="eyebrow block text-ink/60">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${inputClasses}`}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="eyebrow block text-ink/60">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Anything we should know — travelling with children, arrival times, special occasions…"
            className={`mt-2 ${inputClasses}`}
          />
        </div>
        {/* Honeypot — humans never see or fill this */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "error" && (
        <p aria-live="polite" className="mt-5 border border-teal/30 bg-teal/5 px-4 py-3 text-sm text-ink/80">
          {errorMessage} You can also email us directly — the address is in the footer.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 bg-teal px-8 py-4 text-[13px] font-bold tracking-[0.14em] text-limestone uppercase transition-colors hover:bg-bay-night disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
