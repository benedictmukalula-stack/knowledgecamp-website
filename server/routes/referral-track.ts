import { RequestHandler } from "express";
import { addReferral } from "../lib/dashboardStore";

export const handleReferralTrack: RequestHandler = (req, res) => {
  const { code, courseTitle, email } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Referral code is required" });
  }

  addReferral({
    code,
    courseTitle,
    email,
    createdAt: new Date().toISOString(),
  });

  res.json({ success: true });
};
