import { Target, Lightbulb, Users } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">Who We Are</p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl">About Trichy Mariyam Holidayz</h2>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            <strong>Trichy Mariyam Holidayz</strong> is a fast-growing travel agent company based in Trichy, Tamil Nadu. 
            We have an experience of more than 10 years in the travel industry. We provide travel services round the clock 
            24 hours, 365 days a year. Our main aim is to give the best customer service.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We provide you full security for your trip by guiding you about the tourist spots, taking professional and personal care. 
            We offer various tours and travel packages like Educational tours, Wildlife tours, Temple tours, and assist with various 
            travel arrangements for our customers. Our professionals ensure that every customer’s needs and requirements are properly 
            taken care of so they never get disappointed utilizing our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-8 rounded-2xl text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4">What We Serve</h3>
            <p className="text-muted-foreground leading-relaxed">
              We serve every tour to be a memorable one in the customer’s heart and build a good relationship based on mutual trust.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become a leading travel company in Trichy by offering the ultimate source of travel services and solutions.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl text-center group hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              With our honest and hardworking people, our travel agency has gained immense local knowledge of each of our destinations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
