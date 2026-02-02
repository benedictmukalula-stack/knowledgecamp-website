import { RequestHandler } from "express";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  return new Stripe(key, {
    apiVersion: "2026-01-28.clover",
  });
}

export const handleCreateCheckoutSession: RequestHandler = async (req, res) => {
  const { name, email, course, amount } = req.body;
  const stripe = getStripe();
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured" });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "zar",
            product_data: {
              name: course,
              description: `Registration for ${name}`,
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/register?success=true`,
      cancel_url: `${process.env.BASE_URL}/register?canceled=true`,
      metadata: { name, course },
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: "Stripe session creation failed" });
  }
};
