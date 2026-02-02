import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { COURSE_CATALOG } from "@shared/courseData";
import { calculatePricing } from "@/lib/pricingEngine";

export interface RegistrationFormProps {
  onSubmit?: (data: any) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [courseId, setCourseId] = useState("");
  const [delegateCount, setDelegateCount] = useState(1);
  const [includeLaptop, setIncludeLaptop] = useState(false);
  const [payAfterInvoice, setPayAfterInvoice] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [hasSavedLead, setHasSavedLead] = useState(false);

  const [loading, setLoading] = useState(false);

  const selectedCourse = COURSE_CATALOG.find((c) => c.id === courseId);
  const referralCode = typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("ref") || ""
    : "";
  const isEarlyBird = selectedCourse
    ? new Date(selectedCourse.startDate).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 30
    : false;
  const isVIP = selectedCourse ? selectedCourse.rating > 4.8 : false;
  const pricing = selectedCourse
    ? calculatePricing({
        course: selectedCourse,
        delegateCount,
        includeLaptop,
        isEarlyBird,
        isVIP,
        isInHouse: false,
      })
    : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("kcg_registration_lead");
      if (!stored) return;
      const parsed = JSON.parse(stored) as {
        name?: string;
        email?: string;
        phone?: string;
        courseId?: string;
        delegateCount?: number;
        includeLaptop?: boolean;
        payAfterInvoice?: boolean;
        marketingOptIn?: boolean;
      };
      if (parsed && parsed.email) {
        setHasSavedLead(true);
      }
    } catch {
      // ignore invalid stored data
    }
  }, []);

  const handleUsePreviousDetails = () => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("kcg_registration_lead");
      if (!stored) return;
      const parsed = JSON.parse(stored) as {
        name?: string;
        email?: string;
        phone?: string;
        courseId?: string;
        delegateCount?: number;
        includeLaptop?: boolean;
        payAfterInvoice?: boolean;
        marketingOptIn?: boolean;
      };
      setName(parsed.name || "");
      setEmail(parsed.email || "");
      setPhone(parsed.phone || "");
      setCourseId(parsed.courseId || "");
      setDelegateCount(parsed.delegateCount ?? 1);
      setIncludeLaptop(Boolean(parsed.includeLaptop));
      setPayAfterInvoice(Boolean(parsed.payAfterInvoice));
      setMarketingOptIn(Boolean(parsed.marketingOptIn));
    } catch {
      // ignore invalid stored data
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !pricing) {
      alert("Please select a course to continue.");
      return;
    }
    const data = {
      name,
      email,
      phone,
      courseId,
      courseTitle: selectedCourse.title,
      delegateCount,
      includeLaptop,
      payAfterInvoice,
      pricing,
      startDate: selectedCourse.startDate,
      marketingOptIn,
      referralCode: referralCode || undefined,
    };
    if (onSubmit) onSubmit(data);
    setLoading(true);
    try {
      if (typeof window !== "undefined") {
        try {
          window.localStorage.setItem(
            "kcg_registration_lead",
            JSON.stringify({
              name,
              email,
              phone,
              courseId,
              delegateCount,
              includeLaptop,
              payAfterInvoice,
              marketingOptIn,
              referralCode: referralCode || undefined,
            })
          );
        } catch {
          // ignore storage errors
        }
      }
      // Log registration for dashboard (including referral and consent)
      await fetch("/api/registration/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Track referral code if present
      if (referralCode) {
        await fetch("/api/referral/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: referralCode,
            courseTitle: selectedCourse.title,
            email,
          }),
        });
      }

      // Always send to CRM (with consent flag)
      await fetch("/api/registration/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Send WhatsApp reminder if phone is provided
      if (phone) {
        await fetch("/api/registration/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            name,
            courseTitle: selectedCourse.title,
            startDate: selectedCourse.startDate,
          }),
        });
      }

      if (!payAfterInvoice) {
        const amount = Math.round(pricing.total * 100); // in cents
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, course: selectedCourse.title, amount }),
        });
        const result = await res.json();
        if (result.url) {
          window.location.href = result.url;
        } else {
          alert("Stripe session creation failed.");
        }
      } else {
        const res = await fetch("/api/registration/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          alert("Registration submitted! Invoice will be sent.");
        } else {
          alert("Failed to send registration email.");
        }
      }
    } catch (err) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      {hasSavedLead && (
        <div className="mb-4 bg-muted/30 border border-dashed border-border rounded-lg p-3 text-sm text-muted-foreground flex items-start gap-3">
          <span className="mt-0.5">✓</span>
          <div>
            <p>
              You previously registered with us. You can reuse your last saved details for a faster checkout.
            </p>
            <button
              type="button"
              onClick={handleUsePreviousDetails}
              className="mt-1 text-primary font-semibold hover:underline"
            >
              Use previous details
            </button>
          </div>
        </div>
      )}
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
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          className="border rounded px-3 py-2 w-full"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Enter your phone"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Course</label>
        <select
          className="border rounded px-3 py-2 w-full"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
          title="Course"
        >
          <option value="">Select a course</option>
          {COURSE_CATALOG.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title} ({course.venue})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Delegates</label>
        <input
          type="number"
          min={1}
          className="border rounded px-3 py-2 w-full"
          value={delegateCount}
          onChange={e => setDelegateCount(Number(e.target.value))}
          required
          placeholder="Number of delegates"
        />
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={includeLaptop}
          onChange={e => setIncludeLaptop(e.target.checked)}
        />
        Include Laptop
      </label>
      {pricing && (
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Pricing Breakdown</h3>
          <div className="text-sm space-y-1">
            <div>Base: R{pricing.basePrice.toLocaleString()}</div>
            {pricing.laptopPrice > 0 && <div>Laptop: R{pricing.laptopPrice.toLocaleString()}</div>}
            {pricing.earlyBirdDiscount > 0 && <div className="text-green-600">Early Bird: -R{pricing.earlyBirdDiscount.toLocaleString()}</div>}
            {pricing.groupDiscount > 0 && <div className="text-green-600">Group: -R{pricing.groupDiscount.toLocaleString()}</div>}
            {pricing.vipDiscount > 0 && <div className="text-green-600">VIP: -R{pricing.vipDiscount.toLocaleString()}</div>}
            <div className="font-semibold">Total: R{pricing.total.toLocaleString()}</div>
          </div>
        </div>
      )}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={payAfterInvoice}
          onChange={e => setPayAfterInvoice(e.target.checked)}
        />
        Pay after invoice
      </label>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          id="registration-terms"
          required
          className="mt-1"
        />
        <label htmlFor="registration-terms">
          I agree to the {" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and {" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          id="registration-marketing"
          checked={marketingOptIn}
          onChange={(e) => setMarketingOptIn(e.target.checked)}
          className="mt-1"
        />
        <span>
          I would like to receive training calendars, specials, discounted courses, offers and promotions from Knowledge Camp Global.
        </span>
      </label>
      <Button type="submit" size="lg" disabled={loading}>
        {loading ? "Processing..." : payAfterInvoice ? "Request Invoice" : "Pay Now"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
