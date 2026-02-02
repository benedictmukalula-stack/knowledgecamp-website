/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Payload accepted by /api/assist/lead from AI / WhatsApp integrations
 * to create a structured prospect record in the internal dashboard/CRM.
 *
 * The API is flexible and accepts both camelCase and snake_case field
 * names; this interface documents the canonical camelCase shape.
 */
export interface AssistLeadPayload {
  leadType: "individual" | "corporate";
  dealSize?: "low" | "medium" | "high";
  urgency?: "immediate" | "this_quarter" | "later";
  decisionRole?: "decision_maker" | "influencer";
  preferredHub?: "local" | "africa" | "international";
  categoryInterest?: string;
  recommendedCourseIds?: string[];
  channel?: "whatsapp" | "web_chat" | "email";
  summary?: string;

  // Optional contact fields when the AI already collected them
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  city?: string;

  // Optional marketing flag and tags from the AI/middleware
  marketingOptIn?: boolean;
  tags?: string[];
}
