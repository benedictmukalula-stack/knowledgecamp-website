import { RequestHandler } from "express";
import { ProspectStatus, updateProspectStatus } from "../lib/dashboardStore";

export const handleProspectStatusUpdate: RequestHandler = (req, res) => {
  const { id, status } = req.body as { id?: string; status?: ProspectStatus };
  if (!id || !status) {
    return res.status(400).json({ error: "Missing id or status" });
  }

  updateProspectStatus(id, status);
  res.json({ success: true });
};
