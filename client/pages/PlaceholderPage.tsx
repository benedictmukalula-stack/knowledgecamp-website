import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function PlaceholderPage({
  title,
  description,
  message,
  ctaText = "Back to Home",
  ctaLink = "/",
}: PlaceholderProps) {
  return (
    <Layout>
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 min-h-[60vh] flex items-center">
        <div className="container text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-6">
            <ArrowRight className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {message}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={ctaLink}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold transition-colors"
            >
              {ctaText}
            </Link>
            <Link
              to="/courses"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
