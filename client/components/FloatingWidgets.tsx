import { FormEvent, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, MessageSquareText, Bot } from "lucide-react";

type CourseCategory =
  | "Engineering"
  | "Management"
  | "Maritime"
  | "Education"
  | "IT"
  | "Business"
  | "Finance"
  | "Energy"
  | "Healthcare"
  | "Hospitality";

interface CatalogCourse {
  title: string;
  venue: string;
  startDate: string;
  endDate: string;
  category: CourseCategory;
  location: "local" | "africa" | "international";
  duration: number;
}

const CITY_KEYWORDS = [
  "cape town",
  "johannesburg",
  "pretoria",
  "durban",
  "lagos",
  "nairobi",
  "accra",
  "cairo",
  "london",
  "dubai",
  "singapore",
  "new york",
  "sydney",
];

const CATEGORY_KEYWORDS: Record<string, CourseCategory> = {
  engineering: "Engineering",
  management: "Management",
  maritime: "Maritime",
  education: "Education",
  it: "IT",
  "information technology": "IT",
  business: "Business",
  finance: "Finance",
  energy: "Energy",
  healthcare: "Healthcare",
  hospital: "Hospitality",
  hospitality: "Hospitality",
};

const MONTH_KEYWORDS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

async function buildCatalogAnswerFromQuestion(lowerQuestion: string): Promise<string | null> {
  const q = lowerQuestion;

  let matchedCity: string | undefined;
  for (const city of CITY_KEYWORDS) {
    if (q.includes(city)) {
      matchedCity = city;
      break;
    }
  }

  let matchedCategory: CourseCategory | undefined;
  for (const [keyword, category] of Object.entries(CATEGORY_KEYWORDS)) {
    if (q.includes(keyword)) {
      matchedCategory = category;
      break;
    }
  }

  let targetMonth: number | undefined;
  for (const [keyword, month] of Object.entries(MONTH_KEYWORDS)) {
    if (q.includes(keyword)) {
      targetMonth = month;
      break;
    }
  }

  if (!targetMonth) {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    if (q.includes("this month")) {
      targetMonth = currentMonth;
    } else if (q.includes("next month")) {
      targetMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    }
  }

  const hasAnyFilter = Boolean(matchedCity || matchedCategory || targetMonth);
  if (!hasAnyFilter) return null;

  const { COURSE_CATALOG } = await import("@shared/courseData");
  let matches: CatalogCourse[] = COURSE_CATALOG as CatalogCourse[];

  if (matchedCity) {
    matches = matches.filter((course) =>
      course.venue.toLowerCase().includes(matchedCity as string)
    );
  }

  if (matchedCategory) {
    matches = matches.filter((course) => course.category === matchedCategory);
  }

  if (targetMonth) {
    matches = matches.filter((course) => {
      const start = new Date(course.startDate);
      return start.getMonth() + 1 === targetMonth;
    });
  }

  if (matches.length === 0) {
    return null;
  }

  const sorted = [...matches].sort((a, b) => a.startDate.localeCompare(b.startDate));
  const top = sorted.slice(0, 3);

  const uniqueVenues = Array.from(new Set(sorted.map((c) => c.venue.split(",")[0])));
  const uniqueLocations = Array.from(new Set(sorted.map((c) => c.location)));

  const lines = top.map((course) => {
    const dateRange =
      course.startDate === course.endDate
        ? course.startDate
        : `${course.startDate} to ${course.endDate}`;
    return `${course.title} in ${course.venue} from ${dateRange} (${course.duration} day${course.duration > 1 ? "s" : ""})`;
  });

  let response =
    "Here are some scheduled courses from our live catalog that match your question:\n- " +
    lines.join("\n- ");

  const locationSummaryParts: string[] = [];
  if (uniqueLocations.includes("local")) locationSummaryParts.push("South Africa hubs");
  if (uniqueLocations.includes("africa")) locationSummaryParts.push("Africa hubs");
  if (uniqueLocations.includes("international")) locationSummaryParts.push("international hubs");

  if (locationSummaryParts.length > 0) {
    response += `\nThese options are available across ${locationSummaryParts.join(", ")}.`;
  }

  if (uniqueVenues.length > 0) {
    const sampleVenues = uniqueVenues.slice(0, 3).join(", ");
    response += `\nCommon venues in your results include: ${sampleVenues}.`;
  }

  if (sorted.length > top.length) {
    response += `\n...and ${sorted.length - top.length} more. Use the Courses or Course Calendar pages and filter by category and location to see the full list or to choose different dates.`;
  }

  return response;
}

