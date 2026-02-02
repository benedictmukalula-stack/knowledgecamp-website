import Layout from "@/components/Layout";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mail, User, Phone, MapPin, Lock } from "lucide-react";
import { COURSE_CATALOG } from "@shared/courseData";
import { calculatePricing } from "@/lib/pricingEngine";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");
  const delegatesFromQuery = searchParams.get("delegates");
  const hubFromQuery = searchParams.get("hub");
  const venueFromQuery = searchParams.get("venue");
  const deliveryFromQuery = searchParams.get("delivery");
  const referralCode = searchParams.get("ref");

  const selectedCourse = courseId ? COURSE_CATALOG.find((c) => c.id === courseId) : null;
  const delegatesCount = Math.max(1, Number(delegatesFromQuery || "1") || 1);
  const [includeLaptop, setIncludeLaptop] = useState(false);
  const isEarlyBird = selectedCourse
    ? new Date(selectedCourse.startDate).getTime() - Date.now() < 1000 * 60 * 60 * 24 * 30
    : false;
  const isVIP = selectedCourse ? selectedCourse.rating > 4.8 : false;
  const pricing = selectedCourse
    ? calculatePricing({
        course: selectedCourse,
        delegateCount: delegatesCount,
        includeLaptop,
        isEarlyBird,
        isVIP,
        isInHouse: false,
      })
    : null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    experience: "",
    goals: "",
  });
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [paymentOption, setPaymentOption] = useState<"stripe" | "invoice" | "quote">(
    "stripe"
  );
  const [hasSavedLead, setHasSavedLead] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("kcg_checkout_lead");
      if (!stored) return;
      const parsed = JSON.parse(stored) as typeof formData & {
        includeLaptop?: boolean;
        marketingOptIn?: boolean;
        referralCode?: string;
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
      const stored = window.localStorage.getItem("kcg_checkout_lead");
      if (!stored) return;
      const parsed = JSON.parse(stored) as typeof formData & {
        includeLaptop?: boolean;
        marketingOptIn?: boolean;
        referralCode?: string;
      };
      setFormData({
        fullName: parsed.fullName || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
        country: parsed.country || "",
        experience: parsed.experience || "",
        goals: parsed.goals || "",
      });
      setMarketingOptIn(Boolean(parsed.marketingOptIn));
      if (parsed.includeLaptop != null) {
        setIncludeLaptop(Boolean(parsed.includeLaptop));
      }
    } catch {
      // ignore invalid stored data
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle registration
    console.log("Registration submitted:", formData, {
      courseId,
      includeLaptop,
      pricing,
      paymentOption,
      marketingOptIn,
    });
    localStorage.setItem(
      "kcg_checkout_lead",
      JSON.stringify({
        ...formData,
        includeLaptop,
        marketingOptIn,
        referralCode,
      })
    );
    const params = new URLSearchParams();
    if (courseId) params.set("course", courseId);
    if (paymentOption) params.set("payment", paymentOption);
    navigate(`/checkout?${params.toString()}`);
  };

  const checkoutLabel =
    paymentOption === "stripe"
      ? "Pay Now (Card / Stripe)"
      : paymentOption === "invoice"
        ? "Request Invoice (Xero)"
        : "Request Quote (Xero)";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-8 md:py-12">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Start Your Learning Journey
          </h1>
          <p className="text-muted-foreground">
            Register now and gain access to world-class training
          </p>
        </div>
      </section>

      {/* Registration Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-background border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>

                {referralCode && (
                  <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800 flex items-start gap-3">
                    <span className="mt-0.5 text-xs font-bold tracking-wide uppercase">Ref</span>
                    <div>
                      <p className="font-semibold">Partner referral applied</p>
                      <p className="mt-1">
                        Your registration will be linked to partner code <span className="font-mono font-semibold">{referralCode}</span>.
                      </p>
                    </div>
                  </div>
                )}

                {hasSavedLead && (
                  <div className="mb-6 bg-muted/30 border border-dashed border-border rounded-lg p-4 text-sm text-muted-foreground flex items-start gap-3">
                    <span className="mt-0.5">✓</span>
                    <div>
                      <p>
                        You previously registered with us. You can reuse your last saved details
                        for a faster checkout.
                      </p>
                      <button
                        type="button"
                        onClick={handleUsePreviousDetails}
                        className="mt-2 text-primary font-semibold hover:underline"
                      >
                        Use previous details
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <User className="inline h-4 w-4 mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <Mail className="inline h-4 w-4 mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <Phone className="inline h-4 w-4 mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <MapPin className="inline h-4 w-4 mr-2" />
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      title="Country"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Select your country</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      title="Experience Level"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Learning Goals */}
                                    {/* Laptop Option */}
                                    {selectedCourse && !selectedCourse.pricing.laptopIncluded && (
                                      <div className="flex items-center gap-3">
                                        <input
                                          type="checkbox"
                                          id="includeLaptop"
                                          checked={includeLaptop}
                                          onChange={(e) => setIncludeLaptop(e.target.checked)}
                                          className="mt-1"
                                        />
                                        <label htmlFor="includeLaptop" className="text-sm text-muted-foreground">
                                          Include Laptop (adds R{selectedCourse.pricing.laptopPrice.toLocaleString()})
                                        </label>
                                      </div>
                                    )}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Learning Goals
                    </label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us about your learning goals and what you hope to achieve..."
                    ></textarea>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="register-marketing"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="mt-1"
                    />
                    <label
                      htmlFor="register-marketing"
                      className="text-sm text-muted-foreground"
                    >
                      I would like to receive training calendars, specials, discounted courses,
                      offers and promotions from Knowledge Camp Global.
                    </label>
                  </div>

                  <div className="bg-muted/30 border border-border rounded-lg p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold">Checkout Options</h3>
                      <p className="text-sm text-muted-foreground">
                        Select how you would like to proceed. Pricing totals remain the same.
                      </p>
                    </div>
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
                    <p className="text-xs text-muted-foreground">
                      Paid → receipt confirmation. Invoice → emailed invoice + due date. Quote → emailed quote
                      + follow-up reminder.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors"
                  >
                    {checkoutLabel}
                  </button>
                </form>

                <p className="text-sm text-muted-foreground text-center mt-4">
                  Already have an account?{" "}
                  <Link to="/dashboard" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-muted/30 border border-border rounded-xl p-6 sticky top-24 h-fit">
                <h3 className="font-semibold mb-4 text-lg">Order Summary</h3>

                {selectedCourse && pricing ? (
                  <>
                    <div className="mb-6 pb-6 border-b border-border">
                      <p className="text-sm text-muted-foreground mb-2">Course</p>
                      <p className="font-semibold">{selectedCourse.title}</p>
                    </div>

                    <div className="mb-6 pb-6 border-b border-border text-sm space-y-1">
                      <p className="text-sm text-muted-foreground mb-1">Session details</p>
                      <p>
                        Delegates: <span className="font-semibold">{delegatesCount}</span>
                      </p>
                      {deliveryFromQuery && (
                        <p>
                          Delivery: <span className="font-semibold">{deliveryFromQuery === "inhouse" ? "In-house" : "Public hub"}</span>
                        </p>
                      )}
                      {hubFromQuery && (
                        <p>
                          Hub: <span className="font-semibold">{hubFromQuery}</span>
                        </p>
                      )}
                      {(venueFromQuery || selectedCourse.venue) && (
                        <p>
                          Venue: <span className="font-semibold">{venueFromQuery || selectedCourse.venue}</span>
                        </p>
                      )}
                    </div>

                    <div className="mb-6 pb-6 border-b border-border">
                      <p className="text-sm text-muted-foreground mb-2">Checkout Option</p>
                      <p className="font-semibold">
                        {paymentOption === "stripe"
                          ? "Pay Now (Stripe)"
                          : paymentOption === "invoice"
                            ? "Request Invoice (Xero)"
                            : "Request Quote (Xero)"}
                      </p>
                    </div>

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
                          <span>Early Bird</span>
                          <span>-ZAR {pricing.earlyBirdDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      {pricing.vipDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>VIP Discount</span>
                          <span>-ZAR {pricing.vipDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-semibold">Calculated at checkout</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold mb-6">
                      <span>Total</span>
                      <span className="text-primary">ZAR {pricing.total.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select a course to see pricing
                    </p>
                    <Link
                      to="/courses"
                      className="text-primary hover:underline text-sm font-semibold"
                    >
                      Browse Courses →
                    </Link>
                  </>
                )}

                <div className="bg-background rounded-lg p-4 mb-4 border border-border">
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <Lock className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    Your payment is secure and encrypted
                  </p>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>✓ Money-back guarantee</p>
                  <p>✓ Lifetime access</p>
                  <p>✓ 24/7 support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
