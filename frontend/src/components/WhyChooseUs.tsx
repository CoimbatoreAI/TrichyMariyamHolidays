import { Clock, ShieldCheck, Sparkles, IndianRupee, Headphones } from "lucide-react";

const items = [
  { icon: Clock, title: "On-Time Pickup", desc: "We value your time — always punctual" },
  { icon: ShieldCheck, title: "Experienced Drivers", desc: "Trained, verified & professional" },
  { icon: Sparkles, title: "Clean & Sanitized", desc: "Spotless vehicles every trip" },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "Transparent fares, no hidden charges" },
  { icon: Headphones, title: "24/7 Support", desc: "Round the clock assistance" },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-secondary/30">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">Our Promise</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl">Why Choose Trichy Mariyam Holidayz</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="glass-card rounded-2xl p-6 text-center group hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
