import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarChart3, BookOpen, Award, TrendingUp, Plus } from "lucide-react";

interface PartnerRecord {
  name: string;
  email: string;
  company: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface SponsorRecord {
  name: string;
  email: string;
  company: string;
  tier: string;
  createdAt: string;
}

type ProspectStatus = "new" | "contacted" | "qualified" | "closed";

interface ProspectRecord {
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
  status: ProspectStatus;
  createdAt: string;
  lastActivityAt?: string;
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<{
    registrations: number;
    quotes: number;
    partnersPending: number;
    sponsors: number;
    totalRevenue: number;
    recentRegistrations: Array<{
      name: string;
      email: string;
      courseTitle: string;
      pricingTotal: number;
      createdAt: string;
      referralCode?: string;
      marketingOptIn?: boolean;
    }>;
  } | null>(null);
  const [partners, setPartners] = useState<PartnerRecord[]>([]);
  const [sponsors, setSponsors] = useState<SponsorRecord[]>([]);
  const [prospects, setProspects] = useState<ProspectRecord[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/summary")
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch(() => setSummary(null));
    fetch("/api/dashboard/partners")
      .then((res) => res.json())
      .then((data) => setPartners(data.partners || []))
      .catch(() => setPartners([]));
    fetch("/api/dashboard/sponsors")
      .then((res) => res.json())
      .then((data) => setSponsors(data.sponsors || []))
      .catch(() => setSponsors([]));

    fetch("/api/dashboard/prospects")
      .then((res) => res.json())
      .then((data) => setProspects(data.prospects || []))
      .catch(() => setProspects([]));
  }, []);

