export interface RegistrationRecord {
  name: string;
  email: string;
  courseTitle: string;
  delegateCount: number;
  pricingTotal: number;
  createdAt: string;
  referralCode?: string;
  marketingOptIn?: boolean;
}

export interface QuoteRecord {
  company: string;
  contact: string;
  email: string;
  createdAt: string;
}

export interface PartnerRecord {
  name: string;
  email: string;
  company: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface ReferralRecord {
  code: string;
  courseTitle?: string;
  email?: string;
  createdAt: string;
}

export interface SponsorRecord {
  name: string;
  email: string;
  company: string;
  tier: string;
  createdAt: string;
}

export type ProspectStatus = "new" | "contacted" | "qualified" | "closed";

export interface ProspectRecord {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  city?: string;
  courseInterest?: string;
  source: string;
  stage?: string;
  marketingOptIn?: boolean;
  tags?: string[];
  score: number;
  segment?: string;
  summary?: string;
  status: ProspectStatus;
  createdAt: string;
  lastActivityAt?: string;
}

const registrations: RegistrationRecord[] = [];
const quotes: QuoteRecord[] = [];
const partners: PartnerRecord[] = [];
const referrals: ReferralRecord[] = [];
const sponsors: SponsorRecord[] = [];
const prospects: ProspectRecord[] = [];

export function addRegistration(record: RegistrationRecord) {
  registrations.push(record);
}

export function addQuote(record: QuoteRecord) {
  quotes.push(record);
}

export function addPartner(record: PartnerRecord) {
  partners.push(record);
}

export function getPartners() {
  return partners.slice().reverse();
}

export function updatePartnerStatus(email: string, status: PartnerRecord["status"]) {
  const partner = partners.find((p) => p.email === email);
  if (partner) {
    partner.status = status;
  }
}

export function addReferral(record: ReferralRecord) {
  referrals.push(record);
}

export function getReferrals() {
  return referrals.slice().reverse();
}

export function getDashboardSummary() {
  const totalRevenue = registrations.reduce((sum, r) => sum + (r.pricingTotal || 0), 0);
  return {
    registrations: registrations.length,
    quotes: quotes.length,
    partnersPending: partners.filter((p) => p.status === "pending").length,
    sponsors: sponsors.length,
    totalRevenue,
    recentRegistrations: registrations.slice(-5).reverse(),
  };
}

export function addSponsor(record: SponsorRecord) {
  sponsors.push(record);
}

export function getSponsors() {
  return sponsors.slice().reverse();
}

function computeProspectScore(record: Omit<ProspectRecord, "id" | "score" | "status" | "createdAt">): {
  score: number;
  segment?: string;
} {
  let score = 0;
  let segment: string | undefined;

  if (record.source.includes("Registration")) {
    score += 40;
    segment = "Registration";
  } else if (record.source.includes("Quote")) {
    score += 35;
    segment = "Quote";
  } else if (record.source.includes("Contact")) {
    score += 25;
    segment = "Contact";
  } else if (record.source.includes("Brochure")) {
    score += 20;
    segment = "Brochure";
  } else if (record.source.includes("LMS")) {
    score += 30;
    segment = "LMS";
  }

  if (record.marketingOptIn) score += 10;
  if (record.courseInterest) score += 10;
  if (record.company) score += 5;
  if (record.role && /head|director|manager|lead/i.test(record.role)) {
    score += 10;
  }

  return { score, segment };
}

export function addProspect(
  record: Omit<ProspectRecord, "id" | "score" | "status" | "createdAt"> & {
    status?: ProspectStatus;
  },
) {
  const createdAt = new Date().toISOString();
  const base: Omit<ProspectRecord, "id" | "score" | "status" | "createdAt"> = {
    name: record.name,
    email: record.email,
    phone: record.phone,
    company: record.company,
    role: record.role,
    city: record.city,
    courseInterest: record.courseInterest,
    source: record.source,
    stage: record.stage,
    marketingOptIn: record.marketingOptIn,
    tags: record.tags,
    segment: record.segment,
    summary: record.summary,
    lastActivityAt: record.lastActivityAt,
  };

  const { score, segment } = computeProspectScore(base);

  const prospect: ProspectRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ...base,
    score,
    segment: base.segment || segment,
    status: record.status || "new",
    createdAt,
  };

  prospects.push(prospect);
}

export function getProspects(status?: ProspectStatus) {
  const list = status
    ? prospects.filter((p) => p.status === status)
    : prospects;
  return list.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function updateProspectStatus(id: string, status: ProspectStatus) {
  const found = prospects.find((p) => p.id === id);
  if (found) {
    found.status = status;
    found.lastActivityAt = new Date().toISOString();
  }
}
