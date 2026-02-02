import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import { createXeroContact, createXeroInvoice, isXeroConfigured } from "../lib/xeroApi";

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

export const handleXeroInvoiceRequest: RequestHandler = async (req, res) => {
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
    return res.status(400).json({ error: "Missing required invoice fields" });
  }

  try {
    let xeroInvoice: { id?: string; number?: string; status?: string } | null = null;
    if (isXeroConfigured()) {
      const contactId = await createXeroContact({
        name: company || fullName,
        email,
        phone,
      });
      xeroInvoice = await createXeroInvoice({
        contactId,
        contactName: company || fullName,
        email,
        courseTitle,
        total: pricing.total,
        delegateCount: delegateCount || 1,
      });
    }

    const invoiceEmailTo = process.env.INVOICE_EMAIL_TO || process.env.SMTP_FROM;
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: invoiceEmailTo,
      subject: `Invoice Request: ${courseTitle} (${fullName})`,
      text: [
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone || ""}`,
        `Company: ${company || ""}`,
        `Course: ${courseTitle}`,
        `Delegates: ${delegateCount || 1}`,
        `Include Laptop: ${includeLaptop ? "Yes" : "No"}`,
        `Total: ${pricing.total}`,
        xeroInvoice?.number ? `Xero Invoice: ${xeroInvoice.number}` : "",
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
        paymentOption: "invoice",
        xeroInvoice,
        source: "Knowledge Camp Checkout",
      });
    }

    res.json({
      success: true,
      status: "queued",
      message: "Invoice request queued",
      xeroInvoice,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process invoice request" });
  }
};
