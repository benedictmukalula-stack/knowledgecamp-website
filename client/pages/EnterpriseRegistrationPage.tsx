import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { ChevronRight, Plus, Trash2, Download, Mail, AlertCircle } from "lucide-react";
import { SectionImage } from "@/components/SectionImage";
import {
  downloadQuotationAsHTML,
  generateEmailTemplate,
  type QuotationDetails,
} from "@/lib/quotationService";
import { COURSE_CATALOG } from "@shared/courseData";
import { calculatePricing } from "@/lib/pricingEngine";
import { Link, useSearchParams } from "react-router-dom";

interface CompanyDetails {
  companyName: string;
  registrationNumber: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  numberOfEmployees: string;
  industry: string;
}

interface AuthoriserDetails {
  fullName: string;
  position: string;
  email: string;
  phone: string;
  department: string;
}

interface DelegateDetails {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  courseId: string;
  locationPreference: "local" | "africa" | "international";
  includesLaptop: boolean;
}

interface CartItem {
  courseId: string;
  courseTitle: string;
  location: "local" | "africa" | "international";
  basePrice: number;
  laptopPrice: number;
  includesLaptop: boolean;
  delegates: DelegateDetails[];
  discountPercentage: number;
  subtotal: number;
}

type RegistrationStep = "company" | "authoriser" | "delegates" | "cart" | "invoice";

const ENTERPRISE_PROFILE_STORAGE_KEY = "kcg_enterprise_profile_v1";

const INDUSTRIES = [
  "Engineering",
  "Manufacturing",
  "Mining",
  "Energy",
  "Finance",
  "Healthcare",
  "Education",
  "Government",
  "Logistics",
  "Retail",
  "Technology",
  "Other",
];

const COUNTRIES = [
  "South Africa",
  "Nigeria",
  "Kenya",
  "Egypt",
  "Ghana",
  "Botswana",
  "Namibia",
  "Zambia",
  "Zimbabwe",
  "Tanzania",
  "Ethiopia",
  "Uganda",
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "Singapore",
  "Australia",
];

