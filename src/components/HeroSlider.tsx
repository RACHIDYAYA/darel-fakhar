"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden -mx-[50vw] left-1/2 right-1/2 -mt-[120px] pt-[120px]">
      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1 }}
              >
                {/* Background */}
                <img
                  src={slide.image}
                  alt={slide.titleEn}
                  className="w-full h-full object-cover"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center pt-[120px]">
                  <div className="px-6 md:px-12 w-full max-w-5xl">
                    <motion.div
                      className="max-w-2xl text-white"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg tracking-tight" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('hero.title')}
                      </h1>
                      <h2
                        className="text-3xl md:text-4xl mb-6 font-semibold text-pottery-gold drop-shadow"
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {t('hero.subtitle')}
                      </h2>
                      <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed" dir={isRTL ? 'rtl' : 'ltr'}>
                        {t('aboutPage.lead1')}
                      </p>
                      <Button className="bg-pottery-gold hover:bg-pottery-gold/90 text-pottery-bronze font-bold px-10 py-4 text-lg shadow-lg rounded-full transition-transform hover:scale-105">
                        ✨ {t('hero.cta')}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full shadow-lg backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full shadow-lg backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-7 w-7" />
      </Button>

      {/* Progress indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 w-40">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`h-1 flex-1 rounded-full ${
              index === currentSlide ? "bg-pottery-gold" : "bg-white/40"
            }`}
            initial={{ width: 0 }}
            animate={{ width: index === currentSlide ? "100%" : "100%" }}
            transition={{ duration: 6 }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
