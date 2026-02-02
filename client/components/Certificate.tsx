import React from "react";

export interface CertificateProps {
  name: string;
  description: string;
  imageUrl?: string;
}

const Certificate: React.FC<CertificateProps> = ({ name, description, imageUrl }) => (
  <div className="flex flex-col md:flex-row items-center gap-6 bg-muted rounded-lg p-6 max-w-2xl mx-auto">
    {imageUrl && (
      <img
        src={imageUrl}
        alt={name}
        className="w-40 h-28 object-contain rounded mb-4 md:mb-0 bg-white"
        loading="lazy"
        decoding="async"
      />
    )}
    <div className="flex-1">
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Certificate;
