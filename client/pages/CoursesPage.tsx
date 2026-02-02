import Layout from "@/components/Layout";
import { SectionImage } from "@/components/SectionImage";
import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Star,
  MapPin,
  Calendar,
  Clock,
  Filter,
  X,
  Download,
  ArrowRight,
  Building2,
} from "lucide-react";
import {
  COURSE_CATALOG,
  CATEGORIES,
  ALL_VENUES,
  CourseLocation,
  getCourseImage,
} from "@shared/courseData";
import { downloadBrochure } from "@/lib/brochureService";
import { useLanguage, type LanguageCode } from "@/hooks/useLanguage";

export default function CoursesPage() {
  const PAGE_SIZE = 24;
  const language = useLanguage();
  const [searchParams] = useSearchParams();

  // If a category is provided via query string, respect it as the initial filter
  const initialCategoryFromUrl = searchParams.get("category") ?? "";

  const t: Record<LanguageCode, {
    heroTitle: string;
    heroSubtitle: string;
    viewCalendar: string;
    registerNow: string;
    searchPlaceholder: string;
    filtersLabel: string;
    sortByLabel: string;
    sortOptions: { value: string; label: string }[];
    clearAll: string;
    categoryLabel: string;
    allCategories: string;
    locationTypeLabel: string;
    allLocations: string;
    venueLabel: string;
    allVenues: string;
    pricingGuideLabel: string;
    pricingLocalLabel: string;
    pricingLocalNote: string;
    pricingAfricaLabel: string;
    pricingAfricaNote: string;
    pricingIntlLabel: string;
    pricingIntlNote: string;
    noCoursesTitle: string;
    noCoursesBody: string;
    clearFiltersCta: string;
    showingLabel: (shown: number, total: number) => string;
    fromLabel: string;
    bulkDiscountNote: string;
    reviewsLabel: string;
    viewCourseCta: string;
    registerCta: string;
    inHouseTitle: string;
    inHouseBody: string;
    inHouseCta: string;
  }> = {
    en: {
      heroTitle: "Browse Our Courses",
      heroSubtitle:
        "Explore " +
        COURSE_CATALOG.length +
        "+ professional training sessions across " +
        CATEGORIES.length +
        "+ specialist categories. Find the perfect course for your career development.",
      viewCalendar: "View Calendar",
      registerNow: "Register Now",
      searchPlaceholder: "Search courses by title or keyword...",
      filtersLabel: "Filters",
      sortByLabel: "Sort by:",
      sortOptions: [
        { value: "popularity", label: "Popularity" },
        { value: "rating", label: "Highest Rating" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
      ],
      clearAll: "Clear all",
      categoryLabel: "Category",
      allCategories: "All Categories",
      locationTypeLabel: "Location Type",
      allLocations: "All Locations",
      venueLabel: "Venue",
      allVenues: "All Venues",
      pricingGuideLabel: "Pricing Guide",
      pricingLocalLabel: "Local (SA)",
      pricingLocalNote: "ZAR 5,000/day",
      pricingAfricaLabel: "Africa",
      pricingAfricaNote: "1.4x multiplier",
      pricingIntlLabel: "International",
      pricingIntlNote: "2.5x multiplier",
      noCoursesTitle: "No courses found",
      noCoursesBody: "Try adjusting your filters or search terms",
      clearFiltersCta: "Clear Filters",
      showingLabel: (shown, total) => "Showing " + shown + " of " + total + " courses",
      fromLabel: "From:",
      bulkDiscountNote: "Bulk discounts available",
      reviewsLabel: "reviews",
      viewCourseCta: "View Course",
      registerCta: "Register",
      inHouseTitle: "Need This Privately?",
      inHouseBody:
        "Request a customized in-house training program tailored to your organization's unique needs, timeline, and budget.",
      inHouseCta: "Request In-House Quote",
    },
    fr: {
      heroTitle: "Découvrez nos formations",
      heroSubtitle:
        "Plus de " +
        COURSE_CATALOG.length +
        " sessions de formation professionnelle dans plus de " +
        CATEGORIES.length +
        " catégories spécialisées. Trouvez le programme idéal pour votre évolution de carrière.",
      viewCalendar: "Voir le calendrier",
      registerNow: "S'inscrire",
      searchPlaceholder: "Rechercher une formation par titre ou mot-clé...",
      filtersLabel: "Filtres",
      sortByLabel: "Trier par :",
      sortOptions: [
        { value: "popularity", label: "Popularité" },
        { value: "rating", label: "Meilleure note" },
        { value: "price-low", label: "Prix : du plus bas au plus élevé" },
        { value: "price-high", label: "Prix : du plus élevé au plus bas" },
      ],
      clearAll: "Réinitialiser",
      categoryLabel: "Catégorie",
      allCategories: "Toutes les catégories",
      locationTypeLabel: "Type de lieu",
      allLocations: "Tous les lieux",
      venueLabel: "Ville / lieu",
      allVenues: "Tous les lieux",
      pricingGuideLabel: "Repère tarifaire",
      pricingLocalLabel: "Local (Afrique du Sud)",
      pricingLocalNote: "ZAR 5 000/jour",
      pricingAfricaLabel: "Afrique",
      pricingAfricaNote: "Multiplicateur 1,4x",
      pricingIntlLabel: "International",
      pricingIntlNote: "Multiplicateur 2,5x",
      noCoursesTitle: "Aucune formation trouvée",
      noCoursesBody: "Essayez d'ajuster vos filtres ou vos mots‑clés",
      clearFiltersCta: "Réinitialiser les filtres",
      showingLabel: (shown, total) =>
        "Affichage de " + shown + " sur " + total + " formations",
      fromLabel: "À partir de :",
      bulkDiscountNote: "Remises de volume disponibles",
      reviewsLabel: "avis",
      viewCourseCta: "Voir la formation",
      registerCta: "S'inscrire",
      inHouseTitle: "Besoin de cette formation en privé ?",
      inHouseBody:
        "Demandez un programme intra‑entreprise adapté aux besoins, au calendrier et au budget de votre organisation.",
      inHouseCta: "Demander un devis intra",
    },
    pt: {
      heroTitle: "Veja nossos cursos",
      heroSubtitle:
        "Mais de " +
        COURSE_CATALOG.length +
        " sessões de treinamento profissional em mais de " +
        CATEGORIES.length +
        " categorias especializadas. Encontre o curso ideal para o seu desenvolvimento de carreira.",
      viewCalendar: "Ver calendário",
      registerNow: "Inscreva-se",
      searchPlaceholder: "Buscar cursos por título ou palavra-chave...",
      filtersLabel: "Filtros",
      sortByLabel: "Ordenar por:",
      sortOptions: [
        { value: "popularity", label: "Popularidade" },
        { value: "rating", label: "Melhor avaliação" },
        { value: "price-low", label: "Preço: menor para maior" },
        { value: "price-high", label: "Preço: maior para menor" },
      ],
      clearAll: "Limpar tudo",
      categoryLabel: "Categoria",
      allCategories: "Todas as categorias",
      locationTypeLabel: "Tipo de local",
      allLocations: "Todos os locais",
      venueLabel: "Cidade / local",
      allVenues: "Todos os locais",
      pricingGuideLabel: "Guia de preços",
      pricingLocalLabel: "Local (África do Sul)",
      pricingLocalNote: "ZAR 5.000/dia",
      pricingAfricaLabel: "África",
      pricingAfricaNote: "Multiplicador 1,4x",
      pricingIntlLabel: "Internacional",
      pricingIntlNote: "Multiplicador 2,5x",
      noCoursesTitle: "Nenhum curso encontrado",
      noCoursesBody: "Tente ajustar seus filtros ou termos de busca",
      clearFiltersCta: "Limpar filtros",
      showingLabel: (shown, total) =>
        "Mostrando " + shown + " de " + total + " cursos",
      fromLabel: "A partir de:",
      bulkDiscountNote: "Descontos para volume disponíveis",
      reviewsLabel: "avaliações",
      viewCourseCta: "Ver curso",
      registerCta: "Inscrever-se",
      inHouseTitle: "Precisa deste curso em formato privado?",
      inHouseBody:
        "Solicite um programa in-company personalizado às necessidades, prazos e orçamento da sua organização.",
      inHouseCta: "Solicitar orçamento in-company",
    },
  };

  const copy = t[language] ?? t.en;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryFromUrl);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<CourseLocation | "">(
    ""
  );
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);

  const filteredCourses = useMemo(() => {
    // Start from a shallow copy so we don't mutate the shared catalog when sorting
    let filtered = [...COURSE_CATALOG];

    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    if (selectedVenue) {
      filtered = filtered.filter((course) => course.venue === selectedVenue);
    }

    if (selectedLocation) {
      filtered = filtered.filter(
        (course) => course.location === selectedLocation
      );
    }

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // Default popularity
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedVenue, selectedLocation, sortBy]);

  // Reset to first page whenever filters or search change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, selectedVenue, selectedLocation, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);

  const pagedCourses = useMemo(
    () =>
      filteredCourses.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [filteredCourses, currentPage],
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedVenue("");
    setSelectedLocation("");
    setSortBy("popularity");
    setPage(1);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory ||
    selectedVenue ||
    selectedLocation ||
    sortBy !== "popularity";

  const getPriceLabel = (location: CourseLocation): string => {
    switch (location) {
      case "local":
        return "Local (SA)";
      case "africa":
        return "Africa";
      case "international":
        return "International";
    }
  };


  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {copy.heroTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {copy.heroSubtitle}
          </p>

          <div className="flex gap-3 mt-8">
            <Link
              to="/calendar"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {copy.viewCalendar}
            </Link>
            <Link
              to="/register-enterprise"
              className="inline-flex items-center px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
            >
              {copy.registerNow}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* HERO SUPPORTING IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="https://images.pexels.com/photos/8837715/pexels-photo-8837715.jpeg"
            alt="Premium corporate training classroom set up and ready for delegates"
          />
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="container">
          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={copy.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
            >
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline font-semibold">{copy.filtersLabel}</span>
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">{copy.sortByLabel}</span>
              <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
                title="Sort Courses"
              className="px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {copy.sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-sm text-primary hover:underline font-semibold"
              >
                {copy.clearAll}
              </button>
            )}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">{copy.categoryLabel}</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ""}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">{copy.allCategories}</span>
                  </label>
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="rounded"
                      />
                      <span className="text-sm text-foreground">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-semibold mb-3">{copy.locationTypeLabel}</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value=""
                      checked={selectedLocation === ""}
                      onChange={(e) => setSelectedLocation(e.target.value as any)}
                      className="rounded"
                    />
                    <span className="text-sm">{copy.allLocations}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="local"
                      checked={selectedLocation === "local"}
                      onChange={(e) => setSelectedLocation(e.target.value as any)}
                      className="rounded"
                    />
                    <span className="text-sm">Local (SA)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="africa"
                      checked={selectedLocation === "africa"}
                      onChange={(e) => setSelectedLocation(e.target.value as any)}
                      className="rounded"
                    />
                    <span className="text-sm">Africa Hubs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="location"
                      value="international"
                      checked={selectedLocation === "international"}
                      onChange={(e) => setSelectedLocation(e.target.value as any)}
                      className="rounded"
                    />
                    <span className="text-sm">International</span>
                  </label>
                </div>
              </div>

              {/* Venue Filter */}
              <div>
                <h3 className="font-semibold mb-3">{copy.venueLabel}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="venue"
                      value=""
                      checked={selectedVenue === ""}
                      onChange={(e) => setSelectedVenue(e.target.value)}
                      className="rounded"
                    />
                    <span className="text-sm">{copy.allVenues}</span>
                  </label>
                  {ALL_VENUES.map((venue) => (
                    <label key={venue} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="venue"
                        value={venue}
                        checked={selectedVenue === venue}
                        onChange={(e) => setSelectedVenue(e.target.value)}
                        className="rounded"
                      />
                      <span className="text-sm line-clamp-1">{venue}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-semibold mb-3">{copy.pricingGuideLabel}</h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="font-semibold text-blue-900">{copy.pricingLocalLabel}</p>
                    <p className="text-blue-800 text-xs">{copy.pricingLocalNote}</p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <p className="font-semibold text-orange-900">{copy.pricingAfricaLabel}</p>
                    <p className="text-orange-800 text-xs">{copy.pricingAfricaNote}</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                    <p className="font-semibold text-purple-900">{copy.pricingIntlLabel}</p>
                    <p className="text-purple-800 text-xs">{copy.pricingIntlNote}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">{copy.noCoursesTitle}</h3>
              <p className="text-muted-foreground mb-6">
                {copy.noCoursesBody}
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold transition-colors"
              >
                {copy.clearFiltersCta}
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-8">
                {copy.showingLabel(filteredCourses.length, COURSE_CATALOG.length)}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {pagedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-background rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col"
                  >
                    {/* Header with Category Image */}
                    <div className="h-40 relative overflow-hidden bg-muted group-hover:opacity-90 transition-opacity">
                      <img
                        src={getCourseImage(course.category)}
                        alt={course.category}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-block px-3 py-1 bg-white/95 text-foreground rounded-full text-xs font-semibold">
                            {course.category}
                          </span>
                          <span className="inline-block px-3 py-1 bg-white/95 text-foreground rounded-full text-xs font-semibold">
                            {getPriceLabel(course.location)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white line-clamp-2">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Course Meta */}
                      <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span>{course.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{course.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 flex-shrink-0" />
                          <span>{course.duration} days</span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="py-3 border-t border-border mb-6">
                        <p className="text-sm text-muted-foreground mb-1">
                          <span className="font-semibold text-foreground">{copy.fromLabel}</span>{" "}
                          ZAR {course.pricing.basePrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course.duration} days • {copy.bulkDiscountNote}
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(course.rating)
                                  ? "fill-secondary text-secondary"
                                  : "text-border"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold">
                          {course.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({course.reviews} {copy.reviewsLabel})
                        </span>
                      </div>

                      {/* CTAs */}
                      <div className="flex items-center gap-2 pt-4 border-t border-border mt-auto">
                        <Link
                          to={`/courses/${course.id}`}
                          className="flex-1 px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg text-sm font-semibold transition-colors text-center"
                        >
                          {copy.viewCourseCta}
                        </Link>
                        <Link
                          to="/register-enterprise"
                          className="flex-1 px-4 py-2 border-2 border-primary text-primary hover:bg-primary/10 rounded-lg text-sm font-semibold transition-colors text-center"
                        >
                          {copy.registerCta}
                        </Link>
                        <button
                          onClick={() => downloadBrochure(course)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors hover:text-secondary"
                          title="Download brochure"
                        >
                          <Download className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {pageCount > 1 && (
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="px-4 py-2 border border-border rounded-lg text-sm font-semibold disabled:text-muted-foreground disabled:border-muted hover:bg-muted transition-colors"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage === pageCount}
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    className="px-4 py-2 border border-border rounded-lg text-sm font-semibold disabled:text-muted-foreground disabled:border-muted hover:bg-muted transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* IN-HOUSE TRAINING BAND */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
        <div className="container">
          <div className="bg-background border border-border rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {copy.inHouseTitle}
              </h2>
              <p className="text-muted-foreground mb-6">
                {copy.inHouseBody}
              </p>
              <Link
                to="/in-house"
                className="inline-flex items-center px-6 py-3 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
              >
                {copy.inHouseCta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <Building2 className="h-24 w-24 text-secondary/30 flex-shrink-0" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
