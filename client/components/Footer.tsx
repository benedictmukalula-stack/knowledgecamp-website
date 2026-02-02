import { Link } from "react-router-dom";
import { memo } from "react";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, MessageCircle } from "lucide-react";

const QUICK_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Calendar", href: "/calendar" },
  { label: "Hubs", href: "/hubs/sa" },
  { label: "Pricing", href: "/pricing" },
  { label: "Dashboard", href: "/dashboard" },
];

const SOLUTIONS = [
  { label: "In-House Training", href: "/in-house" },
  { label: "Online / Hybrid", href: "/online-hybrid" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Learning Management", href: "/lms" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
];

const CONTACT_DETAILS = [
  {
    icon: Phone,
    label: "Phone (SA)",
    value: "+27 11 568 6712",
    href: "tel:+27115686712",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp (SA)",
    value: "+27 83 391 0863",
    href: "https://wa.me/27833910863",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp (Zambia)",
    value: "+260 779 721 772",
    href: "https://wa.me/260779721772",
  },
  {
    icon: Mail,
    label: "General Enquiry",
    value: "info@knowledgecamp.co.za",
    href: "mailto:info@knowledgecamp.co.za",
  },
  {
    icon: Mail,
    label: "Registration",
    value: "register@knowledgecamp.co.za",
    href: "mailto:register@knowledgecamp.co.za",
  },
];

const SPECIALIZED_EMAILS = [
  { label: "In-House Training", email: "in-house@knowledgecamp.co.za" },
  { label: "Partnerships", email: "partner@knowledgecamp.co.za" },
];

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    label: "Facebook",
    url: "https://facebook.com/knowledgecampglobal",
    color: "hover:text-blue-600",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    url: "https://linkedin.com/company/knowledgecampglobal",
    color: "hover:text-blue-700",
  },
  {
    icon: Instagram,
    label: "Instagram",
    url: "https://instagram.com/knowledgecampglobal",
    color: "hover:text-pink-600",
  },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border mt-16 md:mt-20">
      {/* CTA Band */}
      <div className="border-b border-border bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              to="/register"
              className="px-5 py-3 rounded-lg bg-primary text-white font-semibold text-center hover:bg-primary/90 transition-colors"
            >
              Register
            </Link>
            <Link
              to="/register-enterprise"
              className="px-5 py-3 rounded-lg border-2 border-primary text-primary font-semibold text-center hover:bg-primary/10 transition-colors"
            >
              Request In‑House Quote
            </Link>
            <Link
              to="/partnerships"
              className="px-5 py-3 rounded-lg border border-border text-foreground font-semibold text-center hover:bg-accent/10 transition-colors"
            >
              Partner With Us
            </Link>
            <Link
              to="/contact?topic=brochure"
              className="px-5 py-3 rounded-lg border border-border text-foreground font-semibold text-center hover:bg-accent/10 transition-colors"
            >
              Download Brochure
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Contact */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fdc61da1f09234263a84e25f305acc6be%2Fbb45b628b0be425daeb136477b77d74b?format=webp&width=200&height=300"
                alt="Knowledge Camp Logo"
                className="h-12 w-auto mb-4"
                loading="lazy"
                decoding="async"
              />
              <p className="text-muted-foreground text-sm mb-6">
                Professional training and skills development for organizations across Africa and globally. We empower professionals to excel through world-class courses.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3">
              {CONTACT_DETAILS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Icon className="h-4 w-4 flex-shrink-0 mt-0.5 group-hover:text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground font-semibold">
                        {item.label}
                      </p>
                      <p className="text-foreground">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Specialized Contacts */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Specialized Enquiries
              </p>
              <div className="space-y-2 text-sm">
                {SPECIALIZED_EMAILS.map((item) => (
                  <a
                    key={item.email}
                    href={`mailto:${item.email}`}
                    className="block text-muted-foreground hover:text-secondary transition-colors"
                  >
                    <span className="font-semibold">{item.label}:</span> {item.email}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">
              Solutions
            </h3>
            <ul className="space-y-2">
              {SOLUTIONS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social & Copyright Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted-foreground ${social.color} transition-colors`}
                    title={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>
                © {currentYear} Knowledge Camp Global. All rights reserved.
              </p>
              <p className="text-xs mt-1">
                Professional Training | Skills Development | Corporate Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
