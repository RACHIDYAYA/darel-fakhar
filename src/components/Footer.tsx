import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <Link to="/blog" className="text-foreground hover:text-pottery-gold transition-colors">
                صناعة الفخار
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-foreground hover:text-pottery-gold transition-colors">
                بيع الفخار
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-foreground hover:text-pottery-gold transition-colors">
                فخار آسفي
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-foreground hover:text-pottery-gold transition-colors">
                بيع الفخار عبر الإنترنت
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold">روابط سريعة</h4>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/" className="text-foreground hover:text-pottery-gold transition-colors">
                الصفحة الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-foreground hover:text-pottery-gold transition-colors">
                من نحن
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-foreground hover:text-pottery-gold transition-colors">
                المنتجات
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-foreground hover:text-pottery-gold transition-colors">
                اتصل بنا
              </Link>
            </li>
          </ul>
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
