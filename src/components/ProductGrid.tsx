import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const ProductGrid = () => {
  const { products, getFeaturedProducts, loading } = useProducts();
  const { language } = useLanguage();
  
  const featuredProducts = getFeaturedProducts().slice(0, 4); // Show only 4 featured products

  // Transform Supabase products to ProductCard format
  const transformedProducts = featuredProducts.map((product) => ({
    id: product.id,
    image: product.images && product.images.length > 0 ? product.images[0] : "/Rachid-uploads/cf5dc12d-0ea8-437f-9528-9a769ef50c7c.png",
    titleAr: product.name_ar,
    titleEn: product.name_en,
    originalPrice: product.price,
    salePrice: product.sale_price || product.price,
  }));

  if (loading) {
    return (
      <section className="py-16 bg-pottery-cream/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-pottery-bronze">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-pottery-cream/30">
      <div className="container mx-auto px-3">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-pottery-bronze mb-2">
              {language === 'ar' ? 'المنتجات المميزة' : language === 'fr' ? 'NOUVEAUTÉS' : 'FEATURED PRODUCTS'}
            </h2>
            <h3 className="text-xl text-pottery-bronze/80" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 'أحدث المنتجات' : language === 'fr' ? 'Nos derniers produits' : 'Our latest products'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          
          {transformedProducts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-pottery-bronze/60">
                {language === 'ar' ? 'لا توجد منتجات مميزة حاليا' : language === 'fr' ? 'Aucun produit en vedette pour le moment' : 'No featured products available at the moment'}
              </p>
            </div>
          )}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-pottery-gold text-pottery-gold hover:bg-pottery-gold hover:text-pottery-bronze px-8"
          >
            {language === 'ar' ? 'عرض جميع المنتجات' : language === 'fr' ? 'Voir tous les produits' : 'View all products'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;