import { useState, useEffect, useCallback } from "react";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import heroRockfort from "@/assets/rockfort.png";
import heroSrirangam from "@/assets/srirangam.png";
import heroKallanai from "@/assets/kallanai.png";
import heroCar from "@/assets/cab_interior.png";

const slides = [
  {
    image: heroRockfort,
    title: "Premium tours and travels in trichy",
    subtitle: "Safe • Reliable • On-Time",
  },
  {
    image: heroSrirangam,
    title: "Trichy to Airport & Outstation",
    subtitle: "Comfortable & Hassle-Free Rides",
  },
  {
    image: heroKallanai,
    title: "Explore Trichy with Ease",
    subtitle: "Local Sightseeing Made Better",
  },
  {
    image: heroCar,
    title: "Ride in Comfort & Style",
    subtitle: "Clean Cars • Professional Drivers",
  },
];

const HeroSlider = () => {
  const { openBooking } = useBooking();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number, dir = 1) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length, 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);
  const next = () => goTo((current + 1) % slides.length, 1);

  return (
    <section id="home" className="relative h-[60vh] md:h-screen w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${i === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            {...(i === 0 ? {} : { loading: "lazy" as const })}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div
          key={`text-${current}-${direction}`}
          className="animate-slide-in"
        >
          <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight mb-4">
            {slides[current].title}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 tracking-wide">
            {slides[current].subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={openBooking}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-heading font-semibold text-lg hover:bg-blue-700 transition-all shadow-xl animate-pulse-glow"
          >
            <CalendarIcon className="w-5 h-5" />
            Book Now
          </button>
          <a
            href="https://wa.me/919342084745?text=Hi%20Trichy%20Mariyam%20Holidayz%2C%20I%20want%20to%20book%20a%20cab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-heading font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-secondary transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-secondary transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-foreground/30"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
