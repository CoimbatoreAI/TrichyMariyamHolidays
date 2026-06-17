import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    text: "Booked Trichy Mariyam Holidayz for an airport transfer — the driver was punctual, car was spotless, and the ride was incredibly smooth. Highly recommended!",
    rating: 5,
  },
  {
    name: "Ravi Kumar",
    text: "Used their sightseeing package to explore Auroville and the French Quarter. The driver was knowledgeable and friendly. Will definitely book again!",
    rating: 5,
  },
  {
    name: "Anitha Menon",
    text: "Best travel service in Pondicherry! Affordable pricing, clean cars, and the WhatsApp booking made everything so convenient.",
    rating: 5,
  },
];

const Testimonials = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">Reviews</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl">What Our Customers Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reviews.map((r) => (
          <div key={r.name} className="glass-card rounded-2xl p-8">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{r.text}"</p>
            <p className="font-heading font-semibold text-sm">{r.name}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
