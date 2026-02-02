import Layout from "@/components/Layout";
import { SectionImage } from "@/components/SectionImage";
import FAQ from "@/components/FAQ";
import { FAQ_KNOWLEDGE_BASE } from "../../shared/faq";

export default function FAQPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-2xl">
            Find answers about registration, pricing, delivery options, and certificates.
          </p>
        </div>
      </section>

      {/* FAQ IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="/images/site/faq.svg"
            alt="Professional support agent helping customers with clear answers and accessible support"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          {(() => {
            const grouped = FAQ_KNOWLEDGE_BASE.reduce<Record<string, { question: string; answer: string }[]>>(
              (acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push({ question: item.question, answer: item.answer });
                return acc;
              },
              {}
            );

            return Object.entries(grouped).map(([category, faqs]) => (
              <div key={category} className="mb-12 last:mb-0">
                <FAQ title={category} faqs={faqs} />
              </div>
            ));
          })()}
        </div>
      </section>
    </Layout>
  );
}
