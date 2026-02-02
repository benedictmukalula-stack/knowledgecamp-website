import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface PartnershipFormProps {
  onSubmit?: (data: any) => void;
}

const PartnershipForm: React.FC<PartnershipFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [partnerType, setPartnerType] = useState("training");
  const [region, setRegion] = useState("");
  const [website, setWebsite] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, email, company, phone, partnerType, region, website, documentUrl, message };
    if (onSubmit) onSubmit(data);
    setLoading(true);
    try {
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert("Partnership application submitted!");
      } else {
        alert("Failed to submit partnership application.");
      }
    } catch (err) {
      alert("Failed to submit partnership application.");
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
            onChange={e => setName(e.target.value)}
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
            onChange={e => setEmail(e.target.value)}
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
          onChange={e => setCompany(e.target.value)}
          placeholder="Enter your company name"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          className="border rounded px-3 py-2 w-full"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Partnership Type</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={partnerType}
          onChange={e => setPartnerType(e.target.value)}
          title="Partnership Type"
        >
          <option value="training">Training Partner</option>
          <option value="venue">Venue Partner</option>
          <option value="country">Country Partner</option>
          <option value="reseller">Reseller</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Region / Country</label>
        <input
          type="text"
          className="border rounded px-3 py-2 w-full"
          value={region}
          onChange={e => setRegion(e.target.value)}
          placeholder="e.g., South Africa"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Website</label>
        <input
          type="url"
          className="border rounded px-3 py-2 w-full"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Supporting Document URL</label>
        <input
          type="url"
          className="border rounded px-3 py-2 w-full"
          value={documentUrl}
          onChange={e => setDocumentUrl(e.target.value)}
          placeholder="Link to accreditation or company profile"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Message</label>
          <textarea
            className="border rounded px-3 py-2 w-full"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            placeholder="Enter your message"
          />
      </div>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Submitting..." : "Apply for Partnership"}
      </Button>
    </form>
  );
};

export default PartnershipForm;
