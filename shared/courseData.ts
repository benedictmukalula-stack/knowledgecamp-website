export type CourseLocation = "local" | "africa" | "international";
export type CourseCategory =
  | "Accounting and Finance"
  | "Administration and Office Management"
  | "Artificial Intelligence (AI) and Automation"
  | "Auditing and Assurance"
  | "Banking, Insurance and Financial Services"
  | "Business Continuity and Crisis Management"
  | "Communication and Business Writing Skills"
  | "Construction Management"
  | "Contracts and Commercial Management"
  | "Corporate Governance, Risk and Compliance (GRC)"
  | "Customer Service and Experience Management"
  | "Data Management, Analytics and Business Intelligence"
  | "Digital Transformation and Innovation"
  | "Energy, Power and Utilities Management"
  | "Financial Technology (FinTech)"
  | "Government and Public Sector Management"
  | "Health, Safety, Security and Environment (HSSE / HSE)"
  | "Human Resources and Training & Development"
  | "Interpersonal Skills and Personal Development"
  | "IT Management, Cloud Computing and Cybersecurity"
  | "Leadership, Strategy and Executive Management"
  | "Legal, Compliance and Regulatory Affairs"
  | "Maintenance, Engineering and Asset Management"
  | "Marketing, Sales and Brand Management"
  | "Maritime, Ports and Logistics Management"
  | "Oil, Gas and Petroleum Management"
  | "Planning, Monitoring and Strategy Execution"
  | "Procurement and Supply Chain Management"
  | "Project, Programme and Portfolio Management (PPM)"
  | "Public Relations, Media and Corporate Communications"
  | "Quality Management, Productivity and Operational Excellence"
  | "Risk Management and Internal Controls"
  | "Security Management and Intelligence Studies"
  | "Sustainability, ESG and Climate Risk Management"
  | "Tourism, Hospitality and Events Management"
  | "Transport, Aviation and Logistics"
  | "Entrepreneurship, SMEs and Business Development";

export interface CoursePricing {
  basePrice: number; // Price per day
  laptopIncluded: boolean;
  laptopPrice: number;
  discounts: {
    three: number; // % discount for 3+ delegates
    five: number; // % discount for 5+ delegates
    ten: number; // % discount for 10+ delegates
  };
  inHouseDiscount: number; // % discount for in-house training
}

export interface CourseSchedule {
  id: string;
  title: string;
  category: CourseCategory;
  /** Primary, canonical category used for all search, navigation and filtering */
  primaryCategory: CourseCategory;
  description: string;
  fullDescription: string;
  duration: number; // in days
  instructor: string;
  instructorBio: string;
  location: CourseLocation;
  venue: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  maxParticipants: number;
  currentEnrolled: number;
  rating: number;
  reviews: number;
  learningOutcomes: string[];
  curriculum: { module: string; topics: string[] }[];
  pricing: CoursePricing;
  brochureUrl: string;
}

// Default learning outcomes and curriculum templates by category
// These ensure that every course has a domain-appropriate outline with
// bullet points and expanded subtopics, applied consistently across variants.

