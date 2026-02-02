import { RequestHandler } from "express";
import axios from "axios";
import { addProspect } from "../lib/dashboardStore";

// Example: GoHighLevel webhook URL from environment variable
const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;

export const handleRegistrationCRM: RequestHandler = async (req, res) => {
  const { name, email, phone, courseTitle, payAfterInvoice, pricing, delegateCount, includeLaptop, marketingOptIn } = req.body;
  if (!CRM_WEBHOOK_URL) {
    return res.status(500).json({ error: "CRM webhook URL not configured" });
  }
  try {
    await axios.post(CRM_WEBHOOK_URL, {
      name,
      email,
      phone,
      courseTitle,
      delegateCount,
      includeLaptop,
      pricing,
      payAfterInvoice,
      marketingOptIn,
      source: "Knowledge Camp Registration",
      prospectStage: "registration",
      createdAt: new Date().toISOString(),
      tags: ["registration"],
    });
    addProspect({
      name,
      email,
      phone,
      company: undefined,
      courseInterest: courseTitle,
      marketingOptIn,
      source: "Knowledge Camp Registration",
      stage: "registration",
      tags: ["registration"],
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send data to CRM" });
  }
};
