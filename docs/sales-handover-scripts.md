# Knowledge Camp – Human Sales Handover Scripts

These scripts help human advisors pick up from **AI / WhatsApp / Web Chat** conversations without repetition, stay consultative, and move efficiently towards registration or proposal.

Assumptions:

- AI provides a **handover summary** (see `ai-assistant-framework.md`).
- GoHighLevel or your backend stores key fields: lead_type, deal_size, urgency, decision_role, preferred_hub, category_interest, recommended_course_ids, and an AI summary.

Use and adapt the scripts to your tone; they are written in a professional but warm style.

---

## 1. First Human Touch – WhatsApp or Email

### 1.1 Individual Public Course (Medium / High Urgency)

**Trigger:** lead_type = individual, urgency ∈ {immediate, this_quarter}.

**WhatsApp / SMS:**

> "Hi [First Name], this is [Your Name] from Knowledge Camp. I’m picking up from our assistant who mentioned you’re interested in **[Course Name]** in **[City/Online]** around **[Date/Month]**.
>
> Before we lock this in, is [that date / format] still your preferred option, or do you need alternative dates?"

**If they confirm date:**

> "Great. You can complete your registration and payment securely here: **[Short Link]**.
>
> If you’d like, I can stay on this chat while you complete the form and help with anything that’s unclear (fees, travel, approvals, etc.)."

**If they need other dates:**

> "No problem. For **[Course Name]**, our next available dates in **[City/Online]** are: **[Option 1]**, **[Option 2]**, and **[Option 3]**.
>
> Which of these works best for you?"

---

### 1.2 Corporate / Group Enquiry (Decision Maker)

**Trigger:** lead_type = corporate, decision_role = decision_maker.

**Email or WhatsApp:**

> "Hi [First Name],
>
> Thank you for reaching out about **[Course/Category]** for your team. From your chat with our assistant, I understand:
>
> - Approx. **[X] delegates** in **[Location(s)]**
> - Preferred timing: **[Month/Quarter]**
> - Format: **[Onsite / Virtual / Blended]**
>
> I’d like to share 1–2 focused options that will give you the best impact for your team. Are there any specific outcomes you want to see after this training (e.g. better project delivery, stronger leadership pipeline, improved Excel reporting)?"

**Follow-up to confirm a proposal:**

> "Based on what you’ve shared, I recommend **[Course/Programme Name]** with a **[X]-day** delivery and **[key tailoring points]**.
>
> I can send you a formal proposal and costing today. Would you prefer a **single location** or can we consider a **regional hub (Johannesburg / Nairobi / Dubai)** to bring your team together?"

---

### 1.3 Corporate / Group Enquiry (Influencer / Needs Approval)

**Trigger:** lead_type = corporate, decision_role = influencer.

**Email / WhatsApp:**

> "Hi [First Name],
>
> Thanks for sharing details about your team’s training needs. I see from your conversation with our assistant that you’re exploring **[Course/Category]** for **[X] delegates** in **[Location(s)]**.
>
> To help you get internal approval faster, I’ll include a short **business case** in the proposal (benefits, risks of not training, and expected impact). Are there any specific stakeholders (HR, Finance, a particular director) whose concerns I should address directly?"

**After sending proposal:**

> "I’ve just emailed you the proposal and a one-page justification you can share with your approvers.
>
> When are you planning to present or discuss this internally? I can time my follow-up to support you before that meeting rather than after."

---

## 2. Registration Push – When Learner is Almost Ready

### 2.1 Nudge for Individual Registration (Didn’t Complete Form)

**Trigger:** AI / system shows link clicked but no completed registration within 24–48 hours.

**WhatsApp / Email:**

> "Hi [First Name],
>
> Just checking in — I saw you started looking at **[Course Name]** for **[Date]** but haven’t completed the registration yet.
>
> Is there anything holding you back (dates, fees, approvals, travel), or would you like me to hold a provisional seat and talk through options?"

If they mention approvals:

> "Understood. If it helps, I can email you a **formal quotation** and brief summary of outcomes you can share with your manager. Would that make it easier to get sign‑off?"

---

### 2.2 Nudge for Corporate Proposal (Awaiting Approval)

**Trigger:** Opportunity in stage `Awaiting Approval` or tag `KC-Needs-Approval`.

**Email / WhatsApp:**

> "Hi [First Name],
>
> How are things going with internal approval for the **[Course/Programme]** we proposed for your team?
>
> If any of your stakeholders (HR, Finance, or your director) have specific concerns or questions, I’m happy to either **join a short call** or prepare a **tailored slide or note** you can drop into your internal pack."

---

## 3. Handling Objections

### 3.1 Price / Budget Objection

