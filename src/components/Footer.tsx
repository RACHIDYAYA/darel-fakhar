import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Hammer, ShoppingBag, MapPin, ShoppingCart, Home, Info, Boxes, Phone, Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL as string | undefined;
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL as string | undefined;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/\D/g, "")}` : undefined;

  const hasSocial = Boolean(facebookUrl || instagramUrl || whatsappUrl);

  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold">{t('footer.title')}</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {t('footer.description')}
          </p>
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

        {hasSocial && (
          <div>
            <h4 className="text-lg font-semibold">{t('footer.followUs')}</h4>
            <div className="mt-3 flex items-center gap-3">
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
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:text-pottery-gold">
                  <MessageCircle className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        )}
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
