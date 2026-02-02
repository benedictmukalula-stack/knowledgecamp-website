import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const regId = searchParams.get("reg");
  if (!regId)
    return NextResponse.json({ error: "Missing reg" }, { status: 400 });

  const { data: reg, error } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .eq("id", regId)
    .single();

  if (error || !reg)
    return NextResponse.json(
      { error: "Registration not found" },
      { status: 404 },
    );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: reg.billing_email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: reg.currency.toLowerCase(),
          unit_amount: reg.total_amount,
          product_data: { name: `Course Registration (${reg.session_id})` },
        },
      },
    ],
    metadata: { registration_id: reg.id },
    success_url: `${process.env.SITE_URL}/register/success?reg=${reg.id}`,
    cancel_url: `${process.env.SITE_URL}/register/cancelled?reg=${reg.id}`,
  });

  await supabaseAdmin
    .from("registrations")
    .update({ stripe_checkout_session_id: session.id })
    .eq("id", reg.id);

  // Redirect user to Stripe
  return NextResponse.redirect(session.url!, { status: 303 });
}
