import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Users,
  Leaf,
  Landmark,
  Bug,
  MapPin,
  TrendingUp,
  Flower2,
  Trash2,
  Building2,
  TreePine,
  ParkingSquare,
  CheckCircle2,
  Award,
  Heart,
} from "lucide-react";

const whyMatters = [
  {
    icon: Heart,
    title: "Community Pride",
    text: "TidyTowns brings people together through shared goals and community involvement, helping to create a stronger sense of pride and belonging within the town.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    text: "Environmental awareness and sustainable practices help protect local resources, encourage greener living, and support future generations.",
  },
  {
    icon: Landmark,
    title: "Heritage Preservation",
    text: "Protecting historic buildings, streetscapes, and local traditions ensures that the unique identity of Thomastown continues to thrive.",
  },
  {
    icon: Bug,
    title: "Biodiversity",
    text: "Supporting wildlife habitats, pollinator-friendly planting, and green spaces contributes to a healthier and more balanced environment.",
  },
  {
    icon: MapPin,
    title: "Tourism & Visitors",
    text: "A clean, welcoming, and attractive town creates a positive experience for visitors and supports local businesses and tourism.",
  },
  {
    icon: TrendingUp,
    title: "Future Development",
    text: "Community-led improvement projects help build a more vibrant, sustainable, and connected Thomastown for years to come.",
  },
];

const projects = [
  {
    icon: Flower2,
    title: "Planting & Landscaping",
    text: "Seasonal planting, flower displays, and landscaping projects help brighten public spaces and create a welcoming atmosphere throughout the town.",
  },
  {
    icon: Trash2,
    title: "Community Clean-Up Days",
    text: "Local volunteers regularly organise litter collection and clean-up initiatives to help maintain clean streets, parks, and shared spaces.",
  },
  {
    icon: Building2,
    title: "Heritage Restoration",
    text: "Preserving historic buildings and improving public areas helps protect the cultural identity and architectural heritage of Thomastown.",
  },
  {
    icon: TreePine,
    title: "Biodiversity Initiatives",
    text: "Projects focused on pollinator-friendly planting, native species, and wildlife habitats support a healthier natural environment.",
  },
  {
    icon: ParkingSquare,
    title: "Public Spaces",
    text: "Efforts to improve parks, pathways, signage, seating, and communal areas help create enjoyable spaces for residents and visitors alike.",
  },
];

const biodiversityPoints = [
  "Pollinator-friendly planting",
  "Native trees and plants",
  "Wildlife protection",
  "Sustainable community initiatives",
  "Greener public spaces",
  "Environmental awareness",
];

const galleryData = [
  ["/images/tidyTown/1000064449.jpg", "/images/tidyTown/1000064450.jpg", "/images/tidyTown/1000064451.jpg"],
  ["/images/tidyTown/1000064453.jpg", "/images/tidyTown/1000064454.jpg", "/images/tidyTown/1000064455.jpg"],
  ["/images/tidyTown/1000064458.jpg", "/images/tidyTown/1000064459.jpg", "/images/tidyTown/1000064461.jpg"],
  ["/images/tidyTown/1000064463.jpg", "/images/tidyTown/1000064464.jpg", "/images/tidyTown/1000064465.jpg"],
  ["/images/tidyTown/1000064466.jpg", "/images/tidyTown/1000064468.jpg", "/images/tidyTown/1000064470.jpg"],
  ["/images/tidyTown/1000064471.jpg", "/images/tidyTown/1000064473.jpg", "/images/tidyTown/1000064474.jpg", "/images/tidyTown/1000005867.jpg", "/images/tidyTown/1000005868.jpg"],
];

