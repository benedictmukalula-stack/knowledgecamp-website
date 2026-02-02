import { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, MessageCircle, Sun, Moon } from "lucide-react";
import { CATEGORIES } from "@shared/courseData";
import { TRAINING_CATEGORIES } from "@shared/categories";
import type { LanguageCode } from "@/hooks/useLanguage";

const SUPPORTED_LANGUAGES: LanguageCode[] = ["en", "fr", "pt"];

const HEADER_LABELS: Record<LanguageCode, {
  navCourses: string;
  navCalendar: string;
  navPricing: string;
  navDelivery: string;
  navPartnerships: string;
  navAbout: string;
  navContact: string;
  ctaLogin: string;
  ctaRegister: string;
  coursesDiscovery: string;
  coursesBrowseAll: string;
  coursesOnline: string;
  coursesPopular: string;
  coursesNew: string;
  coursesCategories: string;
  pricingOverview: string;
  pricingDelegates: string;
  pricingEarlyBird: string;
  pricingGroup: string;
  pricingLaptop: string;
  pricingVip: string;
  pricingHub: string;
  pricingOnlineVsInPerson: string;
  pricingRequestQuote: string;
  deliveryPublicClassroom: string;
  deliveryOnlineLive: string;
  deliveryHybrid: string;
  deliveryInHouse: string;
  deliveryInternational: string;
  deliveryVenues: string;
  deliveryCalendar2026: string;
  partnershipsPartnerWithUs: string;
  partnershipsBecomeTraining: string;
  partnershipsVenuePartners: string;
  partnershipsCorporateSponsors: string;
  partnershipsAcademicInstitutional: string;
  partnershipsTechnology: string;
  aboutOverview: string;
  aboutMethodology: string;
  aboutTrainers: string;
  aboutQuality: string;
  aboutClients: string;
  aboutCertifications: string;
  aboutCareers: string;
  contactUs: string;
  contactCallback: string;
  contactOffice: string;
}> = {
  en: {
    navCourses: "Courses",
    navCalendar: "Calendar",
    navPricing: "Pricing",
    navDelivery: "Delivery",
    navPartnerships: "Partnerships",
    navAbout: "About",
    navContact: "Contact",
    ctaLogin: "Login",
    ctaRegister: "Register Now",
    coursesDiscovery: "Discovery",
    coursesBrowseAll: "Browse All Courses",
    coursesOnline: "Online Courses",
    coursesPopular: "Popular Courses",
    coursesNew: "New Courses",
    coursesCategories: "Categories",
    pricingOverview: "Pricing Overview",
    pricingDelegates: "Delegate Pricing (3 / 5 / 10)",
    pricingEarlyBird: "Early Bird Discounts",
    pricingGroup: "Group Discounts",
    pricingLaptop: "Laptop Discount Policy",
    pricingVip: "VIP Pricing",
    pricingHub: "Hub Pricing (SA / Africa / International)",
    pricingOnlineVsInPerson: "Online vs In-person Pricing",
    pricingRequestQuote: "Request Custom Quote",
    deliveryPublicClassroom: "Public Classroom Training",
    deliveryOnlineLive: "Online Live Training",
    deliveryHybrid: "Hybrid Training",
    deliveryInHouse: "In-House Training",
    deliveryInternational: "International Training",
    deliveryVenues: "Training Venues & Cities",
    deliveryCalendar2026: "2026 Training Calendar",
    partnershipsPartnerWithUs: "Partner With Us",
    partnershipsBecomeTraining: "Become a Training Partner",
    partnershipsVenuePartners: "Venue Partners",
    partnershipsCorporateSponsors: "Corporate Sponsors",
    partnershipsAcademicInstitutional: "Academic & Institutional Partners",
    partnershipsTechnology: "Technology Partners",
    aboutOverview: "About Knowledge Camp Global",
    aboutMethodology: "Our Methodology",
    aboutTrainers: "Trainers & Faculty",
    aboutQuality: "Quality & Standards",
    aboutClients: "Clients & Sectors",
    aboutCertifications: "Certifications & CPDs",
    aboutCareers: "Careers",
    contactUs: "Contact Us",
    contactCallback: "Request a Call Back",
    contactOffice: "Office Details",
  },
  fr: {
    navCourses: "Formations",
    navCalendar: "Calendrier",
    navPricing: "Tarifs",
    navDelivery: "Modalités",
    navPartnerships: "Partenariats",
    navAbout: "À propos",
    navContact: "Contact",
    ctaLogin: "Connexion",
    ctaRegister: "S'inscrire",
    coursesDiscovery: "Découverte",
    coursesBrowseAll: "Voir toutes les formations",
    coursesOnline: "Formations en ligne",
    coursesPopular: "Formations populaires",
    coursesNew: "Nouvelles formations",
    coursesCategories: "Catégories",
    pricingOverview: "Aperçu des tarifs",
    pricingDelegates: "Tarifs par délégué (3 / 5 / 10)",
    pricingEarlyBird: "Remises early bird",
    pricingGroup: "Remises de groupe",
    pricingLaptop: "Politique sur les ordinateurs portables",
    pricingVip: "Tarifs VIP",
    pricingHub: "Tarifs hubs (SA / Afrique / International)",
    pricingOnlineVsInPerson: "En ligne vs présentiel",
    pricingRequestQuote: "Demander un devis personnalisé",
    deliveryPublicClassroom: "Formations en salle publiques",
    deliveryOnlineLive: "Formations en ligne en direct",
    deliveryHybrid: "Formations hybrides",
    deliveryInHouse: "Formations intra-entreprise",
    deliveryInternational: "Formations internationales",
    deliveryVenues: "Lieux & villes de formation",
    deliveryCalendar2026: "Calendrier de formation 2026",
    partnershipsPartnerWithUs: "Devenir partenaire",
    partnershipsBecomeTraining: "Devenir partenaire de formation",
    partnershipsVenuePartners: "Partenaires lieux",
    partnershipsCorporateSponsors: "Sponsors d'entreprise",
    partnershipsAcademicInstitutional: "Partenaires académiques & institutionnels",
    partnershipsTechnology: "Partenaires technologiques",
    aboutOverview: "À propos de Knowledge Camp Global",
    aboutMethodology: "Notre méthodologie",
    aboutTrainers: "Formateurs & intervenants",
    aboutQuality: "Qualité & standards",
    aboutClients: "Clients & secteurs",
    aboutCertifications: "Certifications & CPD",
    aboutCareers: "Carrières",
    contactUs: "Nous contacter",
    contactCallback: "Demander un rappel",
    contactOffice: "Coordonnées du bureau",
  },
  pt: {
    navCourses: "Cursos",
    navCalendar: "Calendário",
    navPricing: "Preços",
    navDelivery: "Modalidades",
    navPartnerships: "Parcerias",
    navAbout: "Sobre",
    navContact: "Contato",
    ctaLogin: "Entrar",
    ctaRegister: "Inscreva-se",
    coursesDiscovery: "Descoberta",
    coursesBrowseAll: "Ver todos os cursos",
    coursesOnline: "Cursos online",
    coursesPopular: "Cursos populares",
    coursesNew: "Novos cursos",
    coursesCategories: "Categorias",
    pricingOverview: "Visão geral de preços",
    pricingDelegates: "Preços por participante (3 / 5 / 10)",
    pricingEarlyBird: "Descontos early bird",
    pricingGroup: "Descontos para grupos",
    pricingLaptop: "Política de notebook",
    pricingVip: "Preços VIP",
    pricingHub: "Preços por hub (SA / África / Internacional)",
    pricingOnlineVsInPerson: "Online vs presencial",
    pricingRequestQuote: "Solicitar orçamento personalizado",
    deliveryPublicClassroom: "Treinamento em sala público",
    deliveryOnlineLive: "Treinamento online ao vivo",
    deliveryHybrid: "Treinamento híbrido",
    deliveryInHouse: "Treinamento in-company",
    deliveryInternational: "Treinamento internacional",
    deliveryVenues: "Locais & cidades de treinamento",
    deliveryCalendar2026: "Calendário de treinamento 2026",
    partnershipsPartnerWithUs: "Seja nosso parceiro",
    partnershipsBecomeTraining: "Seja parceiro de treinamento",
    partnershipsVenuePartners: "Parceiros de locais",
    partnershipsCorporateSponsors: "Patrocinadores corporativos",
    partnershipsAcademicInstitutional: "Parceiros acadêmicos & institucionais",
    partnershipsTechnology: "Parceiros de tecnologia",
    aboutOverview: "Sobre a Knowledge Camp Global",
    aboutMethodology: "Nossa metodologia",
    aboutTrainers: "Instrutores & equipe",
    aboutQuality: "Qualidade & padrões",
    aboutClients: "Clientes & setores",
    aboutCertifications: "Certificações & CPDs",
    aboutCareers: "Carreiras",
    contactUs: "Fale conosco",
    contactCallback: "Solicitar retorno de chamada",
    contactOffice: "Detalhes do escritório",
  },
};

