import Layout from "@/components/Layout";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { SectionImage } from "@/components/SectionImage";
import { COURSE_CATALOG } from "@shared/courseData";
import { useLanguage, type LanguageCode } from "@/hooks/useLanguage";

export default function PricingPage() {
  const language = useLanguage();

  const t: Record<LanguageCode, {
    pageTitle: string;
    pageSubtitle: string;
    saHubTitle: string;
    saHubSubtitle: string;
    africaTitle: string;
    africaSubtitle: string;
    intlTitle: string;
    intlSubtitle: string;
    perDelegateNote: string;
    delegatesTitle: string;
    delegatesSmall: string;
    delegatesMedium: string;
    delegatesLarge: string;
    earlyBirdTitle: string;
    earlyBirdBody: string;
    groupTitle: string;
    groupLines: string[];
    hubTitle: string;
    hubBody: string;
    onlineVsTitle: string;
    onlineVsBody: string;
    inHouseTitle: string;
    inHouseBody: string;
    intlDeliveryTitle: string;
    intlDeliveryBody: string;
    laptopTitle: string;
    laptopBody: string;
    vipTitle: string;
    vipBody: string;
    registerNow: string;
    requestCustomQuote: string;
    requestCorporateQuote: string;
  }> = {
    en: {
      pageTitle: "Pricing Overview",
      pageSubtitle: "Transparent, enterprise-ready pricing with hub-based rates and clear discount rules.",
      saHubTitle: "South Africa Hub",
      saHubSubtitle: "Local pricing for SA hubs.",
      africaTitle: "Africa Hubs",
      africaSubtitle: "Regional pricing across Africa.",
      intlTitle: "International",
      intlSubtitle: "Premium global delivery.",
      perDelegateNote:
        "All pricing is per delegate and aligned to delivery hub. Final totals are calculated using the same pricing engine across Pay Now, Invoice, and Quote flows.",
      delegatesTitle: "Delegate Pricing (3 / 5 / 10)",
      delegatesSmall: "Optimized for small teams.",
      delegatesMedium: "Best value for growing teams.",
      delegatesLarge: "Enterprise group pricing.",
      earlyBirdTitle: "Early Bird Discounts",
      earlyBirdBody: "10% off for registrations completed 30+ days before course start.",
      groupTitle: "Group Discounts",
      groupLines: ["3–4 delegates: 10% off", "5–9 delegates: 15% off", "10+ delegates: 25% off"],
      hubTitle: "Hub Pricing",
      hubBody: "Pricing varies by delivery region: South Africa, Africa, and International hubs.",
      onlineVsTitle: "Online vs In‑Person",
      onlineVsBody: "Online delivery is optimized for scale, while in‑person includes venue and logistics.",
      inHouseTitle: "In‑House & Custom",
      inHouseBody: "Custom scheduling, onsite delivery, and tailored content are available on request.",
      intlDeliveryTitle: "International Delivery",
      intlDeliveryBody: "International pricing includes travel, logistics, and regional compliance.",
      laptopTitle: "Laptop Add‑On",
      laptopBody: "Add laptop rentals per delegate if required. Costs are shown upfront in the calculator.",
      vipTitle: "VIP Pricing",
      vipBody: "Executive cohorts, bespoke content, and premium venues are available on request.",
      registerNow: "Register Now",
      requestCustomQuote: "Request Custom Quote",
      requestCorporateQuote: "Request Corporate Quote",
    },
    fr: {
      pageTitle: "Aperçu des tarifs",
      pageSubtitle:
        "Tarification transparente et adaptée aux entreprises, avec des tarifs par hub et des règles de remise claires.",
      saHubTitle: "Hub Afrique du Sud",
      saHubSubtitle: "Tarifs locaux pour les hubs en Afrique du Sud.",
      africaTitle: "Hubs Afrique",
      africaSubtitle: "Tarification régionale à travers le continent.",
      intlTitle: "International",
      intlSubtitle: "Prestations premium à l'international.",
      perDelegateNote:
        "Tous les tarifs sont par délégué et alignés sur le hub de livraison. Les montants finaux sont calculés par le même moteur de tarification pour le paiement immédiat, la facture et le devis.",
      delegatesTitle: "Tarifs par délégué (3 / 5 / 10)",
      delegatesSmall: "Optimisé pour les petites équipes.",
      delegatesMedium: "Meilleur rapport qualité‑prix pour les équipes en croissance.",
      delegatesLarge: "Tarification groupe pour grandes équipes.",
      earlyBirdTitle: "Remises early bird",
      earlyBirdBody: "10% de remise pour toute inscription finalisée 30+ jours avant le début de la formation.",
      groupTitle: "Remises de groupe",
      groupLines: [
        "3–4 délégués : 10% de remise",
        "5–9 délégués : 15% de remise",
        "10+ délégués : 25% de remise",
      ],
      hubTitle: "Tarification par hub",
      hubBody:
        "Les tarifs varient selon la région de livraison : Afrique du Sud, Afrique et hubs internationaux.",
      onlineVsTitle: "En ligne vs présentiel",
      onlineVsBody:
        "Le format en ligne est optimisé pour l'échelle, tandis que le présentiel inclut lieu et logistique.",
      inHouseTitle: "Intra & sur‑mesure",
      inHouseBody:
        "Planification sur mesure, sessions sur site et contenus adaptés sont disponibles sur demande.",
      intlDeliveryTitle: "Livraison internationale",
      intlDeliveryBody:
        "Les tarifs internationaux incluent les déplacements, la logistique et la conformité régionale.",
      laptopTitle: "Option ordinateur portable",
      laptopBody:
        "Ajoutez la location d'ordinateurs par délégué si nécessaire. Les coûts sont visibles dans le calculateur.",
      vipTitle: "Tarifs VIP",
      vipBody:
        "Cohortes exécutives, contenus sur‑mesure et lieux premium disponibles sur demande.",
      registerNow: "S'inscrire",
      requestCustomQuote: "Demander un devis personnalisé",
      requestCorporateQuote: "Demander un devis corporate",
    },
    pt: {
      pageTitle: "Visão geral de preços",
      pageSubtitle:
        "Preços transparentes e prontos para empresas, com tarifas por hub e regras de desconto claras.",
      saHubTitle: "Hub África do Sul",
      saHubSubtitle: "Preços locais para hubs na África do Sul.",
      africaTitle: "Hubs África",
      africaSubtitle: "Preços regionais em toda a África.",
      intlTitle: "Internacional",
      intlSubtitle: "Entrega global premium.",
      perDelegateNote:
        "Todos os preços são por participante e alinhados ao hub de entrega. Os valores finais são calculados pelo mesmo mecanismo de preços para Pagar Agora, Faturar e Orçamento.",
      delegatesTitle: "Preços por participante (3 / 5 / 10)",
      delegatesSmall: "Ideal para pequenas equipes.",
      delegatesMedium: "Melhor custo‑benefício para equipes em crescimento.",
      delegatesLarge: "Preços para grandes grupos corporativos.",
      earlyBirdTitle: "Descontos early bird",
      earlyBirdBody:
        "10% de desconto para inscrições concluídas 30+ dias antes do início do curso.",
      groupTitle: "Descontos para grupos",
      groupLines: [
        "3–4 participantes: 10% de desconto",
        "5–9 participantes: 15% de desconto",
        "10+ participantes: 25% de desconto",
      ],
      hubTitle: "Preços por hub",
      hubBody: "Os preços variam por região de entrega: África do Sul, África e hubs internacionais.",
      onlineVsTitle: "Online vs presencial",
      onlineVsBody:
        "O formato online é otimizado para escala; o presencial inclui local e logística.",
      inHouseTitle: "In‑company & sob medida",
      inHouseBody:
        "Agendamento customizado, entrega no local e conteúdo adaptado disponíveis sob consulta.",
      intlDeliveryTitle: "Entrega internacional",
      intlDeliveryBody:
        "Os preços internacionais incluem viagem, logística e conformidade regional.",
      laptopTitle: "Adicional de notebook",
      laptopBody:
        "Adicione aluguel de notebooks por participante quando necessário. Os custos aparecem no simulador.",
      vipTitle: "Preços VIP",
      vipBody:
        "Turmas executivas, conteúdo sob medida e locais premium disponíveis sob consulta.",
      registerNow: "Inscreva-se",
      requestCustomQuote: "Solicitar orçamento personalizado",
      requestCorporateQuote: "Solicitar orçamento corporativo",
    },
  };

  const copy = t[language] ?? t.en;
  const [searchParams] = useSearchParams();

  const { local, africa, international } = useMemo(() => {
    const byLocation: Record<"local" | "africa" | "international", number[]> = {
      local: [],
      africa: [],
      international: [],
    };

    for (const course of COURSE_CATALOG) {
      const rate = course.pricing.basePrice / course.duration;
      if (byLocation[course.location]) {
        byLocation[course.location].push(rate);
      }
    }

    const summarize = (rates: number[]) => {
      if (rates.length === 0) {
        return { avgDaily: 0, minDaily: 0, maxDaily: 0 };
      }
      const sum = rates.reduce((acc, v) => acc + v, 0);
      const avgDaily = Math.round(sum / rates.length);
      const minDaily = Math.round(Math.min(...rates));
      const maxDaily = Math.round(Math.max(...rates));
      return { avgDaily, minDaily, maxDaily };
    };

    return {
      local: summarize(byLocation.local),
      africa: summarize(byLocation.africa),
      international: summarize(byLocation.international),
    };
  }, []);

  useEffect(() => {
    const section = searchParams.get("section");
    if (!section) return;
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{copy.pageTitle}</h1>
          <p className="text-muted-foreground">
            {copy.pageSubtitle}
          </p>
        </div>
      </section>

      {/* PRICING IMAGE */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container max-w-5xl">
          <SectionImage
            src="/images/site/pricing.svg"
            alt="Professional reviewing training pricing and investment options on laptop"
          />
        </div>
      </section>

      <section id="pricing" className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">{copy.saHubTitle}</h2>
            <p className="text-sm text-muted-foreground mb-4">{copy.saHubSubtitle}</p>
            <p className="text-2xl font-bold mb-2">ZAR {local.avgDaily.toLocaleString()}/day</p>
            <p className="text-xs text-muted-foreground">Range: ZAR {local.minDaily.toLocaleString()} – {local.maxDaily.toLocaleString()}</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">{copy.africaTitle}</h2>
            <p className="text-sm text-muted-foreground mb-4">{copy.africaSubtitle}</p>
            <p className="text-2xl font-bold mb-2">ZAR {africa.avgDaily.toLocaleString()}/day</p>
            <p className="text-xs text-muted-foreground">Range: ZAR {africa.minDaily.toLocaleString()} – {africa.maxDaily.toLocaleString()}</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">{copy.intlTitle}</h2>
            <p className="text-sm text-muted-foreground mb-4">{copy.intlSubtitle}</p>
            <p className="text-2xl font-bold mb-2">ZAR {international.avgDaily.toLocaleString()}/day</p>
            <p className="text-xs text-muted-foreground">Range: ZAR {international.minDaily.toLocaleString()} – {international.maxDaily.toLocaleString()}</p>
          </div>
        </div>
        <div className="container mt-8">
          <div className="bg-muted/30 border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground">
              {copy.perDelegateNote}
            </p>
          </div>
        </div>
      </section>

      <section id="delegates" className="py-12 md:py-16 bg-muted/30 border-y border-border">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">{copy.delegatesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-2">3 Delegates</h3>
              <p className="text-sm text-muted-foreground">{copy.delegatesSmall}</p>
              <p className="mt-4 text-lg font-bold">10% discount</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-2">5 Delegates</h3>
              <p className="text-sm text-muted-foreground">{copy.delegatesMedium}</p>
              <p className="mt-4 text-lg font-bold">15% discount</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-2">10+ Delegates</h3>
              <p className="text-sm text-muted-foreground">{copy.delegatesLarge}</p>
              <p className="mt-4 text-lg font-bold">25% discount</p>
            </div>
          </div>
        </div>
      </section>

      <section id="early-bird" className="py-12 md:py-16">
        <div className="container">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.earlyBirdTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {copy.earlyBirdBody}
            </p>
          </div>
        </div>
      </section>

      <section id="group" className="py-12 md:py-16 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.groupTitle}</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              {copy.groupLines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="hub" className="py-12 md:py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.hubTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {copy.hubBody}
            </p>
          </div>
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.onlineVsTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {copy.onlineVsBody}
            </p>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-12 md:py-16 bg-muted/30 border-y border-border">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.inHouseTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {copy.inHouseBody}
            </p>
          </div>
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.intlDeliveryTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {copy.intlDeliveryBody}
            </p>
          </div>
        </div>
      </section>

      <section id="laptop" className="py-12 md:py-16">
        <div className="container">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.laptopTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {copy.laptopBody}
            </p>
          </div>
        </div>
      </section>

      <section id="vip" className="py-12 md:py-16 bg-muted/30 border-y border-border">
        <div className="container">
          <div className="bg-background border border-border rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">{copy.vipTitle}</h3>
            <p className="text-sm text-muted-foreground">
              {copy.vipBody}
            </p>
          </div>
        </div>
      </section>

      <section id="custom-quote" className="py-12 md:py-16">
        <div className="container flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
          >
            {copy.registerNow}
          </Link>
          <Link
            to="/register-enterprise"
            className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold"
          >
            {copy.requestCustomQuote}
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-semibold"
          >
            {copy.registerNow}
          </Link>
          <Link
            to="/register-enterprise"
            className="px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 font-semibold"
          >
            {copy.requestCorporateQuote}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
