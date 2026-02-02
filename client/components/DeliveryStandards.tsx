import React from "react";

export interface DeliveryStandardsProps {
  title?: string;
  standards: string[];
}

const DeliveryStandards: React.FC<DeliveryStandardsProps> = ({ title, standards }) => (
  <section className="py-10 px-4 max-w-3xl mx-auto">
    {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
    <ul className="list-disc list-inside space-y-3 bg-muted rounded-lg p-6">
      {standards.map((standard, i) => (
        <li key={i} className="text-base text-muted-foreground">{standard}</li>
      ))}
    </ul>
  </section>
);

export default DeliveryStandards;
