export interface TrainingCategoryMeta {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const TRAINING_CATEGORIES: TrainingCategoryMeta[] = [
  {
    id: "accounting-finance",
    name: "Accounting and Finance",
    slug: "accounting-and-finance",
    description:
      "Professional training on financial accounting, reporting, budgeting, cash flow, and financial analysis to strengthen organisational financial performance and decision-making.",
  },
  {
    id: "administration-office-management",
    name: "Administration and Office Management",
    slug: "administration-and-office-management",
    description:
      "Courses for executive assistants, office managers and administrators covering organisation, coordination, meeting management, document control and digital office productivity.",
  },
  {
    id: "ai-automation",
    name: "Artificial Intelligence (AI) and Automation",
    slug: "artificial-intelligence-ai-and-automation",
    description:
      "Applied AI, machine learning and automation programmes focused on practical business use cases, governance, and adoption across functions and industries.",
  },
  {
    id: "auditing-assurance",
    name: "Auditing and Assurance",
    slug: "auditing-and-assurance",
    description:
      "Internal audit, external audit and assurance skills including risk-based planning, fieldwork techniques, reporting and quality assurance for audit functions.",
  },
  {
    id: "banking-insurance-financial-services",
    name: "Banking, Insurance and Financial Services",
    slug: "banking-insurance-and-financial-services",
    description:
      "Specialist training for banks, insurers and financial institutions on operations, products, compliance, risk, customer experience and digital financial services.",
  },
  {
    id: "business-continuity-crisis-management",
    name: "Business Continuity and Crisis Management",
    slug: "business-continuity-and-crisis-management",
    description:
      "Programmes on business continuity planning, disaster recovery, crisis leadership and organisational resilience across sectors and geographies.",
  },
  {
    id: "communication-business-writing",
    name: "Communication and Business Writing Skills",
    slug: "communication-and-business-writing-skills",
    description:
      "Practical communication and writing courses that improve reports, proposals, emails, presentations and stakeholder messaging in a corporate context.",
  },
  {
    id: "construction-management",
    name: "Construction Management",
    slug: "construction-management",
    description:
      "Training for construction professionals on project delivery, contracts, site management, HSE, cost control and stakeholder coordination on major projects.",
  },
  {
    id: "contracts-commercial-management",
    name: "Contracts and Commercial Management",
    slug: "contracts-and-commercial-management",
    description:
      "Courses covering the full contract lifecycle: drafting, negotiation, administration, claims, variations and commercial risk management for buyers and suppliers.",
  },
  {
    id: "corporate-governance-risk-compliance",
    name: "Corporate Governance, Risk and Compliance (GRC)",
    slug: "corporate-governance-risk-and-compliance-grc",
    description:
      "Board, governance, risk management and compliance programmes aligned with leading codes and frameworks for both public and private sector entities.",
  },
  {
    id: "customer-service-experience-management",
    name: "Customer Service and Experience Management",
    slug: "customer-service-and-experience-management",
    description:
      "Customer-centric training focused on service excellence, complaint handling, journey mapping and experience design across contact centres and front-line teams.",
  },
  {
    id: "data-management-analytics-bi",
    name: "Data Management, Analytics and Business Intelligence",
    slug: "data-management-analytics-and-business-intelligence",
    description:
      "End-to-end data skills from governance, quality and modelling through to analytics, dashboards and business intelligence for better, faster decisions.",
  },
  {
    id: "digital-transformation-innovation",
    name: "Digital Transformation and Innovation",
    slug: "digital-transformation-and-innovation",
    description:
      "Strategic and practical programmes on leading digital transformation, innovation portfolios, agile delivery and new business models in organisations.",
  },
  {
    id: "energy-power-utilities",
    name: "Energy, Power and Utilities Management",
    slug: "energy-power-and-utilities-management",
    description:
      "Sector-specific courses for power, water and utilities covering operations, asset management, regulation, tariffs and sustainability initiatives.",
  },
  {
    id: "financial-technology-fintech",
    name: "Financial Technology (FinTech)",
    slug: "financial-technology-fintech",
    description:
      "Training on digital finance, payments, blockchain, open banking and emerging FinTech ecosystems for incumbents and challengers.",
  },
  {
    id: "government-public-sector-management",
    name: "Government and Public Sector Management",
    slug: "government-and-public-sector-management",
    description:
      "Capacity-building for ministries, agencies and public institutions on policy design, programme delivery, service performance and accountability.",
  },
  {
    id: "health-safety-security-environment",
    name: "Health, Safety, Security and Environment (HSSE / HSE)",
    slug: "health-safety-security-and-environment-hsse-hse",
    description:
      "Comprehensive HSSE programmes on occupational health, safety culture, security risk, incident investigation and environmental management systems.",
  },
  {
    id: "human-resources-training-development",
    name: "Human Resources and Training & Development",
    slug: "human-resources-and-training-development",
    description:
      "Strategic and operational HR training on talent acquisition, performance, learning and development, workforce planning and HR business partnering.",
  },
  {
    id: "interpersonal-skills-personal-development",
    name: "Interpersonal Skills and Personal Development",
    slug: "interpersonal-skills-and-personal-development",
    description:
      "Soft skills programmes covering emotional intelligence, influence, negotiation, resilience, time management and personal effectiveness in the workplace.",
  },
  {
    id: "it-management-cloud-cybersecurity",
    name: "IT Management, Cloud Computing and Cybersecurity",
    slug: "it-management-cloud-computing-and-cybersecurity",
    description:
      "Technology leadership, cloud strategy and cybersecurity training for CIOs, IT managers and technical teams responsible for digital infrastructure.",
  },
  {
    id: "leadership-strategy-executive-management",
    name: "Leadership, Strategy and Executive Management",
    slug: "leadership-strategy-and-executive-management",
    description:
      "Executive-level programmes on leadership, strategy, change, corporate performance and board-level decision-making for senior leaders.",
  },
  {
    id: "legal-compliance-regulatory-affairs",
    name: "Legal, Compliance and Regulatory Affairs",
    slug: "legal-compliance-and-regulatory-affairs",
    description:
      "Specialist legal and regulatory training on compliance frameworks, investigations, regulatory engagement and managing legal risk in organisations.",
  },
  {
    id: "maintenance-engineering-asset-management",
    name: "Maintenance, Engineering and Asset Management",
    slug: "maintenance-engineering-and-asset-management",
    description:
      "Practical maintenance, reliability and asset management courses for engineering, facilities and operations teams across industries.",
  },
  {
    id: "marketing-sales-brand-management",
    name: "Marketing, Sales and Brand Management",
    slug: "marketing-sales-and-brand-management",
    description:
      "Marketing, sales and brand programmes covering go-to-market strategy, digital campaigns, key account management and brand positioning.",
  },
  {
    id: "maritime-ports-logistics-management",
    name: "Maritime, Ports and Logistics Management",
    slug: "maritime-ports-and-logistics-management",
    description:
      "Specialised training for ports, shipping lines and logistics providers on port operations, marine regulations, cargo handling and supply chains.",
  },
  {
    id: "oil-gas-petroleum-management",
    name: "Oil, Gas and Petroleum Management",
    slug: "oil-gas-and-petroleum-management",
    description:
      "Upstream, midstream and downstream courses for the oil, gas and petroleum value chain, including projects, operations, HSE and commercial aspects.",
  },
  {
    id: "planning-monitoring-strategy-execution",
    name: "Planning, Monitoring and Strategy Execution",
    slug: "planning-monitoring-and-strategy-execution",
    description:
      "Programmes on corporate planning, KPIs, performance dashboards, PMO practices and strategy execution disciplines.",
  },
  {
    id: "procurement-supply-chain-management",
    name: "Procurement and Supply Chain Management",
    slug: "procurement-and-supply-chain-management",
    description:
      "End-to-end procurement and supply chain skills including sourcing, contracts, logistics, inventory and supplier performance.",
  },
  {
    id: "project-programme-portfolio-management",
    name: "Project, Programme and Portfolio Management (PPM)",
    slug: "project-programme-and-portfolio-management-ppm",
    description:
      "Project, programme and portfolio management training covering methodologies, governance, benefits realisation and PMO leadership.",
  },
  {
    id: "public-relations-media-corporate-communications",
    name: "Public Relations, Media and Corporate Communications",
    slug: "public-relations-media-and-corporate-communications",
    description:
      "PR and communications programmes on brand storytelling, media engagement, crisis communication and stakeholder relations.",
  },
  {
    id: "quality-management-productivity-operational-excellence",
    name: "Quality Management, Productivity and Operational Excellence",
    slug: "quality-management-productivity-and-operational-excellence",
    description:
      "Lean, Six Sigma, continuous improvement and operational excellence courses to improve quality, productivity and customer value.",
  },
  {
    id: "risk-management-internal-controls",
    name: "Risk Management and Internal Controls",
    slug: "risk-management-and-internal-controls",
    description:
      "Enterprise risk management, internal control and assurance programmes that strengthen organisational risk culture and oversight.",
  },
  {
    id: "security-management-intelligence-studies",
    name: "Security Management and Intelligence Studies",
    slug: "security-management-and-intelligence-studies",
    description:
      "Security and intelligence training on threat assessment, investigations, protective security and intelligence-led operations.",
  },
  {
    id: "sustainability-esg-climate-risk",
    name: "Sustainability, ESG and Climate Risk Management",
    slug: "sustainability-esg-and-climate-risk-management",
    description:
      "Programmes on ESG strategy, climate risk, reporting standards and integrating sustainability into core business decisions.",
  },
  {
    id: "tourism-hospitality-events-management",
    name: "Tourism, Hospitality and Events Management",
    slug: "tourism-hospitality-and-events-management",
    description:
      "Sector-focused courses for tourism boards, hotels and event organisers on service design, operations, marketing and guest experience.",
  },
  {
    id: "transport-aviation-logistics",
    name: "Transport, Aviation and Logistics",
    slug: "transport-aviation-and-logistics",
    description:
      "Training for road, air and multimodal transport and logistics providers on operations, safety, scheduling and supply chain integration.",
  },
  {
    id: "entrepreneurship-smes-business-development",
    name: "Entrepreneurship, SMEs and Business Development",
    slug: "entrepreneurship-smes-and-business-development",
    description:
      "Entrepreneurship and SME growth programmes covering business models, funding, sales, operations and scaling across African and global markets.",
  },
];