function getDefaultLearningOutcomes(
  category: CourseCategory,
  title: string
): string[] {
  switch (category) {
    case "Accounting and Finance":
      return [
        "Interpret and prepare primary financial statements aligned with IFRS basics",
        "Apply core accounting policies to common transactions and adjustments",
        "Analyse profitability, liquidity and solvency using key financial ratios",
        "Develop budgets and forecasts to support better financial decisions",
        "Communicate financial insights clearly to non-financial stakeholders",
      ];
    case "Administration and Office Management":
      return [
        "Plan and coordinate day-to-day office operations with confidence",
        "Implement practical systems for document, diary and meeting management",
        "Improve communication and stakeholder service across the office",
        "Support managers and teams with proactive, solutions-focused assistance",
        "Apply productivity tools and checklists to streamline administration",
      ];
    case "Artificial Intelligence (AI) and Automation":
      return [
        "Explain core AI, machine learning and automation concepts in plain language",
        "Identify high-impact business use cases for AI and automation",
        "Understand the lifecycle of an ML project from data to deployment",
        "Work more effectively with technical teams on AI initiatives",
        "Recognise key risks, ethics and governance considerations for AI",
      ];
    case "Auditing and Assurance":
      return [
        "Plan and execute risk-based internal audit engagements",
        "Apply appropriate audit techniques during fieldwork and testing",
        "Evaluate internal controls and identify significant control gaps",
        "Draft clear, action-oriented audit observations and reports",
        "Enhance stakeholder confidence in the assurance function",
      ];
    case "Banking, Insurance and Financial Services":
      return [
        "Understand core banking products, processes and risk drivers",
        "Navigate key regulatory and compliance requirements in financial services",
        "Improve the quality and consistency of front- and back-office processes",
        "Enhance customer experience while managing risk and profitability",
        "Collaborate more effectively across operations, risk and compliance functions",
      ];
    case "Business Continuity and Crisis Management":
      return [
        "Differentiate between incident, crisis and business continuity management",
        "Conduct basic business impact analyses for critical processes",
        "Develop and structure practical business continuity and recovery plans",
        "Coordinate crisis response roles, communication and decision-making",
        "Strengthen organisational resilience and readiness for disruption",
      ];
    case "Communication and Business Writing Skills":
      return [
        "Plan and structure clear, concise business documents and messages",
        "Apply a reader-focused style to reports, emails and proposals",
        "Use practical techniques to tighten and clarify written communication",
        "Adapt tone and structure for different audiences and channels",
        "Provide and respond to feedback in a professional, constructive way",
      ];
    case "Construction Management":
      return [
        "Plan and control construction projects across key phases and milestones",
        "Coordinate contractors, consultants and stakeholders on site",
        "Apply basic cost, schedule and quality management techniques",
        "Integrate HSE requirements into daily construction activities",
        "Escalate and resolve issues, claims and variations more effectively",
      ];
    case "Contracts and Commercial Management":
      return [
        "Interpret key clauses in commercial contracts and agreements",
        "Support contract drafting, review and negotiation with confidence",
        "Manage performance, variations and claims across the contract lifecycle",
        "Identify and mitigate commercial and contractual risks early",
        "Strengthen collaboration between legal, procurement and operations",
      ];
    case "Corporate Governance, Risk and Compliance (GRC)":
      return [
        "Explain core concepts of governance, risk management and compliance",
        "Map key risks, controls and responsibilities across the organisation",
        "Strengthen board and committee reporting and information flows",
        "Align policies, frameworks and assurance activities more effectively",
        "Support a stronger risk-aware and ethical culture",
      ];
    case "Customer Service and Experience Management":
      return [
        "Deliver consistent, professional service across customer touchpoints",
        "Handle complaints and difficult conversations with confidence",
        "Map and improve key moments in the customer journey",
        "Use feedback and metrics to drive service improvements",
        "Align front-line behaviours with brand and experience standards",
      ];
    case "Data Management, Analytics and Business Intelligence":
      return [
        "Explain the data lifecycle from creation to reporting",
        "Apply basic data quality, governance and stewardship principles",
        "Use analytics and dashboards to answer business questions",
        "Work more effectively with BI and analytics tools and teams",
        "Translate data findings into practical decisions and actions",
      ];
    case "Digital Transformation and Innovation":
      return [
        "Define what digital transformation means in a practical context",
        "Assess digital maturity and prioritise high-impact initiatives",
        "Structure and govern a pipeline of innovation and change",
        "Engage stakeholders and manage resistance to digital change",
        "Connect digital initiatives to measurable business outcomes",
      ];
    case "Energy, Power and Utilities Management":
      return [
        "Understand key components of power and utilities value chains",
        "Apply basic concepts of demand, capacity and network planning",
        "Recognise regulatory, tariff and stakeholder pressures in the sector",
        "Improve operations, asset utilisation and reliability performance",
        "Integrate safety, sustainability and customer considerations into decisions",
      ];
    case "Financial Technology (FinTech)":
      return [
        "Describe major FinTech trends, platforms and business models",
        "Understand core concepts in digital payments and open banking",
        "Assess opportunities and risks from FinTech partnerships and solutions",
        "Navigate regulatory and compliance themes in digital finance",
        "Collaborate more effectively between incumbents and FinTech innovators",
      ];
    case "Government and Public Sector Management":
      return [
        "Clarify roles and responsibilities within public institutions and programmes",
        "Improve planning, budgeting and performance management in the public sector",
        "Strengthen stakeholder engagement and accountability mechanisms",
        "Design and monitor programmes and services more effectively",
        "Support a culture of service, ethics and value for money",
      ];
    case "Health, Safety, Security and Environment (HSSE / HSE)":
      return [
        "Explain fundamental HSE and security principles and terminology",
        "Identify hazards, assess risks and propose appropriate controls",
        "Contribute to investigations, incident reporting and lessons learned",
        "Support safety culture through daily behaviours and leadership",
        "Align site-level practices with HSE management systems and standards",
      ];
    case "Human Resources and Training & Development":
      return [
        "Support the full employee lifecycle from attraction to exit",
        "Apply key concepts in performance, talent and succession management",
        "Align learning and development with organisational strategy",
        "Use HR metrics and analytics to inform people decisions",
        "Partner more effectively with line managers as an HR business partner",
      ];
    case "Interpersonal Skills and Personal Development":
      return [
        "Increase self-awareness and emotional intelligence at work",
        "Communicate with greater clarity, impact and empathy",
        "Manage time, priorities and energy more intentionally",
        "Handle conflict and difficult conversations constructively",
        "Build a personal development plan aligned to career goals",
      ];
    case "IT Management, Cloud Computing and Cybersecurity":
      return [
        "Explain core concepts in IT service management and governance",
        "Understand cloud models, migration considerations and operating models",
        "Identify common cyber threats, controls and response approaches",
        "Align IT initiatives with business priorities and risk appetite",
        "Engage business stakeholders in shared digital and security decisions",
      ];
    case "Leadership, Strategy and Executive Management":
      return [
        "Clarify leadership expectations at senior and executive levels",
        "Translate vision and strategy into actionable priorities",
        "Lead teams through change, uncertainty and performance pressures",
        "Strengthen decision-making, governance and stakeholder alignment",
        "Develop a practical leadership development agenda for self and team",
      ];
    case "Legal, Compliance and Regulatory Affairs":
      return [
        "Understand the role of legal and compliance functions in organisations",
        "Interpret and apply key regulatory requirements to business activities",
        "Support investigations, monitoring and reporting with confidence",
        "Design or enhance compliance frameworks, policies and procedures",
        "Engage regulators and internal stakeholders professionally and proactively",
      ];
    case "Maintenance, Engineering and Asset Management":
      return [
        "Apply core concepts of reliability, maintenance and asset management",
        "Select and schedule appropriate maintenance strategies and tasks",
        "Use basic metrics to monitor asset performance and lifecycle costs",
        "Support safe, efficient operations in engineering environments",
        "Contribute to continuous improvement in maintenance and asset care",
      ];
    case "Marketing, Sales and Brand Management":
      return [
        "Clarify target markets, value propositions and positioning",
        "Plan integrated marketing and sales campaigns across channels",
        "Apply practical tools for pipeline, key account and opportunity management",
        "Use data and feedback to refine campaigns and customer journeys",
        "Strengthen brand consistency across communication and service delivery",
      ];
    case "Maritime, Ports and Logistics Management":
      return [
        "Understand port, shipping and logistics value chains and roles",
        "Apply basic concepts of marine operations, safety and compliance",
        "Coordinate port, terminal and hinterland logistics activities",
        "Use key performance indicators to monitor port and logistics performance",
        "Engage stakeholders across authorities, operators and customers effectively",
      ];
    case "Oil, Gas and Petroleum Management":
      return [
        "Describe upstream, midstream and downstream segments and value drivers",
        "Understand project, operational and HSE considerations in the sector",
        "Interpret basic commercial and contractual terms in oil and gas",
        "Analyse key risks and mitigation strategies across the value chain",
        "Engage multidisciplinary teams and external partners more effectively",
      ];
    case "Planning, Monitoring and Strategy Execution":
      return [
        "Translate strategic objectives into measurable plans and initiatives",
        "Design KPIs and dashboards that support better performance discussions",
        "Coordinate planning, budgeting and review cycles across the organisation",
        "Identify and address execution risks and bottlenecks early",
        "Strengthen PMO or strategy office contribution to leadership decisions",
      ];
    case "Procurement and Supply Chain Management":
      return [
        "Apply core concepts of strategic sourcing and category management",
        "Run practical sourcing events, evaluations and supplier negotiations",
        "Manage contracts, supplier performance and supply risk",
        "Coordinate logistics, inventory and warehousing considerations",
        "Partner with internal stakeholders to deliver end-to-end value",
      ];
    case "Project, Programme and Portfolio Management (PPM)":
      return [
        "Define and plan projects using recognised methodologies",
        "Control scope, schedule, cost and risk across delivery",
        "Lead project teams and stakeholders through change",
        "Monitor and report progress to sponsors and governance forums",
        "Support programme and portfolio-level decision-making and prioritisation",
      ];
    case "Public Relations, Media and Corporate Communications":
      return [
        "Plan and deliver clear, strategic communication to key audiences",
        "Engage media and influencers in a professional, value-adding way",
        "Prepare for and manage communication during issues and crises",
        "Align messaging across channels, leaders and campaigns",
        "Measure and report on PR and communication outcomes",
      ];
    case "Quality Management, Productivity and Operational Excellence":
      return [
        "Apply fundamental quality and process improvement concepts",
        "Use simple Lean and continuous improvement tools in daily work",
        "Identify waste, variation and root causes of performance issues",
        "Structure improvement projects and track benefits realisation",
        "Support a culture of operational excellence and problem-solving",
      ];
    case "Risk Management and Internal Controls":
      return [
        "Explain the purpose and components of enterprise risk management",
        "Identify, assess and prioritise risks using practical tools",
        "Design and evaluate internal controls for key processes",
        "Integrate risk, controls and assurance in a coordinated way",
        "Enhance reporting and discussions on risk at management and board level",
      ];
    case "Security Management and Intelligence Studies":
      return [
        "Understand core concepts in physical, information and personnel security",
        "Conduct basic threat, vulnerability and risk assessments",
        "Plan proportionate security controls and response measures",
        "Use intelligence and information to support security decisions",
        "Engage stakeholders and report security issues professionally",
      ];
    case "Sustainability, ESG and Climate Risk Management":
      return [
        "Explain key ESG and sustainability concepts, standards and frameworks",
        "Identify material ESG and climate risks for the organisation",
        "Support data collection, reporting and disclosure on ESG matters",
        "Integrate sustainability into strategy, operations and investment decisions",
        "Engage internal and external stakeholders on ESG priorities and trade-offs",
      ];
    case "Tourism, Hospitality and Events Management":
      return [
        "Design and deliver compelling tourism, hospitality and event experiences",
        "Manage service operations, staffing and guest touchpoints effectively",
        "Coordinate suppliers, venues and logistics for successful events",
        "Apply basic revenue management and commercial principles",
        "Use feedback and reviews to improve experience and loyalty",
      ];
    case "Transport, Aviation and Logistics":
      return [
        "Understand core concepts across road, air and multimodal transport",
        "Plan and schedule capacity, routes and resources more effectively",
        "Manage safety, security and regulatory requirements in transport",
        "Coordinate logistics, warehousing and last-mile delivery activities",
        "Use performance data to improve reliability and customer service",
      ];
    case "Entrepreneurship, SMEs and Business Development":
      return [
        "Clarify and test business ideas, value propositions and customer segments",
        "Develop practical plans for revenue models, costs and cash flow",
        "Build basic sales, marketing and partnership capabilities",
        "Strengthen operational discipline and governance in growing SMEs",
        "Prepare a realistic action plan for the next phase of growth",
      ];
    default:
      return [
        `Master core ${title.toLowerCase()} concepts`,
        "Apply practical methodologies to real work scenarios",
        "Develop professional competencies aligned with industry expectations",
        "Strengthen collaboration with key stakeholders and teams",
        "Obtain recognition for structured professional development",
      ];
  }
}

