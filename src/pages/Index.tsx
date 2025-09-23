import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
