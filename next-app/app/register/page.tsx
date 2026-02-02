"use client";

import React, { useEffect, useMemo, useState } from "react";

type Delegate = {
  full_name: string;
  email: string;
  mobile: string;
  title?: string;
  notes?: string;
};

type FormState = {
  sessionId: string;

  company_name: string;
  vat_tax_id?: string;
  billing_email: string;
  billing_phone: string;
  billing_address: string;

  authoriser_name: string;
  authoriser_title: string;
  authoriser_email: string;
  authoriser_phone: string;

  delegates: Delegate[];

  payment_method: "online_card" | "instant_eft" | "invoice_eft";

  termsAccepted: boolean; // required
  marketingOptIn: boolean; // optional
  rememberDetails: boolean; // optional
};

const LS_KEY = "kc_reg_defaults_v1";

function safeEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export default function RegisterPage() {
  const params = useMemo(() => {
    const sp = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : "",
    );
    return { sessionId: sp.get("sessionId") || "" };
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    sessionId: params.sessionId,

    company_name: "",
    vat_tax_id: "",
    billing_email: "",
    billing_phone: "",
    billing_address: "",

    authoriser_name: "",
    authoriser_title: "",
    authoriser_email: "",
    authoriser_phone: "",

    delegates: [
      { full_name: "", email: "", mobile: "", title: "", notes: "" },
    ],

    payment_method: "online_card",

    termsAccepted: false,
    marketingOptIn: false,
    rememberDetails: false,
  });

  // Prefill remembered details
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      setForm((f) => ({
        ...f,
        company_name: d.company_name ?? f.company_name,
        vat_tax_id: d.vat_tax_id ?? f.vat_tax_id,
        billing_email: d.billing_email ?? f.billing_email,
        billing_phone: d.billing_phone ?? f.billing_phone,
        billing_address: d.billing_address ?? f.billing_address,
        authoriser_name: d.authoriser_name ?? f.authoriser_name,
        authoriser_title: d.authoriser_title ?? f.authoriser_title,
        authoriser_email: d.authoriser_email ?? f.authoriser_email,
        authoriser_phone: d.authoriser_phone ?? f.authoriser_phone,
      }));
    } catch {
      // ignore
    }
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateDelegate(i: number, patch: Partial<Delegate>) {
    setForm((f) => {
      const delegates = [...f.delegates];
      delegates[i] = { ...delegates[i], ...patch };
      return { ...f, delegates };
    });
  }

  function addDelegate() {
    setForm((f) => ({
      ...f,
      delegates: [
        ...f.delegates,
        { full_name: "", email: "", mobile: "", title: "", notes: "" },
      ],
    }));
  }

  function removeDelegate(i: number) {
    setForm((f) => ({
      ...f,
      delegates:
        f.delegates.length <= 1
          ? f.delegates
          : f.delegates.filter((_, idx) => idx !== i),
    }));
  }

  function validate(): string | null {
    if (!form.sessionId)
      return "Missing sessionId. Please start from the course session page.";
    if (!form.company_name.trim()) return "Company name is required.";
    if (!safeEmail(form.billing_email)) return "Billing email is invalid.";
    if (!form.billing_phone.trim()) return "Billing phone is required.";
    if (!form.billing_address.trim()) return "Billing address is required.";
    if (!form.authoriser_name.trim()) return "Authoriser name is required.";
    if (!form.authoriser_title.trim()) return "Authoriser title is required.";
    if (!safeEmail(form.authoriser_email))
      return "Authoriser email is invalid.";
    if (!form.authoriser_phone.trim())
      return "Authoriser phone is required.";
    for (const [idx, d] of form.delegates.entries()) {
      if (!d.full_name.trim())
        return `Delegate ${idx + 1}: full name is required.`;
      if (!safeEmail(d.email))
        return `Delegate ${idx + 1}: email is invalid.`;
      if (!d.mobile.trim())
        return `Delegate ${idx + 1}: mobile is required.`;
    }
    if (!form.termsAccepted)
      return "You must accept the Terms and Conditions.";
    return null;
  }

  async function submit() {
    setErr(null);
    const v = validate();
    if (v) return setErr(v);

    setSubmitting(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed.");

      // Remember details (guest localStorage)
      if (form.rememberDetails) {
        const remembered = {
          company_name: form.company_name,
          vat_tax_id: form.vat_tax_id,
          billing_email: form.billing_email,
          billing_phone: form.billing_phone,
          billing_address: form.billing_address,
          authoriser_name: form.authoriser_name,
          authoriser_title: form.authoriser_title,
          authoriser_email: form.authoriser_email,
          authoriser_phone: form.authoriser_phone,
        };
        localStorage.setItem(LS_KEY, JSON.stringify(remembered));
      } else {
        localStorage.removeItem(LS_KEY);
      }

      // Redirect based on next step
      if (data.checkoutStartUrl)
        window.location.href = data.checkoutStartUrl as string;
      else if (data.invoiceUrl)
        window.location.href = data.invoiceUrl as string;
      else window.location.href = `/register/success?reg=${data.registrationId}`;
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">Course Registration</h1>
      <p className="mt-1 text-sm opacity-80">
        Complete your booking and choose payment method.
      </p>

      {err && (
        <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
          {err}
        </div>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Company */}
        <section className="rounded-xl border p-4">
          <h2 className="font-medium">Company &amp; Billing</h2>

          <label className="mt-3 block text-sm" htmlFor="company_name">
            Company Name *
          </label>
          <input
            id="company_name"
            className="w-full rounded-md border p-2"
            value={form.company_name}
            onChange={(e) => update("company_name", e.target.value)}
          />

          <label className="mt-3 block text-sm" htmlFor="vat_tax_id">
            VAT/Tax ID
          </label>
          <input
            id="vat_tax_id"
            className="w-full rounded-md border p-2"
            value={form.vat_tax_id || ""}
            onChange={(e) => update("vat_tax_id", e.target.value)}
          />

          <label className="mt-3 block text-sm" htmlFor="billing_email">
            Billing Email *
          </label>
          <input
            id="billing_email"
            className="w-full rounded-md border p-2"
            value={form.billing_email}
            onChange={(e) => update("billing_email", e.target.value)}
          />

          <label className="mt-3 block text-sm" htmlFor="billing_phone">
            Billing Phone *
          </label>
          <input
            id="billing_phone"
            className="w-full rounded-md border p-2"
            value={form.billing_phone}
            onChange={(e) => update("billing_phone", e.target.value)}
          />

          <label className="mt-3 block text-sm" htmlFor="billing_address">
            Billing Address *
          </label>
          <textarea
            id="billing_address"
            className="w-full rounded-md border p-2"
            rows={3}
            value={form.billing_address}
            onChange={(e) => update("billing_address", e.target.value)}
          />
        </section>

        {/* Authoriser */}
        <section className="rounded-xl border p-4">
          <h2 className="font-medium">Authoriser / Approver</h2>

          <label className="mt-3 block text-sm" htmlFor="authoriser_name">
            Full Name *
          </label>
          <input
            id="authoriser_name"
            className="w-full rounded-md border p-2"
            value={form.authoriser_name}
            onChange={(e) => update("authoriser_name", e.target.value)}
          />

          <label className="mt-3 block text-sm" htmlFor="authoriser_title">
            Job Title *
          </label>
          <input
            id="authoriser_title"
            className="w-full rounded-md border p-2"
            value={form.authoriser_title}
            onChange={(e) => update("authoriser_title", e.target.value)}
          />

          <label className="mt-3 block text-sm" htmlFor="authoriser_email">
            Email *
          </label>
          <input
            id="authoriser_email"
            className="w-full rounded-md border p-2"
            value={form.authoriser_email}
            onChange={(e) => update("authoriser_email", e.target.value)}
          />

          <label className="mt-3 block text-sm" htmlFor="authoriser_phone">
            Phone *
          </label>
          <input
            id="authoriser_phone"
            className="w-full rounded-md border p-2"
            value={form.authoriser_phone}
            onChange={(e) => update("authoriser_phone", e.target.value)}
          />

          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.rememberDetails}
              onChange={(e) => update("rememberDetails", e.target.checked)}
            />
            Remember company &amp; authoriser details for next time
          </label>
        </section>
      </div>

      {/* Delegates */}
      <section className="mt-6 rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Delegates</h2>
          <button
            type="button"
            className="rounded-md border px-3 py-1 text-sm"
            onClick={addDelegate}
          >
            + Add delegate
          </button>
        </div>

        <div className="mt-4 grid gap-4">
          {form.delegates.map((d, i) => (
            <div key={i} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Delegate {i + 1}</div>
                {form.delegates.length > 1 && (
                  <button
                    type="button"
                    className="text-sm underline"
                    onClick={() => removeDelegate(i)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <label
                    className="block text-sm"
                    htmlFor={`delegate_${i}_full_name`}
                  >
                    Full Name *
                  </label>
                  <input
                    id={`delegate_${i}_full_name`}
                    className="w-full rounded-md border p-2"
                    value={d.full_name}
                    onChange={(e) =>
                      updateDelegate(i, { full_name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    className="block text-sm"
                    htmlFor={`delegate_${i}_email`}
                  >
                    Email *
                  </label>
                  <input
                    id={`delegate_${i}_email`}
                    className="w-full rounded-md border p-2"
                    value={d.email}
                    onChange={(e) =>
                      updateDelegate(i, { email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    className="block text-sm"
                    htmlFor={`delegate_${i}_mobile`}
                  >
                    Mobile *
                  </label>
                  <input
                    id={`delegate_${i}_mobile`}
                    className="w-full rounded-md border p-2"
                    value={d.mobile}
                    onChange={(e) =>
                      updateDelegate(i, { mobile: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    className="block text-sm"
                    htmlFor={`delegate_${i}_title`}
                  >
                    Title
                  </label>
                  <input
                    id={`delegate_${i}_title`}
                    className="w-full rounded-md border p-2"
                    value={d.title || ""}
                    onChange={(e) =>
                      updateDelegate(i, { title: e.target.value })
                    }
                  />
                </div>
              </div>

              <label
                className="mt-3 block text-sm"
                htmlFor={`delegate_${i}_notes`}
              >
                Notes
              </label>
              <textarea
                id={`delegate_${i}_notes`}
                className="w-full rounded-md border p-2"
                rows={2}
                value={d.notes || ""}
                onChange={(e) =>
                  updateDelegate(i, { notes: e.target.value })
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Payment + Consents */}
      <section className="mt-6 rounded-xl border p-4">
        <h2 className="font-medium">Payment Method</h2>

        <div className="mt-3 grid gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pay"
              checked={form.payment_method === "online_card"}
              onChange={() => update("payment_method", "online_card")}
            />
            Pay Online (Card)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pay"
              checked={form.payment_method === "instant_eft"}
              onChange={() => update("payment_method", "instant_eft")}
            />
            Instant EFT / Pay by Bank
            <span className="text-xs text-muted-foreground">
              Immediate confirmation (requires provider setup)
            </span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pay"
              checked={form.payment_method === "invoice_eft"}
              onChange={() => update("payment_method", "invoice_eft")}
            />
            Invoice Then Pay (Manual EFT)
          </label>
        </div>

        <div className="mt-5 border-t pt-4">
          <h3 className="font-medium">Consents</h3>

          <label className="mt-3 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.termsAccepted}
              onChange={(e) => update("termsAccepted", e.target.checked)}
            />
            <span>
              I accept the Knowledge Camp Global Terms &amp; Conditions and
              Privacy Policy
              <span className="text-red-600">*</span>
            </span>
          </label>

          <label className="mt-3 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.marketingOptIn}
              onChange={(e) => update("marketingOptIn", e.target.checked)}
            />
            <span>
              I would like to receive training calendars, course updates,
              special offers and promotions from Knowledge Camp Global. I
              understand I can unsubscribe at any time.
            </span>
          </label>
        </div>

        <button
          type="button"
          disabled={submitting}
          onClick={submit}
          className="mt-5 w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
        >
          {submitting
            ? "Submitting..."
            : form.payment_method === "online_card"
            ? "Proceed to Secure Card Payment"
            : form.payment_method === "instant_eft"
            ? "Proceed to Instant EFT"
            : "Issue Invoice for EFT"}
        </button>
      </section>
    </div>
  );
}
