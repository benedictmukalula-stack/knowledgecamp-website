import { CourseSchedule, CourseLocation } from "@shared/courseData";

export interface PricingBreakdown {
  basePrice: number;
  laptopIncluded: boolean;
  laptopPrice: number;
  earlyBirdDiscount: number;
  groupDiscount: number;
  vipDiscount: number;
  inHouseDiscount: number;
  subtotal: number;
  total: number;
  discountLabel: string;
}

export interface PricingEngineOptions {
  course: CourseSchedule;
  delegateCount: number;
  includeLaptop: boolean;
  isEarlyBird?: boolean;
  isVIP?: boolean;
  isInHouse?: boolean;
}

export function calculatePricing({
  course,
  delegateCount,
  includeLaptop,
  isEarlyBird = false,
  isVIP = false,
  isInHouse = false,
}: PricingEngineOptions): PricingBreakdown {
  const { pricing } = course;
  let base = pricing.basePrice * delegateCount;
  let laptop = 0;
  if (!pricing.laptopIncluded && includeLaptop) {
    laptop = pricing.laptopPrice * delegateCount;
  }
  let subtotal = base + laptop;

  // Discounts
  let earlyBirdDiscount = isEarlyBird ? Math.round(subtotal * 0.1) : 0; // 10% early bird
  let groupDiscount = 0;
  if (delegateCount >= 10) groupDiscount = Math.round(subtotal * 0.25);
  else if (delegateCount >= 5) groupDiscount = Math.round(subtotal * 0.15);
  else if (delegateCount >= 3) groupDiscount = Math.round(subtotal * 0.10);

  let vipDiscount = isVIP ? Math.round(subtotal * 0.05) : 0; // 5% VIP
  let inHouseDiscount = isInHouse ? Math.round(subtotal * (pricing.inHouseDiscount / 100)) : 0;

  // Apply all discounts (cumulative)
  let totalDiscount = earlyBirdDiscount + groupDiscount + vipDiscount + inHouseDiscount;
  let total = subtotal - totalDiscount;

  let discountLabel = [
    isEarlyBird ? "Early Bird" : null,
    groupDiscount > 0 ? "Group" : null,
    isVIP ? "VIP" : null,
    isInHouse ? "In-House" : null,
  ].filter(Boolean).join(", ");

  return {
    basePrice: base,
    laptopIncluded: pricing.laptopIncluded || includeLaptop,
    laptopPrice: laptop,
    earlyBirdDiscount,
    groupDiscount,
    vipDiscount,
    inHouseDiscount,
    subtotal,
    total,
    discountLabel,
  };
}
