import { RequestHandler } from "express";
import axios from "axios";

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const WHATSAPP_FROM = process.env.WHATSAPP_FROM; // e.g. whatsapp:+14155238886

export const handleRegistrationWhatsApp: RequestHandler = async (req, res) => {
  const { phone, name, courseTitle, startDate } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !WHATSAPP_FROM) {
    return res.status(200).json({
      success: false,
      message: "WhatsApp not configured",
    });
  }

  const to = phone.startsWith("whatsapp:") ? phone : `whatsapp:${phone}`;
  const message = `Hi ${name || "there"}, your registration for ${courseTitle || "your course"} has been received. We'll send your calendar invite and next steps shortly.${startDate ? ` Start date: ${startDate}.` : ""}`;

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    const form = new URLSearchParams();
    form.append("From", WHATSAPP_FROM);
    form.append("To", to);
    form.append("Body", message);

    await axios.post(url, form.toString(), {
      auth: {
        username: TWILIO_ACCOUNT_SID,
        password: TWILIO_AUTH_TOKEN,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to send WhatsApp message" });
  }
};
