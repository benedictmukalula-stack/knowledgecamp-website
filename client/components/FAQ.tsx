import React from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  faqs: FAQItem[];
  title?: string;
}

const FAQ: React.FC<FAQProps> = ({ faqs, title }) => (
  <section className="py-12 px-4 max-w-3xl mx-auto">
    {title && <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>}
    <div className="space-y-6">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-muted rounded-lg p-6">
          <div className="font-semibold mb-2">{faq.question}</div>
          <div className="text-muted-foreground">{faq.answer}</div>
        </div>
      ))}
    </div>
  </section>
);

export default FAQ;
