import React from "react";

export interface Testimonial {
  name: string;
  role?: string;
  quote: string;
  avatarUrl?: string;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, title }) => (
  <section className="py-12 px-4 bg-muted rounded-lg max-w-4xl mx-auto">
    {title && <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>}
    <div className="grid gap-8 md:grid-cols-2">
      {testimonials.map((t, i) => (
        <div key={i} className="bg-background rounded-lg shadow p-6 flex flex-col items-center text-center">
          {t.avatarUrl && (
            <img
              src={t.avatarUrl}
              alt={t.name}
              className="w-16 h-16 rounded-full mb-4 object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          <blockquote className="italic mb-2">“{t.quote}”</blockquote>
          <div className="font-semibold">{t.name}</div>
          {t.role && <div className="text-sm text-muted-foreground">{t.role}</div>}
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
