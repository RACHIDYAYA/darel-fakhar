import { useState } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useCart } from "@/contexts/CartContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { getTotalItems } = useCart();
  const { user, hasRole } = useAuth();

  return (
    <>
      {/* Top banner */}
      <div className="bg-pottery-bronze text-pottery-cream py-2 text-center text-sm">
        <p>{t('common.bannerText')}</p>
      </div>
      
      {/* Main header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 shadow-elegant">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent tracking-wide">
                {t('hero.cooperativeName')}
              </h1>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <a href="/" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                {t('nav.home')}
              </a>
              <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                {t('nav.shop')}
              </a>
              <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                {t('nav.categories')}
              </a>
              <a href="/blog" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                {t('nav.blog', { defaultValue: 'Blog' })}
              </a>
              <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                {t('nav.gallery')}
              </a>
              <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                {t('nav.contact')}
              </a>
              {hasRole('admin') && (
                <a href="/admin" className="text-foreground hover:text-pottery-gold transition-colors font-medium">
                  {t('nav.admin')}
                </a>
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageSwitcher />
              <Button variant="ghost" size="icon" className="hover:text-pottery-gold">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-pottery-gold relative">
                <a href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pottery-gold text-pottery-gold-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </a>
              </Button>

              {/* Auth buttons (desktop) */}
              {!user ? (
                <>
                  <Button asChild className="hidden md:inline-flex">
                    <a href="/login">{t('nav.login', { defaultValue: 'Login' })}</a>
                  </Button>
                  <Button asChild variant="outline" className="hidden md:inline-flex">
                    <a href="/register">{t('nav.register', { defaultValue: 'Register' })}</a>
                  </Button>
                </>
              ) : (
                <Button asChild variant="secondary" className="hidden md:inline-flex">
                  <a href="/logout">{t('nav.logout', { defaultValue: 'Logout' })}</a>
                </Button>
              )}

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
                  {t('nav.home')}
                </a>
                <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.shop')}
                </a>
                <a href="/shop" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.categories')}
                </a>
                <a href="/blog" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.blog', { defaultValue: 'Blog' })}
                </a>
                <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.gallery')}
                </a>
                <a href="/contact" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                  {t('nav.contact')}
                </a>
                {hasRole('admin') && (
                  <a href="/admin" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                    {t('nav.admin')}
                  </a>
                )}

                {!user ? (
                  <>
                    <a href="/login" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                      {t('nav.login', { defaultValue: 'Login' })}
                    </a>
                    <a href="/register" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                      {t('nav.register', { defaultValue: 'Register' })}
                    </a>
                  </>
                ) : (
                  <a href="/logout" className="text-foreground hover:text-pottery-gold transition-colors font-medium py-2">
                    {t('nav.logout', { defaultValue: 'Logout' })}
                  </a>
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
