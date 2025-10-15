import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import IconScrollPopup from "@/components/IconScrollPopup";
import SEOHead from "@/components/SEOHead";
import { organizationSchema, websiteSchema } from "@/utils/structuredData";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, websiteSchema]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="دار الفخار - Dar El Fakhar | Authentic Moroccan Pottery & Ceramics"
        description="Discover authentic handcrafted Moroccan pottery from التعاونية الحسنية. Traditional ceramics with gold accents, tagines, cups, and decorative pieces. Shop now!"
        keywords="Moroccan pottery, فخار مغربي, Safi ceramics, traditional pottery, handcrafted ceramics, tagine, dar el fakhar, hassaniya cooperative, artisan pottery Morocco, buy Moroccan pottery online, handmade ceramics, moroccan handicrafts, pottery studio Safi"
        structuredData={structuredData}
      />
      <main>
        <HeroSlider />
        
        {/* Icon Popup Demo */}
        <div className="container mx-auto py-8 flex justify-center">
          <IconScrollPopup />
        </div>
        
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;