export default function EnterpriseRegistrationPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<RegistrationStep>("company");
  const [company, setCompany] = useState<CompanyDetails>({
    companyName: "",
    registrationNumber: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    numberOfEmployees: "",
    industry: "",
  });

  const [authoriser, setAuthoriser] = useState<AuthoriserDetails>({
    fullName: "",
    position: "",
    email: "",
    phone: "",
    department: "",
  });

  const [delegates, setDelegates] = useState<DelegateDetails[]>([]);
  const [currentDelegate, setCurrentDelegate] = useState<Partial<DelegateDetails>>({
    id: Date.now().toString(),
    locationPreference: "local",
    includesLaptop: false,
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [invoiceNumber] = useState(`INV-2026-${Math.floor(Math.random() * 10000)}`);

  const [savedProfile, setSavedProfile] = useState<
    | {
        company: CompanyDetails;
        authoriser: AuthoriserDetails;
        marketingOptIn?: boolean;
      }
    | null
  >(null);
  const [useSavedProfile, setUseSavedProfile] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  // Pre-fill from course detail pricing tab (hub, venue, delegates)
  useEffect(() => {
    const courseIdFromQuery = searchParams.get("course");
    const hubFromQuery = searchParams.get("hub") as
      | "local"
      | "africa"
      | "international"
      | null;
    const laptopFromQuery = searchParams.get("laptop");

    setCurrentDelegate((prev) => ({
      ...prev,
      courseId: courseIdFromQuery || prev.courseId,
      locationPreference: hubFromQuery || prev.locationPreference || "local",
      includesLaptop:
        laptopFromQuery === "1" || prev.includesLaptop || false,
    }));
  }, [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(ENTERPRISE_PROFILE_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        company: CompanyDetails;
        authoriser: AuthoriserDetails;
        marketingOptIn?: boolean;
      };
      if (parsed && parsed.company && parsed.authoriser) {
        setSavedProfile(parsed);
      }
    } catch {
      // ignore invalid stored data
    }
  }, []);

  const calculateDiscount = (delegateCount: number): number => {
    if (delegateCount >= 10) return 25;
    if (delegateCount >= 5) return 15;
    if (delegateCount >= 3) return 10;
    return 0;
  };

  const handleAddDelegate = () => {
    if (
      currentDelegate.fullName &&
      currentDelegate.email &&
      currentDelegate.courseId
    ) {
      setDelegates([
        ...delegates,
        {
          id: currentDelegate.id || Date.now().toString(),
          fullName: currentDelegate.fullName,
          email: currentDelegate.email,
          phone: currentDelegate.phone || "",
          position: currentDelegate.position || "",
          courseId: currentDelegate.courseId,
          locationPreference: currentDelegate.locationPreference || "local",
          includesLaptop: currentDelegate.includesLaptop || false,
        },
      ]);
      setCurrentDelegate({
        id: Date.now().toString(),
        locationPreference: "local",
        includesLaptop: false,
      });
    }
  };

  const handleRemoveDelegate = (id: string) => {
    setDelegates(delegates.filter((d) => d.id !== id));
  };

  const calculateTotal = (): number => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  const handleProceedToDelegate = () => {
    if (company.companyName && company.email && company.country) {
      setStep("delegates");
    }
  };

  const isEarlyBird = (course: any) => course && (new Date(course.startDate).getTime() - Date.now()) < 1000 * 60 * 60 * 24 * 30;
  const isVIP = (course: any) => course && course.rating > 4.8;
  const isInHouse = true;
  const handleProceedToCart = () => {
    if (authoriser.fullName && authoriser.email && delegates.length > 0) {
      const grouped = delegates.reduce<Record<string, DelegateDetails[]>>((acc, delegate) => {
        const key = `${delegate.courseId}|${delegate.includesLaptop ? "laptop" : "no-laptop"}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(delegate);
        return acc;
      }, {});

      const cartItems: CartItem[] = Object.values(grouped).map((group) => {
        const representative = group[0];
        const course = COURSE_CATALOG.find((c) => c.id === representative.courseId);
        if (!course) return null;
        const pricing = calculatePricing({
          course,
          delegateCount: group.length,
          includeLaptop: representative.includesLaptop,
          isEarlyBird: isEarlyBird(course),
          isVIP: isVIP(course),
          isInHouse,
        });

        const discountPercentage = pricing.subtotal > 0
          ? 100 - Math.round((pricing.total / pricing.subtotal) * 100)
          : 0;

        return {
          courseId: representative.courseId,
          courseTitle: course.title,
          location: course.location,
          basePrice: pricing.basePrice,
          laptopPrice: pricing.laptopPrice,
          includesLaptop: pricing.laptopIncluded || representative.includesLaptop,
          delegates: group,
          discountPercentage,
          subtotal: pricing.total,
        };
      }).filter(Boolean) as CartItem[];

      setCart(cartItems);
      setStep("cart");
    }
  };

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Enterprise & Bulk Registration</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Register multiple delegates, customize courses, and get enterprise pricing. Our streamlined process handles your entire team.
          </p>
        </div>
      </section>

      {/* ENTERPRISE IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="/images/site/enterprise.svg"
            alt="Senior executives reviewing enterprise training proposal and custom quotation in boardroom"
          />
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-background border-b border-border sticky top-16 z-30">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            {(
              [
                { step: "company", label: "Company" },
                { step: "authoriser", label: "Authoriser" },
                { step: "delegates", label: "Delegates" },
                { step: "cart", label: "Review" },
                { step: "invoice", label: "Invoice" },
              ] as const
            ).map((s, index) => (
              <div key={s.step} className="flex items-center flex-1">
                <button
                  onClick={() =>
                    step === s.step ||
                    (s.step === "company" && step !== "invoice") ||
                    (s.step === "authoriser" && step !== "invoice" && step !== "company") ||
                    (s.step === "delegates" &&
                      (step === "cart" || step === "invoice"))
                  }
                  disabled={
                    step !== s.step &&
                    step !== "company" &&
                    step === "invoice"
                  }
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                    step === s.step
                      ? "bg-secondary text-primary"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {s.label}
                </button>
                {index < 4 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12 md:py-16 min-h-[80vh]">
        <div className="container max-w-4xl">
          {/* COMPANY DETAILS STEP */}
          {step === "company" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Company Details</h2>
              <div className="bg-background border border-border rounded-xl p-8 space-y-6">
                {savedProfile && (
                  <div className="bg-muted/40 border border-dashed border-border rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-secondary mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-semibold">
                        We found a previous company profile for {savedProfile.company.companyName}.
                      </p>
                      <label className="flex items-start gap-2 text-muted-foreground">
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={useSavedProfile}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setUseSavedProfile(checked);
                            if (checked && savedProfile) {
                              setCompany(savedProfile.company);
                              setAuthoriser(savedProfile.authoriser);
                              setMarketingOptIn(Boolean(savedProfile.marketingOptIn));
                            }
                          }}
                        />
                        <span>
                          Use saved company & authoriser details for this registration.
                        </span>
                      </label>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={company.companyName}
                      onChange={(e) =>
                        setCompany({ ...company, companyName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      value={company.registrationNumber}
                      onChange={(e) =>
                        setCompany({
                          ...company,
                          registrationNumber: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Registration #"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={company.address}
                      onChange={(e) =>
                        setCompany({ ...company, address: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={company.city}
                      onChange={(e) =>
                        setCompany({ ...company, city: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Country *
                    </label>
                    <select
                      value={company.country}
                      onChange={(e) =>
                        setCompany({ ...company, country: e.target.value })
                      }
                      title="Country"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Industry *
                    </label>
                    <select
                      value={company.industry}
                      onChange={(e) =>
                        setCompany({ ...company, industry: e.target.value })
                      }
                      title="Industry"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>
                          {ind}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Number of Employees
                    </label>
                    <select
                      value={company.numberOfEmployees}
                      onChange={(e) =>
                        setCompany({
                          ...company,
                          numberOfEmployees: e.target.value,
                        })
                      }
                      title="Number of Employees"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Select</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="501-1000">501-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company Email *
                    </label>
                    <input
                      type="email"
                      value={company.email}
                      onChange={(e) =>
                        setCompany({ ...company, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="company@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={company.phone}
                      onChange={(e) =>
                        setCompany({ ...company, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+27 (0) 11 234 5678"
                    />
                  </div>
                </div>

                <button
                  onClick={handleProceedToDelegate}
                  className="mt-8 w-full px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors"
                >
                  Next: Authoriser Details
                </button>
              </div>
            </div>
          )}

          {/* AUTHORISER DETAILS STEP */}
          {step === "authoriser" && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Authoriser Details</h2>
              <p className="text-muted-foreground mb-8">
                Who will authorize this training request?
              </p>

              <div className="bg-background border border-border rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={authoriser.fullName}
                      onChange={(e) =>
                        setAuthoriser({
                          ...authoriser,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      value={authoriser.position}
                      onChange={(e) =>
                        setAuthoriser({
                          ...authoriser,
                          position: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Manager, Director, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={authoriser.department}
                      onChange={(e) =>
                        setAuthoriser({
                          ...authoriser,
                          department: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="HR, Operations, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={authoriser.email}
                      onChange={(e) =>
                        setAuthoriser({
                          ...authoriser,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={authoriser.phone}
                      onChange={(e) =>
                        setAuthoriser({
                          ...authoriser,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+27 (0) 11 234 5678"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep("company")}
                    className="flex-1 px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep("delegates")}
                    className="flex-1 px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors"
                  >
                    Next: Add Delegates
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DELEGATES STEP */}
          {step === "delegates" && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Delegate Details</h2>
              <p className="text-muted-foreground mb-8">
                Add training participants. Minimum 1 delegate required.
              </p>

              {/* Add New Delegate Form */}
              <div className="bg-secondary/10 border border-secondary rounded-xl p-6 mb-8">
                <h3 className="font-semibold mb-4">Add New Delegate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={currentDelegate.fullName || ""}
                      onChange={(e) =>
                        setCurrentDelegate({
                          ...currentDelegate,
                          fullName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Delegate name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={currentDelegate.email || ""}
                      onChange={(e) =>
                        setCurrentDelegate({
                          ...currentDelegate,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="delegate@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={currentDelegate.position || ""}
                      onChange={(e) =>
                        setCurrentDelegate({
                          ...currentDelegate,
                          position: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Job title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={currentDelegate.phone || ""}
                      onChange={(e) =>
                        setCurrentDelegate({
                          ...currentDelegate,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+27 ..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">
                      Select Course *
                    </label>
                    <select
                      value={currentDelegate.courseId || ""}
                      onChange={(e) => {
                        const course = COURSE_CATALOG.find(
                          (c) => c.id === e.target.value,
                        );
                        setCurrentDelegate({
                          ...currentDelegate,
                          courseId: e.target.value,
                          locationPreference: course?.location || "local",
                        });
                      }}
                      title="Select Course"
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    >
                      <option value="">Choose a course...</option>
                      {COURSE_CATALOG.map((course) => {
                        const pricePerDay = course.pricing.basePrice / course.duration;
                        return (
                          <option key={course.id} value={course.id}>
                            {course.title} - {course.duration} days - ZAR {pricePerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })}/ day
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-3 text-sm font-semibold pt-6">
                      <input
                        type="checkbox"
                        checked={currentDelegate.includesLaptop || false}
                        onChange={(e) =>
                          setCurrentDelegate({
                            ...currentDelegate,
                            includesLaptop: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      {currentDelegate.courseId ? (
                        <>
                          Include Laptop (+ZAR{" "}
                          {(
                            COURSE_CATALOG.find((c) => c.id === currentDelegate.courseId)
                              ?.pricing.laptopPrice || 0
                          ).toLocaleString()})
                        </>
                      ) : (
                        "Include Laptop"
                      )}
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleAddDelegate}
                  className="mt-4 flex items-center gap-2 px-6 py-2 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Delegate
                </button>
              </div>

              {/* Delegates List */}
              {delegates.length > 0 && (
                <div className="bg-background border border-border rounded-xl p-6 mb-8">
                  <h3 className="font-semibold mb-4">
                    Delegates Added ({delegates.length})
                  </h3>
                  <div className="space-y-3">
                    {delegates.map((delegate) => (
                      <div
                        key={delegate.id}
                        className="flex items-center justify-between bg-muted/30 p-4 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold">{delegate.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {delegate.email} •{" "}
                            {(() => {
                              const course = COURSE_CATALOG.find(
                                (c) => c.id === delegate.courseId,
                              );
                              return course
                                ? course.title
                                : "No course selected";
                            })()}
                            {delegate.includesLaptop && " • With Laptop"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveDelegate(delegate.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          title="Remove delegate"
                          aria-label="Remove delegate"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep("authoriser")}
                  className="flex-1 px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleProceedToCart}
                  disabled={delegates.length === 0}
                  className="flex-1 px-6 py-3 bg-primary text-white hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground font-semibold rounded-lg transition-colors"
                >
                  Review Cart
                </button>
              </div>
            </div>
          )}

          {/* CART REVIEW STEP */}
          {step === "cart" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Review Your Order</h2>

              {/* Cart Items */}
              <div className="bg-background border border-border rounded-xl p-8 mb-8">
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-border pb-6 last:border-0"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.courseTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.delegates.length} delegate
                            {item.delegates.length > 1 ? "s" : ""}
                          </p>
                        </div>
                        <button className="text-primary hover:underline text-sm font-semibold">
                          Edit
                        </button>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-4 mb-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>
                            Base Price ({(() => {
                              const course = COURSE_CATALOG.find(
                                (c) => c.id === item.courseId,
                              );
                              return course
                                ? `${course.duration} days`
                                : "N/A";
                            })()}):
                          </span>
                          <span>ZAR {item.basePrice.toLocaleString()}</span>
                        </div>
                        {item.includesLaptop && (
                          <div className="flex justify-between">
                            <span>Laptop:</span>
                            <span>ZAR {item.laptopPrice.toLocaleString()}</span>
                          </div>
                        )}
                        {item.discountPercentage > 0 && (
                          <div className="flex justify-between text-secondary font-semibold">
                            <span>
                              Discount ({item.discountPercentage}%):
                            </span>
                            <span>
                              -ZAR{" "}
                              {Math.round(
                                ((item.basePrice +
                                  (item.includesLaptop ? item.laptopPrice : 0)) *
                                  item.discountPercentage) /
                                  100
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between font-bold pt-2 border-t border-border">
                          <span>Total:</span>
                          <span>ZAR {item.subtotal.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Grand Total:</span>
                    <span className="text-3xl font-bold text-secondary">
                      ZAR {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Applicable discounts have been applied based on delegate count
                  </p>
                </div>
              </div>

              {/* Company Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-muted/30 border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-3">Company</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {company.companyName}
                  </p>
                  <p className="text-sm text-muted-foreground">{company.address}</p>
                  <p className="text-sm text-muted-foreground">{company.city}, {company.country}</p>
                </div>

                <div className="bg-muted/30 border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-3">Authoriser</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {authoriser.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {authoriser.position}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {authoriser.email}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setStep("delegates")}
                  className="flex-1 px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("invoice")}
                  className="flex-1 px-6 py-3 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-colors"
                >
                  Generate Invoice & Proceed
                </button>
              </div>
            </div>
          )}

          {/* INVOICE STEP */}
          {step === "invoice" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Invoice</h2>

              <div className="bg-background border border-border rounded-xl p-12 mb-8 space-y-8">
                {/* Invoice Header */}
                <div className="flex justify-between items-start mb-12 pb-8 border-b border-border">
                  <div>
                    <h1 className="text-2xl font-bold">Knowledge Camp Global</h1>
                    <p className="text-muted-foreground">Professional Training & Development</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Invoice #{invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      Date: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Bill To */}
                <div className="grid grid-cols-2 gap-12 mb-12">
                  <div>
                    <h3 className="font-semibold mb-3">BILL TO:</h3>
                    <p className="font-semibold">{company.companyName}</p>
                    <p className="text-sm text-muted-foreground">{company.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {company.city}, {company.country}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {company.email}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">AUTHORIZED BY:</h3>
                    <p className="font-semibold">{authoriser.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {authoriser.position}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {authoriser.department}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {authoriser.email}
                    </p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-12">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-primary">
                        <th className="text-left py-2 font-semibold">Description</th>
                        <th className="text-right py-2 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="py-3">
                            {item.courseTitle}
                            <br />
                            <span className="text-sm text-muted-foreground">
                              {item.delegates.length} delegate
                              {item.delegates.length > 1 ? "s" : ""}
                              {item.includesLaptop && " + Laptop"}
                            </span>
                          </td>
                          <td className="text-right py-3">
                            ZAR {item.subtotal.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                  <div className="w-80">
                    <div className="flex justify-between py-2 mb-2">
                      <span>Subtotal:</span>
                      <span>ZAR {calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 mb-2 pb-2 border-b-2 border-primary text-xs text-muted-foreground">
                      <span>Tax (if applicable):</span>
                      <span>
                        Calculated and shown on the official tax invoice (e.g. VAT 15% where applicable)
                      </span>
                    </div>
                    <div className="flex justify-between py-3 text-lg font-bold">
                      <span>TOTAL DUE:</span>
                      <span className="text-secondary">
                        ZAR {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Notes:</span> This quotation is valid for 30
                    days. Discounts applied are based on the number of delegates.
                    In-house training options are available. Please contact us for
                    payment terms and scheduling.
                  </p>
                </div>

                <div className="bg-muted/20 border border-border rounded-lg p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="enterprise-terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="enterprise-terms" className="text-sm text-muted-foreground">
                      I confirm I am authorised to request this training on behalf of the
                      organisation and accept the{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="enterprise-marketing"
                      checked={marketingOptIn}
                      onChange={(e) => setMarketingOptIn(e.target.checked)}
                      className="mt-1"
                    />
                    <label
                      htmlFor="enterprise-marketing"
                      className="text-sm text-muted-foreground"
                    >
                      I would like to receive training calendars, specials, discounted courses,
                      offers and promotions from Knowledge Camp Global.
                    </label>
                  </div>
                </div>
              </div>

              {/* Download & Email Actions */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    const quotationDetails: QuotationDetails = {
                      invoiceNumber,
                      date: new Date().toLocaleDateString("en-ZA"),
                      company,
                      authoriser,
                      items: cart,
                      total: calculateTotal(),
                      validityDays: 30,
                      marketingOptIn,
                    };
                    downloadQuotationAsHTML(quotationDetails);
                  }}
                  disabled={!acceptTerms}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="h-4 w-4" />
                  Download Quotation
                </button>
                <button
                  onClick={() => {
                    const emailTemplate = generateEmailTemplate({
                      invoiceNumber,
                      date: new Date().toLocaleDateString("en-ZA"),
                      company,
                      authoriser,
                      items: cart,
                      total: calculateTotal(),
                      validityDays: 30,
                      marketingOptIn,
                    });
                    fetch("/api/quote/proposal", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        to: company.email,
                        subject: `Your Training Quotation ${invoiceNumber}`,
                        html: emailTemplate,
                        text: "Please find your quotation details attached or visit our system to download the full document.",
                      }),
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        if (result.success) {
                          alert("Quotation email sent successfully.");
                        } else {
                          alert("Failed to send quotation email.");
                        }
                      })
                      .catch(() => alert("Failed to send quotation email."));
                  }}
                  disabled={!acceptTerms}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="h-4 w-4" />
                  Email Quotation
                </button>
              </div>

              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    try {
                      const profileToSave = {
                        company,
                        authoriser,
                        marketingOptIn,
                        savedAt: new Date().toISOString(),
                      };
                      window.localStorage.setItem(
                        ENTERPRISE_PROFILE_STORAGE_KEY,
                        JSON.stringify(profileToSave)
                      );
                    } catch {
                      // ignore storage errors
                    }
                  }
                  if (!acceptTerms) {
                    alert(
                      "Please accept the Terms & Conditions to complete registration."
                    );
                    return;
                  }
                  alert(
                    "Thank you! Your quotation has been generated. Please download the PDF and email it to proceed with enrollment. Our team will contact you shortly."
                  );
                }}
                disabled={!acceptTerms}
                className="w-full px-6 py-4 bg-secondary text-primary hover:bg-secondary/90 font-bold text-lg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Registration
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
