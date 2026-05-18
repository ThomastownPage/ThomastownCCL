import { Calendar, ArrowRight } from "lucide-react";
import { useData } from "../context/DataContext";

export default function News() {
  const { news: newsArticles } = useData();

  return (
    <div>
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1751246010581-d34514c2f314?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb21tdW5pdHklMjBldmVudHMlMjBjb25jZXJ0JTIwZ2F0aGVyaW5nJTIwcGVvcGxlfGVufDF8fHx8MTc3ODY3MjExNXww&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl text-white mb-4">News & Updates</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Stay informed about community happenings and centre activities
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl mb-8 text-gray-900">Latest News</h2>
              <div className="space-y-8">
                {newsArticles.slice(0, 3).map((article, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="px-3 py-1 bg-[var(--brand-light)] text-[var(--brand-dark)] rounded-full text-sm">
                          {article.category}
                        </span>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {article.date}
                        </div>
                      </div>
                      <h3 className="text-2xl mb-3 text-gray-900">{article.title}</h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      {/* <button className="text-[var(--brand)] hover:text-[var(--brand-hover)] inline-flex items-center">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button> */}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h3 className="text-xl mb-6 text-gray-900">Recent Updates</h3>
                <div className="space-y-6">
                  {newsArticles.slice(3).map((article, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <span className="text-sm text-[var(--brand)] mb-1 block">
                        {article.date}
                      </span>
                      <h4 className="text-base text-gray-900 hover:text-[var(--brand)] cursor-pointer">
                        {article.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4 text-gray-900">Stay Connected</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for the latest news, events, and community updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300"
            />
            <button className="px-8 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-hover)] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section> */}
    </div>
  );
}
