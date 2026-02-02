import { RequestHandler } from "express";
import { getSponsors } from "../lib/dashboardStore";

export const handleDashboardSponsors: RequestHandler = (_req, res) => {
  res.json({ sponsors: getSponsors() });
};
