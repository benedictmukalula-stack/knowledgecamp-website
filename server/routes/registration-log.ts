import { RequestHandler } from "express";
import { addRegistration } from "../lib/dashboardStore";

export const handleRegistrationLog: RequestHandler = (req, res) => {
  const { name, email, courseTitle, delegateCount, pricing, referralCode, marketingOptIn } = req.body;

  if (!name || !email || !courseTitle) {
    return res.status(400).json({ error: "Missing registration details" });
  }

  addRegistration({
    name,
    email,
    courseTitle,
    delegateCount: Number(delegateCount) || 1,
    pricingTotal: Number(pricing?.total) || 0,
    createdAt: new Date().toISOString(),
    referralCode,
    marketingOptIn,
  });

  res.json({ success: true });
};
