import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Fallbacks
import rockfort from "@/assets/rockfort.png";
import srirangam from "@/assets/srirangam.png";
import mukkombu from "@/assets/mukkombu_dam.png";
import butterflyPark from "@/assets/butterfly_park.png";
import samayapuram from "@/assets/samayapuram.png";
import stLourdes from "@/assets/st_lourdes_church.png";
import thiruvanaikaval from "@/assets/thiruvanaikaval.png";

const fallbackImages = [
  { src: rockfort, alt: "Rockfort Temple", span: "col-span-2 row-span-2" },
  { src: srirangam, alt: "Sri Ranganathaswamy Temple", span: "" },
  { src: samayapuram, alt: "Samayapuram Mariamman Temple", span: "" },
  { src: mukkombu, alt: "Mukkombu Dam", span: "col-span-2" },
  { src: butterflyPark, alt: "Tropical Butterfly Conservatory", span: "" },
  { src: stLourdes, alt: "Our Lady of Lourdes Church", span: "" },
  { src: thiruvanaikaval, alt: "Jambukeswarar Temple", span: "col-span-2" },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/gallery`);
        setImages(res.data);
      } catch (err) {
        console.error("Failed to fetch gallery");
      }
    };
    fetchGallery();
  }, []);

  const displayImages = images.length > 0 ? images.map((img, i) => ({
    src: `http://localhost:5000${img.imageUrl}`,
    alt: img.altText,
    span: i === 0 ? "col-span-2 row-span-2" : i === 3 ? "col-span-2" : i === 6 ? "col-span-2" : ""
  })) : fallbackImages;

  const handlePrevious = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + displayImages.length) % displayImages.length : null));
  }, [displayImages.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % displayImages.length : null));
  }, [displayImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrevious, handleNext]);

  return (
    <section id="gallery" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-3">Gallery</p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl">Snapshots of Our Journey</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {displayImages.map((img, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden group cursor-pointer relative ${img.span}`}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8 transform scale-50 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center overflow-hidden">
            <DialogTitle className="sr-only">Image Gallery Full View</DialogTitle>

            {selectedIndex !== null && (
              <div className="relative w-full h-full flex items-center justify-center group/modal">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-50 text-white bg-black/20 hover:bg-black/40 rounded-full"
                  onClick={() => setSelectedIndex(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-50 text-white bg-black/20 hover:bg-black/40 rounded-full"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={displayImages[selectedIndex].src}
                    alt={displayImages[selectedIndex].alt}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg animate-in zoom-in-95 duration-300"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm opacity-0 group-hover/modal:opacity-100 transition-opacity">
                    {displayImages[selectedIndex].alt} ({selectedIndex + 1} / {displayImages.length})
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-50 text-white bg-black/20 hover:bg-black/40 rounded-full"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Gallery;