function getDefaultCurriculum(
  category: CourseCategory,
  title: string
): { module: string; topics: string[] }[] {
  switch (category) {
    case "Accounting and Finance":
      return [
        {
          module: "Financial Reporting Foundations",
          topics: [
            "Role and objectives of financial reporting",
            "IFRS vs local GAAP – high-level overview",
            "The accounting equation and double-entry basics",
            "From trial balance to financial statements",
          ],
        },
        {
          module: "Primary Financial Statements",
          topics: [
            "Statement of financial position (balance sheet)",
            "Statement of profit or loss and other comprehensive income",
            "Statement of changes in equity",
            "Cash flow statement structure and interpretation",
          ],
        },
        {
          module: "Accounting for Key Transactions",
          topics: [
            "Revenue recognition – core principles",
            "Property, plant and equipment: depreciation and impairment",
            "Provisions, contingencies and events after reporting date",
            "Overview of financial instruments and simple investments",
          ],
        },
        {
          module: "Analysis, Budgeting and Controls",
          topics: [
            "Profitability, liquidity and solvency ratios",
            "Working capital and cash management",
            "Budgeting and forecasting techniques",
            "Internal controls, governance and reporting linkages",
          ],
        },
      ];
    case "Administration and Office Management":
      return [
        {
          module: "Role of the Modern Office",
          topics: [
            "Positioning the office function in the organisation",
            "Key responsibilities of office managers and administrators",
            "Professional standards, discretion and confidentiality",
            "Stakeholder mapping: management, staff and external parties",
          ],
        },
        {
          module: "Planning, Scheduling and Coordination",
          topics: [
            "Managing calendars, meetings and deadlines",
            "Preparing and circulating agendas, packs and minutes",
            "Coordinating travel and logistics",
            "Follow-up and tracking of actions and commitments",
          ],
        },
        {
          module: "Document and Information Management",
          topics: [
            "Structuring physical and digital filing systems",
            "Version control, templates and standard forms",
            "Email and inbox management disciplines",
            "Basic data protection and information security awareness",
          ],
        },
        {
          module: "Productivity, Communication and Service",
          topics: [
            "Time and priority management tools",
            "Professional telephone and written etiquette",
            "Handling visitors, vendors and internal customers",
            "Continuous improvement ideas for office processes",
          ],
        },
      ];
    case "Artificial Intelligence (AI) and Automation":
      return [
        {
          module: "AI, Machine Learning and Automation Basics",
          topics: [
            "Key definitions: AI, ML, automation and analytics",
            "Types of machine learning in simple terms",
            "Automation vs augmentation of human work",
            "Examples of AI in daily business processes",
          ],
        },
        {
          module: "From Data to Models",
          topics: [
            "Data quality and preparation for ML projects",
            "Features, labels and training data concepts",
            "Model training, evaluation and iteration at a high level",
            "Working with data science and engineering teams",
          ],
        },
        {
          module: "Use Cases and Business Value",
          topics: [
            "Identifying valuable AI opportunities in your function",
            "Customer, operations and risk-focused use cases",
            "Prioritising initiatives with simple benefit/cost views",
            "Change management and adoption considerations",
          ],
        },
        {
          module: "Governance, Ethics and Risk",
          topics: [
            "Bias, fairness and explainability in AI systems",
            "Data privacy, security and regulatory themes",
            "Accountability and oversight structures for AI",
            "Developing simple guiding principles for your organisation",
          ],
        },
      ];
    case "Auditing and Assurance":
      return [
        {
          module: "Risk-Based Audit Planning",
          topics: [
            "Role of internal audit and assurance providers",
            "Understanding the organisation and its risk profile",
            "Developing audit universe and annual plans",
            "Scoping engagements based on risk and materiality",
          ],
        },
        {
          module: "Fieldwork and Testing Techniques",
          topics: [
            "Types of audit evidence and documentation standards",
            "Walkthroughs, control testing and substantive tests",
            "Sampling considerations in audits",
            "Using data analytics in audit work",
          ],
        },
        {
          module: "Findings, Root Causes and Actions",
          topics: [
            "Identifying control design vs operating effectiveness issues",
            "Root cause analysis tools for auditors",
            "Formulating practical, risk-based recommendations",
            "Agreeing management actions and owners",
          ],
        },
        {
          module: "Reporting and Follow-Up",
          topics: [
            "Structuring audit reports for executives and boards",
            "Ratings, opinions and overall conclusions",
            "Tracking and following up agreed actions",
            "Coordinating with risk, compliance and other assurance functions",
          ],
        },
      ];
    case "Banking, Insurance and Financial Services":
      return [
        {
          module: "Industry Structure and Products",
          topics: [
            "Banking, insurance and financial markets overview",
            "Retail vs corporate products and services",
            "Customer journeys and touchpoints in financial services",
            "Evolving digital and FinTech-driven offerings",
          ],
        },
        {
          module: "Operations, Risk and Compliance Basics",
          topics: [
            "Core processes: onboarding, KYC and transaction processing",
            "Operational and conduct risk themes",
            "Anti-money laundering and sanctions considerations",
            "Three lines of defence in financial institutions",
          ],
        },
        {
          module: "Customer Experience and Service Quality",
          topics: [
            "Designing friction-aware customer journeys",
            "Managing complaints and escalations in regulated contexts",
            "Service metrics and regulatory expectations",
            "Balancing risk, compliance and customer centricity",
          ],
        },
        {
          module: "Innovation and Future Trends",
          topics: [
            "Open banking, APIs and ecosystem partnerships",
            "New payment architectures and digital wallets",
            "Data, AI and personalisation in FS",
            "Implications for people, processes and culture",
          ],
        },
      ];
    case "Business Continuity and Crisis Management":
      return [
        {
          module: "Principles of Resilience and Continuity",
          topics: [
            "Definitions: incident, emergency, crisis, continuity",
            "Regulatory and stakeholder expectations for resilience",
            "Key roles and responsibilities in BCM",
            "Linkages with risk, IT and operations",
          ],
        },
        {
          module: "Business Impact Analysis and Strategies",
          topics: [
            "Identifying critical activities and dependencies",
            "Setting recovery time and recovery point objectives",
            "Developing continuity and recovery strategies",
            "Third-party and supply chain continuity considerations",
          ],
        },
        {
          module: "Plan Development and Implementation",
          topics: [
            "Structure and content of BCM and DR plans",
            "Roles, teams and communication trees",
            "Awareness, training and embedding of plans",
            "Integrating BCM with incident and crisis management",
          ],
        },
        {
          module: "Testing, Exercising and Improvement",
          topics: [
            "Types of tests and exercises",
            "Designing realistic scenarios and simulations",
            "Capturing lessons learned and updating plans",
            "Reporting on resilience to leadership and regulators",
          ],
        },
      ];
    // Additional category-specific curricula follow the same pattern.
    // For brevity of this file, categories without a dedicated block fall
    // back to a generic but still structured curriculum.
    default:
      return [
        {
          module: "Foundations and Context",
          topics: [
            `${title} – role and value in organisations`,
            "Key concepts, terminology and frameworks",
            "Stakeholders and responsibilities",
            "Current trends and challenges in the field",
          ],
        },
        {
          module: "Core Tools and Techniques",
          topics: [
            "Step-by-step methods and workflows",
            "Templates, checklists and practical tools",
            "Using data and evidence to inform decisions",
            "Good practice examples and case studies",
          ],
        },
        {
          module: "Implementation and Integration",
          topics: [
            "Planning and prioritising improvements",
            "Working with cross-functional stakeholders",
            "Managing risks, blockers and change impacts",
            "Monitoring, review and continuous improvement",
          ],
        },
        {
          module: "Action Planning",
          topics: [
            "Translating learning into a 90-day plan",
            "Defining quick wins and longer-term initiatives",
            "Identifying support, resources and governance",
            "Personal commitments and next steps",
          ],
        },
      ];
  }
}

