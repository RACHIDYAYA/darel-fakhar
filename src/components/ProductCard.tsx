import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { formatPrice } from "@/utils/priceFormat";

interface ProductCardProps {
  id: number;
  image: string;
  titleAr: string;
  titleEn: string;
  originalPrice?: number;
  salePrice: number;
  stock?: number;
}

const ProductCard = ({
  id,
  image,
  titleAr,
  titleEn,
  originalPrice,
  salePrice,
  stock = 10
}: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { currency, convertPrice } = useCurrency();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const product = {
      id,
      name_ar: titleAr,
      name_en: titleEn,
      name_fr: titleEn, // Using English as fallback for French
      description_ar: titleAr,
      description_en: titleEn,
      description_fr: titleEn,
      price: salePrice,
      sale_price: originalPrice,
      category: "pottery", // Default category
      images: [image],
      stock: stock,
      is_active: true,
      is_featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    addItem(product, 1);
    
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${titleAr} إلى سلة التسوق`,
    });
    
    // Navigate to cart after a short delay
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };
  return (
    <Card className="group overflow-hidden bg-gradient-card border-pottery-cream/20 shadow-elegant hover:shadow-pottery transition-all duration-300 hover:scale-105">
      <a href={`/product/${id}`} aria-label={`View ${titleEn} product details`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={`${titleEn} - Traditional Moroccan pottery from Dar El Fakhar`}
            width="400"
            height="400"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pottery-bronze/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-pottery-cream/90 hover:bg-pottery-cream text-pottery-bronze opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Sale badge */}
          {originalPrice && originalPrice > salePrice && (
            <div className="absolute top-3 left-3 bg-pottery-gold text-pottery-bronze px-2 py-1 rounded-md text-sm font-semibold">
              خصم
            </div>
          )}
        </div>
      </a>
      
      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="font-semibold text-pottery-bronze mb-1 group-hover:text-pottery-gold transition-colors">
            {titleEn}
          </h3>
          <h4 className="text-sm text-muted-foreground mb-3" dir="rtl">
            {titleAr}
          </h4>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            {originalPrice && originalPrice > salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(convertPrice(originalPrice), language, currency)}
              </span>
            )}
            <span className="text-lg font-bold text-pottery-gold">
              {formatPrice(convertPrice(salePrice), language, currency)}
            </span>
          </div>

          <Button 
            className="w-full bg-pottery-gold hover:bg-pottery-gold/90 text-pottery-bronze font-semibold shadow-gold"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            اشتري الآن
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;