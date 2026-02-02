import React, { useState } from "react";
import type { CourseSchedule } from "@shared/courseData";

interface CourseContentAccordionProps {
  course: CourseSchedule;
}

interface PanelConfig {
  id: string;
  title: string;
  render: () => React.ReactNode;
}

export function CourseContentAccordion({ course }: CourseContentAccordionProps) {
  const [openPanel, setOpenPanel] = useState<string>("overview");

  const panels: PanelConfig[] = [
    {
      id: "overview",
      title: "Overview & Benefits",
      render: () => (
        <div className="space-y-6 text-sm md:text-base">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Course Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              This course is designed to equip professionals with practical, job-ready skills and
              strategic understanding aligned to current industry standards and organisational
              realities. It blends theory, real-world application, and guided practice, ensuring
              participants leave with the confidence and competence to apply learning immediately in
              their roles.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The programme is structured to support individual professional growth while delivering
              measurable organisational value, making it suitable for both public programmes and
              in-house delivery.
            </p>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2">Delegate Benefits</h4>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Strengthen confidence in applying best-practice tools and frameworks</li>
              <li>Improve day-to-day decision-making and problem-solving</li>
              <li>Enhance professional credibility and career progression potential</li>
              <li>Gain practical templates and examples that can be used immediately</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2">Organisational Benefits</h4>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Improved quality, consistency and reliability of work outputs</li>
              <li>Reduced operational and compliance risk</li>
              <li>Stronger internal capability without over-reliance on external consultants</li>
              <li>Alignment of teams with organisational goals, standards and frameworks</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2">Learning Methodology</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The course is delivered using facilitator-led, interactive sessions designed for
              experienced professionals.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Real-world case studies and scenarios</li>
              <li>Group discussions and collaborative exercises</li>
              <li>Practical tools, checklists and frameworks</li>
              <li>Guided reflection and application to delegates' own contexts</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2">Integration &amp; Application</h4>
            <p className="text-muted-foreground leading-relaxed">
              Delegates are encouraged to apply learning immediately within their work
              environment. Organisations can integrate the course outputs into existing
              performance, compliance or capability-building frameworks.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "outcomes",
      title: "Learning Outcomes",
      render: () => (
        <div className="space-y-4 text-sm md:text-base">
          <p className="text-muted-foreground leading-relaxed">
            By the end of this course, delegates will be able to:
          </p>
          <ul className="space-y-2">
            {course.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "curriculum",
      title: "Course Curriculum",
      render: () => (
        <div className="space-y-4 text-sm md:text-base">
          <p className="text-muted-foreground leading-relaxed">
            The curriculum is structured into modules that build from foundations to application. A
            typical outline includes:
          </p>
          <div className="space-y-3">
            {course.curriculum.map((section, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-muted/10"
              >
                <div className="px-4 py-2 bg-muted/40 font-semibold">
                  Module {index + 1}: {section.module}
                </div>
                <div className="px-4 py-3">
                  <ul className="space-y-1.5 text-muted-foreground">
                    {section.topics.map((topic, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "audience",
      title: "Who Should Attend & Requirements",
      render: () => (
        <div className="space-y-6 text-sm md:text-base">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Who Should Attend</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              This course is suitable for professionals who need to strengthen both practical and
              strategic capability in this subject area, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Supervisors, team leaders, and middle managers</li>
              <li>Specialists and practitioners working within the domain</li>
              <li>Managers responsible for oversight, quality, or compliance</li>
              <li>Professionals preparing for expanded responsibilities or promotion</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2">Pre-Course Requirements</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">
              To maximise learning outcomes, delegates are expected to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Have basic professional experience in a related role or environment</li>
              <li>Possess general literacy and numeracy skills</li>
              <li>Be willing to participate actively in discussions and exercises</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Where applicable, short pre-course reading or reflection tasks may be shared ahead of
              the programme.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "certification",
      title: "Certification & Accreditation",
      render: () => (
        <div className="space-y-6 text-sm md:text-base">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Certification</h3>
            <p className="text-muted-foreground leading-relaxed">
              Delegates who attend and successfully complete the course receive a
              <span className="font-medium"> Knowledge Camp Global Certificate of Completion</span>,
              confirming participation in a structured professional development programme.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This may be used for CPD records, internal training recognition, or inclusion in
              professional portfolios.
            </p>
          </div>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">Accreditation</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The course content is aligned with recognised industry standards and best practices
              and is designed to support organisational compliance and capability-building
              frameworks.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Where formal external accreditation or CPD points apply, this will be clearly stated
              on the published course information and joining instructions.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Course Details</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Explore the structure, learning outcomes and practical details of this course. Expand
            the sections below for a concise, executive overview.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {panels.map((panel) => {
          const isOpen = openPanel === panel.id;
          return (
            <div
              key={panel.id}
              className="border border-border rounded-xl bg-card overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenPanel(isOpen ? "" : panel.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/60 transition-colors"
              >
                <span className="font-semibold text-sm md:text-base">{panel.title}</span>
                <span
                  className={`ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border text-xs transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ›
                </span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-border bg-background/60">
                  {panel.render()}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        When you are ready to proceed, use the Pricing &amp; Registration panel to select dates,
        configure your cohort and request registration or an invoice.
      </p>
    </div>
  );
}
