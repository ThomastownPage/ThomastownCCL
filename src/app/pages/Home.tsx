import Slider from "react-slick";
import { Calendar, Music, Users, ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router";
import { useData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
 
const carouselImages = [
  {
    url: "/images/playground/enterance.jpg",
    title: "Welcome to Thomastown Community Centre",
    subtitle: "Heritage, Culture & Events",
  },
  {
    url: "/images/playground/gym.jpg",
    title: "Paddlers' Training Gym",
    subtitle: "Supporting training, fitness, and water sports development",
    buttonText: "Explore Facilities",
    buttonTo: "/facilities",
  },
  {
    url: "/images/playground/basketball.jpg",
    title: "Community Sports Courts",
    subtitle: "A space for basketball, tennis, and local activities",
    buttonText: "Explore Facilities",
    buttonTo: "/facilities",
  },
  {
    url: "/images/playground/classrooms.jpg",
    title: "Learning Spaces",
    subtitle: "Classrooms available for workshops and courses",
  },
  {
    url: "/images/playground/library.jpg",
    title: "Community Library",
    subtitle: "Explore our collection and quiet study areas",
  },
  {
    url: "/images/playground/chillZone.jpg",
    title: "Chill Zone",
    subtitle: "Relax and connect with your community",
  },
  {
    url: "/images/playground/playground.jpg", 
    title: "Bringing the Community Together",
    subtitle: "A place for everyone in Thomastown",
  },
];
 
function getEventIcon(type: string) {
  switch (type) {
    case "Concert": return Music;
    case "Festival": return Calendar;
    default: return Users;
  }
}

export default function Home() {
  const { concerts, news } = useData();
  const upcomingEvents = concerts.filter((c) => !c.isPast).slice(0, 3);
  const newsItems = news.slice(0, 3);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    fade: true,
  };

  return (
    <div>
      <section className="relative">
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                        {image.title}
                      </h2>
                      <p className="text-xl md:text-2xl text-gray-200 mb-8">
                        {image.subtitle}
                      </p>
                      <Link
                        to={(image as any).buttonTo ?? "/contact"}
                        className="inline-flex items-center px-8 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-hover)] transition-colors"
                      >
                        {(image as any).buttonText ?? "Get Involved"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-gray-900">Welcome to Our Community</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thomastown Community Centre Limited is the heart of our town, bringing
              people together through culture, heritage, and shared experiences. Our
              historic venue hosts concerts, events, and community activities that
              celebrate our rich local traditions.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link
              to="/history"
              className="px-8 py-3 border-2 border-[var(--brand)] text-[var(--brand)] rounded-lg hover:bg-[var(--brand-lighter)] transition-colors"
            >
              Learn More
            </Link>
            <Link
              to="/facilities"
              className="px-8 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-hover)] transition-colors"
            >
              View Facilities
            </Link>
          </div>
        </div>
      </section>

      <section
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80')` }}
      >
        <div className="absolute inset-0 bg-green-900/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-300" />
                </div>
                <span className="text-green-300 font-semibold uppercase tracking-wider text-sm">Community Initiative</span>
              </div>
              <h2 className="text-4xl md:text-5xl text-white mb-5 leading-tight">
                Thomastown <span className="text-green-300">TidyTowns</span>
              </h2>
              <p className="text-lg text-gray-200 mb-4">
                Thomastown TidyTowns is a proud community-led initiative dedicated to keeping
                our town clean, green, and welcoming for residents and visitors alike.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                From biodiversity projects and litter clean-ups to heritage restoration and
                sustainable planting, our volunteers work year-round to make Thomastown
                a place we can all be proud of.
              </p>
              <Link
                to="/tidytowns"
                className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Explore TidyTowns
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Leaf, title: "Biodiversity",    desc: "Native planting & wildlife habitats" },
                { icon: Users, title: "Volunteers",      desc: "Community-driven clean-up events" },
                { icon: Calendar, title: "Year-Round",  desc: "Regular initiatives & projects" },
                { icon: ArrowRight, title: "Awards",    desc: "Recognised nationally for progress" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                  <Icon className="w-7 h-7 text-green-300 mb-3" />
                  <h4 className="text-white font-semibold mb-1">{title}</h4>
                  <p className="text-gray-300 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-500">No upcoming events at the moment. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((concert, index) => {
                const Icon = getEventIcon(concert.eventType ?? "Event");
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 bg-[var(--brand-light)] rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-[var(--brand)]" />
                    </div>
                    <h3 className="text-xl mb-2 text-gray-900">{concert.title}</h3>
                    <p className="text-gray-600 mb-2">{concert.date}</p>
                    <span className="inline-block px-3 py-1 bg-[var(--brand-light)] text-[var(--brand-dark)] rounded-full text-sm">
                      {concert.eventType ?? "Event"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/concerts"
              className="inline-flex items-center text-[var(--brand)] hover:text-[var(--brand-hover)]"
            >
              View All Events
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">Latest News</h2>
          {newsItems.length === 0 && (
            <p className="text-center text-gray-500">No news articles yet. Check back soon!</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-[var(--brand)] mb-2">{item.date}</p>
                <h3 className="text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.excerpt}</p>
                <Link
                  to="/news"
                  className="text-[var(--brand)] hover:text-[var(--brand-hover)] inline-flex items-center"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-gray-900">Find Us</h2>
            <p className="text-gray-600 mt-2">
              Thomastown Community Centre, Summerhill, Thomastown, Co. Kilkenny
            </p>
          </div>
          <iframe
            title="Thomastown Community Centre Map"
            src="https://www.google.com/maps?q=Thomastown+Community+Centre,+Summerhill,+Thomastown,+Co.+Kilkenny,+Ireland&output=embed"
            className="w-full h-80 rounded-xl border-0 shadow-md"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
