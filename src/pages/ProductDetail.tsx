import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Share2, Star, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { getProductById, categories } = useProducts();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getProductById(parseInt(id));
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-pottery-bronze">جاري التحميل...</div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-pottery-bronze mb-4">المنتج غير موجود</h2>
            <Button onClick={() => navigate('/shop')}>العودة للمتجر</Button>
          </div>
        </main>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["/Rachid-uploads/cf5dc12d-0ea8-437f-9528-9a769ef50c7c.png"];

  const discount = product.sale_price 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  const categoryName = categories.find(cat => cat.id === product.category_id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${quantity} من ${language === 'ar' ? product.name_ar : product.name_en}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
    
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4 relative">
              <img
                src={images[selectedImage]}
                alt={language === 'ar' ? product.name_ar : product.name_en}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-pottery"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-pottery-gold text-pottery-bronze">
                  خصم {discount}%
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index 
                      ? "border-pottery-gold" 
                      : "border-pottery-cream hover:border-pottery-gold/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${language === 'ar' ? product.name_ar : product.name_en} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              {categoryName && (
                <Badge variant="secondary" className="mb-2">
                  {language === 'ar' ? categoryName.name_ar : categoryName.name_en}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-pottery-bronze mb-2">
                {language === 'ar' ? product.name_ar : product.name_en}
              </h1>
              {language === 'en' && (
                <h2 className="text-xl text-pottery-bronze/80 mb-4" dir="rtl">
                  {product.name_ar}
                </h2>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-pottery-gold">
                  {product.sale_price || product.price} درهم
                </span>
                {product.sale_price && (
                  <span className="text-lg text-pottery-bronze/50 line-through">
                    {product.price} درهم
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    متوفر في المخزون ({product.stock} قطعة)
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    غير متوفر حالياً
                  </Badge>
                )}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <label className="text-pottery-bronze font-medium">الكمية:</label>
                <div className="flex items-center border border-pottery-cream rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-pottery-bronze hover:text-pottery-gold"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-pottery-bronze font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-pottery-bronze hover:text-pottery-gold"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Button 
                  size="lg" 
                  className="flex-1 bg-pottery-gold hover:bg-pottery-gold/90 text-pottery-bronze"
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  أضف إلى السلة
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`border-pottery-gold ${
                    isWishlisted 
                      ? "bg-pottery-gold text-pottery-bronze" 
                      : "text-pottery-gold hover:bg-pottery-gold hover:text-pottery-bronze"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-pottery-gold text-pottery-gold hover:bg-pottery-gold hover:text-pottery-bronze"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Product Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-pottery-bronze mb-4">وصف المنتج</h3>
              {product.description_ar && (
                <p className="text-pottery-bronze/80 mb-4" dir="rtl">
                  {product.description_ar}
                </p>
              )}
              {product.description_en && language === 'en' && (
                <p className="text-pottery-bronze/60">
                  {product.description_en}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;