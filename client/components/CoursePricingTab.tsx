import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { CourseSchedule, CourseLocation } from "@shared/courseData";
import { COURSE_CATALOG, HUB_VENUES_BY_LOCATION } from "@shared/courseData";
import { calculatePricing } from "@/lib/pricingEngine";
import { downloadBrochure } from "@/lib/brochureService";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface CoursePricingTabProps {
  course: CourseSchedule;
}

export function CoursePricingTab({ course }: CoursePricingTabProps) {
  const [delegates, setDelegates] = useState(3);
  const [includeLaptop, setIncludeLaptop] = useState(course.pricing.laptopIncluded);
  const [vip, setVip] = useState(false);
  const [showTiers, setShowTiers] = useState(false);
  const [requestEarlyBird, setRequestEarlyBird] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"public" | "inhouse">("public");
  const [preferredHub, setPreferredHub] = useState<CourseLocation>(course.location);
  const initialVenue = useMemo(() => {
    const venues = HUB_VENUES_BY_LOCATION[course.location] || [];
    return venues.includes(course.venue) ? course.venue : venues[0] || course.venue;
  }, [course.location, course.venue]);
  const [preferredVenue, setPreferredVenue] = useState<string>(initialVenue);

  // All sessions for this course family (same base title/category)
  const sessions = useMemo(() => {
    const baseTitle = course.title.replace(/\s*\([^)]*\)\s*$/, "");
    return COURSE_CATALOG.filter((c) =>
      c.category === course.category && c.title.startsWith(baseTitle),
    );
  }, [course]);

  const [selectedSessionId, setSelectedSessionId] = useState<string>(course.id);

  const selectedSession = useMemo(() => {
    if (!sessions.length) return course;
    return sessions.find((s) => s.id === selectedSessionId) || course;
  }, [sessions, selectedSessionId, course]);

  const hasDates = Boolean(selectedSession.startDate);

  const earlyBirdConfig = {
    enabled: true,
    daysBeforeStart: 30,
    discountPercent: 10,
    allowRequestOverride: true,
  } as const;

  const courseStart = useMemo(
    () => new Date(selectedSession.startDate),
    [selectedSession.startDate],
  );
  const msUntilStart = courseStart.getTime() - Date.now();
  const meetsEarlyBirdRule =
    earlyBirdConfig.enabled &&
    msUntilStart >= earlyBirdConfig.daysBeforeStart * 24 * 60 * 60 * 1000;

  const resolvedTier = useMemo(() => {
    if (delegates <= 3) return "3 Delegates";
    if (delegates <= 5) return "5 Delegates";
    if (delegates <= 10) return "10 Delegates";
    return "In-house (10+)";
  }, [delegates]);

  const basePricing = useMemo(() => {
    const isInHouse = deliveryMode === "inhouse";
    return calculatePricing({
      course: selectedSession,
      delegateCount: delegates,
      includeLaptop,
      isEarlyBird: meetsEarlyBirdRule,
      isVIP: false,
      isInHouse,
    });
  }, [selectedSession, delegates, includeLaptop, meetsEarlyBirdRule, deliveryMode]);

  const vipUplift = vip ? Math.round(basePricing.total * 0.2) : 0; // 20% premium for VIP
  const finalTotal = basePricing.total + vipUplift;
  const pricePerDelegate = delegates > 0 ? Math.round(finalTotal / delegates) : 0;
  const youSaved = basePricing.earlyBirdDiscount + basePricing.groupDiscount + basePricing.inHouseDiscount;

  const tiers = useMemo(() => {
    const configs = [
      { label: "3 Delegates", delegates: 3, note: "Ideal for small teams" },
      { label: "5 Delegates", delegates: 5, note: "Best value for growing teams" },
      { label: "10 Delegates", delegates: 10, note: "Enterprise cohorts" },
    ] as const;

    return configs.map((tier) => {
      const tierPricing = calculatePricing({
        course: selectedSession,
        delegateCount: tier.delegates,
        includeLaptop,
        isEarlyBird: meetsEarlyBirdRule,
        isVIP: false,
        isInHouse: false,
      });
      const perPerson = Math.round(tierPricing.total / tier.delegates);

      return {
        label: tier.label,
        delegates: tier.delegates,
        total: tierPricing.total,
        perPerson,
        note: tier.note,
      };
    });
  }, [selectedSession, includeLaptop, meetsEarlyBirdRule]);

  const level = getLevel(selectedSession);
  const locationLabel = getLocationLabel(selectedSession);

  const venuesForHub = HUB_VENUES_BY_LOCATION[preferredHub] || [];

  const registerUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("course", selectedSession.id);
    params.set("delegates", String(delegates));
    params.set("delivery", deliveryMode);
    params.set("hub", preferredHub);
    if (preferredVenue) params.set("venue", preferredVenue);
    params.set("laptop", includeLaptop ? "1" : "0");
    params.set("vip", vip ? "1" : "0");
    params.set("early", meetsEarlyBirdRule ? "1" : "0");
    return `/register?${params.toString()}`;
  }, [selectedSession.id, delegates, deliveryMode, preferredHub, preferredVenue, includeLaptop, vip, meetsEarlyBirdRule]);

  const enterpriseUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("course", selectedSession.id);
    params.set("delegates", String(delegates));
    params.set("delivery", deliveryMode);
    params.set("hub", preferredHub);
    if (preferredVenue) params.set("venue", preferredVenue);
    params.set("laptop", includeLaptop ? "1" : "0");
    params.set("vip", vip ? "1" : "0");
    params.set("early", meetsEarlyBirdRule ? "1" : "0");
    return `/register-enterprise?${params.toString()}`;
  }, [selectedSession.id, delegates, deliveryMode, preferredHub, preferredVenue, includeLaptop, vip, meetsEarlyBirdRule]);

  return (
    <div className="space-y-4 text-sm text-foreground">
      {/* A) Meta + interactive options */}
      <section className="rounded-2xl border border-border bg-card p-4">
        <Tabs defaultValue="delivery">
          <TabsList className="mb-4 bg-muted text-muted-foreground">
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="duration">Duration</TabsTrigger>
            <TabsTrigger value="hub">Hub &amp; venue</TabsTrigger>
          </TabsList>

          <TabsContent value="delivery" className="mt-0 space-y-3">
            <p className="text-xs text-muted-foreground">Select how this course will be delivered.</p>
            <Select
              value={deliveryMode}
              onValueChange={(val) => setDeliveryMode(val as "public" | "inhouse")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select delivery mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public hub classroom</SelectItem>
                <SelectItem value="inhouse">In-house at your venue</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>

          <TabsContent value="duration" className="mt-0">
            <div className="space-y-2.5">
              <MetaChip
                label="Standard duration"
                value={`${course.duration} day${course.duration > 1 ? "s" : ""}`}
              />
              <p className="text-xs text-muted-foreground">
                Need a shorter or extended version? We can customise the agenda for private
                in-house delivery.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="hub" className="mt-0 space-y-3">
            <div className="grid gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-foreground">Training hub</p>
                <Select
                  value={preferredHub}
                  onValueChange={(val) => {
                    const nextHub = val as CourseLocation;
                    setPreferredHub(nextHub);
                    const options = HUB_VENUES_BY_LOCATION[nextHub] || [];
                    if (options.length && !options.includes(preferredVenue)) {
                      setPreferredVenue(options[0]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hub" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">South Africa Hub</SelectItem>
                    <SelectItem value="africa">Africa Hub</SelectItem>
                    <SelectItem value="international">International Hub</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-foreground">Preferred venue</p>
                <Select
                  value={preferredVenue}
                  onValueChange={(val) => setPreferredVenue(val)}
                  disabled={!venuesForHub.length}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        venuesForHub.length
                          ? "Select venue"
                          : "No venues available for this hub"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {venuesForHub.map((venue) => (
                      <SelectItem key={venue} value={venue}>
                        {venue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Hub and venue preferences are sent with your registration and invoice request so our
              team books you on the correct session.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      {/* B) Dates / Venue */}
      <section className="rounded-2xl border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-base font-semibold">Dates &amp; Venue</h3>
          <div className="text-xs text-muted-foreground">
            {hasDates ? "Select this session or request another date" : "Schedule on request"}
          </div>
        </div>

        {hasDates && sessions.length > 1 && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Available sessions</p>
            <Select
              value={selectedSessionId}
              onValueChange={(val) => setSelectedSessionId(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date and city" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {formatDateRange(s.startDate, s.endDate)} · {s.venue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {hasDates ? (
          <div className="space-y-3">
            <div className="rounded-xl border border-border bg-muted p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="font-medium">
                  {formatDateRange(selectedSession.startDate, selectedSession.endDate)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {locationLabel} · {selectedSession.venue}
                </div>
              </div>
              <Link
                className="btn-outline"
                to={registerUrl}
              >
                Register for this date
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-muted p-3 text-xs">
            <div className="font-medium">Dates: Upcoming / On request</div>
            <div className="text-white/80 mt-1">
              Venue/Hub will be confirmed upon booking or quotation.
            </div>
          </div>
        )}
      </section>

      {/* C) Pricing configurator */}
      <section className="rounded-2xl border border-border bg-card p-4 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Investment</p>
            <h3 className="text-lg font-semibold tracking-tight">Configure your cohort</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Adjust delegates, laptop support and VIP experience to preview your total investment.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Delegates full-width */}
          <div className="space-y-2">
            <label htmlFor="delegates-input" className="text-sm font-medium">
              Delegates
            </label>
            <div className="flex items-center gap-3">
              <input
                id="delegates-input"
                type="number"
                min={1}
                max={200}
                value={delegates}
                onChange={(e) => setDelegates(Math.max(1, Number(e.target.value) || 1))}
                className="w-32 rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Tier: <span className="font-semibold">{resolvedTier}</span>
              </p>
            </div>
          </div>

          {/* Laptop / VIP side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Laptop support</p>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={includeLaptop}
                  onChange={(e) => setIncludeLaptop(e.target.checked)}
                />
                <span>
                  <span className="block font-medium">Include laptops for delegates</span>
                  <span className="block text-xs text-muted-foreground">
                    Devices supplied and retained by delegates after the course.
                  </span>
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                VIP experience
                {vip && (
                  <span className="inline-flex items-center rounded-full border border-amber-300/60 bg-amber-50/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
                    Premium
                  </span>
                )}
              </p>
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={vip}
                  onChange={(e) => setVip(e.target.checked)}
                />
                <span>
                  <span className="block font-medium">Upgrade to VIP cohort</span>
                  <span className="block text-xs text-muted-foreground">
                    Premium venues, smaller groups and concierge-style delegate support.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center justify-between">
            <span>Early bird status</span>
            {meetsEarlyBirdRule ? (
              <span className="text-[11px] text-emerald-600 dark:text-emerald-300 font-semibold">Eligible</span>
            ) : (
              <span className="text-[11px] text-muted-foreground">Outside early-bird window</span>
            )}
          </label>
          {!meetsEarlyBirdRule && earlyBirdConfig.allowRequestOverride && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={requestEarlyBird}
                onChange={(e) => setRequestEarlyBird(e.target.checked)}
              />
              <span>Request early-bird consideration (subject to approval, not yet applied)</span>
            </label>
          )}
          <p className="text-xs text-muted-foreground">
            Early bird applies when registration is at least {earlyBirdConfig.daysBeforeStart} days before
            the start date.
          </p>
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-border bg-muted p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Base subtotal</span>
            <span className="font-semibold">{formatMoney("ZAR", basePricing.subtotal)}</span>
          </div>
          {basePricing.laptopPrice > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Laptop add-on</span>
              <span className="font-semibold">{formatMoney("ZAR", basePricing.laptopPrice)}</span>
            </div>
          )}
          {basePricing.earlyBirdDiscount > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-300">
              <span>Early bird discount</span>
              <span>-{formatMoney("ZAR", basePricing.earlyBirdDiscount)}</span>
            </div>
          )}
          {basePricing.groupDiscount > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-300">
              <span>Group discount</span>
              <span>-{formatMoney("ZAR", basePricing.groupDiscount)}</span>
            </div>
          )}
          {basePricing.inHouseDiscount > 0 && (
            <div className="flex justify-between text-emerald-700 dark:text-emerald-300">
              <span>In-house discount</span>
              <span>-{formatMoney("ZAR", basePricing.inHouseDiscount)}</span>
            </div>
          )}
          {vipUplift > 0 && (
            <div className="flex justify-between text-amber-700 dark:text-amber-300">
              <span>VIP experience premium</span>
              <span>+{formatMoney("ZAR", vipUplift)}</span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex justify-between items-baseline">
            <div className="space-y-1">
              <div className="font-semibold">Total investment</div>
              <div className="text-xs text-muted-foreground">
                Approx. {formatMoney("ZAR", pricePerDelegate)} per delegate
              </div>
            </div>
            <div className="text-2xl font-bold">{formatMoney("ZAR", finalTotal)}</div>
          </div>
          {youSaved > 0 && (
            <div className="text-xs text-emerald-700 dark:text-emerald-300">
              You saved approximately {formatMoney("ZAR", youSaved)} through early bird, group and
              in-house discounts.
            </div>
          )}
          {requestEarlyBird && !meetsEarlyBirdRule && (
            <div className="text-xs text-amber-700 dark:text-amber-300">
              Early-bird discount requested. Final approval and adjustment will be confirmed on your
              invoice or quotation.
            </div>
          )}
        </div>

        {/* Tier preview */}
        <button
          type="button"
          className="text-xs text-secondary underline"
          onClick={() => setShowTiers((open) => !open)}
        >
          {showTiers ? "Hide tier discounts" : "View tier discounts"}
        </button>

        {showTiers && (
          <div className="overflow-hidden rounded-xl border border-border bg-card text-xs">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr className="text-left">
                  <th className="p-2">Option</th>
                  <th className="p-2">Delegates</th>
                  <th className="p-2">Per person</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier) => (
                  <tr key={tier.label} className="border-t">
                    <td className="p-2 font-medium">{tier.label}</td>
                    <td className="p-2">{tier.delegates}</td>
                    <td className="p-2">{formatMoney("ZAR", tier.perPerson)}</td>
                    <td className="p-2">{formatMoney("ZAR", tier.total)}</td>
                    <td className="p-2 text-muted-foreground">{tier.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* D) CTA tabs */}
      <section className="rounded-2xl border border-border bg-card p-4 overflow-hidden space-y-3">
        <Tabs defaultValue="register">
          <TabsList className="mb-3 grid grid-cols-3 gap-1 rounded-full bg-muted p-1 text-[11px] md:text-xs text-muted-foreground">
            <TabsTrigger
              value="register"
              className="px-2 py-1 leading-tight whitespace-normal text-center rounded-full data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
            >
              Register
            </TabsTrigger>
            <TabsTrigger
              value="invoice"
              className="px-2 py-1 leading-tight whitespace-normal text-center rounded-full data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
            >
              Invoice
            </TabsTrigger>
            <TabsTrigger
              value="brochure"
              className="px-2 py-1 leading-tight whitespace-normal text-center rounded-full data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border"
            >
              Brochure
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-0 space-y-3">
            <p className="text-xs text-muted-foreground">
              Secure seats for this session using the current configuration.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <Link className="btn-primary w-full sm:w-auto justify-center" to={registerUrl}>
                Continue to registration
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="invoice" className="mt-0 space-y-3">
            <p className="text-xs text-muted-foreground">
              Generate a pro-forma invoice or quotation for approvals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <Link className="btn-secondary w-full sm:w-auto justify-center" to={enterpriseUrl}>
                Request invoice / quotation
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="brochure" className="mt-0 space-y-3">
            <p className="text-xs text-muted-foreground">
              Download a branded PDF brochure with full course details.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 text-sm">
              <button
                type="button"
                className="btn-outline w-full sm:w-auto justify-center"
                onClick={() => downloadBrochure(course)}
              >
                Download brochure (PDF)
              </button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-xs text-muted-foreground mt-3">
          Pricing excludes travel for in-house delivery (if applicable). Final confirmation is issued
          on invoice or signed quotation.
        </div>
      </section>
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
    return (
    <div className="rounded-full border border-border bg-muted px-3 py-1 text-[11px] text-foreground">
      <span className="text-muted-foreground">{label}:</span>{" "}
        <span className="font-medium">{value}</span>
      </div>
    );
}

function formatMoney(currency: string, amount: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDateRange(start: string, end?: string) {
  const s = new Date(start).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  if (!end) return s;
  const e = new Date(end).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return `${s} · ${e}`;
}

function getDeliveryMode(course: CourseSchedule): string {
  // For now, catalogue sessions are hub-based in-person delivery.
  // Online/hybrid variants can extend this later if needed.
  return "Hub";
}

function getLevel(course: CourseSchedule): string {
  const title = course.title.toLowerCase();
  if (title.includes("fundamentals") || title.includes("essentials") || title.includes("foundation")) {
    return "Foundation";
  }
  if (
    title.includes("advanced") ||
    title.includes("masterclass") ||
    title.includes("expert") ||
    title.includes("professional certificate")
  ) {
    return "Advanced";
  }
  return "Intermediate";
}

function getLocationLabel(course: CourseSchedule): string {
  return getLocationLabelForValue(course.location);
}

function getLocationLabelForValue(loc: CourseLocation): string {
  switch (loc) {
    case "local":
      return "South Africa Hub";
    case "africa":
      return "Africa Hub";
    case "international":
      return "International";
    default:
      return "Training Hub";
  }
}

function OptionPill({
  label,
  description,
  active,
  onClick,
}: {
  label: string;
  description?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-start rounded-xl border px-3 py-2 text-xs text-left transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-foreground hover:bg-muted"
      }`}
    >
      <span className="font-medium leading-snug">{label}</span>
      {description && (
        <span className="text-[11px] opacity-80 mt-0.5">{description}</span>
      )}
    </button>
  );
}
