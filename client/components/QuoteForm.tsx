import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface QuoteFormProps {
  onSubmit?: (data: any) => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSubmit }) => {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [requirements, setRequirements] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { company, contact, email, requirements };
    if (onSubmit) onSubmit(data);
    setLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Quote request submitted!");
      } else {
        alert("Failed to submit quote request.");
      }
    } catch (err) {
      alert("Failed to submit quote request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Company</label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={company}
              onChange={e => setCompany(e.target.value)}
              required
              placeholder="Enter your company name"
            />
      </div>
      <div>
        <label className="block mb-1 font-medium">Contact Name</label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              value={contact}
              onChange={e => setContact(e.target.value)}
              required
              placeholder="Enter contact name"
            />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="border rounded px-3 py-2 w-full"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
      </div>
      <div>
        <label className="block mb-1 font-medium">Requirements</label>
            <textarea
              className="border rounded px-3 py-2 w-full"
              value={requirements}
              onChange={e => setRequirements(e.target.value)}
              required
              placeholder="Enter your message"
            />
      </div>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Submitting..." : "Request Quote"}
      </Button>
    </form>
  );
};

export default QuoteForm;
