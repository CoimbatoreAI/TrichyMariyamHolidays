import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Fleet", to: "/fleet" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-2 px-4 md:px-8">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
        >
          <img src="/logo.png" alt="Trichy Mariyam Holidayz" className="h-20 md:h-24 w-auto object-contain bg-white p-2 rounded-xl" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors duration-200 ${location.pathname === l.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:9342084745"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            Call Now
          </a>
          <button
            onClick={openBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Book Now
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-base font-medium transition-colors py-2 ${location.pathname === l.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <a href="tel:9342084745" className="flex-1 text-center py-3 rounded-lg border border-border text-sm font-medium">
                Call Now
              </a>
              <button
                onClick={openBooking}
                className="flex-1 text-center py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              >
                Book Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
