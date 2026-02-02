import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SectionImage } from "@/components/SectionImage";
import { BookOpen, Users, BarChart3, Award, Lock, Zap, Play, MessageSquare } from "lucide-react";
import { useLanguage, type LanguageCode } from "@/hooks/useLanguage";

const LMS_COPY: Record<LanguageCode, {
  heroTitle: string;
  heroSubtitle: string;
  comingTitle: string;
  comingBody: string;
  ctaExploreCourses: string;
  ctaBackHome: string;
  featuresTitle: string;
  interactiveLessonsTitle: string;
  interactiveLessonsDesc: string;
  liveSessionsTitle: string;
  liveSessionsDesc: string;
  discussionForumsTitle: string;
  discussionForumsDesc: string;
  analyticsTitle: string;
  analyticsDesc: string;
  certificationsTitle: string;
  certificationsDesc: string;
  aiTitle: string;
  aiDesc: string;
  secureTitle: string;
  secureDesc: string;
  libraryTitle: string;
  libraryDesc: string;
  roadmapTitle: string;
  phase1Title: string;
  phase1Desc: string;
  phase2Title: string;
  phase2Desc: string;
  phase3Title: string;
  phase3Desc: string;
  phase4Title: string;
  phase4Desc: string;
  waitlistTitle: string;
  waitlistSubtitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  buttonIdle: string;
  buttonSubmitting: string;
  buttonSubmitted: string;
  marketingOptInLabel: string;
  waitlistError: string;
}> = {
  en: {
    heroTitle: "Knowledge Camp Learning Management System",
    heroSubtitle: "Complete platform for learning, tracking, and collaboration",
    comingTitle: "Our Advanced LMS is Coming",
    comingBody:
      "We're building a comprehensive Learning Management System that will revolutionize online education with interactive lessons, live sessions, real-time collaboration, and advanced analytics.",
    ctaExploreCourses: "Explore Current Courses",
    ctaBackHome: "Back to Home",
    featuresTitle: "LMS Features",
    interactiveLessonsTitle: "Interactive Lessons",
    interactiveLessonsDesc: "Engaging video lessons, quizzes, and interactive exercises",
    liveSessionsTitle: "Live Sessions",
    liveSessionsDesc: "Real-time classes with instructors and fellow learners",
    discussionForumsTitle: "Discussion Forums",
    discussionForumsDesc: "Collaborate with peers and get support from instructors",
    analyticsTitle: "Advanced Analytics",
    analyticsDesc: "Detailed insights into your learning progress",
    certificationsTitle: "Certifications",
    certificationsDesc: "Earn recognized certificates upon course completion",
    aiTitle: "AI-Powered Learning",
    aiDesc: "Personalized learning paths and intelligent recommendations",
    secureTitle: "Secure Access",
    secureDesc: "Enterprise-grade security and privacy protection",
    libraryTitle: "Resource Library",
    libraryDesc: "Access downloadable materials and reference documents",
    roadmapTitle: "Development Roadmap",
    phase1Title: "Phase 1: Core Infrastructure",
    phase1Desc:
      "Building the foundation with course management, user profiles, and enrollment system",
    phase2Title: "Phase 2: Learning Features",
    phase2Desc:
      "Adding interactive lessons, quizzes, assignments, and progress tracking",
    phase3Title: "Phase 3: Collaboration Tools",
    phase3Desc:
      "Implementing live sessions, discussion forums, and peer-to-peer features",
    phase4Title: "Phase 4: AI & Analytics",
    phase4Desc:
      "Adding AI-powered recommendations, advanced analytics, and adaptive learning paths",
    waitlistTitle: "Be Part of the Revolution in Online Learning",
    waitlistSubtitle:
      "Subscribe to our newsletter to get updates on the LMS launch and exclusive early access benefits.",
    namePlaceholder: "Your name (optional)",
    emailPlaceholder: "Enter your email",
    buttonIdle: "Notify Me",
    buttonSubmitting: "Submitting...",
    buttonSubmitted: "You're on the list",
    marketingOptInLabel:
      "I would like to receive updates about the LMS launch and related training offers from Knowledge Camp Global.",
    waitlistError: "Failed to join waitlist.",
  },
  fr: {
    heroTitle: "Plateforme LMS Knowledge Camp",
    heroSubtitle: "Plateforme complète pour l'apprentissage, le suivi et la collaboration",
    comingTitle: "Notre LMS avancé arrive bientôt",
    comingBody:
      "Nous construisons une plateforme LMS complète qui va révolutionner la formation en ligne avec des leçons interactives, des sessions en direct, une collaboration en temps réel et des analyses avancées.",
    ctaExploreCourses: "Découvrir les formations actuelles",
    ctaBackHome: "Retour à l'accueil",
    featuresTitle: "Fonctionnalités du LMS",
    interactiveLessonsTitle: "Leçons interactives",
    interactiveLessonsDesc: "Vidéos engageantes, quiz et exercices interactifs",
    liveSessionsTitle: "Sessions en direct",
    liveSessionsDesc: "Cours en temps réel avec formateurs et autres participants",
    discussionForumsTitle: "Forums de discussion",
    discussionForumsDesc: "Collaborez avec vos pairs et obtenez du support des formateurs",
    analyticsTitle: "Analyses avancées",
    analyticsDesc: "Indicateurs détaillés sur votre progression",
    certificationsTitle: "Certifications",
    certificationsDesc: "Obtenez des certificats reconnus après chaque parcours",
    aiTitle: "Apprentissage assisté par IA",
    aiDesc: "Parcours personnalisés et recommandations intelligentes",
    secureTitle: "Accès sécurisé",
    secureDesc: "Sécurité et confidentialité de niveau entreprise",
    libraryTitle: "Bibliothèque de ressources",
    libraryDesc: "Accédez à des supports téléchargeables et documents de référence",
    roadmapTitle: "Feuille de route de développement",
    phase1Title: "Phase 1 : Infrastructure de base",
    phase1Desc:
      "Mise en place du socle avec gestion des cours, profils utilisateurs et inscriptions",
    phase2Title: "Phase 2 : Fonctionnalités d'apprentissage",
    phase2Desc:
      "Ajout de leçons interactives, quiz, devoirs et suivi de progression",
    phase3Title: "Phase 3 : Outils de collaboration",
    phase3Desc:
      "Mise en place des classes en direct, forums et fonctionnalités collaboratives",
    phase4Title: "Phase 4 : IA et analytique",
    phase4Desc:
      "Ajout de recommandations IA, analyses avancées et parcours adaptatifs",
    waitlistTitle: "Participez à la révolution de la formation en ligne",
    waitlistSubtitle:
      "Inscrivez-vous pour recevoir les actualités du lancement du LMS et des avantages d'accès anticipé.",
    namePlaceholder: "Votre nom (optionnel)",
    emailPlaceholder: "Votre adresse e-mail",
    buttonIdle: "Prévenez-moi",
    buttonSubmitting: "Envoi...",
    buttonSubmitted: "Vous êtes sur la liste",
    marketingOptInLabel:
      "Je souhaite recevoir des informations sur le lancement du LMS et les offres de formation associées de Knowledge Camp Global.",
    waitlistError: "Échec de l'inscription à la liste d'attente.",
  },
  pt: {
    heroTitle: "Plataforma LMS Knowledge Camp",
    heroSubtitle: "Plataforma completa para aprendizagem, acompanhamento e colaboração",
    comingTitle: "Nosso LMS avançado está a caminho",
    comingBody:
      "Estamos a desenvolver uma plataforma LMS completa que vai revolucionar a formação online com aulas interativas, sessões ao vivo, colaboração em tempo real e análises avançadas.",
    ctaExploreCourses: "Ver cursos atuais",
    ctaBackHome: "Voltar ao início",
    featuresTitle: "Funcionalidades do LMS",
    interactiveLessonsTitle: "Aulas interativas",
    interactiveLessonsDesc: "Vídeo-aulas envolventes, questionários e exercícios práticos",
    liveSessionsTitle: "Sessões ao vivo",
    liveSessionsDesc: "Aulas em tempo real com formadores e colegas",
    discussionForumsTitle: "Fóruns de discussão",
    discussionForumsDesc: "Colabore com outros participantes e obtenha apoio dos formadores",
    analyticsTitle: "Análises avançadas",
    analyticsDesc: "Informações detalhadas sobre o seu progresso",
    certificationsTitle: "Certificações",
    certificationsDesc: "Obtenha certificados reconhecidos após concluir os cursos",
    aiTitle: "Aprendizagem com IA",
    aiDesc: "Percursos personalizados e recomendações inteligentes",
    secureTitle: "Acesso seguro",
    secureDesc: "Segurança e privacidade ao nível empresarial",
    libraryTitle: "Biblioteca de recursos",
    libraryDesc: "Aceda a materiais descarregáveis e documentos de referência",
    roadmapTitle: "Roteiro de desenvolvimento",
    phase1Title: "Fase 1: Infraestrutura base",
    phase1Desc:
      "Construção da base com gestão de cursos, perfis de utilizador e inscrições",
    phase2Title: "Fase 2: Recursos de aprendizagem",
    phase2Desc:
      "Adicionar aulas interativas, questionários, tarefas e acompanhamento de progresso",
    phase3Title: "Fase 3: Colaboração",
    phase3Desc:
      "Implementar sessões ao vivo, fóruns de discussão e funcionalidades colaborativas",
    phase4Title: "Fase 4: IA e análises",
    phase4Desc:
      "Adicionar recomendações baseadas em IA, análises avançadas e percursos adaptativos",
    waitlistTitle: "Faça parte da revolução do ensino online",
    waitlistSubtitle:
      "Subscreva para receber novidades sobre o lançamento do LMS e benefícios de acesso antecipado.",
    namePlaceholder: "O seu nome (opcional)",
    emailPlaceholder: "Introduza o seu e-mail",
    buttonIdle: "Notificar-me",
    buttonSubmitting: "A enviar...",
    buttonSubmitted: "Já está na lista",
    marketingOptInLabel:
      "Quero receber novidades sobre o lançamento do LMS e ofertas de formação relacionadas da Knowledge Camp Global.",
    waitlistError: "Não foi possível concluir a inscrição na lista de espera.",
  },
};