// Local SA Base Pricing: 5,000 ZAR per day
const SA_BASE_DAILY_RATE = 5000;
const AFRICA_MULTIPLIER = 1.4; // 40% higher than local
const INTERNATIONAL_MULTIPLIER = 2.5; // 150% higher (premium)

// Common discount structure
const STANDARD_DISCOUNTS = {
  three: 10, // 10% for 3+ delegates
  five: 15, // 15% for 5+ delegates
  ten: 25, // 25% for 10+ delegates
};

const SA_PRICING = (durationDays: number): CoursePricing => ({
  basePrice: SA_BASE_DAILY_RATE * durationDays,
  laptopIncluded: false,
  laptopPrice: 2000 * durationDays,
  discounts: STANDARD_DISCOUNTS,
  inHouseDiscount: 20, // 20% discount for in-house
});

const AFRICA_PRICING = (durationDays: number): CoursePricing => ({
  basePrice: Math.round(SA_BASE_DAILY_RATE * AFRICA_MULTIPLIER * durationDays),
  laptopIncluded: false,
  laptopPrice: 2500 * durationDays,
  discounts: STANDARD_DISCOUNTS,
  inHouseDiscount: 15,
});

const INTERNATIONAL_PRICING = (durationDays: number): CoursePricing => ({
  basePrice: Math.round(
    SA_BASE_DAILY_RATE * INTERNATIONAL_MULTIPLIER * durationDays
  ),
  laptopIncluded: true,
  laptopPrice: 0, // Included in international pricing
  discounts: STANDARD_DISCOUNTS,
  inHouseDiscount: 10,
});

// Venues
const SA_VENUES = [
  "Cape Town, South Africa",
  "Johannesburg, South Africa",
  "Pretoria, South Africa",
  "Durban, South Africa",
];

const AFRICA_VENUES = [
  "Lagos, Nigeria",
  "Nairobi, Kenya",
  "Accra, Ghana",
  "Cairo, Egypt",
  "Johannesburg, South Africa",
];

const INTERNATIONAL_VENUES = [
  "London, United Kingdom",
  "Dubai, United Arab Emirates",
  "Singapore",
  "New York, USA",
  "Sydney, Australia",
];

