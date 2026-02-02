import Layout from "@/components/Layout";
import { useParams, Link } from "react-router-dom";
import { SectionImage } from "@/components/SectionImage";
import { COURSE_CATALOG, CourseLocation } from "@shared/courseData";
import { useMemo } from "react";

const HUB_CONFIG: Record<string, { title: string; location: CourseLocation; rationale: string; contact: string; contactEmail: string; contactPhone: string }> = {
  sa: {
    title: "South Africa Hub",
    location: "local",
    rationale: "Strategically located training centers across South Africa with experienced facilitators and industry-standard facilities.",
    contact: "Lerato Mokoena",
    contactEmail: "sa-hub@knowledgecamp.co.za",
    contactPhone: "+27 11 555 0199",
  },
  africa: {
    title: "Africa Hub",
    location: "africa",
    rationale: "Regional hubs across Africa’s key business centers, enabling local expertise and pan‑African networking.",
    contact: "Kofi Mensah",
    contactEmail: "africa-hub@knowledgecamp.co.za",
    contactPhone: "+234 1 555 0212",
  },
  international: {
    title: "International Hub",
    location: "international",
    rationale: "Premium global delivery in leading international cities with world‑class trainers and facilities.",
    contact: "Sophie Laurent",
    contactEmail: "global-hub@knowledgecamp.co.za",
    contactPhone: "+44 20 5550 2210",
  },
};

export default function HubPage() {
  const { hub } = useParams<{ hub: string }>();
  const config = hub ? HUB_CONFIG[hub] : null;

  if (!config) {
    return (
      <Layout>
        <section className="py-12 md:py-16">
          <div className="container">
            <h1 className="text-2xl font-bold mb-4">Hub Not Found</h1>
            <Link to="/venues" className="text-primary hover:underline">Back to Hubs</Link>
          </div>
        </section>
      </Layout>
    );
  }

  const courses = useMemo(
    () =>
      COURSE_CATALOG.filter((c) => c.location === config.location)
        .slice()
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
        )
        .slice(0, 6),
    [config.location],
  );

  const avgDaily = useMemo(() => {
    if (!courses.length) return 0;
    const dailyRates = courses.map(
      (c) => c.pricing.basePrice / c.duration,
    );
    const sum = dailyRates.reduce((total, v) => total + v, 0);
    return Math.round(sum / dailyRates.length);
  }, [courses]);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{config.title}</h1>
          <p className="text-muted-foreground max-w-2xl">{config.rationale}</p>
        </div>
      </section>

      {/* HUB IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src={`/images/site/hub-${hub}.svg`}
            alt={`${config.title} professional training venue showcasing world-class facilities`}
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Courses</h2>
            {courses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming courses for this hub.</p>
            ) : (
              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="border border-border rounded-lg p-4">
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.venue} • {course.startDate}</p>
                    <Link to={`/courses/${course.id}`} className="text-primary hover:underline text-sm font-semibold">
                      View Course →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Local Pricing</h2>
            <p className="text-sm text-muted-foreground mb-2">Average daily rate</p>
            <p className="text-3xl font-bold text-primary mb-4">ZAR {avgDaily.toLocaleString()}/day</p>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>3–4 delegates: 10% off</li>
              <li>5–9 delegates: 15% off</li>
              <li>10+ delegates: 25% off</li>
            </ul>
            <div className="mt-6 border-t border-border pt-4">
              <p className="text-sm font-semibold">Contact</p>
              <p className="text-sm text-muted-foreground">{config.contact}</p>
              <p className="text-sm text-muted-foreground">{config.contactEmail}</p>
              <p className="text-sm text-muted-foreground">{config.contactPhone}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold">
            Register Now
          </Link>
          <Link to="/register-enterprise" className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold">
            Request Corporate Quote
          </Link>
        </div>
      </section>
    </Layout>
  );
}
