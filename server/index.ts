import { handleContactRequest } from "./routes/contact-request";
import { handlePartnershipRequest } from "./routes/partnership-request";
import { handlePartnershipApproval } from "./routes/partnership-approval";
import { handleQuoteRequest } from "./routes/quote-request";
import { handleQuoteProposal } from "./routes/quote-proposal";
import "dotenv/config";
import express from "express";
import cors from "cors";

import { handleDemo } from "./routes/demo";

import { handleCreateCheckoutSession } from "./routes/stripe-checkout";

import { handleRegistrationEmail } from "./routes/registration-email";
import { handleRegistrationCRM } from "./routes/registration-crm";
import { handleRegistrationWhatsApp } from "./routes/registration-whatsapp";
import { handleRegistrationLog } from "./routes/registration-log";
import { handleDashboardSummary } from "./routes/dashboard-summary";
import { handleDashboardPartners } from "./routes/dashboard-partners";
import { handleDashboardReferrals } from "./routes/dashboard-referrals";
import { handleReferralTrack } from "./routes/referral-track";
import { handleSponsorRequest } from "./routes/sponsor-request";
import { handleDashboardSponsors } from "./routes/dashboard-sponsors";
import { handleDashboardProspects } from "./routes/dashboard-prospects";
import { handleProspectStatusUpdate } from "./routes/prospect-status";
import { handleBrochureRequest } from "./routes/brochure-request";
import { handleLmsWaitlist } from "./routes/lms-waitlist";
import { handleXeroInvoiceRequest } from "./routes/xero-invoice";
import { handleXeroQuoteRequest } from "./routes/xero-quote";
import { handleStripeWebhook } from "./routes/stripe-webhook";
import { handleFaqIndex, handleFaqSearch } from "./routes/faq";
import { handleAssistLead } from "./routes/assist-lead";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);


  // Stripe checkout session route
  app.post("/api/stripe/checkout", handleCreateCheckoutSession);

  // Xero invoice/quote request routes
  app.post("/api/xero/invoice", handleXeroInvoiceRequest);
  app.post("/api/xero/quote", handleXeroQuoteRequest);


  // Registration email notification route
  app.post("/api/registration/email", handleRegistrationEmail);

  // Registration CRM integration route
  app.post("/api/registration/crm", handleRegistrationCRM);

  // Registration logging route
  app.post("/api/registration/log", handleRegistrationLog);

  // Registration WhatsApp reminder route
  app.post("/api/registration/whatsapp", handleRegistrationWhatsApp);

  // Referral tracking route
  app.post("/api/referral/track", handleReferralTrack);

  // Quote request route
  app.post("/api/quote", handleQuoteRequest);

  // Quote proposal email route
  app.post("/api/quote/proposal", handleQuoteProposal);

  // Partnership request route
  app.post("/api/partnership", handlePartnershipRequest);

  // Partnership approval route
  app.post("/api/partnership/approval", handlePartnershipApproval);

  // Contact request route
  app.post("/api/contact", handleContactRequest);

  // Sponsor interest route
  app.post("/api/sponsor", handleSponsorRequest);

  // Brochure request route
  app.post("/api/brochure", handleBrochureRequest);

  // LMS waitlist route
  app.post("/api/lms/waitlist", handleLmsWaitlist);

  // Dashboard summary route
  app.get("/api/dashboard/summary", handleDashboardSummary);

  // Dashboard partners list route
  app.get("/api/dashboard/partners", handleDashboardPartners);

  // Dashboard referrals list route
  app.get("/api/dashboard/referrals", handleDashboardReferrals);

  // Dashboard sponsors list route
  app.get("/api/dashboard/sponsors", handleDashboardSponsors);

  // Dashboard prospects list + status routes
  app.get("/api/dashboard/prospects", handleDashboardProspects);
  app.post("/api/dashboard/prospects/status", handleProspectStatusUpdate);

  // FAQ knowledgebase routes (for AI and WhatsApp integrations)
  app.get("/api/faq", handleFaqIndex);
  app.get("/api/faq/search", handleFaqSearch);

  // AI / WhatsApp assist lead intake route
  app.post("/api/assist/lead", handleAssistLead);

  return app;
}
