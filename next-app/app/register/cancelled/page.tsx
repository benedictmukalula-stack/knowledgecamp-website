"use client";

export default function RegisterCancelledPage() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">Payment Cancelled</h1>
      <p className="mt-1 text-sm opacity-80">
        Your Stripe payment was cancelled. Your registration remains
        incomplete. You can restart the registration at any time.
      </p>
    </div>
  );
}
