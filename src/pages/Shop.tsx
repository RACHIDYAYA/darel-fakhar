import { useState } from "react";
import { Filter, Grid, List } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const allProducts = [
  {
    id: 1,
    image: "/Rachid-uploads/cf5dc12d-0ea8-437f-9528-9a769ef50c7c.png",
    titleAr: "مجموعة أطقم شاي سيراميك ملونة",
    titleEn: "Colorful Ceramic Tea Sets Collection",
    originalPrice: 350,
    salePrice: 280,
    category: "tea-sets",
    isNew: true,
  },
  {
    id: 2,
    image: "/Rachid-uploads/07d084e1-0d0a-40b6-a3df-8c0f3f506742.png",
    titleAr: "طاجين مغربي أصيل بنقوش تقليدية",
    titleEn: "Authentic Moroccan Tagine with Traditional Patterns",
    originalPrice: 420,
    salePrice: 350,
    category: "tagines",
    isNew: false,
  },
  {
    id: 3,
    image: "/Rachid-uploads/d061038e-6ee9-4908-8585-96e1e304dccc.png",
    titleAr: "مزهرية فخار مُخرمة بنقوش هندسية",
    titleEn: "Perforated Ceramic Vase with Geometric Patterns",
    originalPrice: 280,
    salePrice: 220,
    category: "vases",
    isNew: true,
  },
  {
    id: 4,
    image: "/Rachid-uploads/a5c483cd-09bd-41ae-ba2f-fbe266fd0ad1.png",
    titleAr: "مجموعة جرار سيراميك ملونة",
    titleEn: "Colorful Ceramic Jars Collection",
    originalPrice: 200,
    salePrice: 160,
    category: "jars",
    isNew: false,
  },
  {
    id: 5,
    image: "/Rachid-uploads/2b978a57-b4a7-4615-9a36-249f4c3025d4.png",
    titleAr: "أطباق سيراميك بنقوش تقليدية",
    titleEn: "Traditional Ceramic Plates",
    originalPrice: 180,
    salePrice: 150,
    category: "plates",
    isNew: true,
  },
  {
    id: 6,
    image: "/Rachid-uploads/04547d10-8399-43ea-a3b9-ad8250873915.png",
    titleAr: "أطباق سيراميك بنقوش ذهبية",
    titleEn: "Ceramic Plates with Golden Patterns",
    originalPrice: 320,
    salePrice: 280,
    category: "plates",
    isNew: false,
  },
];

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [priceRange, setPriceRange] = useState([100, 500]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    { value: "all", labelAr: "جميع المنتجات", labelEn: "All Products" },
    { value: "tea-sets", labelAr: "أطقم الشاي", labelEn: "Tea Sets" },
    { value: "tagines", labelAr: "طواجن", labelEn: "Tagines" },
    { value: "vases", labelAr: "مزهريات", labelEn: "Vases" },
    { value: "jars", labelAr: "جرار", labelEn: "Jars" },
    { value: "plates", labelAr: "أطباق", labelEn: "Plates" },
  ];

  const applyFilters = () => {
    let filtered = allProducts;

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.originalPrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.isNew ? 1 : -1;
        case "price-low":
          return (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice);
        case "price-high":
          return (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  useState(() => {
    applyFilters();
  });

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
                  {categories.map(category => (
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
            عرض {filteredProducts.length} من أصل {allProducts.length} منتج
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