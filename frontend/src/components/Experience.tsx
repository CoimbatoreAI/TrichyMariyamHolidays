import experienceImg from "@/assets/trichy_scenic.png";

const Experience = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden group">
          <img
            src={experienceImg}
            alt="Trichy scenic view"
            className="w-full h-80 lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
            width={1024}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        </div>
        <div>
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">Why Trichy Mariyam Holidayz</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6 leading-tight">
            Experience the Beauty of Trichy
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-8">
            From historic temples to vibrant streets, we make every journey smooth and enjoyable. With Trichy Mariyam Holidayz, you get
            more than just a ride — you get a premium travel experience crafted for comfort, safety, and reliability.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "5000+", label: "Happy Customers" },
              { num: "50+", label: "Vehicles" },
              { num: "24/7", label: "Support" },
              { num: "10+", label: "Years Experience" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                <p className="font-heading font-bold text-2xl text-primary">{s.num}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
