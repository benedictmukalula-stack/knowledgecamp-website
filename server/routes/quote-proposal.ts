import { RequestHandler } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const handleQuoteProposal: RequestHandler = async (req, res) => {
  const { to, subject, html, text } = req.body;
  if (!to || !subject) {
    return res.status(400).json({ error: "Recipient and subject are required" });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
      text,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send proposal email" });
  }
};
