import Layout from "@/components/Layout";
import { SectionImage } from "@/components/SectionImage";

export default function AboutPage() {
  return (
    <Layout>
      <section
        id="about"
        className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16"
      >
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">About Knowledge Camp Global</h1>
          <p className="text-muted-foreground max-w-2xl">
            We deliver professional training and skills development across Africa and globally, helping teams grow with practical, industry‑aligned learning.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container space-y-10">
          <SectionImage
            src="/images/site/about.svg"
            alt="Experienced facilitator leading a diverse group of professionals in a modern boardroom-style training session"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-background border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">Our Mission</h2>
              <p className="text-sm text-muted-foreground">
                Build future‑ready teams through high‑impact, hands‑on training that turns theory into practical capability on the job.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">Our Approach</h2>
              <p className="text-sm text-muted-foreground">
                Practical, instructor‑led programs designed with industry experts, real‑world case studies and tools that delegates can reuse back at work.
              </p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-2">Our Reach</h2>
              <p className="text-sm text-muted-foreground">
                Training hubs across South Africa, wider Africa and selected international cities, with classroom, virtual and hybrid delivery options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section id="methodology" className="py-12 md:py-16 bg-muted/30 border-t border-border">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Training Methodology</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Every Knowledge Camp Global programme is designed to be practical, facilitated and business‑ready. We blend proven adult‑learning principles with the realities of busy professionals who need tools they can use immediately.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li>
                • <span className="font-semibold">Discovery first:</span> we clarify objectives, current challenges and success measures with your team before finalising the agenda.
              </li>
              <li>
                • <span className="font-semibold">Real scenarios:</span> case studies, examples and exercises are drawn from African and global contexts, not generic textbooks.
              </li>
              <li>
                • <span className="font-semibold">Learn–apply–reflect cycles:</span> concepts are introduced in short bursts, followed by application in exercises, role‑plays or tools.
              </li>
              <li>
                • <span className="font-semibold">Action plans:</span> each delegate leaves with a clear set of next steps and templates they can reuse with their own teams.
              </li>
              <li>
                • <span className="font-semibold">Post‑course support:</span> optional follow‑up clinics, coaching and assessments help embed skills beyond the classroom.
              </li>
            </ul>
          </div>
          <div className="bg-background border border-border rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold">How we design programmes</h3>
            <ol className="list-decimal list-inside text-sm md:text-base text-muted-foreground space-y-1">
              <li>Define the problem and learning outcomes with stakeholders.</li>
              <li>Map outcomes to modules, exercises and assessments.</li>
              <li>Adapt timing and delivery (classroom, virtual, hybrid, in‑house) to your context.</li>
              <li>Agree measurement: feedback scores, knowledge checks and behaviour indicators.</li>
              <li>Refine based on pilot feedback and post‑course evaluations.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Trainers & Faculty */}
      <section id="trainers" className="py-12 md:py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trainers &amp; Faculty</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Our programmes are delivered by experienced practitioners who combine technical expertise with strong facilitation skills. Most have led teams, projects and business units, and bring that experience into the room.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li>• 10+ years average professional and leadership experience.</li>
              <li>• Exposure across South African, wider African and international markets.</li>
              <li>• Proven track record delivering training to mixed‑level groups, from emerging leaders to senior executives.</li>
              <li>• Commitment to inclusive, respectful and practical learning environments.</li>
            </ul>
          </div>
          <div className="bg-background border border-border rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-bold">What delegates can expect</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Sessions are interactive and conversational, with space for questions, examples from your organisation and real feedback from facilitators. Trainers provide practical tools, job aids and checklists that delegates can take back to their teams.
            </p>
          </div>
        </div>
      </section>

      {/* Quality & Standards */}
      <section id="quality" className="py-12 md:py-16 bg-muted/30 border-y border-border">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Quality &amp; Standards</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Quality is built into every stage of our delivery cycle — from needs analysis and design through to facilitation and evaluation.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li>• Standardised course blueprints and facilitator guides for consistent outcomes.</li>
              <li>• Curated pre‑course reading and templates aligned with each programme.</li>
              <li>• Delegate feedback and facilitator performance reviews after every run.</li>
              <li>• Regular content refresh cycles to keep examples, regulations and technologies current.</li>
            </ul>
          </div>
          <div className="bg-background border border-border rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-bold">Governance and risk</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              We follow clear policies for data protection, health and safety at venues, trainer vetting, and ethical marketing. Programme documentation can be shared with your L&amp;D, procurement or risk teams on request as part of your internal approval process.
            </p>
          </div>
        </div>
      </section>

      {/* Clients & Sectors */}
      <section id="clients" className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Clients &amp; Sectors</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Knowledge Camp Global supports organisations of different sizes — from small specialist firms to large enterprises and public sector institutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-muted-foreground">
              <ul className="space-y-2">
                <li>• Financial services and insurance</li>
                <li>• Energy, utilities and infrastructure</li>
                <li>• Engineering and manufacturing</li>
                <li>• Logistics, ports and maritime</li>
                <li>• ICT, digital and telecoms</li>
              </ul>
              <ul className="space-y-2">
                <li>• Government and state‑owned entities</li>
                <li>• Healthcare and pharmaceuticals</li>
                <li>• Education and non‑profit organisations</li>
                <li>• Professional services and consulting</li>
                <li>• Hospitality and tourism</li>
              </ul>
            </div>
          </div>
          <div className="bg-background border border-border rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-bold">Where we deliver</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              We deliver public and in‑house programmes across South African hubs (Johannesburg, Pretoria, Durban, Cape Town), wider Africa hubs and selected international cities. Many programmes are also available online or in hybrid formats for distributed teams.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications & CPDs */}
      <section id="certifications" className="py-12 md:py-16 bg-muted/30 border-y border-border">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Certifications &amp; CPDs</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Delegates who successfully complete a Knowledge Camp Global course receive a Certificate of Completion confirming their participation, learning outcomes and course hours.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
              <li>• Certificates include delegate details, course title, dates and duration.</li>
              <li>• For in‑house and enterprise programmes, certificates can be branded with your organisation details where agreed.</li>
              <li>• Many programmes are suitable for use towards internal CPD requirements or professional development logs.</li>
            </ul>
          </div>
          <div className="bg-background border border-border rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-bold">How CPD works</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Different professional bodies and employers have their own CPD rules. On request, we can provide course outlines, learning outcomes and attendance records so that delegates can submit activities for recognition through their own professional body or internal CPD process.
            </p>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-12 md:py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Careers at Knowledge Camp Global</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              We collaborate with facilitators, instructional designers and support staff who are passionate about skills development and client impact.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-muted-foreground mb-4">
              <li>• Experienced trainers and subject‑matter experts across our core categories.</li>
              <li>• Learning designers and coordinators who can translate business needs into programmes.</li>
              <li>• Client success and operations roles supporting our training hubs and LMS.</li>
            </ul>
            <p className="text-sm md:text-base text-muted-foreground">
              To express interest, share your profile, CV and areas of expertise with our team at <a href="mailto:careers@knowledgecamp.co.za" className="text-primary underline">careers@knowledgecamp.co.za</a>. We review submissions on a rolling basis and will contact you when there is a suitable opportunity.
            </p>
          </div>
          <div className="bg-background border border-border rounded-xl p-6 space-y-3">
            <h3 className="text-lg font-bold">Working with us</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Many of our trainers work with us on a freelance or associate basis, allowing them to balance delivery, consulting and other professional commitments. We provide curriculum frameworks, facilitation support and feedback so that every programme meets our delivery standard.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
