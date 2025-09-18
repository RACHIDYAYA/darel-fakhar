import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    image: "/Rachid-uploads/2b978a57-b4a7-4615-9a36-249f4c3025d4.png",
    titleAr: "مجموعة أطباق سيراميك بنقوش تقليدية",
    titleEn: "Traditional Ceramic Plates Collection",
    descriptionAr: "اكتشف أجود أنواع الفخار المغربي الأصيل",
    descriptionEn: "Discover the finest authentic Moroccan pottery",
  },
  {
    id: 2,
    image: "/Rachid-uploads/04547d10-8399-43ea-a3b9-ad8250873915.png",
    titleAr: "أطباق سيراميك بنقوش هندسية ذهبية",
    titleEn: "Ceramic Plates with Golden Geometric Patterns",
    descriptionAr: "تصاميم أصيلة بلمسة عصرية من التعاونية الحسنية",
    descriptionEn: "Authentic designs with modern touch from Hassaniya Cooperative",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-hero">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.titleEn}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pottery-bronze/80 via-pottery-bronze/50 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl text-pottery-cream">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {slide.titleEn}
                  </h1>
                  <h2 className="text-2xl md:text-3xl mb-6 font-medium" dir="rtl">
                    {slide.titleAr}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    {slide.descriptionEn}
                  </p>
                  <Button variant="default" size="lg" className="bg-pottery-gold hover:bg-pottery-gold/90 text-pottery-bronze font-semibold px-8 py-3 shadow-gold">
                    اكتشف المجموعة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-pottery-cream/20 hover:bg-pottery-cream/40 text-pottery-cream backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-pottery-cream/20 hover:bg-pottery-cream/40 text-pottery-cream backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-pottery-gold"
                : "bg-pottery-cream/50 hover:bg-pottery-cream/75"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;