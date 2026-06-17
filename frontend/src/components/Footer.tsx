import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12 px-4 md:px-8">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mb-4 inline-block hover:scale-105 transition-transform duration-300"
          >
            <img src="/logo.png" alt="Trichy Mariyam Holidayz" className="h-20 md:h-24 w-auto object-contain mb-2 bg-white p-2 rounded-xl" />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            premium vehicle and travel services in Trichy. Your trusted travel partner for local rides, outstation trips, and
            airport transfers.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {[
              { label: "Home", to: "/" },
              { label: "Services", to: "/services" },
              { label: "Fleet", to: "/fleet" },
              { label: "Gallery", to: "/gallery" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>15, Annamalai nagar, Mannachanallur, Trichy - 621005</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a href="tel:9342084745" className="hover:text-foreground transition-colors">9342084745</a>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-primary shrink-0" />
              <a
                href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=afagrwg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 text-center">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Trichy Mariyam Holidayz. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
