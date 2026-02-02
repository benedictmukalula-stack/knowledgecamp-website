import { RequestHandler } from "express";
import Stripe from "stripe";
import { createXeroContact, createXeroInvoice, isXeroConfigured } from "../lib/xeroApi";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  return new Stripe(key, { apiVersion: "2026-01-28.clover" });
}

export const handleStripeWebhook: RequestHandler = async (req, res) => {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return res.status(500).json({ error: "Stripe webhook not configured" });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"] as string,
      secret
    );
  } catch (err) {
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const courseTitle = session.metadata?.course || "Training";
    const contactName = session.metadata?.name || session.customer_details?.name || "Customer";
    const email = session.customer_details?.email || session.customer_email || undefined;
    const total = (session.amount_total || 0) / 100;

    if (isXeroConfigured()) {
      try {
        const contactId = await createXeroContact({
          name: contactName,
          email,
          phone: session.customer_details?.phone || undefined,
        });
        await createXeroInvoice({
          contactId,
          contactName,
          email,
          courseTitle,
          total,
          delegateCount: 1,
        });
      } catch {
        // Swallow errors to avoid webhook retry storms
      }
    }
  }

  res.json({ received: true });
};
