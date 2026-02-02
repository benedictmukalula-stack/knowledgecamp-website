import Layout from "@/components/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
          <p className="text-muted-foreground max-w-2xl">
            These Terms &amp; Conditions govern your use of Knowledge Camp Global
            services, including course registrations, events, and digital
            products. By registering for a course or using our website, you
            agree to these terms.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl text-sm text-muted-foreground space-y-6">
          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              1. Bookings and Confirmations
            </h2>
            <p>
              A booking is confirmed once you submit a registration form and
              receive a confirmation email or invoice from Knowledge Camp Global.
              We reserve the right to accept or decline any registration. Places
              on public courses are limited and allocated on a first-come,
              first-served basis.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              2. Fees, Invoices and Payments
            </h2>
            <p>
              Course fees are stated in South African Rand (ZAR) unless
              otherwise noted. Fees are payable by card, EFT, or approved
              corporate payment methods. Where an invoice is issued, payment is
              due by the date shown on the invoice. We may withhold access to a
              course, certificate, or learning materials if payment has not been
              received.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              3. Cancellations, Transfers and Substitutions
            </h2>
            <p>
              If you need to cancel or move a booking, please notify us in
              writing as soon as possible. Where permitted by the specific
              course offer, you may:
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Substitute a delegate from the same organisation at no cost.</li>
              <li>
                Transfer to a later session, subject to availability and any
                price differences.
              </li>
              <li>
                Cancel within the timelines stated on your proposal or invoice.
              </li>
            </ul>
            <p className="mt-2">
              We reserve the right to reschedule, move online, or cancel a
              course where required (for example, if minimum delegate numbers
              are not met). In such cases we will offer an alternative date or a
              credit note.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              4. Learning Materials and Intellectual Property
            </h2>
            <p>
              All course materials, slides, workbooks, videos and digital
              content remain the intellectual property of Knowledge Camp Global
              and our trainers. You receive a personal, non-transferable licence
              to use these materials for your own learning. You may not
              reproduce, distribute or publish the content without our written
              permission.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              5. Attendee Responsibilities
            </h2>
            <p>
              Delegates are responsible for ensuring they meet any stated entry
              requirements and that they have suitable connectivity and
              equipment for online or hybrid sessions. For in-person events,
              delegates must comply with venue rules, health and safety
              protocols, and reasonable instructions from facilitators.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              6. Certificates and Assessment
            </h2>
            <p>
              Where a course includes assessment or attendance requirements,
              certificates may be issued only to delegates who meet the stated
              criteria. Knowledge Camp Global reserves the right to withhold a
              certificate where participation, conduct or payment terms are not
              met.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              7. Data Protection and Communications
            </h2>
            <p>
              We process personal information in line with our Privacy Policy
              and applicable data protection laws. By registering, you consent
              to us contacting you about your booking and related service
              updates. You can separately choose whether to receive marketing
              communications such as training calendars and promotions.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              8. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by law, Knowledge Camp Global shall not be
              liable for any indirect, consequential or special loss arising out
              of your participation in a course. Our total aggregate liability
              for any claim is limited to the amount of fees actually paid for
              the affected course.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              9. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of the
              Republic of South Africa. Any disputes will be subject to the
              jurisdiction of the South African courts, without prejudice to any
              mandatory protections that may apply under other laws.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-2">
              10. Contact
            </h2>
            <p>
              If you have questions about these terms, please contact
              <a
                href="mailto:info@knowledgecamp.co.za"
                className="text-primary hover:underline ml-1"
              >
                info@knowledgecamp.co.za
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </Layout>
  );
}
