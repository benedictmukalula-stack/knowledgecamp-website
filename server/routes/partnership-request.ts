import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import { addPartner, addProspect } from "../lib/dashboardStore";

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

export const handlePartnershipRequest: RequestHandler = async (req, res) => {
  const { name, email, company, phone, partnerType, region, website, documentUrl, message } = req.body;
  try {
    // Send email notification
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.PARTNERSHIP_EMAIL_TO || process.env.SMTP_FROM,
      subject: `New Partnership Application from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${company}\nPartner Type: ${partnerType}\nRegion: ${region || "N/A"}\nWebsite: ${website || "N/A"}\nDocument: ${documentUrl || "N/A"}\nMessage: ${message}`,
    });
    // Send acknowledgement to applicant
    if (email) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: "We received your partnership application",
        text: `Hi ${name},\n\nThank you for applying to partner with Knowledge Camp Global. Our team will review your application and contact you within 3-5 business days.\n\nRegards,\nKnowledge Camp Global`,
      });
    }
    // Send to CRM
    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        name,
        email,
        phone,
        company,
        partnerType,
        region,
        website,
        documentUrl,
        message,
        status: "pending",
        source: "Knowledge Camp Partnership Application",
        prospectStage: "partner_application",
        createdAt: new Date().toISOString(),
        tags: ["partner"],
      });
    }
    addPartner({
      name,
      email,
      company,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    addProspect({
      name,
      email,
      phone,
      company,
      source: "Knowledge Camp Partnership Application",
      stage: "partner_application",
      tags: ["partner"],
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to process partnership application" });
  }
};
