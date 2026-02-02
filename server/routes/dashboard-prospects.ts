import { RequestHandler } from "express";
import { getProspects, ProspectStatus } from "../lib/dashboardStore";

export const handleDashboardProspects: RequestHandler = (req, res) => {
  const status = (req.query.status as ProspectStatus | undefined) || undefined;
  const prospects = getProspects(status);
  res.json({ prospects });
};
