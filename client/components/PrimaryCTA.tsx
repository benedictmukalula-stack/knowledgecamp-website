import React from "react";
import { Button } from "@/components/ui/button";

export interface PrimaryCTAProps {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({ label, href, variant = "default", size = "default" }) => {
  return (
    <a href={href}>
      <Button variant={variant} size={size}>
        {label}
      </Button>
    </a>
  );
};

export default PrimaryCTA;
