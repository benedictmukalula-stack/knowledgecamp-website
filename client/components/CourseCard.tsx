import React from "react";
import { Button } from "@/components/ui/button";

export interface CourseCardProps {
  title: string;
  description: string;
  price: string;
  date?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, price, date, ctaLabel = "Register", ctaHref = "#" }) => (
  <div className="border rounded-xl p-6 bg-background flex flex-col gap-4 transition-all hover:shadow-md hover:-translate-y-1">
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <p className="text-muted-foreground text-sm mb-2">{description}</p>
    {date && <div className="text-xs text-accent-foreground mb-2">{date}</div>}
    <div className="text-lg font-bold mb-4">{price}</div>
    <a href={ctaHref} className="mt-auto">
      <Button size="sm">{ctaLabel}</Button>
    </a>
  </div>
);

export default CourseCard;
