import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  image: string;
  titleAr: string;
  titleEn: string;
  originalPrice?: number;
  salePrice: number;
  currency?: string;
}

const ProductCard = ({
  image,
  titleAr,
  titleEn,
  originalPrice,
  salePrice,
  currency = "درهم مغربي"
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card border-pottery-cream/20 shadow-elegant hover:shadow-pottery transition-all duration-300 hover:scale-105">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={titleEn}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pottery-bronze/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-pottery-cream/90 hover:bg-pottery-cream text-pottery-bronze opacity-0 group-hover:opacity-100 transition-all duration-300"
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
                {originalPrice} {currency}
              </span>
            )}
            <span className="text-lg font-bold text-pottery-gold">
              {salePrice} {currency}
            </span>
          </div>

          <Button 
            className="w-full bg-pottery-gold hover:bg-pottery-gold/90 text-pottery-bronze font-semibold shadow-gold"
            size="sm"
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