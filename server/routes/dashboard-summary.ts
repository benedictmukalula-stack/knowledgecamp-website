import { RequestHandler } from "express";
import { getDashboardSummary } from "../lib/dashboardStore";

export const handleDashboardSummary: RequestHandler = (_req, res) => {
  res.json(getDashboardSummary());
};
