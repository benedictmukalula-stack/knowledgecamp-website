import Link from "next/link";
import { COURSE_CATALOG } from "@shared/courseData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4">Knowledge Camp Global (Next.js)</h1>
        <p className="text-slate-600 mb-8">
          This is a minimal Next.js front-end that reuses the shared course data
          from the existing Vite/Express app. It is intended as the starting
          point for integrating Builder.io and multi-channel delivery.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {COURSE_CATALOG.slice(0, 4).map((course) => (
            <article
              key={course.id}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h2 className="font-semibold mb-1">{course.title}</h2>
              <p className="text-sm text-slate-600 mb-2">{course.venue}</p>
              <p className="text-xs text-slate-500 mb-3">
                Next start: {course.startDate}
              </p>
              <Link
                href={`/courses/${course.id}`}
                className="inline-flex text-sm font-medium text-blue-600 hover:underline"
              >
                View course
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