> "I appreciate you being open about the budget constraints.
>
> Two things we can explore:
>
> 1) Adjusting **format or group size** to stay within budget while maintaining impact.
> 2) Prioritising the **most critical modules** now and planning a **Phase 2** later.
>
> If we focused on the top 1–2 outcomes you need this year, which would they be? That way I can propose a version that still moves the needle without wasting budget."

### 3.2 Timing / Capacity Objection

> "That makes sense — teams are stretched.
>
> We can often **spread the training out** (e.g., shorter virtual sessions across a few weeks) to reduce disruption, or we can time it against quieter periods.
>
> Are there particular weeks or months that are usually lighter for your team, so we can plan around that?"

---

## 4. Final Close – Converting to Registration

### 4.1 Individual – Ready to Proceed

> "Perfect. To confirm your seat on **[Course Name]** on **[Date]**, please use this secure link: **[Short Link]**.
>
> Once you’ve completed the form and chosen your payment method, you’ll receive a confirmation email. Would you like me to stay available on WhatsApp while you complete it in case anything is unclear?"

If payment method = Invoice/EFT:

> "Once the form is submitted and you select **Invoice/EFT**, our system will send your invoice with all banking details.
>
> You can reply to this message with your **proof of payment**, and we’ll confirm your booking immediately once it’s allocated."

---

### 4.2 Corporate – Confirming Programme

> "If the proposal looks good, the next step is to **confirm your preferred dates and delegate numbers** so we can lock in facilitators and venues.
>
> Are you comfortable for us to proceed with **[Dates]** for approximately **[X] delegates**, or would you like to pencil in a provisional range while you finalise internal approvals?"

Once they confirm:

> "Great, I’ll reserve **[Dates]** for your team and update the proposal with any final details (delegate split, locations, virtual vs onsite). I’ll also include the registration process (how delegates will register, invoicing, and payment timelines) so everything is clear for you and your finance team."

---

## 5. Internal Use – Reading the AI Summary

When you open a lead, first scan:

- **AI Summary**: 2–3 lines of context.
- **Lead type & deal size**: individual vs corporate, low/medium/high.
- **Urgency**: immediate / this_quarter / later.
- **Decision role**: decision_maker vs influencer.

Then choose a script matching:

- Individual vs corporate.
- Channel (WhatsApp vs email).
- Stage (new enquiry, proposal sent, awaiting approval, ready to register).

The goal is:

- **Acknowledge** prior AI conversation.
- **Add human judgement and reassurance.**
- **Move the learner 1 clear step forward** (clarify need, present option, push to registration or proposal) in each interaction.

---

## 6. GoHighLevel Template & Field Mapping

Use these as the canonical templates inside GoHighLevel. Suggested naming:

- `KC – [Channel] – [Stage] – [Segment]`
  - Channel: `WA` (WhatsApp/SMS) or `EM` (Email)
  - Stage: `First Touch`, `Nudge`, `Objection`, `Close`
  - Segment: `Indiv`, `Corp-DM`, `Corp-Influencer`

### 6.1 Template Catalogue

- **KC – WA – First Touch – Indiv**
  - Channel: WhatsApp / SMS
  - Trigger: `lead_type = individual` AND `urgency ∈ {immediate, this_quarter}`
  - Key fields: `first_name`, `course_name`, `city_or_online`, `preferred_date_or_month`, `registration_link`
  - Script source: section **1.1 Individual Public Course (Medium / High Urgency)**

- **KC – EM – First Touch – Corp-DM**
  - Channel: Email (optionally WhatsApp variant)
  - Trigger: `lead_type = corporate` AND `decision_role = decision_maker`
  - Key fields: `first_name`, `course_or_category`, `delegates_count`, `locations`, `preferred_month_or_quarter`, `format`
  - Script source: section **1.2 Corporate / Group Enquiry (Decision Maker)**

- **KC – EM – First Touch – Corp-Influencer**
  - Channel: Email (optionally WhatsApp variant)
  - Trigger: `lead_type = corporate` AND `decision_role = influencer`
  - Key fields: `first_name`, `course_or_category`, `delegates_count`, `locations`
  - Script source: section **1.3 Corporate / Group Enquiry (Influencer / Needs Approval)**

- **KC – WA – Nudge – Indiv Registration**
  - Channel: WhatsApp / Email
  - Trigger: last `registration_link_click` within past 72h AND `registration_status != completed`
  - Key fields: `first_name`, `course_name`, `date`, `registration_link`
  - Script source: section **2.1 Nudge for Individual Registration (Didn’t Complete Form)**

- **KC – EM – Nudge – Corp Approval**
  - Channel: Email / WhatsApp
  - Trigger: pipeline stage `Awaiting Approval` OR tag `KC-Needs-Approval`
  - Key fields: `first_name`, `course_or_programme_name`
  - Script source: section **2.2 Nudge for Corporate Proposal (Awaiting Approval)**

