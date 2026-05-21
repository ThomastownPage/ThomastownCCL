import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
const navLinks = [
  { name: "Home", path: "/" },
  { name: "History", path: "/history" },
  { name: "Events", path: "/concerts" },
  { name: "Rooms / Facilities", path: "/facilities" },
  { name: "News", path: "/news" },
  { name: "TidyTowns", path: "/tidytowns" },
  { name: "Contact Us", path: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/images/logo.png"
              alt="Historic building"
              className="w-14 h-16"
            />

            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-gray-700 pl-6">
                Thomastown Community Centre Limited
              </h1>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 ">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-[var(--brand-light)] text-[var(--brand-dark)] font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* <div className="ml-3 pl-3 border-l border-gray-200">
              <ThemeSwitch />
            </div> */}
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? "bg-[var(--brand-light)] text-[var(--brand-dark)] font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
