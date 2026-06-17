import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import axios from "axios";

// Fallbacks
import kumbakonamImg from "@/assets/kumbakonam.png";
import chidambaramImg from "@/assets/chidambaram.png";
import velankanniImg from "@/assets/velankanni.png";
import goaImg from "@/assets/goa.png";
import thiruvarurImg from "@/assets/thiruvarur.png";

const fallbackPackages = [
  { image: kumbakonamImg, title: "Trichy Thanjavur Kumbakonam Tour", duration: "3 Days" },
  { image: chidambaramImg, title: "Trichy Thanjavur Chidambaram Tour", duration: "3 Days" },
  { image: velankanniImg, title: "Trichy Thanjavur Velankanni Tour", duration: "3 Days" },
  { image: goaImg, title: "Goa Tour Package", duration: "4 Days" },
  { image: thiruvarurImg, title: "Thanjavur Thiruvarur Tour", duration: "6 Days" },
];

const TourPackages = () => {
  const { openBooking } = useBooking();
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages`);
        setPackages(res.data);
      } catch (err) {
        console.error("Failed to fetch packages");
      }
    };
    fetchPackages();
  }, []);

  const displayPackages = packages.length > 0 ? packages.map(pkg => ({
    title: pkg.title,
    duration: pkg.duration,
    image: `http://localhost:5000${pkg.imageUrl}`
  })) : fallbackPackages;

  return (
    <section id="packages" className="section-padding font-heading bg-secondary/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Explore With Us</p>
          <h2 className="font-bold text-3xl md:text-5xl">Top Tour Packages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayPackages.map((pkg, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                  <div className="flex items-center gap-1 text-sm font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4" />
                    {pkg.duration}
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-4 leading-tight">{pkg.title}</h3>
                
                <div className="mt-auto pt-4 border-t border-border">
                  <button
                    onClick={openBooking}
                    className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground font-semibold py-3 rounded-xl transition-colors duration-300"
                  >
                    <CalendarIcon className="w-5 h-5" />
                    Book This Package
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
