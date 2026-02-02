import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import { addQuote, addProspect } from "../lib/dashboardStore";

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

export const handleQuoteRequest: RequestHandler = async (req, res) => {
  const { company, contact, email, requirements } = req.body;
  try {
    // Send email notification
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.QUOTE_EMAIL_TO || process.env.SMTP_FROM,
      subject: `New Quote Request from ${company}`,
      text: `Company: ${company}\nContact: ${contact}\nEmail: ${email}\nRequirements: ${requirements}`,
    });
    // Send to CRM
    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        company,
        contact,
        email,
        requirements,
        source: "Knowledge Camp Quote Request",
        prospectStage: "quote_request",
        createdAt: new Date().toISOString(),
        tags: ["quote"],
      });
    }
    addQuote({
      company,
      contact,
      email,
      createdAt: new Date().toISOString(),
    });

    addProspect({
      name: contact,
      email,
      company,
      source: "Knowledge Camp Quote Request",
      stage: "quote_request",
      tags: ["quote"],
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to process quote request" });
  }
};
