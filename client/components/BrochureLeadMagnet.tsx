import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export interface BrochureLeadMagnetProps {
  title?: string;
  description?: string;
  brochureUrl: string;
}

const BrochureLeadMagnet: React.FC<BrochureLeadMagnetProps> = ({ title = "Download Our Brochure", description = "Get the full course catalog and pricing instantly.", brochureUrl }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "Brochure Lead Magnet" }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("Failed to submit brochure request.");
      }
    } catch (err) {
      alert("Failed to submit brochure request.");
    }
  };

  return (
    <section className="py-10 px-4 max-w-md mx-auto text-center bg-muted rounded-lg">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4 text-muted-foreground">{description}</p>
      {submitted ? (
        <a href={brochureUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Download Brochure</Button>
        </a>
      ) : (
        <form className="flex flex-col gap-3 items-center" onSubmit={handleSubmit}>
          <input
            type="email"
            className="border rounded px-3 py-2 w-full max-w-xs"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" size="lg">Get Brochure</Button>
        </form>
      )}
    </section>
  );
};

export default BrochureLeadMagnet;
