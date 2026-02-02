import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { AlertCircle, ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center py-12 md:py-16">
        <div className="container text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-destructive/20 mb-6">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">404</h1>
          <p className="text-2xl font-semibold mb-2">Page Not Found</p>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              Back to Home <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/courses"
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
