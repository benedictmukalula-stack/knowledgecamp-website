import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface SponsorInterestFormProps {
  onSubmit?: (data: any) => void;
}

const SponsorInterestForm: React.FC<SponsorInterestFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState("gold");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, email, company, phone, tier, message };
    if (onSubmit) onSubmit(data);
    setLoading(true);
    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Sponsorship interest submitted!");
      } else {
        alert("Failed to submit sponsorship interest.");
      }
    } catch (err) {
      alert("Failed to submit sponsorship interest.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Company</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          className="border rounded px-3 py-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Sponsorship Tier</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={tier}
          onChange={(e) => setTier(e.target.value)}
          title="Sponsorship Tier"
        >
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Message</label>
        <textarea
          className="border rounded px-3 py-2 w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Tell us about your sponsorship goals"
        />
      </div>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Submitting..." : "Submit Sponsorship Interest"}
      </Button>
    </form>
  );
};

export default SponsorInterestForm;
