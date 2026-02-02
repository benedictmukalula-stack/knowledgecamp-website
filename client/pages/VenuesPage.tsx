import Layout from "@/components/Layout";
import VenuesGrid from "@/components/VenuesGrid";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Globe, Users, Calendar, CheckCircle } from "lucide-react";
import { COURSE_CATALOG } from "@shared/courseData";
import { useMemo } from "react";

export default function VenuesPage() {
  // Derive unique venues and their aggregates once per mount
  const venues = useMemo(() => {
    const order: Record<string, number> = { local: 0, africa: 1, international: 2 };

    const uniqueVenues = Array.from(new Set(COURSE_CATALOG.map((c) => c.venue)));

    const venueSummaries = uniqueVenues.map((venue) => {
      const coursesInVenue = COURSE_CATALOG.filter((c) => c.venue === venue);
      const location = coursesInVenue[0]?.location || "local";
      const courseCount = coursesInVenue.length;
      const categories = Array.from(
        new Set(coursesInVenue.map((c) => c.category))
      );

      return { venue, location, courseCount, categories };
    });

    return venueSummaries.sort((a, b) => order[a.location] - order[b.location]);
  }, []);

  const getLocationDescription = (location: string): string => {
    switch (location) {
      case "local":
        return "Local Training Venues in South Africa";
      case "africa":
        return "Training Hubs across Africa";
      case "international":
        return "Global Training Centers";
      default:
        return "Training Venues";
    }
  };

  const getLocationColor = (location: string): string => {
    switch (location) {
      case "local":
        return "from-blue-500 to-blue-600";
      case "africa":
        return "from-orange-500 to-orange-600";
      case "international":
        return "from-purple-500 to-purple-600";
      default:
        return "from-primary to-primary";
    }
  };

  const hubInfo = [
    {
      location: "local",
      title: "Local Training (South Africa)",
      description:
        "Our South African venues are strategically located to serve professionals across the country. Each hub is equipped with modern facilities and experienced instructors.",
      features: [
        "ZAR 5,000 per day base rate",
        "Multiple cities: Cape Town, Johannesburg, Pretoria, Durban",
        "Flexible scheduling options",
        "Professional facilities and equipment",
      ],
      pricing: "From ZAR 5,000/day",
    },
    {
      location: "africa",
      title: "Africa Hubs",
      description:
        "Expand your learning across Africa. Our continental hubs provide access to world-class training in key business centers.",
      features: [
        "1.4x pricing multiplier vs local",
        "Major cities: Lagos, Nairobi, Accra, Cairo",
        "Pan-African professional network",
        "Regional expertise and insights",
      ],
      pricing: "From ZAR 7,000/day",
    },
    {
      location: "international",
      title: "Global Centers",
      description:
        "Access premium international training with global perspectives. Our international venues connect you with a worldwide professional community.",
      features: [
        "2.5x pricing multiplier vs local",
        "Hubs: London, Dubai, Singapore, New York, Sydney",
        "Laptop and materials included",
        "Global networking opportunities",
      ],
      pricing: "Premium pricing",
    },
  ];

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Training Venues & Hubs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access world-class training across Africa and globally. Choose from our multiple venues and find the location that works best for you.
          </p>

          <div className="flex gap-3 mt-8">
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all"
            >
              Browse Courses
            </Link>
            <Link
              to="/calendar"
              className="inline-flex items-center px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
            >
              View Calendar
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* HUB INFORMATION SECTIONS */}
      {hubInfo.map((hub) => (
        <section
          key={hub.location}
          className={`py-16 md:py-20 ${
            hub.location === "africa" ? "bg-background border-t border-border" : ""
          }${hub.location === "international" ? "bg-muted/30 border-t border-border" : ""}`}
        >
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {hub.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {hub.description}
                </p>
                <div className="space-y-3 mb-8">
                  {hub.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`bg-gradient-to-br ${getLocationColor(
                  hub.location
                )} rounded-2xl p-12 text-white flex items-center justify-center h-64`}
              >
                <Globe className="h-32 w-32 opacity-20" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* SAMPLE VENUES IMAGE GRID */}
      <section className="py-16 md:py-20 bg-muted/20 border-t border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Sample Venue Hubs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-center">
            A visual snapshot of the types of professional training venues we use across our hubs.
          </p>
          <VenuesGrid />
        </div>
      </section>

      {/* VENUES GRID */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Training Venues
          </h2>

          {/* Group venues by location */}
          {["local", "africa", "international"].map((location) => {
            const venuesInLocation = venues.filter((v) => v.location === location);
            if (venuesInLocation.length === 0) return null;

            return (
              <div key={location} className="mb-16">
                <h3 className="text-2xl font-bold mb-8">
                  {getLocationDescription(location)}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {venuesInLocation.map((venue) => (
                    <div
                      key={venue.venue}
                      className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all group"
                    >
                      {/* Venue Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-secondary" />
                            {venue.venue}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {venue.courseCount} courses available
                          </p>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                          Course Categories
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {venue.categories.slice(0, 3).map((cat) => (
                            <span
                              key={cat}
                              className="px-2 py-1 bg-muted rounded text-xs font-semibold"
                            >
                              {cat}
                            </span>
                          ))}
                          {venue.categories.length > 3 && (
                            <span className="px-2 py-1 bg-muted rounded text-xs font-semibold">
                              +{venue.categories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-t border-b border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Courses</p>
                          <p className="text-lg font-bold">{venue.courseCount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-lg font-bold capitalize">
                            {venue.location}
                          </p>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2">
                        <Link
                          to={`/courses?venue=${encodeURIComponent(
                            venue.venue
                          )}`}
                          className="flex-1 px-4 py-2 text-center bg-primary text-white hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors"
                        >
                          View Courses
                        </Link>
                        <Link
                          to="/in-house"
                          className="flex-1 px-4 py-2 text-center border-2 border-primary text-primary hover:bg-primary/10 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Request Venue
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING COMPARISON SECTION */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Hub Pricing Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hubInfo.map((hub) => (
              <div
                key={hub.location}
                className="bg-background border border-border rounded-xl p-8"
              >
                <h3 className="text-xl font-bold mb-4">{hub.title}</h3>

                <div className="bg-primary/10 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Base Rate</p>
                  <p className="text-2xl font-bold text-primary">{hub.pricing}</p>
                </div>

                <div className="space-y-3 text-sm mb-6 pb-6 border-b border-border">
                  <p>
                    <span className="font-semibold">Per Day:</span> {hub.pricing}
                  </p>
                  <p>
                    <span className="font-semibold">Discounts:</span> 3+=10%, 5+=15%, 10+=25%
                  </p>
                  <p>
                    <span className="font-semibold">Durations:</span> 2, 3, or 5 days
                  </p>
                </div>

                <div className="space-y-2">
                  <Link
                    to={`/hubs/${hub.location}`}
                    className="block text-center px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors"
                  >
                    View Hub
                  </Link>
                  <Link
                    to="/courses"
                    className="block text-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors"
                  >
                    View Courses
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IN-HOUSE CONVERSION CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-primary/80 text-white border-t border-border">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prefer a Custom Solution?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Bring training directly to your location. We customize courses, schedules, and delivery methods for your organization's unique needs.
          </p>

          <Link
            to="/in-house"
            className="inline-flex items-center px-8 py-4 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
          >
            Request In-House Training
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
