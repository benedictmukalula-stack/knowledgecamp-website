import React from "react";
import { Button } from "@/components/ui/button";

export interface PricingBlockProps {
  price: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  note?: string;
}

const PricingBlock: React.FC<PricingBlockProps> = ({ price, features, ctaLabel, ctaHref, note }) => (
  <div className="border rounded-lg p-8 shadow-md bg-background flex flex-col items-center gap-4 max-w-md mx-auto">
    <div className="text-3xl font-bold mb-2">{price}</div>
    <ul className="mb-4 text-left w-full list-disc list-inside text-muted-foreground">
      {features.map((feature, idx) => (
        <li key={idx}>{feature}</li>
      ))}
    </ul>
    {note && <div className="text-xs text-accent-foreground mb-2">{note}</div>}
    <a href={ctaHref} className="w-full">
      <Button size="lg" className="w-full">{ctaLabel}</Button>
    </a>
  </div>
);

export default PricingBlock;
