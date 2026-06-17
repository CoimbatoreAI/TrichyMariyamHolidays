import { Phone, MessageCircle, MapPin } from "lucide-react";
import { useState } from "react";

const QuickActions = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [adults, setAdults] = useState("");
  const [members, setMembers] = useState("");
  const [tripType, setTripType] = useState("One Way");

  const getQuote = () => {
    const msg = `Hi Trichy Mariyam Holidayz, I need a quote.\nTrip Type: ${tripType}\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date}\nTime: ${time}\nAdults: ${adults}\nMembers/Kids: ${members}`;
    window.open(`https://wa.me/919342084745?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section className="relative z-20 -mt-16 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="glass-card rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <a
            href="tel:9342084745"
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-semibold">Call Now</p>
              <p className="text-sm text-muted-foreground">9342084745</p>
            </div>
          </a>

          <a
            href="https://wa.me/919342084745?text=Hi%20Trichy%20Mariyam%20Holidayz%2C%20I%20want%20to%20book%20a%20cab"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-semibold">WhatsApp Booking</p>
              <p className="text-sm text-muted-foreground">Instant response</p>
            </div>
          </a>

          <div className="flex flex-col gap-3 p-4 rounded-xl bg-secondary">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-primary" />
              <p className="font-heading font-semibold text-sm">Get Instant Quote</p>
            </div>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="One Way">One Way</option>
              <option value="Round Trip">Round Trip</option>
            </select>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Pickup"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Drop"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Members/Kids"
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              onClick={getQuote}
              className="w-full py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
