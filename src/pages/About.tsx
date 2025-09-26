import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Package, Layers, Compass } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: ShieldCheck,
      title: t('aboutPage.features.quality.title'),
      desc: t('aboutPage.features.quality.desc'),
    },
    {
      icon: Package,
      title: t('aboutPage.features.wholesale.title'),
      desc: t('aboutPage.features.wholesale.desc'),
    },
    {
      icon: Layers,
      title: t('aboutPage.features.range.title'),
      desc: t('aboutPage.features.range.desc'),
    },
    {
      icon: Compass,
      title: t('aboutPage.features.experience.title'),
      desc: t('aboutPage.features.experience.desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
 
      <main className="container mx-auto px-4 py-12">
        <section className="mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-gold bg-clip-text text-transparent">
            {t('aboutPage.title')}
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t('aboutPage.lead1')}
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {t('aboutPage.lead2')}
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title as string} className="rounded-lg border border-border bg-card/50 p-5 shadow-elegant hover:shadow-gold transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-pottery-gold text-pottery-gold-foreground shadow-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-xl border border-border bg-gradient-card p-6 shadow-elegant">
          <h2 className="text-xl md:text-2xl font-bold">{t('aboutPage.mission.title')}</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed max-w-4xl">
            {t('aboutPage.mission.desc')}
          </p>
        </section>
      </main>
    
    </div>
  );
};

export default About;
