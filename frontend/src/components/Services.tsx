import { Car, Plane, Map, Bike, Calendar as CalendarIcon } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

const services = [
  {
    icon: Map,
    title: "Tours & Travels",
    description: "Customizable tour packages for exploring Trichy and beyond. Discover temples, historical sites, and local attractions.",
  },
  {
    icon: Car,
    title: "Tempo Traveller Rental",
    description: "Spacious and comfortable Tempo Travellers for group trips and family outings. Travel together with ease.",
  },
  {
    icon: Car,
    title: "Innova & Innova Crysta Rental",
    description: "Premium Innova and Innova Crysta rentals for a luxurious and comfortable travel experience.",
  },
  {
    icon: Car,
    title: "Travels & Holidays",
    description: "Reliable and timely travel services for local rides, airport transfers, and outstation trips. Safe and affordable.",
  },
];

const Services = () => {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="section-padding font-heading">
      <div className="container mx-auto">
        <div className="text-center mb-16 px-4">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="font-bold text-3xl md:text-5xl">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
          {services.map((s) => (
            <div
              key={s.title}
              className="glass-card rounded-2xl p-6 md:p-8 flex flex-col group hover:-translate-y-2 transition-all duration-300 hover:border-primary/30 h-full"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{s.description}</p>
              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-1 transition-transform"
              >
                <CalendarIcon className="w-4 h-4" /> Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
