import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseSchedule, COURSE_CATALOG } from "@shared/courseData";
import { calculatePricing } from "@/lib/pricingEngine";

export interface PricingCalculatorProps {
  course?: CourseSchedule;
  courseId?: string;
  showPayAfterInvoice?: boolean;
  isEarlyBird?: boolean;
  isVIP?: boolean;
  isInHouse?: boolean;
}


const PricingCalculator: React.FC<PricingCalculatorProps> = ({ course, courseId, showPayAfterInvoice = true, isEarlyBird = false, isVIP = false, isInHouse = false }) => {
  const [quantity, setQuantity] = useState(1);
  const [includeLaptop, setIncludeLaptop] = useState(false);
  const [payAfterInvoice, setPayAfterInvoice] = useState(false);

  const selectedCourse = course || COURSE_CATALOG.find((c) => c.id === courseId);

  if (!selectedCourse) {
    return (
      <div className="border rounded-lg p-6 flex flex-col gap-4 max-w-md mx-auto text-center">
        <div className="text-sm text-muted-foreground">Select a course to calculate pricing.</div>
      </div>
    );
  }

  const pricing = calculatePricing({
    course: selectedCourse,
    delegateCount: quantity,
    includeLaptop,
    isEarlyBird,
    isVIP,
    isInHouse,
  });

  return (
    <div className="border rounded-lg p-6 flex flex-col gap-4 max-w-md mx-auto">
      <div className="flex items-center gap-2">
        <label htmlFor="quantity" className="font-medium">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={includeLaptop}
          onChange={e => setIncludeLaptop(e.target.checked)}
        />
        Include Laptop
      </label>
      <div className="text-lg font-bold">Total: R{pricing.total.toLocaleString()}</div>
      <ul className="text-sm text-muted-foreground">
        <li>Base: R{pricing.basePrice.toLocaleString()}</li>
        {pricing.laptopPrice > 0 && <li>Laptop: R{pricing.laptopPrice.toLocaleString()}</li>}
        {pricing.earlyBirdDiscount > 0 && <li>Early Bird: -R{pricing.earlyBirdDiscount.toLocaleString()}</li>}
        {pricing.groupDiscount > 0 && <li>Group: -R{pricing.groupDiscount.toLocaleString()}</li>}
        {pricing.vipDiscount > 0 && <li>VIP: -R{pricing.vipDiscount.toLocaleString()}</li>}
        {pricing.inHouseDiscount > 0 && <li>In-House: -R{pricing.inHouseDiscount.toLocaleString()}</li>}
      </ul>
      {showPayAfterInvoice && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={payAfterInvoice}
            onChange={e => setPayAfterInvoice(e.target.checked)}
          />
          Pay after invoice
        </label>
      )}
      <Button size="lg">{payAfterInvoice ? "Request Invoice" : "Pay Now"}</Button>
    </div>
  );
};

export default PricingCalculator;
