import React from "react";
import { PrimaryCTA } from "./PrimaryCTA";

export interface LandingPageTemplateProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl?: string;
  features?: string[];
}

const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({ title, subtitle, ctaLabel, ctaHref, imageUrl, features }) => (
  <section className="min-h-screen flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-primary/10 to-background">
    <div className="max-w-2xl w-full text-center">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="mx-auto mb-6 max-h-56 object-contain"
          loading="lazy"
          decoding="async"
        />
      )}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-lg md:text-xl mb-8 text-muted-foreground">{subtitle}</p>}
      <PrimaryCTA label={ctaLabel} href={ctaHref} size="lg" />
      {features && features.length > 0 && (
        <ul className="mt-8 space-y-2 text-left mx-auto max-w-md">
          {features.map((feature, i) => (
            <li key={i} className="text-base text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
);

export default LandingPageTemplate;
