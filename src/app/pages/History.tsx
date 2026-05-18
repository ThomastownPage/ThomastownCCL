import { ImageIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const milestones = [
  { year: "1910", event: "Lady Kathleen Lyndsey convenes the first meeting at the Nore View Hotel" },
  { year: "1911", event: "Concert Hall officially opened on March 16th by the Countess of Aberdeen" },
  { year: "1921", event: "Final debt instalment to the Department of Agriculture paid in full" },
  { year: "1939", event: "Hall leased to Thomastown Cinema company, bringing cinema to the town" },
  { year: "1951", event: "Community reclaims the Hall; hall repainted and systems renovated" },
  { year: "1963", event: "Hall handed to Muintir na Tíre for the benefit of all the community" },
  { year: "1974", event: "Freehold purchased; Hall transferred to Thomastown Community Council" },
  { year: "1979", event: "New Community Centre (the 'Big Hall') opened on October 19th" },
  { year: "1982", event: "Branch of the County Library established in the Centre" },
  { year: "2011", event: "Thomastown Community Centre Ltd. incorporated; board of trustees formed" },
];

function ImagePlaceholder({ label, height = "h-72" }: { label: string; height?: string }) {
  return (
    <div
      className={`${height} w-full rounded-xl bg-[var(--brand-lighter)] border-2 border-dashed border-[var(--brand-border)] flex flex-col items-center justify-center gap-3`}
    >
      <ImageIcon className="w-10 h-10 text-[var(--brand-soft)]" />
      <p className="text-sm text-[var(--brand-mid)] font-medium">{label}</p>
    </div>
  );
}

const circleSlides = [
  { label: "VIP — Circle of Friends 1958", src: "/images/history/VIP1958.jpg", heightClass: "h-auto w-full" },
  { label: "VIP — Circle of Friends 1976", src: "/images/history/VIP1976.jpg", heightClass: "h-auto w-full" },
  { label: "VIP — Circle of Friends Modern", src: "/images/history/VIPmodern.jpg", heightClass: "h-auto w-full" },
];



export default function History() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative h-[420px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/history/castle.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <p className="text-[var(--brand-soft)] uppercase tracking-widest text-sm mb-3">Est. 1911</p>
            <h1 className="text-5xl md:text-6xl text-white mb-4">History of our Community Centre</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              A story that began over 100 years ago — and continues today
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[var(--brand)] font-semibold uppercase tracking-wider text-sm">Our Heritage</span>
              <h2 className="text-4xl mt-2 mb-6 text-gray-900">A Legacy of Community</h2>
              <p className="text-lg text-gray-600 mb-4">
                This is a story that began over 100 years ago in January 1910. Lady Kathleen Lyndsey,
                Ballylinch, daughter of the 6th Earl of Carrick, gathered her personal friends and
                numerous Thomastown inhabitants. She put it to them that the time had come to build
                a public hall for the community.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                From its founding vision to the modern Thomastown Community Centre Ltd., our building
                has stood at the heart of this town through war, economic hardship, and periods of
                great renewal — always serving the people of Thomastown.
              </p>
              <p className="text-lg text-gray-600">
                What follows is the full story of the Concert Hall: how it was built, how it was
                loved, how it was sometimes struggled over, and how it endures.
              </p>
            </div>
            <div>
              <img
                src="/images/playground/enterance.jpg"
                alt="Community Centre entrance"
                className="w-full h-[420px] object-cover rounded-xl shadow-xl"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Era 1: The Origins */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <img
                src="/images/history/lady.jpg"
                alt="Lady Kathleen Lyndsey — Founding Meeting"
                className="w-full h-auto rounded-xl shadow"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                1910 — The Beginning
              </span>
              <h2 className="text-3xl mb-5 text-gray-900">Lady Kathleen's Vision</h2>
              <p className="text-gray-600 mb-4">
                A meeting was held on April 6th, 1910, at the Nore View Hotel. Twenty-seven people
                attended. A sub-committee was set up to look at possible sites on the Station Road
                and it was decided to form a limited company and sell shares for one pound each.
              </p>
              <p className="text-gray-600 mb-4">
                The committee was made up of R.J. Pillsworth Miller, James Ryan (shopkeeper), Arthur
                Hall Dare (Gentleman from Dangan House), Patrick T. Kelly (shopkeeper), J.B. Hodgert
                (Shopkeeper), and Walter and Lady Kathleen Lyndsey. It was estimated that the income
                would be 50 pounds per annum and expenses would be 15 pounds per annum, to include
                ground rent, caretaker's wages, insurance, and repairs.
              </p>
              <p className="text-gray-600">
                By April 1910 there were 120 shareholders and 429 pounds had been subscribed. It was
                therefore decided that the Concert Hall would be built in preference to one of
                corrugated iron and wood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Era 2: Construction & Opening */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div>
              <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                1910–1911 — Construction &amp; Opening
              </span>
              <h2 className="text-3xl mb-5 text-gray-900">Building the Hall</h2>
              <p className="text-gray-600 mb-4">
                The site on Marshes Street, Station Road, was offered by Michael Murphy and Edward
                Comerford. The committee approached the Department of Agriculture and Technical
                Instruction for a 10-year loan of 200 pounds at 2.5%, which allowed it to accept the
                lowest tender of 565 pounds from Thomas A. Walsh of Kilmallock &amp; Kilkenny.
              </p>
              <p className="text-gray-600 mb-4">
                In October 1910 work began. The committee decided to add a balcony over the porch and
                cloakrooms for an extra 50 pounds. <strong>The Hall was opened on March 16th, 1911,
                  by the Countess of Aberdeen</strong>, and an opening entertainment took place on
                March 17th.
              </p>
              <p className="text-gray-600">
                Richard Lamphier was appointed caretaker at a wage of 4 pounds per annum. The Hall
                was insured for 750 pounds per annum. The Thomastown Musical Society agreed to pay
                5 pounds per annum for the use of the piano and the Hall for practices.
              </p>
            </div>
            <div className="h-full">
              <Carousel className="w-full h-full" opts={{ loop: true }}>
                <CarouselContent>
                  <CarouselItem>
                    <img
                      src="/images/history/1000005842.jpg"
                      alt="Building the Hall — original construction"
                      className="w-full h-full object-cover rounded-xl shadow"
                      loading="lazy"
                      decoding="async"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="/images/history/1000005843.jpg"
                      alt="Building the Hall — original construction"
                      className="w-full h-full object-cover rounded-xl shadow"
                      loading="lazy"
                      decoding="async"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Era 3: War Years & Cinema */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  <CarouselItem>
                    <img
                      src="/images/history/oldCinema.jpg"
                      alt="Old Cinema — 1930s–1940s"
                      className="w-full h-full object-cover rounded-xl shadow"
                      loading="lazy"
                      decoding="async"
                    />
                  </CarouselItem>
                  <CarouselItem>
                    <img
                      src="/images/history/construction.jpg"
                      alt="Construction era"
                      className="w-full h-full object-cover rounded-xl shadow"
                      loading="lazy"
                      decoding="async"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-white/80 hover:bg-white border-0 shadow" />
                <CarouselNext className="right-3 bg-white/80 hover:bg-white border-0 shadow" />
              </Carousel>
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                1914–1951 — War Years &amp; The Cinema Era
              </span>
              <h2 className="text-3xl mb-5 text-gray-900">Challenge &amp; Adaptation</h2>
              <p className="text-gray-600 mb-4">
                In 1914, the war years brought deficits to the Concert Hall. The debt began to
                accumulate and by 1916 the Committee was worried. By 1921 the last 25-pound
                instalment on the debt to the Department of Agriculture was paid.
              </p>
              <p className="text-gray-600 mb-4">
                In 1939 the society contracted William Hoyne, Thomastown Merchant, and his associates
                in the Thomastown Cinema company to let the Concert Hall for a period of 5 years,
                with the option of renewing the lease every 5 years. The committee reserved the right
                to use the Hall free of charge on 6 Sundays and 16 weekdays each year. After 28 years,
                it was clear that the Hall was holding its own but could not expand.
              </p>
              <p className="text-gray-600">
                In 1951, Mrs. Solly Flood became chairperson. She expressed dissatisfaction at
                renewing the cinema agreement and stressed the need to regain possession of the Hall
                for the Irish Country Women's Association, The Child Welfare Society, Young Farmer's
                Club and the Jubilee Nurses Association. The AGM unanimously agreed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Era 4: Community Revival */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                1951–1974 — Community Revival
              </span>
              <h2 className="text-3xl mb-5 text-gray-900">Reclaiming the Hall</h2>
              <p className="text-gray-600 mb-4">
                The Concert Hall reverted back to the society. The Hall was repainted and the heating
                and lighting systems were overhauled. Local organisations were given preferential
                terms on renting. By 1953, the Hall was valued at 6,000 pounds and the contents
                at 216 pounds.
              </p>
              <p className="text-gray-600 mb-4">
                In 1961, the future of the Concert Hall was giving the committee much anxious thought.
                By 1965 the society had begun a close cooperation with Muintir na Tíre Society —
                members felt the functions being performed were exactly the sort of activities Lady
                Kathleen Lyndsey had intended. Collaboration began with the building of tennis courts
                at the rear of the Hall.
              </p>
              <p className="text-gray-600">
                In March 1963, the Cinema company gave notice it was discontinuing its lease and it
                was decided to let the Concert Hall to Muintir na Tíre to be used for the benefit of
                all sections of the community. Negotiations also began with the Clifford estate to
                buy the freehold of the land.
              </p>
            </div>
            <div>
              <img
                src="/images/history/goldTicket.png"
                alt="Golden Ticket — Reclaiming the Hall"
                className="w-full h-80 object-cover rounded-xl shadow"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Era 5: Building the Future */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <img
                src="/images/history/building1979.jpg"
                alt="New Community Centre — Opening 1979"
                className="w-full h-116 object-cover rounded-xl shadow"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                1974–1982 — Building for the Future
              </span>
              <h2 className="text-3xl mb-5 text-gray-900">A New Community Centre</h2>
              <p className="text-gray-600 mb-4">
                By early 1974 the purchase of the freehold was complete and the Hall was handed over
                to the Thomastown Community Council. The Community Council paid only 400 pounds to
                cover the redemption of 342 outstanding shares. On April 2nd, 1974, at the final
                meeting of the Thomastown Concert Hall and Development Society, it was decided that
                an official handover party should be held when the foundation stone for the new
                building was laid.
              </p>
              <p className="text-gray-600 mb-4">
                The major concern for the Community Council was to build a new Community Centre
                adjoining the Concert Hall, estimated to cost around 60,000 pounds. The County
                Council contributed 3,000 pounds. Parish residents raised a further 12,000 pounds.
                By 1978, a loan from the Bank of Ireland — who also made a donation of 500 pounds —
                secured the remaining finance.
              </p>
              <p className="text-gray-600">
                <strong>The new Hall — also known as the "Big Hall" — was officially opened on
                  Friday, October 19th, 1979, by Chairman Mr. Edward Ryan.</strong> In 1982, a branch
                of the County Library was also established in the Centre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Circle of Friends / Council Members */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl text-gray-900 mb-4">Circle of Friends</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The Thomastown Community Council members who made it all possible.
            </p>
          </div>

          <Carousel className="w-full mb-10" opts={{ loop: true }}>
            <CarouselContent>
              {circleSlides.map((slide, i) => (
                <CarouselItem key={i}>
                  {(slide as any).src ? (
                    <img
                      src={(slide as any).src}
                      alt={slide.label}
                      className={`${(slide as any).heightClass ?? "h-72 w-full object-cover"} rounded-xl`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="h-72 w-full rounded-xl bg-[var(--brand-lighter)] border-2 border-dashed border-[var(--brand-border)] flex flex-col items-center justify-center gap-3">
                      <ImageIcon className="w-12 h-12 text-[var(--brand-soft)]" />
                      <p className="text-sm text-[var(--brand-mid)] font-medium">{slide.label}</p>
                    </div>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 bg-white/80 hover:bg-white border-0 shadow" />
            <CarouselNext className="right-3 bg-white/80 hover:bg-white border-0 shadow" />
          </Carousel>

          <div className="bg-[var(--brand-lighter)] border border-[var(--brand-light)] rounded-2xl p-8">
            <p className="text-gray-700 leading-relaxed text-center">
              Liam Kelly, Paddy Kelly, Dinny Roche, Paul Stapleton, Seamus Cuddihy

              Denis Treacy, Paddy Murphy, Jim Walsh, Larry Flynn, Johnny Minogue, Dr. Empey, Willie Barron, Julie Stapleton, Cathleen Finan, Philip Heafy, Sean Ryan, Herbert Devoy, Paddy Carroll, Michael O’Brien, Joe Prendergast, Ned Ryan, Luke Murtagh.

              (L-R) Mary Kavanagh, Kate Hynes, Fr. Peter Muldowney, Seamus Quigley, Eleanor Reddy, Ailish Hayes, Joe “Jagger” Wemyss.
            </p>
          </div>
        </div>
      </section>

      {/* Era 6: Modern Era */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block bg-[var(--brand-light)] text-[var(--brand)] text-sm font-semibold px-3 py-1 rounded-full mb-4">
                2011 — The Modern Era
              </span>
              <h2 className="text-3xl mb-5 text-gray-900">Thomastown Community Centre Ltd.</h2>
              <p className="text-gray-600 mb-4">
                On the 30th of August 2011, Thomastown Community Council ceased its involvement with
                the Concert Hall. The freehold of the site was incorporated into a new company called
                <strong> Thomastown Community Centre Ltd.</strong>
              </p>
              <p className="text-gray-600">
                A board of trustees was put in place and a management committee was formed to run the
                day-to-day activities — continuing the mission that Lady Kathleen Lyndsey and those
                27 people at the Nore View Hotel set in motion over a century ago.
              </p>
            </div>
            <div>
              <ImagePlaceholder label="Photo: Thomastown Community Centre Today" height="h-64" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">Key Milestones</h2>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex mb-6 last:mb-0">
                <div className="flex-shrink-0 w-24 flex flex-col items-center">
                  <div className="w-16 h-16 bg-[var(--brand)] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-semibold leading-tight text-center">{milestone.year}</span>
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[var(--brand-border)] mt-2" style={{ minHeight: "2rem" }} />
                  )}
                </div>
                <div className="flex-1 pl-6 pb-6">
                  <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
                    <p className="text-gray-800">{milestone.event}</p>
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
