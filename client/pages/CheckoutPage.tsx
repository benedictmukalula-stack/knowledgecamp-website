import Layout from "@/components/Layout";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { COURSE_CATALOG } from "@shared/courseData";
import { calculatePricing } from "@/lib/pricingEngine";

interface CheckoutLead {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  experience: string;
  goals: string;
  includeLaptop: boolean;
  referralCode?: string;
}

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");
  const preselectedPayment = searchParams.get("payment");
  const [lead, setLead] = useState<CheckoutLead | null>(null);
  const [paymentOption, setPaymentOption] = useState<"stripe" | "invoice" | "quote">(
    preselectedPayment === "invoice" || preselectedPayment === "quote" ? preselectedPayment : "stripe"
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const selectedCourse = courseId ? COURSE_CATALOG.find((c) => c.id === courseId) : null;

  useEffect(() => {
    const stored = localStorage.getItem("kcg_checkout_lead");
    if (stored) {
      try {
        setLead(JSON.parse(stored));
      } catch {
        setLead(null);
      }
    }
  }, []);

  const pricing = useMemo(() => {
    if (!selectedCourse) return null;
    return calculatePricing({
      course: selectedCourse,
      delegateCount: 1,
      includeLaptop: lead?.includeLaptop ?? false,
      isEarlyBird: new Date(selectedCourse.startDate).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 30,
      isVIP: selectedCourse.rating > 4.8,
      isInHouse: false,
    });
  }, [selectedCourse, lead]);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCourse || !pricing || !lead) {
      setStatusMessage("Please complete registration details before checkout.");
      return;
    }

    setStatusMessage(null);

    if (paymentOption === "stripe") {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.fullName,
          email: lead.email,
          course: selectedCourse.title,
          amount: pricing.total,
        }),
      });
      const data = await response.json();
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      setStatusMessage(data?.error || "Unable to start Stripe checkout.");
      return;
    }

    const endpoint = paymentOption === "invoice" ? "/api/xero/invoice" : "/api/xero/quote";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        company: "",
        courseTitle: selectedCourse.title,
        pricing,
        delegateCount: 1,
        includeLaptop: lead.includeLaptop,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setStatusMessage(data?.message || "Request received. We will email you shortly.");
      return;
    }
    setStatusMessage(data?.error || "Unable to submit request.");
  };

  const actionLabel =
    paymentOption === "stripe"
      ? "Pay Now (Stripe)"
      : paymentOption === "invoice"
        ? "Request Invoice (Xero)"
        : "Request Quote (Xero)";

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-8 md:py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Choose your payment path. All totals are calculated by the same pricing engine.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-background border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary/60 transition-colors">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="stripe"
                        checked={paymentOption === "stripe"}
                        onChange={() => setPaymentOption("stripe")}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold">Pay Now (Card)</p>
                        <p className="text-xs text-muted-foreground">
                          Stripe card payment with instant confirmation.
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary/60 transition-colors">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="invoice"
                        checked={paymentOption === "invoice"}
                        onChange={() => setPaymentOption("invoice")}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold">Request Invoice</p>
                        <p className="text-xs text-muted-foreground">
                          Xero invoice emailed with payment terms and VAT.
                        </p>
                      </div>
                    </div>
                  </label>
                  <label className="border border-border rounded-lg p-4 cursor-pointer hover:border-primary/60 transition-colors">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentOption"
                        value="quote"
                        checked={paymentOption === "quote"}
                        onChange={() => setPaymentOption("quote")}
                        className="mt-1"
                      />
                      <div>
                        <p className="font-semibold">Request Quote</p>
                        <p className="text-xs text-muted-foreground">
                          Xero quote emailed for approval before invoicing.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="bg-muted/30 border border-border rounded-lg p-4 text-sm text-muted-foreground">
                  Paid → confirmation + receipt. Invoice → invoice email + due date. Quote → quote email + follow‑up reminder.
                </div>
                {statusMessage && (
                  <div className="border border-border rounded-lg p-3 text-sm bg-muted/30 text-muted-foreground">
                    {statusMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors"
                >
                  {actionLabel}
                </button>
              </form>
              <div className="mt-6 text-sm text-muted-foreground">
                Need to change details? <Link to={`/register${courseId ? `?course=${courseId}` : ""}`} className="text-primary hover:underline">Go back</Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-muted/30 border border-border rounded-xl p-6 sticky top-24 h-fit">
              <h3 className="font-semibold mb-4 text-lg">Order Summary</h3>
              {selectedCourse && pricing ? (
                <>
                  <div className="mb-6 pb-6 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-2">Course</p>
                    <p className="font-semibold">{selectedCourse.title}</p>
                  </div>
                  {lead && (
                    <div className="mb-6 pb-6 border-b border-border">
                      <p className="text-sm text-muted-foreground mb-2">Delegate</p>
                      <p className="font-semibold">{lead.fullName}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                      {lead.referralCode && (
                        <p className="text-xs text-emerald-700 mt-1">
                          Referral code: <span className="font-mono">{lead.referralCode}</span>
                        </p>
                      )}
                    </div>
                  )}
                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Course Price</span>
                      <span className="font-semibold">ZAR {pricing.basePrice.toLocaleString()}</span>
                    </div>
                    {pricing.laptopPrice > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Laptop</span>
                        <span className="font-semibold">ZAR {pricing.laptopPrice.toLocaleString()}</span>
                      </div>
                    )}
                    {pricing.earlyBirdDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Early Bird Discount</span>
                        <span>-ZAR {pricing.earlyBirdDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    {pricing.vipDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>VIP Discount</span>
                        <span>-ZAR {pricing.vipDiscount.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>ZAR {pricing.total.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Select a course to see pricing. <Link to="/courses" className="text-primary hover:underline">Browse courses</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
