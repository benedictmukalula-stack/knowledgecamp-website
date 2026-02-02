import React from "react";
import { Button } from "@/components/ui/button";

export interface ConversionBandProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaHref: string;
}

const ConversionBand: React.FC<ConversionBandProps> = ({ title, subtitle, ctaLabel, ctaHref }) => (
  <section className="py-10 px-4 bg-primary text-primary-foreground text-center rounded-lg flex flex-col items-center gap-2 mt-8">
    <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
    {subtitle && <p className="mb-4 text-lg text-primary-foreground/90">{subtitle}</p>}
    <a href={ctaHref}>
      <Button size="lg" variant="secondary">{ctaLabel}</Button>
    </a>
  </section>
);

export default ConversionBand;
