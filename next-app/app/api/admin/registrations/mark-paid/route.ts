import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  const adminKey = req.headers.get("x-admin-key");
  if (!adminKey || adminKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const regId = body.registrationId as string | undefined;
  const amount = body.amount as number | undefined;
  const bank = body.bank as string | undefined;
  const receivedAt = body.receivedAt as string | undefined;
  const reconciledBy = body.reconciledBy as string | undefined;

  if (!regId)
    return NextResponse.json({ error: "Missing registrationId" }, { status: 400 });

  await supabaseAdmin
    .from("registrations")
    .update({
      payment_status: "paid",
      registration_status: "confirmed",
      reconciled_at: receivedAt || new Date().toISOString(),
      reconciled_by: reconciledBy || "admin",
    })
    .eq("id", regId);

  if (amount != null) {
    await supabaseAdmin.from("payments").insert({
      registration_id: regId,
      provider: "manual",
      provider_ref: `manual-${regId}`,
      amount,
      currency: "ZAR",
      status: "paid",
      meta: bank ? { bank } : null,
    });
  }

  return NextResponse.json({ success: true });
}
