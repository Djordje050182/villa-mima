/**
 * Payments module — STUB. No live payments yet, by design.
 *
 * Future scope (see CLAUDE.md): Stripe deposits for DIRECT bookings only.
 * The Booking.com → ChargeAutomation flow is a separate channel arrangement and
 * is explicitly out of scope for this module — never wire it in here.
 *
 * When we switch payments on:
 *  1. `npm i stripe` and set STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET /
 *     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (placeholders already in .env.example).
 *  2. Implement createDepositCheckout() with a Stripe Checkout Session
 *     (mode: "payment", a deposit amount agreed per booking).
 *  3. Add src/app/api/stripe-webhook/route.ts to mark the enquiry/booking as
 *     deposit-paid in Supabase (an `payments` table or a status column).
 *  4. Email the guest a payment link from the enquiry workflow.
 */

export type DepositRequest = {
  enquiryId: string;
  amountEur: number;
  guestEmail: string;
};

export async function createDepositCheckout(_request: DepositRequest): Promise<never> {
  throw new Error(
    "Payments are not enabled yet. See src/lib/payments.ts and CLAUDE.md before implementing."
  );
}

export function paymentsEnabled(): boolean {
  return false;
}
