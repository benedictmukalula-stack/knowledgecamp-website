import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import { updatePartnerStatus } from "../lib/dashboardStore";

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

export const handlePartnershipApproval: RequestHandler = async (req, res) => {
  const { name, email, status, notes } = req.body;
  if (!email || !status) {
    return res.status(400).json({ error: "Email and status are required" });
  }

  const approved = status === "approved";
  const subject = approved ? "Your partnership application is approved" : "Your partnership application update";
  const text = approved
    ? `Hi ${name || "there"},\n\nYour Knowledge Camp Global partnership application has been approved. Our team will contact you with onboarding details and access credentials.\n\n${notes ? `Notes: ${notes}\n\n` : ""}Regards,\nKnowledge Camp Global`
    : `Hi ${name || "there"},\n\nThank you for applying to partner with Knowledge Camp Global. At this time, we are unable to proceed.\n\n${notes ? `Notes: ${notes}\n\n` : ""}Regards,\nKnowledge Camp Global`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject,
      text,
    });

    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        name,
        email,
        status,
        notes,
        source: "Knowledge Camp Partnership Approval",
      });
    }

    updatePartnerStatus(email, status);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to process partnership approval" });
  }
};
