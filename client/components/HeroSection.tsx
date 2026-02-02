import React from "react";
import { Button } from "@/components/ui/button";

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaLabel, ctaHref }) => (
  <section className="py-16 text-center bg-gradient-to-b from-primary/10 to-background">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
    {subtitle && <p className="text-lg md:text-xl mb-8 text-muted-foreground">{subtitle}</p>}
    <a href={ctaHref}>
      <Button size="lg">{ctaLabel}</Button>
    </a>
  </section>
);

export default HeroSection;
