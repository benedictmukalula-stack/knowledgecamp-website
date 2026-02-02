import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Calendar, Users, Zap, BookOpen, MessageCircle } from "lucide-react";
import { COURSE_CATALOG, CATEGORIES, getCourseImage } from "@shared/courseData";
import { TRAINING_CATEGORIES } from "@shared/categories";
import { useMemo } from "react";
import { useLanguage, type LanguageCode } from "@/hooks/useLanguage";

export default function HomePage() {
  const language = useLanguage();

  const t: Record<LanguageCode, {
    heroTitle: string;
    heroSubtitle: string;
    heroPrimaryCta: string;
    heroSecondaryCta: string;
    trustBar: string;
    findYourCourseTitle: string;
    findYourCourseSubtitle: string;
    viewCourses: string;
    viewAllCategories: (count: number) => string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    howSteps: { title: string; description: string }[];
    nextSessionsTitle: string;
    nextSessionsSubtitle: string;
    viewFullCalendar: string;
    inHouseTitle: string;
    inHouseBody: string;
    inHouseBullets: string[];
    inHouseCta: string;
    partnershipTitle: string;
    partnershipBody: string;
    partnershipBullets: string[];
    partnershipCta: string;
    finalTitle: string;
    finalBody: string;
    finalRegisterCta: string;
    finalWhatsappCta: string;
  }> = {
    en: {
      heroTitle: "Empower Your Skills, Transform Your Future",
      heroSubtitle:
        "World-class professional training and skills development for individuals and organizations across Africa and globally. Unlock your potential with our comprehensive courses.",
      heroPrimaryCta: "Explore Courses",
      heroSecondaryCta: "Register Now",
      trustBar:
        "Trusted by leading organizations across Africa • 4.8★ average course rating • 1000+ professionals trained",
      findYourCourseTitle: "Find Your Course",
      findYourCourseSubtitle:
        `Explore professional training across ${CATEGORIES.length}+ specialist categories. Choose based on your career goals and learning preferences.`,
      viewCourses: "View Courses",
      viewAllCategories: (count) => `View All ${count} Categories`,
      howItWorksTitle: "How It Works",
      howItWorksSubtitle: "Three simple steps to start your professional development journey",
      howSteps: [
        {
          title: "Explore Courses",
          description: `Browse ${COURSE_CATALOG.length}+ professional training sessions across ${CATEGORIES.length}+ specialist categories.`,
        },
        {
          title: "Choose Your Path",
          description: "Select courses, dates, locations, and delivery options that fit your needs.",
        },
        {
          title: "Register & Learn",
          description: "Complete registration, receive materials, and start your journey to excellence.",
        },
      ],
      nextSessionsTitle: "Next Sessions",
      nextSessionsSubtitle: "Upcoming courses starting this month and beyond",
      viewFullCalendar: "View Full Calendar",
      inHouseTitle: "In-House Training",
      inHouseBody:
        "Bring professional development to your organization. We customize courses, schedules, and delivery methods to match your team's goals and constraints.",
      inHouseBullets: ["Customized curricula", "Your location or ours", "Team discounts", "Dedicated instructors"],
      inHouseCta: "Request In-House Quote",
      partnershipTitle: "Partnership Program",
      partnershipBody:
        "Expand your training offerings. Join our partner network and deliver Knowledge Camp courses to your clients or network.",
      partnershipBullets: [
        "Revenue sharing model",
        "Marketing support",
        "Dedicated partner manager",
        "Professional certification",
      ],
      partnershipCta: "Partner With Us",
      finalTitle: "Ready to Upskill Your Team?",
      finalBody:
        "Start your professional development journey today. Register for an upcoming course or request a custom training solution for your organization.",
      finalRegisterCta: "Register Now",
      finalWhatsappCta: "Talk on WhatsApp",
    },
    fr: {
      heroTitle: "Développez vos compétences, transformez votre avenir",
      heroSubtitle:
        "Formations professionnelles de classe mondiale pour les particuliers et les organisations en Afrique et à l'international. Libérez votre potentiel avec nos programmes complets.",
      heroPrimaryCta: "Découvrir les formations",
      heroSecondaryCta: "S'inscrire",
      trustBar:
        "Plébiscité par les organisations leaders en Afrique • Note moyenne de 4,8★ • Plus de 1000 professionnels formés",
      findYourCourseTitle: "Trouvez votre formation",
      findYourCourseSubtitle:
        `Découvrez nos formations professionnelles dans plus de ${CATEGORIES.length} catégories spécialisées. Choisissez selon vos objectifs de carrière et votre style d'apprentissage.`,
      viewCourses: "Voir les formations",
      viewAllCategories: (count) => `Voir les ${count} catégories`,
      howItWorksTitle: "Comment ça marche",
      howItWorksSubtitle: "Trois étapes simples pour démarrer votre développement professionnel",
      howSteps: [
        {
          title: "Explorer les formations",
          description: `Parcourez plus de ${COURSE_CATALOG.length} sessions de formation professionnelle dans plus de ${CATEGORIES.length} catégories spécialisées.`,
        },
        {
          title: "Choisir votre parcours",
          description: "Sélectionnez les formations, dates, lieux et modalités qui vous conviennent.",
        },
        {
          title: "S'inscrire et apprendre",
          description: "Finalisez votre inscription, recevez les supports et démarrez votre progression.",
        },
      ],
      nextSessionsTitle: "Prochaines sessions",
      nextSessionsSubtitle: "Formations à venir ce mois-ci et au-delà",
      viewFullCalendar: "Voir le calendrier complet",
      inHouseTitle: "Formations intra-entreprise",
      inHouseBody:
        "Apportez la formation professionnelle au cœur de votre organisation. Nous adaptons contenus, calendriers et modalités aux besoins de vos équipes.",
      inHouseBullets: [
        "Programmes personnalisés",
        "Dans vos locaux ou les nôtres",
        "Remises pour les équipes",
        "Formateurs dédiés",
      ],
      inHouseCta: "Demander un devis intra",
      partnershipTitle: "Programme de partenariat",
      partnershipBody:
        "Développez votre offre de formation. Rejoignez notre réseau de partenaires et proposez les formations Knowledge Camp à vos clients.",
      partnershipBullets: [
        "Partage de revenus",
        "Support marketing",
        "Gestionnaire partenaire dédié",
        "Certification professionnelle",
      ],
      partnershipCta: "Devenir partenaire",
      finalTitle: "Prêt à faire monter vos équipes en compétences ?",
      finalBody:
        "Lancez votre plan de développement professionnel dès aujourd'hui. Inscrivez-vous à une prochaine session ou demandez une solution sur mesure.",
      finalRegisterCta: "S'inscrire",
      finalWhatsappCta: "Échanger sur WhatsApp",
    },
    pt: {
      heroTitle: "Potencialize suas habilidades, transforme seu futuro",
      heroSubtitle:
        "Treinamentos profissionais de padrão internacional para indivíduos e organizações na África e no mundo. Desbloqueie seu potencial com nossos cursos completos.",
      heroPrimaryCta: "Explorar cursos",
      heroSecondaryCta: "Inscreva-se",
      trustBar:
        "Confiado por organizações líderes em toda a África • Avaliação média de 4,8★ • Mais de 1000 profissionais treinados",
      findYourCourseTitle: "Encontre seu curso",
      findYourCourseSubtitle:
        `Conheça nossos treinamentos profissionais em mais de ${CATEGORIES.length} categorias especializadas. Escolha de acordo com seus objetivos de carreira e estilo de aprendizagem.`,
      viewCourses: "Ver cursos",
      viewAllCategories: (count) => `Ver todas as ${count} categorias`,
      howItWorksTitle: "Como funciona",
      howItWorksSubtitle: "Três passos simples para iniciar sua jornada de desenvolvimento profissional",
      howSteps: [
        {
          title: "Explorar cursos",
          description: `Veja mais de ${COURSE_CATALOG.length} sessões de treinamento profissional em mais de ${CATEGORIES.length} categorias especializadas.`,
        },
        {
          title: "Escolher seu caminho",
          description: "Selecione cursos, datas, locais e modalidades que se encaixam nas suas necessidades.",
        },
        {
          title: "Inscrever-se e aprender",
          description: "Conclua a inscrição, receba os materiais e comece sua evolução.",
        },
      ],
      nextSessionsTitle: "Próximas turmas",
      nextSessionsSubtitle: "Cursos que começam neste mês e depois",
      viewFullCalendar: "Ver calendário completo",
      inHouseTitle: "Treinamento in-company",
      inHouseBody:
        "Leve o desenvolvimento profissional para dentro da sua organização. Personalizamos conteúdos, agenda e formato para os objetivos da sua equipe.",
      inHouseBullets: [
        "Conteúdos personalizados",
        "No seu local ou no nosso",
        "Descontos para equipes",
        "Instrutores dedicados",
      ],
      inHouseCta: "Solicitar orçamento in-company",
      partnershipTitle: "Programa de parcerias",
      partnershipBody:
        "Amplie sua oferta de treinamentos. Junte-se à nossa rede de parceiros e ofereça cursos Knowledge Camp aos seus clientes.",
      partnershipBullets: [
        "Modelo de compartilhamento de receita",
        "Suporte de marketing",
        "Gerente de parceria dedicado",
        "Certificação profissional",
      ],
      partnershipCta: "Seja nosso parceiro",
      finalTitle: "Pronto para desenvolver sua equipe?",
      finalBody:
        "Comece hoje sua jornada de desenvolvimento profissional. Inscreva-se em um próximo curso ou solicite uma solução sob medida.",
      finalRegisterCta: "Inscreva-se",
      finalWhatsappCta: "Falar no WhatsApp",
    },
  };

  const copy = t[language] ?? t.en;

  // Get featured courses (top rated) without mutating the shared catalog
  const featuredCourses = useMemo(
    () => [...COURSE_CATALOG].sort((a, b) => b.rating - a.rating).slice(0, 6),
    []
  );

  // Get unique upcoming dates using memoization to avoid repeated heavy work
  const upcomingDates = useMemo(() => {
    const upcoming = COURSE_CATALOG.filter((c) => {
      const courseDate = new Date(c.startDate);
      return courseDate > new Date();
    })
      .slice()
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .slice(0, 4);

    const uniqueDates = Array.from(
      new Set(upcoming.map((c) => c.startDate))
    );

    return uniqueDates.map((date) => {
      const course =
        upcoming.find((c) => c.startDate === date) ??
        COURSE_CATALOG.find((c) => c.startDate === date);
      return { date, course };
    });
  }, []);

  const courseCategories = TRAINING_CATEGORIES.slice(0, 6); // First 6 canonical categories for cards

  const howItWorks = copy.howSteps.map((step, index) => ({
    step: index + 1,
    title: step.title,
    description: step.description,
    icon: [BookOpen, Calendar, Users][index] ?? BookOpen,
  }));

  const trustPoints = [
    { count: `${COURSE_CATALOG.length}+`, label: language === "fr" ? "Formations professionnelles" : language === "pt" ? "Cursos profissionais" : "Professional Courses" },
    { count: `${CATEGORIES.length}`, label: language === "fr" ? "Catégories de formation" : language === "pt" ? "Categorias de treinamento" : "Training Categories" },
    { count: "1000+", label: language === "fr" ? "Professionnels formés" : language === "pt" ? "Profissionais treinados" : "Trained Professionals" },
    { count: "4.8★", label: language === "fr" ? "Note moyenne" : language === "pt" ? "Avaliação média" : "Average Rating" },
  ];

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <img
            src="https://images.pexels.com/photos/18999482/pexels-photo-18999482.jpeg"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {copy.heroTitle}
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
                {copy.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
                >
                  {copy.heroPrimaryCta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register-enterprise"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all"
                >
                  {copy.heroSecondaryCta}
                </Link>
              </div>

              {/* Trust Points */}
              <div className="grid grid-cols-2 gap-4 mt-12 bg-black/5 rounded-2xl p-4 md:p-5 backdrop-blur-sm">
                {trustPoints.map((point, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-secondary">{point.count}</p>
                    <p className="text-sm text-white/80 mt-1">{point.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl shadow-black/10">
                <div className="space-y-4">
                  {featuredCourses.slice(0, 3).map((course, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <p className="font-semibold text-sm line-clamp-1">{course.title}</p>
                      <p className="text-xs text-white/70 mt-1">{course.duration} days • {course.location === "local" ? "Local" : "Hub"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="relative overflow-hidden bg-muted/40 border-b border-border/80 py-4 md:py-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
        >
          <img
            src="https://images.pexels.com/photos/8761511/pexels-photo-8761511.jpeg"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>
        <div className="container relative">
          <p className="text-center text-sm text-muted-foreground font-semibold">
            {copy.trustBar}
          </p>
        </div>
      </section>

      {/* FIND YOUR COURSE */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.findYourCourseTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {copy.findYourCourseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {courseCategories.map((category) => {
              const courseCount = COURSE_CATALOG.filter(
                (c) => c.category === category.name,
              ).length;
              return (
                <Link
                  key={category.id}
                  to={`/courses?category=${category.name}`}
                  className="group bg-background border border-border rounded-xl p-6 hover:shadow-md hover:-translate-y-1 transition-all hover:border-secondary/80"
                >
                  <div className="mb-4 h-20 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={getCourseImage(category.name)}
                      alt={category.name}
                      className="h-full w-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.02] transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {courseCount} courses
                      </p>
                    </div>
                    <Zap className="h-6 w-6 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "fr"
                      ? `Développement professionnel en ${category.name.toLowerCase()}`
                      : language === "pt"
                      ? `Desenvolvimento profissional em ${category.name.toLowerCase()}`
                      : `Professional development in ${category.name.toLowerCase()}`}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-secondary transition-colors">
                    {copy.viewCourses}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all"
            >
              {copy.viewAllCategories(CATEGORIES.length)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.howItWorksTitle}</h2>
            <p className="text-lg text-muted-foreground">
              {copy.howItWorksSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-background rounded-xl border border-border p-8 text-center transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 border-2 border-secondary mb-6 shadow-sm">
                    <Icon className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Step {item.step}: {item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              to="/register-enterprise"
              className="inline-flex items-center px-8 py-4 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
            >
              {language === "fr" ? "Commencer votre inscription" : language === "pt" ? "Iniciar sua inscrição" : "Start Your Registration"}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING SESSIONS */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.nextSessionsTitle}</h2>
              <p className="text-lg text-muted-foreground">
                {copy.nextSessionsSubtitle}
              </p>
            </div>
            <Link
              to="/calendar"
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-all whitespace-nowrap"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {copy.viewFullCalendar}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-8 items-start">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {upcomingDates.slice(0, 4).map((item, index) => {
                  const course = item.course!;
                  return (
                    <div key={index} className="bg-muted/30 border border-border rounded-xl p-6 group hover:shadow-md hover:-translate-y-1 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            {new Date(course.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 bg-secondary/10 text-secondary rounded-full whitespace-nowrap">
                          {course.duration} days
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{course.venue}</p>
                      <div className="flex gap-2">
                        <Link
                          to={`/courses/${course.id}`}
                          className="flex-1 px-4 py-2 text-center bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-colors text-sm"
                        >
                          View Details
                        </Link>
                        <Link
                          to="/register-enterprise"
                          className="flex-1 px-4 py-2 text-center border-2 border-primary text-primary hover:bg-primary/10 font-semibold rounded-lg transition-colors text-sm"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative h-full min-h-[240px] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://images.pexels.com/photos/17382268/pexels-photo-17382268.jpeg"
                  alt="Professionals discussing training session"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IN-HOUSE TRAINING PROMO */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 to-secondary/10 border-t border-border">
        <div className="container">
          <div className="bg-background border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="order-2 md:order-1 h-full">
                <div className="relative h-full min-h-[260px] bg-muted overflow-hidden rounded-l-2xl">
                  <img
                    src="https://images.pexels.com/photos/9034728/pexels-photo-9034728.jpeg"
                    alt="Corporate training session"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
              <div className="p-8 md:p-12 order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{copy.inHouseTitle}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {copy.inHouseBody}
                </p>
                <ul className="space-y-3 mb-8">
                  {copy.inHouseBullets.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/in-house"
                  className="inline-flex items-center px-8 py-4 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
                >
                  {copy.inHouseCta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP PROMO */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-full order-2 md:order-1">
                <div className="relative h-full min-h-[260px] bg-muted overflow-hidden rounded-l-2xl">
                  <img
                    src="https://images.pexels.com/photos/7647989/pexels-photo-7647989.jpeg"
                    alt="Business partnership collaboration"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
              <div className="p-8 md:p-12 order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{copy.partnershipTitle}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {copy.partnershipBody}
                </p>
                <ul className="space-y-3 mb-8">
                  {copy.partnershipBullets.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/partnerships"
                  className="inline-flex items-center px-8 py-4 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
                >
                  {copy.partnershipCta}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CONVERSION BAND */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-r from-primary to-primary/80 text-white border-t border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        >
          <img
            src="https://images.pexels.com/photos/8555431/pexels-photo-8555431.jpeg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="container relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {copy.finalTitle}
            </h2>
            <p className="text-lg text-white/90 mb-8">
              {copy.finalBody}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register-enterprise"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-all hover:shadow-lg group"
              >
                {copy.finalRegisterCta}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/27833910863"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all group"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {copy.finalWhatsappCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
