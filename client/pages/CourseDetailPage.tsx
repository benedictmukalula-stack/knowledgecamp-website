import Layout from "@/components/Layout";
import { CoursePricingTab } from "@/components/CoursePricingTab";
import { CourseContentAccordion } from "@/components/CourseContentAccordion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  Laptop,
  ChevronDown,
  MessageCircle,
  Building2,
  ArrowRight,
} from "lucide-react";
import { COURSE_CATALOG, CourseLocation, getCourseImage } from "@shared/courseData";

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = COURSE_CATALOG.find((c) => c.id === id);
  // For demo: early bird if course starts within 30 days, VIP if rating > 4.8

  if (!course) {
    return (
      <Layout>
        <div className="container py-12">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses" className="text-primary hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </Layout>
    );
  }

  const getPriceLabel = (location: CourseLocation): string => {
    switch (location) {
      case "local":
        return "Local (SA)";
      case "africa":
        return "Africa Hubs";
      case "international":
        return "International (Premium)";
    }
  };
  const locationLabel = getPriceLabel(course.location);

  const FAQs = [
    {
      question: "What is the course duration and schedule?",
      answer: `This course runs for ${course.duration} days at ${course.venue}. Classes are held during business hours with scheduled breaks. Exact timing will be confirmed upon registration.`,
    },
    {
      question: "Who should attend this course?",
      answer:
        "This course is designed for professionals looking to develop expertise in this field. It's suitable for both beginners and those with prior experience.",
    },
    {
      question: "What support is provided after the course?",
      answer:
        "All participants receive comprehensive course materials, certificates of completion, and access to our alumni network for ongoing support and updates.",
    },
    {
      question: "Is there a discount for group registrations?",
      answer:
        "Yes! We offer bulk discounts: 3-4 delegates get 10% off, 5-9 delegates get 15% off, and 10+ delegates get 25% off. Contact us for custom pricing.",
    },
    {
      question: "What happens if I can't attend?",
      answer:
        "We understand that circumstances change. Contact us to discuss options including rescheduling to a future session or requesting a refund.",
    },
    {
      question: "Still have questions?",
      answer: "Chat with us on WhatsApp for instant answers from our training specialists.",
    },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
            <span>/</span>
            <Link to="/courses" className="text-primary hover:underline">
              Courses
            </Link>
            <span>/</span>
            <span className="text-muted-foreground">{course.title}</span>
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <section className="py-8 md:py-10 bg-muted">
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-8">
              <div className="relative rounded-2xl overflow-hidden bg-muted/40 border border-border/60">
                <img
                  src={getCourseImage(course.category)}
                  alt={course.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
                <div className="relative p-6 md:p-8 space-y-4 text-white">
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      to={`/courses?category=${encodeURIComponent(course.category)}`}
                      className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors"
                    >
                      {course.category}
                    </Link>
                    <span className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold">
                      {locationLabel}
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold">
                      <Laptop className="h-4 w-4" />
                      {course.pricing.laptopIncluded ? "Laptop Included" : "Laptop Optional"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                      {course.title}
                    </h1>
                    <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
                      {course.description}
                    </p>
                  </div>

                  {course.learningOutcomes?.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-white/90 max-w-2xl">
                      {course.learningOutcomes.slice(0, 3).map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-secondary" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap items-center gap-6 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      <span>
                        {course.rating.toFixed(1)} ({course.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>{course.duration} Days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>Max {course.maxParticipants} Participants</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course details accordion inside hero band, aligned under title */}
              <CourseContentAccordion course={course} />
            </div>

            {/* Quick Info Box + Instructor (hero band right column) */}
            <div className="space-y-6 h-fit sticky top-24">
              <div className="bg-card text-card-foreground shadow-lg rounded-xl p-8 border border-border">
                <div className="text-center mb-6">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Course booking</p>
                  <p className="text-xl font-semibold">Pricing &amp; Registration</p>
                </div>

                <div className="mt-2">
                  <CoursePricingTab course={course} />
                </div>
              </div>

              <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Meet Your Instructor</h2>
                <p className="font-medium mb-1">{course.instructor}</p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {course.instructorBio}
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center px-4 py-2 text-sm border border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors"
                >
                  Contact Instructor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IN-HOUSE TRAINING CTA */}
      <section className="py-12 md:py-16 bg-background border-t border-border">
        <div className="container">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need This Privately?
              </h2>
              <p className="text-muted-foreground mb-6">
                Customize this course for your organization. We'll adapt the content, schedule, and delivery method to match your team's specific needs.
              </p>
              <Link
                to="/in-house"
                className="inline-flex items-center px-8 py-3 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
              >
                Request In-House Quote
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Building2 className="h-24 w-24 text-secondary/30 flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 md:py-16 bg-muted/30 border-t border-border">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10 text-sm md:text-base">
            Quick answers to common questions about registrations, payments, venues and certificates. For anything more specific, our team will support you directly.
          </p>

          <div className="space-y-4">
            {FAQs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border rounded-lg overflow-hidden bg-background"
              >
                <summary className="px-6 py-4 cursor-pointer hover:bg-muted/30 transition-colors flex items-center justify-between font-semibold">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                </summary>
                <div className="bg-muted/30 px-6 py-4 border-t border-border text-muted-foreground text-sm md:text-base leading-relaxed">
                  {index === FAQs.length - 1 ? (
                    <div className="space-y-4">
                      <p>{faq.answer}</p>
                      <p>
                        If you prefer a quick response or need help finalising a registration, you can also reach us on WhatsApp.
                      </p>
                      <a
                        href="https://wa.me/27833910863"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Chat on WhatsApp
                      </a>
                    </div>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
