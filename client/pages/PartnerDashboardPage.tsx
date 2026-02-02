import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ReferralRecord {
  code: string;
  courseTitle?: string;
  email?: string;
  createdAt: string;
}

export default function PartnerDashboardPage() {
  const [partnerCode, setPartnerCode] = useState("");
  const [partnerEmail, setPartnerEmail] = useState("");
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/referrals")
      .then((res) => res.json())
      .then((data) => setReferrals(data.referrals || []))
      .catch(() => setReferrals([]));
  }, []);

  const referralPath = partnerCode
    ? `/register?ref=${encodeURIComponent(partnerCode)}`
    : "";

  const referralLink = typeof window !== "undefined" && referralPath
    ? `${window.location.origin}${referralPath}`
    : "";

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Partner Dashboard</h1>
          <p className="text-muted-foreground">Manage referrals and track performance</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Partner Code</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value)}
                  placeholder="Enter your partner code"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Partner Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder="partner@example.com"
                />
              </div>
              {referralLink && (
                <div className="bg-muted/30 border border-border rounded-lg p-3 text-sm">
                  {referralLink}
                </div>
              )}
              <Link
                to={referralPath || "/register"}
                className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg"
              >
                Test Referral Link
              </Link>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Recent Referrals</h2>
            {referrals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No referrals tracked yet.</p>
            ) : (
              <div className="space-y-3">
                {referrals.map((ref, idx) => (
                  <div key={`${ref.code}-${idx}`} className="border border-border rounded-lg p-4">
                    <p className="font-semibold">Code: {ref.code}</p>
                    <p className="text-sm text-muted-foreground">Course: {ref.courseTitle || "N/A"}</p>
                    <p className="text-sm text-muted-foreground">Email: {ref.email || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(ref.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
