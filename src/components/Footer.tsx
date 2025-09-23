import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Hammer, ShoppingBag, MapPin, ShoppingCart, Home, Info, Boxes, Phone, Facebook, Instagram, MessageCircle, Mail } from "lucide-react";

const RAW_PHONE = "0656861536";
const EMAIL = "rachidyaya790@gmail.com";
const MAPS_URL = "https://maps.app.goo.gl/KuWzHPoGTSRmFpyY8";

function normalizeMA(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `212${digits.slice(1)}`;
  return digits;
}

const Footer = () => {
  const { t } = useTranslation();

  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL as string | undefined;
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL as string | undefined;

  const whatsappNumber = normalizeMA(RAW_PHONE);
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold">{t('footer.title')}</h3>
          {/* description removed per request for a cleaner footer */}
        </div>

        <div>
          <h4 className="text-lg font-semibold">{t('footer.relatedLinks')}</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/blog" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Hammer className="h-4 w-4" />
                <span>{t('footer.keywords.craft')}</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <ShoppingBag className="h-4 w-4" />
                <span>{t('footer.keywords.sell')}</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <MapPin className="h-4 w-4" />
                <span>{t('footer.keywords.safi')}</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>{t('footer.keywords.online')}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">{t('footer.quickLinks')}</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Home className="h-4 w-4" />
                <span>{t('footer.links.home')}</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Info className="h-4 w-4" />
                <span>{t('footer.links.about')}</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Boxes className="h-4 w-4" />
                <span>{t('footer.links.products')}</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Phone className="h-4 w-4" />
                <span>{t('footer.links.contact')}</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">{t('footer.contactUs')}</h4>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:text-pottery-gold">
                <Facebook className="h-5 w-5" />
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:text-pottery-gold">
                <Instagram className="h-5 w-5" />
              </a>
            )}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:text-pottery-gold">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href={`tel:${RAW_PHONE}`} className="inline-flex h-9 px-3 items-center gap-2 rounded-full border border-border hover:text-pottery-gold">
              <Phone className="h-4 w-4" />
              <span className="text-sm">{RAW_PHONE}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="inline-flex h-9 px-3 items-center gap-2 rounded-full border border-border hover:text-pottery-gold">
              <Mail className="h-4 w-4" />
              <span className="text-sm">{EMAIL}</span>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 px-3 items-center gap-2 rounded-full border border-border hover:text-pottery-gold">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
