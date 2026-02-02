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
const CONTACT_EMAIL_TO = process.env.CONTACT_EMAIL_TO || "info@knowledgecamp.co.za";
const NEWSLETTER_EMAIL_TO = process.env.NEWSLETTER_EMAIL_TO || "subscribe@knowledgecamp.co.za";

export const handleContactRequest: RequestHandler = async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    role,
    city,
    interestType,
    courseInterest,
    delegates,
    message,
    newsletterOptIn,
  } = req.body;
  try {
    const lines: string[] = [];
    if (name) lines.push(`Name: ${name}`);
    if (email) lines.push(`Email: ${email}`);
    if (phone) lines.push(`Phone: ${phone}`);
    if (company) lines.push(`Company: ${company}`);
    if (role) lines.push(`Role: ${role}`);
    if (city) lines.push(`City/Country: ${city}`);
    if (interestType) lines.push(`Interest type: ${interestType}`);
    if (courseInterest) lines.push(`Course/topic of interest: ${courseInterest}`);
    if (delegates) lines.push(`Approx. delegates: ${delegates}`);
    if (typeof newsletterOptIn === "boolean") {
      lines.push(`Newsletter opt-in: ${newsletterOptIn ? "Yes" : "No"}`);
    }
    if (message) {
      lines.push("--- Message ---");
      lines.push(message);
    }

    // Send email notification to main inbox
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: CONTACT_EMAIL_TO,
      subject: `New Contact Message from ${name}`,
      text: lines.join("\n"),
    });

    // If opted in, send a separate email to the newsletter inbox
    if (newsletterOptIn) {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: NEWSLETTER_EMAIL_TO,
        subject: "New newsletter subscription from contact form",
        text: [
          name && `Name: ${name}`,
          email && `Email: ${email}`,
          company && `Company: ${company}`,
          city && `City/Country: ${city}`,
          "Source: Knowledge Camp Contact Form",
        ]
          .filter(Boolean)
          .join("\n"),
      });
    }
    // Send to CRM
    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        name,
        email,
        phone,
        company,
        role,
        city,
        interestType,
        courseInterest,
        delegates,
        message,
        newsletterOptIn,
        source: "Knowledge Camp Contact",
        prospectStage: "contact",
        createdAt: new Date().toISOString(),
        tags: ["contact-form"],
      });
    }

    addProspect({
      name,
      email,
      phone,
      company,
      role,
      city,
      courseInterest,
      marketingOptIn: newsletterOptIn,
      source: "Knowledge Camp Contact",
      stage: "contact",
      tags: ["contact-form"],
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to process contact message" });
  }
};
