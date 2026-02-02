# Knowledge Camp – WhatsApp Registration & Payment Flow

This document defines a **conversational flow for WhatsApp** that works with the AI Assistant, your existing registration and payment stack (Next.js app + Stripe + invoice/EFT), and GoHighLevel.

The goal: make it possible for a learner to **discover a course, confirm details, and complete registration/payment** starting in WhatsApp, while still using your web registration form and invoicing where appropriate.

---

## 1. High-Level States

Design the WhatsApp AI/automation as a simple state machine:

1. `greeting` – Welcome and intent clarification.
2. `course_discovery` – Understand which course/topic and for whom.
3. `options_and_dates` – Propose suitable courses and dates / venues.
4. `registration_details` – Capture or confirm key registration details.
5. `payment_options` – Offer card vs invoice/EFT (where applicable).
6. `handover` – Escalate to human for complex group or corporate deals.
7. `confirmation` – Confirm next steps and send links.

The AI can implement these states internally; humans and GoHighLevel only need to see the **final summary** and any links sent.

---

## 2. Greeting & Intent Discovery (State: `greeting`)

Example opening:

> "Welcome to Knowledge Camp on WhatsApp. I can help you find a course, check dates and fees, and guide you through registration. What would you like to achieve today?"

Key intents to detect:

- `browse_courses` – "What courses do you have on project management?"
- `course_details` – "Tell me more about the Advanced Excel course."
- `registration_payment` – "I want to register / pay for this course."
- `corporate_inhouse` – "Can you run this course for my team?"

Use the catalog + FAQ knowledge base to answer questions. When user is clearly asking to enroll or book, move to `course_discovery`.

---

## 3. Course Discovery (State: `course_discovery`)

For individual learners:

> "Great. Are you looking for a **public course** for yourself, or are you enquiring **on behalf of a team or company**?"

- If individual → ask:
  - Preferred topic or course name.
  - Preferred city or if online is fine.
  - Rough timing (this month, next month, specific dates).

- If corporate/team → mark `lead_type = corporate` and capture:
  - Number of delegates.
  - Countries/cities.
  - Preferred in‑house vs public schedule.

Use your course catalog (via existing APIs or static mapping) to:

- Suggest top 1–3 matching courses.
- For each, show **title, brief outcome, duration, venues and next dates**.

Example message:

> "Based on what you shared, I recommend:
>
> 1) Project Management Foundations – 5 days – Johannesburg / Online – Next start dates: 10–14 March, 7–11 April.
> 2) Advanced Project Management – 5 days – Online – Next start dates: 21–25 April, 19–23 May.
>
> Which option looks best for you?"

When the learner chooses a specific course and date window, move to `registration_details`.

---

## 4. Registration Details (State: `registration_details`)

Target: capture the **minimum fields** needed to either:

- Send them a **smart registration link** pre-filled, or
- Hand over to a human with a complete summary.

For an individual:

- Full name
- Email address
- Mobile number (already known from WhatsApp)
- Company name (optional)
- Selected course & date/venue

Suggested flow:

> "Perfect. To get you registered on **[Course Name]** in **[City/Online]** on **[Date]**, I'll need a few details.
>
> 1) Your full name as it should appear on your certificate?
> 2) Your email address for the confirmation and invoice/receipt?
> 3) Your company name (or write PERSONAL if you're registering privately)."

Once captured, the AI has two options:

1. **Link to web registration form** (preferred for self-service):
   - Build a URL like:
   - `https://yourdomain.com/register?courseId=<ID>&dateId=<SESSION_ID>&channel=whatsapp`
   - Include name/email in query or pass to Next.js API to create a draft registration.

2. **Call backend API** (if implemented) to create a draft registration and then send a confirmation link.

Example handoff message:

> "Thanks, [First Name]. I’ve created a draft registration for you. Please click this secure link to confirm your details and complete payment: [registration link].
>
> If you have any trouble with the form or payment, reply here and a training advisor will assist you."

---

## 5. Payment Options (State: `payment_options`)

Once the learner is committed to registering, ask about payment preference:

> "How would you like to pay?
>
> - **Card / Pay online** (fastest)
> - **Invoice / EFT** (for companies or if you prefer a bank transfer)"

### Card / Pay online

- Direct them to the registration page which triggers Stripe Checkout once submitted (already implemented in your Next.js flow).
- AI message:

  > "Click here to complete payment by card or instant EFT: [payment link]. Once paid, you’ll receive an immediate confirmation email."

### Invoice / EFT

- Either:
  - Provide a registration link where they can select "Invoice / EFT" as payment method, OR
  - Ask for billing details (company/legal name, VAT number, billing email) and pass them to your backend for invoice generation (via existing invoice API/Xero integration).

- AI message:

  > "I've noted that you prefer **Invoice / EFT**. Once you complete this registration form and select Invoice/EFT, our system will email you an official invoice with our banking details. Please send us proof of payment by replying to this WhatsApp or email."

---

## 6. Corporate & Group Registration via WhatsApp (State: `handover`)

For multi-delegate or in‑house enquiries:

1. Capture:
   - Number of delegates (approximate).
   - Countries/cities.
   - Preferred time window.
   - Onsite vs virtual.

2. Provide a **structured summary** back to the user and ask for confirmation:

   > "So to confirm: You’re looking for [Course/Category] for about [X] delegates in [City/Country], preferably [onsite/virtual] around [dates]. Is that correct?"

3. Once confirmed, **escalate**:
   - Send an internal handover payload (see `ai-assistant-framework.md`) to your CRM / GoHighLevel / backend.
   - Tag the contact as `KC-In-House-Interest` and `KC-High-Value` if appropriate.

4. Close the loop with the user:

   > "Thanks, this looks like a great fit for a tailored in‑house solution. I’ve shared your request with a senior training advisor. They’ll review options and send you a proposal and schedule within **1 business day**."

---

## 7. Confirmation & Post-Registration Follow-Up (State: `confirmation`)

After the learner completes the web registration or confirms invoice details, send a short WhatsApp confirmation (this can be triggered by your webhook or manually):

> "We’ve received your registration for **[Course Name]** on **[Date]**. A confirmation email has been sent to **[Email]**. If you need travel or accommodation support, reply here and we’ll assist."

For corporate deals, once a proposal is sent:

> "We’ve emailed your tailored training proposal for **[Course/Category]**. If you need any changes (dates, location, or tailoring), reply here and your training advisor will adjust it."

---

## 8. Data & Handover to Sales

At any point, when the AI judges that the conversation is valuable or complex, it should send a **handover payload** including:

- lead_type (individual/corporate)
- deal_size (low/medium/high)
- urgency
- decision_role
- preferred_hub
- category_interest
- recommended_course_ids
- summary (plain text)

This payload is then:

- Stored in your own backend (e.g. via `/api/assist/lead`) and/or
- Mapped into GoHighLevel via custom fields and tags, triggering the workflows described in `gohighlevel-workflows.md`.

This design keeps WhatsApp conversations **fast and learner-friendly** while using your existing registration and payment infrastructure for the heavy lifting.
