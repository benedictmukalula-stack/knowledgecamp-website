import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import { addSponsor, addProspect } from "../lib/dashboardStore";

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

export const handleSponsorRequest: RequestHandler = async (req, res) => {
  const { name, email, company, phone, tier, message } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SPONSOR_EMAIL_TO || process.env.SMTP_FROM,
      subject: `New Sponsorship Interest from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nTier: ${tier}\nMessage: ${message}`,
    });

    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        name,
        email,
        company,
        phone,
        tier,
        message,
        source: "Knowledge Camp Sponsorship Interest",
        prospectStage: "sponsor_interest",
        createdAt: new Date().toISOString(),
        tags: ["sponsor"],
      });
    }

    addSponsor({
      name,
      company,
      email,
      tier,
      createdAt: new Date().toISOString(),
    });

    addProspect({
      name,
      email,
      phone,
      company,
      source: "Knowledge Camp Sponsorship Interest",
      stage: "sponsor_interest",
      tags: ["sponsor"],
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to process sponsorship interest" });
  }
};