  const handlePartnerAction = (email: string, status: "approved" | "rejected") => {
    fetch("/api/partnership/approval", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, status }),
    })
      .then((res) => res.json())
      .then(() => {
        setPartners((prev) =>
          prev.map((p) => (p.email === email ? { ...p, status } : p))
        );
      })
      .catch(() => {
        // no-op
      });
  };

  const handleProspectStatus = (id: string, status: ProspectStatus) => {
    fetch("/api/dashboard/prospects/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
      .then((res) => res.json())
      .then(() => {
        setProspects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status } : p)),
        );
      })
      .catch(() => {
        // ignore
      });
  };

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Your Learning Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your progress and manage your courses
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="bg-muted/30 border border-border rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Recent Registrations</h2>
            {summary?.recentRegistrations?.length ? (
              <div className="space-y-3">
                {summary.recentRegistrations.map((reg, idx) => (
                  <div
                    key={`${reg.email}-${idx}`}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-border rounded-lg p-4"
                  >
                    <div>
                      <p className="font-semibold">{reg.name}</p>
                      <p className="text-sm text-muted-foreground">{reg.courseTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(reg.createdAt).toLocaleString()}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                        {reg.referralCode && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5">
                            Referral: {reg.referralCode}
                          </span>
                        )}
                        {typeof reg.marketingOptIn === "boolean" && (
                          <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5">
                            Marketing: {reg.marketingOptIn ? "Opted in" : "No"}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-semibold md:text-right">
                      ZAR {reg.pricingTotal?.toLocaleString() ?? "0"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No registrations yet.</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/courses"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Browse Courses
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold"
              >
                Enroll Now
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto text-primary mb-3" />
              <p className="text-3xl font-bold mb-1">{summary?.registrations ?? 0}</p>
              <p className="text-muted-foreground text-sm">Registrations</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-secondary mb-3" />
              <p className="text-3xl font-bold mb-1">{summary?.quotes ?? 0}</p>
              <p className="text-muted-foreground text-sm">Quote Requests</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <Award className="h-8 w-8 mx-auto text-primary mb-3" />
              <p className="text-3xl font-bold mb-1">{summary?.partnersPending ?? 0}</p>
              <p className="text-muted-foreground text-sm">Partners Pending</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <Plus className="h-8 w-8 mx-auto text-secondary mb-3" />
              <p className="text-3xl font-bold mb-1">ZAR {summary?.totalRevenue?.toLocaleString() ?? "0"}</p>
              <p className="text-muted-foreground text-sm">Revenue Tracked</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6 text-center">
              <BarChart3 className="h-8 w-8 mx-auto text-secondary mb-3" />
              <p className="text-3xl font-bold mb-1">{summary?.sponsors ?? 0}</p>
              <p className="text-muted-foreground text-sm">Sponsor Leads</p>
            </div>
          </div>

          {/* Partner Approvals */}
          <div className="bg-background border border-border rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">Partner Approvals</h2>
            {partners.length === 0 ? (
              <p className="text-sm text-muted-foreground">No partner applications yet.</p>
            ) : (
              <div className="space-y-3">
                {partners.map((partner) => (
                  <div key={partner.email} className="flex items-center justify-between border border-border rounded-lg p-4">
                    <div>
                      <p className="font-semibold">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{partner.company} • {partner.email}</p>
                      <p className="text-xs text-muted-foreground">Status: {partner.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-2 rounded-md bg-primary text-white text-sm"
                        onClick={() => handlePartnerAction(partner.email, "approved")}
                        disabled={partner.status === "approved"}
                      >
                        Approve
                      </button>
                      <button
                        className="px-3 py-2 rounded-md border border-destructive text-destructive text-sm"
                        onClick={() => handlePartnerAction(partner.email, "rejected")}
                        disabled={partner.status === "rejected"}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sponsor Leads */}
          <div className="bg-background border border-border rounded-xl p-6 mb-12">
            <h2 className="text-xl font-bold mb-4">Sponsor Leads</h2>
            {sponsors.length === 0 ? (
              <p className="text-sm text-muted-foreground">No sponsor leads yet.</p>
            ) : (
              <div className="space-y-3">
                {sponsors.map((sponsor, idx) => (
                  <div key={`${sponsor.email}-${idx}`} className="border border-border rounded-lg p-4">
                    <p className="font-semibold">{sponsor.name}</p>
                    <p className="text-sm text-muted-foreground">{sponsor.company} • {sponsor.email}</p>
                    <p className="text-xs text-muted-foreground">Tier: {sponsor.tier}</p>
                    <p className="text-xs text-muted-foreground">{new Date(sponsor.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prospects admin view */}
            <div className="bg-background border border-border rounded-xl p-6 mb-12 lg:mb-0">
              <h2 className="text-xl font-bold mb-4">Prospects</h2>
              {prospects.length === 0 ? (
                <p className="text-sm text-muted-foreground">No prospects captured yet.</p>
              ) : (
                <div className="space-y-3 max-h-80 overflow-auto">
                  {prospects.map((p) => (
                    <div
                      key={p.id}
                      className="border border-border rounded-lg p-3 text-sm flex flex-col gap-2"
                    >
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-semibold">
                            {p.name || p.email || "Unknown"}
                          </p>
                          {p.email && (
                            <p className="text-xs text-muted-foreground">{p.email}</p>
                          )}
                          {p.company && (
                            <p className="text-xs text-muted-foreground">{p.company}</p>
                          )}
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <div>Score: {p.score}</div>
                          {p.segment && <div>{p.segment}</div>}
                          <div className="mt-1">{p.status}</div>
                        </div>
                      </div>
                      {p.courseInterest && (
                        <div className="text-xs text-muted-foreground">
                          Course interest: {p.courseInterest}
                        </div>
                      )}
                      <div className="text-[11px] text-muted-foreground flex flex-wrap gap-1">
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5">
                          {p.stage || "prospect"}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5">
                          {p.source}
                        </span>
                        {p.tags?.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded-full bg-muted px-2 py-0.5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button
                          className="px-2 py-1 rounded-md bg-primary text-white text-xs"
                          onClick={() => handleProspectStatus(p.id, "contacted")}
                          disabled={p.status === "contacted"}
                        >
                          Mark contacted
                        </button>
                        <button
                          className="px-2 py-1 rounded-md bg-emerald-600 text-white text-xs"
                          onClick={() => handleProspectStatus(p.id, "qualified")}
                          disabled={p.status === "qualified"}
                        >
                          Mark qualified
                        </button>
                        <button
                          className="px-2 py-1 rounded-md border border-border text-xs"
                          onClick={() => handleProspectStatus(p.id, "closed")}
                          disabled={p.status === "closed"}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Upcoming Features */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Dashboard Features</h2>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 flex gap-4">
                  <Plus className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Course Progress Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor your progress in each course with detailed metrics and milestones
                    </p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4 flex gap-4">
                  <Plus className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Performance Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      View comprehensive analytics of your learning patterns and achievements
                    </p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4 flex gap-4">
                  <Plus className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Certificate Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Download and manage your earned certificates and credentials
                    </p>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-4 flex gap-4">
                  <Plus className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Personalized Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Get course recommendations based on your learning history
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expected Features */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What's Coming Next</h2>
              <div className="bg-muted/30 border border-border rounded-lg p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Real-time progress notifications</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Discussion forums and peer interaction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Downloadable course materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Direct instructor messaging</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Mobile app access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Advanced quiz and assessment tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
