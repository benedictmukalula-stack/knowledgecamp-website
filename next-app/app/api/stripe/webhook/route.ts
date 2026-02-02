import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook signature error: ${err.message}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const regId = session.metadata?.registration_id;

    if (regId) {
      try {
        await supabaseAdmin.from("payment_events").insert({
          registration_id: regId,
          provider: "stripe",
          event_type: event.type,
          raw_payload: event as any,
        });
      } catch {
        // Ignore if audit table not yet present
      }

      await supabaseAdmin
        .from("registrations")
        .update({
          payment_status: "paid",
          registration_status: "confirmed",
          payment_provider: "stripe",
          payment_method: "online_card",
          payment_reference: String(session.id),
          stripe_payment_intent_id: String(session.payment_intent || ""),
        })
        .eq("id", regId);

      await supabaseAdmin.from("payments").insert({
        registration_id: regId,
        provider: "stripe",
        provider_ref: session.id,
        amount: session.amount_total || 0,
        currency: (session.currency || "zar").toUpperCase(),
        status: "paid",
      });
    }
  }

  return NextResponse.json({ received: true });
}
