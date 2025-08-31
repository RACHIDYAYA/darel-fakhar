import { useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top banner */}
      <div className="bg-pottery-bronze text-pottery-cream py-2 text-center text-sm">
        <p>هل تحتاج إلى عرض أسعار أو مساعدة؟ اتصل بنا 0616242996 - التوصيل مجاني</p>
      </div>
      
      {/* Main header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-elegant">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                التعاونية الحسنية للفخار
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <a href="/" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                الصفحة الرئيسية
              </a>
              <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                المنتجات
              </a>
              <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                التصنيفات
              </a>
              <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                معرض الصور
              </a>
              <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                اتصل بنا
              </a>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon" className="hover:text-pottery-gold">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-pottery-gold relative">
                <a href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-pottery-gold text-pottery-gold-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </a>
              </Button>
              
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-3">
                <a href="/" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  الصفحة الرئيسية
                </a>
                <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  المنتجات
                </a>
                <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  التصنيفات
                </a>
                <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  معرض الصور
                </a>
                <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  اتصل بنا
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;