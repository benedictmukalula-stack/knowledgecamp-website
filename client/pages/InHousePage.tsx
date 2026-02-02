import Layout from "@/components/Layout";
import { SectionImage } from "@/components/SectionImage";
import QuoteForm from "@/components/QuoteForm";

export default function InHousePage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">In‑House & Custom Training</h1>
          <p className="text-muted-foreground max-w-2xl">
            Design a tailored program for your organization. Choose the course, delivery format, and location that fit your team.
          </p>
        </div>
      </section>

      {/* IN-HOUSE TRAINING IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="https://images.pexels.com/photos/9034728/pexels-photo-9034728.jpeg"
            alt="Knowledge Camp facilitator leading private corporate training session for organization"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-background border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">What you get</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>✔ Custom curriculum aligned to your objectives</li>
              <li>✔ Flexible delivery: on‑site, online, or hybrid</li>
              <li>✔ Dedicated facilitator and project support</li>
              <li>✔ Group pricing and in‑house discounts</li>
              <li>✔ Certificate of completion for all delegates</li>
            </ul>
          </div>
          <div className="bg-background border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Request a Quote</h2>
            <QuoteForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
