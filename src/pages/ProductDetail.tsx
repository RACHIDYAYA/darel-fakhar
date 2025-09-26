import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Share2, Star, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const productData = {
  1: {
    id: 1,
    images: [
      "/Rachid-uploads/cf5dc12d-0ea8-437f-9528-9a769ef50c7c.png",
      "/Rachid-uploads/2b978a57-b4a7-4615-9a36-249f4c3025d4.png",
      "/Rachid-uploads/04547d10-8399-43ea-a3b9-ad8250873915.png",
    ],
    titleAr: "مجموعة أطقم شاي سيراميك ملونة",
    titleEn: "Colorful Ceramic Tea Sets Collection",
    originalPrice: 350,
    salePrice: 280,
    descriptionAr: "مجموعة رائعة من أطقم الشاي السيراميك المصنوعة يدوياً بأجود المواد الطبيعية. تتميز بألوانها الزاهية ونقوشها التقليدية المغربية الأصيلة. مناسبة لجميع المناسبات والاستقبالات.",
    descriptionEn: "Exquisite collection of handcrafted ceramic tea sets made from the finest natural materials. Features vibrant colors and authentic Moroccan traditional patterns. Perfect for all occasions and receptions.",
    specifications: {
      material: "سيراميك طبيعي",
      size: "طقم من 6 قطع",
      origin: "صناعة مغربية يدوية",
      care: "يُنظف بالماء الدافئ والصابون",
    },
    rating: 4.8,
    reviews: 24,
    inStock: true,
    category: "أطقم الشاي",
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = productData[parseInt(id as string) || 1] || productData[1];

  const discount = product.salePrice 
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
    
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.titleEn}
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
              {product.images.map((image, index) => (
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
                    alt={`${product.titleEn} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-pottery-bronze mb-2">
                {product.titleEn}
              </h1>
              <h2 className="text-xl text-pottery-bronze/80 mb-4" dir="rtl">
                {product.titleAr}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-pottery-gold text-pottery-gold"
                          : "text-pottery-cream"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-pottery-bronze/60">
                  {product.rating} ({product.reviews} تقييم)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-pottery-gold">
                  {product.salePrice || product.originalPrice} درهم
                </span>
                {product.salePrice && (
                  <span className="text-lg text-pottery-bronze/50 line-through">
                    {product.originalPrice} درهم
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    متوفر في المخزون
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
                  disabled={!product.inStock}
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
              <p className="text-pottery-bronze/80 mb-4" dir="rtl">
                {product.descriptionAr}
              </p>
              <p className="text-pottery-bronze/60">
                {product.descriptionEn}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xl font-bold text-pottery-bronze mb-4">المواصفات</h3>
              <div className="space-y-2">
                 {Object.entries(product.specifications).map(([key, value]) => (
                   <div key={key} className="flex justify-between py-2 border-b border-pottery-cream/50">
                     <span className="text-pottery-bronze/60 capitalize">{key}:</span>
                     <span className="text-pottery-bronze font-medium">{String(value)}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;