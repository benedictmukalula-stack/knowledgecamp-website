import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface ContactFormProps {
  onSubmit?: (data: any) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [interestType, setInterestType] = useState("public-course");
  const [courseInterest, setCourseInterest] = useState("");
  const [delegates, setDelegates] = useState("");
  const [message, setMessage] = useState("");
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      company,
      role,
      city,
      interestType,
      courseInterest,
      delegates,
      message,
      newsletterOptIn,
    };
    if (onSubmit) onSubmit(data);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Contact form submitted!");
      } else {
        alert("Failed to submit contact form.");
      }
    } catch (err) {
      alert("Failed to submit contact form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Full name</label>
          <input
            type="text"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Work email</label>
          <input
            type="email"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Mobile / WhatsApp</label>
          <input
            type="tel"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Include country code if outside South Africa"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Company / Organisation</label>
          <input
            type="text"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your organisation name"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Job title / Role</label>
          <input
            type="text"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Training Manager"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">City / Country</label>
          <input
            type="text"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Johannesburg, South Africa"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">What are you interested in?</label>
          <select
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={interestType}
            onChange={(e) => setInterestType(e.target.value)}
          >
            <option value="public-course">Public course (individual / small team)</option>
            <option value="in-house">In-house / custom training</option>
            <option value="enterprise">Enterprise / bulk registration</option>
            <option value="partnership">Partnership / sponsorship</option>
            <option value="other">Other enquiry</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Course / topic of interest</label>
          <input
            type="text"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={courseInterest}
            onChange={(e) => setCourseInterest(e.target.value)}
            placeholder="e.g. Advanced Project Management in Dubai"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Approx. number of delegates</label>
          <input
            type="number"
            min="1"
            className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background"
            value={delegates}
            onChange={(e) => setDelegates(e.target.value)}
            placeholder="e.g. 1, 5, 10+"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Tell us about your needs</label>
        <textarea
          className="border border-border rounded-md px-3 py-2 w-full text-sm bg-background min-h-[96px]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Share any details about courses, dates, locations, budget or objectives so we can respond with the most relevant information."
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="newsletter-opt-in"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border"
          checked={newsletterOptIn}
          onChange={(e) => setNewsletterOptIn(e.target.checked)}
        />
        <label htmlFor="newsletter-opt-in" className="text-xs text-muted-foreground">
          Also subscribe me to Knowledge Camp Global course updates and newsletter. We send occasional updates from <span className="font-medium">subscribe@knowledgecamp.co.za</span> and you can unsubscribe at any time.
        </label>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
        {loading ? "Submitting..." : "Send message"}
      </Button>
    </form>
  );
};

export default ContactForm;
