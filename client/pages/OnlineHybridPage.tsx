import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { SectionImage } from "@/components/SectionImage";
import { COURSE_CATALOG } from "@shared/courseData";

export default function OnlineHybridPage() {
  const topCourses = COURSE_CATALOG.slice(0, 6);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Online & Hybrid Training</h1>
          <p className="text-muted-foreground">
            Flexible learning options for global teams, delivered live or blended with in‑person sessions.
          </p>
        </div>
      </section>

      {/* ONLINE/HYBRID IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="/images/site/online-hybrid.svg"
            alt="Professional participating in video training call from modern home office with laptop"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Live Online</h2>
            <p className="text-sm text-muted-foreground">Instructor‑led sessions, real‑time Q&A, and interactive labs.</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Hybrid</h2>
            <p className="text-sm text-muted-foreground">Combine on‑site facilitation with remote attendance for distributed teams.</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">On‑Demand</h2>
            <p className="text-sm text-muted-foreground">Self‑paced access to materials, assessments, and certificates.</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30 border-y border-border">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Popular Courses for Online Delivery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCourses.map((course) => (
              <div key={course.id} className="bg-background border border-border rounded-xl p-6">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-primary hover:underline text-sm font-semibold"
                >
                  View Course →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container flex flex-col sm:flex-row gap-4">
          <Link
            to="/register-enterprise"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
          >
            Request Custom Delivery
          </Link>
          <Link
            to="/lms"
            className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold"
          >
            Explore LMS
          </Link>
        </div>
      </section>
    </Layout>
  );
}
