import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    image: "/lovable-uploads/cf5dc12d-0ea8-437f-9528-9a769ef50c7c.png",
    titleAr: "مجموعة أطقم شاي سيراميك ملونة",
    titleEn: "Colorful Ceramic Tea Sets Collection",
    originalPrice: 350,
    salePrice: 280,
  },
  {
    id: 2,
    image: "/lovable-uploads/07d084e1-0d0a-40b6-a3df-8c0f3f506742.png",
    titleAr: "طاجين مغربي أصيل بنقوش تقليدية",
    titleEn: "Authentic Moroccan Tagine with Traditional Patterns",
    originalPrice: 420,
    salePrice: 350,
  },
  {
    id: 3,
    image: "/lovable-uploads/d061038e-6ee9-4908-8585-96e1e304dccc.png",
    titleAr: "مزهرية فخار مُخرمة بنقوش هندسية",
    titleEn: "Perforated Ceramic Vase with Geometric Patterns",
    originalPrice: 280,
    salePrice: 220,
  },
  {
    id: 4,
    image: "/lovable-uploads/a5c483cd-09bd-41ae-ba2f-fbe266fd0ad1.png",
    titleAr: "مجموعة جرار سيراميك ملونة",
    titleEn: "Colorful Ceramic Jars Collection",
    originalPrice: 200,
    salePrice: 160,
  },
];

const ProductGrid = () => {
  return (
    <section className="py-16 bg-pottery-cream/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-pottery-bronze mb-2">
              NOUVEAUTÉS
            </h2>
            <h3 className="text-xl text-pottery-bronze/80" dir="rtl">
              أحدث المنتجات
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-pottery-bronze hover:text-pottery-gold">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-pottery-bronze hover:text-pottery-gold">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-pottery-gold text-pottery-gold hover:bg-pottery-gold hover:text-pottery-bronze px-8"
          >
            عرض جميع المنتجات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;