export default function FloatingWidgets() {
  const location = useLocation();
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLastQuestion, setAiLastQuestion] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiIntent, setAiIntent] = useState<
    | "registration"
    | "course-recommendation"
    | "quote"
    | "payment"
    | "pricing"
    | "venue"
    | "in-house"
    | "partnership"
    | null
  >(null);

  const whatsappNumber = "27833910863"; // +27 83 391 0863
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in Knowledge Camp Global training courses and would like to know more about available programs."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const aiContext = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/courses")) {
      return { title: "Course Guidance", items: ["Compare courses", "Find upcoming dates", "Recommend by goals"], cta: "Browse All Courses", href: "/courses" };
    }
    if (path.startsWith("/pricing")) {
      return { title: "Pricing Help", items: ["Explain discounts", "Estimate team pricing", "Compare hubs"], cta: "View Pricing", href: "/pricing" };
    }
    if (path.startsWith("/register")) {
      return { title: "Registration Support", items: ["Choose a course", "Invoice vs online payment", "Laptop add‑on"], cta: "Go to Registration", href: "/register" };
    }
    if (path.startsWith("/in-house")) {
      return { title: "Custom Training", items: ["Build a custom program", "Estimate pricing", "Schedule delivery"], cta: "Request Quote", href: "/register-enterprise" };
    }
    if (path.startsWith("/partners")) {
      return { title: "Partner Support", items: ["Partnership types", "Application steps", "Approval timelines"], cta: "Apply to Partner", href: "/partnerships" };
    }
    return { title: "Quick Help", items: ["Find a course", "Check dates & hubs", "Get a quote"], cta: "Start with Courses", href: "/courses" };
  }, [location.pathname]);

  const answerQuestion = async (raw: string, channel: "web_chat" | "whatsapp" = "web_chat") => {
    const q = raw.trim().toLowerCase();
    if (!q) {
      setAiAnswer(
        "Please type a question about courses, dates, venues, pricing or registration so I can point you to the right place."
      );
      return;
    }

    setAiLastQuestion(raw.trim());

    // Simple follow-up handling based on previous intent
    if (aiIntent === "registration") {
      if (q.includes("individual")) {
        setAiAnswer(
          "Great. For individual bookings, use the Register page, choose your course and date, then continue to Checkout to pay online or request an invoice or quote."
        );
        setAiIntent(null);
        return;
      }
      if (q.includes("team") || q.includes("company") || q.includes("group")) {
        setAiAnswer(
          "Perfect. For teams or company bookings, use the Enterprise & Bulk Registration page to add multiple delegates, then review your invoice or quotation."
        );
        setAiIntent(null);
        return;
      }
    }

    if (aiIntent === "quote") {
      if (q.includes("yes")) {
        setAiAnswer(
          "To request a quote now, go to the Pricing or In-House & Custom pages and complete the quote form, or select the Quote option at Checkout after choosing your course and date."
        );
        setAiIntent(null);
        return;
      }
      if (q.includes("no")) {
        setAiAnswer(
          "No problem. You can still browse courses and pricing, and request a quote later from the course or Checkout pages when you are ready."
        );
        setAiIntent(null);
        return;
      }
    }

    const catalogAnswer = await buildCatalogAnswerFromQuestion(q);
    if (catalogAnswer) {
      setAiAnswer(catalogAnswer);
      setAiIntent("course-recommendation");
      return;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("whatsapp")) {
      setAiAnswer(
        "You can reach Knowledge Camp Global at info@knowledgecamp.co.za, phone +27 11 568 6712 or WhatsApp +27 83 391 0863. Our team typically responds within one business day."
      );
      setAiIntent(null);
      return;
    }

    if (
      q.includes("register") ||
      q.includes("registration") ||
      q.includes("sign up") ||
      q.includes("signup") ||
      q.includes("sign-up") ||
      q.includes("book") ||
      q.includes("booking") ||
      q.includes("enrol") ||
      q.includes("enroll")
    ) {
      setAiAnswer(
        "To register, select a course, choose a date, and complete the registration form. Use the Register page for individuals or the Enterprise & Bulk Registration page for teams. At Checkout you can pay online or request an invoice or quote. Are you registering as an individual or for a team?"
      );
      setAiIntent("registration");
      return;
    }

    if (
      q.includes("course") &&
      (q.includes("find") || q.includes("which") || q.includes("recommend") || q.includes("suggest") || q.includes("best") || q.includes("suitable"))
    ) {
      setAiAnswer(
        "To find the right course, start on the Courses page, filter by category and location, or use the Course Calendar to see upcoming dates. For teams, use Enterprise Registration to register multiple delegates. If you tell me your location, month and category (for example Engineering in Johannesburg in June), I can list a few scheduled options."
      );
      setAiIntent("course-recommendation");
      return;
    }

    if (
      q.includes("quote") ||
      q.includes("quotation") ||
      q.includes("proposal") ||
      q.includes("proforma") ||
      q.includes("pro-forma") ||
      q.includes("estimate")
    ) {
      setAiAnswer(
        "You can request a quote either from the Pricing and In-House pages (using the quote forms) or during registration by choosing the Quote option at Checkout. Quotes are generated from our pricing engine and sent by email from Xero for review and approval. Would you like to request a quote now?"
      );
      setAiIntent("quote");
      return;
    }

    if (
      q.includes("payment") ||
      q.includes("pay now") ||
      q.includes("card") ||
      q.includes("stripe") ||
      q.includes("invoice") ||
      q.includes("eft") ||
      q.includes("bank transfer") ||
      q.includes("bank")
    ) {
      setAiAnswer(
        "For most public courses you can either pay now by card via Stripe, request an invoice, or request a quote. Pay Now gives instant confirmation and a receipt. The Invoice and Quote options create a Xero document that is emailed to you with VAT and payment terms."
      );
      setAiIntent("payment");
      return;
    }

    if (
      q.includes("price") ||
      q.includes("pricing") ||
      q.includes("cost") ||
      q.includes("discount") ||
      q.includes("fee") ||
      q.includes("fees") ||
      q.includes("rate") ||
      q.includes("rates") ||
      q.includes("how much")
    ) {
      setAiAnswer(
        "Pricing depends on the specific course, location and number of delegates. You can see pricing on the Courses and Pricing pages, and each Course Detail page includes a calculator for delegate numbers and laptop options. Groups of 3–4 get 10% off, 5–9 get 15% off, and 10+ get 25% off. For a firm quote, use Request Quote or Enterprise Registration."
      );
      setAiIntent("pricing");
      return;
    }

    if (
      q.includes("venue") ||
      q.includes("location") ||
      q.includes("hub") ||
      q.includes("city") ||
      q.includes("town") ||
      q.includes("where")
    ) {
      setAiAnswer(
        "We run public courses across South Africa (Johannesburg, Pretoria, Durban, Cape Town), Africa hubs (for example Nairobi and Lagos) and selected international hubs (such as Dubai and London). See the Venues and Hub pages for current locations and schedules."
      );
      setAiIntent("venue");
      return;
    }

    if (
      q.includes("in-house") ||
      q.includes("inhouse") ||
      q.includes("custom") ||
      q.includes("onsite") ||
      q.includes("on site") ||
      q.includes("company training") ||
      q.includes("corporate training")
    ) {
      setAiAnswer(
        "For in-house or custom training, use the In-House & Custom page or the Enterprise Registration option to request a tailored program and quote. We can align content, schedule and delivery to your organisation."
      );
      setAiIntent("in-house");
      return;
    }

    if (q.includes("partner") || q.includes("partnership")) {
      setAiAnswer(
        "For partnership opportunities, visit the Partnerships page to compare partnership models and submit an application, or email partner@knowledgecamp.co.za for more information."
      );
      setAiIntent("partnership");
      return;
    }

    if (q.includes("certificate") || q.includes("certificates") || q.includes("certification")) {
      setAiAnswer(
        "All learners receive a certificate of completion after successfully completing a Knowledge Camp Global course. For in-house or LMS deliveries, certificates are managed centrally for your delegates."
      );
      setAiIntent(null);
      return;
    }

    if (q.includes("lms") || q.includes("portal") || q.includes("online platform")) {
      setAiAnswer(
        "Our LMS supports on-demand access, progress tracking and certificates. You can join the LMS waitlist on the LMS page to be notified when your courses are available on the platform."
      );
      setAiIntent(null);
      return;
    }

    if (
      q.includes("cancel") ||
      q.includes("cancellation") ||
      q.includes("resched") ||
      q.includes("change date") ||
      q.includes("change my date") ||
      q.includes("can't attend") ||
      q.includes("cannot attend")
    ) {
      setAiAnswer(
        "We understand that circumstances change. Please contact us to discuss options, including rescheduling to a future session or requesting a refund, so we can apply the most suitable option for your situation."
      );
      setAiIntent(null);
      return;
    }

    // Last resort: query the FAQ knowledgebase API before giving up
    try {
      const resp = await fetch(`/api/faq/search?q=${encodeURIComponent(raw)}&limit=1`);
      if (resp.ok) {
        const data = (await resp.json()) as { items?: { question: string; answer: string; shortAnswer?: string; url?: string }[] };
        const top = data.items && data.items[0];
        if (top) {
          const baseAnswer = top.shortAnswer || top.answer;
          const link = top.url ? `\nMore details: ${top.url}` : "";
          setAiAnswer(baseAnswer + link);
          setAiIntent(null);
          return;
        }
      }
    } catch {
      // Ignore FAQ errors and fall back to generic guidance
    }

    // If we still don't have a good answer, send a lightweight handover
    // payload to the backend so the sales team can see unanswered
    // questions and follow up where valuable.
    try {
      await fetch("/api/assist/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadType: "individual",
          channel,
          summary: `Unanswered assistant question on ${location.pathname} via ${channel}: "${raw.trim()}"`,
          tags: ["ai-unanswered"],
        }),
      });
    } catch {
      // Swallow errors – this should never block the user experience
    }

    setAiAnswer(
      "I might not fully understand this question without guessing. If it's about courses, dates, venues, pricing, registration, quotes, payments, certificates or LMS, try including those words, or use the Courses, Calendar, Pricing, Venues, FAQ or Contact pages, or reach us on WhatsApp for a precise answer."
    );
    setAiIntent(null);
  };

  const handleAiSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const current = aiQuestion;
    setAiQuestion("");
    if (!current.trim()) return;
    setAiLoading(true);
    try {
      await answerQuestion(current, "web_chat");
    } finally {
      setAiLoading(false);
    }
  };
  return (
    <>
      {/* AI & Support Widgets Column */}
      <div className="fixed right-4 sm:right-6 bottom-28 sm:bottom-36 z-[60] flex flex-col items-end gap-3">
        {/* AI Assistant Widget */}
        <div>
          {!aiOpen && (
            <button
              onClick={() => setAiOpen(true)}
              className="h-12 w-12 rounded-full bg-black text-white shadow-lg hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-transform flex items-center justify-center border border-white/10"
              title="AI Assistant"
              aria-label="AI Assistant"
            >
              <Bot className="h-6 w-6" />
            </button>
          )}

          {aiOpen && (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-80 max-w-[90vw] max-h-[60vh] border border-gray-200 flex flex-col transition-transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-black via-neutral-900 to-black text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Knowledge Camp AI Assistant</h3>
                  <p className="text-xs text-white/80">Fast guidance on courses & registration</p>
                </div>
                <button
                  onClick={() => setAiOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-full transition-colors"
                  title="Close AI Assistant"
                  aria-label="Close AI Assistant"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 text-sm text-gray-700 space-y-3 overflow-y-auto bg-gradient-to-b from-gray-50 via-white to-white">
                <p className="font-semibold">{aiContext.title}</p>
                <ul className="space-y-2">
                  {aiContext.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <a
                  href={aiContext.href}
                  className="block text-center px-4 py-2 bg-primary text-white rounded-lg font-semibold"
                >
                  {aiContext.cta}
                </a>
                <div className="flex flex-wrap gap-2 mt-1">
                  <button
                    type="button"
                    onClick={async () => {
                      const prompt = "Help me choose a course for my role and location";
                      setAiQuestion("");
                      setAiLoading(true);
                      try {
                        await answerQuestion(prompt, "web_chat");
                      } finally {
                        setAiLoading(false);
                      }
                    }}
                    className="px-3 py-1 rounded-full border border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Suggest a course for me
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const prompt = "What are my payment and invoice options?";
                      setAiQuestion("");
                      setAiLoading(true);
                      try {
                        await answerQuestion(prompt, "web_chat");
                      } finally {
                        setAiLoading(false);
                      }
                    }}
                    className="px-3 py-1 rounded-full border border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Explain payment options
                  </button>
                </div>
                <form onSubmit={handleAiSubmit} className="mt-3 space-y-2">
                  <label className="text-xs text-gray-500 block" htmlFor="ai-question">
                    Ask a short question about courses, dates, venues, pricing or registration. If I'm not sure, I will say so.
                  </label>
                  <input
                    id="ai-question"
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Example: Where do you run public courses?"
                  />
                  <button
                    type="submit"
                    disabled={aiLoading}
                    className="w-full px-3 py-2 bg-black text-white rounded-lg text-xs font-semibold hover:bg-gray-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {aiLoading ? "Thinking..." : "Get answer"}
                  </button>
                </form>
                {(aiLastQuestion || aiAnswer) && (
                  <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 space-y-1">
                    {aiLastQuestion && (
                      <p className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">
                        You asked: <span className="normal-case">{aiLastQuestion}</span>
                      </p>
                    )}
                    {aiAnswer && <p className="whitespace-pre-line">{aiAnswer}</p>}
                    {aiIntent === "registration" && (
                      <p className="text-[10px] text-gray-500">
                        Tip: Reply "individual" or "team" so I can point you to the right registration path.
                      </p>
                    )}
                    {aiIntent === "quote" && (
                      <p className="text-[10px] text-gray-500">
                        Tip: Reply "yes" if you want to request a quote now, or "no" to keep browsing first.
                      </p>
                    )}
                    {aiIntent === "course-recommendation" && (
                      <p className="text-[10px] text-gray-500">
                        Tip: Include your city, month and category (for example "Engineering in Johannesburg in June") so I can list matching scheduled courses.
                      </p>
                    )}
                    {!aiIntent && !aiLoading && (
                      <p className="text-[10px] text-gray-400">
                        If this didnt fully answer your question, you can still contact a human advisor via WhatsApp, phone or email below.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Support Chat Widget - Secondary */}
        <div>
          {!chatOpen && (
            <button
              onClick={() => setChatOpen(true)}
              className="h-12 w-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl hover:scale-110 hover:-translate-y-1 transition-transform flex items-center justify-center border border-white/10"
              title="Contact Support"
            >
              <MessageSquareText className="h-6 w-6" />
            </button>
          )}

          {chatOpen && (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-80 border border-gray-200 transition-transform hover:-translate-y-1">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary via-primary to-primary text-white p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">Contact Support</h3>
                  <p className="text-xs text-white/80">Talk to a human advisor</p>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="hover:bg-white/20 p-1 rounded-full transition-colors"
                  title="Close Support Chat"
                  aria-label="Close Support Chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 bg-gradient-to-b from-gray-50 via-white to-white">
                <p className="text-sm text-gray-700 font-semibold">Quick Links</p>

                <div className="space-y-2">
                  <a
                    href="https://wa.me/27833910863"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-sm font-semibold text-green-700"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>

                  <a
                    href="tel:+27115686712"
                    className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-semibold text-blue-700"
                  >
                    <MessageSquareText className="h-5 w-5" />
                    Call Us
                  </a>

                  <a
                    href="mailto:info@knowledgecamp.co.za"
                    className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-sm font-semibold text-orange-700"
                  >
                    <MessageSquareText className="h-5 w-5" />
                    Email
                  </a>
                  <a
                    href="/faq"
                    className="flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-sm font-semibold text-purple-700"
                  >
                    <MessageSquareText className="h-5 w-5" />
                    FAQ & common questions
                  </a>
                </div>

                <hr className="my-4" />

                <div className="text-xs text-gray-600 space-y-2">
                  <p>
                    <span className="font-semibold">WhatsApp:</span> +27 83 391 0863
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> +27 11 568 6712
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> info@knowledgecamp.co.za
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-primary text-white py-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="text-sm font-semibold">Ready to upskill your team? Get started in minutes.</div>
        <div className="flex gap-2">
          <a
            href="/register"
            className="px-4 py-2 bg-white text-primary rounded-md font-semibold"
          >
            Register
          </a>
          <a
            href="/register-enterprise"
            className="px-4 py-2 border border-white rounded-md font-semibold"
          >
            Request Quote
          </a>
        </div>
      </div>
      {/* WhatsApp Widget - Primary CTA */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60]">
        {!whatsappOpen && (
          <button
            onClick={() => setWhatsappOpen(true)}
            className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center group"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="h-7 w-7" />
            <span className="absolute right-0 top-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        )}

        {whatsappOpen && (
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-80 sm:w-96 max-w-full max-h-[80vh] border border-gray-200 animate-in flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] via-emerald-500 to-[#25D366] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">Knowledge Camp Support</h3>
                <p className="text-xs text-green-100">WhatsApp-first support for courses & registration</p>
              </div>
              <button
                onClick={() => setWhatsappOpen(false)}
                className="hover:bg-green-600 p-1 rounded-full transition-colors"
                title="Close WhatsApp"
                aria-label="Close WhatsApp"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Preview */}
            <div className="flex-1 min-h-[220px] max-h-[360px] overflow-y-auto bg-gradient-to-b from-[#e9fdf3] via-gray-50 to-white p-4 flex flex-col gap-4">
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                  <p className="text-sm font-semibold">Welcome! 👋</p>
                  <p className="text-sm mt-2">
                    Thanks for reaching out to Knowledge Camp Global. We're here to help with course information, registration, and any other questions.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">11:30</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                  <p className="text-sm">
                    🎓 Explore 70+ professional courses<br />
                    📍 Training across SA, Africa & Globally<br />
                    💼 Custom in-house training available<br />
                    🏢 Partnership opportunities
                  </p>
                  <p className="text-xs text-gray-500 mt-2">11:31</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                  <p className="text-sm">
                    How can we assist you today?
                  </p>
                  <p className="text-xs text-gray-500 mt-2">11:32</p>
                </div>
              </div>

              {aiAnswer && (
                <div className="flex justify-start">
                  <div className="bg-[#e9fdf3] border border-[#b8f0cf] p-3 rounded-lg rounded-tl-none shadow-sm max-w-xs">
                    <p className="text-xs font-semibold text-emerald-700 mb-1">Assistant</p>
                    <p className="text-sm whitespace-pre-line text-gray-800">{aiAnswer}</p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button + On-site Question Box */}
            <div className="border-t border-gray-200 p-4 bg-white space-y-3">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const input = (e.currentTarget.elements.namedItem("whatsapp-question") as HTMLInputElement | null)?.value ?? "";
                  if (!input.trim()) return;
                  (e.currentTarget.elements.namedItem("whatsapp-question") as HTMLInputElement | null)!.value = "";
                  setAiLoading(true);
                  try {
                    await answerQuestion(input, "whatsapp");
                  } finally {
                    setAiLoading(false);
                  }
                }}
                className="space-y-2"
              >
                <label className="text-xs text-gray-500 block" htmlFor="whatsapp-question">
                  Ask a quick question here or tap below to continue in WhatsApp.
                </label>
                <input
                  id="whatsapp-question"
                  name="whatsapp-question"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                  placeholder="Example: Can I register a team in Johannesburg?"
                />
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="w-full px-3 py-2 bg-[#25D366] text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {aiLoading ? "Thinking..." : "Get answer here"}
                </button>
              </form>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
              >
                <MessageCircle className="h-5 w-5" />
                Open WhatsApp Chat
              </a>
              <p className="text-xs text-gray-500 text-center mt-2">
                WhatsApp: +27 83 391 0863
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Support floating handled in AI & Support column above */}
    </>
  );
}
