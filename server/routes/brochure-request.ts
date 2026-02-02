import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import { addProspect } from "../lib/dashboardStore";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;

export const handleBrochureRequest: RequestHandler = async (req, res) => {
  const { email, source } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.BROCHURE_EMAIL_TO || process.env.SMTP_FROM,
      subject: "New Brochure Request",
      text: `Email: ${email}\nSource: ${source || "website"}`,
    });

    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        email,
        source: source || "Knowledge Camp Brochure",
        prospectStage: "brochure",
        createdAt: new Date().toISOString(),
        tags: ["brochure"],
      });
    }

    addProspect({
      email,
      source: source || "Knowledge Camp Brochure",
      stage: "brochure",
      tags: ["brochure"],
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to process brochure request" });
  }
};
