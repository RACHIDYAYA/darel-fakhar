import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import IconScrollPopup from "@/components/IconScrollPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
     
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
