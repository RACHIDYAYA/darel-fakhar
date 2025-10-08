import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "شروط الخدمة",
      lastUpdated: "آخر تحديث: أكتوبر 2025",
      intro: "مرحباً بك في التعاونية الحسنية - دار الفخار. باستخدامك لموقعنا، فإنك توافق على هذه الشروط والأحكام.",
      sections: [
        {
          title: "استخدام الموقع",
          content: "يمكنك استخدام موقعنا لتصفح وشراء المنتجات. يجب عليك تقديم معلومات دقيقة وصحيحة عند التسجيل أو إجراء عملية شراء."
        },
        {
          title: "الطلبات والمدفوعات",
          content: "جميع الطلبات تخضع للتوفر. نحتفظ بالحق في رفض أي طلب. الأسعار قابلة للتغيير دون إشعار مسبق. المدفوعات آمنة ومشفرة."
        },
        {
          title: "الشحن والتوصيل",
          content: "نقوم بالشحن إلى جميع أنحاء المغرب. أوقات التوصيل تقديرية وقد تختلف. نحن غير مسؤولين عن التأخيرات الناتجة عن ظروف خارجة عن إرادتنا."
        },
        {
          title: "الإرجاع والاستبدال",
          content: "يمكنك إرجاع المنتجات خلال 14 يوماً من الاستلام بشرط أن تكون في حالتها الأصلية. تكاليف الإرجاع يتحملها العميل ما لم يكن المنتج معيباً."
        },
        {
          title: "الملكية الفكرية",
          content: "جميع المحتويات على هذا الموقع، بما في ذلك النصوص والصور والشعارات، هي ملك للتعاونية الحسنية ومحمية بموجب قوانين حقوق النشر."
        },
        {
          title: "القانون الساري",
          content: "تخضع هذه الشروط لقوانين المملكة المغربية. أي نزاع يخضع لاختصاص المحاكم المغربية."
        },
        {
          title: "تعديل الشروط",
          content: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات تصبح سارية فور نشرها على الموقع."
        }
      ],
      contact: "للاستفسارات حول الشروط، يرجى الاتصال بنا على:",
      email: "البريد الإلكتروني: alhassaniya790@gmail.com"
    },
    fr: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour : Octobre 2025",
      intro: "Bienvenue à la Coopérative Al Hassaniya - Dar El Fakhar. En utilisant notre site, vous acceptez ces termes et conditions.",
      sections: [
        {
          title: "Utilisation du site",
          content: "Vous pouvez utiliser notre site pour parcourir et acheter des produits. Vous devez fournir des informations exactes lors de l'inscription ou de l'achat."
        },
        {
          title: "Commandes et paiements",
          content: "Toutes les commandes sont soumises à disponibilité. Nous nous réservons le droit de refuser toute commande. Les prix sont sujets à changement sans préavis. Les paiements sont sécurisés et cryptés."
        },
        {
          title: "Livraison",
          content: "Nous livrons partout au Maroc. Les délais de livraison sont estimatifs et peuvent varier. Nous ne sommes pas responsables des retards dus à des circonstances indépendantes de notre volonté."
        },
        {
          title: "Retours et échanges",
          content: "Vous pouvez retourner les produits dans les 14 jours suivant la réception, à condition qu'ils soient dans leur état d'origine. Les frais de retour sont à la charge du client sauf si le produit est défectueux."
        },
        {
          title: "Propriété intellectuelle",
          content: "Tout le contenu de ce site, y compris les textes, images et logos, appartient à la Coopérative Al Hassaniya et est protégé par les lois sur les droits d'auteur."
        },
        {
          title: "Loi applicable",
          content: "Ces conditions sont régies par les lois du Royaume du Maroc. Tout litige relève de la compétence des tribunaux marocains."
        },
        {
          title: "Modification des conditions",
          content: "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prennent effet dès leur publication sur le site."
        }
      ],
      contact: "Pour toute question concernant les conditions, veuillez nous contacter :",
      email: "Email : alhassaniya790@gmail.com"
    },
    en: {
      title: "Terms of Service",
      lastUpdated: "Last Updated: October 2025",
      intro: "Welcome to Al Hassaniya Cooperative - Dar El Fakhar. By using our website, you agree to these terms and conditions.",
      sections: [
        {
          title: "Use of the Site",
          content: "You may use our site to browse and purchase products. You must provide accurate information when registering or making a purchase."
        },
        {
          title: "Orders and Payments",
          content: "All orders are subject to availability. We reserve the right to refuse any order. Prices are subject to change without notice. Payments are secure and encrypted."
        },
        {
          title: "Shipping and Delivery",
          content: "We ship throughout Morocco. Delivery times are estimates and may vary. We are not responsible for delays due to circumstances beyond our control."
        },
        {
          title: "Returns and Exchanges",
          content: "You may return products within 14 days of receipt, provided they are in their original condition. Return costs are borne by the customer unless the product is defective."
        },
        {
          title: "Intellectual Property",
          content: "All content on this site, including text, images, and logos, belongs to Al Hassaniya Cooperative and is protected by copyright laws."
        },
        {
          title: "Applicable Law",
          content: "These terms are governed by the laws of the Kingdom of Morocco. Any dispute is subject to the jurisdiction of Moroccan courts."
        },
        {
          title: "Modification of Terms",
          content: "We reserve the right to modify these terms at any time. Modifications take effect upon publication on the site."
        }
      ],
      contact: "For inquiries about the terms, please contact us at:",
      email: "Email: alhassaniya790@gmail.com"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${t.title} | Al Hassaniya Cooperative`}
        description="Terms of service for Al Hassaniya Cooperative - Dar El Fakhar. Read our terms and conditions."
        url="https://www.alhassaniya.com/terms"
      />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-primary">{t.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t.lastUpdated}</p>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-8 leading-relaxed">{t.intro}</p>
          
          {t.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary">{section.title}</h2>
              <p className="leading-relaxed text-foreground">{section.content}</p>
            </section>
          ))}
          
          <section className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t.contact}</h2>
            <p>{t.email}</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