// Helper to create course batches
function createCourseBatch(
  baseId: string,
  title: string,
  category: CourseCategory,
  description: string,
  fullDescription: string,
  durationDays: number,
  instructor: string,
  instructorBio: string,
  venues: string[],
  location: CourseLocation,
  startMonth: number,
  endMonth: number
): CourseSchedule[] {
  const courses: CourseSchedule[] = [];
  const pricing =
    location === "local"
      ? SA_PRICING(durationDays)
      : location === "africa"
        ? AFRICA_PRICING(durationDays)
        : INTERNATIONAL_PRICING(durationDays);

  // Create multiple sessions throughout the year
  const months = Array.from(
    { length: endMonth - startMonth + 1 },
    (_, i) => startMonth + i
  );

  months.forEach((month, index) => {
    venues.forEach((venue, venueIndex) => {
      const startDay = 1 + (index * 3) % 25; // Spread dates
      const startDate = new Date(2026, month - 1, startDay);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + durationDays - 1);

      const courseId = `${baseId}-${month}-${venueIndex}`;

      const learningOutcomes = getDefaultLearningOutcomes(category, title);
      const curriculum = getDefaultCurriculum(category, title);

      courses.push({
        id: courseId,
        title: `${title} (${month}/${startDay})`,
        category,
        description,
        fullDescription,
        duration: durationDays,
        instructor,
        instructorBio,
        location,
        venue,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        maxParticipants: location === "international" ? 20 : 30,
        currentEnrolled: Math.floor(Math.random() * 8),
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(Math.random() * 100) + 20,
        learningOutcomes,
        curriculum,
        pricing,
        brochureUrl: `/brochures/${courseId}.pdf`,
      });
    });
  });

  return courses;
}

// Generate multiple distinct course variants per category (at least 20)
const COURSE_VARIANTS = [
  "Fundamentals",
  "Advanced",
  "Masterclass",
  "Certification Programme",
  "Essentials",
  "Practical Workshop",
  "Strategy Lab",
  "Implementation Clinic",
  "Bootcamp",
  "Executive Briefing",
  "Professional Certificate",
  "Applied Skills",
  "Best Practices",
  "Tools and Techniques",
  "Intensive Programme",
  "Update and Refresh",
  "Deep Dive",
  "Case Study Lab",
  "Manager Programme",
  "Expert Programme",
];

function createCourseVariants(
  basePrefix: string,
  baseTitle: string,
  category: CourseCategory,
  description: string,
  fullDescription: string,
  durationDays: number,
  instructor: string,
  instructorBio: string,
  venues: string[],
  location: CourseLocation,
  startMonth: number,
  endMonth: number
): CourseSchedule[] {
  return COURSE_VARIANTS.flatMap((variant, index) =>
    createCourseBatch(
      `${basePrefix}-${(index + 1).toString().padStart(2, "0")}`,
      `${baseTitle}: ${variant}`,
      category,
      description,
      fullDescription,
      durationDays,
      instructor,
      instructorBio,
      venues,
      location,
      startMonth,
      endMonth
    )
  );
}

