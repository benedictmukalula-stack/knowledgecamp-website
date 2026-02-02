import { RequestHandler } from "express";
import { getPartners } from "../lib/dashboardStore";

export const handleDashboardPartners: RequestHandler = (_req, res) => {
  res.json({ partners: getPartners() });
};
