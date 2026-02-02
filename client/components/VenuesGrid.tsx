type VenueCard = {
  hub: string;
  city: string;
  area: string;
  type: string;
  capacity: string;
  features: string[];
  image: string;
};

const venues: VenueCard[] = [
  {
    hub: "South Africa",
    city: "Johannesburg",
    area: "Sandton / Rosebank",
    type: "Hotel conference room",
    capacity: "15–40 delegates",
    features: ["Projector", "Wi-Fi", "Catering options"],
    image: "/images/venues/jhb.svg",
  },
  {
    hub: "South Africa",
    city: "Pretoria",
    area: "Menlyn / Hatfield",
    type: "Training suite",
    capacity: "12–30 delegates",
    features: ["Breakout space", "Parking", "Wi-Fi"],
    image: "/images/venues/pta.svg",
  },
  {
    hub: "South Africa",
    city: "Durban",
    area: "Umhlanga",
    type: "Conference venue",
    capacity: "15–50 delegates",
    features: ["Sea-facing venue", "AV support", "Catering"],
    image: "/images/venues/dbn.svg",
  },
  {
    hub: "South Africa",
    city: "Cape Town",
    area: "Waterfront / Century City",
    type: "Premium conference centre",
    capacity: "15–60 delegates",
    features: ["High-end AV", "Breakout rooms", "Wi-Fi"],
    image: "/images/venues/cpt.svg",
  },
  {
    hub: "Africa Hub",
    city: "Nairobi",
    area: "Westlands / Upper Hill",
    type: "Business training hub",
    capacity: "15–40 delegates",
    features: ["Modern classroom setup", "Strong Wi-Fi", "Catering"],
    image: "/images/venues/nairobi.svg",
  },
  {
    hub: "Africa Hub",
    city: "Lagos",
    area: "VI / Lekki",
    type: "Conference centre",
    capacity: "20–60 delegates",
    features: ["AV support", "Parking", "Catering"],
    image: "/images/venues/lagos.svg",
  },
  {
    hub: "International",
    city: "Dubai",
    area: "Business Bay",
    type: "Premium training venue",
    capacity: "15–50 delegates",
    features: ["High-end AV", "Breakout spaces", "Catering"],
    image: "/images/venues/dubai.svg",
  },
  {
    hub: "International",
    city: "London",
    area: "City / Canary Wharf",
    type: "Corporate training centre",
    capacity: "15–40 delegates",
    features: ["Hybrid-ready rooms", "Wi-Fi", "Catering options"],
    image: "/images/venues/london.svg",
  },
];

export default function VenuesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {venues.map((v) => (
        <div
          key={`${v.city}-${v.area}`}
          className="rounded-2xl border bg-white overflow-hidden shadow-sm"
        >
          <div className="relative h-44">
            <img
              src={v.image}
              alt={`${v.city} venue`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute top-3 left-3 text-xs bg-white/90 px-2 py-1 rounded-full">
              {v.hub}
            </div>
          </div>

          <div className="p-5">
            <div className="text-lg font-semibold">{v.city}</div>
            <div className="text-sm text-gray-600">
              {v.area} · {v.type}
            </div>

            <div className="mt-3 text-sm">
              <span className="font-medium">Capacity:</span> {v.capacity}
            </div>

            <ul className="mt-3 text-sm text-gray-700 list-disc pl-5">
              {v.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
