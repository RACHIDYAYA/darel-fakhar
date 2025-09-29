import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useCart } from "@/contexts/CartContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const { getTotalItems } = useCart();
  const { user, hasRole } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top banner */}
      <div className="bg-pottery-bronze text-pottery-cream py-2 text-center text-sm">
        <p>{t('common.bannerText')}</p>
      </div>
      
      {/* Main header */}
      <header className={`border-b border-border sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/80 backdrop-blur-md shadow-elegant' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className={`text-xl md:text-2xl font-bold tracking-wide transition-colors duration-300 ${
                isScrolled 
                  ? 'bg-gradient-gold bg-clip-text text-transparent' 
                  : 'text-white'
              }`}>
                {t('hero.cooperativeName')}
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link to="/" className={`hover:text-pottery-gold transition-colors font-medium ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                {t('nav.home')}
              </Link>
              <Link to="/shop" className={`hover:text-pottery-gold transition-colors font-medium ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                {t('nav.shop')}
              </Link>
              <Link to="/blog" className={`hover:text-pottery-gold transition-colors font-medium ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                {t('nav.blog', { defaultValue: 'Blog' })}
              </Link>
              <Link to="/about" className={`hover:text-pottery-gold transition-colors font-medium ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                {t('nav.about')}
              </Link>
              <Link to="/contact" className={`hover:text-pottery-gold transition-colors font-medium ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                {t('nav.contact')}
              </Link>
              {hasRole('admin') && (
                <Link to="/admin" className={`hover:text-pottery-gold transition-colors font-medium ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  {t('nav.admin')}
                </Link>
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" className={`hover:text-pottery-gold ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className={`hover:text-pottery-gold relative ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pottery-gold text-pottery-gold-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Auth buttons (desktop) */}
              {!user ? (
                <>
                  <Button asChild className="hidden md:inline-flex">
                    <Link to="/login">{t('nav.login', { defaultValue: 'Login' })}</Link>
                  </Button>
                  <Button asChild variant="outline" className="hidden md:inline-flex">
                    <Link to="/register">{t('nav.register', { defaultValue: 'Register' })}</Link>
                  </Button>
                </>
              ) : (
                <Button asChild variant="secondary" className="hidden md:inline-flex">
                  <Link to="/logout">{t('nav.logout', { defaultValue: 'Logout' })}</Link>
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden ${isScrolled ? 'text-foreground' : 'text-white'}`}
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
                <Link to="/" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.home')}
                </Link>
                <Link to="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.shop')}
                </Link>
                <Link to="/blog" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.blog', { defaultValue: 'Blog' })}
                </Link>
                <Link to="/about" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.about')}
                </Link>
                <Link to="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.contact')}
                </Link>
                {hasRole('admin') && (
                  <Link to="/admin" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                    {t('nav.admin')}
                  </Link>
                )}

                {!user ? (
                  <>
                    <Link to="/login" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                      {t('nav.login', { defaultValue: 'Login' })}
                    </Link>
                    <Link to="/register" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                      {t('nav.register', { defaultValue: 'Register' })}
                    </Link>
                  </>
                ) : (
                  <Link to="/logout" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                    {t('nav.logout', { defaultValue: 'Logout' })}
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
