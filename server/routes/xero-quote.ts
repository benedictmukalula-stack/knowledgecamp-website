import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import { createXeroContact, createXeroQuote, isXeroConfigured } from "../lib/xeroApi";

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

export const handleXeroQuoteRequest: RequestHandler = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    company,
    courseTitle,
    pricing,
    delegateCount,
    includeLaptop,
  } = req.body || {};

  if (!fullName || !email || !courseTitle || !pricing) {
    return res.status(400).json({ error: "Missing required quote fields" });
  }

  try {
    let xeroQuote: { id?: string; number?: string; status?: string } | null = null;
    if (isXeroConfigured()) {
      const contactId = await createXeroContact({
        name: company || fullName,
        email,
        phone,
      });
      xeroQuote = await createXeroQuote({
        contactId,
        contactName: company || fullName,
        email,
        courseTitle,
        total: pricing.total,
        delegateCount: delegateCount || 1,
      });
    }

    const quoteEmailTo = process.env.QUOTE_EMAIL_TO || process.env.SMTP_FROM;
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: quoteEmailTo,
      subject: `Quote Request: ${courseTitle} (${fullName})`,
      text: [
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || ""}`,
        `Company: ${company || ""}`,
        `Course: ${courseTitle}`,
        `Delegates: ${delegateCount || 1}`,
        `Include Laptop: ${includeLaptop ? "Yes" : "No"}`,
        `Total: ${pricing.total}`,
        xeroQuote?.number ? `Xero Quote: ${xeroQuote.number}` : "",
      ].join("\n"),
    });

    if (CRM_WEBHOOK_URL) {
      await axios.post(CRM_WEBHOOK_URL, {
        fullName,
        email,
        phone,
        company,
        courseTitle,
        pricing,
        delegateCount,
        includeLaptop,
        paymentOption: "quote",
        xeroQuote,
        source: "Knowledge Camp Checkout",
      });
    }

    res.json({
      success: true,
      status: "queued",
      message: "Quote request queued",
      xeroQuote,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process quote request" });
  }
};
