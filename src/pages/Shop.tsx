import { useState, useEffect } from "react";
import { Filter, Grid, List } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";

const Shop = () => {
  const { products, categories, loading } = useProducts();
  const { language } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const categoryOptions = [
    { value: "all", labelAr: "جميع المنتجات", labelEn: "All Products" },
    ...categories.map(cat => ({
      value: cat.slug || cat.id.toString(),
      labelAr: cat.name_ar,
      labelEn: cat.name_en || cat.name_ar
    }))
  ];

  const transformProducts = (products: any[]) => {
    return products.map((product) => ({
      id: product.id,
      image: product.images && product.images.length > 0 ? product.images[0] : "/Rachid-uploads/cf5dc12d-0ea8-437f-9528-9a769ef50c7c.png",
      titleAr: product.name_ar,
      titleEn: product.name_en,
      originalPrice: product.price,
      salePrice: product.sale_price || product.price,
      category: product.category_id?.toString() || "general",
      isNew: new Date(product.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Products created in last 7 days
    }));
  };

  const applyFilters = () => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => 
        product.category_id?.toString() === selectedCategory
      );
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.sale_price || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "price-low":
          return (a.sale_price || a.price) - (b.sale_price || b.price);
        case "price-high":
          return (b.sale_price || b.price) - (a.sale_price || a.price);
        default:
          return 0;
      }
    });

    setFilteredProducts(transformProducts(filtered));
  };

  useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [products, selectedCategory, priceRange, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-pottery-bronze">جاري تحميل المنتجات...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
  
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pottery-bronze mb-2">متجر الفخار</h1>
          <p className="text-pottery-bronze/80">اكتشف مجموعتنا الكاملة من الفخار المغربي الأصيل</p>
        </div>

        {/* Filters */}
        <div className="bg-pottery-cream/30 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-pottery-bronze mb-2">
                التصنيف
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.labelAr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-pottery-bronze mb-2">
                السعر: {priceRange[0]} - {priceRange[1]} درهم
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={100}
                step={10}
                className="w-full"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-pottery-bronze mb-2">
                ترتيب حسب
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">الأحدث</SelectItem>
                  <SelectItem value="price-low">السعر: الأقل إلى الأعلى</SelectItem>
                  <SelectItem value="price-high">السعر: الأعلى إلى الأقل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Filters */}
            <div className="flex items-end">
              <Button 
                onClick={applyFilters}
                className="w-full bg-pottery-gold text-pottery-bronze hover:bg-pottery-gold/90"
              >
                <Filter className="w-4 h-4 mr-2" />
                تطبيق الفلاتر
              </Button>
            </div>
          </div>
        </div>

        {/* View Mode & Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-pottery-bronze">
            عرض {filteredProducts.length} من أصل {products.length} منتج
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Empty State */}




        {filteredProducts.length === 0 && (
          <div className="text-center py-16  ">
            <p className="text-pottery-bronze/60 text-lg grid gap-6 grid-cols-1 md:grid-cols-3">
              لا توجد منتجات تطابق المعايير المحددة
            </p>
            <Button onClick={() => {
              setSelectedCategory("all");
              setPriceRange([100, 500]);
              setSortBy("newest");
              applyFilters();
            }}>
              إعادة تعيين الفلاتر
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;