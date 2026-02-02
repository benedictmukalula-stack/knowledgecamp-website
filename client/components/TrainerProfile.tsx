import React from "react";

export interface TrainerProfileProps {
  name: string;
  bio: string;
  photoUrl?: string;
  specialties?: string[];
  credentials?: string;
}

const TrainerProfile: React.FC<TrainerProfileProps> = ({ name, bio, photoUrl, specialties, credentials }) => (
  <div className="flex flex-col md:flex-row items-center gap-6 bg-muted rounded-lg p-6 max-w-2xl mx-auto">
    {photoUrl && (
      <img
        src={photoUrl}
        alt={name}
        className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0"
        loading="lazy"
        decoding="async"
      />
    )}
    <div className="flex-1">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      {credentials && <div className="text-sm text-muted-foreground mb-2">{credentials}</div>}
      <p className="mb-2">{bio}</p>
      {specialties && specialties.length > 0 && (
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold">Specialties:</span> {specialties.join(", ")}
        </div>
      )}
    </div>
  </div>
);

export default TrainerProfile;
