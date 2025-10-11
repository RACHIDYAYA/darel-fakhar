import { useState, useEffect } from "react";
import { Filter, Grid, List } from "lucide-react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "react-i18next";
import SEOHead from "@/components/SEOHead";
import { createBreadcrumbSchema } from "@/utils/structuredData";
import { formatPriceRange } from "@/utils/priceFormat";

const Shop = () => {
  const { products, categories, loading } = useProducts();
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [priceRange, setPriceRange] = useState([4, 500]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const breadcrumbData = createBreadcrumbSchema([
    { name: "Home", url: "https://www.alhassaniya.com/" },
    { name: "Shop", url: "https://www.alhassaniya.com/shop" }
  ]);

  const categoryOptions = [
    { value: "all", labelAr: t('common.allProducts'), labelEn: t('common.allProducts') },
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
      stock: product.stock,
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
            <div className="text-pottery-bronze">{t('common.loadingProducts')}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Shop Moroccan Pottery | دار الفخار - Dar El Fakhar"
        description={`Browse ${products.length}+ authentic Moroccan pottery items. Handcrafted ceramics, tagines, cups, and decorative pieces from Safi artisans. Free shipping on orders over 500 MAD.`}
        keywords="buy moroccan pottery, shop ceramics online, tagine sale, pottery shop, فخار للبيع, Safi pottery"
        url="https://www.alhassaniya.com/shop"
        structuredData={breadcrumbData}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pottery-bronze mb-2">{t('shop.title')}</h1>
          <p className="text-pottery-bronze/80">{t('shop.description')}</p>
        </div>

        {/* Filters */}
        <div className="bg-pottery-cream/30 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-pottery-bronze mb-2">
                {t('common.category')}
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t('common.selectCategory')} />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {language === 'ar' ? category.labelAr : category.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-pottery-bronze mb-2">
                {t('common.priceRange')}: {formatPriceRange(priceRange[0], priceRange[1], language)}
              </label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={4}
                step={10}
                className="w-full"
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-pottery-bronze mb-2">
                {t('common.sortBy')}
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t('common.newest')}</SelectItem>
                  <SelectItem value="price-low">{t('common.priceLow')}</SelectItem>
                  <SelectItem value="price-high">{t('common.priceHigh')}</SelectItem>
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
                {t('common.applyFilters')}
              </Button>
            </div>
          </div>
        </div>

        {/* View Mode & Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-pottery-bronze">
            {t('common.showingProducts', { count: filteredProducts.length, total: products.length }).replace('{count}', filteredProducts.length.toString()).replace('{total}', products.length.toString())}
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
              {t('common.noProducts')}
            </p>
            <Button onClick={() => {
              setSelectedCategory("all");
              setPriceRange([4, 500]);
              setSortBy("newest");
              applyFilters();
            }}>
              {t('common.resetFilters')}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;