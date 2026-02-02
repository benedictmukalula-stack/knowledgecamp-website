# Knowledge Camp – GoHighLevel Workflow & Tag Design

This document specifies how to configure GoHighLevel (or an equivalent CRM/automation platform) so it works with the AI & WhatsApp Assistant framework and the existing Knowledge Camp backend.

It assumes:

- AI/WhatsApp conversations are logged as **conversations** against a contact.
- The AI agent (or integration middleware) can set **custom fields** and **tags** on the contact.
- You will use the JSON handover payload format from `ai-assistant-framework.md` when escalating high‑value leads to humans.

---

## 1. Core Data Model in GoHighLevel

Create the following **custom fields** on contacts:

- `kc_lead_type` – `individual` | `corporate`
- `kc_deal_size` – `low` | `medium` | `high`
- `kc_urgency` – `immediate` | `this_quarter` | `later`
- `kc_decision_role` – `decision_maker` | `influencer`
- `kc_preferred_hub` – `local` | `africa` | `international`
- `kc_category_interest` – free text (e.g. `Project, Programme and Portfolio Management (PPM)`)
- `kc_recommended_course_ids` – free text (comma‑separated course IDs from catalog)
- `kc_channel` – `whatsapp` | `web_chat` | `email`
- `kc_ai_summary` – text field to store the latest AI conversation summary.

Create the following **tags**:

- `KC-AI-Lead`
- `KC-WhatsApp`
- `KC-Web-Chat`
- `KC-High-Value`
- `KC-Medium-Value`
- `KC-Low-Value`
- `KC-Needs-Approval`
- `KC-In-House-Interest`
- `KC-Registration-Ready`
- `KC-Quote-Requested`

Mapping rules (implemented by AI or middleware):

- `deal_size = high` → add tag `KC-High-Value`.
- `deal_size = medium` → add tag `KC-Medium-Value`.
- `deal_size = low` → add tag `KC-Low-Value`.
- `lead_type = corporate` and any mention of in‑house → add `KC-In-House-Interest`.
- User asks for quotation → add `KC-Quote-Requested`.
- User confirms they want to proceed with registration → add `KC-Registration-Ready`.

---

## 2. Pipelines & Stages

Create or adapt a **pipeline** called `Corporate Training` with typical stages:

1. `New AI/WhatsApp Lead`
2. `Qualification`
3. `Proposal Sent`
4. `Awaiting Approval`
5. `Confirmed / Registration in Progress`
6. `Won`
7. `Lost / On Hold`

For **individual registrations**, you can optionally use a separate `Public Courses` pipeline with:

- `New Registration`
- `Payment Pending`
- `Confirmed`
- `Attended`

---

## 3. Workflow A – Inbound AI/WhatsApp Lead Capture

**Trigger:**

- Conversation started via WhatsApp or Web Chat, and
- AI / middleware sets tag `KC-AI-Lead` OR field `kc_channel` is set.

**Actions:**

1. **Create/Update Contact** with:
   - Name (if available from conversation or WhatsApp profile).
   - Phone and/or email.
   - Custom fields from AI context: `kc_lead_type`, `kc_deal_size`, `kc_urgency`, `kc_decision_role`, `kc_preferred_hub`, `kc_category_interest`.
   - Tag `KC-WhatsApp` or `KC-Web-Chat` depending on channel.
2. **Create Opportunity** in the appropriate pipeline:
   - If `kc_lead_type = corporate` or `kc_deal_size != low` → pipeline `Corporate Training` at stage `New AI/WhatsApp Lead`.
   - Else (individual, low deal) → optional entry in `Public Courses` pipeline.
3. **Attach AI Summary**:
   - Write the AI’s internal handover summary into `kc_ai_summary` (from the JSON handover payload).
4. **Assign Owner:**
   - Use lead routing rules (e.g., by region or category) to assign to a sales user.
5. **Internal Notification:**
   - Send an internal email and/or Slack message to the assigned owner including:
     - Contact details
     - `kc_ai_summary`
     - `kc_deal_size`, `kc_urgency`, `kc_decision_role`

---

## 4. Workflow B – Registration‑Ready Individual Leads

**Trigger:**

- Contact has tag `KC-Registration-Ready`, and
- `kc_lead_type = individual`.

**Actions:**

1. If the AI has set `kc_recommended_course_ids`, use the first course ID to build a tracking link, e.g.:
   - `https://yourdomain.com/register?courseId=<ID>&source=ai_whatsapp`
2. Send an **automated WhatsApp** (or SMS/email) message:

   > "Here is your registration link for the recommended course: [registration link]. You can confirm details, choose your date and complete payment online or request an invoice. If you need help completing the form, reply here and a training advisor will assist you."

3. Optionally move the opportunity to `Confirmed / Registration in Progress` in the `Public Courses` pipeline.

---

## 5. Workflow C – Corporate / Group Quote or In‑House Request

**Trigger:**

- Contact has tag `KC-Quote-Requested` OR `KC-In-House-Interest`, and
- `kc_lead_type = corporate`.

**Actions:**

1. Ensure an opportunity exists in the `Corporate Training` pipeline. If not, create one at stage `Qualification`.
2. Set `Pipeline: Corporate Training`, `Stage: Qualification`.
3. Add tag `KC-High-Value` if `kc_deal_size = high`.
4. Send an **internal task/notification** to the assigned sales advisor:
   - Include `kc_ai_summary`, number of delegates, countries/hubs, and any dates mentioned.
5. Optionally trigger an integration to your backend:
   - Call an internal API (e.g. `/api/registration/crm` or a new `/api/assist/lead`) to store the structured handover in your own dashboard.

---

## 6. Workflow D – Approval & Follow‑Up

**Trigger:**

- Opportunity moves to stage `Proposal Sent` in `Corporate Training`.

**Actions:**

1. If `kc_decision_role = influencer` and tag `KC-Needs-Approval` is present:
   - Schedule a follow‑up task 3–5 working days later for the sales advisor.
   - Optional WhatsApp nudge to the contact:

     > "Just checking in – were you able to review the training proposal with your approvers, or do you need any additional justification details (learning outcomes, ROI, etc.)?"

2. If `kc_decision_role = decision_maker`:
   - Shorter follow‑up window (1–2 working days).

---

## 7. Data Flow from AI / WhatsApp to GoHighLevel

When the AI decides to escalate or when a conversation is ready for sales, send a JSON payload (via webhook or middleware) that sets:

```jsonc
{
  "lead_type": "individual",
  "deal_size": "medium",
  "urgency": "this_quarter",
  "decision_role": "influencer",
  "preferred_hub": "local",
  "category_interest": "Project, Programme and Portfolio Management (PPM)",
  "recommended_course_ids": ["PM-001-..."],
  "channel": "whatsapp",
  "summary": "HRBP in Johannesburg looking for PPM course for 5 team members in Q2. Needs quotation for approval.",
  "tags": ["KC-AI-Lead", "KC-WhatsApp", "KC-Quote-Requested", "KC-In-House-Interest"]
}
```

Middleware should:

- Map fields and tags into GoHighLevel contact and opportunity.
- Trigger the workflows above via tags or custom field updates.

This gives you a repeatable, sales-focused automation layer fully aligned with the AI Assistant framework.