- **KC – WA – Objection – Price**
  - Channel: WhatsApp / Email
  - Trigger: manual macro or tag `KC-Obj-Price`
  - Key fields: `first_name`, `course_or_programme_name`, `deal_size`, `lead_type`
  - Script source: section **3.1 Price / Budget Objection**

- **KC – WA – Objection – Timing**
  - Channel: WhatsApp / Email
  - Trigger: manual macro or tag `KC-Obj-Timing`
  - Key fields: `first_name`, `course_or_programme_name`
  - Script source: section **3.2 Timing / Capacity Objection**

- **KC – WA – Close – Indiv**
  - Channel: WhatsApp / Email
  - Trigger: pipeline stage `Ready to Register – Individual` OR tag `KC-Ready-Individual`
  - Key fields: `first_name`, `course_name`, `date`, `registration_link`, `payment_method`
  - Script source: section **4.1 Individual – Ready to Proceed**

- **KC – EM – Close – Corp**
  - Channel: Email / WhatsApp
  - Trigger: pipeline stage `Proposal Accepted` OR tag `KC-Ready-Corporate`
  - Key fields: `first_name`, `course_or_programme_name`, `dates`, `delegates_count`
  - Script source: section **4.2 Corporate – Confirming Programme**

### 6.2 Core Fields to Maintain

Ensure these fields are always captured or inferred before handover so templates fill correctly:

- `first_name`
- `lead_type` (individual / corporate)
- `deal_size` (low / medium / high)
- `urgency` (immediate / this_quarter / later)
- `decision_role` (decision_maker / influencer)
- `preferred_hub` and/or `city_or_online`
- `category_interest` and `course_or_programme_name`
- `recommended_course_ids` (for deep links into the LMS / catalog)
- `registration_link` (for public courses)
- `AI_summary` (short 2–3 line context, as per ai-assistant-framework.md)

Sales ops can then map these templates and triggers into GoHighLevel so that, when a rep opens a lead, the correct script is suggested automatically rather than searched for manually.

### 6.3 GoHighLevel Workflow Checklist

When implementing this in GoHighLevel, use this checklist:

1. **Custom fields & tags**

- Create / confirm custom fields: `lead_type`, `deal_size`, `urgency`, `decision_role`, `preferred_hub`, `category_interest`, `recommended_course_ids`, `registration_link`, `AI_summary`.
- Create tags: `KC-FirstTouch-Indiv`, `KC-FirstTouch-Corp-DM`, `KC-FirstTouch-Corp-Influencer`, `KC-Nudge-Indiv`, `KC-Needs-Approval`, `KC-Obj-Price`, `KC-Obj-Timing`, `KC-Ready-Individual`, `KC-Ready-Corporate`.

1. **Templates**

- Create message templates for each item listed in **6.1 Template Catalogue** using the exact names and scripts.
- Include both WhatsApp/SMS and Email versions where relevant.

1. **Workflows**

- First Touch – Individual: trigger on `lead_type = individual` and `urgency ∈ {immediate, this_quarter}`; suggest `KC – WA – First Touch – Indiv`.
- First Touch – Corporate DM: trigger on `lead_type = corporate` and `decision_role = decision_maker`; suggest `KC – EM – First Touch – Corp-DM`.
- First Touch – Corporate Influencer: trigger on `lead_type = corporate` and `decision_role = influencer`; suggest `KC – EM – First Touch – Corp-Influencer`.
- Nudge – Individual Registration: trigger on `registration_link` click with no completed registration after 48–72 hours; suggest `KC – WA – Nudge – Indiv Registration`.
- Nudge – Corporate Approval: trigger when stage = `Awaiting Approval` or tag `KC-Needs-Approval` is present for 3–7 days; suggest `KC – EM – Nudge – Corp Approval`.
- Objection – Price: trigger when tag `KC-Obj-Price` is added manually; suggest `KC – WA – Objection – Price`.
- Objection – Timing: trigger when tag `KC-Obj-Timing` is added manually; suggest `KC – WA – Objection – Timing`.
- Close – Individual: trigger when stage = `Ready to Register – Individual` or tag `KC-Ready-Individual`; suggest `KC – WA – Close – Indiv`.
- Close – Corporate: trigger when stage = `Proposal Accepted` or tag `KC-Ready-Corporate`; suggest `KC – EM – Close – Corp`.

1. **Rep experience**

- In your playbook or training, instruct reps to:
  - Read the `AI_summary` first.
  - Check `lead_type`, `urgency`, and `decision_role`.
  - Use the pre-suggested template, then tweak wording to sound natural, not robotic.

This keeps the tech setup, scripts, and human behaviour aligned so every handover feels consistent but still personal.
