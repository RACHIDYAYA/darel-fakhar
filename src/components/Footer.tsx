import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const PHONE = "0656861536";
  const EMAIL = "rachidyaya790@gmail.com";
  const MAPS_URL = "https://maps.app.goo.gl/KuWzHPoGTSRmFpyY8";
  const FACEBOOK_URL = "https://facebook.com/YourPage";
  const INSTAGRAM_URL = "https://instagram.com/YourPage";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "تعاونية الحسنية",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "sameAs": [FACEBOOK_URL, INSTAGRAM_URL],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": PHONE,
      "contactType": "customer service",
      "email": EMAIL,
      "areaServed": "MA"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Safi",
      "addressCountry": "Morocco"
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <footer className="bg-muted border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-4">
                {t('hero.cooperativeName', { defaultValue: "تعاونية الحسنية" })}
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t('footer.description', { 
                  defaultValue: "Authentic handcrafted pottery made by skilled artisans in Safi, Morocco." 
                })}
              </p>
              <div className="flex space-x-4">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook Page" className="text-muted-foreground hover:text-pottery-gold transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram Page" className="text-muted-foreground hover:text-pottery-gold transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {t('footer.quickLinks', { defaultValue: 'روابط سريعة' })}
              </h4>
              <nav className="flex flex-col space-y-2" aria-label="Quick links">
                <Link to="/" className="text-muted-foreground hover:text-pottery-gold transition-colors">
                  {t('nav.home', { defaultValue: "الرئيسية" })}
                </Link>
                <Link to="/shop" className="text-muted-foreground hover:text-pottery-gold transition-colors">
                  {t('nav.shop', { defaultValue: "المتجر" })}
                </Link>
                <Link to="/blog" className="text-muted-foreground hover:text-pottery-gold transition-colors">
                  {t('nav.blog', { defaultValue: "المدونة" })}
                </Link>
                <Link to="/contact" className="text-muted-foreground hover:text-pottery-gold transition-colors">
                  {t('nav.contact', { defaultValue: "اتصل بنا" })}
                </Link>
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {t('footer.contact', { defaultValue: 'تواصل معنا' })}
              </h4>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="Location on Google Maps" className="text-sm hover:text-pottery-gold">
                    Safi, Morocco
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${PHONE}`} aria-label={`Call ${PHONE}`} className="text-sm hover:text-pottery-gold">
                    {PHONE}
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`} className="text-sm hover:text-pottery-gold">
                    {EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} تعاونية الحسنية. جميع الحقوق محفوظة.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-pottery-gold transition-colors text-sm">
                  {t('footer.privacy', { defaultValue: 'سياسة الخصوصية' })}
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-pottery-gold transition-colors text-sm">
                  {t('footer.terms', { defaultValue: 'شروط الخدمة' })}
                </Link>
                <Link to="/data-deletion" className="text-muted-foreground hover:text-pottery-gold transition-colors text-sm">
                  {t('footer.dataDeletion', { defaultValue: 'حذف البيانات' })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
