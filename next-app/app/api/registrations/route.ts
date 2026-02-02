import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { COURSE_CATALOG } from "@shared/courseData";
import { calculatePricing } from "@lib/pricingEngine";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

function computeTotalAmountCents(payload: any) {
  const sessionId = payload.sessionId as string | undefined;
  if (!sessionId) {
    throw new Error("Missing sessionId for pricing");
  }

  const course = COURSE_CATALOG.find((c) => c.id === sessionId);
  if (!course) {
    throw new Error("Unknown sessionId for pricing");
  }

  const delegateCount = Array.isArray(payload.delegates)
    ? Math.max(1, payload.delegates.length)
    : 1;

  const startMs = new Date(course.startDate).getTime();
  const nowMs = Date.now();
  const isEarlyBird = startMs - nowMs < 1000 * 60 * 60 * 24 * 30;
  const isVIP = course.rating > 4.8;

  const pricing = calculatePricing({
    course,
    delegateCount,
    includeLaptop: false,
    isEarlyBird,
    isVIP,
    isInHouse: false,
  });

  return Math.round(pricing.total * 100);
}

async function sendEmail(to: string, subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    text,
  });
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!payload.sessionId)
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    if (!payload.termsAccepted)
      return NextResponse.json({ error: "Terms must be accepted" }, { status: 400 });

    const total = computeTotalAmountCents(payload);

    const paymentMethod = payload.payment_method as
      | "online_card"
      | "instant_eft"
      | "invoice_eft";

    if (!paymentMethod)
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 },
      );

    const { data: reg, error: regErr } = await supabaseAdmin
      .from("registrations")
      .insert({
        session_id: payload.sessionId,

        company_name: payload.company_name,
        vat_tax_id: payload.vat_tax_id || null,
        billing_email: payload.billing_email,
        billing_phone: payload.billing_phone,
        billing_address: payload.billing_address,

        authoriser_name: payload.authoriser_name,
        authoriser_title: payload.authoriser_title,
        authoriser_email: payload.authoriser_email,
        authoriser_phone: payload.authoriser_phone,

        payment_method: paymentMethod,
        payment_provider:
          paymentMethod === "online_card"
            ? "stripe"
            : paymentMethod === "invoice_eft"
            ? "manual"
            : null,
        registration_status: "submitted",
        payment_status:
          paymentMethod === "online_card" || paymentMethod === "instant_eft"
            ? "pending"
            : "unpaid",

        terms_accepted: true,
        marketing_opt_in: !!payload.marketingOptIn,

        total_amount: total,
        currency: "ZAR",
      })
      .select("*")
      .single();

    if (regErr) throw regErr;

    // Delegates
    const delegates = (payload.delegates || []).map((d: any) => ({
      registration_id: reg.id,
      full_name: d.full_name,
      email: d.email,
      mobile: d.mobile,
      title: d.title || null,
      notes: d.notes || null,
    }));

    const { error: delErr } = await supabaseAdmin
      .from("registration_delegates")
      .insert(delegates);
    if (delErr) throw delErr;

    // Internal notification (recommended)
    await sendEmail(
      process.env.REGISTER_INTERNAL_EMAIL || "register@knowledgecamp.co.za",
      `NEW REGISTRATION: ${reg.company_name} (${reg.id})`,
      `Registration ${reg.id}\nSession: ${reg.session_id}\nPayment: ${reg.payment_method}\nTotal: ${
        reg.total_amount / 100
      } ${reg.currency}\nBilling: ${reg.billing_email}\nAuthoriser: ${reg.authoriser_email}`,
    );

    // Marketing opt-in notification → subscribe@
    if (payload.marketingOptIn) {
      await sendEmail(
        process.env.SUBSCRIBE_EMAIL || "subscribe@knowledgecamp.co.za",
        `NEW MARKETING OPT-IN: ${reg.company_name}`,
        `Opt-in captured.\nCompany: ${reg.company_name}\nBilling: ${reg.billing_email}\nAuthoriser: ${reg.authoriser_name} (${reg.authoriser_email})\nSession: ${reg.session_id}\nTimestamp: ${reg.created_at}`,
      );
    }

    // Next step routing
    if (paymentMethod === "online_card") {
      return NextResponse.json({
        registrationId: reg.id,
        checkoutStartUrl: `/api/stripe/create-checkout?reg=${reg.id}`,
      });
    }

    return NextResponse.json({
      registrationId: reg.id,
      invoiceUrl: `/register/invoice-issued?reg=${reg.id}`,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Server error" },
      { status: 500 },
    );
  }
}
