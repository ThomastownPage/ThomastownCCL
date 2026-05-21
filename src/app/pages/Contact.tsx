import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "353877728170";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text =
      `*New Message from Thomastown Community Centre website*\n\n` +
      `*Name:* ${form.name}\n` +
      `*Email:* ${form.email}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Subject:* ${form.subject}\n\n` +
      `*Message:*\n${form.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div>
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/playground/gym.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            <h1 className="text-5xl md:text-6xl text-white mb-4">Contact Us</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Contact us for more information about our facilities and activities
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Send us a Message</h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm mb-2 text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
                    placeholder="+353 ..."
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm mb-2 text-gray-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
                  >
                    <option>General Inquiry</option>
                    <option>Event Information</option>
                    <option>Membership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-hover)] transition-colors"
                >
                  Send Message via WhatsApp
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[var(--brand)]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      Thomastown Community Centre Ltd<br />
                     Marsh's Street<br />
                      Thomastown<br />
                      Co. Kilkenny<br />
                       R95PX56
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[var(--brand)]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Phone</h3>
                    <p className="text-gray-600">087-7728170</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[var(--brand)]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Email</h3>
                    <p className="text-gray-600">Thomastowncommunitycentre@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--brand-light)] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[var(--brand)]" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Opening Hours</h3>
                    <p className="text-gray-600">
                      Open seven days a week.<br />
                      Please contact us for further information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl mb-4 text-gray-900">Visit Us</h3>
                <p className="text-gray-600 mb-4">
                  We're located in the heart of Thomastown, easily accessible by car or
                  public transport. Free parking is available nearby.
                </p>
                <iframe
                  title="Thomastown Community Centre Map"
                  src="https://www.google.com/maps?q=Thomastown+Community+Centre,+Summerhill,+Thomastown,+Co.+Kilkenny,+Ireland&output=embed"
                  className="w-full h-64 rounded-lg border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
