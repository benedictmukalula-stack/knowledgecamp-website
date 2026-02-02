import { RequestHandler } from "express";
import { getReferrals } from "../lib/dashboardStore";

export const handleDashboardReferrals: RequestHandler = (_req, res) => {
  res.json({ referrals: getReferrals() });
};
