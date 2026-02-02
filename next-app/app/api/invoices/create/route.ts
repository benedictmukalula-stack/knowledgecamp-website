import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

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

function makeInvoiceNumber() {
  // Example: KC-2026-000123
  const yyyy = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `KC-${yyyy}-${rand}`;
}

export async function POST(req: Request) {
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

  const invoiceNumber = reg.invoice_number || makeInvoiceNumber();

  await supabaseAdmin
    .from("registrations")
    .update({
      invoice_number: invoiceNumber,
      payment_status: "unpaid",
      registration_status: "awaiting_payment",
      payment_method: "invoice_eft",
      payment_provider: "manual",
      payment_reference: invoiceNumber,
    })
    .eq("id", regId);

  const subject = `Invoice ${invoiceNumber} – Knowledge Camp Registration`;
  const bankName = process.env.BANK_NAME || "Your Bank";
  const bankAccountName = process.env.BANK_ACCOUNT_NAME || "Knowledge Camp";
  const bankAccountNumber = process.env.BANK_ACCOUNT_NUMBER || "0000000000";
  const bankBranchCode = process.env.BANK_BRANCH_CODE || "000000";
  const bankSwift = process.env.BANK_SWIFT || "SWIFT";

  const body = `Invoice: ${invoiceNumber}
Registration ID: ${reg.id}
Session: ${reg.session_id}
Company: ${reg.company_name}
Total: ${reg.total_amount / 100} ${reg.currency}

Payment method: Invoice Then Pay (Manual EFT)
Reference (use for EFT payments): ${invoiceNumber}

Bank details:
Account name: ${bankAccountName}
Bank: ${bankName}
Account number: ${bankAccountNumber}
Branch code: ${bankBranchCode}
SWIFT: ${bankSwift}

Please email proof of payment to ${process.env.REGISTER_INTERNAL_EMAIL || "register@knowledgecamp.co.za"} to expedite confirmation.

If you require assistance, reply to this email.`;

  // Send to billing + authoriser
  await sendEmail(reg.billing_email, subject, body);
  if (reg.authoriser_email && reg.authoriser_email !== reg.billing_email) {
    await sendEmail(reg.authoriser_email, subject, body);
  }

  // Internal copy recommended
  await sendEmail(
    process.env.REGISTER_INTERNAL_EMAIL || "register@knowledgecamp.co.za",
    `COPY: ${subject}`,
    body,
  );

  return NextResponse.json({ invoice_number: invoiceNumber });
}
