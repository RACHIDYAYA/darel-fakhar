import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

const DataDeletion = () => {
  const { language } = useLanguage();

  const content = {
    ar: {
      title: "حذف البيانات الشخصية",
      intro: "نحترم حقك في حذف بياناتك الشخصية. يمكنك طلب حذف بياناتك باتباع الخطوات التالية:",
      steps: [
        "أرسل بريداً إلكترونياً إلى: alhassaniya790@gmail.com",
        "اذكر في موضوع البريد: 'طلب حذف البيانات'",
        "قدم معلومات التعريف الخاصة بك (الاسم، البريد الإلكتروني المسجل)",
        "سنقوم بمعالجة طلبك خلال 30 يوماً",
        "ستتلقى تأكيداً عند اكتمال الحذف"
      ],
      note: "ملاحظة مهمة:",
      noteContent: "بعد حذف بياناتك، لن تتمكن من الوصول إلى حسابك أو طلباتك السابقة. قد نحتفظ ببعض المعلومات للأغراض القانونية أو المحاسبية وفقاً للقانون المغربي.",
      facebook: "حذف بيانات Facebook:",
      facebookContent: "إذا قمت بتسجيل الدخول باستخدام Facebook، يمكنك إلغاء الوصول إلى التطبيق من إعدادات Facebook الخاصة بك تحت 'التطبيقات والمواقع الإلكترونية'، ثم طلب حذف بياناتك من موقعنا باتباع الخطوات أعلاه.",
      contact: "للمساعدة أو الاستفسارات:",
      email: "البريد الإلكتروني: alhassaniya790@gmail.com",
      dpo: "مسؤول حماية البيانات: Yaya Rachid",
      dpoEmail: "rachidyaya790@gmail.com",
      address: "العنوان: DR OD ALAYACHI SAADLA SAFI، المغرب"
    },
    fr: {
      title: "Suppression des Données Personnelles",
      intro: "Nous respectons votre droit de supprimer vos données personnelles. Vous pouvez demander la suppression de vos données en suivant ces étapes :",
      steps: [
        "Envoyez un email à : alhassaniya790@gmail.com",
        "Indiquez dans l'objet : 'Demande de suppression de données'",
        "Fournissez vos informations d'identification (nom, email enregistré)",
        "Nous traiterons votre demande dans les 30 jours",
        "Vous recevrez une confirmation une fois la suppression terminée"
      ],
      note: "Note importante :",
      noteContent: "Après la suppression de vos données, vous ne pourrez plus accéder à votre compte ou à vos commandes précédentes. Nous pouvons conserver certaines informations à des fins légales ou comptables conformément à la loi marocaine.",
      facebook: "Suppression des données Facebook :",
      facebookContent: "Si vous vous êtes connecté avec Facebook, vous pouvez révoquer l'accès à l'application depuis vos paramètres Facebook sous 'Applications et sites web', puis demander la suppression de vos données de notre site en suivant les étapes ci-dessus.",
      contact: "Pour de l'aide ou des questions :",
      email: "Email : alhassaniya790@gmail.com",
      dpo: "Délégué à la protection des données : Yaya Rachid",
      dpoEmail: "rachidyaya790@gmail.com",
      address: "Adresse : DR OD ALAYACHI SAADLA SAFI, Maroc"
    },
    en: {
      title: "Data Deletion Instructions",
      intro: "We respect your right to delete your personal data. You can request deletion of your data by following these steps:",
      steps: [
        "Send an email to: alhassaniya790@gmail.com",
        "State in the subject: 'Data Deletion Request'",
        "Provide your identification information (name, registered email)",
        "We will process your request within 30 days",
        "You will receive confirmation once deletion is complete"
      ],
      note: "Important Note:",
      noteContent: "After deleting your data, you will no longer be able to access your account or previous orders. We may retain some information for legal or accounting purposes in accordance with Moroccan law.",
      facebook: "Facebook Data Deletion:",
      facebookContent: "If you logged in using Facebook, you can revoke app access from your Facebook settings under 'Apps and Websites', then request deletion of your data from our site by following the steps above.",
      contact: "For assistance or inquiries:",
      email: "Email: alhassaniya790@gmail.com",
      dpo: "Data Protection Officer: Yaya Rachid",
      dpoEmail: "rachidyaya790@gmail.com",
      address: "Address: DR OD ALAYACHI SAADLA SAFI, Morocco"
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${t.title} | Al Hassaniya Cooperative`}
        description="Data deletion instructions for Al Hassaniya Cooperative - Dar El Fakhar. Learn how to delete your personal data."
        url="https://www.alhassaniya.com/data-deletion"
      />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">{t.title}</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-8 leading-relaxed">{t.intro}</p>
          
          <section className="mb-8">
            <ol className="list-decimal list-inside space-y-3">
              {t.steps.map((step, index) => (
                <li key={index} className="text-foreground leading-relaxed">{step}</li>
              ))}
            </ol>
          </section>
          
          <section className="mb-8 p-6 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-primary rounded">
            <h2 className="text-xl font-semibold mb-3 text-primary">{t.note}</h2>
            <p className="leading-relaxed text-foreground">{t.noteContent}</p>
          </section>
          
          <section className="mb-8 p-6 bg-blue-50 dark:bg-blue-950/20 rounded">
            <h2 className="text-xl font-semibold mb-3 text-primary">{t.facebook}</h2>
            <p className="leading-relaxed text-foreground">{t.facebookContent}</p>
          </section>
          
          <section className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{t.contact}</h2>
            <p className="mb-2">{t.email}</p>
            <p className="mb-2"><strong>{t.dpo}</strong></p>
            <p className="mb-2">{t.dpoEmail}</p>
            <p>{t.address}</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DataDeletion;
