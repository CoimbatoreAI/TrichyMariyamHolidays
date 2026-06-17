import { Snowflake, Users, Calendar as CalendarIcon } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import carSedan from "@/assets/car-sedan.jpg";
import carSuv from "@/assets/car-suv.jpg";

const cars = [
  {
    image: carSedan,
    name: "Sedan",
    models: "Dzire / Etios",
    seats: "4 Passengers",
    tag: "Popular",
  },
  {
    image: carSuv,
    name: "SUV",
    models: "Innova / Ertiga",
    seats: "6-7 Passengers",
    tag: "Family",
  },
];

const Fleet = () => {
  const { openBooking } = useBooking();

  return (
    <section id="fleet" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">Our Vehicles</p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl">Choose Your Ride</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cars.map((car) => (
            <div
              key={car.name}
              className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              {/* ... image div ... */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl mb-1">{car.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{car.models}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" /> {car.seats}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Snowflake className="w-4 h-4 text-primary" /> AC Ride
                  </span>
                </div>
                <button
                  onClick={openBooking}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-heading font-semibold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
