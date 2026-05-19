import { ImageIcon } from "lucide-react";
import { Link } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const rooms = [
  {
    name: "Main Concert Hall",
    description:
      "Our historic main hall is a versatile space suitable for concerts, theatre productions, film screenings, community events, presentations, and large gatherings. Equipped with modern facilities while maintaining its historic character, the hall can adapt to a wide range of events and activities.",
    capacity: "Up to 300 guests",
    features: ["Stage & lighting", "Sound system", "Tiered seating"],
    photos: [
      { src: "/images/rooms/concerteHall/1000064788.jpg" },
      { src: "/images/rooms/concerteHall/1000064789.jpg" },
      { src: "/images/rooms/concerteHall/1000005871.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005872.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005889.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005895.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005903.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005913.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005914.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005918.jpg", contain: true },
      { src: "/images/rooms/concerteHall/1000005923.jpg", contain: true },
    ],
  },
  {
    name: "New Hall",
    description:
      "Our newly built multipurpose hall offers a bright, spacious, and modern environment suitable for a wide range of events, performances, activities, and community gatherings. Designed with flexibility and comfort in mind, the hall provides a welcoming space that can easily adapt to different occasions and community needs.",
    capacity: "Up to 150 guests",
    features: ["Flexible layout", "Bright modern interior", "Spacious open design"],
    photos: [
      "/images/rooms/newHall/1778843426846.jpg",
      "/images/rooms/newHall/1778843426862.jpg",
    ],
  },
  {
    name: "Community Room",
    description:
      "A versatile space available for meetings, workshops, classes, and community events of all kinds.",
    capacity: "Up to 80 guests",
    features: ["Projector & screen", "Flexible seating", "Kitchenette access"],
    contrast: 75,
    photos: [
      "/images/rooms/mainHall/mainHall1.jpg",
      "/images/rooms/mainHall/mainHall2.jpg",
      "/images/rooms/mainHall/kitchen.jpg",
      { src: "/images/rooms/mainHall/1000005907.jpg", contain: true },
    ],
  },
  {
    name: "Private Paddlers' Training Gym",
    description:
      "A dedicated fitness space supporting training, conditioning, and water sports development for all levels.",
    capacity: "Up to 30 people",
    features: ["Cardio equipment", "Strength machines", "Changing rooms", "Private gym"],
    photos: [
      "/images/rooms/gym/1000064796.jpg",
      "/images/rooms/gym/1000005864.jpg",
      "/images/rooms/gym/1000005865.jpg",
      "/images/rooms/gym/1000005866.jpg",
      "/images/rooms/gym/1000005868.jpg",
    ],
  },
  {
    name: "Sports Courts",
    description:
      "Outdoor and indoor courts available for basketball, tennis, and a range of local sporting activities.",
    capacity: "Multiple courts",
    features: ["Basketball court", "Tennis court", "Outdoor gym"],
    contrast: 75,
    photos: [
      "/images/playground/sport/1000064374.jpg",
      "/images/playground/sport/1000064375.jpg",
      "/images/playground/sport/1000064376.jpg",
    ],
  },
  {
    name: "Classrooms",
    description:
      "Well-equipped learning spaces available for courses, workshops, tutoring, and educational programmes.",
    capacity: "Up to 25 per room",
    features: ["Whiteboards", "Comfortable spaces", "Flexible layouts"],
    photos: [
      "/images/rooms/classrooms/1000005861.jpg",
      "/images/rooms/classrooms/1000005869.jpg",
      "/images/rooms/classrooms/1000005870.jpg",
      "/images/rooms/classrooms/1000065207.jpg",
      "/images/rooms/classrooms/1000065209.jpg",
      "/images/rooms/classrooms/1000065210.jpg",
    ],
  },
  {
    name: "Community Library",
    description:
      "A quiet space to read, study, and explore our local collection — open to all members of the community.",
    capacity: "Open access",
    features: ["Local history archive", "Reading area", "Study desks"],
    photos: [
      "/images/playground/library.jpg",
    ],
  },
  {
    name: "Chill Zone",
    description:
      "A relaxed social space where people of all ages can unwind, connect, and enjoy time together.",
    capacity: "Up to 50 people",
    features: ["Lounge seating", "Games & activities", "Community hub"],
    contrast: 75,
    photos: [
      "/images/playground/chillZone/chillZone.jpg",
      "/images/playground/chillZone/1000064372.jpg",
      "/images/playground/chillZone/1000064373.jpg",
    ],
  },
  {
    name: "Playground",
    description:
      "A safe and fun outdoor area for children and families to enjoy as part of our community grounds.",
    capacity: "Open to all",
    features: ["Children's equipment", "Safety surfacing", "Seating for families"],
    photos: [
      "/images/playground/playground/1000064786.jpg",
      "/images/playground/playground/1000064787.jpg",
    ],
  },
];

export default function Facilities() {
  return (
    <div>
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/tidyTown/1000064453.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl text-white mb-4">Rooms &amp; Facilities</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Spaces for every occasion — sport, culture, learning, and community
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl mb-4 text-gray-900">Our Spaces</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our rooms, facilities, and community spaces designed for<br />
              events, activities, and local gatherings.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {rooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                {(room as any).photos ? (
                  <Carousel className="w-full" opts={{ loop: true }}>
                    <CarouselContent>
                      {(room as any).photos.map((photo: string | { src: string; contain?: boolean }, i: number) => {
                        const src = typeof photo === "string" ? photo : photo.src;
                        const contain = typeof photo === "object" && photo.contain;
                        return (
                          <CarouselItem key={i}>
                            <img
                              src={src}
                              alt={`${room.name} photo ${i + 1}`}
                              className={`w-full h-80 ${contain ? "object-contain bg-gray-100" : "object-cover"}`}
                              loading="lazy"
                              decoding="async"
                              style={(room as any).contrast ? { filter: `contrast(${(room as any).contrast}%)` } : undefined}
                            />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselPrevious className="left-3 bg-white/80 hover:bg-white border-0 shadow" />
                    <CarouselNext className="right-3 bg-white/80 hover:bg-white border-0 shadow" />
                  </Carousel>
                ) : (
                  <div className="h-80 bg-[var(--brand-lighter)] border-b border-[var(--brand-light)] flex flex-col items-center justify-center gap-3">
                    <ImageIcon className="w-16 h-16 text-[var(--brand-soft)]" />
                    <p className="text-sm text-[var(--brand-mid)] font-medium">Photo coming soon</p>
                  </div>
                )}
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-semibold text-gray-900">{room.name}</h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--brand-light)] text-[var(--brand)] whitespace-nowrap">
                      {room.capacity}
                    </span>
                  </div>
                  <p className="text-gray-600 text-base mb-6">{room.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
