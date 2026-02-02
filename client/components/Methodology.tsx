import React from "react";

export interface MethodologyProps {
  title?: string;
  points: string[];
}

const Methodology: React.FC<MethodologyProps> = ({ title, points }) => (
  <section className="py-10 px-4 max-w-3xl mx-auto">
    {title && <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>}
    <ul className="list-disc list-inside space-y-3 bg-muted rounded-lg p-6">
      {points.map((point, i) => (
        <li key={i} className="text-base text-muted-foreground">{point}</li>
      ))}
    </ul>
  </section>
);

export default Methodology;
