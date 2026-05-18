import { useState } from "react";
import { Calendar, MapPin, Clock, Music, Users, Star, Mic2, Palette, BookOpen, Clapperboard } from "lucide-react";
import { useData } from "../context/DataContext";

function getEventIcon(type: string) {
  switch (type) {
    case "Concert": return Music;
    case "Festival": return Star;
    case "Play": return Clapperboard;
    case "Musical": return Mic2;
    case "Exhibition": return Palette;
    case "Workshop": return BookOpen;
    default: return Users;
  }
}

export default function Concerts() {
  const { concerts } = useData();
  const upcomingConcerts = concerts.filter((c) => !c.isPast);
  const pastConcerts = concerts.filter((c) => c.isPast);

  const [lightbox, setLightbox] = useState<{
    flyers: string[];
    index: number;
    title: string;
  } | null>(null);

  return (
    <div>
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1591103797042-7748e75791be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb21tdW5pdHklMjBldmVudHMlMjBjb25jZXJ0JTIwZ2F0aGVyaW5nJTIwcGVvcGxlfGVufDF8fHx8MTc3ODY3MjExNXww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl text-white mb-4">Events</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Experience world-class music and entertainment in the heart of Thomastown
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-12 text-gray-900">Upcoming Events</h2>
          <div className="space-y-8">
            {upcomingConcerts.map((concert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="h-64 md:h-auto">
                    <img
                      src={concert.image}
                      alt={concert.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl mb-2 text-gray-900">{concert.title}</h3>
                        <p className="text-lg text-[var(--brand)] mb-4">{concert.artist}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-4 py-2 bg-[var(--brand)] text-white rounded-lg">
                          {concert.price}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{concert.description}</p>
                    <div className="flex flex-wrap gap-4 text-gray-700">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-[var(--brand)]" />
                        {concert.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-[var(--brand)]" />
                        {concert.time}
                      </div>
                      {concert.address && (
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-[var(--brand)]" />
                          {concert.address}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8 text-gray-900">Past Performances</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {pastConcerts.map((concert, index) => {
              const flyers = concert.flyers || [];
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] max-w-[300px] snap-start flex-shrink-0">
                  {(() => { const Icon = getEventIcon(concert.eventType ?? "Concert"); return <Icon className="w-8 h-8 text-[var(--brand)] mb-3" />; })()}
                  <span className="inline-block px-3 py-1 bg-[var(--brand-light)] text-[var(--brand-dark)] rounded-full text-xs font-semibold mb-2">{concert.eventType ?? "Concert"}</span>
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">{concert.title}</h3>
                  <p className="text-gray-500 mb-4">{concert.date}</p>

                  {flyers.length > 0 ? (
                    <div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {flyers.slice(0, 4).map((flyer, i) => (
                          <div
                            key={i}
                            className="relative cursor-pointer overflow-hidden rounded-lg"
                            onClick={() => setLightbox({ flyers, index: i, title: concert.title })}
                          >
                            <img
                              src={flyer}
                              alt={`Flyer ${i + 1}`}
                              className="w-full h-28 object-cover hover:scale-105 transition-transform duration-200"
                            />
                            {i === 3 && flyers.length > 4 && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">+{flyers.length - 4}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setLightbox({ flyers, index: 0, title: concert.title })}
                        className="text-[var(--brand)] hover:text-[var(--brand-hover)] font-semibold text-base transition-colors"
                      >
                        View all {flyers.length} flyer{flyers.length !== 1 ? "s" : ""} →
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm italic">No flyers uploaded yet</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <p className="text-white text-2xl font-bold">{lightbox.title}</p>
                <p className="text-gray-400 text-lg">
                  Photo {lightbox.index + 1} of {lightbox.flyers.length}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-white bg-white/20 hover:bg-white/40 w-14 h-14 rounded-full flex items-center justify-center text-3xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <img
              src={lightbox.flyers[lightbox.index]}
              alt={`Flyer ${lightbox.index + 1}`}
              className="w-full max-h-[68vh] object-contain rounded-xl"
            />

            {lightbox.flyers.length > 1 && (
              <div className="flex gap-4 mt-5">
                <button
                  onClick={() =>
                    setLightbox({
                      ...lightbox,
                      index: (lightbox.index - 1 + lightbox.flyers.length) % lightbox.flyers.length,
                    })
                  }
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xl font-bold py-4 rounded-xl transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={() =>
                    setLightbox({
                      ...lightbox,
                      index: (lightbox.index + 1) % lightbox.flyers.length,
                    })
                  }
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xl font-bold py-4 rounded-xl transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
}