function GalleryCarousel({ photos, delayMs }: { photos: string[]; delayMs: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    let fadeTimeout: ReturnType<typeof setTimeout> | null = null;

    const initTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setVisible(false);
        fadeTimeout = setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % photos.length);
          setVisible(true);
        }, 600);
      }, 5000);
    }, delayMs);

    return () => {
      clearTimeout(initTimeout);
      if (interval) clearInterval(interval);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, [delayMs, photos.length]);

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden shadow-md">
      <img
        src={photos[currentIndex]}
        alt="Community Gallery"
        style={{ filter: "contrast(75%)" }}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function TidyTowns() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[480px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMG5hdHVyZSUyMGlybGFuZCUyMGNvdW50cnlzaWRlfGVufDF8fHx8MTc3ODY3MjExNXww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <p className="text-green-400 uppercase tracking-widest text-sm mb-3 font-semibold">
              SuperValu TidyTowns
            </p>
            <h1 className="text-5xl md:text-6xl text-white mb-5">
              Thomastown TidyTowns
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Working together to create a cleaner, greener, more sustainable, and welcoming Thomastown for residents, visitors, and future generations.
            </p>
            <p className="text-base text-gray-300 max-w-3xl mx-auto mb-10">
              Thomastown is proud to support the SuperValu TidyTowns initiative through community participation, environmental care, heritage preservation, and local improvement projects. Our goal is to protect the unique character of our town while building a vibrant and sustainable future for everyone.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#get-involved"
                className="bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Get Involved
              </a>
              <a
                href="#projects"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Community Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
                Our Community
              </span>
              <h2 className="text-4xl mt-2 mb-6 text-gray-900">
                About Thomastown TidyTowns
              </h2>
              <p className="text-lg text-gray-600 mb-5">
                The TidyTowns initiative encourages communities across Ireland to work together in improving their local environment, protecting heritage, supporting biodiversity, and creating welcoming public spaces.
              </p>
              <p className="text-lg text-gray-600 mb-5">
                In Thomastown, local volunteers, residents, community groups, and organisations contribute throughout the year to maintain and enhance the beauty and character of our town. From environmental projects and planting initiatives to heritage preservation and community clean-up days, every effort helps make Thomastown a better place to live, work, and visit.
              </p>
              <p className="text-lg text-gray-600">
                Our participation reflects the strong community spirit that continues to shape the future of Thomastown while respecting its rich history and natural surroundings.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxpcmlzaCUyMHRvd24lMjBncmVlbiUyMGNvbW11bml0eXxlbnwxfHx8fDE3Nzg2NzIxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Thomastown community"
                className="w-full h-[420px] object-cover rounded-xl shadow-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why TidyTowns Matters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
              Our Values
            </span>
            <h2 className="text-4xl mt-2 mb-4 text-gray-900">Why TidyTowns Matters</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyMatters.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Projects */}
      <section id="projects" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
              Local Action
            </span>
            <h2 className="text-4xl mt-2 mb-4 text-gray-900">Community Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Throughout the year, volunteers and local groups participate in projects that improve public spaces, support biodiversity, and enhance the appearance of Thomastown.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => {
              const Icon = project.icon;
              return (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{project.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Biodiversity & Sustainability */}
      <section className="py-16 bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-green-300 font-semibold uppercase tracking-wider text-sm">
                Environment
              </span>
              <h2 className="text-4xl mt-2 mb-6 text-white">
                Biodiversity &amp; Sustainability
              </h2>
              <p className="text-green-100 text-lg mb-5">
                Protecting biodiversity is an important part of creating a sustainable and environmentally responsible community. Thomastown supports initiatives that encourage pollinator-friendly planting, wildlife protection, native vegetation, and greener public spaces.
              </p>
              <p className="text-green-100 text-lg mb-8">
                By working together to care for the local environment, we help preserve the natural beauty of the area while creating healthier habitats for future generations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {biodiversityPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0" />
                    <span className="text-green-100">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xsaW5hdG9yJTIwZmxvd2VycyUyMGdhcmRlbnxlbnwxfHx8fDE3Nzg2NzIxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Biodiversity and nature"
                className="w-full h-[420px] object-cover rounded-xl shadow-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Community Identity */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/images/tidyTown/thomastown.jpg"
                alt="Thomastown heritage"
                className="w-full h-[420px] object-cover rounded-xl shadow-xl"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Our Roots
              </span>
              <h2 className="text-4xl mt-2 mb-6 text-gray-900">
                Heritage &amp; Community Identity
              </h2>
              <p className="text-lg text-gray-600 mb-5">
                Thomastown has a rich cultural and architectural heritage that remains an important part of the town's identity. Protecting and restoring historic buildings, preserving local character, and celebrating community traditions help maintain the unique atmosphere that makes Thomastown special.
              </p>
              <p className="text-lg text-gray-600">
                Through community initiatives and restoration projects, we continue to honour the past while building for the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer / Get Involved */}
      <section id="get-involved" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-7 h-7 text-green-600" />
          </div>
          <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
            Join Us
          </span>
          <h2 className="text-4xl mt-2 mb-6 text-gray-900">Get Involved</h2>
          <p className="text-lg text-gray-600 mb-5 max-w-2xl mx-auto">
            Community participation is at the heart of every successful TidyTowns initiative. Volunteers of all ages and backgrounds are welcome to take part in local projects, clean-up events, planting days, and environmental initiatives.
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you can contribute regularly or occasionally, every effort helps support a cleaner, greener, and more welcoming Thomastown.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="relative px-16 py-5 rounded-xl text-lg font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 overflow-hidden"
              style={{
                background: "linear-gradient(to right, #169B62 0%, #169B62 33%, #ffffff 33%, #ffffff 66%, #FF883E 66%, #FF883E 100%)",
                color: "#1a1a1a",
                textShadow: "0 1px 3px rgba(255,255,255,0.6)",
              }}
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold uppercase tracking-wider text-sm">
              Moments in Action
            </span>
            <h2 className="text-4xl mt-2 mb-4 text-gray-900">Community Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore moments from community projects, planting initiatives, local events, restoration work, and environmental activities taking place throughout Thomastown.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryData.map((photos, i) => (
              <GalleryCarousel key={i} photos={photos} delayMs={i * 500} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="w-12 h-12 bg-[var(--brand-light)] rounded-xl flex items-center justify-center mb-5">
                <Award className="w-6 h-6 text-[var(--brand)]" />
              </div>
              <span className="text-[var(--brand)] font-semibold uppercase tracking-wider text-sm">
                Our Progress
              </span>
              <h2 className="text-4xl mt-2 mb-6 text-gray-900">
                Achievements &amp; Progress
              </h2>
              <p className="text-lg text-gray-600 mb-5">
                The continued efforts of volunteers, residents, and local organisations contribute to the ongoing improvement and development of Thomastown.
              </p>
              <p className="text-lg text-gray-600">
                Community participation, environmental initiatives, and public improvement projects demonstrate the shared commitment to creating a welcoming and sustainable town for everyone.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "20+", label: "Active Volunteers" },
                { value: "12+", label: "Annual Projects" },
                { value: "20+", label: "Years of Participation" },
                { value: "∞", label: "Community Spirit" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-gray-100 text-center shadow-sm"
                >
                  <p className="text-4xl font-bold text-green-600 mb-2">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Help Shape the Future of Thomastown
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Together, through community spirit, sustainability, and local pride, we can continue improving Thomastown for residents, visitors, and future generations.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="bg-white hover:bg-gray-100 text-green-700 px-16 py-5 rounded-xl text-lg font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
