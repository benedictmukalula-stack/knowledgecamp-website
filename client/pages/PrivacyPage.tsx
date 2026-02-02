import Layout from "@/components/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl">
            We respect your privacy and handle personal information in line with
            South Africa&apos;s Protection of Personal Information Act (POPIA) and
            other applicable data protection laws.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl text-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              1. Who we are
            </h2>
            <p>
              Knowledge Camp Global provides professional training, learning and
              development services. This Privacy Policy explains how we collect,
              use, store and protect personal information about delegates,
              clients, prospects and website visitors.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              2. Information we collect
            </h2>
            <p>We may collect and process the following types of data:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>
                Contact details such as name, email address, phone number and
                job title.
              </li>
              <li>
                Company information such as organisation name, sector and
                billing details.
              </li>
              <li>
                Course and registration data, including programmes attended,
                dates, attendance, assessment results and certificates issued.
              </li>
              <li>
                Communication preferences, marketing opt-ins and interaction
                history.
              </li>
              <li>
                Technical data such as IP address, device details and basic
                analytics to help us improve our website.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              3. How we use your information
            </h2>
            <p>We use personal information to:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>process registrations and manage course attendance;</li>
              <li>
                issue invoices, certificates and other documents related to your
                training;
              </li>
              <li>
                communicate important updates about your booking, schedule or
                learning platform access;
              </li>
              <li>
                send training calendars, news and special offers where you have
                opted in to marketing;
              </li>
              <li>
                maintain internal records, reporting and service quality;
              </li>
              <li>
                comply with legal, regulatory and audit requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              4. Legal bases for processing
            </h2>
            <p>
              We process personal information on one or more of the following
              bases: performance of a contract (for example delivering a
              training course you registered for), compliance with legal
              obligations, legitimate interests (such as improving our services)
              and your consent for specific marketing activities.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              5. Sharing your data
            </h2>
            <p>
              We do not sell your personal information. We may share data with
              trusted service providers who help us deliver our services, such
              as payment processors, email and CRM platforms, learning
              management systems and venue partners. These providers are
              required to protect your information and may only use it as
              instructed by us.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              6. International transfers and retention
            </h2>
            <p>
              Some of our service providers may be located outside South Africa.
              Where personal information is transferred across borders, we take
              reasonable steps to ensure that appropriate safeguards are in
              place. We keep personal information only for as long as necessary
              to fulfil the purposes described in this policy or to meet legal
              and reporting requirements.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              7. Your rights
            </h2>
            <p>
              Under POPIA and other data protection laws you may have the right
              to:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>request access to the personal information we hold;</li>
              <li>ask us to correct or update inaccurate information;</li>
              <li>
                object to certain types of processing, including direct
                marketing;
              </li>
              <li>
                request deletion of information where it is no longer required
                or where consent is withdrawn.
              </li>
            </ul>
            <p className="mt-2">
              To exercise these rights, please contact us using the details
              below. We may need to verify your identity before responding.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              8. Marketing preferences
            </h2>
            <p>
              You are always in control of whether you receive marketing
              communications from us. You can update your preferences or opt
              out at any time by using the unsubscribe link in our emails or by
              contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              9. Contact and complaints
            </h2>
            <p>
              If you have questions about this policy or how we handle personal
              information, please email
              <a
                href="mailto:privacy@knowledgecamp.co.za"
                className="text-primary hover:underline ml-1"
              >
                privacy@knowledgecamp.co.za
              </a>
              . We aim to respond to privacy queries within 5 working days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              10. Updates to this policy
            </h2>
            <p>
              This policy is effective from 1 February 2026. We may update it
              from time to time and will post the latest version on this page.
            </p>
          </section>
        </div>
      </section>
    </Layout>
  );
}
