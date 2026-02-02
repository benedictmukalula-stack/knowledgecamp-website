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

export const handleRegistrationEmail: RequestHandler = async (req, res) => {
  const { name, email, phone, courseTitle, payAfterInvoice, pricing, delegateCount, includeLaptop } = req.body;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.REGISTRATION_EMAIL_TO || process.env.SMTP_FROM,
      subject: `New Registration: ${courseTitle}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCourse: ${courseTitle}\nDelegates: ${delegateCount || 1}\nInclude Laptop: ${includeLaptop ? "Yes" : "No"}\nTotal: ${pricing?.total ? `ZAR ${pricing.total}` : "N/A"}\nPay after invoice: ${payAfterInvoice ? "Yes" : "No"}`,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send registration email" });
  }
};
