import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    image: product1,
    titleAr: "إبريق شاي سيراميك بنقوش ذهبية",
    titleEn: "Ceramic Teapot with Gold Patterns",
    originalPrice: 250,
    salePrice: 180,
  },
  {
    id: 2,
    image: product2,
    titleAr: "مجموعة أطباق سيراميك بحافة ذهبية",
    titleEn: "Ceramic Bowl Set with Gold Rim",
    originalPrice: 220,
    salePrice: 170,
  },
  {
    id: 3,
    image: product3,
    titleAr: "طاجين مغربي تقليدي منقوش",
    titleEn: "Traditional Moroccan Engraved Tagine",
    originalPrice: 300,
    salePrice: 240,
  },
  {
    id: 4,
    image: product4,
    titleAr: "مجموعة أكواب بخيوط ذهبية",
    titleEn: "Mug Collection with Gold Thread",
    originalPrice: 180,
    salePrice: 140,
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