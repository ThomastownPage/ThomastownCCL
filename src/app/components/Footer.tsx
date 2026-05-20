import { Link } from "react-router";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">

              
              <div>
               <img
              src="/images/logo.png"
              alt="Historic building"
              className="w-9 h-10"
            />
                <h3 className="text-white font-semibold">Thomastown Community Centre Limited</h3>

              </div>
            </div>
            <p className="text-sm text-gray-400">
              An stair a athbhunú, an todchaí a nertú 
              Restoring the past, building for the future.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-[var(--brand)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-sm hover:text-[var(--brand)] transition-colors">
                  History
                </Link>
              </li>
              <li>
                <Link to="/concerts" className="text-sm hover:text-[var(--brand)] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-sm hover:text-[var(--brand)] transition-colors">
                  Facilities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-[var(--brand)] flex-shrink-0" />
                <span className="text-sm">
                  Thomastown Community Centre<br />
                  Summerhill<br />
                  Thomastown, Co. Kilkenny
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[var(--brand)]" />
                <span className="text-sm">087-7728170</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[var(--brand)]" />
                <span className="text-sm">Thomastowncommunitycentre@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/p/Thomastown-Community-Centre-100089802174881/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--brand)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
             
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Thomastown Community Centre Limited
          </p>
        </div>
      </div>
    </footer>
  );
}
