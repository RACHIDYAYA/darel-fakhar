import { useState, useEffect } from "react";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useCart } from "@/contexts/CartContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showBanner, setShowBanner] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { t } = useTranslation();
  const { getTotalItems } = useCart();
  const { user, hasRole } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle touch events for swipe gesture
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;
    const isUpSwipe = distance > minSwipeDistance;
    
    // Swipe down to open menu, swipe up to close
    if (isDownSwipe && !isMenuOpen) {
      setIsMenuOpen(true);
    } else if (isUpSwipe && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Close mobile menu on scroll
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      if (isHomePage) {
        const currentScrollY = window.scrollY;
        const heroHeight = window.innerHeight - 100;
        
        // Hide banner when scrolling
        setShowBanner(currentScrollY < 10);
        
        // Check if scrolling up
        const isScrollingUp = currentScrollY < lastScrollY;
        
        // Only show background when scrolling down and past hero
        if (!isScrollingUp && currentScrollY > heroHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        
        setLastScrollY(currentScrollY);
      }
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(false);
      setShowBanner(true);
    }
  }, [isHomePage, lastScrollY, isMenuOpen]);

  return (
    <>
      {/* Top banner - with smooth hide/show */}
      <div className={`bg-pottery-gold text-pottery-gold-foreground text-center text-sm font-semibold shadow-md relative z-[60] transition-all duration-500 overflow-hidden ${
        showBanner ? 'py-3 opacity-100' : 'py-0 opacity-0 h-0'
      }`}>
        <p className={`transition-all duration-500 ${showBanner ? 'translate-y-0' : '-translate-y-full'}`}>
          {t('common.bannerText')}
        </p>
      </div>


      {/* Main header - Navbar with larger logo */}
      <header 
        className={`border-b sticky top-0 z-50 transition-all duration-500 ease-in-out -mt-3 ${
          !showBanner 
            ? 'bg-card shadow-elegant border-border'
            : (isHomePage ? (
                isScrolled 
                  ? 'bg-card/95 backdrop-blur-md shadow-elegant border-border' 
                  : 'bg-transparent border-transparent'
              ) : 'bg-card shadow-elegant border-border')
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
           {/* Logo - Larger size */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
                <img
                  src="https://www.alhassaniya.com/logo.png"
                  alt="Coopérative Al-Hassania"
                  className="h-16 md:h-20 lg:h-24 w-auto transition-all duration-500 drop-shadow-lg"
                />
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <Link to="/" className={`hover:text-pottery-gold transition-all duration-300 font-semibold ${
                !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
              }`}>
                {t('nav.home')}
              </Link>
              <Link to="/shop" className={`hover:text-pottery-gold transition-all duration-300 font-semibold ${
                !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
              }`}>
                {t('nav.shop')}
              </Link>
              <Link to="/blog" className={`hover:text-pottery-gold transition-all duration-300 font-semibold ${
                !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
              }`}>
                {t('nav.blog', { defaultValue: 'Blog' })}
              </Link>
              <Link to="/about" className={`hover:text-pottery-gold transition-all duration-300 font-semibold ${
                !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
              }`}>
                {t('nav.about')}
              </Link>
              <Link to="/contact" className={`hover:text-pottery-gold transition-all duration-300 font-semibold ${
                !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
              }`}>
                {t('nav.contact')}
              </Link>
              {hasRole('admin') && (
                <Link to="/admin" className={`hover:text-pottery-gold transition-all duration-300 font-semibold ${
                  !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
                }`}>
                  {t('nav.admin')}
                </Link>
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className={`px-3 py-1.5 rounded-full border transition-all duration-300 ${
                !showBanner ? 'bg-pottery-gold/20 backdrop-blur-sm border-pottery-gold/30' : 
                (isHomePage ? (isScrolled ? 'bg-pottery-gold/20 backdrop-blur-sm border-pottery-gold/30' : 'bg-black/40 backdrop-blur-md border-white/30') : 'bg-pottery-gold/20 backdrop-blur-sm border-pottery-gold/30')
              } ${
                !showBanner ? '' : (isHomePage ? (isScrolled ? '' : '[&_button]:text-white [&_button]:drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : '')
              }`}>
                <LanguageSwitcher />
              </div>
              <Button variant="ghost" size="icon" className={`hover:text-pottery-gold transition-all duration-300 ${
                !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
              }`}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className={`hover:text-pottery-gold relative transition-all duration-300 ${
                !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
              }`}>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pottery-gold text-pottery-gold-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </Button>

              {/* Auth buttons (desktop) */}
              {!user ? (
                <>
                  <Button asChild className="hidden md:inline-flex transition-all duration-300 hover:scale-105">
                    <Link to="/login">{t('nav.login', { defaultValue: 'Login' })}</Link>
                  </Button>
                  <Button asChild variant="outline" className="hidden md:inline-flex transition-all duration-300 hover:scale-105">
                    <Link to="/register">{t('nav.register', { defaultValue: 'Register' })}</Link>
                  </Button>
                </>
              ) : (
                <Button asChild variant="secondary" className="hidden md:inline-flex transition-all duration-300 hover:scale-105">
                  <Link to="/logout">{t('nav.logout', { defaultValue: 'Logout' })}</Link>
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden transition-all duration-300 ${
                  !showBanner ? 'text-foreground' : (isHomePage ? (isScrolled ? 'text-foreground' : 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]') : 'text-foreground')
                }`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div 
              className="md:hidden py-4 border-t border-pottery-gold/30 bg-gradient-to-b from-pottery-gold/10 to-transparent animate-in slide-in-from-top duration-300"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <nav className="flex flex-col space-y-3">
                <Link to="/" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                  {t('nav.home')}
                </Link>
                <Link to="/shop" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                  {t('nav.shop')}
                </Link>
                <Link to="/blog" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                  {t('nav.blog', { defaultValue: 'Blog' })}
                </Link>
                <Link to="/about" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                  {t('nav.about')}
                </Link>
                <Link to="/contact" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                  {t('nav.contact')}
                </Link>
                {hasRole('admin') && (
                  <Link to="/admin" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                    {t('nav.admin')}
                  </Link>
                )}

                <div className="border-t border-pottery-gold/30 pt-3 mt-2">
                  {!user ? (
                    <>
                      <Link to="/login" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 block hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                        {t('nav.login', { defaultValue: 'Login' })}
                      </Link>
                      <Link to="/register" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 block hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                        {t('nav.register', { defaultValue: 'Register' })}
                      </Link>
                    </>
                  ) : (
                    <Link to="/logout" className="text-pottery-gold hover:text-pottery-bronze transition-all duration-300 font-medium py-2 block hover:translate-x-1 rtl:hover:-translate-x-1 hover:bg-pottery-gold/10 px-3 rounded-md">
                      {t('nav.logout', { defaultValue: 'Logout' })}
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;