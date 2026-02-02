import Layout from "@/components/Layout";
import { SectionImage } from "@/components/SectionImage";
import SponsorInterestForm from "@/components/SponsorInterestForm";

export default function SponsorPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Sponsorship Opportunities</h1>
          <p className="text-muted-foreground">
            Partner with Knowledge Camp Global to support high-impact programs and events.
          </p>
        </div>
      </section>

      {/* SPONSORS IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="/images/site/sponsors.svg"
            alt="Corporate team reviewing partnership materials in premium executive boardroom environment"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-background border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Sponsorship Tiers</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><strong>Gold:</strong> Premium brand placement, keynote mentions, VIP access.</li>
              <li><strong>Silver:</strong> Brand placement, session mentions, partner listing.</li>
              <li><strong>Bronze:</strong> Event materials placement, partner listing.</li>
              <li><strong>Custom:</strong> Tailored sponsorship packages.</li>
            </ul>
          </div>
          <div className="bg-background border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Submit Interest</h2>
            <SponsorInterestForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
