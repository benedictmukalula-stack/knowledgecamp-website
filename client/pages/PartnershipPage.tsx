import Layout from "@/components/Layout";
import { useState } from "react";
import { ArrowRight, CheckCircle, Handshake, Users, TrendingUp, Globe } from "lucide-react";

export default function PartnershipPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    partnerType: "reseller",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    // For now, we'll just show the success state
    const mailtoLink = `mailto:partner@knowledgecamp.co.za?subject=Partnership Inquiry from ${formData.organizationName}&body=${encodeURIComponent(
      `Organization: ${formData.organizationName}\nContact: ${formData.contactName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPartner Type: ${formData.partnerType}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const partnerTypes = [
    {
      type: "reseller",
      title: "Course Reseller",
      description: "Offer Knowledge Camp courses to your client base",
      features: [
        "White-label course options",
        "Reseller portal for course management",
        "Marketing materials and support",
        "Competitive reseller pricing",
        "Revenue sharing model",
      ],
      bestFor: "Training firms, corporate consultants",
      icon: TrendingUp,
    },
    {
      type: "affiliation",
      title: "Affiliate Partner",
      description: "Earn commissions by referring clients to us",
      features: [
        "Easy referral process",
        "Competitive commission rates",
        "Marketing collateral provided",
        "Dedicated partner support",
        "Performance bonuses",
      ],
      bestFor: "Coaches, consultants, influencers",
      icon: Users,
    },
    {
      type: "integration",
      title: "Technology Partner",
      description: "Integrate Knowledge Camp courses into your platform",
      features: [
        "API access and documentation",
        "Course catalog integration",
        "Enrollment management",
        "Technical support",
        "Co-marketing opportunities",
      ],
      bestFor: "LMS providers, HR platforms, EdTech companies",
      icon: Globe,
    },
  ];

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
        >
          <img
            src="https://images.pexels.com/photos/7647989/pexels-photo-7647989.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Partnership Program
            </h1>
            <p className="text-lg text-white/90 mb-8">
              Expand your training offerings and grow your business. Join our partner network and deliver world-class professional development to your clients.
            </p>
            <a
              href="#partnership-form"
              className="inline-flex items-center px-8 py-4 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
            >
              Apply to Partner
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* PARTNER BENEFITS */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Why Partner With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Proven Courses",
                description:
                  "70+ professionally-developed courses with 4.8★ ratings and 1000+ trained professionals.",
              },
              {
                title: "Revenue Growth",
                description:
                  "Attractive margins and revenue-sharing models. Scale your business without development costs.",
              },
              {
                title: "Support & Resources",
                description:
                  "Marketing materials, training, technical support, and a dedicated partner manager.",
              },
              {
                title: "Global Reach",
                description:
                  "Access to training hubs across South Africa, Africa, and internationally.",
              },
              {
                title: "Flexibility",
                description:
                  "Multiple partnership models to fit your business. From referrals to full integration.",
              },
              {
                title: "Quality Assurance",
                description:
                  "Certified instructors, professional delivery, and continuous course updates.",
              },
            ].map((benefit, index) => (
              <div key={index} className="bg-muted/30 border border-border rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Partnership Models
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTypes.map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.type}
                  className="bg-background border border-border rounded-xl p-8 hover:shadow-lg transition-all group"
                >
                  {/* Header */}
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-secondary/10 border-2 border-secondary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{partner.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {partner.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    {partner.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best For */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Best For
                    </p>
                    <p className="text-sm font-semibold">{partner.bestFor}</p>
                  </div>

                  {/* CTA */}
                  <a
                    href="#partnership-form"
                    className="block w-full px-6 py-3 text-center bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP FORM */}
      <section id="partnership-form" className="py-16 md:py-20 bg-background border-t border-border">
        <div className="container max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Apply to Partner
          </h2>

          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                Thank You!
              </h3>
              <p className="text-green-800 mb-6">
                Your partnership inquiry has been submitted. Our partnership team will review your application and contact you within 2-3 business days.
              </p>
              <a
                href="mailto:partner@knowledgecamp.co.za"
                className="text-green-700 font-semibold hover:underline"
              >
                partner@knowledgecamp.co.za
              </a>
            </div>
          ) : (
            <div className="bg-background border border-border rounded-xl p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizationName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organizationName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your company name"
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData({ ...formData, contactName: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+27 ..."
                  />
                </div>

                {/* Partner Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Partnership Type *
                  </label>
                  <select
                    required
                    value={formData.partnerType}
                    onChange={(e) =>
                      setFormData({ ...formData, partnerType: e.target.value })
                    }
                    title="Partnership Type"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="reseller">Course Reseller</option>
                    <option value="affiliation">Affiliate Partner</option>
                    <option value="integration">Technology Partner</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Tell us about your business (optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Share your business background, goals, and why you're interested in partnering with Knowledge Camp..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  Submit Partnership Application
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  We'll review your application and contact you within 2-3 business days.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* NEXT STEPS CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our partnership team is here to answer your questions and help you find the right partnership model for your business.
          </p>

          <a
            href="mailto:partner@knowledgecamp.co.za"
            className="inline-flex items-center px-8 py-4 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
          >
            <Handshake className="mr-2 h-5 w-5" />
            Contact Partnership Team
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </Layout>
  );
}
