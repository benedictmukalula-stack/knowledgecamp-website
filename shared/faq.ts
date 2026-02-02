export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags?: string[];
  /** Optional short answer suitable for SMS / WhatsApp */
  shortAnswer?: string;
  /** Optional deep-link to the most relevant page on the site */
  url?: string;
}

export const FAQ_KNOWLEDGE_BASE: FaqItem[] = [
  // General & About
  {
    id: "general-what-is-knowledge-camp",
    category: "General",
    question: "What is Knowledge Camp Global?",
    answer:
      "Knowledge Camp Global is a specialist training provider offering instructor-led public, in-house and online programmes across 30+ professional categories, including leadership, accounting and finance, project management, IT, HR, GRC, HSSE, procurement and more.",
    shortAnswer:
      "Knowledge Camp Global is a specialist training provider offering public, in‑house and online programmes across 30+ professional categories.",
    url: "/about",
    tags: ["about", "provider", "overview"],
  },
  {
    id: "general-which-countries",
    category: "General",
    question: "Which countries and regions do you serve?",
    answer:
      "We deliver training across South Africa, wider Africa and internationally. Many courses run in our South African hubs (Cape Town, Johannesburg, Pretoria, Durban), selected African hubs (Lagos, Nairobi, Accra, Cairo, Johannesburg) and key international hubs (London, Dubai, Singapore, New York, Sydney), with online and hybrid options for global participants.",
    shortAnswer:
      "We train in South Africa, wider Africa and key global hubs, with online and hybrid options for international participants.",
    url: "/venues",
    tags: ["locations", "regions", "hubs"],
  },
  {
    id: "general-categories",
    category: "General",
    question: "Which training categories do you cover?",
    answer:
      "We cover 37 categories including Accounting and Finance, Administration and Office Management, AI and Automation, Auditing, Banking and Financial Services, Business Continuity and Crisis Management, Communication and Business Writing, Construction Management, Contracts and Commercial Management, Corporate Governance, Risk and Compliance (GRC), Customer Service and Experience Management, Data Management and BI, Digital Transformation and Innovation, Energy and Utilities, FinTech, Government and Public Sector, HSSE / HSE, HR and Training & Development, Interpersonal Skills and Personal Development, IT Management, Cloud and Cybersecurity, Leadership and Executive Management, Legal and Regulatory Affairs, Maintenance and Asset Management, Marketing and Sales, Maritime, Oil and Gas, Planning and Strategy Execution, Procurement and Supply Chain, Project and Portfolio Management (PPM), PR and Corporate Communications, Quality and Operational Excellence, Risk Management and Internal Controls, Security and Intelligence, Sustainability and ESG, Tourism and Hospitality, Transport and Logistics, and Entrepreneurship and SMEs.",
    shortAnswer:
      "We cover 37 training categories across finance, leadership, projects, IT, HR, GRC, HSSE, procurement, sustainability and more.",
    url: "/courses",
    tags: ["categories", "catalogue", "coverage"],
  },

  // Courses, calendar & certificates
  {
    id: "courses-find-course",
    category: "Courses & Calendar",
    question: "How do I find the right course for my needs?",
    answer:
      "Use the Courses page to filter by category, location, venue and dates, or browse the training calendar to see upcoming sessions. You can also contact us or use WhatsApp for a personalised recommendation based on role, experience level and objectives.",
    tags: ["courses", "search", "recommendation"],
  },
  {
    id: "courses-calendar",
    category: "Courses & Calendar",
    question: "Where can I see the full 2026 training calendar?",
    answer:
      "The Calendar page shows upcoming sessions across all hubs, including South Africa, Africa and international venues, as well as online and hybrid options. You can filter by category, venue, month and delivery mode.",
    tags: ["calendar", "dates", "schedule", "2026"],
  },
  {
    id: "courses-certificates",
    category: "Courses & Calendar",
    question: "Do I receive a certificate after completing a course?",
    answer:
      "Yes. All participants who successfully complete a course receive a Knowledge Camp Global certificate of completion. For certain programmes, we also align content with professional bodies or CPD requirements, which will be clearly indicated in the course information.",
    tags: ["certificate", "cpd", "completion"],
  },
  {
    id: "courses-materials",
    category: "Courses & Calendar",
    question: "What learning materials and resources are provided?",
    answer:
      "Participants receive professionally designed course materials (digital or printed), templates and tools relevant to the programme. For some technical or IT courses, lab environments or sample datasets may be provided. Post-course, we may share additional resources or updates where relevant.",
    tags: ["materials", "resources", "handouts"],
  },

  // Registration & payments
  {
    id: "registration-how-to-register",
    category: "Registration & Payments",
    question: "How do I register for a course?",
    answer:
      "Choose your course and preferred date on the Courses or Calendar page, then complete the registration form. You can register as an individual delegate or on behalf of a team. Once submitted, you will receive confirmation, an invoice or payment link, and joining instructions.",
    tags: ["registration", "enrol", "signup"],
  },
  {
    id: "registration-payment-methods",
    category: "Registration & Payments",
    question: "Which payment methods do you accept?",
    answer:
      "We support secure online card payments via Stripe, EFT / bank transfer against invoice, and corporate purchase orders where agreed. In some regions we also support instant EFT or pay-by-bank through local partners. Details appear on the checkout and invoice-issued pages.",
    tags: ["payments", "card", "eft", "invoice"],
  },
  {
    id: "registration-invoice-eft",
    category: "Registration & Payments",
    question: "Can I pay by invoice and EFT instead of card?",
    answer:
      "Yes. You can select an invoice / EFT option during registration. We will issue a tax invoice with our banking details and a unique payment reference. Once payment is received or proof of payment is reviewed and approved, your booking will be fully confirmed.",
    tags: ["invoice", "eft", "bank", "reference"],
  },
  {
    id: "registration-pop",
    category: "Registration & Payments",
    question: "How do I upload proof of payment (POP)?",
    answer:
      "If you pay via EFT, you can upload a PDF or image proof of payment through the invoice-issued page or a secure upload link sent in your confirmation email. Our finance team will verify the payment, update the registration status, and send a confirmation.",
    tags: ["proof of payment", "pop", "finance"],
  },
  {
    id: "registration-group-discounts",
    category: "Registration & Payments",
    question: "Do you offer group or corporate discounts?",
    answer:
      "Yes. For most public programmes, groups of 3–4 delegates receive a 10% discount, 5–9 delegates receive 15%, and 10+ delegates receive 25%. For larger cohorts or enterprise rollouts we can structure custom pricing and in-house delivery.",
    tags: ["group discount", "pricing", "teams"],
  },

  // In-house & enterprise
  {
    id: "inhouse-customised",
    category: "In‑House & Enterprise",
    question: "Do you offer in‑house or customised training for organisations?",
    answer:
      "Yes. Any public course can be delivered in‑house, and we can also design fully customised programmes based on your competencies, frameworks and case studies. Use the In‑House & Custom Training page or contact us to discuss your requirements.",
    tags: ["in-house", "enterprise", "custom"],
  },
  {
    id: "inhouse-pricing",
    category: "In‑House & Enterprise",
    question: "How is in‑house training priced?",
    answer:
      "In‑house programmes are typically priced per day for a group of delegates, with discounts compared to sending individuals to public courses. Pricing depends on duration, level, number of delegates, and whether delivery is on-site, online or hybrid.",
    tags: ["in-house pricing", "quote", "enterprise"],
  },
  {
    id: "inhouse-where",
    category: "In‑House & Enterprise",
    question: "Can you deliver training at our offices or in other countries?",
    answer:
      "Yes. We routinely deliver in‑house programmes at client offices across South Africa, wider Africa and internationally, or at neutral venues and hotels. Online and hybrid delivery are also available for distributed teams.",
    tags: ["on-site", "international", "remote"],
  },

  // LMS, online & hybrid
  {
    id: "lms-online",
    category: "LMS, Online & Hybrid",
    question: "Do you offer online or hybrid delivery options?",
    answer:
      "Yes. Many courses are available as fully online live classes or hybrid programmes blending classroom and virtual participation. The Online & Hybrid page highlights formats and technology requirements for learners.",
    tags: ["online", "virtual", "hybrid"],
  },
  {
    id: "lms-waitlist",
    category: "LMS, Online & Hybrid",
    question: "What is the LMS waitlist and how do I join?",
    answer:
      "Our LMS waitlist allows you to register interest in our upcoming self-paced and blended learning portal. Submit your details on the LMS page; we will notify you when new digital programmes and cohorts open.",
    tags: ["lms", "waitlist", "digital"],
  },

  // Partnerships & sponsorship
  {
    id: "partner-training",
    category: "Partnerships & Sponsorship",
    question: "Can I become a training or distribution partner?",
    answer:
      "Yes. Our partnership programme allows training companies, consultants and institutions to offer Knowledge Camp Global courses to their clients. Visit the Partnerships page to apply as a training, academic or technology partner.",
    tags: ["partner", "reseller", "distribution"],
  },
  {
    id: "sponsor",
    category: "Partnerships & Sponsorship",
    question: "Do you offer sponsorship or co‑branding opportunities?",
    answer:
      "We work with corporate sponsors on selected events, learning series and sector initiatives. The Sponsors page outlines current opportunities and allows you to register interest as a sponsor.",
    tags: ["sponsor", "branding", "events"],
  },

  // Logistics & venues
  {
    id: "logistics-venues",
    category: "Logistics & Venues",
    question: "Where are your main training venues located?",
    answer:
      "Our core venues are in Cape Town, Johannesburg, Pretoria and Durban, with additional hubs in Lagos, Nairobi, Accra, Cairo, London, Dubai, Singapore, New York and Sydney. The Venues page shows current venues, hotels and cities per course.",
    tags: ["venues", "cities", "hubs"],
  },
  {
    id: "logistics-hours",
    category: "Logistics & Venues",
    question: "What are typical daily training hours?",
    answer:
      "Most classroom programmes run from 08:30 to 16:30 local time, with tea/coffee breaks and a lunch break. Exact times and joining instructions are confirmed in your pre-course email.",
    tags: ["schedule", "hours", "class times"],
  },

  // Legal, terms & privacy
  {
    id: "legal-terms",
    category: "Legal & Data Privacy",
    question: "Where can I read your Terms and Conditions?",
    answer:
      "Our full Terms and Conditions, including booking, cancellations, substitutions, changes to programmes and use of training materials, are available on the Terms page. You will also be asked to confirm acceptance during registration.",
    tags: ["terms", "conditions", "booking"],
  },
  {
    id: "legal-privacy",
    category: "Legal & Data Privacy",
    question: "How do you handle my personal data?",
    answer:
      "We follow data protection principles aligned with POPIA and other applicable regulations. Our Privacy Policy explains what data we collect, how we use it, how long we keep it, and your rights regarding access, correction and marketing preferences.",
    tags: ["privacy", "popia", "gdpr"],
  },
];