export default function LMSPage() {
  const language = useLanguage();
  const copy = LMS_COPY[language] ?? LMS_COPY.en;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/lms/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined, marketingOptIn }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert(copy.waitlistError);
      }
    } catch {
      alert(copy.waitlistError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {copy.heroTitle}
          </h1>
          <p className="text-muted-foreground">
            {copy.heroSubtitle}
          </p>
        </div>
      </section>

      {/* LMS IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="/images/site/lms.svg"
            alt="Professional using sophisticated learning management platform dashboard on large monitor"
          />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-12 text-center mb-16">
            <BookOpen className="h-16 w-16 mx-auto text-purple-500 mb-4" />
            <h2 className="text-3xl font-bold mb-3 text-purple-900">
              {copy.comingTitle}
            </h2>
            <p className="text-lg text-purple-700 mb-8 max-w-2xl mx-auto">
              {copy.comingBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                {copy.ctaExploreCourses}
              </Link>
              <Link
                to="/"
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold"
              >
                {copy.ctaBackHome}
              </Link>
            </div>
          </div>

          {/* Features Preview */}
          <h2 className="text-3xl font-bold mb-8">{copy.featuresTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.interactiveLessonsTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.interactiveLessonsDesc}</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.liveSessionsTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.liveSessionsDesc}</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.discussionForumsTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.discussionForumsDesc}</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.analyticsTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.analyticsDesc}</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.certificationsTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.certificationsDesc}</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.aiTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.aiDesc}</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.secureTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.secureDesc}</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">{copy.libraryTitle}</h3>
              <p className="text-sm text-muted-foreground">{copy.libraryDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">{copy.roadmapTitle}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                <span className="font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{copy.phase1Title}</h3>
                <p className="text-muted-foreground text-sm">{copy.phase1Desc}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/40">
                <span className="font-bold text-primary/60">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{copy.phase2Title}</h3>
                <p className="text-muted-foreground text-sm">{copy.phase2Desc}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/40">
                <span className="font-bold text-primary/60">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{copy.phase3Title}</h3>
                <p className="text-muted-foreground text-sm">{copy.phase3Desc}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/40">
                <span className="font-bold text-primary/60">4</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{copy.phase4Title}</h3>
                <p className="text-muted-foreground text-sm">{copy.phase4Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 md:py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            {copy.waitlistTitle}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {copy.waitlistSubtitle}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder={copy.namePlaceholder}
                className="px-6 py-3 rounded-lg text-foreground focus:outline-none flex-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder={copy.emailPlaceholder}
                className="px-6 py-3 rounded-lg text-foreground focus:outline-none flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-lg transition-colors"
                disabled={loading}
              >
                {submitted
                  ? copy.buttonSubmitted
                  : loading
                  ? copy.buttonSubmitting
                  : copy.buttonIdle}
              </button>
            </div>
            <label className="flex items-start gap-2 text-sm text-white/90 justify-center">
              <input
                type="checkbox"
                className="mt-1"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
              />
              <span>{copy.marketingOptInLabel}</span>
            </label>
          </form>
        </div>
      </section>
    </Layout>
  );
}
