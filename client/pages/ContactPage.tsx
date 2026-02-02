import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { SectionImage } from "@/components/SectionImage";

export default function ContactPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl">
            Reach out to our training advisors for guidance, scheduling, or custom programs.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container space-y-10">
          <SectionImage
            src="/images/site/contact.svg"
            alt="Modern professional office reception area representing Knowledge Camp Global headquarters"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-background border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Email: info@knowledgecamp.co.za<br />
                Phone (SA): +27 11 568 6712<br />
                WhatsApp (SA): +27 83 391 0863<br />
                WhatsApp (Zambia): +260 779 721 772<br />
                Hours: Mon–Fri, 08:00–17:00 (SAST)
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Newsletter & updates: subscribe@knowledgecamp.co.za
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Our team responds within one business day.
              </p>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="font-semibold">Head Office (South Africa)</p>
                <p>
                  14 Crawford Manor, Douglasdale, Sandton, Johannesburg, 2191<br />
                  Republic of South Africa (HEAD OFFICE)
                </p>
                <p className="font-semibold mt-4">Zambia Branch</p>
                <p>
                  183, Ibex Hill, Lusaka, 10101<br />
                  Zambia (ZAMBIA BRANCH)
                </p>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
