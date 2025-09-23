import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Hammer, ShoppingBag, MapPin, ShoppingCart, Home, Info, Boxes, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold">الخزف التقليدي بآسفي</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            تُعدّ مدينة آسفي بالمغرب إحدى أعرق مراكز صناعة الخزف في شمال إفريقيا. توارث
            الحرفيون مهارات تشكيل الطين، الطلاء الزخرفي، والحرق في الأفران التقليدية عبر أجيال.
            تتميز القطع بألوانها الطبيعية ونقوشها الأندلسية والأمازيغية، وتجمع بين الجمال والوظيفة
            لتلائم الاستخدام اليومي والزينة.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold">روابط ذات صلة</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/blog" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Hammer className="h-4 w-4" />
                <span>صناعة الفخار</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <ShoppingBag className="h-4 w-4" />
                <span>بيع الفخار</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <MapPin className="h-4 w-4" />
                <span>فخار آسفي</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <ShoppingCart className="h-4 w-4" />
                <span>بيع الفخار عبر الإنترنت</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">روابط سريعة</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Home className="h-4 w-4" />
                <span>الصفحة الرئيسية</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Info className="h-4 w-4" />
                <span>من نحن</span>
              </Link>
            </li>
            <li>
              <Link to="/shop" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Boxes className="h-4 w-4" />
                <span>المنتجات</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-2 text-foreground hover:text-pottery-gold transition-colors">
                <Phone className="h-4 w-4" />
                <span>اتصل بنا</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">اللغات</h4>
          <div className="mt-3">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          © 2025 Al Hassaniya - جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
};

export default Footer;
