import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: أكتوبر 2025",
      intro: "نحن في التعاونية الحسنية - دار الفخار نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.",
      sections: [
        {
          title: "المعلومات التي نجمعها",
          content: "نقوم بجمع المعلومات التالية: الاسم، البريد الإلكتروني، رقم الهاتف، عنوان التوصيل عند إجراء عملية شراء أو التسجيل في الموقع."
        },
        {
          title: "كيفية استخدام المعلومات",
          content: "نستخدم معلوماتك لمعالجة الطلبات، تحسين خدماتنا، إرسال تحديثات حول الطلبات، والتواصل معك بخصوص منتجاتنا وعروضنا."
        },
        {
          title: "حماية البيانات",
          content: "نستخدم إجراءات أمنية متقدمة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفشاء."
        },
        {
          title: "مشاركة المعلومات",
          content: "لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك مع مزودي الخدمات الموثوق بهم لمساعدتنا في تشغيل موقعنا وخدماتنا."
        },
        {
          title: "ملفات تعريف الارتباط (Cookies)",
          content: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على الموقع، وتحليل حركة المرور، وتخصيص المحتوى."
        },
        {
          title: "حقوقك",
          content: "لديك الحق في الوصول إلى بياناتك الشخصية، تصحيحها، حذفها، أو الاعتراض على معالجتها. للقيام بذلك، يرجى الاتصال بنا."
        },
        {
          title: "التكامل مع Facebook",
          content: "قد نستخدم Facebook Pixel وأدوات Facebook الأخرى لتحليل الاستخدام وتحسين حملاتنا الإعلانية. يمكنك إدارة تفضيلات الإعلانات من إعدادات Facebook الخاصة بك."
        }
      ],
      contact: "للاستفسارات حول الخصوصية، يرجى الاتصال بنا على:",
      email: "البريد الإلكتروني: alhassaniya790@gmail.com",
      dpo: "مسؤول حماية البيانات: Yaya Rachid - rachidyaya790@gmail.com"
    },
    fr: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour : Octobre 2025",
      intro: "Chez Coopérative Al Hassaniya - Dar El Fakhar, nous nous engageons à protéger votre vie privée. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles.",
      sections: [
        {
          title: "Informations que nous collectons",
          content: "Nous collectons les informations suivantes : nom, email, numéro de téléphone, adresse de livraison lors d'un achat ou d'une inscription."
        },
        {
          title: "Utilisation des informations",
          content: "Nous utilisons vos informations pour traiter les commandes, améliorer nos services, envoyer des mises à jour sur les commandes et communiquer avec vous concernant nos produits et offres."
        },
        {
          title: "Protection des données",
          content: "Nous utilisons des mesures de sécurité avancées pour protéger vos données personnelles contre tout accès, modification ou divulgation non autorisés."
        },
        {
          title: "Partage d'informations",
          content: "Nous ne vendons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations avec des prestataires de services de confiance pour nous aider à exploiter notre site."
        },
        {
          title: "Cookies",
          content: "Nous utilisons des cookies pour améliorer votre expérience sur le site, analyser le trafic et personnaliser le contenu."
        },
        {
          title: "Vos droits",
          content: "Vous avez le droit d'accéder à vos données personnelles, de les corriger, de les supprimer ou de vous opposer à leur traitement. Pour ce faire, veuillez nous contacter."
        },
        {
          title: "Intégration Facebook",
          content: "Nous pouvons utiliser Facebook Pixel et d'autres outils Facebook pour analyser l'utilisation et améliorer nos campagnes publicitaires. Vous pouvez gérer vos préférences publicitaires depuis vos paramètres Facebook."
        }
      ],
      contact: "Pour toute question concernant la confidentialité, veuillez nous contacter :",
      email: "Email : alhassaniya790@gmail.com",
      dpo: "Délégué à la protection des données : Yaya Rachid - rachidyaya790@gmail.com"
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: October 2025",
      intro: "At Al Hassaniya Cooperative - Dar El Fakhar, we are committed to protecting your privacy. This policy explains how we collect, use, and protect your personal information.",
      sections: [
        {
          title: "Information We Collect",
          content: "We collect the following information: name, email, phone number, delivery address when you make a purchase or register on the site."
        },
        {
          title: "How We Use Information",
          content: "We use your information to process orders, improve our services, send order updates, and communicate with you about our products and offers."
        },
        {
          title: "Data Protection",
          content: "We use advanced security measures to protect your personal data from unauthorized access, modification, or disclosure."
        },
        {
          title: "Information Sharing",
          content: "We do not sell or rent your personal information to third parties. We may share your information with trusted service providers to help us operate our site and services."
        },
        {
          title: "Cookies",
          content: "We use cookies to improve your experience on the site, analyze traffic, and personalize content."
        },
        {
          title: "Your Rights",
          content: "You have the right to access your personal data, correct it, delete it, or object to its processing. To do so, please contact us."
        },
        {
          title: "Facebook Integration",
          content: "We may use Facebook Pixel and other Facebook tools to analyze usage and improve our advertising campaigns. You can manage your advertising preferences from your Facebook settings."
        }
      ],
      contact: "For privacy inquiries, please contact us at:",
      email: "Email: alhassaniya790@gmail.com",
      dpo: "Data Protection Officer: Yaya Rachid - rachidyaya790@gmail.com"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${t.title} | Al Hassaniya Cooperative`}
        description="Privacy policy for Al Hassaniya Cooperative - Dar El Fakhar. Learn how we protect your personal information."
        url="https://www.alhassaniya.com/privacy-policy"
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
            <p className="mb-2">{t.email}</p>
            <p>{t.dpo}</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
