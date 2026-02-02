type SectionImageProps = {
  src: string;
  alt: string;
};

export function SectionImage({ src, alt }: SectionImageProps) {
  return (
    <div className="w-full h-56 md:h-72 relative overflow-hidden rounded-2xl shadow-sm bg-muted">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
