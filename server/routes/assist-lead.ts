import { RequestHandler } from "express";
import axios from "axios";
import { addProspect } from "../lib/dashboardStore";
import type { AssistLeadPayload } from "@shared/api";

const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;

// Helper to normalise incoming payload supporting both snake_case and camelCase keys
function normaliseAssistLeadPayload(body: any): AssistLeadPayload {
  const leadType = body.leadType ?? body.lead_type;
  const dealSize = body.dealSize ?? body.deal_size;
  const urgency = body.urgency ?? body.urgency_level ?? body.urgency_level;
  const decisionRole = body.decisionRole ?? body.decision_role;
  const preferredHub = body.preferredHub ?? body.preferred_hub;
  const categoryInterest = body.categoryInterest ?? body.category_interest;
  const recommendedCourseIds = body.recommendedCourseIds ?? body.recommended_course_ids;
  const channel = body.channel ?? body.channel_type;

  const summary = body.summary ?? body.notes;

  return {
    leadType,
    dealSize,
    urgency,
    decisionRole,
    preferredHub,
    categoryInterest,
    recommendedCourseIds,
    channel,
    summary,
    name: body.name,
    email: body.email,
    phone: body.phone,
    company: body.company,
    city: body.city,
    marketingOptIn: body.marketingOptIn ?? body.marketing_opt_in,
    tags: body.tags,
  } as AssistLeadPayload;
}

export const handleAssistLead: RequestHandler = async (req, res) => {
  try {
    const payload = normaliseAssistLeadPayload(req.body);

    if (!payload.leadType) {
      return res.status(400).json({ error: "leadType / lead_type is required" });
    }

    const channel = payload.channel || "whatsapp";
    const source = `Knowledge Camp AI Assist (${channel})`;

    // Derive some helpful tags
    const derivedTags: string[] = ["ai-assist", `channel:${channel}`, `lead:${payload.leadType}`];
    if (payload.dealSize) derivedTags.push(`deal:${payload.dealSize}`);
    if (payload.urgency) derivedTags.push(`urgency:${payload.urgency}`);
    if (payload.decisionRole) derivedTags.push(`role:${payload.decisionRole}`);
    if (payload.preferredHub) derivedTags.push(`hub:${payload.preferredHub}`);

    const tags = Array.from(new Set([...(payload.tags || []), ...derivedTags]));

    // Store internally as a prospect
    addProspect({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      company: payload.company,
      city: payload.city,
      courseInterest: payload.categoryInterest,
      marketingOptIn: payload.marketingOptIn,
      source,
      stage: "ai_assist",
      tags,
      summary: payload.summary,
    });

    // Optionally forward to external CRM if configured
    if (CRM_WEBHOOK_URL) {
      try {
        await axios.post(CRM_WEBHOOK_URL, {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          city: payload.city,
          leadType: payload.leadType,
          dealSize: payload.dealSize,
          urgency: payload.urgency,
          decisionRole: payload.decisionRole,
          preferredHub: payload.preferredHub,
          categoryInterest: payload.categoryInterest,
          recommendedCourseIds: payload.recommendedCourseIds,
          marketingOptIn: payload.marketingOptIn,
          source,
          prospectStage: "ai_assist",
          channel,
          summary: payload.summary,
          tags,
          createdAt: new Date().toISOString(),
        });
      } catch (_error) {
        // Do not fail the request if CRM forwarding fails
      }
    }

    res.json({ success: true });
  } catch (_error) {
    res.status(500).json({ error: "Failed to process assist lead" });
  }
};
