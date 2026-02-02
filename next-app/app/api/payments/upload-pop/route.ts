import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const regId = String(formData.get("registrationId") || "").trim();
    const file = formData.get("file");

    if (!regId)
      return NextResponse.json(
        { error: "Missing registrationId" },
        { status: 400 },
      );

    if (!(file instanceof File))
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 },
      );

    const allowedTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (file.type && !allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Upload PDF or image." },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = (file.name.split(".").pop() || "pdf").toLowerCase();
    const path = `pop/${regId}/${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabaseAdmin.storage
      .from("payment_proofs")
      .upload(path, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadErr)
      return NextResponse.json(
        { error: "Failed to upload proof of payment" },
        { status: 500 },
      );

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("payment_proofs").getPublicUrl(path);

    await supabaseAdmin
      .from("registrations")
      .update({ pop_url: publicUrl, payment_status: "awaiting_review" })
      .eq("id", regId);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Upload failed" },
      { status: 500 },
    );
  }
}