const COURSE_CATEGORIES = TRAINING_CATEGORIES;

function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [hasScrolled, setHasScrolled] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const desktopDropdownBase =
    "absolute left-0 mt-2 rounded-xl border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-xl ring-1 ring-black/5 origin-top-left animate-in fade-in-0 zoom-in-95";

  const openDropdown = (dropdown: string) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, 150);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
      return;
    }
    openDropdown(dropdown);
  };

  const handleNavLinkClick = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const whatsappUrl = "https://wa.me/27833910863";
  const labels = HEADER_LABELS[language] ?? HEADER_LABELS.en;

  useEffect(() => {
    if (typeof document === "undefined") return;
    setIsDark(document.documentElement.classList.contains("dark"));

    if (typeof window !== "undefined") {
      const storedLang = window.localStorage.getItem("kc-language") as LanguageCode | null;
      if (storedLang && SUPPORTED_LANGUAGES.includes(storedLang)) {
        setLanguage(storedLang);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const toggleTheme = () => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kc-theme", next ? "dark" : "light");
    }
    setIsDark(next);
  };

  const handleLanguageChange = (value: string) => {
    const next = (value as LanguageCode) ?? "en";
    if (!SUPPORTED_LANGUAGES.includes(next)) return;
    setLanguage(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kc-language", next);
      window.dispatchEvent(new Event("kc-language-change"));
    }
  };

  const isPathActive = (paths: string | string[]) => {
    const current = location.pathname;
    const list = Array.isArray(paths) ? paths : [paths];
    return list.some((path) => {
      if (path === "/") return current === "/";
      return current === path || current.startsWith(path);
    });
  };

  const headerClasses = [
    "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow",
    hasScrolled ? "shadow-sm border-border/80" : "border-border/60",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fdc61da1f09234263a84e25f305acc6be%2Fbb45b628b0be425daeb136477b77d74b?format=webp&width=800&height=1200"
            alt="Knowledge Camp Logo"
            className="h-10 w-auto"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* Desktop Navigation (large screens only) */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Courses */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("courses")}
            onMouseLeave={scheduleCloseDropdown}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("courses")}
              onFocus={() => openDropdown("courses")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1 ${
                isPathActive(["/courses"]) ? "text-primary bg-accent/10" : "text-foreground hover:bg-accent/10"
              }`}
            >
              {labels.navCourses} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "courses" && (
              <div className={`${desktopDropdownBase} w-[560px] p-4 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto`}>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{labels.coursesDiscovery}</p>
                  <Link
                    to="/courses"
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                      {labels.coursesBrowseAll}
                  </Link>
                  <Link
                    to="/online-hybrid?mode=online"
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                      {labels.coursesOnline}
                  </Link>
                  <Link
                    to="/courses?sort=popular"
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                      {labels.coursesPopular}
                  </Link>
                  <Link
                    to="/courses?sort=new"
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                      {labels.coursesNew}
                  </Link>
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">{labels.coursesCategories}</p>
                  <div className="grid grid-cols-1 gap-1">
                    {COURSE_CATEGORIES.map((category) => (
                      <Link
                        key={category.id}
                        to={`/courses?category=${encodeURIComponent(category.name)}`}
                        onClick={handleNavLinkClick}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/calendar"
            onClick={handleNavLinkClick}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isPathActive("/calendar") ? "text-primary bg-accent/10" : "text-foreground hover:bg-accent/10"
            }`}
          >
            {labels.navCalendar}
          </Link>

          {/* Pricing */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("pricing")}
            onMouseLeave={scheduleCloseDropdown}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("pricing")}
              onFocus={() => openDropdown("pricing")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1 ${
                isPathActive("/pricing") ? "text-primary bg-accent/10" : "text-foreground hover:bg-accent/10"
              }`}
            >
              {labels.navPricing} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "pricing" && (
              <div className={`${desktopDropdownBase} w-72 p-3`}>
                {[
                  [labels.pricingOverview, "/pricing"],
                  [labels.pricingDelegates, "/pricing?section=delegates"],
                  [labels.pricingEarlyBird, "/pricing?section=early-bird"],
                  [labels.pricingGroup, "/pricing?section=group"],
                  [labels.pricingLaptop, "/pricing?section=laptop"],
                  [labels.pricingVip, "/pricing?section=vip"],
                  [labels.pricingHub, "/pricing?section=hub"],
                  [labels.pricingOnlineVsInPerson, "/pricing?section=delivery"],
                  [labels.pricingRequestQuote, "/contact?topic=quote"],
                ].map(([label, to]) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Delivery */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("delivery")}
            onMouseLeave={scheduleCloseDropdown}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("delivery")}
              onFocus={() => openDropdown("delivery")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1 ${
                isPathActive(["/online-hybrid", "/in-house", "/hubs", "/venues"]) ? "text-primary bg-accent/10" : "text-foreground hover:bg-accent/10"
              }`}
            >
              {labels.navDelivery} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "delivery" && (
              <div className={`${desktopDropdownBase} w-72 p-3`}>
                {[
                  [labels.deliveryPublicClassroom, "/calendar"],
                  [labels.deliveryOnlineLive, "/online-hybrid?mode=online"],
                  [labels.deliveryHybrid, "/online-hybrid?mode=hybrid"],
                  [labels.deliveryInHouse, "/in-house"],
                  [labels.deliveryInternational, "/hubs/international"],
                  [labels.deliveryVenues, "/venues"],
                  [labels.deliveryCalendar2026, "/calendar?year=2026"],
                ].map(([label, to]) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Partnerships */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("partnerships")}
            onMouseLeave={scheduleCloseDropdown}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("partnerships")}
              onFocus={() => openDropdown("partnerships")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1 ${
                isPathActive(["/partnerships", "/sponsors"]) ? "text-primary bg-accent/10" : "text-foreground hover:bg-accent/10"
              }`}
            >
              {labels.navPartnerships} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "partnerships" && (
              <div className={`${desktopDropdownBase} w-72 p-3`}>
                {[
                  [labels.partnershipsPartnerWithUs, "/partnerships"],
                  [labels.partnershipsBecomeTraining, "/partnerships?type=training"],
                  [labels.partnershipsVenuePartners, "/venues?partner=1"],
                  [labels.partnershipsCorporateSponsors, "/sponsors"],
                  [labels.partnershipsAcademicInstitutional, "/partnerships?type=academic"],
                  [labels.partnershipsTechnology, "/partnerships?type=technology"],
                ].map(([label, to]) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("about")}
            onMouseLeave={scheduleCloseDropdown}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("about")}
              onFocus={() => openDropdown("about")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1 ${
                isPathActive("/about") ? "text-primary bg-accent/10" : "text-foreground hover:bg-accent/10"
              }`}
            >
              {labels.navAbout} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "about" && (
              <div className={`${desktopDropdownBase} w-72 p-3`}>
                {[
                  [labels.aboutOverview, "/about"],
                  [labels.aboutMethodology, "/about#methodology"],
                  [labels.aboutTrainers, "/about#trainers"],
                  [labels.aboutQuality, "/about#quality"],
                  [labels.aboutClients, "/about#clients"],
                  [labels.aboutCertifications, "/about#certifications"],
                  [labels.aboutCareers, "/about#careers"],
                ].map(([label, to]) => (
                  <Link
                    key={label}
                    to={to}
                    onClick={handleNavLinkClick}
                    className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <div
            className="relative"
            onMouseEnter={() => openDropdown("contact")}
            onMouseLeave={scheduleCloseDropdown}
          >
            <button
              type="button"
              onClick={() => toggleDropdown("contact")}
              onFocus={() => openDropdown("contact")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center gap-1 ${
                isPathActive("/contact") ? "text-primary bg-accent/10" : "text-foreground hover:bg-accent/10"
              }`}
            >
              {labels.navContact} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "contact" && (
              <div className={`${desktopDropdownBase} w-60 p-3`}>
                {[
                  [labels.contactUs, "/contact"],
                  [labels.contactCallback, "/contact?callback=1"],
                  [labels.contactOffice, "/contact#office"],
                ].map(([label, to]) =>
                  String(to).startsWith("http") ? (
                    <a
                      key={label}
                      href={to}
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleNavLinkClick}
                      className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={label}
                      to={String(to)}
                      onClick={handleNavLinkClick}
                      className="block px-3 py-2 text-sm rounded-md hover:bg-accent/10"
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Utility + CTA (large screens only) */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-accent/10 transition-colors"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle color mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Language selection"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="pt">Português</option>
          </select>
          <Link
            to="/dashboard"
            onClick={handleNavLinkClick}
            className="px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md transition-colors"
          >
            {labels.ctaLogin}
          </Link>
          <Link
            to="/register"
            onClick={handleNavLinkClick}
            className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors"
          >
            {labels.ctaRegister}
          </Link>
        </div>

        {/* Mobile Menu Button (shown on small & medium screens) */}
        <button
          className="lg:hidden p-2 hover:bg-accent/10 rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation (small & medium screens) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95">
          <nav className="container py-4 space-y-2">
            <button
              type="button"
              onClick={() => toggleDropdown("courses")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md"
            >
              {labels.navCourses} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "courses" && (
              <div className="pl-4 space-y-1">
                <Link to="/courses" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                  {labels.coursesBrowseAll}
                </Link>
                <Link to="/online-hybrid?mode=online" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                  {labels.coursesOnline}
                </Link>
                <Link to="/courses?sort=popular" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                  {labels.coursesPopular}
                </Link>
                <Link to="/courses?sort=new" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                  {labels.coursesNew}
                </Link>
                <div className="pt-2 text-xs uppercase text-muted-foreground px-4">{labels.coursesCategories}</div>
                {COURSE_CATEGORIES.map((category) => (
                  <Link
                    key={category.id}
                    to={`/courses?category=${encodeURIComponent(category.name)}`}
                    onClick={handleNavLinkClick}
                    className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/calendar" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md">
              {labels.navCalendar}
            </Link>

            <button
              type="button"
              onClick={() => toggleDropdown("pricing")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md"
            >
              {labels.navPricing} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "pricing" && (
              <div className="pl-4 space-y-1">
                {[
                  [labels.pricingOverview, "/pricing"],
                  [labels.pricingDelegates, "/pricing?section=delegates"],
                  [labels.pricingEarlyBird, "/pricing?section=early-bird"],
                  [labels.pricingGroup, "/pricing?section=group"],
                  [labels.pricingLaptop, "/pricing?section=laptop"],
                  [labels.pricingVip, "/pricing?section=vip"],
                  [labels.pricingHub, "/pricing?section=hub"],
                  [labels.pricingOnlineVsInPerson, "/pricing?section=delivery"],
                  [labels.pricingRequestQuote, "/contact?topic=quote"],
                ].map(([label, to]) => (
                  <Link key={label} to={to} onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                    {label}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleDropdown("delivery")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md"
            >
              {labels.navDelivery} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "delivery" && (
              <div className="pl-4 space-y-1">
                {[
                  [labels.deliveryPublicClassroom, "/calendar"],
                  [labels.deliveryOnlineLive, "/online-hybrid?mode=online"],
                  [labels.deliveryHybrid, "/online-hybrid?mode=hybrid"],
                  [labels.deliveryInHouse, "/in-house"],
                  [labels.deliveryInternational, "/hubs/international"],
                  [labels.deliveryVenues, "/venues"],
                  [labels.deliveryCalendar2026, "/calendar?year=2026"],
                ].map(([label, to]) => (
                  <Link key={label} to={to} onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                    {label}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleDropdown("partnerships")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md"
            >
              {labels.navPartnerships} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "partnerships" && (
              <div className="pl-4 space-y-1">
                {[
                  [labels.partnershipsPartnerWithUs, "/partnerships"],
                  [labels.partnershipsBecomeTraining, "/partnerships?type=training"],
                  [labels.partnershipsVenuePartners, "/venues?partner=1"],
                  [labels.partnershipsCorporateSponsors, "/sponsors"],
                  [labels.partnershipsAcademicInstitutional, "/partnerships?type=academic"],
                  [labels.partnershipsTechnology, "/partnerships?type=technology"],
                ].map(([label, to]) => (
                  <Link key={label} to={to} onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                    {label}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleDropdown("about")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md"
            >
              {labels.navAbout} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "about" && (
              <div className="pl-4 space-y-1">
                {[
                  [labels.aboutOverview, "/about"],
                  [labels.aboutMethodology, "/about#methodology"],
                  [labels.aboutTrainers, "/about#trainers"],
                  [labels.aboutQuality, "/about#quality"],
                  [labels.aboutClients, "/about#clients"],
                  [labels.aboutCertifications, "/about#certifications"],
                  [labels.aboutCareers, "/about#careers"],
                ].map(([label, to]) => (
                  <Link key={label} to={to} onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                    {label}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => toggleDropdown("contact")}
              className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md"
            >
              {labels.navContact} <ChevronDown className="h-4 w-4" />
            </button>
            {activeDropdown === "contact" && (
              <div className="pl-4 space-y-1">
                <Link to="/contact" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                  {labels.contactUs}
                </Link>
                <Link to="/contact?callback=1" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                  {labels.contactCallback}
                </Link>
                <Link to="/contact#office" onClick={handleNavLinkClick} className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md">
                  {labels.contactOffice}
                </Link>
              </div>
            )}

            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between px-4 pb-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-accent/10 transition-colors"
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  aria-label="Toggle color mode"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="ml-2 flex-1 px-2 py-1 text-xs rounded-md border border-border bg-background text-foreground hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label="Language selection"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="pt">Português</option>
                </select>
              </div>
              <Link
                to="/dashboard"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 rounded-md"
              >
                {labels.ctaLogin}
              </Link>
              <Link
                to="/register"
                onClick={handleNavLinkClick}
                className="block px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md"
              >
                {labels.ctaRegister}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default memo(Header);