// Build complete course catalog with all 37 categories
export const COURSE_CATALOG: CourseSchedule[] = [
  // ACCOUNTING AND FINANCE
  ...createCourseVariants(
    "ACC",
    "Financial Accounting and Reporting",
    "Accounting and Finance",
    "Master comprehensive financial accounting practices",
    "Learn IFRS standards, financial statement preparation, and reporting requirements.",
    5,
    "Dr. Jane Mthembu",
    "Chartered accountant with 22+ years in corporate finance",
    SA_VENUES,
    "local",
    1,
    6
  ),
  
  // ADMINISTRATION AND OFFICE MANAGEMENT
  ...createCourseVariants(
    "ADM",
    "Office Management Excellence",
    "Administration and Office Management",
    "Streamline office operations and productivity",
    "Comprehensive office management covering planning, coordination, and administrative excellence.",
    3,
    "Susan Parker",
    "Office management specialist with 18 years experience",
    SA_VENUES,
    "local",
    2,
    7
  ),

  // ARTIFICIAL INTELLIGENCE AND AUTOMATION
  ...createCourseVariants(
    "AI",
    "AI Fundamentals and Machine Learning",
    "Artificial Intelligence (AI) and Automation",
    "Introduction to AI and automation technologies",
    "Explore machine learning, neural networks, and practical AI applications in business.",
    5,
    "Prof. Ahmed Hassan",
    "AI researcher with 15+ years in technology innovation",
    INTERNATIONAL_VENUES,
    "international",
    1,
    9
  ),

  // AUDITING AND ASSURANCE
  ...createCourseVariants(
    "AUD",
    "Internal Audit and Assurance",
    "Auditing and Assurance",
    "Develop internal audit competencies",
    "Master internal audit methodologies, risk assessment, and audit reporting.",
    4,
    "Michael Okafor",
    "Senior auditor with 20+ years in assurance services",
    AFRICA_VENUES,
    "africa",
    3,
    8
  ),

  // BANKING, INSURANCE AND FINANCIAL SERVICES
  ...createCourseVariants(
    "BANK",
    "Banking Operations and Compliance",
    "Banking, Insurance and Financial Services",
    "Modern banking operations and regulatory compliance",
    "Cover banking products, operations, and regulatory requirements in financial services.",
    4,
    "Dr. Oluwamide Adeyemi",
    "Banking executive with 24+ years in financial institutions",
    AFRICA_VENUES,
    "africa",
    2,
    8
  ),

  // BUSINESS CONTINUITY AND CRISIS MANAGEMENT
  ...createCourseVariants(
    "BC",
    "Business Continuity and Disaster Recovery",
    "Business Continuity and Crisis Management",
    "Prepare organizations for disruptions",
    "Develop comprehensive business continuity and disaster recovery plans.",
    3,
    "Lisa Thompson",
    "Crisis management consultant with 16 years experience",
    SA_VENUES,
    "local",
    1,
    9
  ),

  // COMMUNICATION AND BUSINESS WRITING SKILLS
  ...createCourseVariants(
    "COMM",
    "Professional Communication and Writing",
    "Communication and Business Writing Skills",
    "Master business communication excellence",
    "Enhance written and verbal communication for corporate environment.",
    3,
    "Jonathan Smith",
    "Communications expert with 17 years in corporate training",
    SA_VENUES,
    "local",
    2,
    10
  ),

  // CONSTRUCTION MANAGEMENT
  ...createCourseVariants(
    "CONST",
    "Construction Project Management",
    "Construction Management",
    "Master modern construction project delivery",
    "Cover construction planning, project controls, safety, and compliance.",
    5,
    "Eng. Carlos Rodriguez",
    "Construction manager with 21+ years on major projects",
    SA_VENUES,
    "local",
    3,
    8
  ),

  // CONTRACTS AND COMMERCIAL MANAGEMENT
  ...createCourseVariants(
    "CONT",
    "Contracts and Commercial Management",
    "Contracts and Commercial Management",
    "Develop contract management expertise",
    "Master contract drafting, negotiation, and commercial management.",
    4,
    "Advocate Thandi Ndaba",
    "Commercial lawyer with 19 years in contract law",
    SA_VENUES,
    "local",
    1,
    7
  ),

  // CORPORATE GOVERNANCE, RISK AND COMPLIANCE
  ...createCourseVariants(
    "GRC",
    "Corporate Governance and Risk Management",
    "Corporate Governance, Risk and Compliance (GRC)",
    "Comprehensive governance and risk framework",
    "Master corporate governance, risk frameworks, and compliance mechanisms.",
    5,
    "Prof. David Okoro",
    "GRC specialist with 23+ years in risk management",
    INTERNATIONAL_VENUES,
    "international",
    2,
    9
  ),

  // CUSTOMER SERVICE AND EXPERIENCE MANAGEMENT
  ...createCourseVariants(
    "CUST",
    "Customer Service Excellence",
    "Customer Service and Experience Management",
    "Deliver outstanding customer experiences",
    "Master customer service principles, experience design, and satisfaction metrics.",
    3,
    "Rachel Green",
    "Customer experience specialist with 15 years in service management",
    SA_VENUES,
    "local",
    1,
    6
  ),

  // DATA MANAGEMENT, ANALYTICS AND BUSINESS INTELLIGENCE
  ...createCourseVariants(
    "DATA",
    "Business Intelligence and Analytics",
    "Data Management, Analytics and Business Intelligence",
    "Transform data into actionable insights",
    "Master data management, analytics tools, and business intelligence strategies.",
    5,
    "Dr. Kenji Tanaka",
    "Data scientist with 18+ years in analytics and BI",
    INTERNATIONAL_VENUES,
    "international",
    1,
    8
  ),

  // DIGITAL TRANSFORMATION AND INNOVATION
  ...createCourseVariants(
    "DT",
    "Digital Transformation Strategy",
    "Digital Transformation and Innovation",
    "Lead organizational digital transformation",
    "Develop strategies for digital transformation and organizational innovation.",
    4,
    "Elena Kowalski",
    "Digital transformation leader with 17 years in technology",
    INTERNATIONAL_VENUES,
    "international",
    2,
    9
  ),

  // ENERGY, POWER AND UTILITIES MANAGEMENT
  ...createCourseVariants(
    "ENE",
    "Energy Management and Sustainability",
    "Energy, Power and Utilities Management",
    "Master energy efficiency and sustainable power",
    "Cover energy management, utilities operations, and sustainability practices.",
    4,
    "Eng. Sipho Mbonambi",
    "Energy management expert with 20+ years in utilities",
    AFRICA_VENUES,
    "africa",
    1,
    8
  ),

  // FINANCIAL TECHNOLOGY (FINTECH)
  ...createCourseVariants(
    "FIN",
    "FinTech Innovations and Blockchain",
    "Financial Technology (FinTech)",
    "Explore financial technology innovations",
    "Master FinTech platforms, blockchain, and digital financial services.",
    4,
    "Dr. Ashok Kapoor",
    "FinTech innovator with 14 years in financial technology",
    INTERNATIONAL_VENUES,
    "international",
    3,
    9
  ),

  // GOVERNMENT AND PUBLIC SECTOR MANAGEMENT
  ...createCourseVariants(
    "GOV",
    "Public Sector Management and Governance",
    "Government and Public Sector Management",
    "Effective government and public administration",
    "Master public sector governance, policy implementation, and service delivery.",
    4,
    "Hon. Minister Peter Banda",
    "Government official with 19 years in public administration",
    SA_VENUES,
    "local",
    2,
    8
  ),

  // HEALTH, SAFETY, SECURITY AND ENVIRONMENT
  ...createCourseVariants(
    "HSE",
    "Health, Safety and Environmental Management",
    "Health, Safety, Security and Environment (HSSE / HSE)",
    "Comprehensive HSE compliance and management",
    "Master HSE regulations, risk assessment, and workplace safety programs.",
    4,
    "Dr. James Okonkwo",
    "HSE director with 22+ years in safety management",
    AFRICA_VENUES,
    "africa",
    1,
    7
  ),

  // HUMAN RESOURCES AND TRAINING & DEVELOPMENT
  ...createCourseVariants(
    "HR",
    "Human Resources Management and Development",
    "Human Resources and Training & Development",
    "Master strategic HR and talent development",
    "Cover recruitment, talent management, training, and organizational development.",
    4,
    "Dr. Nomsa Dlamini",
    "HR executive with 21+ years in talent management",
    SA_VENUES,
    "local",
    1,
    8
  ),

  // INTERPERSONAL SKILLS AND PERSONAL DEVELOPMENT
  ...createCourseVariants(
    "INT",
    "Leadership Skills and Personal Development",
    "Interpersonal Skills and Personal Development",
    "Develop leadership and interpersonal competencies",
    "Master emotional intelligence, communication, and personal leadership.",
    3,
    "Coach William Stevens",
    "Executive coach with 16 years in personal development",
    SA_VENUES,
    "local",
    2,
    9
  ),

  // IT MANAGEMENT, CLOUD COMPUTING AND CYBERSECURITY
  ...createCourseVariants(
    "IT",
    "Cloud Computing and Cybersecurity",
    "IT Management, Cloud Computing and Cybersecurity",
    "Master cloud and cyber security technologies",
    "Cover cloud platforms, cybersecurity frameworks, and IT infrastructure.",
    5,
    "Dr. Viktor Petrov",
    "IT security expert with 19+ years in cybersecurity",
    INTERNATIONAL_VENUES,
    "international",
    1,
    9
  ),

  // LEADERSHIP, STRATEGY AND EXECUTIVE MANAGEMENT
  ...createCourseVariants(
    "LEA",
    "Strategic Leadership and Executive Management",
    "Leadership, Strategy and Executive Management",
    "Develop executive leadership competencies",
    "Master strategic planning, organizational leadership, and executive decision-making.",
    5,
    "Prof. Rebecca Norton",
    "Executive leadership consultant with 24+ years",
    INTERNATIONAL_VENUES,
    "international",
    2,
    8
  ),

  // LEGAL, COMPLIANCE AND REGULATORY AFFAIRS
  ...createCourseVariants(
    "LEG",
    "Legal Compliance and Regulatory Management",
    "Legal, Compliance and Regulatory Affairs",
    "Navigate legal and regulatory requirements",
    "Master compliance frameworks, regulatory affairs, and legal risk management.",
    4,
    "Advocate Siya Mthembu",
    "Legal compliance officer with 18 years in regulatory affairs",
    SA_VENUES,
    "local",
    2,
    8
  ),

  // MAINTENANCE, ENGINEERING AND ASSET MANAGEMENT
  ...createCourseVariants(
    "MAIN",
    "Asset Maintenance and Engineering Management",
    "Maintenance, Engineering and Asset Management",
    "Optimize equipment maintenance and assets",
    "Cover preventive maintenance, reliability engineering, and asset optimization.",
    4,
    "Eng. Ahmad Hassan",
    "Asset management engineer with 20+ years experience",
    AFRICA_VENUES,
    "africa",
    3,
    9
  ),

  // MARKETING, SALES AND BRAND MANAGEMENT
  ...createCourseVariants(
    "MAR",
    "Marketing Strategy and Brand Management",
    "Marketing, Sales and Brand Management",
    "Master modern marketing and sales strategies",
    "Cover brand development, marketing campaigns, and sales excellence.",
    4,
    "Caroline Matthews",
    "Marketing director with 17 years in brand strategy",
    SA_VENUES,
    "local",
    1,
    7
  ),

  // MARITIME, PORTS AND LOGISTICS MANAGEMENT
  ...createCourseVariants(
    "MAR2",
    "Maritime and Port Operations Management",
    "Maritime, Ports and Logistics Management",
    "Master maritime and port operations",
    "Cover port management, maritime regulations, and logistics coordination.",
    5,
    "Capt. Ibrahim Al-Mansouri",
    "Maritime expert with 25+ years in port operations",
    AFRICA_VENUES,
    "africa",
    1,
    8
  ),

  // OIL, GAS AND PETROLEUM MANAGEMENT
  ...createCourseVariants(
    "OIL",
    "Oil, Gas and Petroleum Management",
    "Oil, Gas and Petroleum Management",
    "Master petroleum industry operations",
    "Cover upstream, downstream, and petroleum project management.",
    5,
    "Dr. Kwamena Mensah",
    "Oil & gas executive with 26+ years in energy sector",
    AFRICA_VENUES,
    "africa",
    2,
    9
  ),

  // PLANNING, MONITORING AND STRATEGY EXECUTION
  ...createCourseVariants(
    "PLAN",
    "Strategic Planning and Execution",
    "Planning, Monitoring and Strategy Execution",
    "Execute strategic plans effectively",
    "Master strategic planning, monitoring, and implementation frameworks.",
    4,
    "Prof. Andrew McKenzie",
    "Strategy consultant with 20 years in organizational planning",
    SA_VENUES,
    "local",
    2,
    8
  ),

  // PROCUREMENT AND SUPPLY CHAIN MANAGEMENT
  ...createCourseVariants(
    "PROC",
    "Procurement and Supply Chain Excellence",
    "Procurement and Supply Chain Management",
    "Master procurement and supply chain optimization",
    "Cover procurement strategies, vendor management, and supply chain excellence.",
    4,
    "Richard Thompson",
    "Supply chain expert with 19 years in procurement",
    AFRICA_VENUES,
    "africa",
    1,
    7
  ),

  // PROJECT, PROGRAMME AND PORTFOLIO MANAGEMENT
  ...createCourseVariants(
    "PM",
    "Project and Portfolio Management (PPM)",
    "Project, Programme and Portfolio Management (PPM)",
    "Master comprehensive project management",
    "Cover project management, portfolio management, and program delivery.",
    5,
    "Dr. Miriam Cohen",
    "PMO director with 21+ years in project management",
    INTERNATIONAL_VENUES,
    "international",
    1,
    8
  ),

  // PUBLIC RELATIONS, MEDIA AND CORPORATE COMMUNICATIONS
  ...createCourseVariants(
    "PR",
    "Corporate Communications and PR Strategy",
    "Public Relations, Media and Corporate Communications",
    "Master PR and corporate communications",
    "Cover media relations, crisis communications, and corporate messaging.",
    3,
    "Jennifer Shaw",
    "PR director with 16 years in communications",
    SA_VENUES,
    "local",
    1,
    6
  ),

  // QUALITY MANAGEMENT, PRODUCTIVITY AND OPERATIONAL EXCELLENCE
  ...createCourseVariants(
    "QM",
    "Quality Management and Operational Excellence",
    "Quality Management, Productivity and Operational Excellence",
    "Achieve operational excellence and quality",
    "Master quality frameworks, lean management, and continuous improvement.",
    4,
    "Dr. Yasushi Tanaka",
    "Quality expert with 22 years in operational excellence",
    INTERNATIONAL_VENUES,
    "international",
    2,
    8
  ),

  // RISK MANAGEMENT AND INTERNAL CONTROLS
  ...createCourseVariants(
    "RISK",
    "Enterprise Risk Management",
    "Risk Management and Internal Controls",
    "Comprehensive risk and control frameworks",
    "Master risk management methodologies and internal control systems.",
    4,
    "Dr. Francis Mwangi",
    "Risk management specialist with 20 years experience",
    AFRICA_VENUES,
    "africa",
    2,
    8
  ),

  // SECURITY MANAGEMENT AND INTELLIGENCE STUDIES
  ...createCourseVariants(
    "SEC",
    "Security Management and Intelligence",
    "Security Management and Intelligence Studies",
    "Master comprehensive security management",
    "Cover physical security, intelligence analysis, and security operations.",
    5,
    "Col. Stephen Adeyinka",
    "Security director with 23+ years in intelligence and security",
    SA_VENUES,
    "local",
    1,
    8
  ),

  // SUSTAINABILITY, ESG AND CLIMATE RISK MANAGEMENT
  ...createCourseVariants(
    "SUS",
    "Sustainability, ESG and Climate Strategy",
    "Sustainability, ESG and Climate Risk Management",
    "Master sustainability and ESG integration",
    "Cover ESG frameworks, climate risk, and sustainable business practices.",
    4,
    "Dr. Emma Greenwood",
    "Sustainability director with 15 years in ESG management",
    INTERNATIONAL_VENUES,
    "international",
    1,
    7
  ),

  // TOURISM, HOSPITALITY AND EVENTS MANAGEMENT
  ...createCourseVariants(
    "TOU",
    "Tourism and Hospitality Management",
    "Tourism, Hospitality and Events Management",
    "Master hospitality and tourism excellence",
    "Cover hospitality operations, guest experience, and event management.",
    3,
    "Marcel Lemaire",
    "Hospitality executive with 18 years in tourism management",
    SA_VENUES,
    "local",
    2,
    8
  ),

  // TRANSPORT, AVIATION AND LOGISTICS
  ...createCourseVariants(
    "TRANS",
    "Transport and Logistics Management",
    "Transport, Aviation and Logistics",
    "Master transport and logistics operations",
    "Cover transportation management, aviation, and logistics coordination.",
    4,
    "Capt. Mohamed Al-Rashid",
    "Aviation and transport expert with 21 years experience",
    AFRICA_VENUES,
    "africa",
    1,
    8
  ),

  // ENTREPRENEURSHIP, SMES AND BUSINESS DEVELOPMENT
  ...createCourseVariants(
    "ENT",
    "Entrepreneurship and SME Development",
    "Entrepreneurship, SMEs and Business Development",
    "Build and grow successful businesses",
    "Master business planning, entrepreneurship, and SME growth strategies.",
    4,
    "Dr. Kwame Asante",
    "Entrepreneur and business development coach with 17 years",
    SA_VENUES,
    "local",
    3,
    9
  ),
];

