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

export const handleLmsWaitlist: RequestHandler = async (req, res) => {
  const { email, name, marketingOptIn } = req.body as {
    email?: string;
    name?: string;
    marketingOptIn?: boolean;
  };

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.LMS_WAITLIST_EMAIL_TO || process.env.SMTP_FROM,
      subject: "New LMS Waitlist Signup",
      text: `Email: ${email}${name ? `\nName: ${name}` : ""}${
        typeof marketingOptIn === "boolean"
          ? `\nMarketing Opt-In: ${marketingOptIn ? "Yes" : "No"}`
          : ""
      }`,
    });

    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        email,
        name,
        marketingOptIn,
        source: "Knowledge Camp LMS Waitlist",
        prospectStage: "lms_waitlist",
        createdAt: new Date().toISOString(),
      });
    }

    addProspect({
      email,
      name,
      marketingOptIn,
      source: "Knowledge Camp LMS Waitlist",
      stage: "lms_waitlist",
      tags: ["lms", "waitlist"],
    });

    res.json({ success: true });
  } catch (_error) {
    res.status(500).json({ error: "Failed to process waitlist signup" });
  }
};
