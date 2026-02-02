import Layout from "@/components/Layout";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock, Filter, ChevronLeft, ChevronRight, ArrowRight, Building2, Download } from "lucide-react";
import { COURSE_CATALOG, CATEGORIES } from "@shared/courseData";

export default function CourseCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date(2026, 0)); // January 2026
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedVenue, setSelectedVenue] = useState<string>("");

  const venues = useMemo(
    () => Array.from(new Set(COURSE_CATALOG.map((c) => c.venue))).sort(),
    []
  );

  const filteredCourses = useMemo(() => {
    // Work on a shallow copy so sorting doesn't mutate the shared catalog
    let filtered = [...COURSE_CATALOG];

    if (selectedCategory) {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    if (selectedVenue) {
      filtered = filtered.filter((c) => c.venue === selectedVenue);
    }

    // Filter courses that start in the selected month
    const monthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const monthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);

    filtered = filtered.filter((c) => {
      const courseStart = new Date(c.startDate);
      return courseStart >= monthStart && courseStart <= monthEnd;
    });

    return filtered.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  }, [selectedMonth, selectedCategory, selectedVenue]);

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const monthName = selectedMonth.toLocaleString("default", { month: "long", year: "numeric" });

  const handleDownloadCalendar = async () => {
    const XLSX = await import("xlsx");

    const rows = COURSE_CATALOG.map((course) => {
      const curriculumTopics = course.curriculum
        .flatMap((module) => module.topics)
        .join("; ");
      const moduleNames = course.curriculum.map((module) => module.module).join("; ");
      const outcomes = course.learningOutcomes.join("; ");

      return {
        "Course ID": course.id,
        "Course Title": course.title,
        Category: course.category,
        Location: course.location,
        Venue: course.venue,
        "Start Date": course.startDate,
        "End Date": course.endDate,
        "Duration (Days)": course.duration,
        Instructor: course.instructor,
        "Max Participants": course.maxParticipants,
        "Current Enrolled": course.currentEnrolled,
        Rating: Number(course.rating.toFixed(2)),
        Reviews: course.reviews,
        "Base Price (ZAR)": course.pricing.basePrice,
        "Laptop Included": course.pricing.laptopIncluded ? "Yes" : "No",
        "Laptop Price (ZAR)": course.pricing.laptopPrice,
        "Discount (3+) %": course.pricing.discounts.three,
        "Discount (5+) %": course.pricing.discounts.five,
        "Discount (10+) %": course.pricing.discounts.ten,
        "In-House Discount %": course.pricing.inHouseDiscount,
        "Learning Outcomes": outcomes,
        Modules: moduleNames,
        "Curriculum Topics": curriculumTopics,
        "Brochure URL": course.brochureUrl,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course Calendar");
    XLSX.writeFile(workbook, "knowledge-camp-course-calendar-2026.xlsx");
  };

  const coursesByDate = useMemo(() => {
    const grouped: { [key: string]: typeof COURSE_CATALOG } = {};
    filteredCourses.forEach((course) => {
      const date = course.startDate;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(course);
    });
    return grouped;
  }, [filteredCourses]);

  const getLocationBadgeColor = (location: string): string => {
    switch (location) {
      case "local":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "africa":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "international":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-8 md:py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Course Calendar & Schedule
          </h1>
          <p className="text-muted-foreground">
            Browse all available courses by date and location
          </p>
        </div>
      </section>

      {/* Calendar Navigation and Filters */}
      <section className="py-8 md:py-12 bg-background border-b border-border">
        <div className="container">
          {/* Month Navigation */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold">Courses for {monthName}</h2>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleDownloadCalendar}
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
                title="Download full course calendar (Excel)"
              >
                <Download className="h-4 w-4" />
                Download Calendar (Excel)
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Previous month"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm font-semibold min-w-32 text-center">{monthName}</span>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                  title="Next month"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Category
              </label>
              <select
                title="Filter by Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Filter by Venue
              </label>
              <select
                title="Filter by Venue"
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Venues</option>
                {venues.map((venue) => (
                  <option key={venue} value={venue}>
                    {venue}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                No courses are scheduled for {monthName} with your selected filters. Try adjusting your filters or navigate to a different month.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(coursesByDate).map(([date, courses]) => (
                <div key={date}>
                  {/* Date Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {courses.length} course{courses.length !== 1 ? "s" : ""} available
                    </p>
                  </div>

                  {/* Courses Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="bg-background border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
                      >
                        {/* Category and Location */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 bg-muted rounded text-xs font-semibold">
                            {course.category}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold border ${getLocationBadgeColor(
                              course.location
                            )}`}
                          >
                            {course.location === "international" ? "International" : course.location === "africa" ? "Africa" : "Local"}
                          </span>
                        </div>

                        {/* Course Title */}
                        <h4 className="font-bold text-base mb-3 line-clamp-2">
                          {course.title}
                        </h4>

                        {/* Course Details */}
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{course.duration} days</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{course.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span>{course.currentEnrolled}/{course.maxParticipants} enrolled</span>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="py-3 border-t border-border mb-4">
                          <p className="text-sm">
                            <span className="font-semibold">ZAR </span>
                            <span className="font-bold text-primary">
                              {course.pricing.basePrice.toLocaleString()}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {course.duration} {course.duration === 1 ? "day" : "days"}
                          </p>
                        </div>

                        {/* Instructor */}
                        <p className="text-sm text-muted-foreground mb-4">
                          <span className="font-semibold text-foreground">Instructor: </span>
                          {course.instructor}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Link
                            to={`/courses/${course.id}`}
                            className="flex-1 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors text-center"
                          >
                            View Details
                          </Link>
                          <Link
                            to="/register-enterprise"
                            className="flex-1 px-4 py-2 border-2 border-primary text-primary hover:bg-primary/10 rounded-lg text-sm font-semibold transition-colors text-center"
                          >
                            Register
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Calendar Statistics for {monthName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredCourses.length}
              </div>
              <p className="text-muted-foreground">Courses Available</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-secondary mb-2">
                {Object.keys(coursesByDate).length}
              </div>
              <p className="text-muted-foreground">Training Days</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {filteredCourses.filter((c) => c.location === "local").length}
              </div>
              <p className="text-muted-foreground">Local Courses</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {filteredCourses.filter((c) => c.location === "international").length}
              </div>
              <p className="text-muted-foreground">International Courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* IN-HOUSE TRAINING CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
        <div className="container">
          <div className="bg-background border border-border rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Need a Different Date?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find a date that works for you? Request a custom in-house training session tailored to your organization's schedule.
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

      {/* CONVERSION BAND */}
      <section className="py-12 md:py-16 bg-primary text-white border-t border-border">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Register?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Choose a course from the calendar above and start your professional development journey today.
          </p>
          <Link
            to="/register-enterprise"
            className="inline-flex items-center px-8 py-4 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
          >
            Register Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