// Export categories for filtering (based strictly on primaryCategory)
export const CATEGORIES: CourseCategory[] = Array.from(
  new Set(COURSE_CATALOG.map((c) => c.primaryCategory))
).sort();

// Export all venues
export const ALL_VENUES: string[] = Array.from(
  new Set(COURSE_CATALOG.map((c) => c.venue))
).sort();

// Venues grouped by hub/location for UI selectors
export const HUB_VENUES_BY_LOCATION: Record<CourseLocation, string[]> = {
  local: Array.from(
    new Set(COURSE_CATALOG.filter((c) => c.location === "local").map((c) => c.venue)),
  ).sort(),
  africa: Array.from(
    new Set(COURSE_CATALOG.filter((c) => c.location === "africa").map((c) => c.venue)),
  ).sort(),
  international: Array.from(
    new Set(
      COURSE_CATALOG.filter((c) => c.location === "international").map((c) => c.venue),
    ),
  ).sort(),
};

// Image mapping for all 37 categories with theme-appropriate images
export const getCourseImage = (category: CourseCategory): string => {
  const imageMap: Record<CourseCategory, string> = {
    "Accounting and Finance": "https://images.pexels.com/photos/35878926/pexels-photo-35878926.jpeg",
    "Administration and Office Management": "https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg",
    "Artificial Intelligence (AI) and Automation": "https://images.pexels.com/photos/13194386/pexels-photo-13194386.png",
    "Auditing and Assurance": "https://images.pexels.com/photos/6816369/pexels-photo-6816369.jpeg",
    "Banking, Insurance and Financial Services": "https://images.pexels.com/photos/8366383/pexels-photo-8366383.jpeg",
    "Business Continuity and Crisis Management": "https://images.pexels.com/photos/3958647/pexels-photo-3958647.jpeg",
    "Communication and Business Writing Skills": "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    "Construction Management": "https://images.pexels.com/photos/34775530/pexels-photo-34775530.jpeg",
    "Contracts and Commercial Management": "https://images.pexels.com/photos/16282318/pexels-photo-16282318.jpeg",
    "Corporate Governance, Risk and Compliance (GRC)": "https://images.pexels.com/photos/11124982/pexels-photo-11124982.jpeg",
    "Customer Service and Experience Management": "https://images.pexels.com/photos/8867475/pexels-photo-8867475.jpeg",
    "Data Management, Analytics and Business Intelligence": "https://images.pexels.com/photos/7793173/pexels-photo-7793173.jpeg",
    "Digital Transformation and Innovation": "https://images.pexels.com/photos/18069832/pexels-photo-18069832.png",
    "Energy, Power and Utilities Management": "https://images.pexels.com/photos/29294301/pexels-photo-29294301.jpeg",
    "Financial Technology (FinTech)": "https://images.pexels.com/photos/4808267/pexels-photo-4808267.jpeg",
    "Government and Public Sector Management": "https://images.pexels.com/photos/12998547/pexels-photo-12998547.jpeg",
    "Health, Safety, Security and Environment (HSSE / HSE)": "https://images.pexels.com/photos/26780734/pexels-photo-26780734.jpeg",
    "Human Resources and Training & Development": "https://images.pexels.com/photos/7640831/pexels-photo-7640831.jpeg",
    "Interpersonal Skills and Personal Development": "https://images.pexels.com/photos/8177853/pexels-photo-8177853.jpeg",
    "IT Management, Cloud Computing and Cybersecurity": "https://images.pexels.com/photos/6465146/pexels-photo-6465146.jpeg",
    "Leadership, Strategy and Executive Management": "https://images.pexels.com/photos/15023413/pexels-photo-15023413.jpeg",
    "Legal, Compliance and Regulatory Affairs": "https://images.pexels.com/photos/31078928/pexels-photo-31078928.jpeg",
    "Maintenance, Engineering and Asset Management": "https://images.pexels.com/photos/30199751/pexels-photo-30199751.jpeg",
    "Marketing, Sales and Brand Management": "https://images.pexels.com/photos/18351014/pexels-photo-18351014.jpeg",
    "Maritime, Ports and Logistics Management": "https://images.pexels.com/photos/15876599/pexels-photo-15876599.jpeg",
    "Oil, Gas and Petroleum Management": "https://images.pexels.com/photos/11116153/pexels-photo-11116153.jpeg",
    "Planning, Monitoring and Strategy Execution": "https://images.pexels.com/photos/7693189/pexels-photo-7693189.jpeg",
    "Procurement and Supply Chain Management": "https://images.pexels.com/photos/15876599/pexels-photo-15876599.jpeg",
    "Project, Programme and Portfolio Management (PPM)": "https://images.pexels.com/photos/7693189/pexels-photo-7693189.jpeg",
    "Public Relations, Media and Corporate Communications": "https://images.pexels.com/photos/12306438/pexels-photo-12306438.jpeg",
    "Quality Management, Productivity and Operational Excellence": "https://images.pexels.com/photos/8981847/pexels-photo-8981847.jpeg",
    "Risk Management and Internal Controls": "https://images.pexels.com/photos/8817673/pexels-photo-8817673.jpeg",
    "Security Management and Intelligence Studies": "https://images.pexels.com/photos/14402403/pexels-photo-14402403.jpeg",
    "Sustainability, ESG and Climate Risk Management": "https://images.pexels.com/photos/4354693/pexels-photo-4354693.jpeg",
    "Tourism, Hospitality and Events Management": "https://images.pexels.com/photos/30761844/pexels-photo-30761844.jpeg",
    "Transport, Aviation and Logistics": "https://images.pexels.com/photos/15378707/pexels-photo-15378707.jpeg",
    "Entrepreneurship, SMEs and Business Development": "https://images.pexels.com/photos/18351014/pexels-photo-18351014.jpeg",
  };
  return imageMap[category] || imageMap["Leadership, Strategy and Executive Management"];
};
