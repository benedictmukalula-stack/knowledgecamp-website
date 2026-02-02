"use client";
import React, { useEffect, useState } from "react";

export default function InvoiceIssuedPage() {
  const [info, setInfo] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const reg = sp.get("reg");
    if (!reg) return;

    (async () => {
      const res = await fetch(`/api/invoices/create?reg=${reg}`, {
        method: "POST",
      });
      const data = await res.json();
      setInfo({ ...data, reg });
    })();
  }, []);

  async function handleUploadPop(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!info?.reg) return;

    const input = (e.currentTarget.elements.namedItem("file") as
      | HTMLInputElement
      | null);
    if (!input || !input.files || !input.files[0]) {
      setUploadMsg("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setUploadMsg(null);
    try {
      const formData = new FormData();
      formData.append("registrationId", info.reg);
      formData.append("file", input.files[0]);

      const res = await fetch("/api/payments/upload-pop", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");
      setUploadMsg("Proof of payment uploaded successfully.");
    } catch (err: any) {
      setUploadMsg(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Invoice Issued</h1>
      <p className="mt-1 text-sm opacity-80">
        Your invoice has been generated and sent to your billing and
        authoriser emails.
      </p>

      <div className="mt-6 rounded-xl border p-4 text-sm space-y-4">
        <div>
          <b>Invoice:</b> {info?.invoice_number || "Generating..."}
        </div>
        <div>
          <b>Status:</b> Awaiting payment (Manual EFT)
        </div>
        <div>
          <b>Reference:</b> {info?.invoice_number || "Generating..."}
        </div>
        <div className="opacity-80">
          Please use this reference when making your EFT payment. Once payment
          is received and reconciled, your registration will be confirmed.
        </div>

        <div className="mt-4 border-t pt-4 text-sm">
          <h2 className="font-medium mb-2">Bank Details</h2>
          <ul className="space-y-1">
            <li>
              <b>Account name:</b> {process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || "Knowledge Camp"}
            </li>
            <li>
              <b>Bank:</b> {process.env.NEXT_PUBLIC_BANK_NAME || "Your Bank"}
            </li>
            <li>
              <b>Account number:</b> {process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER || "0000000000"}
            </li>
            <li>
              <b>Branch code:</b> {process.env.NEXT_PUBLIC_BANK_BRANCH_CODE || "000000"}
            </li>
            <li>
              <b>SWIFT:</b> {process.env.NEXT_PUBLIC_BANK_SWIFT || "SWIFT"}
            </li>
          </ul>
        </div>

        <div className="mt-4 border-t pt-4 text-sm">
          <h2 className="font-medium mb-2">Upload Proof of Payment (POP)</h2>
          <form onSubmit={handleUploadPop} className="space-y-2">
            <input
              type="file"
              name="file"
              accept="application/pdf,image/png,image/jpeg"
              title="Upload proof of payment file"
            />
            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center rounded-md bg-black px-4 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload POP"}
            </button>
          </form>
          {uploadMsg && (
            <div className="mt-2 text-xs opacity-80">{uploadMsg}</div>
          )}
        </div>
      </div>
    </div>
  );
}
